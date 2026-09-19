"use client";

import React, { useState } from "react";
import { SacredSilenceStepData } from "@/types/prayer";
import { usePrayerAutoAdvance } from "@/hooks/usePrayerAutoAdvance";
import { SacredTimeIndicator } from "@/components/prayer/SacredTimeIndicator";
import { LockIcon } from "@/components/ui/Icons";

interface SacredSilenceStepProps {
  data: SacredSilenceStepData;
  onNext: () => void;
  isPaused?: boolean;
}

export function SacredSilenceStep({
  data,
  onNext,
  isPaused = false,
}: SacredSilenceStepProps) {
  const [showExtensionBadge, setShowExtensionBadge] = useState(false);

  const { progress, remainingSeconds, skip, extendTime } = usePrayerAutoAdvance({
    enabled: true,
    durationSeconds: data.silenceDurationSeconds || 28,
    onAdvance: onNext,
    isPaused,
  });

  const handleNeedMoreTime = () => {
    extendTime(data.extraTimeSeconds || 25);
    setShowExtensionBadge(true);
    setTimeout(() => {
      setShowExtensionBadge(false);
    }, 2800);
  };

  return (
    <div className="flex-1 flex flex-col justify-between px-6 pt-8 pb-10 max-w-lg mx-auto w-full select-none animate-in fade-in duration-700">
      {/* Privacy guarantee badge */}
      <div className="w-full flex justify-center pt-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 border border-[#1F3443]/8 text-[12px] font-sans font-medium text-[#6F8796] shadow-2xs">
          <LockIcon size={13} className="text-[#1F3443]" />
          <span>{data.privacyBadge}</span>
        </div>
      </div>

      {/* Central Sacred Silence Area */}
      <div className="flex-1 flex flex-col items-center justify-center text-center my-auto gap-6">
        {/* Sacred circular time indicator (filling up gracefully) */}
        <SacredTimeIndicator
          remainingSeconds={remainingSeconds}
          progress={progress}
          showExtensionNotice={showExtensionBadge}
        />

        {/* Text */}
        <div className="flex flex-col items-center gap-1.5 max-w-sm px-2">
          <h2 className="font-serif text-[28px] sm:text-[34px] leading-[1.25] text-[#17212A] font-normal tracking-[-0.015em]">
            {data.title}
          </h2>

          <p className="font-sans text-[15px] sm:text-[16px] text-[#6F8796] leading-relaxed">
            {data.subtitle}
          </p>
        </div>
      </div>

      {/* Bottom Action Controls */}
      <div className="w-full flex flex-col items-center gap-3 pt-6 max-w-sm mx-auto">
        <button
          type="button"
          onClick={skip}
          className="w-full py-4 rounded-2xl bg-[#1F3443] text-[#F7F4EE] font-sans text-[15px] font-medium hover:bg-[#284255] active:scale-[0.98] transition-all shadow-sm focus-visible:ring-2 focus-visible:ring-[#1F3443] focus-visible:outline-none cursor-pointer"
        >
          {data.continueText || "Continuar"}
        </button>

        <button
          type="button"
          onClick={handleNeedMoreTime}
          className="text-xs sm:text-[13px] font-sans font-medium text-[#6F8796] hover:text-[#17212A] py-1.5 px-4 rounded-full transition-colors cursor-pointer"
        >
          {data.moreTimeText || "Necesito más tiempo"}
        </button>
      </div>
    </div>
  );
}
