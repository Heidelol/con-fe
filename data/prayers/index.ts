import { PrayerSessionConfig } from "@/types/prayer";
import { worrySessionConfig } from "./worry";

export interface IntentionItem {
  slug: string;
  title: string;
  subtitle: string;
  status: "available" | "upcoming";
  iconName?: string;
  category: "principal" | "extended";
}

export const ALL_INTENTIONS: IntentionItem[] = [
  // 4 Principales
  {
    slug: "preocupacion",
    title: "Estoy preocupado",
    subtitle: "Cuando algo ocupa demasiado tu mente",
    status: "available",
    iconName: "cloud",
    category: "principal",
  },
  {
    slug: "agradecer",
    title: "Agradecer",
    subtitle: "Reconocer las bendiciones de hoy",
    status: "upcoming",
    iconName: "heart",
    category: "principal",
  },
  {
    slug: "pedir",
    title: "Pedir por alguien",
    subtitle: "Poner en oración a quienes amamos",
    status: "upcoming",
    iconName: "hands",
    category: "principal",
  },
  {
    slug: "paz",
    title: "Necesito paz",
    subtitle: "Buscar serenidad en medio del ruido",
    status: "upcoming",
    iconName: "dove",
    category: "principal",
  },
  // Extendidas
  {
    slug: "miedo",
    title: "Tengo miedo",
    subtitle: "Encontrar fortaleza ante la incertidumbre",
    status: "upcoming",
    category: "extended",
  },
  {
    slug: "tristeza",
    title: "Estoy triste",
    subtitle: "Un refugio para los días difíciles",
    status: "upcoming",
    category: "extended",
  },
  {
    slug: "decision",
    title: "Necesito tomar una decisión",
    subtitle: "Buscar claridad y discernimiento",
    status: "upcoming",
    category: "extended",
  },
  {
    slug: "perdon",
    title: "Quiero pedir perdón",
    subtitle: "Sanar el corazón y reconciliarse",
    status: "upcoming",
    category: "extended",
  },
  {
    slug: "sin-palabras",
    title: "No sé qué decir",
    subtitle: "Estar en presencia de Dios sin prisas",
    status: "upcoming",
    category: "extended",
  },
];

export function getPrayerSession(slug: string): PrayerSessionConfig | null {
  if (slug === "preocupacion") {
    return worrySessionConfig;
  }
  return null;
}

export function getIntentionBySlug(slug: string): IntentionItem | null {
  return ALL_INTENTIONS.find((i) => i.slug === slug) || null;
}
