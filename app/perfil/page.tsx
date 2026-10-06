"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/ui/Header";
import {
  SettingsIcon,
  AudioWaveIcon,
  BellIcon,
  ShieldIcon,
  UserIcon,
  ChevronRightIcon,
  LockIcon,
} from "@/components/ui/Icons";
import { useAuth } from "@/context/AuthContext";
import { FutureFeatureDialog } from "@/components/prayer/FutureFeatureDialog";

interface SettingItem {
  id: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const SETTINGS: SettingItem[] = [
  {
    id: "cuenta",
    label: "Cuenta",
    description: "Gestión de perfil y respaldo",
    icon: UserIcon,
  },
  {
    id: "privacidad",
    label: "Privacidad",
    description: "Tus intenciones y datos siempre seguros",
    icon: ShieldIcon,
  },
  {
    id: "audio",
    label: "Audio",
    description: "Voz de guía y sonidos de ambientación",
    icon: AudioWaveIcon,
  },
  {
    id: "notificaciones",
    label: "Notificaciones",
    description: "Recordatorios discretos para orar",
    icon: BellIcon,
  },
  {
    id: "preferencias",
    label: "Preferencias",
    description: "Personaliza tu experiencia y ritmo diario",
    icon: SettingsIcon,
  },
];

export default function PerfilPage() {
  const { user, isLoading, signOut } = useAuth();
  const [activeDialogTitle, setActiveDialogTitle] = useState<string | null>(null);
  const [activeDialogMessage, setActiveDialogMessage] = useState<string>("");
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleOpenDialog = (title: string, message: string) => {
    setActiveDialogTitle(title);
    setActiveDialogMessage(message);
  };

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await signOut();
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <main className="w-full flex flex-col select-none">
      <Header greeting="Tu perfil" />

      {/* Header Profile Section */}
      <section className="w-full px-6 pt-5 pb-6">
        <h1 className="font-serif text-[28px] leading-[1.25] text-[#17212A] font-normal tracking-[-0.015em] mb-1.5">
          Tú
        </h1>

        {isLoading ? (
          <div className="h-5 w-40 bg-[#1F3443]/5 rounded-md animate-pulse mt-1" />
        ) : user ? (
          /* Usuario autenticado: mostrar discretamente su correo */
          <div className="flex flex-col gap-1">
            <p className="font-sans text-[15px] text-[#17212A] font-medium">
              {user.email}
            </p>
            <span className="font-sans text-xs text-[#6F8796]">
              Cuenta activa protegida
            </span>
          </div>
        ) : (
          /* Visitante sin cuenta */
          <p className="font-sans text-[15px] text-[#6F8796]">
            Tu espacio personal y preferencias de oración.
          </p>
        )}
      </section>

      {/* Si no hay sesión: tarjeta de invitación para Entrar */}
      {!isLoading && !user && (
        <section className="w-full px-6 mb-6">
          <div className="flex flex-col p-5 rounded-2xl bg-white border border-[#1F3443]/8 shadow-2xs">
            <div className="flex items-center gap-2 text-[#1F3443] mb-1.5">
              <LockIcon size={16} />
              <span className="font-serif text-[17px] font-medium text-[#17212A]">
                Tu espacio privado
              </span>
            </div>
            <p className="font-sans text-[13px] text-[#6F8796] leading-relaxed mb-4">
              Crea tu espacio o inicia sesión para guardar tus intenciones de forma privada y volver a ellas.
            </p>
            <Link
              href="/entrar?next=/perfil"
              className="py-3 px-5 rounded-xl bg-[#1F3443] text-[#F7F4EE] font-sans text-sm font-medium text-center hover:bg-[#284255] transition-all cursor-pointer"
            >
              Entrar
            </Link>
          </div>
        </section>
      )}

      {/* Settings Options List */}
      <section className="w-full px-6" aria-label="Ajustes y opciones">
        <div className="flex flex-col bg-white rounded-2xl border border-[#1F3443]/7 shadow-[0_1px_4px_rgba(31,52,67,0.02)] overflow-hidden divide-y divide-[#1F3443]/5">
          {SETTINGS.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  if (item.id === "privacidad") {
                    handleOpenDialog(
                      "Privacidad",
                      "Tus intenciones se guardan en tu cuenta privada con Row Level Security para que ningún otro usuario tenga acceso a ellas."
                    );
                  } else if (item.id === "cuenta") {
                    handleOpenDialog(
                      "Cuenta",
                      user
                        ? `Tu cuenta está vinculada a ${user.email}. Tus datos están respaldados de forma segura.`
                        : "Inicia sesión desde 'Entrar' para asociar tu cuenta y respaldar tus intenciones."
                    );
                  } else {
                    handleOpenDialog(
                      item.label,
                      `La configuración de ${item.label.toLowerCase()} estará disponible próximamente.`
                    );
                  }
                }}
                className="w-full flex items-center justify-between p-4 text-left transition-colors duration-200 hover:bg-[#FAF8F5] active:bg-[#F5F2EA] focus-visible:ring-2 focus-visible:ring-[#1F3443] focus-visible:outline-none cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#F7F4EE] flex items-center justify-center text-[#1F3443] shrink-0">
                    <Icon size={18} />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-sans text-[15px] font-medium text-[#17212A]">
                      {item.label}
                    </span>
                    <span className="font-sans text-[12px] text-[#6F8796] mt-0.5">
                      {item.description}
                    </span>
                  </div>
                </div>
                <span className="text-[#6F8796] shrink-0 ml-2">
                  <ChevronRightIcon size={16} />
                </span>
              </button>
            );
          })}

          {/* Cerrar Sesión (solo visible si está autenticado) */}
          {user && (
            <button
              type="button"
              disabled={isSigningOut}
              onClick={handleSignOut}
              className="w-full flex items-center justify-between p-4 text-left transition-colors duration-200 hover:bg-[#FAF8F5] active:bg-[#F5F2EA] focus-visible:ring-2 focus-visible:ring-[#1F3443] focus-visible:outline-none cursor-pointer group"
            >
              <span className="font-sans text-[15px] font-medium text-[#A45A3E] group-hover:text-[#8C462D]">
                {isSigningOut ? "Cerrando sesión…" : "Cerrar sesión"}
              </span>
              <span className="text-xs font-sans text-[#6F8796]">Salir</span>
            </button>
          )}
        </div>

        {/* Discreet App Info Footer */}
        <div className="mt-8 text-center pb-10">
          <p className="font-sans text-[12px] text-[#6F8796]/80">
            Con Fe · Versión 0.1.0 (Beta)
          </p>
          <p className="font-sans text-[11px] text-[#6F8796]/60 mt-1">
            Diseñado con serenidad para acompañar tu oración
          </p>
        </div>
      </section>

      <FutureFeatureDialog
        isOpen={Boolean(activeDialogTitle)}
        onClose={() => setActiveDialogTitle(null)}
        title={activeDialogTitle || ""}
        message={activeDialogMessage}
      />
    </main>
  );
}
