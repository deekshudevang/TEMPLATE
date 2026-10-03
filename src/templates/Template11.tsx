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

export default function Template11({ student, onAgain, onHome }: TemplateProps) {
  const { stepId, completed, skipToEnd, totalSteps, currentStep } = useStorySequence(STEPS);
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    if (stepId === "invitation" || completed) {
      setShowCard(true);
    }
  }, [stepId, completed]);

  if (showCard) {
    return <InvitationCard student={student} templateId={parseInt("11", 10)} onAgain={onAgain} onHome={onHome} />;
  }

  return (
    <div className="min-h-[100svh] bg-[#0c0a00] text-amber-50 flex items-center justify-center relative overflow-hidden font-serif" onClick={!completed ? skipToEnd : undefined}>
      
      {/* Golden Hour Light */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.1, 1] }}
           transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
           className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-gradient-to-bl from-amber-400/30 via-orange-500/10 to-transparent blur-[100px] rounded-full translate-x-1/4 -translate-y-1/4"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a00] via-transparent to-transparent opacity-80" />
      </div>

      <NoiseOverlay opacity={0.06} mixBlendMode="soft-light" />
      <ProgressIndicator current={currentStep} total={totalSteps} className="text-amber-500" />

      <AnimatePresence mode="wait">
        {stepId === "intro" && (
          <motion.div key="intro" 
            initial={{ opacity: 0, filter: "brightness(0)" }} 
            animate={{ opacity: 1, filter: "brightness(1)" }} 
            exit={{ opacity: 0, filter: "brightness(2) blur(10px)" }} 
            transition={{ duration: 2, ease: "easeInOut" }}
            className="text-center space-y-4 z-10 p-8">
            <CinematicText className="text-xl md:text-2xl uppercase tracking-[0.4em] text-amber-200/80 font-normal italic">
              The Golden Hour
            </CinematicText>
          </motion.div>
        )}

        {stepId === "name" && (
          <motion.div key="name" 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }} 
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-center space-y-6 z-10 p-8 flex flex-col items-center">
            
            <div className="h-px w-12 bg-amber-500/50 mb-4" />
            <NameReveal name={student.name} delay={0.3} className="text-amber-100 text-5xl md:text-7xl font-normal tracking-wide" />
            <div className="h-px w-12 bg-amber-500/50 mt-4" />
            
          </motion.div>
        )}

        {stepId === "usn" && (
          <motion.div key="usn" 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.5 }}
            className="text-center space-y-4 z-10 p-8 relative">
            
            <UsnReveal usn={student.usn} className="text-amber-300/80 text-3xl md:text-5xl font-light tracking-[0.3em]" />
            <motion.p 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
               className="text-xs text-amber-500/60 uppercase tracking-widest mt-4 font-sans">
               Chapter {student.id}
            </motion.p>
          </motion.div>
        )}

        {stepId === "message" && (
          <motion.div key="message" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            transition={{ duration: 1.5 }}
            className="text-center z-10 p-8 max-w-2xl mx-auto">
            
            <StoryParagraph className="text-amber-100/90 text-2xl md:text-3xl font-normal leading-relaxed italic">
              Some moments are meant to be bathed in light, suspended in time forever.
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
