export type PrayerStepType =
  | "arrival"
  | "voice-response"
  | "continuous-reflection"
  | "sacred-silence"
  | "spiritual-closing"
  | "reflection"
  | "text-prompt"
  | "text-prompt-expandable"
  | "single-choice"
  | "silence"
  | "personal-prayer"
  | "optional-prayer"
  | "scripture"
  | "completion";

export interface BaseStep {
  id: string;
  type: PrayerStepType;
  momentIndex?: number; // 1-indexed (1 to 5)
}

export interface AutoAdvanceConfig {
  enabled: boolean;
  durationSeconds: number;
  allowSkip?: boolean;
  skipText?: string;
}

// MOMENTO 1 — LLEGAR
export interface ArrivalStepData extends BaseStep {
  type: "arrival";
  title: string;
  subtitle: string;
  autoAdvance: AutoAdvanceConfig;
}

// MOMENTO 2 — RECONOCER
export interface VoiceResponseStepData extends BaseStep {
  type: "voice-response";
  title: string;
  fieldKey: string;
  speakLabel: string;
  thinkLabel: string;
  writeLabel: string;
  mockPrompt: string;
  mockNotice: string;
  mockUseTextAction: string;
  mockThinkAction: string;
}

// MOMENTO 3 — ORDENAR
export interface ContinuousReflectionStepData extends BaseStep {
  type: "continuous-reflection";
  phaseA: {
    title: string;
    text: string;
    durationSeconds: number;
  };
  phaseB: {
    title: string;
    text: string;
    durationSeconds: number;
  };
  skipText: string;
}

// MOMENTO 4 — HABLAR CON DIOS
export interface SacredSilenceStepData extends BaseStep {
  type: "sacred-silence";
  title: string;
  subtitle: string;
  privacyBadge: string;
  silenceDurationSeconds: number;
  extraTimeSeconds: number;
  moreTimeText: string;
  continueText: string;
}

// MOMENTO 5 — CIERRE ESPIRITUAL
export interface SpiritualClosingStepData extends BaseStep {
  type: "spiritual-closing";
  optionalPrayer: {
    title: string;
    prayerLines: string[];
    durationSeconds: number;
    skipText: string;
  };
  scripture: {
    title: string;
    passage: string;
    reference: string;
    reflection: string;
  };
  saveIntentionText: string;
  finishText: string;
  farewellMessage: string;
}

// Legacy step interfaces for backward compatibility
export interface ReflectionStepData extends BaseStep {
  type: "reflection";
  title: string;
  subtitle?: string;
  ctaText: string;
}

export interface TextPromptStepData extends BaseStep {
  type: "text-prompt";
  title: string;
  description?: string;
  placeholder?: string;
  secondaryActionText: string;
  ctaText?: string;
  fieldKey: string;
}

export interface TextPromptExpandableStepData extends BaseStep {
  type: "text-prompt-expandable";
  title: string;
  description?: string;
  writeActionText: string;
  skipActionText: string;
  placeholder?: string;
  ctaText?: string;
  fieldKey: string;
}

export interface ChoiceOption {
  id: string;
  label: string;
}

export interface SingleChoiceStepData extends BaseStep {
  type: "single-choice";
  title: string;
  description?: string;
  options: ChoiceOption[];
  skipActionText?: string;
  ctaText?: string;
  fieldKey: string;
}

export interface SilenceStepData extends BaseStep {
  type: "silence";
  title: string;
  description?: string;
  ctaText: string;
  silenceDurationSeconds: number;
  readyText: string;
  skipSilenceText: string;
}

export interface PersonalPrayerStepData extends BaseStep {
  type: "personal-prayer";
  title: string;
  subtitle?: string;
  starterPrompt: string;
  starterLeadIn: string;
  fieldKey: string;
  silenceOptionText: string;
  writeOptionText: string;
  starterOptionText: string;
  ctaText?: string;
}

export interface OptionalPrayerStepData extends BaseStep {
  type: "optional-prayer";
  title: string;
  prayerLines: string[];
  ctaText: string;
}

export interface ScriptureStepData extends BaseStep {
  type: "scripture";
  title: string;
  passage: string;
  reference: string;
  reflection: string;
  ctaText: string;
}

export interface CompletionStepData extends BaseStep {
  type: "completion";
  title: string;
  subtitle: string;
  saveIntentionText: string;
  saveReflectionText: string;
  finishText: string;
  farewellMessage?: string;
}

export type PrayerStep =
  | ArrivalStepData
  | VoiceResponseStepData
  | ContinuousReflectionStepData
  | SacredSilenceStepData
  | SpiritualClosingStepData
  | ReflectionStepData
  | TextPromptStepData
  | TextPromptExpandableStepData
  | SingleChoiceStepData
  | SilenceStepData
  | PersonalPrayerStepData
  | OptionalPrayerStepData
  | ScriptureStepData
  | CompletionStepData;

export interface PrayerSessionConfig {
  slug: string;
  title: string;
  internalTitle: string;
  estimatedDuration: string;
  steps: PrayerStep[];
}

export interface PrayerSessionState {
  answers: Record<string, string>;
}
