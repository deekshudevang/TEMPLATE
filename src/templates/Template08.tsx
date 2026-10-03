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

export default function Template08({ student, onAgain, onHome }: TemplateProps) {
  const { stepId, completed, skipToEnd, totalSteps, currentStep } = useStorySequence(STEPS);
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    if (stepId === "invitation" || completed) {
      setShowCard(true);
    }
  }, [stepId, completed]);

  if (showCard) {
    return <InvitationCard student={student} templateId={parseInt("08", 10)} onAgain={onAgain} onHome={onHome} />;
  }

  return (
    <div className="min-h-[100svh] bg-gradient-to-br from-indigo-900 via-purple-900 to-rose-900 text-white flex items-center justify-center relative overflow-hidden" onClick={!completed ? skipToEnd : undefined}>
      
      {/* Abstract Orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
           animate={{ x: [-100, 100, -100], y: [-50, 150, -50], rotate: [0, 90, 0] }}
           transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
           className="absolute top-[10%] left-[20%] w-[40vw] h-[40vw] bg-rose-500/40 rounded-full blur-[80px]"
        />
        <motion.div 
           animate={{ x: [100, -100, 100], y: [150, -50, 150], rotate: [0, -90, 0] }}
           transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
           className="absolute bottom-[10%] right-[20%] w-[50vw] h-[50vw] bg-blue-500/40 rounded-full blur-[100px]"
        />
      </div>

      {/* Glassmorphism Overlay Pane */}
      <motion.div 
        layout
        className="absolute inset-4 md:inset-12 lg:inset-24 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[3rem] shadow-2xl z-0 overflow-hidden"
      >
        <NoiseOverlay opacity={0.05} />
      </motion.div>

      <ProgressIndicator current={currentStep} total={totalSteps} className="text-white/70" />

      <AnimatePresence mode="wait">
        {stepId === "intro" && (
          <motion.div key="intro" 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -30 }} 
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-center space-y-4 z-10 p-8">
            <CinematicText className="text-xs md:text-sm uppercase tracking-[0.8em] text-white/80 font-light">
              CLARITY
            </CinematicText>
          </motion.div>
        )}

        {stepId === "name" && (
          <motion.div key="name" 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 1.05 }} 
            transition={{ duration: 1.2 }}
            className="text-center space-y-6 z-10 p-8">
            <CinematicText className="text-xs uppercase tracking-[0.4em] text-white/60 mb-2 block">REVEAL</CinematicText>
            <NameReveal name={student.name} delay={0.3} className="text-white text-5xl md:text-7xl font-light tracking-wide capitalize" />
          </motion.div>
        )}

        {stepId === "usn" && (
          <motion.div key="usn" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="text-center space-y-4 z-10 p-8">
            <UsnReveal usn={student.usn} className="text-white/90 text-4xl md:text-6xl font-extralight tracking-[0.4em]" />
            <motion.p 
               initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
               className="text-xs text-white/50 uppercase tracking-widest mt-4">
               {student.id}
            </motion.p>
          </motion.div>
        )}

        {stepId === "message" && (
          <motion.div key="message" 
            initial={{ opacity: 0, filter: "blur(10px)" }} 
            animate={{ opacity: 1, filter: "blur(0px)" }} 
            exit={{ opacity: 0, filter: "blur(10px)" }} 
            transition={{ duration: 1.5 }}
            className="text-center z-10 p-8 max-w-2xl mx-auto">
            
            <StoryParagraph className="text-white/90 text-2xl md:text-4xl font-light leading-relaxed">
              Through the glass, the future is clear. Step into the light.
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
