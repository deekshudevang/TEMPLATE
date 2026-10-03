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
  { id: "anomaly", duration: 3000 },
  { id: "stabilize", duration: 4000 },
  { id: "name", duration: 4000 },
  { id: "message", duration: 4500 },
  { id: "finale", duration: 4000 },
  { id: "invitation", duration: 0 },
];

const QUANTUM = "#00FFCC"; // Neon cyan

// Helper for glitch effect
const QuantumGlitch = ({ usn }: { usn: string }) => {
  return (
    <div className="relative font-mono text-4xl sm:text-6xl font-black text-[#00FFCC] tracking-[0.2em]">
      <motion.div
        animate={{ 
          x: [-2, 2, -1, 1, -2, 0],
          y: [1, -1, 2, -2, 1, 0],
          opacity: [1, 0.8, 1, 0.5, 1],
          filter: ["hue-rotate(0deg)", "hue-rotate(90deg)", "hue-rotate(0deg)"]
        }}
        transition={{ duration: 0.2, repeat: Infinity, repeatType: "mirror" }}
        className="absolute top-0 left-0 text-[#FF0055] mix-blend-screen -z-10"
      >
        {usn}
      </motion.div>
      <motion.div
        animate={{ 
          x: [2, -2, 1, -1, 2, 0],
          y: [-1, 1, -2, 2, -1, 0],
          opacity: [1, 0.5, 1, 0.8, 1]
        }}
        transition={{ duration: 0.15, repeat: Infinity, repeatType: "mirror" }}
        className="absolute top-0 left-0 text-[#0000FF] mix-blend-screen -z-10"
      >
        {usn}
      </motion.div>
      <div className="relative z-10 bg-[#050507] px-2">{usn}</div>
    </div>
  );
};

export default function Template15({ student, onAgain, onHome }: TemplateProps) {
  const { stepId, completed, skipToEnd, totalSteps, currentStep } = useStorySequence(STEPS);
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    if (stepId === "invitation" || completed) {
      setShowCard(true);
    }
  }, [stepId, completed]);

  if (showCard) {
    return <InvitationCard student={student} templateId={15} onAgain={onAgain} onHome={onHome} />;
  }

  return (
    <div className="min-h-[100svh] bg-[#050507] text-[#00FFCC] flex items-center justify-center relative overflow-hidden" onClick={!completed ? skipToEnd : undefined}>
      <NoiseOverlay opacity={0.2} />
      <ProgressIndicator current={currentStep} total={totalSteps} />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,204,0.05)_0%,transparent_70%)] pointer-events-none" />

      <AnimatePresence mode="wait">
        {stepId === "anomaly" && (
          <motion.div key="anomaly" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.5, filter: "blur(10px)" }} className="text-center flex flex-col items-center justify-center z-10 w-full p-8">
            <CinematicText className="text-[10px] uppercase tracking-[0.6em] text-[#00FFCC]/60 mb-12">
              Quantum Anomaly Detected
            </CinematicText>
            <div className="relative w-full h-32 flex items-center justify-center">
              {Array.from({ length: 40 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    x: (Math.random() - 0.5) * 400,
                    y: (Math.random() - 0.5) * 400,
                    opacity: [0, 1, 0],
                    scale: [0, Math.random() * 2 + 1, 0]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: Math.random() * 2 }}
                  className="absolute w-1 h-1 bg-[#00FFCC] rounded-full shadow-[0_0_10px_#00FFCC]"
                />
              ))}
            </div>
          </motion.div>
        )}

        {stepId === "stabilize" && (
          <motion.div key="stabilize" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, filter: "blur(20px)" }} className="text-center w-full max-w-2xl px-4 z-10 flex flex-col items-center justify-center h-full">
            <QuantumGlitch usn={student.usn} />
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.5, 1] }}
              transition={{ delay: 2, duration: 1.5 }}
              className="mt-12 text-xs font-mono tracking-[0.4em] text-[#00FFCC]/50 uppercase"
            >
              Wave Function Collapsed
            </motion.p>
          </motion.div>
        )}

        {stepId === "name" && (
          <motion.div key="name" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} className="text-center z-10 p-8 w-full">
            <CinematicText className="text-[10px] font-mono uppercase tracking-[0.5em] text-[#00FFCC]/60 mb-8">
              Entity Stabilized
            </CinematicText>
            <NameReveal name={student.name} delay={0.2} className="text-white font-mono font-bold text-4xl sm:text-6xl drop-shadow-[0_0_15px_rgba(0,255,204,0.6)] uppercase" />
          </motion.div>
        )}

        {stepId === "message" && (
          <motion.div key="message" initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="text-center z-10 p-8 max-w-lg mx-auto relative border border-[#00FFCC]/20 bg-[#00FFCC]/5 backdrop-blur-sm">
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#00FFCC]" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#00FFCC]" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#00FFCC]" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#00FFCC]" />
            <p className="text-white/90 font-mono text-sm sm:text-base leading-loose px-4 py-6">
              IN THE INFINITE MULTIVERSE, THIS TIMELINE WAS CHOSEN. YOUR PRESENCE AT {EVENT.college.toUpperCase()} IS A CALCULATED CERTAINTY.
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
