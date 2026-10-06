"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeftIcon, MicrophoneIcon, CloseIcon } from "@/components/ui/Icons";
import { useAuth } from "@/context/AuthContext";
import { useIntentions } from "@/context/IntentionsContext";

export default function NewIntentionPage() {
  const router = useRouter();
  const { user, isLoading: isAuthLoading } = useAuth();
  const { addIntention } = useIntentions();

  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [isVoiceMockOpen, setIsVoiceMockOpen] = useState(false);

  useEffect(() => {
    if (!isAuthLoading && !user) {
      router.replace("/entrar?next=/camino/intenciones/nueva");
    }
  }, [isAuthLoading, user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setFormError(null);

    try {
      await addIntention(title, note);
      // Redirigir a la lista donde se mostrará "Intención guardada."
      router.push("/camino/intenciones");
    } catch {
      // Estado de error humano sin borrar los inputs del usuario
      setFormError(
        "No pudimos guardar tu intención. Lo que escribiste sigue aquí. Intenta nuevamente."
      );
      setIsSubmitting(false);
    }
  };

  if (isAuthLoading) {
    return (
      <main className="w-full flex flex-col select-none px-6 pt-5 pb-8 min-h-[50vh]">
        <div className="animate-pulse flex flex-col gap-4">
          <div className="h-8 w-16 bg-[#1F3443]/5 rounded-full" />
          <div className="h-10 w-48 bg-[#1F3443]/5 rounded-xl" />
        </div>
      </main>
    );
  }

  return (
    <main className="w-full flex flex-col justify-between min-h-[85vh] select-none px-6 pt-5 pb-8">
      <div>
        {/* Top bar */}
        <div className="w-full flex items-center justify-between mb-6">
          <Link
            href="/camino/intenciones"
            className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center text-[#6F8796] hover:text-[#17212A] hover:bg-[#1F3443]/5 transition-colors cursor-pointer"
            aria-label="Volver a mis intenciones"
          >
            <ArrowLeftIcon size={18} />
          </Link>

          <span className="font-serif text-[14px] text-[#1F3443]/50 tracking-tight">
            con fe
          </span>

          <div className="w-10 h-10" />
        </div>

        {/* Title Question */}
        <div className="mb-6">
          <span className="text-[11px] font-sans font-semibold uppercase tracking-wider text-[#A45A3E] block mb-1">
            Nueva intención
          </span>
          <h1 className="font-serif text-[28px] sm:text-[34px] leading-[1.25] text-[#17212A] font-normal tracking-[-0.015em] mb-2">
            ¿Qué quieres poner en manos de Dios?
          </h1>
          <p className="font-sans text-[14px] sm:text-[15px] text-[#6F8796] leading-relaxed">
            Puedes nombrar a una persona, una decisión o aquello que hoy ocupa tus pensamientos.
          </p>
        </div>

        {/* Human Error Notice if insert fails */}
        {formError && (
          <div
            role="alert"
            className="w-full p-4 mb-6 rounded-2xl bg-[#A45A3E]/10 border border-[#A45A3E]/20 text-[#A45A3E] font-sans text-xs sm:text-[13px] leading-relaxed animate-in fade-in"
          >
            {formError}
          </div>
        )}

        {/* Voice vs Text toggle */}
        <div className="flex items-center gap-2 mb-6">
          <button
            type="button"
            onClick={() => setIsVoiceMockOpen(true)}
            className="inline-flex items-center gap-2 py-2 px-3.5 rounded-full bg-white border border-[#1F3443]/10 text-xs sm:text-[13px] font-sans font-medium text-[#1F3443] shadow-2xs hover:border-[#1F3443]/25 active:scale-95 transition-all cursor-pointer"
          >
            <MicrophoneIcon size={15} className="text-[#1F3443]" />
            <span>Decirlo</span>
          </button>

          <span className="text-xs font-sans text-[#6F8796]/60">o escribir abajo</span>
        </div>

        {/* Form */}
        <form id="new-intention-form" onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Main Title Input */}
          <div>
            <label
              htmlFor="intention-title"
              className="block font-sans text-xs font-semibold text-[#17212A] mb-1.5 uppercase tracking-wide"
            >
              Intención principal <span className="text-[#A45A3E]">*</span>
            </label>
            <input
              id="intention-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Mi mamá, mi trabajo, una decisión…"
              autoFocus
              required
              maxLength={200}
              disabled={isSubmitting}
              className="w-full bg-white rounded-2xl px-4 py-3.5 border border-[#1F3443]/15 text-[#17212A] font-sans text-[15px] placeholder:text-[#6F8796]/60 focus:border-[#1F3443] focus:ring-1 focus:ring-[#1F3443] focus:outline-none transition-all shadow-2xs disabled:opacity-60"
            />
          </div>

          {/* Optional Note */}
          <div>
            <label
              htmlFor="intention-note"
              className="block font-sans text-xs font-semibold text-[#6F8796] mb-1.5 uppercase tracking-wide"
            >
              ¿Quieres agregar algo más? <span className="font-normal lowercase">(opcional)</span>
            </label>
            <textarea
              id="intention-note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Puedes escribir unas palabras o dejarlo así."
              rows={3}
              maxLength={2000}
              disabled={isSubmitting}
              className="w-full bg-white rounded-2xl p-4 border border-[#1F3443]/15 text-[#17212A] font-sans text-[15px] leading-relaxed placeholder:text-[#6F8796]/60 focus:border-[#1F3443] focus:ring-1 focus:ring-[#1F3443] focus:outline-none transition-all shadow-2xs resize-none disabled:opacity-60"
            />
          </div>
        </form>
      </div>

      {/* Action CTA */}
      <div className="pt-6 max-w-sm mx-auto w-full">
        <button
          type="submit"
          form="new-intention-form"
          disabled={!title.trim() || isSubmitting}
          className="w-full py-4 rounded-2xl bg-[#1F3443] text-[#F7F4EE] font-sans text-[15px] font-medium text-center shadow-[0_4px_16px_rgba(31,52,67,0.15)] hover:bg-[#284255] active:scale-[0.98] transition-all disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
        >
          {isSubmitting ? "Guardando intención…" : "Guardar intención"}
        </button>
      </div>

      {/* Voice Mock Modal */}
      {isVoiceMockOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1F3443]/40 backdrop-blur-xs animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-sm bg-[#F7F4EE] rounded-3xl p-6 shadow-2xl border border-[#1F3443]/10 text-center animate-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => setIsVoiceMockOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-[#6F8796] hover:text-[#17212A] hover:bg-[#1F3443]/5 cursor-pointer"
              aria-label="Cerrar"
            >
              <CloseIcon size={18} />
            </button>

            <div className="w-14 h-14 rounded-2xl bg-[#1F3443] text-white flex items-center justify-center mx-auto mb-4 shadow-sm">
              <MicrophoneIcon size={26} />
            </div>

            <h3 className="font-serif text-[22px] text-[#17212A] font-normal mb-2">
              Habla con tu propia voz
            </h3>

            <p className="font-sans text-[14px] text-[#6F8796] leading-relaxed mb-6">
              Muy pronto podrás decir tu intención con tus propias palabras y quedará guardada de forma privada.
            </p>

            <button
              type="button"
              onClick={() => setIsVoiceMockOpen(false)}
              className="w-full py-3.5 rounded-xl bg-[#1F3443] text-[#F7F4EE] font-sans text-[14px] font-medium hover:bg-[#284255] transition-all cursor-pointer"
            >
              Escribir por ahora
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
