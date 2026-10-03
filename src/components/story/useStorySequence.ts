"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export interface StoryStep {
  duration: number;
  id: string;
}

export function useStorySequence(steps: StoryStep[]) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stepsRef = useRef(steps);
  stepsRef.current = steps;

  const advance = useCallback(() => {
    setCurrentStep((prev) => {
      const next = prev + 1;
      if (next >= stepsRef.current.length) {
        setCompleted(true);
        return prev;
      }
      return next;
    });
  }, []);

  const skipToEnd = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setCurrentStep(stepsRef.current.length - 1);
    setCompleted(true);
  }, []);

  useEffect(() => {
    if (completed) return;
    const step = stepsRef.current[currentStep];
    if (!step) return;
    timerRef.current = setTimeout(advance, step.duration);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentStep, completed, advance]);

  return {
    currentStep,
    stepId: steps[currentStep]?.id ?? "",
    completed,
    advance,
    skipToEnd,
    totalSteps: steps.length,
  };
}
