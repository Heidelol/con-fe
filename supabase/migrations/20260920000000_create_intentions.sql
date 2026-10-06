-- ==============================================================================
-- Migración: 20260920000000_create_intentions.sql
-- Proyecto: Con Fe (Acompañamiento espiritual y oración)
-- Descripción: Creación de tabla public.intentions, trigger de updated_at,
--              índices y políticas de Row Level Security (RLS).
-- ==============================================================================

-- 1. Creación de la tabla
create table if not exists public.intentions (
  id uuid primary key default gen_random_uuid(),

  user_id uuid not null
    default auth.uid()
    references auth.users(id)
    on delete cascade,

  title text not null check (char_length(trim(title)) > 0 and char_length(title) <= 200),
  note text check (note is null or char_length(note) <= 2000),
  category text check (category is null or char_length(category) <= 50),

  status text not null default 'praying'
    check (status in (
      'praying',
      'answered',
      'gratitude',
      'archived'
    )),

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  resolved_at timestamptz
);

-- 2. Función y Trigger para actualización automática de updated_at
create or replace function public.handle_intentions_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_intentions_updated_at on public.intentions;

create trigger set_intentions_updated_at
  before update on public.intentions
  for each row
  execute function public.handle_intentions_updated_at();

-- 3. Índices para optimizar consultas por usuario y estado
create index if not exists intentions_user_id_idx
  on public.intentions(user_id);

create index if not exists intentions_user_id_status_idx
  on public.intentions(user_id, status);

-- 4. Habilitar Row Level Security (RLS)
alter table public.intentions enable row level security;

-- 5. Políticas RLS explícitas e independientes

-- SELECT: El usuario solo puede leer sus propias intenciones
drop policy if exists "Users can read their own intentions" on public.intentions;
create policy "Users can read their own intentions"
  on public.intentions
  for select
  to authenticated
  using (
    (select auth.uid()) = user_id
  );

-- INSERT: El usuario solo puede crear intenciones asignadas a sí mismo
drop policy if exists "Users can create their own intentions" on public.intentions;
create policy "Users can create their own intentions"
  on public.intentions
  for insert
  to authenticated
  with check (
    (select auth.uid()) = user_id
  );

-- UPDATE: El usuario solo puede actualizar sus propias intenciones y mantener su titularidad
drop policy if exists "Users can update their own intentions" on public.intentions;
create policy "Users can update their own intentions"
  on public.intentions
  for update
  to authenticated
  using (
    (select auth.uid()) = user_id
  )
  with check (
    (select auth.uid()) = user_id
  );

-- DELETE: El usuario solo puede eliminar sus propias intenciones
drop policy if exists "Users can delete their own intentions" on public.intentions;
create policy "Users can delete their own intentions"
  on public.intentions
  for delete
  to authenticated
  using (
    (select auth.uid()) = user_id
  );
