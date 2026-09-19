import React from "react";
import Link from "next/link";
import { PlayIcon } from "@/components/ui/Icons";

interface PrayerCardProps {
  category?: string;
  title?: string;
  metadata?: string;
  ctaText?: string;
}

export function PrayerCard({
  category = "Oración del día",
  title = "Confiar cuando no tengo todas las respuestas",
  metadata = "Salmo 23 · 4 min",
  ctaText = "Escuchar",
}: PrayerCardProps) {
  return (
    <section className="w-full px-6 py-3" aria-label="Oración destacada">
      <Link
        href="/hoy"
        className="group block relative overflow-hidden rounded-3xl bg-[#1F3443] text-[#F7F4EE] p-6 shadow-[0_8px_24px_rgba(31,52,67,0.12)] border border-[#1F3443]/20 transition-all duration-200 hover:shadow-[0_12px_32px_rgba(31,52,67,0.18)] active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1F3443] focus-visible:outline-none"
      >
        {/* Subtle background serenity texture / radial gradient warm halo */}
        <div
          className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-[#D3B58A]/10 blur-2xl pointer-events-none transition-transform duration-500 group-hover:scale-110"
          aria-hidden="true"
        />
        <div
          className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full bg-[#6F8796]/15 blur-2xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col items-start">
          {/* Section label */}
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D3B58A]" />
            <span className="font-sans text-[12px] font-medium tracking-wider uppercase text-[#D3B58A]">
              {category}
            </span>
          </div>

          {/* Title */}
          <h2 className="font-serif text-[21px] leading-[1.3] text-[#F7F4EE] font-normal tracking-[-0.01em] mb-2 max-w-[90%] group-hover:text-white transition-colors">
            {title}
          </h2>

          {/* Metadata */}
          <p className="font-sans text-[13px] text-[#DCE6EB]/80 mb-6 font-normal tracking-wide">
            {metadata}
          </p>

          {/* Primary CTA */}
          <span
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#F7F4EE] text-[#1F3443] font-sans text-[14px] font-medium tracking-normal transition-all duration-200 group-hover:bg-[#DCE6EB] group-hover:scale-[1.01] shadow-sm"
            aria-label={`${ctaText}: ${title}`}
          >
            <span className="w-6 h-6 rounded-full bg-[#1F3443] text-[#F7F4EE] flex items-center justify-center pl-0.5">
              <PlayIcon size={11} />
            </span>
            <span>{ctaText}</span>
          </span>
        </div>
      </Link>
    </section>
  );
}
