"use client";

import React, { useEffect } from "react";
import { IntentionStatus, IntentionStatusOption } from "@/types/intention";
import { CloseIcon, HeartIcon, CheckIcon } from "@/components/ui/Icons";

interface IntentionStatusSheetProps {
  isOpen: boolean;
  currentStatus: IntentionStatus;
  onClose: () => void;
  onSelectStatus: (status: IntentionStatus) => void;
}

const STATUS_OPTIONS: IntentionStatusOption[] = [
  {
    status: "praying",
    label: "Seguir en oración",
    description: "Quiero seguir poniéndolo en manos de Dios.",
  },
  {
    status: "answered",
    label: "Se resolvió",
    description: "Esta situación llegó a un cierre.",
  },
  {
    status: "gratitude",
    label: "Convertir en agradecimiento",
    description: "Quiero agradecer por lo que ocurrió.",
  },
  {
    status: "archived",
    label: "Archivar",
    description: "Ya no necesito verla entre mis intenciones principales.",
  },
];

export function IntentionStatusSheet({
  isOpen,
  currentStatus,
  onClose,
  onSelectStatus,
}: IntentionStatusSheetProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-[#1F3443]/40 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="sheet-title"
    >
      {/* Click outside to close */}
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sheet card */}
      <div className="relative w-full max-w-md bg-[#F7F4EE] rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl border-t sm:border border-[#1F3443]/10 z-10 animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-[#1F3443]/8">
          <div>
            <span className="text-[11px] font-sans font-semibold uppercase tracking-wider text-[#A45A3E] block mb-1">
              Evolución espiritual
            </span>
            <h3
              id="sheet-title"
              className="font-serif text-[22px] sm:text-[24px] text-[#17212A] font-normal leading-snug tracking-tight"
            >
              ¿Cómo quieres guardar este momento?
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#6F8796] hover:text-[#17212A] hover:bg-[#1F3443]/5 transition-colors cursor-pointer -mr-2"
            aria-label="Cerrar opciones"
          >
            <CloseIcon size={18} />
          </button>
        </div>

        {/* Options */}
        <div className="flex flex-col gap-2.5 pt-4 pb-2">
          {STATUS_OPTIONS.map((opt) => {
            const isSelected = currentStatus === opt.status;
            const isGratitude = opt.status === "gratitude";

            return (
              <button
                key={opt.status}
                type="button"
                onClick={() => {
                  onSelectStatus(opt.status);
                  onClose();
                }}
                className={`w-full p-4 rounded-2xl text-left transition-all flex items-start justify-between gap-3 cursor-pointer ${
                  isSelected
                    ? "bg-white border-2 border-[#1F3443] shadow-xs"
                    : isGratitude
                    ? "bg-white/90 border border-[#D3B58A]/50 hover:border-[#D3B58A] hover:bg-white shadow-2xs"
                    : "bg-white/80 border border-[#1F3443]/8 hover:bg-white hover:border-[#1F3443]/20 shadow-2xs"
                }`}
              >
                <div className="flex flex-col flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-sans text-[15px] font-semibold text-[#17212A]">
                      {opt.label}
                    </span>
                    {isGratitude && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-sans font-medium px-2 py-0.5 rounded-full bg-[#D3B58A]/25 text-[#785128]">
                        <HeartIcon size={10} />
                        Recomendado
                      </span>
                    )}
                  </div>
                  <span className="font-sans text-[13px] text-[#6F8796] mt-0.5 leading-snug">
                    {opt.description}
                  </span>
                </div>

                {isSelected && (
                  <span className="w-6 h-6 rounded-full bg-[#1F3443] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <CheckIcon size={14} />
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer cancel button */}
        <div className="pt-3 text-center">
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-sans font-medium text-[#6F8796] hover:text-[#17212A] py-1 cursor-pointer"
          >
            Mantener como está
          </button>
        </div>
      </div>
    </div>
  );
}
