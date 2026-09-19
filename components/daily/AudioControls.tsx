import React from "react";
import { PlayIcon, PauseIcon, Rewind15Icon, Forward15Icon } from "@/components/ui/Icons";

interface AudioControlsProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onRewind15: () => void;
  onForward15: () => void;
  disabled?: boolean;
}

export function AudioControls({
  isPlaying,
  onTogglePlay,
  onRewind15,
  onForward15,
  disabled = false,
}: AudioControlsProps) {
  return (
    <div className="w-full flex flex-col items-center gap-7">
      {/* Primary playback control row */}
      <div className="flex items-center justify-center gap-8">
        {/* Rewind 15s */}
        <button
          type="button"
          onClick={onRewind15}
          disabled={disabled}
          className="w-12 h-12 rounded-full flex items-center justify-center text-[#1F3443] hover:bg-[#1F3443]/5 active:scale-90 transition-all focus-visible:ring-2 focus-visible:ring-[#1F3443] focus-visible:outline-none disabled:opacity-40"
          aria-label="Retroceder 15 segundos"
        >
          <Rewind15Icon size={26} />
        </button>

        {/* Play / Pause Central Button */}
        <button
          type="button"
          onClick={onTogglePlay}
          disabled={disabled}
          className="w-16 h-16 rounded-full bg-[#1F3443] text-[#F7F4EE] flex items-center justify-center shadow-[0_6px_20px_rgba(31,52,67,0.18)] hover:bg-[#284255] hover:scale-105 active:scale-95 transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1F3443] focus-visible:outline-none disabled:opacity-50"
          aria-label={isPlaying ? "Pausar oración" : "Reproducir oración"}
        >
          {isPlaying ? (
            <PauseIcon size={24} />
          ) : (
            <span className="translate-x-0.5 flex items-center justify-center">
              <PlayIcon size={22} />
            </span>
          )}
        </button>

        {/* Forward 15s */}
        <button
          type="button"
          onClick={onForward15}
          disabled={disabled}
          className="w-12 h-12 rounded-full flex items-center justify-center text-[#1F3443] hover:bg-[#1F3443]/5 active:scale-90 transition-all focus-visible:ring-2 focus-visible:ring-[#1F3443] focus-visible:outline-none disabled:opacity-40"
          aria-label="Avanzar 15 segundos"
        >
          <Forward15Icon size={26} />
        </button>
      </div>

      {/* Ambient music option - subtle disabled switch */}
      <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/60 border border-[#1F3443]/6 text-[#6F8796] select-none">
        <span className="font-sans text-[13px] font-medium text-[#17212A]">
          Música ambiental
        </span>
        <span className="px-2 py-0.5 rounded-full bg-[#1F3443]/8 text-[#1F3443] text-[11px] font-medium">
          Próximamente
        </span>
      </div>
    </div>
  );
}
