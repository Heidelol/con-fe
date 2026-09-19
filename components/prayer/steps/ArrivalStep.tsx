"use client";

import React from "react";
import { ArrivalStepData } from "@/types/prayer";
import { usePrayerAutoAdvance } from "@/hooks/usePrayerAutoAdvance";

interface ArrivalStepProps {
  data: ArrivalStepData;
  onNext: () => void;
  isPaused?: boolean;
}

export function ArrivalStep({ data, onNext, isPaused = false }: ArrivalStepProps) {
  const { skip } = usePrayerAutoAdvance({
    enabled: data.autoAdvance?.enabled ?? true,
    durationSeconds: data.autoAdvance?.durationSeconds ?? 6,
    onAdvance: onNext,
    isPaused,
  });

  return (
    <div className="flex-1 flex flex-col justify-between px-6 pt-12 pb-10 max-w-lg mx-auto w-full select-none animate-in fade-in duration-700">
      {/* Visual Sanctuary Aura */}
      <div className="flex-1 flex flex-col items-center justify-center text-center my-auto">
        {/* Soft breathing halo */}
        <div className="relative flex items-center justify-center mb-8">
          <div
            className="w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-[#D3B58A]/20 blur-2xl animate-pulse motion-reduce:animate-none"
            style={{ animationDuration: "5s" }}
            aria-hidden="true"
          />
          <div
            className="absolute w-24 h-24 rounded-full bg-white/80 border border-[#D3B58A]/40 flex items-center justify-center shadow-xs text-[#1F3443] motion-reduce:transform-none"
            style={{
              animation: "arrivalPulse 5s ease-in-out infinite",
            }}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#D3B58A]" />
          </div>
        </div>

        {/* Text */}
        <h1 className="font-serif text-[32px] sm:text-[38px] leading-[1.2] text-[#17212A] font-normal tracking-[-0.015em] mb-3">
          {data.title}
        </h1>

        <p className="font-sans text-[16px] sm:text-[17px] text-[#6F8796] leading-relaxed max-w-xs mx-auto">
          {data.subtitle}
        </p>
      </div>

      {/* Discrete bottom skip CTA */}
      <div className="w-full flex justify-center pt-6">
        <button
          type="button"
          onClick={skip}
          className="text-xs sm:text-[13px] font-sans font-medium text-[#6F8796] hover:text-[#17212A] py-2 px-4 rounded-full hover:bg-[#1F3443]/5 transition-colors focus-visible:ring-2 focus-visible:ring-[#1F3443] focus-visible:outline-none cursor-pointer"
        >
          {data.autoAdvance?.skipText || "Continuar ahora"}
        </button>
      </div>

      <style jsx>{`
        @keyframes arrivalPulse {
          0%, 100% {
            transform: scale(0.97);
            opacity: 0.85;
          }
          50% {
            transform: scale(1.04);
            opacity: 1;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-pulse,
          div {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
