export type IntentionStatus = "praying" | "answered" | "gratitude" | "archived";

export interface PrayerIntention {
  id: string;
  title: string;
  note?: string;
  category?: string;
  status: IntentionStatus;
  createdAt: string; // Fecha relativa o descriptiva, ej. "Desde hace unos días"
  updatedAt?: string;
  resolvedAt?: string;
}

export interface IntentionStatusOption {
  status: IntentionStatus;
  label: string;
  description: string;
}
