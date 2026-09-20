"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { StepVoiceConfig, PrayerExperienceMode } from "@/types/prayer";

interface UsePrayerNarrationOptions {
  voiceConfig?: StepVoiceConfig;
  experienceMode: PrayerExperienceMode;
  isPausedByModal?: boolean;
  onNarrationEnded?: () => void;
}

export function usePrayerNarration({
  voiceConfig,
  experienceMode,
  isPausedByModal = false,
  onNarrationEnded,
}: UsePrayerNarrationOptions) {
  const isVoiceMode = experienceMode === "voice";
  const audioUrl = voiceConfig?.audioUrl;
  const voiceText = voiceConfig?.text;

  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);

  // Track track changes during render (React 19 recommended pattern)
  const [lastTrackKey, setLastTrackKey] = useState<string | undefined>(
    audioUrl || voiceText
  );

  const currentTrackKey = audioUrl || voiceText;
  if (lastTrackKey !== currentTrackKey) {
    setLastTrackKey(currentTrackKey);
    setIsPlaying(false);
    setIsPaused(false);
    setHasEnded(false);
  }

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const onEndedRef = useRef(onNarrationEnded);
  useEffect(() => {
    onEndedRef.current = onNarrationEnded;
  });

  // Audio element management
  useEffect(() => {
    if (!isVoiceMode || !audioUrl) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      return;
    }

    const audio = new Audio(audioUrl);
    audioRef.current = audio;

    const handlePlay = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };

    const handlePause = () => {
      setIsPlaying(false);
      setIsPaused(true);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setHasEnded(true);
      onEndedRef.current?.();
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);

    if (!isPausedByModal) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.debug("Audio play postponed or unavailable:", err.message);
        });
      }
    }

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
      audio.pause();
      audioRef.current = null;
    };
  }, [audioUrl, isVoiceMode, isPausedByModal]);

  // Handle modal pause/resume
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPausedByModal) {
      audio.pause();
    } else if (isPlaying && isVoiceMode) {
      audio.play().catch(() => {});
    }
  }, [isPausedByModal, isPlaying, isVoiceMode]);

  // Pause when document is hidden (background tab)
  useEffect(() => {
    const handleVisibilityChange = () => {
      const audio = audioRef.current;
      if (!audio) return;
      if (document.hidden) {
        audio.pause();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const play = useCallback(() => {
    if (audioRef.current && isVoiceMode) {
      audioRef.current.play().catch(() => {});
    } else {
      setIsPlaying(true);
      setIsPaused(false);
    }
  }, [isVoiceMode]);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    } else {
      setIsPlaying(false);
      setIsPaused(true);
    }
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, pause, play]);

  // Effective nominal state:
  // In voice mode, if audioUrl is present, status follows actual audio.
  // If no audioUrl is present (architecture ready for incoming files), narration is considered active unless paused.
  const effectiveIsPlaying =
    isVoiceMode &&
    Boolean(voiceText) &&
    !isPaused &&
    (audioUrl ? isPlaying : true);

  return {
    isPlaying: effectiveIsPlaying,
    isPaused,
    hasEnded,
    play,
    pause,
    toggle,
  };
}
