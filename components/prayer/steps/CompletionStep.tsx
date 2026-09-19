import React from "react";
import { CompletionStepData } from "@/types/prayer";
import { BookmarkIcon, BookOpenIcon } from "@/components/ui/Icons";

interface CompletionStepProps {
  data: CompletionStepData;
  onSaveIntention: () => void;
  onSaveReflection: () => void;
  onFinish: () => void;
}

export function CompletionStep({
  data,
  onSaveIntention,
  onSaveReflection,
  onFinish,
}: CompletionStepProps) {
  return (
    <div className="flex-1 flex flex-col justify-between px-6 pt-10 pb-8 animate-in fade-in duration-300">
      <div className="flex-1 flex flex-col justify-center text-center max-w-[340px] mx-auto">
        {/* Serene completion symbol */}
        <div className="w-12 h-12 rounded-full bg-[#D3B58A]/15 text-[#1F3443] flex items-center justify-center mx-auto mb-6">
          <span className="w-2.5 h-2.5 rounded-full bg-[#D3B58A]" />
        </div>

        <h2 className="font-serif text-[30px] sm:text-[34px] leading-[1.25] text-[#17212A] font-normal tracking-[-0.015em] mb-3">
          {data.title}
        </h2>

        <p className="font-sans text-[15px] text-[#6F8796] leading-relaxed mb-8">
          {data.subtitle}
        </p>

        {/* Save Options */}
        <div className="flex flex-col gap-2.5 w-full">
          <button
            type="button"
            onClick={onSaveIntention}
            className="w-full flex items-center justify-between p-3.5 px-4 rounded-2xl bg-white border border-[#1F3443]/8 text-left font-sans text-[14px] font-medium text-[#17212A] transition-all hover:border-[#1F3443]/20 hover:bg-[#FAF8F5] active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-[#1F3443] focus-visible:outline-none"
          >
            <div className="flex items-center gap-3">
              <span className="text-[#6F8796]">
                <BookmarkIcon size={17} />
              </span>
              <span>{data.saveIntentionText}</span>
            </div>
            <span className="text-[12px] text-[#6F8796]">Guardar</span>
          </button>

          <button
            type="button"
            onClick={onSaveReflection}
            className="w-full flex items-center justify-between p-3.5 px-4 rounded-2xl bg-white border border-[#1F3443]/8 text-left font-sans text-[14px] font-medium text-[#17212A] transition-all hover:border-[#1F3443]/20 hover:bg-[#FAF8F5] active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-[#1F3443] focus-visible:outline-none"
          >
            <div className="flex items-center gap-3">
              <span className="text-[#6F8796]">
                <BookOpenIcon size={17} />
              </span>
              <span>{data.saveReflectionText}</span>
            </div>
            <span className="text-[12px] text-[#6F8796]">Guardar</span>
          </button>
        </div>
      </div>

      {/* Primary Finish Action */}
      <div className="w-full flex justify-center pt-8">
        <button
          type="button"
          onClick={onFinish}
          className="w-full sm:w-auto min-w-[200px] py-3.5 px-8 rounded-full bg-[#1F3443] text-[#F7F4EE] font-sans text-[15px] font-medium tracking-normal transition-all hover:bg-[#284255] active:scale-[0.98] shadow-sm focus-visible:ring-2 focus-visible:ring-[#1F3443] focus-visible:outline-none"
        >
          {data.finishText}
        </button>
      </div>
    </div>
  );
}
