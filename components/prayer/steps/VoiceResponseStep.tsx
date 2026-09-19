"use client";

import React, { useState } from "react";
import { VoiceResponseStepData } from "@/types/prayer";
import { MicrophoneIcon } from "@/components/ui/Icons";

interface VoiceResponseStepProps {
  data: VoiceResponseStepData;
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
}

type ViewMode = "choice" | "voice-mock" | "write";

export function VoiceResponseStep({
  data,
  value,
  onChange,
  onNext,
}: VoiceResponseStepProps) {
  const [viewMode, setViewMode] = useState<ViewMode>(
    value.trim().length > 0 ? "write" : "choice"
  );

  const handleSpeakClick = () => {
    setViewMode("voice-mock");
  };

  const handleThinkClick = () => {
    if (!value) {
      onChange("Lo tengo en mente");
    }
    onNext();
  };

  const handleSwitchToWrite = () => {
    setViewMode("write");
  };

  const handleContinueWithText = () => {
    onNext();
  };

  return (
    <div className="flex-1 flex flex-col justify-between px-6 pt-10 pb-10 max-w-lg mx-auto w-full select-none animate-in fade-in duration-500">
      {/* 1. Main Choice View */}
      {viewMode === "choice" && (
        <>
          <div className="flex-1 flex flex-col pt-4">
            <h2 className="font-serif text-[28px] sm:text-[34px] leading-[1.25] text-[#17212A] font-normal tracking-[-0.015em] mb-3 text-center sm:text-left">
              {data.title}
            </h2>
            <p className="font-sans text-[15px] text-[#6F8796] leading-relaxed mb-8 text-center sm:text-left">
              Elige cómo te sientes más cómodo compartiéndolo en este momento.
            </p>

            {/* Action Cards Container */}
            <div className="flex flex-col gap-3.5 max-w-sm mx-auto w-full">
              {/* Primary Action: Decirlo */}
              <button
                type="button"
                onClick={handleSpeakClick}
                className="w-full p-5 rounded-2xl bg-white border-2 border-[#1F3443]/15 shadow-sm hover:border-[#1F3443] hover:shadow-md active:scale-[0.985] transition-all flex items-center gap-4 text-left group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-[#1F3443] text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <MicrophoneIcon size={24} />
                </div>
                <div className="flex flex-col">
                  <span className="font-sans text-[16px] font-semibold text-[#17212A]">
                    {data.speakLabel}
                  </span>
                  <span className="font-sans text-xs text-[#6F8796] mt-0.5">
                    Habla con naturalidad y calma
                  </span>
                </div>
              </button>

              {/* Secondary Action: Prefiero pensarlo */}
              <button
                type="button"
                onClick={handleThinkClick}
                className="w-full py-4 px-5 rounded-2xl bg-white/70 border border-[#1F3443]/10 hover:bg-white hover:border-[#1F3443]/20 active:scale-[0.985] transition-all text-left flex items-center justify-between cursor-pointer"
              >
                <span className="font-sans text-[15px] font-medium text-[#17212A]">
                  {data.thinkLabel}
                </span>
                <span className="text-xs text-[#6F8796] font-sans">
                  En silencio →
                </span>
              </button>

              {/* Tertiary Action: Prefiero escribir */}
              <button
                type="button"
                onClick={handleSwitchToWrite}
                className="w-full py-4 px-5 rounded-2xl bg-white/70 border border-[#1F3443]/10 hover:bg-white hover:border-[#1F3443]/20 active:scale-[0.985] transition-all text-left flex items-center justify-between cursor-pointer"
              >
                <span className="font-sans text-[15px] font-medium text-[#17212A]">
                  {data.writeLabel}
                </span>
                <span className="text-xs text-[#6F8796] font-sans">
                  Escribir unas palabras →
                </span>
              </button>
            </div>
          </div>

          <div className="w-full text-center pt-4">
            <p className="text-[12px] text-[#6F8796] font-sans italic">
              Tus palabras y reflexiones permanecen siempre en tu espacio privado.
            </p>
          </div>
        </>
      )}

      {/* 2. Mock Voice Dialogue State */}
      {viewMode === "voice-mock" && (
        <div className="flex-1 flex flex-col justify-between animate-in fade-in zoom-in-95 duration-300">
          <div className="flex-1 flex flex-col items-center justify-center text-center max-w-sm mx-auto my-auto">
            {/* Simulated Voice Orb Aura */}
            <div className="relative flex items-center justify-center mb-6">
              <div
                className="w-28 h-28 rounded-full bg-[#D3B58A]/30 blur-xl animate-pulse"
                style={{ animationDuration: "3s" }}
                aria-hidden="true"
              />
              <div className="relative w-20 h-20 rounded-full bg-[#1F3443] text-white flex items-center justify-center shadow-lg">
                <MicrophoneIcon size={30} />
              </div>
            </div>

            <h3 className="font-serif text-[24px] sm:text-[28px] text-[#17212A] font-normal leading-snug mb-2">
              {data.mockPrompt}
            </h3>

            <p className="font-sans text-[14px] text-[#6F8796] leading-relaxed mb-6">
              {data.mockNotice}
            </p>

            <div className="w-full flex flex-col gap-2.5">
              <button
                type="button"
                onClick={handleSwitchToWrite}
                className="w-full py-3.5 px-6 rounded-xl bg-[#1F3443] text-[#F7F4EE] font-sans text-[14px] font-medium hover:bg-[#284255] active:scale-[0.98] transition-all shadow-sm cursor-pointer"
              >
                {data.mockUseTextAction}
              </button>

              <button
                type="button"
                onClick={handleThinkClick}
                className="w-full py-3 px-6 rounded-xl bg-white border border-[#1F3443]/12 text-[#17212A] font-sans text-[14px] font-medium hover:bg-[#F7F4EE] active:scale-[0.98] transition-all cursor-pointer"
              >
                {data.mockThinkAction}
              </button>
            </div>
          </div>

          <div className="w-full text-center pt-4">
            <button
              type="button"
              onClick={() => setViewMode("choice")}
              className="text-xs text-[#6F8796] hover:text-[#17212A] font-sans font-medium underline underline-offset-4 cursor-pointer"
            >
              Volver a opciones
            </button>
          </div>
        </div>
      )}

      {/* 3. Writing Text State */}
      {viewMode === "write" && (
        <div className="flex-1 flex flex-col justify-between animate-in fade-in duration-300">
          <div className="flex-1 flex flex-col pt-4">
            <label htmlFor="worry-text-input" className="block mb-4">
              <h2 className="font-serif text-[26px] sm:text-[30px] leading-[1.28] text-[#17212A] font-normal tracking-[-0.015em]">
                {data.title}
              </h2>
              <span className="font-sans text-xs text-[#6F8796] block mt-1">
                Escribe lo que hoy ocupa tus pensamientos.
              </span>
            </label>

            <textarea
              id="worry-text-input"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Puedes escribir unas palabras…"
              rows={5}
              autoFocus
              className="w-full bg-white rounded-2xl p-4 border border-[#1F3443]/15 text-[#17212A] font-sans text-[15px] leading-relaxed placeholder:text-[#6F8796]/60 focus:border-[#1F3443] focus:ring-1 focus:ring-[#1F3443] focus:outline-none transition-all shadow-2xs"
            />
          </div>

          <div className="w-full flex flex-col items-center gap-3 pt-6">
            <button
              type="button"
              onClick={handleContinueWithText}
              className="w-full sm:w-auto min-w-[200px] py-3.5 px-8 rounded-full bg-[#1F3443] text-[#F7F4EE] font-sans text-[15px] font-medium tracking-normal transition-all hover:bg-[#284255] active:scale-[0.98] shadow-sm focus-visible:ring-2 focus-visible:ring-[#1F3443] focus-visible:outline-none cursor-pointer"
            >
              Continuar
            </button>

            <button
              type="button"
              onClick={() => setViewMode("choice")}
              className="text-xs text-[#6F8796] hover:text-[#17212A] font-sans font-medium py-1 cursor-pointer"
            >
              Cambiar opción
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
