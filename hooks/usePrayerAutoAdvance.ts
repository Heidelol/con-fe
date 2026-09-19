"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface UsePrayerAutoAdvanceOptions {
  enabled: boolean;
  durationSeconds: number;
  onAdvance: () => void;
  isPaused?: boolean;
}

export interface PrayerAutoAdvanceReturn {
  progress: number; // 0 to 1 (filling up)
  remainingSeconds: number;
  elapsedSeconds: number;
  totalDurationSeconds: number;
  skip: () => void;
  extendTime: (extraSeconds: number) => void;
}

export function usePrayerAutoAdvance({
  enabled,
  durationSeconds,
  onAdvance,
  isPaused = false,
}: UsePrayerAutoAdvanceOptions): PrayerAutoAdvanceReturn {
  const [prevDuration, setPrevDuration] = useState(durationSeconds);
  const [progress, setProgress] = useState(0);
  const [remainingSeconds, setRemainingSeconds] = useState(durationSeconds);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [totalDurationSeconds, setTotalDurationSeconds] = useState(durationSeconds);

  // Official React pattern for adjusting state when prop changes
  if (prevDuration !== durationSeconds) {
    setPrevDuration(durationSeconds);
    setProgress(0);
    setRemainingSeconds(durationSeconds);
    setElapsedSeconds(0);
    setTotalDurationSeconds(durationSeconds);
  }

  const totalDurationMsRef = useRef(durationSeconds * 1000);
  const accumulatedElapsedMsRef = useRef(0);
  const segmentStartRef = useRef<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const onAdvanceRef = useRef(onAdvance);

  useEffect(() => {
    onAdvanceRef.current = onAdvance;
  }, [onAdvance]);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const triggerAdvance = useCallback(() => {
    clearTimer();
    onAdvanceRef.current();
  }, [clearTimer]);

  const extendTime = useCallback((extraSeconds: number) => {
    const extraMs = extraSeconds * 1000;
    totalDurationMsRef.current += extraMs;
    const newTotalSeconds = Math.ceil(totalDurationMsRef.current / 1000);
    setTotalDurationSeconds(newTotalSeconds);

    const now = Date.now();
    let currentElapsed = accumulatedElapsedMsRef.current;
    if (segmentStartRef.current !== null) {
      currentElapsed += now - segmentStartRef.current;
    }
    const remainingMs = Math.max(0, totalDurationMsRef.current - currentElapsed);
    const newRemainingSeconds = Math.ceil(remainingMs / 1000);
    const newProgress = Math.min(1, currentElapsed / totalDurationMsRef.current);

    setRemainingSeconds(newRemainingSeconds);
    setProgress(newProgress);
  }, []);

  useEffect(() => {
    totalDurationMsRef.current = durationSeconds * 1000;
    accumulatedElapsedMsRef.current = 0;
    segmentStartRef.current = null;

    if (!enabled || isPaused) {
      clearTimer();
      return;
    }

    segmentStartRef.current = Date.now();

    const tick = () => {
      if (segmentStartRef.current === null) return;
      const now = Date.now();
      const currentSegmentElapsed = now - segmentStartRef.current;
      const totalElapsed = Math.min(
        totalDurationMsRef.current,
        accumulatedElapsedMsRef.current + currentSegmentElapsed
      );
      const remainingMs = Math.max(0, totalDurationMsRef.current - totalElapsed);

      const nextProgress =
        totalDurationMsRef.current > 0
          ? Math.min(1, totalElapsed / totalDurationMsRef.current)
          : 1;
      const nextRemaining = Math.max(0, Math.ceil(remainingMs / 1000));
      const nextElapsed = Math.floor(totalElapsed / 1000);

      setProgress(nextProgress);
      setRemainingSeconds(nextRemaining);
      setElapsedSeconds(nextElapsed);

      if (totalElapsed >= totalDurationMsRef.current) {
        clearTimer();
        triggerAdvance();
      }
    };

    intervalRef.current = setInterval(tick, 50);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearTimer();
        if (segmentStartRef.current !== null) {
          accumulatedElapsedMsRef.current += Date.now() - segmentStartRef.current;
          segmentStartRef.current = null;
        }
      } else {
        if (accumulatedElapsedMsRef.current < totalDurationMsRef.current) {
          segmentStartRef.current = Date.now();
          intervalRef.current = setInterval(tick, 50);
        } else {
          triggerAdvance();
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearTimer();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [enabled, isPaused, durationSeconds, clearTimer, triggerAdvance]);

  return {
    progress,
    remainingSeconds,
    elapsedSeconds,
    totalDurationSeconds,
    skip: triggerAdvance,
    extendTime,
  };
}
