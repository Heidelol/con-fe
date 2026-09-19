"use client";

import React from "react";
import { DailyPrayer } from "@/types/daily-prayer";
import { ArrowLeftIcon, HeadphonesIcon } from "@/components/ui/Icons";

interface ReadingModeProps {
  prayer: DailyPrayer;
  onSwitchToAudio: () => void;
  onComplete: () => void;
  onExit: () => void;
}

export function ReadingMode({
  prayer,
  onSwitchToAudio,
  onComplete,
  onExit,
}: ReadingModeProps) {
  const { readingContent } = prayer;

  return (
    <div className="min-h-screen bg-[#F7F4EE] text-[#17212A]">
      {/* Sticky top navigation bar */}
      <header className="sticky top-0 z-30 bg-[#F7F4EE]/90 backdrop-blur-md border-b border-[#1F3443]/6 px-5 sm:px-8 py-3.5 flex items-center justify-between max-w-xl mx-auto">
        <button
          type="button"
          onClick={onExit}
          className="p-2 -ml-2 rounded-full text-[#6F8796] hover:text-[#17212A] hover:bg-[#1F3443]/5 transition-colors focus-visible:ring-2 focus-visible:ring-[#1F3443] focus-visible:outline-none cursor-pointer"
          aria-label="Salir de la oración"
        >
          <ArrowLeftIcon size={22} />
        </button>

        <span className="text-xs font-semibold uppercase tracking-wider text-[#6F8796]">
          Modo Lectura
        </span>

        <button
          type="button"
          onClick={onSwitchToAudio}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-[#1F3443] bg-white border border-[#1F3443]/12 hover:bg-[#F7F4EE] active:scale-95 transition-all shadow-2xs cursor-pointer"
        >
          <HeadphonesIcon size={14} />
          <span>Escuchar</span>
        </button>
      </header>

      {/* Main Content Area */}
      <main className="max-w-xl mx-auto px-6 sm:px-8 pt-8 pb-16 flex flex-col gap-10">
        {/* Article Title & Meta */}
        <div className="flex flex-col gap-2.5 border-b border-[#1F3443]/8 pb-7">
          <div className="flex items-center gap-2 text-xs font-medium text-[#6F8796]">
            <span className="px-2.5 py-0.5 rounded-full bg-[#1F3443]/6 text-[#1F3443] font-semibold tracking-wide uppercase text-[10px]">
              Oración del Día
            </span>
            <span>·</span>
            <span className="text-[#A45A3E] font-medium">{prayer.scriptureReference}</span>
            <span>·</span>
            <span>{prayer.durationLabel} de lectura</span>
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl text-[#17212A] font-medium leading-tight">
            {prayer.title}
          </h1>

          {prayer.subtitle && (
            <p className="font-sans text-sm text-[#4E616E] leading-relaxed">
              {prayer.subtitle}
            </p>
          )}
        </div>

        {/* 1. Llegar */}
        <section className="flex flex-col gap-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#6F8796]">
            {readingContent.arrival.title}
          </h2>
          <p className="font-serif text-base sm:text-lg text-[#263845] leading-relaxed italic bg-white/70 p-5 rounded-2xl border border-[#1F3443]/6 shadow-2xs">
            {readingContent.arrival.text}
          </p>
        </section>

        {/* 2. Propósito de hoy */}
        <section className="flex flex-col gap-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#6F8796]">
            {readingContent.purpose.title}
          </h2>
          <p className="font-sans text-[15px] sm:text-base text-[#17212A] leading-relaxed">
            {readingContent.purpose.text}
          </p>
        </section>

        {/* 3. Háblale a Dios */}
        <section className="flex flex-col gap-3 p-5 sm:p-6 rounded-2xl bg-[#F0ECE1] border border-[#1F3443]/8">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#1F3443]">
            {readingContent.personalPrayer.title}
          </h2>
          <p className="font-serif text-lg text-[#17212A] font-medium leading-snug">
            {readingContent.personalPrayer.prompt}
          </p>
          <p className="font-sans text-sm text-[#4E616E] leading-relaxed">
            {readingContent.personalPrayer.guidance}
          </p>
        </section>

        {/* 4. Oración opcional */}
        <section className="flex flex-col gap-3.5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#6F8796]">
            {readingContent.optionalPrayer.title}
          </h2>
          <div className="border-l-2 border-[#D3B58A] pl-5 py-1 flex flex-col gap-3">
            {readingContent.optionalPrayer.lines.map((line, idx) => (
              <p
                key={idx}
                className={`font-serif text-[15px] sm:text-base leading-relaxed ${
                  line === "Amén."
                    ? "font-semibold text-[#1F3443] pt-1"
                    : "text-[#263845]"
                }`}
              >
                {line}
              </p>
            ))}
          </div>
        </section>

        {/* 5. Escritura */}
        <section className="flex flex-col gap-3 p-5 sm:p-6 rounded-2xl bg-white border border-[#1F3443]/8 shadow-xs">
          <div className="flex items-center justify-between text-xs font-semibold text-[#A45A3E]">
            <span className="uppercase tracking-wider">
              {readingContent.scripture.title}
            </span>
            <span>{readingContent.scripture.reference}</span>
          </div>

          <blockquote className="font-serif text-lg sm:text-xl text-[#17212A] italic leading-relaxed pt-1">
            {readingContent.scripture.passage}
          </blockquote>

          <p className="font-sans text-xs sm:text-sm text-[#6F8796] pt-2 border-t border-[#1F3443]/6 leading-relaxed">
            {readingContent.scripture.reflection}
          </p>
        </section>

        {/* 6. Cierre */}
        <section className="flex flex-col gap-3 bg-[#FAF8F3] p-5 rounded-2xl border border-[#1F3443]/6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#6F8796]">
            {readingContent.closing.title}
          </h2>
          <p className="font-serif text-[15px] sm:text-base text-[#17212A] leading-relaxed">
            {readingContent.closing.text}
          </p>
        </section>

        {/* Action Footer */}
        <div className="flex flex-col gap-3 pt-6 border-t border-[#1F3443]/8">
          <button
            type="button"
            onClick={onComplete}
            className="w-full py-4 rounded-xl bg-[#1F3443] text-[#F7F4EE] font-sans font-medium text-sm sm:text-base shadow-sm hover:bg-[#284255] active:scale-[0.99] transition-all focus-visible:ring-2 focus-visible:ring-[#1F3443] focus-visible:outline-none cursor-pointer"
          >
            Concluir oración
          </button>

          <button
            type="button"
            onClick={onSwitchToAudio}
            className="w-full py-3 rounded-xl bg-transparent text-[#1F3443] font-sans text-sm font-medium hover:bg-white/60 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <HeadphonesIcon size={16} />
            <span>Escuchar versión en audio</span>
          </button>
        </div>
      </main>
    </div>
  );
}
