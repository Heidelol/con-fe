"use client";

import React from "react";
import { DailyPrayer } from "@/types/daily-prayer";
import { BookmarkIcon, HeadphonesIcon } from "@/components/ui/Icons";

interface DailyPrayerCompletionProps {
  prayer: DailyPrayer;
  onSaveIntention: () => void;
  onListenAgain: () => void;
  onFinish: () => void;
}

export function DailyPrayerCompletion({
  prayer,
  onSaveIntention,
  onListenAgain,
  onFinish,
}: DailyPrayerCompletionProps) {
  return (
    <div className="min-h-screen bg-[#F7F4EE] flex flex-col justify-between px-6 sm:px-8 py-8 max-w-lg mx-auto select-none">
      {/* Top spacing */}
      <div className="w-full flex items-center justify-center pt-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#6F8796]">
          Momento completado
        </span>
      </div>

      {/* Main Peaceful Content */}
      <main className="flex-1 flex flex-col items-center justify-center text-center max-w-sm mx-auto my-6">
        {/* Serene Completion Aura */}
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-full bg-[#D3B58A]/30 blur-xl absolute -inset-2" />
          <div className="relative w-20 h-20 rounded-full bg-white border border-[#D3B58A]/50 flex items-center justify-center shadow-xs text-[#1F3443]">
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {/* Calm leaf/peace symbol */}
              <path d="M12 3a9 9 0 0 1 9 9c0 5-4 9-9 9s-9-4-9-9a9 9 0 0 1 9-9z" />
              <path d="M9 12l2 2 4-4" />
            </svg>
          </div>
        </div>

        {/* Peaceful Closing Title */}
        <h1 className="font-serif text-3xl sm:text-4xl text-[#17212A] font-medium leading-tight mb-3">
          Por hoy es suficiente.
        </h1>

        <p className="font-sans text-[15px] text-[#4E616E] leading-relaxed mb-6">
          Has dedicado este espacio para estar en presencia de Dios. Lleva esta serenidad en cada paso de tu día.
        </p>

        {/* Sacred Scripture Capsule */}
        <div className="w-full p-4 rounded-2xl bg-white/80 border border-[#1F3443]/8 text-left shadow-2xs">
          <div className="flex items-center justify-between text-xs font-semibold text-[#A45A3E] mb-1">
            <span>{prayer.scriptureReference}</span>
            <span className="text-[11px] font-normal text-[#6F8796]">{prayer.category}</span>
          </div>
          <p className="font-serif italic text-sm text-[#263845] leading-relaxed">
            “{prayer.scriptureText}”
          </p>
        </div>
      </main>

      {/* Actions */}
      <footer className="w-full flex flex-col gap-3 pb-4 max-w-sm mx-auto">
        {/* Primary: Terminar */}
        <button
          type="button"
          onClick={onFinish}
          className="w-full py-4 rounded-xl bg-[#1F3443] text-[#F7F4EE] font-sans font-medium text-base shadow-[0_4px_16px_rgba(31,52,67,0.15)] hover:bg-[#284255] active:scale-[0.98] transition-all focus-visible:ring-2 focus-visible:ring-[#1F3443] focus-visible:outline-none cursor-pointer"
        >
          Terminar
        </button>

        {/* Secondary: Guardar como intención */}
        <button
          type="button"
          onClick={onSaveIntention}
          className="w-full py-3.5 rounded-xl bg-white border border-[#1F3443]/12 text-[#1F3443] font-sans font-medium text-sm hover:bg-[#F7F4EE] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
        >
          <BookmarkIcon size={16} />
          <span>Guardar como intención</span>
        </button>

        {/* Tertiary: Volver a escuchar */}
        <button
          type="button"
          onClick={onListenAgain}
          className="w-full py-2.5 rounded-xl bg-transparent text-[#6F8796] hover:text-[#17212A] font-sans text-xs sm:text-sm font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <HeadphonesIcon size={15} />
          <span>Volver a escuchar</span>
        </button>
      </footer>
    </div>
  );
}
