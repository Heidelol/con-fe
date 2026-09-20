import React from "react";
import Link from "next/link";
import { BookmarkIcon } from "@/components/ui/Icons";

interface EmptyIntentionsProps {
  filtered?: boolean;
  onResetFilter?: () => void;
}

export function EmptyIntentions({
  filtered = false,
  onResetFilter,
}: EmptyIntentionsProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 px-4 rounded-3xl bg-white/60 border border-[#1F3443]/6 my-4">
      <div className="w-14 h-14 rounded-2xl bg-[#F7F4EE] border border-[#D3B58A]/30 flex items-center justify-center text-[#1F3443] mb-5 shadow-2xs">
        <BookmarkIcon size={24} className="text-[#1F3443]" />
      </div>

      <h3 className="font-serif text-[20px] sm:text-[22px] text-[#17212A] font-medium tracking-tight mb-2 max-w-xs">
        {filtered
          ? "No hay intenciones en esta sección"
          : "Todavía no tienes intenciones guardadas."}
      </h3>

      <p className="font-sans text-[14px] text-[#6F8796] leading-relaxed max-w-xs mb-6">
        {filtered
          ? "Prueba cambiando de filtro o crea una nueva intención."
          : "Cuando haya algo que quieras seguir poniendo en manos de Dios, puedes guardarlo aquí."}
      </p>

      {filtered && onResetFilter ? (
        <button
          type="button"
          onClick={onResetFilter}
          className="py-2.5 px-5 rounded-full bg-[#1F3443]/8 text-[#1F3443] font-sans text-xs font-medium hover:bg-[#1F3443]/15 transition-colors cursor-pointer"
        >
          Ver todas las intenciones
        </button>
      ) : (
        <Link
          href="/camino/intenciones/nueva"
          className="py-3 px-6 rounded-full bg-[#1F3443] text-[#F7F4EE] font-sans text-[14px] font-medium shadow-sm hover:bg-[#284255] active:scale-[0.98] transition-all cursor-pointer"
        >
          Crear mi primera intención
        </Link>
      )}
    </div>
  );
}
