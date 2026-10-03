"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { TemplateProps } from "./types";
import { useStorySequence } from "@/components/story/useStorySequence";
import { CinematicText, ProgressIndicator, NoiseOverlay, TapToContinue } from "@/components/story/Primitives";
import { InvitationCard } from "@/components/story/InvitationCard";
import { Finale } from "@/components/story/Finale";
import { EVENT } from "@/config/event";

const STEPS = [
  { id: "chaos", duration: 3000 },
  { id: "sphere", duration: 4000 },
  { id: "collapse", duration: 3000 },
  { id: "name", duration: 4500 },
  { id: "message", duration: 4000 },
  { id: "finale", duration: 4000 },
  { id: "invitation", duration: 0 },
];

const KINETIC = "#E5E5E5";

// Helper for chaotic letters snapping together
const KineticLetters = ({ text }: { text: string }) => {
  const chars = text.split("");
  return (
    <div className="flex gap-1 sm:gap-2 items-center justify-center font-sans font-black text-4xl sm:text-7xl uppercase tracking-tighter">
      {chars.map((char, i) => {
        // Random positions for the chaos phase
        const rx = (Math.random() - 0.5) * 300;
        const ry = (Math.random() - 0.5) * 300;
        const rRot = (Math.random() - 0.5) * 360;
        const rScale = Math.random() * 2 + 0.5;

        return (
          <motion.div
            key={i}
            initial={{ x: rx, y: ry, rotate: rRot, scale: rScale, opacity: 0, filter: "blur(10px)" }}
            animate={{ x: 0, y: 0, rotate: 0, scale: 1, opacity: 1, filter: "blur(0px)" }}
            transition={{
              duration: 2,
              delay: 0.5 + i * 0.1,
              ease: [0.16, 1, 0.3, 1], // expo out
            }}
            className="text-white drop-shadow-2xl mix-blend-difference"
          >
            {char === " " ? "\u00A0" : char}
          </motion.div>
        );
      })}
    </div>
  );
};

export default function Template02({ student, onAgain, onHome }: TemplateProps) {
  const { stepId, completed, skipToEnd, totalSteps, currentStep } = useStorySequence(STEPS);
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    if (stepId === "invitation" || completed) {
      setShowCard(true);
    }
  }, [stepId, completed]);

  if (showCard) {
    return <InvitationCard student={student} templateId={2} onAgain={onAgain} onHome={onHome} />;
  }

  return (
    <div className="min-h-[100svh] bg-[#111111] text-[#E5E5E5] flex items-center justify-center relative overflow-hidden font-sans" onClick={!completed ? skipToEnd : undefined}>
      <NoiseOverlay opacity={0.1} />
      <ProgressIndicator current={currentStep} total={totalSteps} />

      {/* Ambient glowing orb in the background */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[60vh] h-[60vh] rounded-full bg-white/5 blur-[100px] pointer-events-none"
      />

      <AnimatePresence mode="wait">
        {stepId === "chaos" && (
          <motion.div key="chaos" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }} className="text-center flex flex-col items-center justify-center z-10 w-full p-8">
            <CinematicText className="text-xs font-bold tracking-[0.5em] text-white/50 mb-12">
              System Initialization
            </CinematicText>
            {/* Chaotic moving elements */}
            <div className="relative w-full h-32">
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ x: 0, y: 0, opacity: 0 }}
                  animate={{ 
                    x: (Math.random() - 0.5) * 200, 
                    y: (Math.random() - 0.5) * 100, 
                    opacity: [0, 0.8, 0],
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: Math.random() * 2 }}
                  className="absolute left-1/2 top-1/2 font-mono text-white/30 text-xl font-bold"
                >
                  {String.fromCharCode(48 + Math.floor(Math.random() * 10))}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {stepId === "sphere" && (
          <motion.div key="sphere" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.5, filter: "blur(20px)" }} className="text-center w-full max-w-2xl px-4 z-10 flex flex-col items-center justify-center h-full">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, ease: "linear", repeat: Infinity }}
              className="relative w-64 h-64 flex items-center justify-center border border-white/10 rounded-full"
            >
              <div className="absolute inset-4 border-t border-b border-white/20 rounded-full animate-[spin_10s_linear_infinite_reverse]" />
              <div className="absolute inset-8 border-l border-r border-white/30 rounded-full animate-[spin_15s_linear_infinite]" />
              <div className="font-mono text-2xl tracking-widest text-white/80">{student.usn}</div>
            </motion.div>
            <p className="mt-12 text-xs font-bold tracking-[0.3em] text-white/40 uppercase">Locating Signal</p>
          </motion.div>
        )}

        {stepId === "collapse" && (
          <motion.div key="collapse" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex items-center justify-center z-10 bg-white">
            {/* White flash */}
            <motion.div initial={{ scale: 0 }} animate={{ scale: 100 }} transition={{ duration: 1.5, ease: "circIn" }} className="w-4 h-4 bg-black rounded-full" />
          </motion.div>
        )}

        {stepId === "name" && (
          <motion.div key="name" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }} className="text-center z-10 p-4 w-full">
            <CinematicText className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 mb-8">
              Target Acquired
            </CinematicText>
            <KineticLetters text={student.name} />
          </motion.div>
        )}

        {stepId === "message" && (
          <motion.div key="message" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="text-center z-10 p-8 max-w-lg mx-auto">
            <div className="w-12 h-1 bg-white mb-8 mx-auto" />
            <p className="text-white/80 font-sans font-medium text-lg sm:text-xl leading-relaxed tracking-wide">
              Chaos finds order. The kinetic energy of the universe has converged to bring you to {EVENT.college}. Step into the momentum.
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
