"use client";

import React from "react";
import { SparklesIcon } from "@/components/ui/Icons";

interface DailyMomentCardProps {
  title?: string;
  description?: string;
  ctaText?: string;
}

export function DailyMomentCard({
  title = "1 minuto con Dios",
  description = "Un pequeño momento antes de continuar con tu día.",
  ctaText = "Comenzar",
}: DailyMomentCardProps) {
  return (
    <section className="w-full px-6 py-3" aria-label="Momento breve con Dios">
      <div className="flex flex-col p-5 rounded-2xl bg-[#FAF7F2] border border-[#1F3443]/8 shadow-[0_1px_4px_rgba(31,52,67,0.02)] transition-all duration-200 hover:border-[#1F3443]/15 hover:shadow-[0_2px_8px_rgba(31,52,67,0.03)]">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-7 h-7 rounded-lg bg-[#D3B58A]/20 text-[#1F3443] flex items-center justify-center">
            <SparklesIcon size={16} />
          </span>
          <h3 className="font-serif text-[18px] text-[#17212A] font-medium tracking-tight">
            {title}
          </h3>
        </div>

        <p className="font-sans text-[14px] text-[#6F8796] leading-relaxed mb-4">
          {description}
        </p>

        <div className="flex justify-start">
          <button
            type="button"
            className="inline-flex items-center justify-center px-4 py-2 rounded-xl text-[13px] font-sans font-medium text-[#1F3443] bg-white border border-[#1F3443]/15 shadow-sm transition-all duration-200 hover:bg-[#1F3443] hover:text-[#F7F4EE] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#1F3443] focus-visible:outline-none"
          >
            {ctaText}
          </button>
        </div>
      </div>
    </section>
  );
}
