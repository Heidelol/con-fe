"use client";

import React from "react";
import { DailyPrayer } from "@/types/daily-prayer";
import { ArrowLeftIcon, PlayIcon, BookOpenIcon } from "@/components/ui/Icons";

interface DailyPrayerIntroProps {
  prayer: DailyPrayer;
  onStartAudio: () => void;
  onStartReading: () => void;
  onBack: () => void;
}

export function DailyPrayerIntro({
  prayer,
  onStartAudio,
  onStartReading,
  onBack,
}: DailyPrayerIntroProps) {
  return (
    <div className="min-h-screen bg-[#F7F4EE] flex flex-col justify-between px-6 sm:px-8 py-6 max-w-lg mx-auto select-none">
      {/* Top Bar: Discreet Exit / Back */}
      <header className="flex items-center justify-between w-full pt-1">
        <button
          type="button"
          onClick={onBack}
          className="p-2 -ml-2 rounded-full text-[#6F8796] hover:text-[#17212A] hover:bg-[#1F3443]/5 transition-colors focus-visible:ring-2 focus-visible:ring-[#1F3443] focus-visible:outline-none cursor-pointer"
          aria-label="Volver al inicio"
        >
          <ArrowLeftIcon size={22} />
        </button>

        <span className="text-xs font-semibold uppercase tracking-wider text-[#6F8796]">
          Oración del Día
        </span>

        {/* Empty placeholder to balance flex */}
        <div className="w-8" aria-hidden="true" />
      </header>

      {/* Main Sanctuary Card */}
      <main className="flex-1 flex flex-col items-center justify-center my-8 text-center max-w-sm mx-auto">
        {/* Sacred ambient halo */}
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#D3B58A]/30 to-[#1F3443]/10 blur-xl absolute -inset-2" />
          <div className="relative w-20 h-20 rounded-full bg-white/80 border border-[#D3B58A]/40 flex items-center justify-center shadow-xs text-[#1F3443]">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 3v18" />
              <path d="M7 8h10" />
              <circle cx="12" cy="8" r="1.5" fill="currentColor" />
            </svg>
          </div>
        </div>

        {/* Metadata badge */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#1F3443]/6 text-xs font-semibold tracking-wider text-[#1F3443] uppercase mb-4">
          <span>{prayer.category}</span>
          <span>·</span>
          <span>{prayer.durationLabel}</span>
        </div>

        {/* Title */}
        <h1 className="font-serif text-3xl sm:text-4xl text-[#17212A] font-medium leading-tight mb-4">
          {prayer.title}
        </h1>

        {/* Subtitle / purpose */}
        {prayer.subtitle && (
          <p className="font-sans text-[15px] text-[#4E616E] leading-relaxed mb-6">
            {prayer.subtitle}
          </p>
        )}

        {/* Scripture preview pill */}
        <div className="p-4 rounded-xl bg-white/70 border border-[#1F3443]/6 text-left w-full mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#A45A3E] block mb-1">
            {prayer.scriptureReference}
          </span>
          <p className="font-serif italic text-sm text-[#263845] leading-relaxed">
            “{prayer.scriptureText}”
          </p>
        </div>
      </main>

      {/* Action Footer */}
      <footer className="w-full flex flex-col items-center gap-3.5 pb-4 max-w-sm mx-auto">
        {/* Primary Audio CTA */}
        <button
          type="button"
          onClick={onStartAudio}
          className="w-full py-4 px-6 rounded-2xl bg-[#1F3443] text-[#F7F4EE] font-sans font-medium text-base shadow-[0_4px_16px_rgba(31,52,67,0.15)] hover:bg-[#284255] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group focus-visible:ring-2 focus-visible:ring-[#1F3443] focus-visible:outline-none cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center group-hover:scale-110 transition-transform">
            <span className="translate-x-0.5">
              <PlayIcon size={16} />
            </span>
          </div>
          <span>Escuchar oración</span>
          <span className="text-xs text-[#F7F4EE]/70 font-normal">({prayer.durationLabel})</span>
        </button>

        {/* Secondary Reading CTA */}
        <button
          type="button"
          onClick={onStartReading}
          className="w-full py-3 px-4 rounded-xl bg-transparent text-[#1F3443] font-sans text-sm font-medium hover:bg-white/60 transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <BookOpenIcon size={16} />
          <span>Prefiero leer</span>
        </button>

        <p className="text-[11px] text-[#6F8796] font-sans italic text-center">
          Toma un momento de calma para ti y para Dios.
        </p>
      </footer>
    </div>
  );
}
