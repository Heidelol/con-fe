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
import { useAuth } from "@/context/AuthContext";
import { useIntentions } from "@/context/IntentionsContext";
import { IntentionStatusBadge } from "@/components/intentions/IntentionStatusBadge";
import { FutureFeatureDialog } from "@/components/prayer/FutureFeatureDialog";

export default function CaminoPage() {
  const { user, isLoading: isAuthLoading } = useAuth();
  const { intentions, isLoading: isIntentionsLoading } = useIntentions();
  const [isDiaryDialogOpen, setIsDiaryDialogOpen] = useState(false);

  // Mientras verifica el estado de sesión inicial, mantener un estado suave y limpio
  if (isAuthLoading) {
    return (
      <main className="w-full flex flex-col select-none min-h-[60vh]">
        <Header greeting="Tu espacio" />
        <div className="w-full px-6 pt-16 flex flex-col items-center justify-center text-center">
          <p className="font-sans text-xs text-[#6F8796]/70">Cargando tu espacio…</p>
        </div>
      </main>
    );
  }

  // ---------------------------------------------------------------------------
  // VISTA SIN SESIÓN: Gate sereno y acogedor (sin redirección agresiva ni mocks)
  // ---------------------------------------------------------------------------
  if (!user) {
    return (
      <main className="w-full flex flex-col select-none">
        <Header greeting="Tu espacio" />

        <section className="w-full px-6 pt-5 pb-5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#1F3443]/5 text-[11px] font-sans font-medium text-[#6F8796] mb-3">
            <LockIcon size={12} className="text-[#1F3443]" />
            <span>Este espacio es privado</span>
          </div>

          <h1 className="font-serif text-[30px] sm:text-[34px] leading-[1.2] text-[#17212A] font-normal tracking-[-0.015em] mb-2">
            Tu espacio privado
          </h1>
          <p className="font-sans text-[15px] sm:text-[16px] text-[#6F8796] leading-relaxed max-w-sm">
            Guarda aquello que quieres seguir poniendo en manos de Dios.
          </p>
        </section>

        {/* Feature Cards explaining what will be saved */}
        <div className="w-full px-6 flex flex-col gap-4 pt-1">
          {/* Feature 1: Mis intenciones */}
          <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-[#1F3443]/8 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-[#1F3443]/6 text-[#1F3443] flex items-center justify-center shrink-0">
              <BookmarkIcon size={20} />
            </div>
            <div className="flex flex-col">
              <h2 className="font-serif text-[17px] font-medium text-[#17212A] mb-1">
                Mis intenciones
              </h2>
              <p className="font-sans text-[13px] sm:text-[14px] text-[#6F8796] leading-relaxed">
                Personas, preocupaciones y situaciones por las que quieres seguir orando.
              </p>
            </div>
          </div>

          {/* Feature 2: Mi diario */}
          <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-[#1F3443]/8 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-[#D3B58A]/15 text-[#785128] flex items-center justify-center shrink-0">
              <BookOpenIcon size={20} />
            </div>
            <div className="flex flex-col">
              <h2 className="font-serif text-[17px] font-medium text-[#17212A] mb-1">
                Mi diario
              </h2>
              <p className="font-sans text-[13px] sm:text-[14px] text-[#6F8796] leading-relaxed">
                Un espacio íntimo para escribir lo que llevas dentro y registrar tu camino.
              </p>
            </div>
          </div>

          {/* Privacy Note */}
          <div className="p-4 rounded-xl bg-[#1F3443]/3 text-[#6F8796] font-sans text-xs leading-relaxed mt-1">
            Tu espacio está asociado a tu cuenta y protegido para que otros usuarios no puedan acceder a tus intenciones.
          </div>

          {/* Call to Actions */}
          <div className="flex flex-col gap-3 pt-3 max-w-sm mx-auto w-full">
            <Link
              href="/entrar?next=/camino"
              className="w-full py-4 px-5 rounded-2xl bg-[#1F3443] text-[#F7F4EE] font-sans text-[15px] font-medium text-center shadow-[0_2px_12px_rgba(31,52,67,0.12)] hover:bg-[#284255] active:scale-[0.98] transition-all cursor-pointer"
            >
              Crear mi espacio
            </Link>

            <Link
              href="/entrar?next=/camino"
              className="w-full py-3 px-5 rounded-2xl bg-transparent border border-[#1F3443]/15 text-[#17212A] font-sans text-[14px] font-medium text-center hover:bg-white active:scale-[0.98] transition-all cursor-pointer"
            >
              Ya tengo una cuenta
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // ---------------------------------------------------------------------------
  // VISTA AUTENTICADA: Camino real con intenciones privadas del usuario
  // ---------------------------------------------------------------------------
  const previewIntentions = intentions.slice(0, 2);

  return (
    <main className="w-full flex flex-col select-none">
      <Header greeting="Tu espacio" />

      {/* Page Title & Subtitle */}
      <section className="w-full px-6 pt-5 pb-5">
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
      <div className="w-full px-6 flex flex-col gap-6 pt-2 pb-10">
        {/* SECTION 1: Mis intenciones */}
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
            Personas, preocupaciones y situaciones por las que quieres seguir orando.
          </p>

          {/* Estado de carga suave */}
          {isIntentionsLoading ? (
            <div className="flex flex-col gap-2.5 mb-5 animate-pulse">
              <div className="h-16 rounded-xl bg-[#1F3443]/5" />
              <div className="h-16 rounded-xl bg-[#1F3443]/5" />
            </div>
          ) : previewIntentions.length > 0 ? (
            /* Mini Preview de intenciones reales del usuario */
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
          ) : (
            <p className="font-sans text-xs text-[#6F8796] mb-5 italic">
              Aún no tienes intenciones guardadas.
            </p>
          )}

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
