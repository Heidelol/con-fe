"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { PrayerSessionConfig } from "@/types/prayer";
import { PrayerHeader } from "./PrayerHeader";
import { PrayerExitDialog } from "./PrayerExitDialog";
import { FutureFeatureDialog } from "./FutureFeatureDialog";
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
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isExitDialogOpen, setIsExitDialogOpen] = useState(false);
  const [isFutureDialogOpen, setIsFutureDialogOpen] = useState(false);
  const [futureDialogMessage, setFutureDialogMessage] = useState("");
  const [isFinishing, setIsFinishing] = useState(false);

  const currentStep = config.steps[currentStepIndex];
  const totalSteps = config.steps.length;

  function handleUpdateAnswer(fieldKey: string, value: string) {
    setAnswers((prev) => ({ ...prev, [fieldKey]: value }));
  }

  function handleNext() {
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  }

  function handleBack() {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  }

  function handleCloseRequest() {
    setIsExitDialogOpen(true);
  }

  function handleConfirmExit() {
    setIsExitDialogOpen(false);
    router.push("/");
  }

  function handleSaveAction(msg: string) {
    setFutureDialogMessage(msg);
    setIsFutureDialogOpen(true);
  }

  function handleFinish() {
    setIsFinishing(true);
    setTimeout(() => {
      router.push("/");
    }, 1400);
  }

  if (isFinishing) {
    return (
      <div className="flex-1 min-h-[500px] flex flex-col items-center justify-center p-6 animate-in fade-in duration-500 text-center">
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
    <div className="flex-1 flex flex-col min-h-screen bg-[#F7F4EE]">
      {/* Upper Navigation & Progress */}
      <PrayerHeader
        currentStep={currentStepIndex}
        totalSteps={totalSteps}
        canGoBack={currentStepIndex > 0}
        onBack={handleBack}
        onClose={handleCloseRequest}
      />

      {/* Dynamic Step Content */}
      <main className="flex-1 flex flex-col">
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
