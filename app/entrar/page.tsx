"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeftIcon, LockIcon, MailIcon, GoogleIcon, CheckIcon } from "@/components/ui/Icons";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { getSafeRedirectPath } from "@/lib/auth/safe-redirect";

function EntrarForm() {
  const searchParams = useSearchParams();
  const nextParam = searchParams.get("next");
  const authError = searchParams.get("error");
  const safeNext = getSafeRedirectPath(nextParam, "/camino");

  const [email, setEmail] = useState("");
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false);
  const [isSubmittingGoogle, setIsSubmittingGoogle] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(
    authError === "auth_failed"
      ? "No pudimos iniciar sesión. Por favor intenta nuevamente."
      : null
  );

  const configured = isSupabaseConfigured();

  const handleGoogleSignIn = async () => {
    if (!configured) {
      setErrorMessage(
        "Supabase aún no está configurado en este entorno. Configura NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY."
      );
      return;
    }

    const supabase = createClient();
    if (!supabase) return;

    setIsSubmittingGoogle(true);
    setErrorMessage(null);

    try {
      const redirectUrl = `${window.location.origin}/auth/callback?next=${encodeURIComponent(
        safeNext
      )}`;

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: redirectUrl,
        },
      });

      if (error) {
        setErrorMessage("No fue posible conectar con Google. Intenta nuevamente.");
      }
    } catch {
      setErrorMessage("Ocurrió un inconveniente al conectar. Intenta nuevamente.");
    } finally {
      setIsSubmittingGoogle(false);
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim();
    if (!cleanEmail) return;

    if (!configured) {
      setErrorMessage(
        "Supabase aún no está configurado en este entorno. Configura NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY."
      );
      return;
    }

    const supabase = createClient();
    if (!supabase) return;

    setIsSubmittingEmail(true);
    setErrorMessage(null);

    try {
      const redirectUrl = `${window.location.origin}/auth/callback?next=${encodeURIComponent(
        safeNext
      )}`;

      const { error } = await supabase.auth.signInWithOtp({
        email: cleanEmail,
        options: {
          emailRedirectTo: redirectUrl,
        },
      });

      if (error) {
        setErrorMessage("No pudimos enviar el enlace de acceso. Verifica el correo e intenta nuevamente.");
      } else {
        setIsEmailSent(true);
      }
    } catch {
      setErrorMessage("Ocurrió un error al enviar el correo. Intenta nuevamente.");
    } finally {
      setIsSubmittingEmail(false);
    }
  };

  return (
    <main className="w-full flex flex-col justify-between min-h-[90vh] select-none px-6 pt-5 pb-8 max-w-md mx-auto">
      <div>
        {/* Top Navigation */}
        <div className="w-full flex items-center justify-between mb-6">
          <Link
            href="/camino"
            className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center text-[#6F8796] hover:text-[#17212A] hover:bg-[#1F3443]/5 transition-colors cursor-pointer"
            aria-label="Volver"
          >
            <ArrowLeftIcon size={18} />
          </Link>

          <span className="font-serif text-[14px] text-[#1F3443]/50 tracking-tight">
            con fe
          </span>

          <div className="w-10 h-10" />
        </div>

        {/* Page Title & Serene Subtitle */}
        <div className="mb-7">
          <h1 className="font-serif text-[30px] sm:text-[34px] leading-[1.2] text-[#17212A] font-normal tracking-[-0.015em] mb-2">
            Tu espacio privado
          </h1>
          <p className="font-sans text-[15px] sm:text-[16px] text-[#6F8796] leading-relaxed">
            Guarda tus intenciones y vuelve a ellas cuando lo necesites.
          </p>
        </div>

        {/* Informative Error message */}
        {errorMessage && (
          <div
            role="alert"
            className="w-full p-4 mb-6 rounded-2xl bg-[#A45A3E]/10 border border-[#A45A3E]/20 text-[#A45A3E] font-sans text-xs sm:text-[13px] leading-relaxed animate-in fade-in"
          >
            {errorMessage}
          </div>
        )}

        {/* Form or Email Sent Confirmation */}
        {!isEmailSent ? (
          <div className="flex flex-col gap-5">
            {/* 1. Continuar con Google */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isSubmittingGoogle || isSubmittingEmail}
              className="w-full py-3.5 px-4 rounded-2xl bg-white border border-[#1F3443]/15 text-[#17212A] font-sans text-[15px] font-medium hover:bg-[#F7F4EE] active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-2xs cursor-pointer disabled:opacity-60"
            >
              <GoogleIcon size={18} />
              <span>
                {isSubmittingGoogle ? "Conectando…" : "Continuar con Google"}
              </span>
            </button>

            {/* Subtle Divider */}
            <div className="flex items-center gap-3 my-1">
              <div className="flex-1 h-[1px] bg-[#1F3443]/10" />
              <span className="font-sans text-xs text-[#6F8796]">
                o con tu correo
              </span>
              <div className="flex-1 h-[1px] bg-[#1F3443]/10" />
            </div>

            {/* 2. Continuar con Correo (Passwordless) */}
            <form onSubmit={handleEmailSignIn} className="flex flex-col gap-4">
              <div>
                <label
                  htmlFor="auth-email"
                  className="block font-sans text-xs font-semibold text-[#17212A] mb-1.5 uppercase tracking-wide"
                >
                  Correo electrónico
                </label>
                <div className="relative">
                  <input
                    id="auth-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nombre@ejemplo.com"
                    autoComplete="email"
                    className="w-full bg-white rounded-2xl pl-11 pr-4 py-3.5 border border-[#1F3443]/15 text-[#17212A] font-sans text-[15px] placeholder:text-[#6F8796]/60 focus:border-[#1F3443] focus:ring-1 focus:ring-[#1F3443] focus:outline-none transition-all shadow-2xs"
                  />
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6F8796] pointer-events-none">
                    <MailIcon size={18} />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmittingEmail || isSubmittingGoogle || !email.trim()}
                className="w-full py-3.5 rounded-2xl bg-[#1F3443] text-[#F7F4EE] font-sans text-[15px] font-medium text-center shadow-[0_2px_8px_rgba(31,52,67,0.12)] hover:bg-[#284255] active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer"
              >
                {isSubmittingEmail ? "Enviando enlace…" : "Continuar"}
              </button>
            </form>
          </div>
        ) : (
          /* Email Sent Feedback */
          <div className="p-6 rounded-3xl bg-white border border-[#3B7A57]/20 shadow-xs flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-300">
            <div className="w-14 h-14 rounded-2xl bg-[#3B7A57]/15 text-[#245238] flex items-center justify-center mb-4">
              <CheckIcon size={24} />
            </div>

            <h2 className="font-serif text-[22px] text-[#17212A] font-medium mb-2">
              Revisa tu correo
            </h2>

            <p className="font-sans text-[14px] text-[#6F8796] leading-relaxed mb-6">
              Te enviamos un enlace de acceso a{" "}
              <strong className="text-[#17212A] font-medium">{email}</strong> para entrar a tu espacio privado sin contraseñas.
            </p>

            <button
              type="button"
              onClick={() => {
                setIsEmailSent(false);
                setErrorMessage(null);
              }}
              className="text-xs font-sans font-medium text-[#1F3443] hover:underline cursor-pointer"
            >
              Usar otro correo
            </button>
          </div>
        )}
      </div>

      {/* Honest Privacy Statement */}
      <div className="w-full pt-8 text-center">
        <div className="p-4 rounded-2xl bg-white/70 border border-[#1F3443]/6 flex items-start gap-2.5 text-left">
          <LockIcon size={16} className="text-[#1F3443] shrink-0 mt-0.5" />
          <div className="flex flex-col">
            <span className="font-sans text-xs font-semibold text-[#17212A] mb-0.5">
              Tus intenciones son privadas
            </span>
            <p className="font-sans text-[12px] text-[#6F8796] leading-relaxed">
              Tu espacio está asociado a tu cuenta y protegido para que otros usuarios no puedan acceder a tus intenciones.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function EntrarPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-[60vh] flex items-center justify-center">
          <p className="font-sans text-xs text-[#6F8796]">Cargando…</p>
        </div>
      }
    >
      <EntrarForm />
    </Suspense>
  );
}
