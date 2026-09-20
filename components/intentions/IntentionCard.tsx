import React from "react";
import Link from "next/link";
import { PrayerIntention } from "@/types/intention";
import { IntentionStatusBadge } from "./IntentionStatusBadge";
import { ChevronRightIcon } from "@/components/ui/Icons";

interface IntentionCardProps {
  intention: PrayerIntention;
  className?: string;
}

export function IntentionCard({ intention, className = "" }: IntentionCardProps) {
  return (
    <Link
      href={`/camino/intenciones/${intention.id}`}
      className={`group flex flex-col p-5 rounded-2xl bg-white border border-[#1F3443]/7 shadow-[0_1px_4px_rgba(31,52,67,0.02)] hover:border-[#1F3443]/15 hover:shadow-[0_4px_16px_rgba(31,52,67,0.04)] active:scale-[0.99] transition-all duration-200 text-left ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <IntentionStatusBadge status={intention.status} />
            {intention.category && (
              <span className="text-[11px] font-sans text-[#6F8796]/80">
                • {intention.category}
              </span>
            )}
          </div>

          <h3 className="font-serif text-[18px] sm:text-[19px] text-[#17212A] font-medium tracking-tight group-hover:text-[#1F3443] transition-colors">
            {intention.title}
          </h3>
        </div>

        <span className="text-[#6F8796]/60 group-hover:text-[#1F3443] transition-colors pt-1">
          <ChevronRightIcon size={18} />
        </span>
      </div>

      {intention.note && (
        <p className="mt-2 font-sans text-[14px] text-[#6F8796] leading-relaxed line-clamp-2">
          {intention.note}
        </p>
      )}

      <div className="mt-3.5 pt-2.5 border-t border-[#1F3443]/5 flex items-center justify-between text-[11px] sm:text-[12px] text-[#6F8796]/70 font-sans">
        <span>{intention.createdAt}</span>
        <span className="text-xs text-[#1F3443]/60 group-hover:text-[#1F3443] transition-colors font-medium">
          Ver detalle →
        </span>
      </div>
    </Link>
  );
}
