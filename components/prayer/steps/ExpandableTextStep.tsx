"use client";

import React, { useState } from "react";
import { TextPromptExpandableStepData } from "@/types/prayer";

interface ExpandableTextStepProps {
  data: TextPromptExpandableStepData;
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
}

export function ExpandableTextStep({
  data,
  value,
  onChange,
  onNext,
}: ExpandableTextStepProps) {
  const [isWriting, setIsWriting] = useState(value.trim().length > 0);

  return (
    <div className="flex-1 flex flex-col justify-between px-6 pt-8 pb-8 animate-in fade-in duration-300">
      <div className="flex-1 flex flex-col pt-4">
        <h2 className="font-serif text-[26px] sm:text-[30px] leading-[1.28] text-[#17212A] font-normal tracking-[-0.015em] mb-8">
          {data.title}
        </h2>

        {!isWriting ? (
          <div className="flex flex-col gap-3 max-w-[340px] animate-in fade-in duration-200">
            <button
              type="button"
              onClick={() => setIsWriting(true)}
              className="w-full py-4 px-5 rounded-2xl bg-white border border-[#1F3443]/10 text-left font-sans text-[15px] font-medium text-[#17212A] shadow-[0_1px_3px_rgba(31,52,67,0.02)] transition-all hover:border-[#1F3443]/20 hover:shadow-[0_2px_8px_rgba(31,52,67,0.04)] active:scale-[0.985] focus-visible:ring-2 focus-visible:ring-[#1F3443] focus-visible:outline-none"
            >
              {data.writeActionText}
            </button>
            <button
              type="button"
              onClick={onNext}
              className="w-full py-4 px-5 rounded-2xl bg-white/60 border border-[#1F3443]/6 text-left font-sans text-[15px] font-medium text-[#6F8796] transition-all hover:bg-white hover:text-[#17212A] active:scale-[0.985] focus-visible:ring-2 focus-visible:ring-[#1F3443] focus-visible:outline-none"
            >
              {data.skipActionText}
            </button>
          </div>
        ) : (
          <div className="animate-in fade-in duration-300 flex flex-col">
            <label htmlFor="expandable-text-input" className="sr-only">
              {data.title}
            </label>
            <textarea
              id="expandable-text-input"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={data.placeholder || "Escribe lo que sientes o temes…"}
              rows={4}
              autoFocus
              className="w-full bg-white rounded-2xl p-4 border border-[#1F3443]/10 text-[#17212A] font-sans text-[15px] leading-relaxed placeholder:text-[#6F8796]/60 focus:border-[#1F3443] focus:ring-1 focus:ring-[#1F3443] focus:outline-none transition-all shadow-[0_1px_3px_rgba(31,52,67,0.02)]"
            />
          </div>
        )}
      </div>

      {isWriting && (
        <div className="w-full flex flex-col items-center gap-3 pt-6 animate-in fade-in duration-200">
          <button
            type="button"
            onClick={onNext}
            className="w-full sm:w-auto min-w-[200px] py-3.5 px-8 rounded-full bg-[#1F3443] text-[#F7F4EE] font-sans text-[15px] font-medium tracking-normal transition-all hover:bg-[#284255] active:scale-[0.98] shadow-sm focus-visible:ring-2 focus-visible:ring-[#1F3443] focus-visible:outline-none"
          >
            {data.ctaText || "Continuar"}
          </button>
          <button
            type="button"
            onClick={onNext}
            className="text-[14px] font-sans font-medium text-[#6F8796] hover:text-[#17212A] py-2 px-4 transition-colors focus-visible:ring-2 focus-visible:ring-[#1F3443] focus-visible:outline-none"
          >
            {data.skipActionText}
          </button>
        </div>
      )}
    </div>
  );
}
