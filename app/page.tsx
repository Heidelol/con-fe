import React from "react";
import { Header } from "@/components/ui/Header";
import { QuickActions } from "@/components/home/QuickActions";
import { PrayerCard } from "@/components/home/PrayerCard";
import { DailyMomentCard } from "@/components/home/DailyMomentCard";

export default function HomePage() {
  return (
    <main className="w-full flex flex-col">
      {/* Top Bar Header */}
      <Header />

      {/* Main Spiritual Question - Principal Visual Anchor */}
      <section className="w-full px-6 pt-5 pb-4" aria-label="Pregunta del día">
        <h1 className="font-serif text-[28px] leading-[1.28] text-[#17212A] font-normal tracking-[-0.015em]">
          ¿Qué quieres poner hoy en manos de Dios?
        </h1>
      </section>

      {/* Quick Intention Cards */}
      <QuickActions />

      {/* Hero Prayer Card */}
      <PrayerCard />

      {/* 1 Minute With God Secondary Card */}
      <DailyMomentCard />
    </main>
  );
}
