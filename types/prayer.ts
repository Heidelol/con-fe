export type PrayerStepType =
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
}

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
