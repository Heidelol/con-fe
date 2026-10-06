# Con Fe — Acompañamiento Espiritual y Oración Contemplativa

> **Estado del proyecto:** 🚧 **En desarrollo**  
> Aplicación web en fase de desarrollo activo. Este repositorio expone la arquitectura front-end, diseño de componentes y flujos de usuario implementados. No representa aún un producto comercial terminado.

---

## 1. Propósito y Necesidad

**Con Fe** es una aplicación web diseñada para ofrecer un espacio sereno y libre de distracciones para la oración estructurada y el acompañamiento espiritual diario. 

### Necesidad que resuelve:
Muchas aplicaciones de meditación o lectura espiritual presentan sobrecarga visual, notificaciones invasivas o interfaces complejas que interrumpen el silencio y la introspección. Con Fe simplifica la experiencia mediante:
- Sesiones de oración por etapas progresivas guiadas por audio y texto.
- Interfaz limpia con paleta sobria, alto contraste y foco visible.
- Módulo **Camino** para registrar intenciones personales, reflexiones y agradecimientos sin fricción.

---

## 2. Stack Tecnológico Comprobado

- **Framework:** [Next.js 16.3 (App Router)](https://nextjs.org/) con React 19.
- **Lenguaje:** [TypeScript 5](https://www.typescriptlang.org/) con tipado estricto.
- **Estilos:** [Tailwind CSS 4](https://tailwindcss.com/) con diseño utilitario y temas sobrios.
- **Backend / Autenticación:** [@supabase/ssr](https://supabase.com/docs/guides/auth/server-side-rendering) y `@supabase/supabase-js` (manejo de sesiones mediante cookies HTTP-only en Server Components y Route Handlers).
- **Iconografía:** [Lucide React](https://lucide.dev/).

---

## 3. Funcionalidades Implementadas

- **Apertura y Selección de Oración (`/` y `/orar`):**
  - Catálogo temático de oraciones con categorías (paz, fortaleza, gratitud, noche, mañana).
  - Carga optimizada con Server Components.
- **Experiencia de Oración Guiada (`/orar/[slug]` y `/hoy`):**
  - Flujo secuencial de 5 momentos espirituales (Aquietarse, Escuchar, Meditar, Responder, Contemplar).
  - Reproductor con audio sincronizado, barra de progreso contemplativo y selector de modo (lectura / audio).
- **Módulo "Camino" — Mis Intenciones (`/camino`):**
  - Registro, edición y categorización de intenciones personales.
  - Filtros dinámicos por estado: *Orando*, *Agradecida* y *Pausada*.
  - Almacenamiento local reactivo respaldado por contexto de React, con integración lista para Supabase.
- **Estructura de Autenticación (`/entrar`, `/auth/callback` y `/perfil`):**
  - Vistas de acceso y confirmación con detección segura de variables de entorno.
  - Middleware proxy de sesión con protección de rutas privadas.

---

## 4. Funcionalidades Parciales y Trabajo Pendiente

- [ ] Sincronización completa bidireccional de intenciones en la base de datos remota de Supabase (tablas `intentions` y `prayers`).
- [ ] Reproducción continua con pistas de audio de alta fidelidad alojadas en CDN.
- [ ] Recordatorios diarios configurables y notificaciones PWA locales.
- [ ] Pruebas unitarias y de integración de componentes con Jest / Testing Library.

---

## 5. Instrucciones para Ejecutar Localmente

### Requisitos previos:
- [Node.js](https://nodejs.org/) v20 o superior.
- `npm` o `pnpm`.

### Instalación:

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/Heidelol/con-fe.git
   cd con-fe
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   Copia el archivo de ejemplo:
   ```bash
   cp .env.example .env.local
   ```
   *(Edita `.env.local` con tus claves de proyecto de Supabase si deseas probar autenticación en vivo; la aplicación funciona en modo demostrativo local sin ellas).*

4. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

5. **Compilar para producción:**
   ```bash
   npm run build
   npm run start
   ```

---

## 6. Variables de Entorno

Consulta [`.env.example`](.env.example):
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

*Nota de seguridad: Nunca agregues claves de rol de servicio (`service_role`) en variables públicas con prefijo `NEXT_PUBLIC_`.*
