import { DailyPrayer } from "@/types/daily-prayer";

export const todayDailyPrayer: DailyPrayer = {
  id: "daily-2026-09-19",
  date: "2026-09-19",
  title: "Confiar cuando no tengo todas las respuestas",
  subtitle: "Unos minutos para soltar aquello que hoy no está en tus manos.",
  durationSeconds: 240, // 4 minutos conceptuales
  durationLabel: "4 min",
  scriptureReference: "Salmo 23",
  scriptureText: "El Señor es mi pastor, nada me falta; en verdes pastos me hace descansar.",
  reflection:
    "La incertidumbre no desaparece buscando controlar todo, sino confiando en Aquel que camina a nuestro lado.",
  audioUrl: "/audio/daily-prayer-demo.wav",
  category: "Confianza",
  purpose: "Soltar aquello que hoy no está en tus manos y descansar en la presencia de Dios.",
  isSpecialDate: false,
  readingContent: {
    arrival: {
      title: "Llegar",
      text: "Detén un momento el ritmo de tu día. Cierra los ojos si te ayuda y respira con calma. No necesitas resolverlo todo en este instante.",
    },
    purpose: {
      title: "Propósito de hoy",
      text: "Muchas veces queremos respuestas inmediatas para sentirnos seguros. Pero la fe no exige conocer cada detalle del camino, sino saber quién guía nuestros pasos.",
    },
    personalPrayer: {
      title: "Háblale a Dios",
      prompt: "Háblale con total libertad y sinceridad.",
      guidance: "Dile aquello que hoy no puedes controlar. No necesitas palabras elocuentes; Dios conoce tu corazón antes de que hables.",
    },
    optionalPrayer: {
      title: "Oración opcional",
      lines: [
        "Señor, pongo esta incertidumbre en tus manos.",
        "Dame claridad para actuar donde me corresponde y serenidad para soltar aquello que escapa de mi control.",
        "Guíame por senderos de paz y recuerda a mi alma que nunca camino solo.",
        "Amén.",
      ],
    },
    scripture: {
      title: "Escritura",
      passage: "“El Señor es mi pastor, nada me falta; en verdes pastos me hace descansar.”",
      reference: "Salmo 23:1-2",
      reflection: "Descansar no significa que no haya desafíos, sino que en medio de ellos hay un refugio seguro.",
    },
    closing: {
      title: "Cierre",
      text: "Por hoy es suficiente. Lleva contigo esta palabra y recuerda que puedes volver a este espacio de paz siempre que lo necesites.",
    },
  },
};
