import React from "react";
import { IntentionStatus } from "@/types/intention";

interface IntentionStatusBadgeProps {
  status: IntentionStatus;
  className?: string;
}

export function IntentionStatusBadge({
  status,
  className = "",
}: IntentionStatusBadgeProps) {
  switch (status) {
    case "praying":
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-sans font-medium bg-[#1F3443]/7 text-[#1F3443] ${className}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#1F3443]" />
          En oración
        </span>
      );
    case "gratitude":
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-sans font-medium bg-[#D3B58A]/30 text-[#724C21] border border-[#D3B58A]/40 ${className}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#D3B58A]" />
          Agradecimiento
        </span>
      );
    case "answered":
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-sans font-medium bg-[#3B7A57]/15 text-[#245238] ${className}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#3B7A57]" />
          Resuelta
        </span>
      );
    case "archived":
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-sans font-medium bg-[#1F3443]/5 text-[#6F8796] ${className}`}
        >
          Archivada
        </span>
      );
  }
}
