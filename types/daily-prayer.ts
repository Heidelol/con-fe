export type PlayerStatus =
  | "idle"
  | "loading"
  | "ready"
  | "playing"
  | "paused"
  | "ended"
  | "error";

export type ExperienceMode = "intro" | "audio" | "reading" | "completed";

export interface ReadingContent {
  arrival: {
    title: string;
    text: string;
  };
  purpose: {
    title: string;
    text: string;
  };
  personalPrayer: {
    title: string;
    prompt: string;
    guidance: string;
  };
  optionalPrayer: {
    title: string;
    lines: string[];
  };
  scripture: {
    title: string;
    passage: string;
    reference: string;
    reflection: string;
  };
  closing: {
    title: string;
    text: string;
  };
}

export interface DailyPrayer {
  id: string;
  date: string;
  title: string;
  subtitle?: string;
  durationSeconds: number;
  durationLabel: string;
  scriptureReference: string;
  scriptureText: string;
  reflection: string;
  audioUrl: string;
  category: string;
  purpose: string;
  isSpecialDate?: boolean;
  readingContent: ReadingContent;
}
