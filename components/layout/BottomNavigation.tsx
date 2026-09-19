"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon, PathIcon, ProfileIcon } from "@/components/ui/Icons";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const NAV_ITEMS: NavItem[] = [
  {
    label: "Inicio",
    href: "/",
    icon: HomeIcon,
  },
  {
    label: "Camino",
    href: "/camino",
    icon: PathIcon,
  },
  {
    label: "Tú",
    href: "/perfil",
    icon: ProfileIcon,
  },
];

export function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Navegación principal"
      className="fixed bottom-0 left-0 right-0 z-40 flex justify-center pointer-events-none"
    >
      <div className="w-full sm:max-w-[430px] pointer-events-auto bg-[#F7F4EE]/95 backdrop-blur-md border-t border-[#1F3443]/8 sm:border-x sm:border-[#1F3443]/6 shadow-[0_-2px_12px_rgba(31,52,67,0.03)] pb-[max(env(safe-area-inset-bottom),0.75rem)] pt-2.5 px-6">
        <ul className="flex items-center justify-around m-0 p-0 list-none">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            const Icon = item.icon;

            return (
              <li key={item.href} className="flex-1">
                <Link
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-all duration-200 min-h-[48px] focus-visible:ring-2 focus-visible:ring-[#1F3443] focus-visible:outline-none ${
                    isActive
                      ? "text-[#1F3443] font-medium scale-[1.02]"
                      : "text-[#6F8796] hover:text-[#1F3443] active:opacity-70"
                  }`}
                >
                  <Icon
                    size={22}
                    className={`transition-colors duration-200 ${
                      isActive ? "text-[#1F3443]" : "text-[#6F8796]"
                    }`}
                  />
                  <span className="text-[11px] tracking-wide mt-1 font-sans">
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
