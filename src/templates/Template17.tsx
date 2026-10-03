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
  { id: "stars", duration: 3500 },
  { id: "align", duration: 4000 },
  { id: "name", duration: 4000 },
  { id: "message", duration: 4500 },
  { id: "finale", duration: 4000 },
  { id: "invitation", duration: 0 },
];

const CELESTIAL = "#B4C4FF"; // Soft stellar blue

const Starfield = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 60 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, Math.random() * 0.8 + 0.2, 0] }}
          transition={{ duration: Math.random() * 3 + 2, repeat: Infinity, delay: Math.random() * 5 }}
          className="absolute rounded-full bg-white"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 3}px`,
            height: `${Math.random() * 3}px`,
            boxShadow: "0 0 4px #FFF"
          }}
        />
      ))}
    </div>
  );
};

export default function Template17({ student, onAgain, onHome }: TemplateProps) {
  const { stepId, completed, skipToEnd, totalSteps, currentStep } = useStorySequence(STEPS);
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    if (stepId === "invitation" || completed) {
      setShowCard(true);
    }
  }, [stepId, completed]);

  if (showCard) {
    return <InvitationCard student={student} templateId={17} onAgain={onAgain} onHome={onHome} />;
  }

  return (
    <div className="min-h-[100svh] bg-[#020510] text-[#B4C4FF] flex items-center justify-center relative overflow-hidden" onClick={!completed ? skipToEnd : undefined}>
      <NoiseOverlay opacity={0.15} />
      <ProgressIndicator current={currentStep} total={totalSteps} />
      <Starfield />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(180,196,255,0.05)_0%,transparent_80%)] pointer-events-none" />

      <AnimatePresence mode="wait">
        {stepId === "stars" && (
          <motion.div key="stars" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.2 }} className="text-center flex flex-col items-center justify-center z-10 w-full p-8">
            <CinematicText className="text-[10px] uppercase tracking-[0.5em] text-[#B4C4FF]/60 mb-8 font-serif">
              Searching the Cosmos
            </CinematicText>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, ease: "linear", repeat: Infinity }}
              className="w-48 h-48 border border-[#B4C4FF]/20 rounded-full flex items-center justify-center relative"
            >
              <div className="absolute top-0 w-1 h-1 bg-[#B4C4FF] rounded-full shadow-[0_0_8px_#B4C4FF]" />
              <div className="absolute bottom-0 w-2 h-2 bg-[#B4C4FF] rounded-full shadow-[0_0_12px_#B4C4FF]" />
              <div className="absolute left-0 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_#FFF]" />
            </motion.div>
          </motion.div>
        )}

        {stepId === "align" && (
          <motion.div key="align" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, filter: "blur(20px)" }} className="text-center w-full max-w-2xl px-4 z-10 flex flex-col items-center justify-center h-full">
            <motion.div
              initial={{ scale: 2, filter: "blur(10px)", opacity: 0 }}
              animate={{ scale: 1, filter: "blur(0px)", opacity: 1 }}
              transition={{ duration: 2, ease: "circOut" }}
              className="font-serif text-3xl sm:text-5xl text-white tracking-widest drop-shadow-[0_0_15px_rgba(180,196,255,0.6)]"
            >
              {student.usn}
            </motion.div>
            <p className="mt-8 text-xs font-serif tracking-[0.4em] text-[#B4C4FF]/50 uppercase">
              Constellation Aligned
            </p>
          </motion.div>
        )}

        {stepId === "name" && (
          <motion.div key="name" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }} className="text-center z-10 p-8 w-full">
            <CinematicText className="text-[10px] font-serif uppercase tracking-[0.6em] text-[#B4C4FF]/60 mb-6">
              A Star is Born
            </CinematicText>
            <NameReveal name={student.name} delay={0.2} className="text-white font-serif text-4xl sm:text-7xl drop-shadow-[0_0_20px_rgba(180,196,255,0.8)]" />
          </motion.div>
        )}

        {stepId === "message" && (
          <motion.div key="message" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-center z-10 p-8 max-w-lg mx-auto relative rounded-full bg-[#B4C4FF]/5 border border-[#B4C4FF]/20 backdrop-blur-sm shadow-[0_0_40px_rgba(180,196,255,0.1)] aspect-square flex flex-col justify-center">
            <p className="text-white/80 font-serif text-sm sm:text-lg leading-relaxed px-8">
              Written in the stars, your destiny unfolds. Welcome to {EVENT.college}, where your brilliance will light the darkest nights.
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
