"use client";

import React, { useState } from "react";
import { PersonalPrayerStepData } from "@/types/prayer";

interface PersonalPrayerStepProps {
  data: PersonalPrayerStepData;
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
}

type Mode = "select" | "silence" | "write" | "starter";

export function PersonalPrayerStep({
  data,
  value,
  onChange,
  onNext,
}: PersonalPrayerStepProps) {
  const [mode, setMode] = useState<Mode>(
    value.trim().length > 0 ? "write" : "select"
  );

  function handleSelectStarter() {
    setMode("starter");
    if (!value) {
      onChange("Dios, tú sabes lo que estoy viviendo… ");
    }
  }

  return (
    <div className="flex-1 flex flex-col justify-between px-6 pt-6 pb-8 animate-in fade-in duration-300">
      <div className="flex-1 flex flex-col pt-2">
        <h2 className="font-serif text-[26px] sm:text-[30px] leading-[1.28] text-[#17212A] font-normal tracking-[-0.015em] mb-2">
          {data.title}
        </h2>

        {data.subtitle && (
          <p className="font-sans text-[15px] text-[#6F8796] leading-relaxed mb-6">
            {data.subtitle}
          </p>
        )}

        {mode === "select" && (
          <div className="flex flex-col gap-3 max-w-[340px] animate-in fade-in duration-200">
            <button
              type="button"
              onClick={() => setMode("silence")}
              className="w-full py-4 px-5 rounded-2xl bg-white border border-[#1F3443]/10 text-left font-sans text-[15px] font-medium text-[#17212A] shadow-[0_1px_3px_rgba(31,52,67,0.02)] transition-all hover:border-[#1F3443]/20 hover:shadow-[0_2px_8px_rgba(31,52,67,0.04)] active:scale-[0.985] focus-visible:ring-2 focus-visible:ring-[#1F3443] focus-visible:outline-none"
            >
              {data.silenceOptionText}
            </button>

            <button
              type="button"
              onClick={() => setMode("write")}
              className="w-full py-4 px-5 rounded-2xl bg-white border border-[#1F3443]/10 text-left font-sans text-[15px] font-medium text-[#17212A] shadow-[0_1px_3px_rgba(31,52,67,0.02)] transition-all hover:border-[#1F3443]/20 hover:shadow-[0_2px_8px_rgba(31,52,67,0.04)] active:scale-[0.985] focus-visible:ring-2 focus-visible:ring-[#1F3443] focus-visible:outline-none"
            >
              {data.writeOptionText}
            </button>

            <button
              type="button"
              onClick={handleSelectStarter}
              className="w-full py-4 px-5 rounded-2xl bg-[#FAF7F2] border border-[#1F3443]/10 text-left font-sans text-[15px] font-medium text-[#1F3443] shadow-[0_1px_3px_rgba(31,52,67,0.02)] transition-all hover:border-[#1F3443]/20 active:scale-[0.985] focus-visible:ring-2 focus-visible:ring-[#1F3443] focus-visible:outline-none"
            >
              {data.starterOptionText}
            </button>
          </div>
        )}

        {mode === "silence" && (
          <div className="p-6 rounded-2xl bg-white border border-[#1F3443]/8 shadow-xs animate-in fade-in duration-300">
            <p className="font-serif text-[18px] text-[#17212A] leading-relaxed italic">
              Tómate el tiempo que necesites en el silencio de tu corazón. Dios te escucha siempre.
            </p>
          </div>
        )}

        {mode === "starter" && (
          <div className="flex flex-col gap-3 animate-in fade-in duration-300">
            <div className="p-4 rounded-xl bg-[#FAF7F2] border-l-3 border-[#D3B58A]">
              <span className="text-[12px] font-sans font-medium uppercase tracking-wider text-[#6F8796] block mb-1">
                {data.starterPrompt}
              </span>
              <p className="font-serif text-[17px] text-[#17212A] italic">
                “{data.starterLeadIn}”
              </p>
            </div>

            <label htmlFor="prayer-starter-input" className="sr-only">
              Continúa tu oración
            </label>
            <textarea
              id="prayer-starter-input"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              rows={4}
              autoFocus
              className="w-full bg-white rounded-2xl p-4 border border-[#1F3443]/10 text-[#17212A] font-sans text-[15px] leading-relaxed focus:border-[#1F3443] focus:ring-1 focus:ring-[#1F3443] focus:outline-none transition-all shadow-[0_1px_3px_rgba(31,52,67,0.02)]"
            />
          </div>
        )}

        {mode === "write" && (
          <div className="animate-in fade-in duration-300 flex flex-col">
            <label htmlFor="prayer-write-input" className="sr-only">
              Escribe tu oración
            </label>
            <textarea
              id="prayer-write-input"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Habla con Dios con total libertad y sinceridad…"
              rows={5}
              autoFocus
              className="w-full bg-white rounded-2xl p-4 border border-[#1F3443]/10 text-[#17212A] font-sans text-[15px] leading-relaxed placeholder:text-[#6F8796]/60 focus:border-[#1F3443] focus:ring-1 focus:ring-[#1F3443] focus:outline-none transition-all shadow-[0_1px_3px_rgba(31,52,67,0.02)]"
            />
          </div>
        )}
      </div>

      {mode !== "select" && (
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
            onClick={() => setMode("select")}
            className="text-[13px] font-sans font-medium text-[#6F8796] hover:text-[#17212A] py-1.5 transition-colors focus-visible:ring-2 focus-visible:ring-[#1F3443] focus-visible:outline-none"
          >
            Cambiar opción
          </button>
        </div>
      )}
    </div>
  );
}
