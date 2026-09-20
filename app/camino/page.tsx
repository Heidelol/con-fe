"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/ui/Header";
import {
  BookmarkIcon,
  BookOpenIcon,
  ChevronRightIcon,
  LockIcon,
} from "@/components/ui/Icons";
import { useIntentions } from "@/context/IntentionsContext";
import { IntentionStatusBadge } from "@/components/intentions/IntentionStatusBadge";
import { FutureFeatureDialog } from "@/components/prayer/FutureFeatureDialog";

export default function CaminoPage() {
  const { intentions } = useIntentions();
  const [isDiaryDialogOpen, setIsDiaryDialogOpen] = useState(false);

  // Take up to 2 recent active intentions for the preview
  const previewIntentions = intentions.slice(0, 2);

  return (
    <main className="w-full flex flex-col select-none">
      <Header greeting="Tu espacio" />

      {/* Page Title & Subtitle */}
      <section className="w-full px-6 pt-5 pb-5">
        {/* Discreet privacy promise */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#1F3443]/5 text-[11px] font-sans font-medium text-[#6F8796] mb-3">
          <LockIcon size={12} className="text-[#1F3443]" />
          <span>Este espacio es privado</span>
        </div>

        <h1 className="font-serif text-[30px] sm:text-[34px] leading-[1.2] text-[#17212A] font-normal tracking-[-0.015em] mb-2">
          Tu camino
        </h1>
        <p className="font-sans text-[15px] sm:text-[16px] text-[#6F8796] leading-relaxed max-w-sm">
          Un lugar para recordar aquello que has puesto en manos de Dios.
        </p>
      </section>

      {/* Main Sections */}
      <div className="w-full px-6 flex flex-col gap-6 pt-2">
        {/* SECTION 1: Mis intenciones (Priority) */}
        <section
          className="flex flex-col p-6 rounded-3xl bg-white border border-[#1F3443]/8 shadow-[0_2px_12px_rgba(31,52,67,0.03)]"
          aria-labelledby="section-intentions-title"
        >
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-[#1F3443]/6 text-[#1F3443] flex items-center justify-center shrink-0 shadow-2xs">
              <BookmarkIcon size={22} />
            </div>

            <Link
              href="/camino/intenciones"
              className="text-xs sm:text-[13px] font-sans font-medium text-[#1F3443] hover:text-[#284255] flex items-center gap-1 py-1 px-3 rounded-full hover:bg-[#1F3443]/5 transition-colors cursor-pointer"
            >
              <span>Ver todas</span>
              <ChevronRightIcon size={14} />
            </Link>
          </div>

          <h2
            id="section-intentions-title"
            className="font-serif text-[22px] sm:text-[24px] text-[#17212A] font-medium tracking-tight mb-1.5"
          >
            Mis intenciones
          </h2>
          <p className="font-sans text-[14px] text-[#6F8796] leading-relaxed mb-5">
            Personas, preocupaciones y situaciones por las que quieres seguir
            orando.
          </p>

          {/* Mini Preview of Intentions */}
          {previewIntentions.length > 0 ? (
            <div className="flex flex-col gap-2.5 mb-5">
              {previewIntentions.map((item) => (
                <Link
                  key={item.id}
                  href={`/camino/intenciones/${item.id}`}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-[#F7F4EE]/70 hover:bg-[#F7F4EE] border border-[#1F3443]/5 transition-all text-left group cursor-pointer"
                >
                  <div className="flex flex-col pr-2">
                    <span className="font-serif text-[15px] font-medium text-[#17212A] group-hover:text-[#1F3443] transition-colors">
                      {item.title}
                    </span>
                    {item.note && (
                      <span className="font-sans text-xs text-[#6F8796] line-clamp-1 mt-0.5">
                        {item.note}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <IntentionStatusBadge status={item.status} />
                    <ChevronRightIcon
                      size={14}
                      className="text-[#6F8796]/50 group-hover:text-[#1F3443]"
                    />
                  </div>
                </Link>
              ))}
            </div>
          ) : null}

          {/* Primary CTA */}
          <Link
            href="/camino/intenciones"
            className="w-full py-3.5 px-5 rounded-2xl bg-[#1F3443] text-[#F7F4EE] font-sans text-[14px] font-medium text-center shadow-sm hover:bg-[#284255] active:scale-[0.98] transition-all cursor-pointer"
          >
            Ver mis intenciones
          </Link>
        </section>

        {/* SECTION 2: Mi diario (Placeholder elegante) */}
        <section
          className="flex flex-col p-6 rounded-3xl bg-white border border-[#1F3443]/8 shadow-[0_2px_12px_rgba(31,52,67,0.03)]"
          aria-labelledby="section-diary-title"
        >
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-[#D3B58A]/15 text-[#785128] flex items-center justify-center shrink-0 shadow-2xs">
              <BookOpenIcon size={22} />
            </div>

            <span className="text-[11px] font-sans font-medium px-2.5 py-0.5 rounded-full bg-[#1F3443]/5 text-[#6F8796]">
              Próximamente
            </span>
          </div>

          <h2
            id="section-diary-title"
            className="font-serif text-[22px] sm:text-[24px] text-[#17212A] font-medium tracking-tight mb-1.5"
          >
            Mi diario
          </h2>
          <p className="font-sans text-[14px] text-[#6F8796] leading-relaxed mb-5">
            Un espacio privado para escribir lo que llevas dentro.
          </p>

          <button
            type="button"
            onClick={() => setIsDiaryDialogOpen(true)}
            className="w-full py-3.5 px-5 rounded-2xl bg-white border border-[#1F3443]/12 text-[#17212A] font-sans text-[14px] font-medium text-center hover:bg-[#F7F4EE] active:scale-[0.98] transition-all cursor-pointer"
          >
            Abrir mi diario
          </button>
        </section>

        {/* FUTURE ROADMAP NOTE (Architecture placeholder for spiritual milestones) */}
        {/*
          Aquí encajará la historia espiritual del usuario:
          - "Oraste por tu mamá hace 3 días."
          - "Guardaste una reflexión de la Oración del Día."
          - "Convertiste 'Una buena noticia' en agradecimiento."
        */}
      </div>

      <FutureFeatureDialog
        isOpen={isDiaryDialogOpen}
        onClose={() => setIsDiaryDialogOpen(false)}
        title="Mi diario"
        message="Muy pronto podrás escribir y guardar tus reflexiones espirituales íntimas en este espacio protegido."
      />
    </main>
  );
}
