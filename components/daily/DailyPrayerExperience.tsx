"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DailyPrayer, ExperienceMode, PlayerStatus } from "@/types/daily-prayer";
import { DailyPrayerIntro } from "./DailyPrayerIntro";
import { AudioPlayer } from "./AudioPlayer";
import { ReadingMode } from "./ReadingMode";
import { DailyPrayerCompletion } from "./DailyPrayerCompletion";
import { PrayerExitDialog } from "@/components/prayer/PrayerExitDialog";
import { FutureFeatureDialog } from "@/components/prayer/FutureFeatureDialog";
import { useAuth } from "@/context/AuthContext";

interface DailyPrayerExperienceProps {
  prayer: DailyPrayer;
}

export function DailyPrayerExperience({ prayer }: DailyPrayerExperienceProps) {
  const router = useRouter();
  const { user } = useAuth();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [mode, setMode] = useState<ExperienceMode>("intro");
  const [status, setStatus] = useState<PlayerStatus>("idle");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(prayer.durationSeconds);

  const [isExitDialogOpen, setIsExitDialogOpen] = useState<boolean>(false);
  const [isFutureDialogOpen, setIsFutureDialogOpen] = useState<boolean>(false);
  const [isFinishing, setIsFinishing] = useState<boolean>(false);

  // Audio event bindings
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      if (isFinite(audio.duration) && audio.duration > 0) {
        setDuration(audio.duration);
      }
      setStatus("ready");
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setStatus("ended");
      setMode("completed");
    };

    const handleError = () => {
      setIsPlaying(false);
      setStatus("error");
    };

    const handlePlay = () => {
      setIsPlaying(true);
      setStatus("playing");
    };

    const handlePause = () => {
      setIsPlaying(false);
      setStatus((prev) => (prev === "ended" || prev === "error" ? prev : "paused"));
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, []);

  // Controls
  const handleTogglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => {
        setStatus("error");
      });
    }
  };

  const handleSeek = (seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    const clamped = Math.max(0, Math.min(duration, seconds));
    audio.currentTime = clamped;
    setCurrentTime(clamped);
  };

  const handleRewind15 = () => {
    handleSeek(currentTime - 15);
  };

  const handleForward15 = () => {
    handleSeek(currentTime + 15);
  };

  // Mode Handlers
  const handleStartAudio = () => {
    setMode("audio");
    const audio = audioRef.current;
    if (audio) {
      audio.play().catch(() => {
        // Browser might require explicit user interaction or fallback
      });
    }
  };

  const handleStartReading = () => {
    setMode("reading");
  };

  const handleSwitchToReading = () => {
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
    }
    setMode("reading");
  };

  const handleSwitchToAudio = () => {
    setMode("audio");
  };

  const handleComplete = () => {
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
    }
    setMode("completed");
  };

  const handleListenAgain = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      setMode("audio");
      audioRef.current.play().catch(() => {
        // Handled silently
      });
    }
  };

  const handleFinish = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsFinishing(true);
    setTimeout(() => {
      router.push("/");
    }, 1800);
  };

  // Exit Dialog
  const handleExitRequest = () => {
    if (mode === "intro") {
      router.push("/");
      return;
    }
    // If inside prayer session or audio has progress/playing
    setIsExitDialogOpen(true);
  };

  const handleConfirmExit = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsExitDialogOpen(false);
    router.push("/");
  };

  if (isFinishing) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 animate-in fade-in duration-500 text-center bg-[#F7F4EE] select-none">
        <div className="w-12 h-12 rounded-full bg-[#D3B58A]/20 flex items-center justify-center mb-6">
          <span className="w-2.5 h-2.5 rounded-full bg-[#D3B58A]" />
        </div>
        <h2 className="font-serif text-[32px] text-[#17212A] font-normal tracking-tight mb-2">
          Que tengas paz.
        </h2>
        <p className="font-sans text-[14px] text-[#6F8796]">
          Acompañándote siempre en oración
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Hidden native HTML5 audio element */}
      <audio
        ref={audioRef}
        src={prayer.audioUrl}
        preload="metadata"
        playsInline
      />

      {/* Screen Mode Render */}
      {mode === "intro" && (
        <DailyPrayerIntro
          prayer={prayer}
          onStartAudio={handleStartAudio}
          onStartReading={handleStartReading}
          onBack={handleExitRequest}
        />
      )}

      {mode === "audio" && (
        <AudioPlayer
          prayer={prayer}
          status={status}
          currentTime={currentTime}
          duration={duration}
          isPlaying={isPlaying}
          onTogglePlay={handleTogglePlay}
          onSeek={handleSeek}
          onRewind15={handleRewind15}
          onForward15={handleForward15}
          onSwitchToReading={handleSwitchToReading}
          onExit={handleExitRequest}
        />
      )}

      {mode === "reading" && (
        <ReadingMode
          prayer={prayer}
          onSwitchToAudio={handleSwitchToAudio}
          onComplete={handleComplete}
          onExit={handleExitRequest}
        />
      )}

      {mode === "completed" && (
        <DailyPrayerCompletion
          prayer={prayer}
          onSaveIntention={() => {
            if (audioRef.current) {
              audioRef.current.pause();
            }
            const target = user
              ? "/camino/intenciones/nueva"
              : "/entrar?next=/camino/intenciones/nueva";
            router.push(target);
          }}
          onListenAgain={handleListenAgain}
          onFinish={handleFinish}
        />
      )}

      {/* Exit confirmation dialog */}
      <PrayerExitDialog
        isOpen={isExitDialogOpen}
        onStay={() => setIsExitDialogOpen(false)}
        onExit={handleConfirmExit}
      />

      {/* Save intention notice */}
      <FutureFeatureDialog
        isOpen={isFutureDialogOpen}
        onClose={() => setIsFutureDialogOpen(false)}
        title="Guardar intención"
        message="Muy pronto podrás guardar tus oraciones e intenciones diarias en tu espacio personal."
      />
    </>
  );
}
