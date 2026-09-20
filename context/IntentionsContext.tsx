"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { PrayerIntention, IntentionStatus } from "@/types/intention";
import { initialMockIntentions } from "@/data/intentions/mock-intentions";

interface IntentionsContextType {
  intentions: PrayerIntention[];
  addIntention: (title: string, note?: string) => string;
  updateStatus: (id: string, status: IntentionStatus) => void;
  getIntention: (id: string) => PrayerIntention | undefined;
  lastSavedId: string | null;
  clearLastSaved: () => void;
}

const IntentionsContext = createContext<IntentionsContextType | undefined>(
  undefined
);

export function IntentionsProvider({ children }: { children: ReactNode }) {
  const [intentions, setIntentions] =
    useState<PrayerIntention[]>(initialMockIntentions);
  const [lastSavedId, setLastSavedId] = useState<string | null>(null);

  const addIntention = (title: string, note?: string): string => {
    const newId = `intencion-${Date.now()}`;
    const newIntention: PrayerIntention = {
      id: newId,
      title: title.trim(),
      note: note?.trim() || undefined,
      status: "praying",
      createdAt: "Hoy",
    };
    setIntentions((prev) => [newIntention, ...prev]);
    setLastSavedId(newId);
    return newId;
  };

  const updateStatus = (id: string, status: IntentionStatus) => {
    setIntentions((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status,
              updatedAt: "Hoy",
              resolvedAt:
                status === "answered" || status === "gratitude"
                  ? "Hoy"
                  : item.resolvedAt,
            }
          : item
      )
    );
  };

  const getIntention = (id: string): PrayerIntention | undefined => {
    return intentions.find((item) => item.id === id);
  };

  const clearLastSaved = () => {
    setLastSavedId(null);
  };

  return (
    <IntentionsContext.Provider
      value={{
        intentions,
        addIntention,
        updateStatus,
        getIntention,
        lastSavedId,
        clearLastSaved,
      }}
    >
      {children}
    </IntentionsContext.Provider>
  );
}

export function useIntentions() {
  const context = useContext(IntentionsContext);
  if (!context) {
    throw new Error("useIntentions must be used within an IntentionsProvider");
  }
  return context;
}
