"use client";

import React from "react";
import {
  ArrowLeftIcon,
  CloseIcon,
  AudioWaveIcon,
  PlayIcon,
  PauseIcon,
} from "@/components/ui/Icons";
import { PrayerExperienceMode } from "@/types/prayer";

interface PrayerHeaderProps {
  currentMoment?: number; // 1 to 5
  totalMoments?: number; // default 5
  canGoBack: boolean;
  onBack: () => void;
  onClose: () => void;
  experienceMode?: PrayerExperienceMode;
  isNarrationPlaying?: boolean;
  onToggleNarration?: () => void;
  onSwitchToReading?: () => void;
  className?: string;
}

export function PrayerHeader({
  currentMoment = 1,
  totalMoments = 5,
  canGoBack,
  onBack,
  onClose,
  experienceMode = "reading",
  isNarrationPlaying = false,
  onToggleNarration,
  onSwitchToReading,
  className = "",
}: PrayerHeaderProps) {
  const progressPercent = Math.min(
    100,
    Math.max(8, (currentMoment / totalMoments) * 100)
  );

  const isVoiceMode = experienceMode === "voice";

  return (
    <header
      className={`w-full relative px-4 sm:px-6 pt-5 pb-3 flex items-center justify-between ${className}`}
    >
      {/* Discreet top continuous progress bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[2.5px] bg-[#1F3443]/8 overflow-hidden"
        role="progressbar"
        aria-valuenow={currentMoment}
        aria-valuemin={1}
        aria-valuemax={totalMoments}
        aria-label="Progreso de la oración"
      >
        <div
          className="h-full bg-[#1F3443] transition-all duration-700 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Left: Back button or placeholder */}
      <div className="w-10 h-10 flex items-center justify-start shrink-0">
        {canGoBack ? (
          <button
            type="button"
            onClick={onBack}
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#6F8796] hover:text-[#1F3443] hover:bg-[#1F3443]/5 active:scale-95 transition-all focus-visible:ring-2 focus-visible:ring-[#1F3443] focus-visible:outline-none cursor-pointer"
            aria-label="Regresar al momento anterior"
          >
            <ArrowLeftIcon size={18} />
          </button>
        ) : (
          <div className="w-9 h-9" />
        )}
      </div>

      {/* Center: Quiet subtle branding or voice controls */}
      <div className="flex items-center justify-center flex-1 px-1">
        {isVoiceMode ? (
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Play/Pause narration pill */}
            <button
              type="button"
              onClick={onToggleNarration}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-[#1F3443]/10 text-[12px] font-sans font-medium text-[#1F3443] shadow-2xs hover:border-[#1F3443]/20 active:scale-95 transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-[#1F3443] focus-visible:outline-none"
              title={isNarrationPlaying ? "Pausar voz de acompañamiento" : "Reanudar voz"}
              aria-label={isNarrationPlaying ? "Pausar voz" : "Reanudar voz"}
            >
              {isNarrationPlaying ? (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3B7A57] animate-pulse" />
                  <AudioWaveIcon size={13} className="text-[#1F3443]" />
                  <span className="hidden xs:inline text-[11px] sm:text-xs text-[#1F3443]">Con voz</span>
                  <PauseIcon size={10} className="text-[#6F8796] ml-0.5" />
                </>
              ) : (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6F8796]" />
                  <PlayIcon size={11} className="text-[#1F3443]" />
                  <span className="text-[11px] sm:text-xs text-[#6F8796]">En pausa</span>
                </>
              )}
            </button>

            {/* Switch to reading mode button */}
            {onSwitchToReading && (
              <button
                type="button"
                onClick={onSwitchToReading}
                className="text-[11px] sm:text-xs font-sans text-[#6F8796] hover:text-[#17212A] px-2 py-1 rounded-full hover:bg-[#1F3443]/5 transition-colors cursor-pointer"
                title="Desactivar la voz y continuar leyendo"
              >
                Continuar sin voz
              </button>
            )}
          </div>
        ) : (
          <span className="font-serif text-[15px] font-medium text-[#1F3443]/60 tracking-tight select-none">
            con fe
          </span>
        )}
      </div>

      {/* Right: Close button */}
      <div className="w-10 h-10 flex items-center justify-end shrink-0">
        <button
          type="button"
          onClick={onClose}
          className="w-9 h-9 rounded-full flex items-center justify-center text-[#6F8796] hover:text-[#1F3443] hover:bg-[#1F3443]/5 active:scale-95 transition-all focus-visible:ring-2 focus-visible:ring-[#1F3443] focus-visible:outline-none cursor-pointer"
          aria-label="Salir de la oración"
        >
          <CloseIcon size={18} />
        </button>
      </div>
    </header>
  );
}
