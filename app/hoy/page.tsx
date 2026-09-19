import { Metadata } from "next";
import { todayDailyPrayer } from "@/data/daily-prayers/today";
import { DailyPrayerExperience } from "@/components/daily/DailyPrayerExperience";

export const metadata: Metadata = {
  title: "Oración del Día | Con Fe",
  description: "Un momento diario de paz, escucha y oración para reconectar con Dios.",
};

export default function DailyPrayerPage() {
  return <DailyPrayerExperience prayer={todayDailyPrayer} />;
}
