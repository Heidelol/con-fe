import { PrayerSessionConfig } from "@/types/prayer";

export const worrySessionConfig: PrayerSessionConfig = {
  slug: "preocupacion",
  title: "Estoy preocupado",
  internalTitle: "Cuando algo ocupa demasiado tu mente",
  estimatedDuration: "3 minutos",
  steps: [
    // MOMENTO 1 — LLEGAR
    {
      id: "moment-1-llegar",
      type: "arrival",
      momentIndex: 1,
      title: "Estás aquí.",
      subtitle: "No necesitas resolver todo ahora.",
      voice: {
        text: "Estás aquí. Por estos minutos no necesitas resolver nada. Solo date permiso de reconocer lo que llevas dentro.",
      },
      advanceStrategy: "timer",
      autoAdvance: {
        enabled: true,
        durationSeconds: 6,
        allowSkip: true,
        skipText: "Continuar ahora",
      },
    },

    // MOMENTO 2 — RECONOCER
    {
      id: "moment-2-reconocer",
      type: "voice-response",
      momentIndex: 2,
      title: "¿Qué te preocupa?",
      fieldKey: "mindOccupation",
      voice: {
        text: "A veces ponerle nombre a lo que sentimos ayuda a dejar de cargarlo todo al mismo tiempo. ¿Qué es lo que más te preocupa hoy?",
      },
      advanceStrategy: "user",
      speakLabel: "Decirlo",
      thinkLabel: "Prefiero pensarlo",
      writeLabel: "Prefiero escribir",
      mockPrompt: "Cuéntalo con tus propias palabras.",
      mockNotice: "La transcripción por voz estará disponible muy pronto.",
      mockUseTextAction: "Usar texto por ahora",
      mockThinkAction: "Prefiero pensarlo",
    },

    // MOMENTO 3 — ORDENAR
    {
      id: "moment-3-ordenar",
      type: "continuous-reflection",
      momentIndex: 3,
      advanceStrategy: "timer",
      phaseA: {
        title: "Lo que sí puedo hacer",
        text: "Tal vez no puedas resolver toda la situación, pero piensa en una pequeña cosa que sí dependa de ti.",
        durationSeconds: 8,
        voice: {
          text: "No todo depende de ti. Pero quizá exista una pequeña cosa que sí esté en tus manos hoy.",
        },
      },
      phaseB: {
        title: "Lo que necesito soltar",
        text: "Reconoce aquello que no puedes controlar. No necesitas cargarlo todo tú solo.",
        durationSeconds: 12,
        voice: {
          text: "Y ahora reconoce aquello que no puedes controlar. No necesitas cargar también con eso.",
        },
      },
      skipText: "Continuar ahora",
    },

    // MOMENTO 4 — HABLAR CON DIOS
    {
      id: "moment-4-hablar-con-dios",
      type: "sacred-silence",
      momentIndex: 4,
      title: "Ahora es tu momento.",
      subtitle: "Háblale a Dios con tus propias palabras.",
      privacyBadge: "Este momento no se graba.",
      voice: {
        text: "Ahora este momento es tuyo. Háblale a Dios con tus propias palabras.",
      },
      advanceStrategy: "timer",
      silenceDurationSeconds: 28,
      extraTimeSeconds: 25,
      moreTimeText: "Necesito más tiempo",
      continueText: "Continuar",
    },

    // MOMENTO 5 — CIERRE ESPIRITUAL
    {
      id: "moment-5-cierre-espiritual",
      type: "spiritual-closing",
      momentIndex: 5,
      voice: {
        text: "No necesitas salir de aquí con todas las respuestas. A veces basta con haber puesto delante de Dios aquello que estabas cargando.",
      },
      advanceStrategy: "user",
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
        voice: {
          text: "No necesitas salir de aquí con todas las respuestas. A veces basta con haber puesto delante de Dios aquello que estabas cargando.",
        },
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
