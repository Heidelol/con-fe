import React from "react";
import Link from "next/link";
import { getPrayerSession, getIntentionBySlug } from "@/data/prayers";
import { PrayerSession } from "@/components/prayer/PrayerSession";
import { ArrowLeftIcon } from "@/components/ui/Icons";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function PrayerPage({ params }: PageProps) {
  const { slug } = await params;
  const sessionConfig = getPrayerSession(slug);

  // If session configuration exists, render the full Prayer Engine Session
  if (sessionConfig) {
    return <PrayerSession config={sessionConfig} />;
  }

  // Otherwise check if it is a valid upcoming intention
  const intention = getIntentionBySlug(slug);

  return (
    <div className="flex-1 flex flex-col justify-between min-h-screen bg-[#F7F4EE] px-6 pt-6 pb-8">
      {/* Top navigation */}
      <div className="w-full flex items-center justify-between pb-6">
        <Link
          href="/orar"
          className="w-9 h-9 rounded-full flex items-center justify-center text-[#6F8796] hover:text-[#1F3443] hover:bg-[#1F3443]/5 active:scale-95 transition-all focus-visible:ring-2 focus-visible:ring-[#1F3443] focus-visible:outline-none"
          aria-label="Volver al catálogo de oraciones"
        >
          <ArrowLeftIcon size={18} />
        </Link>
        <span className="font-serif text-[15px] font-medium text-[#1F3443]/60 tracking-tight select-none">
          con fe
        </span>
        <div className="w-9 h-9" />
      </div>

      {/* Main upcoming message */}
      <div className="flex-1 flex flex-col justify-center text-center max-w-[340px] mx-auto">
        <div className="w-12 h-12 rounded-2xl bg-[#D3B58A]/20 flex items-center justify-center mx-auto mb-6">
          <span className="w-2.5 h-2.5 rounded-full bg-[#D3B58A]" />
        </div>

        <h1 className="font-serif text-[28px] leading-[1.28] text-[#17212A] font-normal tracking-[-0.015em] mb-3">
          {intention ? intention.title : "Momento de oración"}
        </h1>

        <p className="font-sans text-[16px] text-[#1F3443] font-medium mb-2">
          Esta experiencia estará disponible próximamente.
        </p>

        <p className="font-sans text-[14px] text-[#6F8796] leading-relaxed">
          Estamos preparando este momento de oración con el cuidado y la serenidad que merece.
        </p>
      </div>

      {/* Actions */}
      <div className="w-full flex flex-col items-center gap-3 pt-6">
        <Link
          href="/orar/preocupacion"
          className="w-full sm:w-auto min-w-[220px] text-center py-3.5 px-8 rounded-full bg-[#1F3443] text-[#F7F4EE] font-sans text-[15px] font-medium tracking-normal transition-all hover:bg-[#284255] active:scale-[0.98] shadow-sm focus-visible:ring-2 focus-visible:ring-[#1F3443] focus-visible:outline-none"
        >
          Orar: Estoy preocupado
        </Link>

        <Link
          href="/"
          className="text-[14px] font-sans font-medium text-[#6F8796] hover:text-[#17212A] py-2 px-4 transition-colors focus-visible:ring-2 focus-visible:ring-[#1F3443] focus-visible:outline-none"
        >
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
}
