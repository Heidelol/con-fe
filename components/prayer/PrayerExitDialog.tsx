"use client";

import React, { useEffect } from "react";

interface PrayerExitDialogProps {
  isOpen: boolean;
  onStay: () => void;
  onExit: () => void;
}

export function PrayerExitDialog({
  isOpen,
  onStay,
  onExit,
}: PrayerExitDialogProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        onStay();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onStay]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-dialog-title"
      className="fixed inset-0 z-50 bg-[#17212A]/40 backdrop-blur-xs flex items-center justify-center p-6 transition-opacity duration-200"
    >
      <div
        className="w-full max-w-[340px] bg-white rounded-3xl p-6 shadow-[0_12px_36px_rgba(31,52,67,0.12)] border border-[#1F3443]/8 text-center animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <h3
          id="exit-dialog-title"
          className="font-serif text-[20px] text-[#17212A] font-normal leading-snug mb-2"
        >
          ¿Quieres salir de este momento?
        </h3>
        <p className="font-sans text-[14px] text-[#6F8796] leading-relaxed mb-6">
          Puedes pausar y volver cuando lo necesites.
        </p>

        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={onStay}
            autoFocus
            className="w-full py-3 px-5 rounded-full bg-[#1F3443] text-[#F7F4EE] font-sans text-[14px] font-medium tracking-normal transition-all hover:bg-[#284255] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#1F3443] focus-visible:outline-none"
          >
            Seguir aquí
          </button>
          <button
            type="button"
            onClick={onExit}
            className="w-full py-2.5 px-5 rounded-full text-[#6F8796] hover:text-[#17212A] hover:bg-[#F7F4EE] font-sans text-[14px] font-medium transition-colors focus-visible:ring-2 focus-visible:ring-[#1F3443] focus-visible:outline-none"
          >
            Salir
          </button>
        </div>
      </div>
    </div>
  );
}
