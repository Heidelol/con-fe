"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { BottomNavigation } from "./BottomNavigation";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const isPrayerSession = pathname?.startsWith("/orar/");

  return (
    <div className="min-h-screen w-full bg-[#F7F4EE] sm:bg-[#ECE7DE] flex justify-center selection:bg-[#DCE6EB] selection:text-[#1F3443]">
      {/* Mobile container - full width on mobile, centered max-w-[430px] on tablet/desktop */}
      <div className="relative w-full sm:max-w-[430px] min-h-screen bg-[#F7F4EE] flex flex-col sm:shadow-[0_8px_40px_rgba(31,52,67,0.06)] sm:border-x sm:border-[#1F3443]/6 transition-all">
        {/* Main scrollable content */}
        <div className={`flex-1 flex flex-col ${isPrayerSession ? "" : "pb-28"}`}>
          {children}
        </div>

        {/* Persistent bottom navigation - hidden during prayer sessions */}
        {!isPrayerSession && <BottomNavigation />}
      </div>
    </div>
  );
}

