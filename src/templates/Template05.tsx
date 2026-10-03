"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { TemplateProps } from "./types";
import { useStorySequence } from "@/components/story/useStorySequence";
import { CinematicText, NameReveal, UsnReveal, StoryParagraph, ProgressIndicator, NoiseOverlay, TapToContinue } from "@/components/story/Primitives";
import { InvitationCard } from "@/components/story/InvitationCard";
import { Finale } from "@/components/story/Finale";
import { EVENT } from "@/config/event";

const STEPS = [
  { id: "intro", duration: 4000 },
  { id: "name", duration: 4000 },
  { id: "usn", duration: 3500 },
  { id: "message", duration: 4500 },
  { id: "finale", duration: 4000 },
  { id: "invitation", duration: 0 },
];

export default function Template05({ student, onAgain, onHome }: TemplateProps) {
  const { stepId, completed, skipToEnd, totalSteps, currentStep } = useStorySequence(STEPS);
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    if (stepId === "invitation" || completed) {
      setShowCard(true);
    }
  }, [stepId, completed]);

  if (showCard) {
    return <InvitationCard student={student} templateId={parseInt("05", 10)} onAgain={onAgain} onHome={onHome} />;
  }

  return (
    <div className="min-h-[100svh] bg-[#0a0a0a] text-white flex items-center justify-center relative overflow-hidden" onClick={!completed ? skipToEnd : undefined}>
      <NoiseOverlay opacity={0.15} mixBlendMode="overlay" />
      
      {/* Liquid Chrome Background */}
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.5, 1],
            rotate: [0, 90, 180, 270, 360],
            borderRadius: ["30% 70% 70% 30% / 30% 30% 70% 70%", "70% 30% 30% 70% / 70% 70% 30% 30%", "30% 70% 70% 30% / 30% 30% 70% 70%"]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-2xl max-h-2xl bg-gradient-to-tr from-gray-400 via-gray-200 to-white opacity-20 blur-3xl"
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
            borderRadius: ["70% 30% 30% 70% / 70% 70% 30% 30%", "30% 70% 70% 30% / 30% 30% 70% 70%", "70% 30% 30% 70% / 70% 70% 30% 30%"]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-xl max-h-xl bg-gradient-to-bl from-white via-gray-300 to-gray-600 opacity-20 blur-2xl"
        />
      </div>

      <ProgressIndicator current={currentStep} total={totalSteps} className="text-gray-300" />

      <AnimatePresence mode="wait">
        {stepId === "intro" && (
          <motion.div key="intro" 
            initial={{ opacity: 0, filter: "blur(20px)" }} 
            animate={{ opacity: 1, filter: "blur(0px)" }} 
            exit={{ opacity: 0, filter: "blur(20px)" }} 
            transition={{ duration: 2 }}
            className="text-center space-y-4 z-10 p-8 flex flex-col items-center">
            
            <CinematicText className="text-sm uppercase tracking-[0.8em] text-transparent bg-clip-text bg-gradient-to-r from-gray-400 via-white to-gray-400 font-light">
              FLUIDITY
            </CinematicText>
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-white to-transparent opacity-50 mt-4" />
          </motion.div>
        )}

        {stepId === "name" && (
          <motion.div key="name" 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }} 
            transition={{ duration: 1.5 }}
            className="text-center space-y-6 z-10 p-8">
            <CinematicText className="text-xs uppercase tracking-[0.4em] text-gray-400 mb-2 block">RECOGNIZING</CinematicText>
            
            <div className="relative">
              <NameReveal name={student.name} delay={0.4} className="text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-500 text-5xl md:text-7xl font-serif italic drop-shadow-lg" />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent mix-blend-overlay pointer-events-none"
                style={{ WebkitBackgroundClip: "text", color: "transparent" }}
              >
                {student.name}
              </motion.div>
            </div>
          </motion.div>
        )}

        {stepId === "usn" && (
          <motion.div key="usn" 
            initial={{ opacity: 0, y: -30 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 1.2 }}
            className="text-center space-y-4 z-10 p-8 relative">
            <UsnReveal usn={student.usn} className="text-white text-4xl md:text-6xl font-light tracking-[0.5em] drop-shadow-[0_4px_10px_rgba(255,255,255,0.3)]" />
            <motion.p 
              initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ delay: 1 }}
              className="text-xs text-gray-300 uppercase tracking-widest font-mono">
              SEQUENCE: {student.id}
            </motion.p>
          </motion.div>
        )}

        {stepId === "message" && (
          <motion.div key="message" 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 1.05 }} 
            transition={{ duration: 1.5 }}
            className="text-center z-10 p-8 max-w-2xl mx-auto relative">
            
            <div className="absolute inset-0 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 shadow-[0_8px_32px_rgba(255,255,255,0.1)] -z-10" />

            <StoryParagraph className="text-gray-200 text-xl md:text-3xl font-serif italic leading-relaxed py-12 px-8">
              "Adapt. Flow. Become something entirely new. The journey ahead requires nothing less."
            </StoryParagraph>
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
