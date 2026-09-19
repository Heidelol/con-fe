import { PrayerSessionConfig } from "@/types/prayer";

export const worrySessionConfig: PrayerSessionConfig = {
  slug: "preocupacion",
  title: "Estoy preocupado",
  internalTitle: "Cuando algo ocupa demasiado tu mente",
  estimatedDuration: "3 minutos",
  steps: [
    // MOMENTO 1 — LLEGAR (Autoavanza 6s)
    {
      id: "moment-1-llegar",
      type: "arrival",
      momentIndex: 1,
      title: "Estás aquí.",
      subtitle: "No necesitas resolver todo en este momento.",
      autoAdvance: {
        enabled: true,
        durationSeconds: 6,
        allowSkip: true,
        skipText: "Continuar ahora",
      },
    },

    // MOMENTO 2 — RECONOCER (Espera al usuario: Decirlo / Pensarlo / Escribir)
    {
      id: "moment-2-reconocer",
      type: "voice-response",
      momentIndex: 2,
      title: "¿Qué es lo que más te preocupa?",
      fieldKey: "mindOccupation",
      speakLabel: "Decirlo",
      thinkLabel: "Prefiero pensarlo",
      writeLabel: "Prefiero escribir",
      mockPrompt: "Cuéntalo con tus propias palabras.",
      mockNotice: "La transcripción por voz estará disponible muy pronto.",
      mockUseTextAction: "Usar texto por ahora",
      mockThinkAction: "Prefiero pensarlo",
    },

    // MOMENTO 3 — ORDENAR (Continuo: Fase A 8s -> Fase B 12s -> Autoavanza)
    {
      id: "moment-3-ordenar",
      type: "continuous-reflection",
      momentIndex: 3,
      phaseA: {
        title: "Piensa en aquello que sí está en tus manos hoy.",
        text: "Tal vez hay algo pequeño que puedes hacer.",
        durationSeconds: 8,
      },
      phaseB: {
        title: "Ahora reconoce aquello que no puedes controlar.",
        text: "No necesitas cargarlo todo tú solo.",
        durationSeconds: 12,
      },
      skipText: "Continuar ahora",
    },

    // MOMENTO 4 — HABLAR CON DIOS (Silencio sagrado 28s + privacidad garantizada)
    {
      id: "moment-4-hablar-con-dios",
      type: "sacred-silence",
      momentIndex: 4,
      title: "Ponlo ahora en manos de Dios.",
      subtitle: "Háblale con tus propias palabras.",
      privacyBadge: "Este momento no se graba.",
      silenceDurationSeconds: 28,
      extraTimeSeconds: 25,
      moreTimeText: "Necesito más tiempo",
      continueText: "Continuar",
    },

    // MOMENTO 5 — CIERRE ESPIRITUAL (Oración opcional 14s -> Escritura -> Terminar)
    {
      id: "moment-5-cierre-espiritual",
      type: "spiritual-closing",
      momentIndex: 5,
      optionalPrayer: {
        title: "Si te ayuda, puedes terminar con esta oración.",
        prayerLines: [
          "Dios, pongo esta preocupación en tus manos.",
          "Dame claridad para hacer lo que me corresponde y paz para confiar en aquello que no puedo controlar.",
          "Acompáñame en este momento.",
          "Amén.",
        ],
        durationSeconds: 14,
        skipText: "Continuar ahora",
      },
      scripture: {
        title: "Una palabra para llevar contigo",
        passage: "“Depositen en él toda ansiedad, porque él cuida de ustedes.”",
        reference: "1 Pedro 5:7",
        reflection: "No significa que tus problemas desaparezcan. Es una invitación a no cargarlos solo.",
      },
      saveIntentionText: "Guardar como intención",
      finishText: "Terminar",
      farewellMessage: "Que tengas paz.",
    },
  ],
};
