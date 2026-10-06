"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeftIcon, PlayIcon, SparklesIcon, HeartIcon } from "@/components/ui/Icons";
import { useAuth } from "@/context/AuthContext";
import { useIntentions } from "@/context/IntentionsContext";
import { IntentionStatusBadge } from "@/components/intentions/IntentionStatusBadge";
import { IntentionStatusSheet } from "@/components/intentions/IntentionStatusSheet";
import { IntentionStatus } from "@/types/intention";

export default function IntentionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user, isLoading: isAuthLoading } = useAuth();
  const { getIntention, updateStatus, isLoading: isIntentionsLoading } = useIntentions();
  const [isStatusSheetOpen, setIsStatusSheetOpen] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  const id = Array.isArray(params?.id) ? params.id[0] : (params?.id as string);

  useEffect(() => {
    if (!isAuthLoading && !user) {
      router.replace(`/entrar?next=/camino/intenciones/${id}`);
    }
  }, [isAuthLoading, user, id, router]);

  const intention = getIntention(id);

  if (isAuthLoading || (isIntentionsLoading && !intention)) {
    return (
      <main className="w-full flex flex-col select-none px-6 pt-5 pb-8 min-h-[50vh]">
        <div className="animate-pulse flex flex-col gap-4">
          <div className="h-8 w-16 bg-[#1F3443]/5 rounded-full" />
          <div className="h-10 w-48 bg-[#1F3443]/5 rounded-xl" />
          <div className="h-24 bg-[#1F3443]/5 rounded-2xl" />
        </div>
      </main>
    );
  }

  // Si no existe, fue archivada, pertenece a otro usuario o RLS impidió el acceso:
  // Respuesta neutra sin revelar existencia ni diferencias técnicas
  if (!intention) {
    return (
      <main className="w-full flex flex-col items-center justify-center p-6 text-center min-h-[400px]">
        <h2 className="font-serif text-[24px] text-[#17212A] mb-2">
          No encontramos esta intención.
        </h2>
        <p className="font-sans text-[14px] text-[#6F8796] mb-6">
          Esta intención ya no existe o fue archivada.
        </p>
        <Link
          href="/camino/intenciones"
          className="py-2.5 px-5 rounded-full bg-[#1F3443] text-[#F7F4EE] font-sans text-xs font-medium cursor-pointer"
        >
          Volver a mis intenciones
        </Link>
      </main>
    );
  }

  const handleStatusChange = async (newStatus: IntentionStatus) => {
    setIsUpdatingStatus(true);
    try {
      await updateStatus(intention.id, newStatus);
      if (newStatus === "archived") {
        router.push("/camino/intenciones");
      }
    } catch {
      // El error humano ya lo gestiona el context
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const isGratitude = intention.status === "gratitude";

  return (
    <main className="w-full flex flex-col justify-between min-h-[85vh] select-none px-6 pt-5 pb-8">
      <div>
        {/* Top bar */}
        <div className="w-full flex items-center justify-between mb-6">
          <Link
            href="/camino/intenciones"
            className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center text-[#6F8796] hover:text-[#17212A] hover:bg-[#1F3443]/5 transition-colors cursor-pointer"
            aria-label="Volver a mis intenciones"
          >
            <ArrowLeftIcon size={18} />
          </Link>

          <span className="font-serif text-[14px] text-[#1F3443]/50 tracking-tight">
            con fe
          </span>

          <div className="w-10 h-10" />
        </div>

        {/* Intention Status & Category */}
        <div className="flex items-center gap-2 mb-3">
          <IntentionStatusBadge status={intention.status} />
          {intention.category && (
            <span className="text-xs font-sans text-[#6F8796]">
              • {intention.category}
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="font-serif text-[32px] sm:text-[38px] leading-[1.2] text-[#17212A] font-normal tracking-[-0.015em] mb-4">
          {intention.title}
        </h1>

        {/* Note if present */}
        {intention.note ? (
          <div className="p-5 rounded-2xl bg-white border border-[#1F3443]/8 shadow-2xs mb-6">
            <span className="text-[11px] font-sans font-semibold uppercase tracking-wider text-[#6F8796] block mb-1.5">
              Tu nota personal
            </span>
            <p className="font-sans text-[16px] text-[#17212A] leading-relaxed">
              {intention.note}
            </p>
          </div>
        ) : null}

        {/* Spiritual cycle banner if converted to Gratitude */}
        {isGratitude && (
          <div className="p-5 rounded-2xl bg-[#D3B58A]/15 border border-[#D3B58A]/40 mb-6 flex flex-col gap-2 animate-in fade-in duration-500">
            <div className="flex items-center gap-2 text-[#785128]">
              <SparklesIcon size={18} />
              <span className="text-xs font-sans font-semibold uppercase tracking-wider">
                Fruto de la oración
              </span>
            </div>
            <p className="font-serif text-[16px] text-[#17212A] italic leading-relaxed">
              “Algo por lo que antes orabas hoy puede convertirse en motivo para agradecer.”
            </p>
            <p className="font-sans text-xs text-[#6F8796] pt-1 border-t border-[#D3B58A]/30">
              Petición → Proceso → Agradecimiento
            </p>
          </div>
        )}

        {/* Date line */}
        <p className="font-sans text-xs text-[#6F8796]/80 mb-6">
          En tus oraciones {intention.createdAt.toLowerCase()}
        </p>
      </div>

      {/* Bottom Actions */}
      <div className="w-full flex flex-col gap-3 pt-6 max-w-sm mx-auto">
        {/* Primary CTA: Quiero orar por esto */}
        <Link
          href="/orar/preocupacion"
          className="w-full py-4 rounded-2xl bg-[#1F3443] text-[#F7F4EE] font-sans text-[15px] font-medium text-center shadow-[0_4px_16px_rgba(31,52,67,0.15)] hover:bg-[#284255] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <PlayIcon size={16} />
          <span>Quiero orar por esto</span>
        </Link>

        {/* Secondary Action: Esto cambió */}
        <button
          type="button"
          disabled={isUpdatingStatus}
          onClick={() => setIsStatusSheetOpen(true)}
          className="w-full py-3.5 rounded-2xl bg-white border border-[#1F3443]/12 text-[#17212A] font-sans text-[14px] font-medium hover:bg-[#F7F4EE] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs disabled:opacity-60"
        >
          <HeartIcon size={16} className="text-[#A45A3E]" />
          <span>{isUpdatingStatus ? "Guardando…" : "Esto cambió"}</span>
        </button>
      </div>

      {/* Evolution bottom sheet */}
      <IntentionStatusSheet
        isOpen={isStatusSheetOpen}
        currentStatus={intention.status}
        onClose={() => setIsStatusSheetOpen(false)}
        onSelectStatus={handleStatusChange}
      />
    </main>
  );
}
