"use client";

import { useEffect, useRef, useCallback } from "react";

interface UsePrayerAutoAdvanceOptions {
  enabled: boolean;
  durationSeconds: number;
  onAdvance: () => void;
  isPaused?: boolean;
}

export function usePrayerAutoAdvance({
  enabled,
  durationSeconds,
  onAdvance,
  isPaused = false,
}: UsePrayerAutoAdvanceOptions) {
  const remainingMsRef = useRef(durationSeconds * 1000);
  const startTimestampRef = useRef<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const onAdvanceRef = useRef(onAdvance);

  // Keep latest onAdvance callback without breaking effect dependencies
  useEffect(() => {
    onAdvanceRef.current = onAdvance;
  }, [onAdvance]);

  // Keep remainingMs in sync with durationSeconds when step changes
  useEffect(() => {
    remainingMsRef.current = durationSeconds * 1000;
  }, [durationSeconds]);

  const clearExistingTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const triggerAdvance = useCallback(() => {
    clearExistingTimer();
    onAdvanceRef.current();
  }, [clearExistingTimer]);

  const extendTime = useCallback((extraSeconds: number) => {
    const extraMs = extraSeconds * 1000;
    if (startTimestampRef.current !== null) {
      const elapsed = Date.now() - startTimestampRef.current;
      remainingMsRef.current = Math.max(0, remainingMsRef.current - elapsed) + extraMs;
    } else {
      remainingMsRef.current += extraMs;
    }

    // Restart timer with extended remaining time if active
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      startTimestampRef.current = Date.now();
      timerRef.current = setTimeout(() => {
        triggerAdvance();
      }, remainingMsRef.current);
    }
  }, [triggerAdvance]);

  useEffect(() => {
    if (!enabled || isPaused) {
      clearExistingTimer();
      if (startTimestampRef.current !== null) {
        const elapsed = Date.now() - startTimestampRef.current;
        remainingMsRef.current = Math.max(0, remainingMsRef.current - elapsed);
        startTimestampRef.current = null;
      }
      return;
    }

    // Start timer with remaining duration
    startTimestampRef.current = Date.now();
    timerRef.current = setTimeout(() => {
      triggerAdvance();
    }, remainingMsRef.current);

    // Visibility change listener: pause when tab is in background, resume when active
    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearExistingTimer();
        if (startTimestampRef.current !== null) {
          const elapsed = Date.now() - startTimestampRef.current;
          remainingMsRef.current = Math.max(0, remainingMsRef.current - elapsed);
          startTimestampRef.current = null;
        }
      } else {
        if (remainingMsRef.current > 0) {
          startTimestampRef.current = Date.now();
          timerRef.current = setTimeout(() => {
            triggerAdvance();
          }, remainingMsRef.current);
        } else {
          triggerAdvance();
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearExistingTimer();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [enabled, isPaused, durationSeconds, clearExistingTimer, triggerAdvance]);

  return {
    skip: triggerAdvance,
    extendTime,
  };
}
