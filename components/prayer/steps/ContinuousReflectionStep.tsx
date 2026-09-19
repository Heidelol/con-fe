"use client";

import React, { useState } from "react";
import { ContinuousReflectionStepData } from "@/types/prayer";
import { usePrayerAutoAdvance } from "@/hooks/usePrayerAutoAdvance";
import { ContemplativeProgress } from "@/components/prayer/ContemplativeProgress";

interface ContinuousReflectionStepProps {
  data: ContinuousReflectionStepData;
  onNext: () => void;
  isPaused?: boolean;
}

export function ContinuousReflectionStep({
  data,
  onNext,
  isPaused = false,
}: ContinuousReflectionStepProps) {
  const [phase, setPhase] = useState<"phaseA" | "phaseB">("phaseA");

  // Timer for Phase A (~8s)
  const { progress: progressA, skip: skipPhaseA } = usePrayerAutoAdvance({
    enabled: phase === "phaseA",
    durationSeconds: data.phaseA.durationSeconds,
    onAdvance: () => setPhase("phaseB"),
    isPaused,
  });

  // Timer for Phase B (~12s)
  const { progress: progressB, skip: skipPhaseB } = usePrayerAutoAdvance({
    enabled: phase === "phaseB",
    durationSeconds: data.phaseB.durationSeconds,
    onAdvance: onNext,
    isPaused,
  });

  const handleSkip = () => {
    if (phase === "phaseA") {
      skipPhaseA();
    } else {
      skipPhaseB();
    }
  };

  const currentContent = phase === "phaseA" ? data.phaseA : data.phaseB;
  const activeProgress = phase === "phaseA" ? progressA : progressB;

  return (
    <div className="flex-1 flex flex-col justify-between px-6 pt-12 pb-10 max-w-lg mx-auto w-full select-none animate-in fade-in duration-700">
      {/* Visual Aura */}
      <div className="flex-1 flex flex-col items-center justify-center text-center my-auto">
        <div className="relative flex items-center justify-center mb-8">
          <div
            className={`w-40 h-40 sm:w-48 sm:h-48 rounded-full blur-2xl transition-all duration-1000 ${
              phase === "phaseA"
                ? "bg-[#D3B58A]/25 animate-pulse"
                : "bg-[#1F3443]/15 animate-pulse"
            }`}
            style={{ animationDuration: "6s" }}
            aria-hidden="true"
          />
          <div
            className="absolute w-24 h-24 rounded-full bg-white/80 border border-[#D3B58A]/40 flex items-center justify-center shadow-xs text-[#1F3443] transition-all duration-700"
            aria-hidden="true"
          >
            <span
              className={`w-2.5 h-2.5 rounded-full transition-colors duration-700 ${
                phase === "phaseA" ? "bg-[#D3B58A]" : "bg-[#1F3443]"
              }`}
            />
          </div>
        </div>

        {/* Phase content with smooth key re-render fade */}
        <div
          key={phase}
          className="flex flex-col items-center gap-3 animate-in fade-in duration-700 max-w-sm px-2"
        >
          <span className="text-[11px] font-sans font-semibold uppercase tracking-widest text-[#6F8796]">
            {phase === "phaseA" ? "Discernir" : "Entregar"}
          </span>

          <h2 className="font-serif text-[28px] sm:text-[34px] leading-[1.25] text-[#17212A] font-normal tracking-[-0.015em]">
            {currentContent.title}
          </h2>

          <p className="font-sans text-[16px] text-[#6F8796] leading-relaxed max-w-xs">
            {currentContent.text}
          </p>
        </div>
      </div>

      {/* Discrete bottom contemplative progress & skip CTA */}
      <div className="w-full flex flex-col items-center gap-3 pt-6">
        <ContemplativeProgress progress={activeProgress} />

        <button
          type="button"
          onClick={handleSkip}
          className="text-xs sm:text-[13px] font-sans font-medium text-[#6F8796] hover:text-[#17212A] py-1.5 px-4 rounded-full hover:bg-[#1F3443]/5 transition-colors focus-visible:ring-2 focus-visible:ring-[#1F3443] focus-visible:outline-none cursor-pointer"
        >
          {data.skipText || "Continuar ahora"}
        </button>
      </div>
    </div>
  );
}
