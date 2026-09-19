import { PrayerSessionConfig } from "@/types/prayer";

export const worrySessionConfig: PrayerSessionConfig = {
  slug: "preocupacion",
  title: "Estoy preocupado",
  internalTitle: "Cuando algo ocupa demasiado tu mente",
  estimatedDuration: "3 minutos",
  steps: [
    // PASO 1 — LLEGAR
    {
      id: "step-1-llegar",
      type: "reflection",
      title: "Estás aquí.",
      subtitle: "No necesitas resolver todo en este momento.",
      ctaText: "Continuar",
    },
    // PASO 2 — RECONOCER
    {
      id: "step-2-reconocer",
      type: "text-prompt",
      title: "¿Qué es lo que más está ocupando tu mente?",
      placeholder: "Puedes escribir unas palabras…",
      secondaryActionText: "Prefiero pensarlo",
      ctaText: "Continuar",
      fieldKey: "mindOccupation",
    },
    // PASO 3 — PROFUNDIZAR
    {
      id: "step-3-profundizar",
      type: "text-prompt-expandable",
      title: "¿Qué es lo que más te preocupa que pueda pasar?",
      writeActionText: "Quiero escribirlo",
      skipActionText: "Lo tengo en mente",
      placeholder: "Escribe lo que sientes o temes…",
      ctaText: "Continuar",
      fieldKey: "worstCaseWorry",
    },
    // PASO 4 — LO QUE SÍ PUEDO HACER
    {
      id: "step-4-puedo-hacer",
      type: "single-choice",
      title: "Piensa en aquello que sí está en tus manos hoy.",
      description:
        "A veces no podemos controlar todo. Pero puede haber algo pequeño que sí podamos hacer.",
      options: [
        { id: "hablar", label: "Hablar con alguien" },
        { id: "prepararme", label: "Prepararme" },
        { id: "pedir-ayuda", label: "Pedir ayuda" },
        { id: "esperar", label: "Esperar" },
        { id: "no-se", label: "No lo sé todavía" },
      ],
      skipActionText: "Solo quiero continuar",
      ctaText: "Continuar",
      fieldKey: "actionableStep",
    },
    // PASO 5 — ENTREGAR
    {
      id: "step-5-entregar",
      type: "silence",
      title: "Ahora piensa en aquello que no puedes controlar.",
      description: "Puedes ponerlo en manos de Dios.",
      ctaText: "Tomarme unos segundos",
      silenceDurationSeconds: 10,
      readyText: "Estoy listo",
      skipSilenceText: "Continuar cuando quieras",
    },
    // PASO 6 — ORACIÓN PERSONAL
    {
      id: "step-6-oracion-personal",
      type: "personal-prayer",
      title: "Ahora háblale a Dios con tus propias palabras.",
      subtitle: "No necesitas hacerlo perfecto.",
      silenceOptionText: "Hablar en silencio",
      writeOptionText: "Escribir",
      starterOptionText: "Ayúdame a empezar",
      starterPrompt: "Puedes comenzar diciendo:",
      starterLeadIn: "Dios, tú sabes lo que estoy viviendo…",
      ctaText: "Continuar",
      fieldKey: "personalPrayerText",
    },
    // PASO 7 — ORACIÓN OPCIONAL
    {
      id: "step-7-oracion-opcional",
      type: "optional-prayer",
      title: "Si te ayuda, puedes terminar con esta oración.",
      prayerLines: [
        "Dios, pongo esta preocupación en tus manos.",
        "Dame claridad para hacer lo que me corresponde y paz para confiar en aquello que no puedo controlar.",
        "Acompáñame en este momento.",
        "Amén.",
      ],
      ctaText: "Continuar",
    },
    // PASO 8 — ESCRITURA
    {
      id: "step-8-escritura",
      type: "scripture",
      title: "Una palabra para llevar contigo",
      passage: "“Depositen en él toda ansiedad, porque él cuida de ustedes.”",
      reference: "1 Pedro 5:7",
      reflection:
        "No significa que tus problemas desaparezcan. Es una invitación a no cargarlos solo.",
      ctaText: "Continuar",
    },
    // PASO 9 — CIERRE
    {
      id: "step-9-cierre",
      type: "completion",
      title: "Por hoy es suficiente.",
      subtitle:
        "Puedes volver cuando necesites poner algo en manos de Dios.",
      saveIntentionText: "Guardar como intención",
      saveReflectionText: "Guardar reflexión",
      finishText: "Terminar",
      farewellMessage: "Que tengas paz.",
    },
  ],
};
