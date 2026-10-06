import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { isSafeInternalPath } from "@/lib/auth/safe-redirect";

/**
 * Actualiza la sesión de Supabase sincronizando las cookies de autenticación
 * entre la petición y la respuesta, y protege las rutas privadas requeridas.
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  const pathname = request.nextUrl.pathname;
  const isProtectedRoute = pathname.startsWith("/camino/intenciones");

  // Si no hay credenciales configuradas en el entorno (ej: inicio inicial local)
  if (!supabaseUrl || !supabaseKey) {
    if (isProtectedRoute) {
      const redirectUrl = new URL("/entrar", request.url);
      if (isSafeInternalPath(pathname)) {
        redirectUrl.searchParams.set("next", pathname);
      }
      return NextResponse.redirect(redirectUrl);
    }
    return supabaseResponse;
  }

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  // IMPORTANTE: NO usar getSession() en el servidor.
  // Usar getUser() para validar la identidad directamente con el servidor de Supabase Auth.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Si no hay usuario autenticado e intenta acceder a rutas privadas
  if (!user && isProtectedRoute) {
    const redirectUrl = new URL("/entrar", request.url);
    if (isSafeInternalPath(pathname)) {
      redirectUrl.searchParams.set("next", pathname);
    }
    return NextResponse.redirect(redirectUrl);
  }

  return supabaseResponse;
}
