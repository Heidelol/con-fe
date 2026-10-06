"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon, CheckIcon } from "@/components/ui/Icons";
import { useAuth } from "@/context/AuthContext";
import { useIntentions } from "@/context/IntentionsContext";
import { IntentionCard } from "@/components/intentions/IntentionCard";
import { EmptyIntentions } from "@/components/intentions/EmptyIntentions";

type FilterType = "all" | "praying" | "gratitude";

export default function IntentionsListPage() {
  const router = useRouter();
  const { user, isLoading: isAuthLoading } = useAuth();
  const { intentions, isLoading: isIntentionsLoading, error, lastSavedId, clearLastSaved } =
    useIntentions();

  const [filter, setFilter] = useState<FilterType>("all");
  const [dismissedId, setDismissedId] = useState<string | null>(null);

  // Redirigir a login si el usuario no tiene sesión
  useEffect(() => {
    if (!isAuthLoading && !user) {
      router.replace("/entrar?next=/camino/intenciones");
    }
  }, [isAuthLoading, user, router]);

  const showSavedToast = Boolean(lastSavedId && lastSavedId !== dismissedId);

  useEffect(() => {
    if (lastSavedId && lastSavedId !== dismissedId) {
      const timer = setTimeout(() => {
        clearLastSaved();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [lastSavedId, dismissedId, clearLastSaved]);

  if (isAuthLoading || (!user && isAuthLoading)) {
    return (
      <main className="w-full flex flex-col select-none px-6 pt-5 pb-8 min-h-[50vh]">
        <div className="animate-pulse flex flex-col gap-4">
          <div className="h-8 w-24 bg-[#1F3443]/5 rounded-full" />
          <div className="h-8 w-48 bg-[#1F3443]/5 rounded-xl" />
          <div className="h-20 bg-[#1F3443]/5 rounded-2xl" />
        </div>
      </main>
    );
  }

  // Filtered intentions
  const filteredIntentions = intentions.filter((item) => {
    if (filter === "praying") return item.status === "praying";
    if (filter === "gratitude") return item.status === "gratitude";
    return item.status !== "archived";
  });

  return (
    <main className="w-full flex flex-col select-none px-6 pt-5 pb-8">
      {/* Top navigation */}
      <div className="w-full flex items-center justify-between mb-4">
        <Link
          href="/camino"
          className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center text-[#6F8796] hover:text-[#17212A] hover:bg-[#1F3443]/5 transition-colors cursor-pointer"
          aria-label="Volver a Tu camino"
        >
          <ArrowLeftIcon size={18} />
        </Link>

        <Link
          href="/camino/intenciones/nueva"
          className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-[#1F3443] text-[#F7F4EE] font-sans text-xs sm:text-[13px] font-medium shadow-xs hover:bg-[#284255] active:scale-95 transition-all cursor-pointer"
        >
          <span>+ Nueva intención</span>
        </Link>
      </div>

      {/* Title & Subtitle */}
      <header className="mb-5">
        <h1 className="font-serif text-[28px] sm:text-[32px] leading-[1.2] text-[#17212A] font-normal tracking-tight mb-2">
          Mis intenciones
        </h1>
        <p className="font-sans text-[15px] text-[#6F8796] leading-relaxed max-w-sm">
          Aquello que sigues poniendo en manos de Dios.
        </p>
      </header>

      {/* Error discreto si hubo problema al cargar */}
      {error && (
        <div
          role="alert"
          className="w-full p-3.5 mb-5 rounded-2xl bg-[#A45A3E]/10 border border-[#A45A3E]/20 text-[#A45A3E] font-sans text-xs sm:text-[13px]"
        >
          {error}
        </div>
      )}

      {/* Subtle saved confirmation banner - Copy exacto: "Intención guardada." */}
      {showSavedToast && (
        <div
          role="status"
          className="w-full p-3.5 mb-5 rounded-2xl bg-[#3B7A57]/10 border border-[#3B7A57]/20 flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2 duration-300"
        >
          <div className="flex items-center gap-2 text-[#245238]">
            <span className="w-5 h-5 rounded-full bg-[#3B7A57] text-white flex items-center justify-center shrink-0">
              <CheckIcon size={12} />
            </span>
            <span className="font-sans text-xs sm:text-[13px] font-medium">
              Intención guardada.
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              setDismissedId(lastSavedId);
              clearLastSaved();
            }}
            className="text-xs text-[#245238]/70 hover:text-[#245238] font-sans font-medium px-2 py-1 cursor-pointer"
          >
            Entendido
          </button>
        </div>
      )}

      {/* Discreet Filters */}
      {intentions.length > 0 && (
        <div
          className="flex items-center gap-1.5 mb-5 overflow-x-auto no-scrollbar py-1"
          role="tablist"
          aria-label="Filtrar intenciones"
        >
          <button
            type="button"
            role="tab"
            aria-selected={filter === "all"}
            onClick={() => setFilter("all")}
            className={`py-1.5 px-3.5 rounded-full font-sans text-xs font-medium transition-all cursor-pointer ${
              filter === "all"
                ? "bg-[#1F3443] text-[#F7F4EE] shadow-2xs"
                : "bg-white/80 border border-[#1F3443]/8 text-[#6F8796] hover:text-[#17212A] hover:bg-white"
            }`}
          >
            Todas ({intentions.filter((i) => i.status !== "archived").length})
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={filter === "praying"}
            onClick={() => setFilter("praying")}
            className={`py-1.5 px-3.5 rounded-full font-sans text-xs font-medium transition-all cursor-pointer ${
              filter === "praying"
                ? "bg-[#1F3443] text-[#F7F4EE] shadow-2xs"
                : "bg-white/80 border border-[#1F3443]/8 text-[#6F8796] hover:text-[#17212A] hover:bg-white"
            }`}
          >
            En oración ({intentions.filter((i) => i.status === "praying").length})
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={filter === "gratitude"}
            onClick={() => setFilter("gratitude")}
            className={`py-1.5 px-3.5 rounded-full font-sans text-xs font-medium transition-all cursor-pointer ${
              filter === "gratitude"
                ? "bg-[#1F3443] text-[#F7F4EE] shadow-2xs"
                : "bg-white/80 border border-[#1F3443]/8 text-[#6F8796] hover:text-[#17212A] hover:bg-white"
            }`}
          >
            Agradecimientos (
            {intentions.filter((i) => i.status === "gratitude").length})
          </button>
        </div>
      )}

      {/* Loading Skeleton */}
      {isIntentionsLoading ? (
        <div className="flex flex-col gap-3.5 animate-pulse">
          <div className="h-24 rounded-2xl bg-white/70 border border-[#1F3443]/5" />
          <div className="h-24 rounded-2xl bg-white/70 border border-[#1F3443]/5" />
        </div>
      ) : filteredIntentions.length > 0 ? (
        <div className="flex flex-col gap-3.5">
          {filteredIntentions.map((intention) => (
            <IntentionCard key={intention.id} intention={intention} />
          ))}
        </div>
      ) : (
        <EmptyIntentions
          filtered={intentions.length > 0}
          onResetFilter={() => setFilter("all")}
        />
      )}
    </main>
  );
}
