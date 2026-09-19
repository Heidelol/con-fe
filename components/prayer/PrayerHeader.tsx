import React from "react";
import { ArrowLeftIcon, CloseIcon } from "@/components/ui/Icons";

interface PrayerHeaderProps {
  currentMoment?: number; // 1 to 5
  totalMoments?: number; // default 5
  canGoBack: boolean;
  onBack: () => void;
  onClose: () => void;
  className?: string;
}

export function PrayerHeader({
  currentMoment = 1,
  totalMoments = 5,
  canGoBack,
  onBack,
  onClose,
  className = "",
}: PrayerHeaderProps) {
  const progressPercent = Math.min(
    100,
    Math.max(8, (currentMoment / totalMoments) * 100)
  );

  return (
    <header
      className={`w-full relative px-6 pt-5 pb-3 flex items-center justify-between ${className}`}
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
      <div className="w-10 h-10 flex items-center justify-start">
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

      {/* Center: Quiet subtle branding */}
      <span className="font-serif text-[15px] font-medium text-[#1F3443]/60 tracking-tight select-none">
        con fe
      </span>

      {/* Right: Close button */}
      <div className="w-10 h-10 flex items-center justify-end">
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
