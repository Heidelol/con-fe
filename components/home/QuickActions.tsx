import React from "react";
import Link from "next/link";
import {
  HeartIcon,
  CloudQuietIcon,
  HandsIcon,
  DovePeaceIcon,
  ChevronRightIcon,
} from "@/components/ui/Icons";

interface ActionItem {
  id: string;
  slug: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const ACTIONS: ActionItem[] = [
  {
    id: "agradecer",
    slug: "agradecer",
    label: "Agradecer",
    icon: HeartIcon,
  },
  {
    id: "preocupado",
    slug: "preocupacion",
    label: "Estoy preocupado",
    icon: CloudQuietIcon,
  },
  {
    id: "pedir",
    slug: "pedir",
    label: "Pedir por alguien",
    icon: HandsIcon,
  },
  {
    id: "paz",
    slug: "paz",
    label: "Necesito paz",
    icon: DovePeaceIcon,
  },
];

export function QuickActions() {
  return (
    <section className="w-full px-6 pt-2 pb-6" aria-label="Intenciones rápidas">
      <div className="grid grid-cols-2 gap-3">
        {ACTIONS.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.id}
              href={`/orar/${item.slug}`}
              className="group flex flex-col items-start justify-between p-4 min-h-[92px] bg-white rounded-2xl border border-[#1F3443]/7 shadow-[0_1px_3px_rgba(31,52,67,0.02)] transition-all duration-200 hover:border-[#1F3443]/15 hover:shadow-[0_3px_12px_rgba(31,52,67,0.04)] active:scale-[0.985] active:bg-[#FAF8F5] text-left focus-visible:ring-2 focus-visible:ring-[#1F3443] focus-visible:outline-none"
            >
              <span className="w-8 h-8 rounded-xl bg-[#F7F4EE] flex items-center justify-center text-[#1F3443] transition-colors duration-200 group-hover:bg-[#DCE6EB]/50">
                <Icon size={18} />
              </span>
              <span className="mt-3 font-sans text-[14px] font-medium text-[#17212A] tracking-[-0.01em] leading-snug">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>

      <div className="flex justify-center mt-3">
        <Link
          href="/orar"
          className="inline-flex items-center gap-1.5 text-[13px] font-sans font-medium text-[#6F8796] hover:text-[#1F3443] transition-colors py-2 px-3 rounded-lg focus-visible:ring-2 focus-visible:ring-[#1F3443] focus-visible:outline-none active:opacity-75"
        >
          <span>Ver más</span>
          <ChevronRightIcon size={14} />
        </Link>
      </div>
    </section>
  );
}
