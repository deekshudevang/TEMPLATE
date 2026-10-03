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
  { id: "synapse", duration: 3500 },
  { id: "connect", duration: 4000 },
  { id: "name", duration: 4000 },
  { id: "message", duration: 4500 },
  { id: "finale", duration: 4000 },
  { id: "invitation", duration: 0 },
];

const NEURAL = "#FF3366"; // Neon pink/red

// Helper for synapse drawing effect
const SynapseLines = () => {
  return (
    <div className="relative w-64 h-64 sm:w-96 sm:h-96">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <motion.path
          d="M50 50 L20 20 L40 10 L80 30 L50 50 L90 80 L70 90 L30 70 Z"
          fill="none"
          stroke={NEURAL}
          strokeWidth="0.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 1, 0.5] }}
          transition={{ duration: 3, ease: "easeInOut" }}
        />
        {/* Nodes */}
        {[
          { cx: 50, cy: 50 },
          { cx: 20, cy: 20 },
          { cx: 40, cy: 10 },
          { cx: 80, cy: 30 },
          { cx: 90, cy: 80 },
          { cx: 70, cy: 90 },
          { cx: 30, cy: 70 },
        ].map((node, i) => (
          <motion.circle
            key={i}
            cx={node.cx}
            cy={node.cy}
            r="1.5"
            fill={NEURAL}
            initial={{ scale: 0 }}
            animate={{ scale: [0, 2, 1] }}
            transition={{ delay: i * 0.4, duration: 1 }}
          />
        ))}
      </svg>
    </div>
  );
};

export default function Template16({ student, onAgain, onHome }: TemplateProps) {
  const { stepId, completed, skipToEnd, totalSteps, currentStep } = useStorySequence(STEPS);
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    if (stepId === "invitation" || completed) {
      setShowCard(true);
    }
  }, [stepId, completed]);

  if (showCard) {
    return <InvitationCard student={student} templateId={16} onAgain={onAgain} onHome={onHome} />;
  }

  return (
    <div className="min-h-[100svh] bg-[#0A0508] text-[#FF3366] flex items-center justify-center relative overflow-hidden" onClick={!completed ? skipToEnd : undefined}>
      <NoiseOverlay opacity={0.15} />
      <ProgressIndicator current={currentStep} total={totalSteps} />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,51,102,0.1)_0%,transparent_50%)] pointer-events-none" />

      <AnimatePresence mode="wait">
        {stepId === "synapse" && (
          <motion.div key="synapse" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="text-center flex flex-col items-center justify-center z-10 w-full p-8">
            <CinematicText className="text-[10px] uppercase tracking-[0.5em] text-[#FF3366]/60 mb-8">
              Initiating Neural Link
            </CinematicText>
            <SynapseLines />
          </motion.div>
        )}

        {stepId === "connect" && (
          <motion.div key="connect" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, filter: "blur(20px)" }} className="text-center w-full max-w-2xl px-4 z-10 flex flex-col items-center justify-center h-full">
            <motion.div
              initial={{ letterSpacing: "1em", filter: "blur(10px)" }}
              animate={{ letterSpacing: "0.2em", filter: "blur(0px)" }}
              transition={{ duration: 2, ease: "circOut" }}
              className="font-sans font-black text-3xl sm:text-5xl text-white tracking-widest drop-shadow-[0_0_15px_rgba(255,51,102,0.8)]"
            >
              {student.usn}
            </motion.div>
            <p className="mt-8 text-xs font-sans tracking-[0.4em] text-[#FF3366]/50 uppercase">
              Synapse Connected
            </p>
          </motion.div>
        )}

        {stepId === "name" && (
          <motion.div key="name" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }} className="text-center z-10 p-8 w-full">
            <CinematicText className="text-[10px] font-sans uppercase tracking-[0.6em] text-[#FF3366]/60 mb-6">
              Identity Mapped
            </CinematicText>
            <NameReveal name={student.name} delay={0.2} className="text-white font-sans font-black text-4xl sm:text-7xl drop-shadow-[0_0_20px_rgba(255,51,102,0.5)] uppercase tracking-tighter" />
          </motion.div>
        )}

        {stepId === "message" && (
          <motion.div key="message" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-center z-10 p-8 max-w-lg mx-auto relative rounded-3xl bg-[#FF3366]/5 border border-[#FF3366]/20 backdrop-blur-md shadow-[0_0_30px_rgba(255,51,102,0.1)]">
            <p className="text-white/80 font-sans text-sm sm:text-lg leading-relaxed px-4 py-2">
              Your consciousness has been successfully integrated into the {EVENT.college} mainframe. Prepare for cognitive expansion.
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
