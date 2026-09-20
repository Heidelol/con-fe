"use client";

import React from "react";
import { HeadphonesIcon, BookOpenIcon, ArrowLeftIcon } from "@/components/ui/Icons";

interface PrayerExperienceIntroProps {
  title: string;
  internalTitle?: string;
  onSelectVoice: () => void;
  onSelectReading: () => void;
  onBack: () => void;
}

export function PrayerExperienceIntro({
  title,
  internalTitle,
  onSelectVoice,
  onSelectReading,
  onBack,
}: PrayerExperienceIntroProps) {
  return (
    <main className="flex-1 flex flex-col justify-between px-6 pt-6 pb-10 max-w-lg mx-auto w-full select-none animate-in fade-in duration-500">
      {/* Top discreet back navigation */}
      <div className="w-full flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center text-[#6F8796] hover:text-[#17212A] hover:bg-[#1F3443]/5 transition-colors focus-visible:ring-2 focus-visible:ring-[#1F3443] focus-visible:outline-none cursor-pointer"
          aria-label="Volver a los temas"
        >
          <ArrowLeftIcon size={18} />
        </button>

        <span className="font-serif text-[14px] text-[#1F3443]/50 tracking-tight">
          con fe
        </span>

        <div className="w-10 h-10" />
      </div>

      {/* Central Question and Spiritual Invitation */}
      <div className="flex-1 flex flex-col items-center justify-center text-center my-auto px-2">
        {/* Soft breathing aura */}
        <div className="relative flex items-center justify-center mb-8">
          <div
            className="w-32 h-32 rounded-full bg-[#D3B58A]/20 blur-xl animate-pulse"
            style={{ animationDuration: "4s" }}
            aria-hidden="true"
          />
          <div className="absolute w-20 h-20 rounded-full bg-white/90 border border-[#D3B58A]/30 flex items-center justify-center shadow-xs text-[#1F3443]">
            <HeadphonesIcon size={26} className="text-[#1F3443]" />
          </div>
        </div>

        {/* Small topic badge */}
        <span className="text-[12px] font-sans font-medium text-[#A45A3E] mb-2 uppercase tracking-wider">
          {title}
        </span>

        <h1 className="font-serif text-[28px] sm:text-[34px] leading-[1.25] text-[#17212A] font-normal tracking-[-0.015em] mb-3 max-w-sm">
          ¿Cómo quieres vivir este momento?
        </h1>

        <p className="font-sans text-[15px] sm:text-[16px] text-[#6F8796] leading-relaxed max-w-xs mb-8">
          {internalTitle || "Puedes escuchar una voz que te acompaña o hacer este momento a tu propio ritmo de lectura."}
        </p>

        {/* Mode Selection Cards */}
        <div className="w-full flex flex-col gap-3.5 max-w-sm mx-auto">
          {/* Option 1: Guíame con voz (Primary) */}
          <button
            type="button"
            onClick={onSelectVoice}
            className="w-full p-4 sm:p-5 rounded-2xl bg-[#1F3443] text-[#F7F4EE] shadow-[0_4px_16px_rgba(31,52,67,0.16)] hover:bg-[#284255] active:scale-[0.985] transition-all flex items-center gap-4 text-left group cursor-pointer border border-[#1F3443]/30"
          >
            <div className="w-12 h-12 rounded-xl bg-white/12 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform text-[#D3B58A]">
              <HeadphonesIcon size={24} />
            </div>
            <div className="flex flex-col">
              <span className="font-sans text-[16px] font-semibold text-white tracking-tight flex items-center gap-2">
                Guíame con voz
                <span className="text-[11px] font-sans font-normal px-2 py-0.5 rounded-full bg-[#D3B58A]/30 text-[#F7F4EE]">
                  Audio
                </span>
              </span>
              <span className="font-sans text-xs text-[#F7F4EE]/75 mt-0.5 leading-snug">
                Voz serena que acompaña y te guía paso a paso
              </span>
            </div>
          </button>

          {/* Option 2: Prefiero leer (Secondary) */}
          <button
            type="button"
            onClick={onSelectReading}
            className="w-full p-4 sm:p-5 rounded-2xl bg-white border border-[#1F3443]/12 shadow-2xs hover:bg-[#F7F4EE]/60 hover:border-[#1F3443]/20 active:scale-[0.985] transition-all flex items-center gap-4 text-left group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-[#1F3443]/5 text-[#1F3443] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <BookOpenIcon size={22} />
            </div>
            <div className="flex flex-col">
              <span className="font-sans text-[15px] font-medium text-[#17212A] tracking-tight">
                Prefiero leer
              </span>
              <span className="font-sans text-xs text-[#6F8796] mt-0.5 leading-snug">
                Avanza a tu propio ritmo en silencio
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Discrete bottom privacy note */}
      <div className="w-full text-center pt-4">
        <p className="text-[12px] font-sans text-[#6F8796]/80">
          Un espacio íntimo y confidencial para orar
        </p>
      </div>
    </main>
  );
}
