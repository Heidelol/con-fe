"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  PrayerSessionConfig,
  PrayerExperienceMode,
  StepVoiceConfig,
} from "@/types/prayer";
import { PrayerHeader } from "./PrayerHeader";
import { PrayerExitDialog } from "./PrayerExitDialog";
import { FutureFeatureDialog } from "./FutureFeatureDialog";
import { PrayerExperienceIntro } from "./PrayerExperienceIntro";
import { usePrayerNarration } from "@/hooks/usePrayerNarration";

// 5 Spiritual Moments Renderers
import { ArrivalStep } from "./steps/ArrivalStep";
import { VoiceResponseStep } from "./steps/VoiceResponseStep";
import { ContinuousReflectionStep } from "./steps/ContinuousReflectionStep";
import { SacredSilenceStep } from "./steps/SacredSilenceStep";
import { SpiritualClosingStep } from "./steps/SpiritualClosingStep";

// Legacy Step Renderers (for backward compatibility)
import { ReflectionStep } from "./steps/ReflectionStep";
import { TextPromptStep } from "./steps/TextPromptStep";
import { ExpandableTextStep } from "./steps/ExpandableTextStep";
import { SingleChoiceStep } from "./steps/SingleChoiceStep";
import { SilenceStep } from "./steps/SilenceStep";
import { PersonalPrayerStep } from "./steps/PersonalPrayerStep";
import { OptionalPrayerStep } from "./steps/OptionalPrayerStep";
import { ScriptureStep } from "./steps/ScriptureStep";
import { CompletionStep } from "./steps/CompletionStep";

interface PrayerSessionProps {
  config: PrayerSessionConfig;
}

export function PrayerSession({ config }: PrayerSessionProps) {
  const router = useRouter();
  const [experienceMode, setExperienceMode] =
    useState<PrayerExperienceMode>("intro");
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isExitDialogOpen, setIsExitDialogOpen] = useState(false);
  const [isFutureDialogOpen, setIsFutureDialogOpen] = useState(false);
  const [futureDialogMessage, setFutureDialogMessage] = useState("");
  const [isFinishing, setIsFinishing] = useState(false);

  // Subphase voice override for multi-phase steps (continuous-reflection & spiritual-closing)
  const [subphaseVoiceOverride, setSubphaseVoiceOverride] = useState<
    StepVoiceConfig | undefined
  >(undefined);

  const currentStep = config.steps[currentStepIndex];
  const totalSteps = config.steps.length;
  const currentMoment = currentStep?.momentIndex || currentStepIndex + 1;

  // Derive default active voice from current step definition
  const defaultStepVoice: StepVoiceConfig | undefined = (() => {
    if (!currentStep) return undefined;
    if (currentStep.type === "continuous-reflection") {
      return currentStep.phaseA.voice || currentStep.voice;
    }
    if (currentStep.type === "spiritual-closing") {
      return currentStep.optionalPrayer.voice || currentStep.voice;
    }
    return currentStep.voice;
  })();

  const activeVoice = subphaseVoiceOverride ?? defaultStepVoice;

  // Narration Controller
  const narration = usePrayerNarration({
    voiceConfig: activeVoice,
    experienceMode,
    isPausedByModal: isExitDialogOpen || isFutureDialogOpen,
  });

  function handleSelectVoice() {
    setExperienceMode("voice");
    setSubphaseVoiceOverride(undefined);
  }

  function handleSelectReading() {
    setExperienceMode("reading");
    setSubphaseVoiceOverride(undefined);
  }

  function handleSwitchToReading() {
    setExperienceMode("reading");
    narration.pause();
  }

  function handleUpdateAnswer(fieldKey: string, value: string) {
    setAnswers((prev) => ({ ...prev, [fieldKey]: value }));
  }

  function handleNext() {
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex((prev) => prev + 1);
      setSubphaseVoiceOverride(undefined);
    }
  }

  function handleBack() {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
      setSubphaseVoiceOverride(undefined);
    }
  }

  function handleCloseRequest() {
    setIsExitDialogOpen(true);
  }

  function handleConfirmExit() {
    setIsExitDialogOpen(false);
    narration.pause();
    router.push("/");
  }

  function handleSaveAction(msg: string) {
    setFutureDialogMessage(msg);
    setIsFutureDialogOpen(true);
  }

  function handleFinish() {
    setIsFinishing(true);
    narration.pause();
    setTimeout(() => {
      router.push("/");
    }, 1800);
  }

  // 1. Initial Experience Mode Selector (Voice vs Reading)
  if (experienceMode === "intro") {
    return (
      <div className="flex-1 flex flex-col min-h-screen bg-[#F7F4EE]">
        <PrayerExperienceIntro
          title={config.title}
          internalTitle={config.internalTitle}
          onSelectVoice={handleSelectVoice}
          onSelectReading={handleSelectReading}
          onBack={() => router.push("/")}
        />
      </div>
    );
  }

  // 2. Farewell Screen
  if (isFinishing) {
    return (
      <div className="flex-1 min-h-[500px] flex flex-col items-center justify-center p-6 animate-in fade-in duration-500 text-center bg-[#F7F4EE] select-none">
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

  // 3. Active Prayer Experience (Voice or Reading)
  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#F7F4EE]">
      {/* Upper Navigation, Voice Mode Controls & 5-Moment Progress */}
      <PrayerHeader
        currentMoment={currentMoment}
        totalMoments={5}
        canGoBack={currentStepIndex > 0}
        onBack={handleBack}
        onClose={handleCloseRequest}
        experienceMode={experienceMode}
        isNarrationPlaying={narration.isPlaying}
        onToggleNarration={narration.toggle}
        onSwitchToReading={handleSwitchToReading}
      />

      {/* Dynamic Step Content */}
      <main className="flex-1 flex flex-col">
        {/* MOMENTO 1 — LLEGAR */}
        {currentStep.type === "arrival" && (
          <ArrivalStep
            key={currentStep.id}
            data={currentStep}
            onNext={handleNext}
            isPaused={isExitDialogOpen}
          />
        )}

        {/* MOMENTO 2 — RECONOCER */}
        {currentStep.type === "voice-response" && (
          <VoiceResponseStep
            key={currentStep.id}
            data={currentStep}
            value={answers[currentStep.fieldKey] || ""}
            onChange={(val) => handleUpdateAnswer(currentStep.fieldKey, val)}
            onNext={handleNext}
          />
        )}

        {/* MOMENTO 3 — ORDENAR */}
        {currentStep.type === "continuous-reflection" && (
          <ContinuousReflectionStep
            key={currentStep.id}
            data={currentStep}
            onNext={handleNext}
            onPhaseChange={(phase) => {
              if (currentStep.type === "continuous-reflection") {
                setSubphaseVoiceOverride(
                  phase === "phaseA"
                    ? currentStep.phaseA.voice
                    : currentStep.phaseB.voice
                );
              }
            }}
            isPaused={isExitDialogOpen}
          />
        )}

        {/* MOMENTO 4 — HABLAR CON DIOS */}
        {currentStep.type === "sacred-silence" && (
          <SacredSilenceStep
            key={currentStep.id}
            data={currentStep}
            onNext={handleNext}
            isPaused={isExitDialogOpen}
          />
        )}

        {/* MOMENTO 5 — CIERRE ESPIRITUAL */}
        {currentStep.type === "spiritual-closing" && (
          <SpiritualClosingStep
            key={currentStep.id}
            data={currentStep}
            onFinish={handleFinish}
            onPhaseChange={(phase) => {
              if (currentStep.type === "spiritual-closing") {
                setSubphaseVoiceOverride(
                  phase === "prayer"
                    ? currentStep.optionalPrayer.voice
                    : currentStep.scripture.voice
                );
              }
            }}
            onSaveIntention={() =>
              handleSaveAction(
                "Muy pronto podrás guardar este momento en tu espacio privado."
              )
            }
            isPaused={isExitDialogOpen}
          />
        )}

        {/* Legacy step fallbacks */}
        {currentStep.type === "reflection" && (
          <ReflectionStep
            key={currentStep.id}
            data={currentStep}
            onNext={handleNext}
          />
        )}

        {currentStep.type === "text-prompt" && (
          <TextPromptStep
            key={currentStep.id}
            data={currentStep}
            value={answers[currentStep.fieldKey] || ""}
            onChange={(val) => handleUpdateAnswer(currentStep.fieldKey, val)}
            onNext={handleNext}
          />
        )}

        {currentStep.type === "text-prompt-expandable" && (
          <ExpandableTextStep
            key={currentStep.id}
            data={currentStep}
            value={answers[currentStep.fieldKey] || ""}
            onChange={(val) => handleUpdateAnswer(currentStep.fieldKey, val)}
            onNext={handleNext}
          />
        )}

        {currentStep.type === "single-choice" && (
          <SingleChoiceStep
            key={currentStep.id}
            data={currentStep}
            selectedValue={answers[currentStep.fieldKey] || ""}
            onSelect={(val) => handleUpdateAnswer(currentStep.fieldKey, val)}
            onNext={handleNext}
          />
        )}

        {currentStep.type === "silence" && (
          <SilenceStep
            key={currentStep.id}
            data={currentStep}
            onNext={handleNext}
          />
        )}

        {currentStep.type === "personal-prayer" && (
          <PersonalPrayerStep
            key={currentStep.id}
            data={currentStep}
            value={answers[currentStep.fieldKey] || ""}
            onChange={(val) => handleUpdateAnswer(currentStep.fieldKey, val)}
            onNext={handleNext}
          />
        )}

        {currentStep.type === "optional-prayer" && (
          <OptionalPrayerStep
            key={currentStep.id}
            data={currentStep}
            onNext={handleNext}
          />
        )}

        {currentStep.type === "scripture" && (
          <ScriptureStep
            key={currentStep.id}
            data={currentStep}
            onNext={handleNext}
          />
        )}

        {currentStep.type === "completion" && (
          <CompletionStep
            key={currentStep.id}
            data={currentStep}
            onSaveIntention={() =>
              handleSaveAction(
                "Muy pronto podrás guardar este momento en tu espacio privado."
              )
            }
            onSaveReflection={() =>
              handleSaveAction(
                "Muy pronto podrás guardar este momento en tu espacio privado."
              )
            }
            onFinish={handleFinish}
          />
        )}
      </main>

      {/* Confirmation and Notice Modals */}
      <PrayerExitDialog
        isOpen={isExitDialogOpen}
        onStay={() => setIsExitDialogOpen(false)}
        onExit={handleConfirmExit}
      />

      <FutureFeatureDialog
        isOpen={isFutureDialogOpen}
        onClose={() => setIsFutureDialogOpen(false)}
        message={futureDialogMessage}
      />
    </div>
  );
}
