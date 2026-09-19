import React from "react";
import Link from "next/link";
import { ALL_INTENTIONS } from "@/data/prayers";
import { ArrowLeftIcon, ChevronRightIcon } from "@/components/ui/Icons";

export default function OrarIndexPage() {
  const principalIntentions = ALL_INTENTIONS.filter(
    (i) => i.category === "principal"
  );
  const extendedIntentions = ALL_INTENTIONS.filter(
    (i) => i.category === "extended"
  );

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#F7F4EE] px-6 pt-6 pb-12">
      {/* Top Bar */}
      <div className="w-full flex items-center justify-between pb-6">
        <Link
          href="/"
          className="w-9 h-9 rounded-full flex items-center justify-center text-[#6F8796] hover:text-[#1F3443] hover:bg-[#1F3443]/5 active:scale-95 transition-all focus-visible:ring-2 focus-visible:ring-[#1F3443] focus-visible:outline-none"
          aria-label="Regresar al inicio"
        >
          <ArrowLeftIcon size={18} />
        </Link>
        <span className="font-serif text-[15px] font-medium text-[#1F3443]/60 tracking-tight select-none">
          con fe
        </span>
        <div className="w-9 h-9" />
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="font-serif text-[28px] leading-[1.25] text-[#17212A] font-normal tracking-[-0.015em] mb-2">
          ¿Qué sientes hoy?
        </h1>
        <p className="font-sans text-[15px] text-[#6F8796] leading-relaxed">
          Elige aquello que quieras poner en manos de Dios.
        </p>
      </div>

      {/* Principales */}
      <section className="mb-8" aria-label="Intenciones principales">
        <span className="text-[12px] font-sans font-medium uppercase tracking-wider text-[#6F8796] block mb-3">
          Principales
        </span>

        <div className="flex flex-col gap-2.5">
          {principalIntentions.map((item) => (
            <Link
              key={item.slug}
              href={`/orar/${item.slug}`}
              className={`group flex items-center justify-between p-4 rounded-2xl border transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#1F3443] focus-visible:outline-none ${
                item.slug === "preocupacion"
                  ? "bg-white border-[#1F3443]/12 shadow-[0_2px_8px_rgba(31,52,67,0.03)] hover:border-[#1F3443]/25 active:scale-[0.99]"
                  : "bg-white/80 border-[#1F3443]/6 hover:bg-white hover:border-[#1F3443]/15 active:scale-[0.99]"
              }`}
            >
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-sans text-[15px] font-medium text-[#17212A] group-hover:text-[#1F3443]">
                    {item.title}
                  </span>
                  {item.slug === "preocupacion" && (
                    <span className="px-2 py-0.5 rounded-full bg-[#1F3443]/8 text-[#1F3443] text-[11px] font-medium">
                      Disponible
                    </span>
                  )}
                </div>
                <span className="font-sans text-[13px] text-[#6F8796] mt-0.5">
                  {item.subtitle}
                </span>
              </div>
              <span className="text-[#6F8796] group-hover:text-[#1F3443] transition-colors ml-2">
                <ChevronRightIcon size={16} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Más momentos */}
      <section aria-label="Más intenciones">
        <span className="text-[12px] font-sans font-medium uppercase tracking-wider text-[#6F8796] block mb-3">
          Más momentos
        </span>

        <div className="flex flex-col gap-2.5">
          {extendedIntentions.map((item) => (
            <Link
              key={item.slug}
              href={`/orar/${item.slug}`}
              className="group flex items-center justify-between p-4 rounded-2xl bg-white/70 border border-[#1F3443]/6 transition-all duration-200 hover:bg-white hover:border-[#1F3443]/15 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-[#1F3443] focus-visible:outline-none"
            >
              <div className="flex flex-col">
                <span className="font-sans text-[15px] font-medium text-[#17212A] group-hover:text-[#1F3443]">
                  {item.title}
                </span>
                <span className="font-sans text-[13px] text-[#6F8796] mt-0.5">
                  {item.subtitle}
                </span>
              </div>
              <span className="text-[#6F8796] group-hover:text-[#1F3443] transition-colors ml-2">
                <ChevronRightIcon size={16} />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
