import React from "react";

interface SacredTimeIndicatorProps {
  remainingSeconds: number;
  progress: number; // 0 to 1 (filling up)
  showExtensionNotice?: boolean;
  className?: string;
}

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

export function SacredTimeIndicator({
  remainingSeconds,
  progress,
  showExtensionNotice = false,
  className = "",
}: SacredTimeIndicatorProps) {
  const size = 150;
  const strokeWidth = 3;
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  // Progress filling up: at progress=0, offset=circumference (empty); at progress=1, offset=0 (full)
  const strokeDashoffset = circumference * (1 - Math.min(1, Math.max(0, progress)));

  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
      aria-label="Momento de silencio, aproximadamente 30 segundos"
    >
      {/* Gentle ambient breathing aura behind halo */}
      <div
        className="w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-[#D3B58A]/15 blur-3xl animate-pulse motion-reduce:animate-none absolute -inset-2"
        style={{ animationDuration: "6s" }}
        aria-hidden="true"
      />

      {/* Circular Progress SVG */}
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
        aria-hidden="true"
      >
        {/* Track circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#1F3443"
          strokeOpacity="0.08"
          strokeWidth={strokeWidth}
        />

        {/* Filling progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#D3B58A"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          style={{
            strokeDashoffset,
            transition: "stroke-dashoffset 80ms linear",
          }}
        />
      </svg>

      {/* Inner tranquil orb with peaceful countdown */}
      <div
        className="absolute w-28 h-28 rounded-full bg-white/80 border border-[#D3B58A]/35 flex flex-col items-center justify-center shadow-xs"
        aria-hidden="true"
      >
        <span className="font-serif text-[26px] sm:text-[28px] text-[#17212A] font-normal tracking-wide">
          {formatTime(remainingSeconds)}
        </span>
        <span className="text-[10px] font-sans uppercase tracking-widest text-[#6F8796] font-medium mt-0.5">
          Silencio
        </span>
      </div>

      {/* Discreet "+25 s" badge */}
      {showExtensionNotice && (
        <div
          className="absolute -bottom-3 px-3 py-1 rounded-full bg-[#1F3443] text-[#F7F4EE] text-xs font-sans font-medium tracking-wide shadow-xs animate-in fade-in zoom-in-95 duration-300"
          aria-hidden="true"
        >
          +25 s
        </div>
      )}
    </div>
  );
}
