import React from "react";
import { ScriptureStepData } from "@/types/prayer";

interface ScriptureStepProps {
  data: ScriptureStepData;
  onNext: () => void;
}

export function ScriptureStep({ data, onNext }: ScriptureStepProps) {
  return (
    <div className="flex-1 flex flex-col justify-between px-6 pt-6 pb-8 animate-in fade-in duration-300">
      <div className="flex-1 flex flex-col justify-center">
        <span className="font-sans text-[13px] font-medium tracking-wider uppercase text-[#6F8796] mb-6 text-center">
          {data.title}
        </span>

        <div className="bg-white rounded-3xl p-7 sm:p-9 border border-[#1F3443]/8 shadow-[0_4px_24px_rgba(31,52,67,0.03)] text-center relative overflow-hidden">
          <p className="font-serif text-[21px] sm:text-[24px] leading-[1.45] text-[#17212A] font-normal italic mb-3 tracking-[-0.01em]">
            {data.passage}
          </p>

          <span className="inline-block font-sans text-[13px] font-medium text-[#D3B58A] tracking-wider uppercase mb-6">
            {data.reference}
          </span>

          <div className="w-12 h-px bg-[#1F3443]/10 mx-auto mb-5" aria-hidden="true" />

          <p className="font-sans text-[14px] text-[#6F8796] leading-relaxed max-w-[280px] mx-auto">
            {data.reflection}
          </p>
        </div>
      </div>

      <div className="w-full flex justify-center pt-8">
        <button
          type="button"
          onClick={onNext}
          className="w-full sm:w-auto min-w-[200px] py-3.5 px-8 rounded-full bg-[#1F3443] text-[#F7F4EE] font-sans text-[15px] font-medium tracking-normal transition-all hover:bg-[#284255] active:scale-[0.98] shadow-sm focus-visible:ring-2 focus-visible:ring-[#1F3443] focus-visible:outline-none"
        >
          {data.ctaText || "Continuar"}
        </button>
      </div>
    </div>
  );
}
