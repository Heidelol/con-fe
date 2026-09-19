import React from "react";
import { Header } from "@/components/ui/Header";
import { BookmarkIcon, BookOpenIcon, ChevronRightIcon } from "@/components/ui/Icons";

export default function CaminoPage() {
  return (
    <main className="w-full flex flex-col">
      <Header greeting="Tu espacio" />

      {/* Page Title & Subtitle */}
      <section className="w-full px-6 pt-5 pb-6">
        <h1 className="font-serif text-[28px] leading-[1.25] text-[#17212A] font-normal tracking-[-0.015em] mb-2">
          Tu camino
        </h1>
        <p className="font-sans text-[15px] text-[#6F8796] leading-relaxed">
          Un espacio para tus intenciones y reflexiones.
        </p>
      </section>

      {/* Cards List */}
      <section className="w-full px-6 flex flex-col gap-4" aria-label="Secciones de camino">
        {/* Mis intenciones */}
        <div className="group flex flex-col p-5 rounded-2xl bg-white border border-[#1F3443]/7 shadow-[0_1px_4px_rgba(31,52,67,0.02)] transition-all duration-200 hover:border-[#1F3443]/15 hover:shadow-[0_4px_16px_rgba(31,52,67,0.04)] active:scale-[0.99]">
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-xl bg-[#F7F4EE] flex items-center justify-center text-[#1F3443] transition-colors group-hover:bg-[#DCE6EB]/40">
              <BookmarkIcon size={20} />
            </div>
            <span className="text-[#6F8796] group-hover:text-[#1F3443] transition-colors p-1">
              <ChevronRightIcon size={18} />
            </span>
          </div>

          <h2 className="mt-4 font-serif text-[19px] text-[#17212A] font-medium tracking-tight">
            Mis intenciones
          </h2>
          <p className="mt-1.5 font-sans text-[14px] text-[#6F8796] leading-relaxed">
            Guarda aquello que quieres poner en manos de Dios.
          </p>

          <div className="mt-4 pt-3 border-t border-[#1F3443]/5 flex items-center justify-between text-[12px] text-[#6F8796]">
            <span>Tus peticiones y agradecimientos</span>
            <span className="font-medium text-[#1F3443]">Próximamente</span>
          </div>
        </div>

        {/* Mi diario */}
        <div className="group flex flex-col p-5 rounded-2xl bg-white border border-[#1F3443]/7 shadow-[0_1px_4px_rgba(31,52,67,0.02)] transition-all duration-200 hover:border-[#1F3443]/15 hover:shadow-[0_4px_16px_rgba(31,52,67,0.04)] active:scale-[0.99]">
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] flex items-center justify-center text-[#1F3443] transition-colors group-hover:bg-[#D3B58A]/20">
              <BookOpenIcon size={20} />
            </div>
            <span className="text-[#6F8796] group-hover:text-[#1F3443] transition-colors p-1">
              <ChevronRightIcon size={18} />
            </span>
          </div>

          <h2 className="mt-4 font-serif text-[19px] text-[#17212A] font-medium tracking-tight">
            Mi diario
          </h2>
          <p className="mt-1.5 font-sans text-[14px] text-[#6F8796] leading-relaxed">
            Un espacio privado para escribir lo que llevas dentro.
          </p>

          <div className="mt-4 pt-3 border-t border-[#1F3443]/5 flex items-center justify-between text-[12px] text-[#6F8796]">
            <span>Reflexiones personales íntimas</span>
            <span className="font-medium text-[#1F3443]">Próximamente</span>
          </div>
        </div>
      </section>
    </main>
  );
}
