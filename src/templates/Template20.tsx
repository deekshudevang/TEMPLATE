"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { TemplateProps } from "./types";
import { useStorySequence } from "@/components/story/useStorySequence";
import { CinematicText, NameReveal, ProgressIndicator, NoiseOverlay, TapToContinue } from "@/components/story/Primitives";
import { InvitationCard } from "@/components/story/InvitationCard";
import { Finale } from "@/components/story/Finale";
import { EVENT } from "@/config/event";

const STEPS = [
  { id: "shatter", duration: 3500 },
  { id: "refract", duration: 4000 },
  { id: "name", duration: 4000 },
  { id: "message", duration: 4500 },
  { id: "finale", duration: 4000 },
  { id: "invitation", duration: 0 },
];

const ETHEREAL = "#E0F7FA"; // Very light cyan/glass tint

export default function Template20({ student, onAgain, onHome }: TemplateProps) {
  const { stepId, completed, skipToEnd, totalSteps, currentStep } = useStorySequence(STEPS);
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    if (stepId === "invitation" || completed) {
      setShowCard(true);
    }
  }, [stepId, completed]);

  if (showCard) {
    return <InvitationCard student={student} templateId={20} onAgain={onAgain} onHome={onHome} />;
  }

  return (
    <div className="min-h-[100svh] bg-[#F5FBFC] text-[#4A6FA5] flex items-center justify-center relative overflow-hidden" onClick={!completed ? skipToEnd : undefined}>
      <NoiseOverlay opacity={0.1} />
      <ProgressIndicator current={currentStep} total={totalSteps} />

      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(224,247,250,0.5)_0%,rgba(245,251,252,1)_100%)] pointer-events-none" />

      <AnimatePresence mode="wait">
        {stepId === "shatter" && (
          <motion.div key="shatter" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, filter: "blur(10px)" }} className="text-center flex flex-col items-center justify-center z-10 w-full p-8">
            <CinematicText className="text-[10px] uppercase tracking-[0.5em] text-[#4A6FA5]/50 mb-8 font-light">
              Breaking Illusions
            </CinematicText>
            <div className="relative w-48 h-48 flex items-center justify-center">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
                  animate={{ 
                    opacity: [0, 0.5, 0], 
                    scale: [0.5, 2, 2.5], 
                    rotate: [0, Math.random() * 180 - 90]
                  }}
                  transition={{ duration: 2, delay: i * 0.4, ease: "easeOut" }}
                  className="absolute border border-white/40 bg-white/20 backdrop-blur-sm"
                  style={{
                    width: `${Math.random() * 60 + 40}%`,
                    height: `${Math.random() * 60 + 40}%`,
                    clipPath: `polygon(${Math.random() * 100}% 0, 100% ${Math.random() * 100}%, ${Math.random() * 100}% 100%, 0 ${Math.random() * 100}%)`
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}

        {stepId === "refract" && (
          <motion.div key="refract" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, filter: "blur(20px)", scale: 1.2 }} className="text-center w-full max-w-2xl px-4 z-10 flex flex-col items-center justify-center h-full">
            <motion.div
              initial={{ letterSpacing: "-0.1em", opacity: 0, y: 20 }}
              animate={{ letterSpacing: "0.2em", opacity: 1, y: 0 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="font-serif text-3xl sm:text-5xl text-[#2C4870] tracking-widest drop-shadow-[0_4px_10px_rgba(224,247,250,0.8)] mix-blend-multiply"
            >
              {student.usn}
            </motion.div>
            <p className="mt-8 text-xs font-sans tracking-[0.4em] text-[#4A6FA5]/50 uppercase">
              Clarity Achieved
            </p>
          </motion.div>
        )}

        {stepId === "name" && (
          <motion.div key="name" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }} className="text-center z-10 p-8 w-full">
            <CinematicText className="text-[10px] font-sans uppercase tracking-[0.6em] text-[#4A6FA5]/60 mb-6 font-light">
              True Reflection
            </CinematicText>
            <NameReveal name={student.name} delay={0.2} className="text-[#1A2F4C] font-serif font-light text-4xl sm:text-7xl drop-shadow-[0_10px_20px_rgba(74,111,165,0.1)] capitalize" />
          </motion.div>
        )}

        {stepId === "message" && (
          <motion.div key="message" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-center z-10 p-8 max-w-lg mx-auto relative rounded-xl border border-white/60 bg-white/30 backdrop-blur-lg shadow-[0_8px_32px_rgba(74,111,165,0.1)]">
            <p className="text-[#2C4870] font-sans font-light text-sm sm:text-lg leading-relaxed px-4 py-6">
              Like a prism revealing hidden colors, your journey at {EVENT.college} will reveal your true brilliance. Step into the light.
            </p>
          </motion.div>
        )}

        {stepId === "finale" && (
          <Finale key="finale" collegeName={EVENT.college} onNext={() => setShowCard(true)} />
        )}
      </AnimatePresence>

      {!completed && <TapToContinue onClick={skipToEnd} />}
    </div>
  );
}
