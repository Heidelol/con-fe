/**
 * Formateador sereno de fechas para las intenciones en Con Fe.
 */

export function formatIntentionDate(isoString: string | null | undefined): string {
  if (!isoString) return "Recientemente";

  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return "Recientemente";

    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) {
      return "Hoy";
    }
    if (diffDays === 1) {
      return "Ayer";
    }
    if (diffDays < 7) {
      return `Hace ${diffDays} días`;
    }
    if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return weeks === 1 ? "Hace una semana" : `Hace ${weeks} semanas`;
    }

    // Fecha serena tipo: "15 de mayo"
    return new Intl.DateTimeFormat("es-ES", {
      day: "numeric",
      month: "long",
    }).format(date);
  } catch {
    return "Recientemente";
  }
}
