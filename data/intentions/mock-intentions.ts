import { PrayerIntention } from "@/types/intention";

export const initialMockIntentions: PrayerIntention[] = [
  {
    id: "mama",
    title: "Mamá",
    note: "Por su salud y tranquilidad.",
    category: "Familia",
    status: "praying",
    createdAt: "Desde hace unos días",
  },
  {
    id: "trabajo",
    title: "Trabajo",
    note: "Pedir claridad para las próximas decisiones.",
    category: "Vida cotidiana",
    status: "praying",
    createdAt: "Esta semana",
  },
  {
    id: "buena-noticia",
    title: "Una buena noticia",
    note: "Algo que durante un tiempo estuvo en oración.",
    category: "Agradecimiento",
    status: "gratitude",
    createdAt: "Hace un mes",
  },
];
