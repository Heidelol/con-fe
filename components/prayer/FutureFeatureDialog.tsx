"use client";

import React, { useEffect } from "react";

interface FutureFeatureDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

export function FutureFeatureDialog({
  isOpen,
  onClose,
  title = "Próximamente",
  message = "Muy pronto podrás guardar este momento en tu espacio privado.",
}: FutureFeatureDialogProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="future-dialog-title"
      className="fixed inset-0 z-50 bg-[#17212A]/40 backdrop-blur-xs flex items-center justify-center p-6 transition-opacity duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[340px] bg-white rounded-3xl p-6 shadow-[0_12px_36px_rgba(31,52,67,0.12)] border border-[#1F3443]/8 text-center animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-10 h-10 rounded-2xl bg-[#D3B58A]/20 text-[#1F3443] flex items-center justify-center mx-auto mb-4">
          <span className="w-2.5 h-2.5 rounded-full bg-[#D3B58A]" />
        </div>

        <h3
          id="future-dialog-title"
          className="font-serif text-[19px] text-[#17212A] font-normal leading-snug mb-2"
        >
          {title}
        </h3>
        <p className="font-sans text-[14px] text-[#6F8796] leading-relaxed mb-6">
          {message}
        </p>

        <button
          type="button"
          onClick={onClose}
          autoFocus
          className="w-full py-3 px-5 rounded-full bg-[#1F3443] text-[#F7F4EE] font-sans text-[14px] font-medium tracking-normal transition-all hover:bg-[#284255] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#1F3443] focus-visible:outline-none"
        >
          Entendido
        </button>
      </div>
    </div>
  );
}
