import React from "react";

interface ContemplativeProgressProps {
  progress: number; // 0 to 1
  className?: string;
}

export function ContemplativeProgress({
  progress,
  className = "",
}: ContemplativeProgressProps) {
  const percent = Math.min(100, Math.max(0, progress * 100));

  return (
    <div
      className={`w-36 sm:w-44 h-[2px] bg-[#1F3443]/10 rounded-full overflow-hidden select-none ${className}`}
      role="progressbar"
      aria-hidden="true"
    >
      <div
        className="h-full bg-gradient-to-r from-[#D3B58A] to-[#1F3443] transition-[width] duration-75 ease-linear rounded-full"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
