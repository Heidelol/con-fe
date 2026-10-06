import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";
import type { PrayerIntention, IntentionStatus } from "@/types/intention";
import { formatIntentionDate } from "./format-date";

export interface CreateIntentionInput {
  title: string;
  note?: string;
  category?: string;
}

export interface UpdateIntentionInput {
  title?: string;
  note?: string;
  category?: string;
  status?: IntentionStatus;
}

/**
 * Mapea una fila de base de datos a la interfaz de dominio `PrayerIntention`.
 */
function mapRowToIntention(
  row: Database["public"]["Tables"]["intentions"]["Row"]
): PrayerIntention {
  return {
    id: row.id,
    title: row.title,
    note: row.note || undefined,
    category: row.category || undefined,
    status: row.status,
    createdAt: formatIntentionDate(row.created_at),
    updatedAt: row.updated_at ? formatIntentionDate(row.updated_at) : undefined,
    resolvedAt: row.resolved_at ? formatIntentionDate(row.resolved_at) : undefined,
  };
}

/**
 * Obtiene todas las intenciones del usuario autenticado (RLS filtra automáticamente).
 * Ordenadas por fecha de creación descendente (más recientes primero).
 */
export async function getIntentions(
  supabase: SupabaseClient<Database>
): Promise<PrayerIntention[]> {
  const { data, error } = await supabase
    .from("intentions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Error al cargar intenciones: ${error.message}`);
  }

  return (data || []).map(mapRowToIntention);
}

/**
 * Obtiene una intención específica por ID.
 * Si no existe o pertenece a otro usuario, RLS no retorna la fila.
 * Retorna null en lugar de revelar detalles sobre la existencia ajena.
 */
export async function getIntention(
  supabase: SupabaseClient<Database>,
  id: string
): Promise<PrayerIntention | null> {
  const { data, error } = await supabase
    .from("intentions")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(`Error al consultar intención: ${error.message}`);
  }

  if (!data) {
    return null;
  }

  return mapRowToIntention(data);
}

/**
 * Crea una nueva intención para el usuario autenticado.
 * Solo envía los campos permitidos. NO envía user_id desde el cliente,
 * confiando en el valor por defecto auth.uid() de PostgreSQL protegido por RLS.
 */
export async function createIntention(
  supabase: SupabaseClient<Database>,
  input: CreateIntentionInput
): Promise<PrayerIntention> {
  const titleTrimmed = input.title.trim();
  if (!titleTrimmed) {
    throw new Error("El título de la intención no puede estar vacío.");
  }

  const { data, error } = await supabase
    .from("intentions")
    .insert({
      title: titleTrimmed,
      note: input.note?.trim() || null,
      category: input.category?.trim() || null,
      status: "praying",
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Error al guardar la intención: ${error.message}`);
  }

  return mapRowToIntention(data);
}

/**
 * Actualiza el estado espiritual de una intención.
 * Si el estado pasa a "answered" o "gratitude", se asigna resolved_at.
 * Si regresa a "praying", se limpia resolved_at a null para reflejar
 * de forma coherente que la intención continúa en oración activa.
 */
export async function updateIntentionStatus(
  supabase: SupabaseClient<Database>,
  id: string,
  status: IntentionStatus
): Promise<PrayerIntention> {
  const isResolved = status === "answered" || status === "gratitude";

  const { data, error } = await supabase
    .from("intentions")
    .update({
      status,
      resolved_at: isResolved ? new Date().toISOString() : null,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(`Error al actualizar estado: ${error.message}`);
  }

  return mapRowToIntention(data);
}

/**
 * Actualiza los campos informativos de una intención existente.
 */
export async function updateIntention(
  supabase: SupabaseClient<Database>,
  id: string,
  input: UpdateIntentionInput
): Promise<PrayerIntention> {
  const payload: Partial<Database["public"]["Tables"]["intentions"]["Update"]> = {};

  if (input.title !== undefined) {
    payload.title = input.title.trim();
  }
  if (input.note !== undefined) {
    payload.note = input.note?.trim() || null;
  }
  if (input.category !== undefined) {
    payload.category = input.category?.trim() || null;
  }
  if (input.status !== undefined) {
    payload.status = input.status;
    if (input.status === "answered" || input.status === "gratitude") {
      payload.resolved_at = new Date().toISOString();
    } else if (input.status === "praying") {
      payload.resolved_at = null;
    }
  }

  const { data, error } = await supabase
    .from("intentions")
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(`Error al actualizar la intención: ${error.message}`);
  }

  return mapRowToIntention(data);
}

/**
 * Elimina una intención por ID (sujeta a RLS).
 */
export async function deleteIntention(
  supabase: SupabaseClient<Database>,
  id: string
): Promise<void> {
  const { error } = await supabase.from("intentions").delete().eq("id", id);

  if (error) {
    throw new Error(`Error al eliminar intención: ${error.message}`);
  }
}
