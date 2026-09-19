import React from "react";
import { OptionalPrayerStepData } from "@/types/prayer";

interface OptionalPrayerStepProps {
  data: OptionalPrayerStepData;
  onNext: () => void;
}

export function OptionalPrayerStep({ data, onNext }: OptionalPrayerStepProps) {
  return (
    <div className="flex-1 flex flex-col justify-between px-6 pt-6 pb-8 animate-in fade-in duration-300">
      <div className="flex-1 flex flex-col justify-center">
        <span className="font-sans text-[13px] font-medium tracking-wide uppercase text-[#6F8796] mb-4 text-center">
          {data.title}
        </span>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#1F3443]/8 shadow-[0_4px_20px_rgba(31,52,67,0.03)] relative overflow-hidden">
          {/* Subtle background warm halo */}
          <div
            className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-[#D3B58A]/15 blur-xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="space-y-4 font-serif text-[18px] sm:text-[20px] leading-[1.65] text-[#17212A] font-normal">
            {data.prayerLines.map((line, idx) => (
              <p key={idx} className={line === "Amén." ? "font-medium text-[#1F3443] pt-1" : ""}>
                {line}
              </p>
            ))}
          </div>
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
