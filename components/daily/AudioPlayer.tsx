"use client";

import React from "react";
import { DailyPrayer, PlayerStatus } from "@/types/daily-prayer";
import { AudioProgress } from "./AudioProgress";
import { AudioControls } from "./AudioControls";
import { ArrowLeftIcon, BookOpenIcon } from "@/components/ui/Icons";

interface AudioPlayerProps {
  prayer: DailyPrayer;
  status: PlayerStatus;
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onSeek: (seconds: number) => void;
  onRewind15: () => void;
  onForward15: () => void;
  onSwitchToReading: () => void;
  onExit: () => void;
}

export function AudioPlayer({
  prayer,
  status,
  currentTime,
  duration,
  isPlaying,
  onTogglePlay,
  onSeek,
  onRewind15,
  onForward15,
  onSwitchToReading,
  onExit,
}: AudioPlayerProps) {
  const isError = status === "error";

  return (
    <div className="min-h-screen bg-[#F7F4EE] flex flex-col justify-between px-5 sm:px-8 py-6 max-w-lg mx-auto select-none">
      {/* Top Bar: Exit & Mode Switch */}
      <header className="flex items-center justify-between w-full pt-1">
        <button
          type="button"
          onClick={onExit}
          className="p-2 -ml-2 rounded-full text-[#6F8796] hover:text-[#17212A] hover:bg-[#1F3443]/5 transition-colors focus-visible:ring-2 focus-visible:ring-[#1F3443] focus-visible:outline-none cursor-pointer"
          aria-label="Salir de la oración"
        >
          <ArrowLeftIcon size={22} />
        </button>

        <button
          type="button"
          onClick={onSwitchToReading}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-[#1F3443] bg-white/80 border border-[#1F3443]/10 hover:bg-white hover:border-[#1F3443]/20 active:scale-95 transition-all shadow-2xs cursor-pointer"
        >
          <BookOpenIcon size={14} />
          <span>Leer</span>
        </button>
      </header>

      {/* Main Sanctuary Area */}
      <main className="flex-1 flex flex-col items-center justify-center my-6 gap-6 text-center">
        {/* Breathing Aura Visual Centerpiece */}
        <div className="relative flex items-center justify-center w-52 h-52 sm:w-60 sm:h-60 my-2">
          {/* Outer gentle ambient pulse aura */}
          <div
            className={`absolute inset-0 rounded-full transition-all duration-1000 ease-in-out ${
              isPlaying
                ? "scale-110 bg-[#D3B58A]/25 blur-2xl animate-pulse"
                : "scale-95 bg-[#D3B58A]/15 blur-xl opacity-60"
            }`}
            aria-hidden="true"
          />

          {/* Inner tranquil orb */}
          <div
            className={`relative w-36 h-36 sm:w-44 sm:h-44 rounded-full flex flex-col items-center justify-center transition-all duration-700 shadow-[0_8px_30px_rgba(211,181,138,0.25)] border border-[#D3B58A]/40 ${
              isPlaying
                ? "bg-gradient-to-b from-[#FFFDF8] via-[#FAF5EC] to-[#F1E7D5] scale-102"
                : "bg-gradient-to-b from-[#FFFDF8] to-[#F5EFE3] scale-100"
            }`}
          >
            {/* Sacred emblem */}
            <div className="text-[#1F3443]/70 flex flex-col items-center gap-1">
              <svg
                width="34"
                height="34"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-transform duration-700 ${isPlaying ? "scale-105 text-[#1F3443]" : "opacity-80"}`}
                aria-hidden="true"
              >
                <path d="M12 3v18" />
                <path d="M7 8h10" />
                <circle cx="12" cy="8" r="1.5" fill="currentColor" />
              </svg>
              <span className="text-[10px] uppercase tracking-widest font-sans font-semibold text-[#6F8796]">
                {isPlaying ? "En oración" : "Con Fe"}
              </span>
            </div>
          </div>
        </div>

        {/* Text Details */}
        <div className="flex flex-col items-center gap-2 max-w-sm px-2">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#6F8796] uppercase">
            <span>Oración del Día</span>
            <span>·</span>
            <span className="text-[#A45A3E]">{prayer.scriptureReference}</span>
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl text-[#17212A] font-medium leading-snug">
            {prayer.title}
          </h1>

          <p className="text-xs text-[#6F8796] font-sans italic mt-0.5">
            {isPlaying
              ? "Cierra tus ojos si lo deseas y deja que la calma te acompañe."
              : "Presiona reproducir para comenzar este momento de paz."}
          </p>
        </div>

        {/* Non-intrusive Error State Fallback */}
        {isError && (
          <div
            role="alert"
            className="w-full max-w-sm mt-2 p-4 rounded-xl bg-[#FFF6E9] border border-[#E9C39B] text-left text-sm text-[#734026] flex flex-col gap-2.5"
          >
            <p className="font-sans text-[13px] leading-relaxed">
              No fue posible iniciar el audio en este momento. Puedes continuar la oración en modo lectura sin perder tu momento de recogimiento.
            </p>
            <button
              type="button"
              onClick={onSwitchToReading}
              className="self-start text-xs font-semibold text-[#1F3443] underline underline-offset-4 hover:text-[#284255] cursor-pointer"
            >
              Continuar en modo lectura →
            </button>
          </div>
        )}
      </main>

      {/* Audio Controls & Progress Footer */}
      <footer className="w-full flex flex-col items-center gap-5 pb-4">
        {/* Progress seekbar */}
        <div className="w-full max-w-sm">
          <AudioProgress
            currentTime={currentTime}
            duration={duration}
            onSeek={onSeek}
            disabled={isError}
          />
        </div>

        {/* Playback Controls */}
        <div className="w-full max-w-sm">
          <AudioControls
            isPlaying={isPlaying}
            onTogglePlay={onTogglePlay}
            onRewind15={onRewind15}
            onForward15={onForward15}
            disabled={isError}
          />
        </div>

        {/* Secondary Alternative: Reading Mode */}
        <button
          type="button"
          onClick={onSwitchToReading}
          className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[#1F3443]/80 hover:text-[#1F3443] py-1 transition-colors focus-visible:outline-none focus-visible:underline cursor-pointer"
        >
          <BookOpenIcon size={16} />
          <span>Prefiero leer la oración</span>
        </button>
      </footer>
    </div>
  );
}
