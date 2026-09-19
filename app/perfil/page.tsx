import React from "react";
import { Header } from "@/components/ui/Header";
import {
  SettingsIcon,
  AudioWaveIcon,
  BellIcon,
  ShieldIcon,
  UserIcon,
  ChevronRightIcon,
} from "@/components/ui/Icons";

interface SettingItem {
  id: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const SETTINGS: SettingItem[] = [
  {
    id: "preferencias",
    label: "Preferencias",
    description: "Personaliza tu experiencia y ritmo diario",
    icon: SettingsIcon,
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
    id: "privacidad",
    label: "Privacidad",
    description: "Tus intenciones y datos siempre seguros",
    icon: ShieldIcon,
  },
  {
    id: "cuenta",
    label: "Cuenta",
    description: "Gestión de perfil y respaldo",
    icon: UserIcon,
  },
];

export default function PerfilPage() {
  return (
    <main className="w-full flex flex-col">
      <Header greeting="Tu perfil" />

      {/* Page Title */}
      <section className="w-full px-6 pt-5 pb-6">
        <h1 className="font-serif text-[28px] leading-[1.25] text-[#17212A] font-normal tracking-[-0.015em] mb-1.5">
          Tú
        </h1>
        <p className="font-sans text-[15px] text-[#6F8796]">
          Tu espacio personal y preferencias de oración.
        </p>
      </section>

      {/* Settings Options List */}
      <section className="w-full px-6" aria-label="Ajustes y opciones">
        <div className="flex flex-col bg-white rounded-2xl border border-[#1F3443]/7 shadow-[0_1px_4px_rgba(31,52,67,0.02)] overflow-hidden divide-y divide-[#1F3443]/5">
          {SETTINGS.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                className="w-full flex items-center justify-between p-4 text-left transition-colors duration-200 hover:bg-[#FAF8F5] active:bg-[#F5F2EA] focus-visible:ring-2 focus-visible:ring-[#1F3443] focus-visible:outline-none"
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
        </div>

        {/* Discreet App Info Footer */}
        <div className="mt-8 text-center">
          <p className="font-sans text-[12px] text-[#6F8796]/80">
            Con Fe · Versión 0.1.0 (Alfa)
          </p>
          <p className="font-sans text-[11px] text-[#6F8796]/60 mt-1">
            Diseñado con serenidad para acompañar tu oración
          </p>
        </div>
      </section>
    </main>
  );
}
