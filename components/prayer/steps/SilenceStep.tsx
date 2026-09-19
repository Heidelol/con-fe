"use client";

import React, { useState, useEffect } from "react";
import { SilenceStepData } from "@/types/prayer";

interface SilenceStepProps {
  data: SilenceStepData;
  onNext: () => void;
}

export function SilenceStep({ data, onNext }: SilenceStepProps) {
  const [isSilenceActive, setIsSilenceActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSilenceActive) {
      timer = setTimeout(() => {
        setIsCompleted(true);
      }, (data.silenceDurationSeconds || 10) * 1000);
    }
    return () => clearTimeout(timer);
  }, [isSilenceActive, data.silenceDurationSeconds]);

  if (!isSilenceActive) {
    return (
      <div className="flex-1 flex flex-col justify-between px-6 pt-12 pb-8 animate-in fade-in duration-300">
        <div className="flex-1 flex flex-col justify-center max-w-[340px] mx-auto text-center">
          <h2 className="font-serif text-[28px] sm:text-[32px] leading-[1.28] text-[#17212A] font-normal tracking-[-0.015em] mb-4">
            {data.title}
          </h2>

          {data.description && (
            <p className="font-sans text-[16px] text-[#6F8796] leading-relaxed">
              {data.description}
            </p>
          )}
        </div>

        <div className="w-full flex justify-center pt-8">
          <button
            type="button"
            onClick={() => setIsSilenceActive(true)}
            className="w-full sm:w-auto min-w-[220px] py-3.5 px-8 rounded-full bg-[#1F3443] text-[#F7F4EE] font-sans text-[15px] font-medium tracking-normal transition-all hover:bg-[#284255] active:scale-[0.98] shadow-sm focus-visible:ring-2 focus-visible:ring-[#1F3443] focus-visible:outline-none"
          >
            {data.ctaText}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col justify-between px-6 pt-10 pb-8 animate-in fade-in duration-700">
      {/* Subtle serene aura breathing slowly */}
      <div className="flex-1 flex flex-col items-center justify-center relative">
        <div className="relative flex items-center justify-center">
          {/* Outer glow ring */}
          <div
            className="w-48 h-48 rounded-full bg-[#D3B58A]/15 blur-2xl animate-pulse motion-reduce:animate-none"
            style={{ animationDuration: "6s" }}
            aria-hidden="true"
          />
          {/* Inner tranquil halo */}
          <div
            className="absolute w-28 h-28 rounded-full border border-[#D3B58A]/30 bg-[#F7F4EE] shadow-[0_0_40px_rgba(211,181,138,0.2)] transition-transform duration-1000 motion-reduce:transform-none"
            style={{
              animation: "breathingLight 6s ease-in-out infinite",
            }}
            aria-hidden="true"
          />
          {/* Center serene spark */}
          <span
            className="absolute w-2 h-2 rounded-full bg-[#D3B58A] opacity-75"
            aria-hidden="true"
          />
        </div>

        <p className="mt-12 font-serif text-[20px] text-[#17212A] font-normal tracking-tight text-center max-w-[260px] leading-relaxed opacity-90 select-none">
          En silencio y confianza…
        </p>
      </div>

      {/* Exit or Ready CTA */}
      <div className="w-full flex flex-col items-center gap-3 pt-6">
        <button
          type="button"
          onClick={onNext}
          className="w-full sm:w-auto min-w-[200px] py-3.5 px-8 rounded-full bg-[#1F3443] text-[#F7F4EE] font-sans text-[15px] font-medium tracking-normal transition-all hover:bg-[#284255] active:scale-[0.98] shadow-sm focus-visible:ring-2 focus-visible:ring-[#1F3443] focus-visible:outline-none"
        >
          {isCompleted ? data.readyText : data.skipSilenceText}
        </button>
      </div>

      <style jsx>{`
        @keyframes breathingLight {
          0%,
          100% {
            transform: scale(0.96);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.95;
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
