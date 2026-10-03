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
  { id: "molten", duration: 3500 },
  { id: "forge", duration: 4000 },
  { id: "name", duration: 4000 },
  { id: "message", duration: 4500 },
  { id: "finale", duration: 4000 },
  { id: "invitation", duration: 0 },
];

const METALLIC = "#E6C280"; // Gold/Brass

export default function Template18({ student, onAgain, onHome }: TemplateProps) {
  const { stepId, completed, skipToEnd, totalSteps, currentStep } = useStorySequence(STEPS);
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    if (stepId === "invitation" || completed) {
      setShowCard(true);
    }
  }, [stepId, completed]);

  if (showCard) {
    return <InvitationCard student={student} templateId={18} onAgain={onAgain} onHome={onHome} />;
  }

  return (
    <div className="min-h-[100svh] bg-[#0A0805] text-[#E6C280] flex items-center justify-center relative overflow-hidden" onClick={!completed ? skipToEnd : undefined}>
      <NoiseOverlay opacity={0.2} />
      <ProgressIndicator current={currentStep} total={totalSteps} />

      {/* SVG Filter for gooey liquid metal effect */}
      <svg className="hidden">
        <filter id="gooey">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="gooey" />
          <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
        </filter>
      </svg>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(230,194,128,0.1)_0%,transparent_60%)] pointer-events-none" />

      <AnimatePresence mode="wait">
        {stepId === "molten" && (
          <motion.div key="molten" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="text-center flex flex-col items-center justify-center z-10 w-full p-8">
            <CinematicText className="text-[10px] uppercase tracking-[0.5em] text-[#E6C280]/60 mb-8 font-serif">
              Melting Boundaries
            </CinematicText>
            <div className="relative w-64 h-64" style={{ filter: 'url(#gooey)' }}>
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    x: [0, (Math.random() - 0.5) * 100, 0],
                    y: [0, (Math.random() - 0.5) * 100, 0],
                    scale: [1, Math.random() + 0.5, 1]
                  }}
                  transition={{ duration: Math.random() * 2 + 2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-1/2 left-1/2 w-16 h-16 bg-gradient-to-br from-[#FFF] to-[#E6C280] rounded-full -ml-8 -mt-8 shadow-[0_0_20px_rgba(230,194,128,0.5)]"
                />
              ))}
            </div>
          </motion.div>
        )}

        {stepId === "forge" && (
          <motion.div key="forge" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, filter: "blur(20px)" }} className="text-center w-full max-w-2xl px-4 z-10 flex flex-col items-center justify-center h-full">
            <motion.div
              initial={{ scale: 0.8, filter: "blur(10px)", opacity: 0 }}
              animate={{ scale: 1, filter: "blur(0px)", opacity: 1 }}
              transition={{ duration: 2, ease: "circOut" }}
              className="font-serif text-3xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-[#E6C280] via-[#FFF] to-[#E6C280] tracking-widest drop-shadow-[0_0_15px_rgba(230,194,128,0.4)]"
            >
              {student.usn}
            </motion.div>
            <p className="mt-8 text-xs font-serif tracking-[0.4em] text-[#E6C280]/50 uppercase">
              Forged Identity
            </p>
          </motion.div>
        )}

        {stepId === "name" && (
          <motion.div key="name" initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="text-center z-10 p-8 w-full">
            <CinematicText className="text-[10px] font-serif uppercase tracking-[0.6em] text-[#E6C280]/60 mb-6">
              Solidified Form
            </CinematicText>
            <NameReveal name={student.name} delay={0.2} className="text-transparent bg-clip-text bg-gradient-to-r from-[#E6C280] via-[#FFF] to-[#E6C280] font-serif text-4xl sm:text-7xl drop-shadow-[0_0_10px_rgba(230,194,128,0.5)] uppercase" />
          </motion.div>
        )}

        {stepId === "message" && (
          <motion.div key="message" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-center z-10 p-8 max-w-lg mx-auto relative rounded-md bg-[#E6C280]/5 border-t border-b border-[#E6C280]/30 backdrop-blur-sm">
            <p className="text-white/90 font-serif text-sm sm:text-lg leading-relaxed px-4 py-6 italic">
              Through the crucible of potential, you have emerged resilient. Welcome to {EVENT.college}, where your mettle will be tested and proven.
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
