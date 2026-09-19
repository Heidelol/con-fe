"use client";

import React, { useState } from "react";
import { SpiritualClosingStepData } from "@/types/prayer";
import { usePrayerAutoAdvance } from "@/hooks/usePrayerAutoAdvance";
import { BookmarkIcon } from "@/components/ui/Icons";

interface SpiritualClosingStepProps {
  data: SpiritualClosingStepData;
  onFinish: () => void;
  onSaveIntention: () => void;
  isPaused?: boolean;
}

export function SpiritualClosingStep({
  data,
  onFinish,
  onSaveIntention,
  isPaused = false,
}: SpiritualClosingStepProps) {
  const [phase, setPhase] = useState<"prayer" | "scripture">("prayer");

  // Timer for optional prayer phase (~14s)
  const { skip: skipPrayer } = usePrayerAutoAdvance({
    enabled: phase === "prayer",
    durationSeconds: data.optionalPrayer.durationSeconds || 14,
    onAdvance: () => setPhase("scripture"),
    isPaused,
  });

  return (
    <div className="flex-1 flex flex-col justify-between px-6 pt-8 pb-10 max-w-lg mx-auto w-full select-none animate-in fade-in duration-500">
      {/* 1. Phase A: Optional Prayer */}
      {phase === "prayer" && (
        <>
          <div className="flex-1 flex flex-col pt-4">
            <span className="text-[11px] font-sans font-semibold uppercase tracking-widest text-[#6F8796] mb-2 block">
              Oración de entrega
            </span>

            <h2 className="font-serif text-[26px] sm:text-[30px] leading-[1.28] text-[#17212A] font-normal tracking-[-0.015em] mb-6">
              {data.optionalPrayer.title}
            </h2>

            {/* Editorial prayer stanzas */}
            <div className="border-l-2 border-[#D3B58A] pl-5 py-2 flex flex-col gap-3.5 bg-white/50 rounded-r-2xl p-4 shadow-2xs">
              {data.optionalPrayer.prayerLines.map((line, idx) => (
                <p
                  key={idx}
                  className={`font-serif text-[16px] sm:text-[17px] leading-relaxed ${
                    line === "Amén."
                      ? "font-semibold text-[#1F3443] pt-1"
                      : "text-[#263845]"
                  }`}
                >
                  {line}
                </p>
              ))}
            </div>
          </div>

          <div className="w-full flex justify-center pt-6">
            <button
              type="button"
              onClick={skipPrayer}
              className="text-xs sm:text-[13px] font-sans font-medium text-[#6F8796] hover:text-[#17212A] py-2 px-4 rounded-full hover:bg-[#1F3443]/5 transition-colors focus-visible:ring-2 focus-visible:ring-[#1F3443] focus-visible:outline-none cursor-pointer"
            >
              {data.optionalPrayer.skipText || "Continuar ahora"}
            </button>
          </div>
        </>
      )}

      {/* 2. Phase B: Scripture & Closing */}
      {phase === "scripture" && (
        <div className="flex-1 flex flex-col justify-between animate-in fade-in duration-700">
          <div className="flex-1 flex flex-col pt-4">
            <span className="text-[11px] font-sans font-semibold uppercase tracking-widest text-[#6F8796] mb-2 block">
              Palabra de Dios
            </span>

            <h2 className="font-serif text-[26px] sm:text-[30px] leading-[1.28] text-[#17212A] font-normal tracking-[-0.015em] mb-6">
              {data.scripture.title}
            </h2>

            {/* Scripture card */}
            <div className="p-6 rounded-2xl bg-white border border-[#1F3443]/8 shadow-xs flex flex-col gap-3">
              <span className="text-xs font-semibold text-[#A45A3E] tracking-wide">
                {data.scripture.reference}
              </span>

              <blockquote className="font-serif text-[18px] sm:text-[20px] text-[#17212A] italic leading-relaxed">
                {data.scripture.passage}
              </blockquote>

              <p className="font-sans text-xs sm:text-[13px] text-[#6F8796] pt-3 border-t border-[#1F3443]/6 leading-relaxed">
                {data.scripture.reflection}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="w-full flex flex-col items-center gap-3 pt-8 max-w-sm mx-auto">
            <button
              type="button"
              onClick={onFinish}
              className="w-full py-4 rounded-xl bg-[#1F3443] text-[#F7F4EE] font-sans font-medium text-base shadow-[0_4px_16px_rgba(31,52,67,0.15)] hover:bg-[#284255] active:scale-[0.98] transition-all focus-visible:ring-2 focus-visible:ring-[#1F3443] focus-visible:outline-none cursor-pointer"
            >
              {data.finishText || "Terminar"}
            </button>

            <button
              type="button"
              onClick={onSaveIntention}
              className="w-full py-3 px-5 rounded-xl bg-white border border-[#1F3443]/12 text-[#17212A] font-sans text-sm font-medium hover:bg-[#F7F4EE] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
            >
              <BookmarkIcon size={15} />
              <span>{data.saveIntentionText || "Guardar como intención"}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
