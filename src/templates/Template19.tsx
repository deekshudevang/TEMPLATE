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
  { id: "boot", duration: 3500 },
  { id: "scan", duration: 4000 },
  { id: "name", duration: 4000 },
  { id: "message", duration: 4500 },
  { id: "finale", duration: 4000 },
  { id: "invitation", duration: 0 },
];

const NEON = "#B829FF"; // Cyberpunk purple

const CRTOverlay = () => (
  <div className="absolute inset-0 pointer-events-none z-50 mix-blend-overlay opacity-30">
    <div className="w-full h-full bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
  </div>
);

export default function Template19({ student, onAgain, onHome }: TemplateProps) {
  const { stepId, completed, skipToEnd, totalSteps, currentStep } = useStorySequence(STEPS);
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    if (stepId === "invitation" || completed) {
      setShowCard(true);
    }
  }, [stepId, completed]);

  if (showCard) {
    return <InvitationCard student={student} templateId={19} onAgain={onAgain} onHome={onHome} />;
  }

  return (
    <div className="min-h-[100svh] bg-[#0A0214] text-[#B829FF] flex items-center justify-center relative overflow-hidden" onClick={!completed ? skipToEnd : undefined}>
      <NoiseOverlay opacity={0.3} />
      <CRTOverlay />
      <ProgressIndicator current={currentStep} total={totalSteps} />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(184,41,255,0.1)_0%,transparent_70%)] pointer-events-none" />

      <AnimatePresence mode="wait">
        {stepId === "boot" && (
          <motion.div key="boot" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="text-center flex flex-col items-center justify-center z-10 w-full p-8">
            <CinematicText className="text-[10px] font-mono uppercase tracking-[0.6em] text-[#B829FF]/80 mb-8">
              Boot Sequence Initiated
            </CinematicText>
            <motion.div
              animate={{ opacity: [1, 0, 1, 1, 0.5, 1] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: "mirror" }}
              className="w-32 h-16 border-2 border-[#B829FF] flex items-center justify-center shadow-[0_0_15px_#B829FF,inset_0_0_10px_#B829FF]"
            >
              <div className="w-full h-1 bg-[#B829FF] shadow-[0_0_5px_#B829FF] origin-left animate-pulse" style={{ transform: 'scaleX(0.7)' }} />
            </motion.div>
          </motion.div>
        )}

        {stepId === "scan" && (
          <motion.div key="scan" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, filter: "blur(20px)" }} className="text-center w-full max-w-2xl px-4 z-10 flex flex-col items-center justify-center h-full">
            <motion.div
              initial={{ textShadow: "none" }}
              animate={{ textShadow: ["0 0 5px #B829FF", "0 0 20px #B829FF", "0 0 5px #B829FF"] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="font-mono text-4xl sm:text-6xl font-black text-white tracking-widest uppercase"
            >
              {student.usn}
            </motion.div>
            <p className="mt-8 text-xs font-mono tracking-[0.4em] text-[#B829FF]/70 uppercase animate-pulse">
              Subject Verified
            </p>
          </motion.div>
        )}

        {stepId === "name" && (
          <motion.div key="name" initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="text-center z-10 p-8 w-full">
            <CinematicText className="text-[10px] font-mono uppercase tracking-[0.6em] text-[#B829FF]/60 mb-6">
              Access Granted
            </CinematicText>
            <NameReveal name={student.name} delay={0.2} className="text-white font-mono font-black text-4xl sm:text-7xl drop-shadow-[0_0_10px_rgba(184,41,255,0.8)] uppercase" />
          </motion.div>
        )}

        {stepId === "message" && (
          <motion.div key="message" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="text-left z-10 p-8 max-w-lg mx-auto relative border-l-4 border-[#B829FF] bg-gradient-to-r from-[#B829FF]/20 to-transparent backdrop-blur-md">
            <p className="text-white font-mono text-sm sm:text-base leading-relaxed px-4 py-4 uppercase">
              &gt; WELCOME TO THE GRID.<br/>
              &gt; DESTINATION: {EVENT.college}.<br/>
              &gt; UPLOAD COMPLETE. PREPARE TO HACK THE PLANET.
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
