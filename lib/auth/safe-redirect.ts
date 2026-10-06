/**
 * Utilidades de validación y sanitización de redirecciones.
 *
 * Previene vulnerabilidades de Open Redirect asegurando que solo se permitan
 * rutas relativas internas seguras de la propia aplicación Con Fe.
 */

/**
 * Determina si una ruta es un path interno seguro (e.g. "/camino", "/camino/intenciones/nueva").
 * Rechaza URLs externas (https://...), enlaces relativos al protocolo (//evil.com),
 * esquemas javascript: y caracteres de control.
 */
export function isSafeInternalPath(path: string | null | undefined): boolean {
  if (!path || typeof path !== "string") {
    return false;
  }

  const trimmed = path.trim();

  // Debe comenzar exactamente con un '/' y no con '//' (protocol-relative URL)
  if (!trimmed.startsWith("/") || trimmed.startsWith("//")) {
    return false;
  }

  // Prevenir barras invertidas que algunos navegadores normalizan como slash
  if (trimmed.includes("\\")) {
    return false;
  }

  // Prevenir esquemas de protocolo dentro del path (ej: "/https://...", "/javascript:...")
  if (trimmed.includes(":") || trimmed.includes("\0")) {
    return false;
  }

  return true;
}

/**
 * Retorna la ruta segura normalizada o el fallback predeterminado si es inválida.
 */
export function getSafeRedirectPath(
  path: string | null | undefined,
  fallback = "/camino"
): string {
  if (isSafeInternalPath(path)) {
    return path!.trim();
  }
  return fallback;
}
