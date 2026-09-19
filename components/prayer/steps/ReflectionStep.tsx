import React from "react";
import { ReflectionStepData } from "@/types/prayer";

interface ReflectionStepProps {
  data: ReflectionStepData;
  onNext: () => void;
}

export function ReflectionStep({ data, onNext }: ReflectionStepProps) {
  return (
    <div className="flex-1 flex flex-col justify-between px-6 pt-12 pb-8 animate-in fade-in duration-300">
      <div className="flex-1 flex flex-col justify-center max-w-[340px] mx-auto text-center">
        <h2 className="font-serif text-[32px] sm:text-[36px] leading-[1.25] text-[#17212A] font-normal tracking-[-0.015em] mb-4">
          {data.title}
        </h2>

        {data.subtitle && (
          <p className="font-sans text-[16px] text-[#6F8796] leading-relaxed">
            {data.subtitle}
          </p>
        )}
      </div>

      <div className="w-full flex justify-center pt-8">
        <button
          type="button"
          onClick={onNext}
          className="w-full sm:w-auto min-w-[200px] py-3.5 px-8 rounded-full bg-[#1F3443] text-[#F7F4EE] font-sans text-[15px] font-medium tracking-normal transition-all hover:bg-[#284255] active:scale-[0.98] shadow-sm focus-visible:ring-2 focus-visible:ring-[#1F3443] focus-visible:outline-none"
        >
          {data.ctaText}
        </button>
      </div>
    </div>
  );
}
