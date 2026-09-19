import React from "react";

interface AudioProgressProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
  disabled?: boolean;
}

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

export function AudioProgress({
  currentTime,
  duration,
  onSeek,
  disabled = false,
}: AudioProgressProps) {
  const percent = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = parseFloat(e.target.value);
    onSeek(val);
  }

  return (
    <div className="w-full flex flex-col gap-2">
      {/* Interactive slider */}
      <div className="relative w-full flex items-center h-8 cursor-pointer group">
        <input
          type="range"
          min={0}
          max={duration || 100}
          step={0.5}
          value={currentTime || 0}
          disabled={disabled}
          onChange={handleChange}
          aria-label="Posición de reproducción"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20 disabled:cursor-not-allowed"
        />

        {/* Custom Track Background */}
        <div className="w-full h-1.5 bg-[#1F3443]/10 rounded-full overflow-hidden transition-all group-hover:h-2">
          {/* Filled progress */}
          <div
            className="h-full bg-[#1F3443] rounded-full transition-all duration-100 ease-out"
            style={{ width: `${percent}%` }}
          />
        </div>

        {/* Thumb handle */}
        <div
          className="absolute w-3.5 h-3.5 rounded-full bg-[#1F3443] shadow-xs pointer-events-none transition-transform duration-100 group-hover:scale-125 z-10"
          style={{
            left: `calc(${percent}% - 7px)`,
          }}
          aria-hidden="true"
        />
      </div>

      {/* Time indicators */}
      <div className="flex items-center justify-between text-[12px] font-sans font-medium text-[#6F8796] px-1 select-none">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
}
