import React from "react";
import { SingleChoiceStepData } from "@/types/prayer";
import { CheckIcon } from "@/components/ui/Icons";

interface SingleChoiceStepProps {
  data: SingleChoiceStepData;
  selectedValue: string;
  onSelect: (value: string) => void;
  onNext: () => void;
}

export function SingleChoiceStep({
  data,
  selectedValue,
  onSelect,
  onNext,
}: SingleChoiceStepProps) {
  return (
    <div className="flex-1 flex flex-col justify-between px-6 pt-6 pb-8 animate-in fade-in duration-300">
      <div className="flex-1 flex flex-col pt-2">
        <h2 className="font-serif text-[24px] sm:text-[28px] leading-[1.28] text-[#17212A] font-normal tracking-[-0.015em] mb-2">
          {data.title}
        </h2>

        {data.description && (
          <p className="font-sans text-[14px] text-[#6F8796] leading-relaxed mb-6">
            {data.description}
          </p>
        )}

        <div
          className="flex flex-col gap-2.5"
          role="radiogroup"
          aria-label={data.title}
        >
          {data.options.map((opt) => {
            const isSelected = selectedValue === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => {
                  onSelect(opt.id);
                }}
                className={`w-full flex items-center justify-between p-3.5 px-4 rounded-2xl border text-left font-sans text-[15px] font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#1F3443] focus-visible:outline-none ${
                  isSelected
                    ? "bg-[#1F3443]/5 border-[#1F3443] text-[#1F3443] shadow-xs"
                    : "bg-white border-[#1F3443]/8 text-[#17212A] hover:border-[#1F3443]/20 hover:bg-[#FAF8F5] active:scale-[0.99]"
                }`}
              >
                <span>{opt.label}</span>
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                    isSelected
                      ? "bg-[#1F3443] text-[#F7F4EE]"
                      : "border border-[#1F3443]/20"
                  }`}
                >
                  {isSelected && <CheckIcon size={13} />}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="w-full flex flex-col items-center gap-3 pt-6">
        {selectedValue ? (
          <button
            type="button"
            onClick={onNext}
            className="w-full sm:w-auto min-w-[200px] py-3.5 px-8 rounded-full bg-[#1F3443] text-[#F7F4EE] font-sans text-[15px] font-medium tracking-normal transition-all hover:bg-[#284255] active:scale-[0.98] shadow-sm focus-visible:ring-2 focus-visible:ring-[#1F3443] focus-visible:outline-none"
          >
            {data.ctaText || "Continuar"}
          </button>
        ) : null}

        {data.skipActionText && (
          <button
            type="button"
            onClick={onNext}
            className="text-[14px] font-sans font-medium text-[#6F8796] hover:text-[#17212A] py-2 px-4 transition-colors focus-visible:ring-2 focus-visible:ring-[#1F3443] focus-visible:outline-none"
          >
            {data.skipActionText}
          </button>
        )}
      </div>
    </div>
  );
}
