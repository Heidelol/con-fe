import React from "react";
import { TextPromptStepData } from "@/types/prayer";

interface TextPromptStepProps {
  data: TextPromptStepData;
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
}

export function TextPromptStep({
  data,
  value,
  onChange,
  onNext,
}: TextPromptStepProps) {
  const hasText = value.trim().length > 0;

  return (
    <div className="flex-1 flex flex-col justify-between px-6 pt-8 pb-8 animate-in fade-in duration-300">
      <div className="flex-1 flex flex-col pt-4">
        <label htmlFor="prayer-text-prompt" className="block mb-6">
          <h2 className="font-serif text-[26px] sm:text-[30px] leading-[1.28] text-[#17212A] font-normal tracking-[-0.015em]">
            {data.title}
          </h2>
        </label>

        <div className="relative w-full">
          <textarea
            id="prayer-text-prompt"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={data.placeholder || "Puedes escribir unas palabras…"}
            rows={4}
            className="w-full bg-white rounded-2xl p-4 border border-[#1F3443]/10 text-[#17212A] font-sans text-[15px] leading-relaxed placeholder:text-[#6F8796]/60 focus:border-[#1F3443] focus:ring-1 focus:ring-[#1F3443] focus:outline-none transition-all shadow-[0_1px_3px_rgba(31,52,67,0.02)]"
          />
        </div>
      </div>

      <div className="w-full flex flex-col items-center gap-3 pt-6">
        {hasText ? (
          <button
            type="button"
            onClick={onNext}
            className="w-full sm:w-auto min-w-[200px] py-3.5 px-8 rounded-full bg-[#1F3443] text-[#F7F4EE] font-sans text-[15px] font-medium tracking-normal transition-all hover:bg-[#284255] active:scale-[0.98] shadow-sm focus-visible:ring-2 focus-visible:ring-[#1F3443] focus-visible:outline-none"
          >
            {data.ctaText || "Continuar"}
          </button>
        ) : null}

        <button
          type="button"
          onClick={onNext}
          className="text-[14px] font-sans font-medium text-[#6F8796] hover:text-[#17212A] py-2 px-4 transition-colors focus-visible:ring-2 focus-visible:ring-[#1F3443] focus-visible:outline-none"
        >
          {data.secondaryActionText || "Prefiero pensarlo"}
        </button>
      </div>
    </div>
  );
}
