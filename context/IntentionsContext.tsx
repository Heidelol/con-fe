"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { PrayerIntention, IntentionStatus } from "@/types/intention";
import { useAuth } from "@/context/AuthContext";
import { createClient } from "@/lib/supabase/client";
import {
  getIntentions,
  createIntention as repoCreateIntention,
  updateIntentionStatus as repoUpdateIntentionStatus,
  deleteIntention as repoDeleteIntention,
} from "@/lib/intentions/repository";

interface IntentionsContextType {
  intentions: PrayerIntention[];
  isLoading: boolean;
  error: string | null;
  addIntention: (title: string, note?: string, category?: string) => Promise<string>;
  updateStatus: (id: string, status: IntentionStatus) => Promise<void>;
  getIntention: (id: string) => PrayerIntention | undefined;
  deleteIntentionById: (id: string) => Promise<void>;
  refreshIntentions: () => Promise<void>;
  lastSavedId: string | null;
  clearLastSaved: () => void;
}

const IntentionsContext = createContext<IntentionsContextType | undefined>(
  undefined
);

export function IntentionsProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [intentions, setIntentions] = useState<PrayerIntention[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(() => Boolean(user));
  const [error, setError] = useState<string | null>(null);
  const [lastSavedId, setLastSavedId] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      return;
    }

    const supabase = createClient();
    if (!supabase) {
      return;
    }

    let isMounted = true;

    getIntentions(supabase)
      .then((data) => {
        if (isMounted) {
          setIntentions(data);
          setError(null);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setError(
            "No pudimos cargar tus intenciones. Intenta nuevamente en un momento."
          );
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [user]);

  const refreshIntentions = useCallback(async () => {
    if (!user) {
      setIntentions([]);
      setIsLoading(false);
      return;
    }

    const supabase = createClient();
    if (!supabase) return;

    try {
      setIsLoading(true);
      setError(null);
      const data = await getIntentions(supabase);
      setIntentions(data);
    } catch {
      setError(
        "No pudimos cargar tus intenciones. Intenta nuevamente en un momento."
      );
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const addIntention = async (
    title: string,
    note?: string,
    category?: string
  ): Promise<string> => {
    const supabase = createClient();
    if (!supabase || !user) {
      throw new Error("Debes iniciar sesión para guardar intenciones.");
    }

    setError(null);
    try {
      const created = await repoCreateIntention(supabase, {
        title,
        note,
        category,
      });

      setIntentions((prev) => [created, ...prev]);
      setLastSavedId(created.id);
      return created.id;
    } catch {
      const humanMessage =
        "No pudimos guardar tu intención. Lo que escribiste sigue aquí. Intenta nuevamente.";
      setError(humanMessage);
      throw new Error(humanMessage);
    }
  };

  const updateStatus = async (id: string, status: IntentionStatus) => {
    const supabase = createClient();
    if (!supabase || !user) {
      throw new Error("Debes iniciar sesión para modificar intenciones.");
    }

    setError(null);
    try {
      const updated = await repoUpdateIntentionStatus(supabase, id, status);
      setIntentions((prev) =>
        prev.map((item) => (item.id === id ? updated : item))
      );
    } catch {
      const humanMessage =
        "No pudimos actualizar el estado de tu intención. Intenta nuevamente.";
      setError(humanMessage);
      throw new Error(humanMessage);
    }
  };

  const deleteIntentionById = async (id: string) => {
    const supabase = createClient();
    if (!supabase || !user) {
      throw new Error("Debes iniciar sesión para eliminar intenciones.");
    }

    setError(null);
    try {
      await repoDeleteIntention(supabase, id);
      setIntentions((prev) => prev.filter((item) => item.id !== id));
    } catch {
      const humanMessage =
        "No pudimos eliminar la intención. Intenta nuevamente.";
      setError(humanMessage);
      throw new Error(humanMessage);
    }
  };

  const getIntention = (id: string): PrayerIntention | undefined => {
    return intentions.find((item) => item.id === id);
  };

  const clearLastSaved = () => {
    setLastSavedId(null);
  };

  // Solo exponer intenciones cuando el usuario está autenticado
  const currentIntentions = user ? intentions : [];
  const currentLoading = user ? isLoading : false;

  return (
    <IntentionsContext.Provider
      value={{
        intentions: currentIntentions,
        isLoading: currentLoading,
        error,
        addIntention,
        updateStatus,
        getIntention,
        deleteIntentionById,
        refreshIntentions,
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
    throw new Error("useIntentions debe usarse dentro de un IntentionsProvider");
  }
  return context;
}
