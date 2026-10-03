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

export default function Template10({ student, onAgain, onHome }: TemplateProps) {
  const { stepId, completed, skipToEnd, totalSteps, currentStep } = useStorySequence(STEPS);
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    if (stepId === "invitation" || completed) {
      setShowCard(true);
    }
  }, [stepId, completed]);

  if (showCard) {
    return <InvitationCard student={student} templateId={parseInt("10", 10)} onAgain={onAgain} onHome={onHome} />;
  }

  return (
    <div className="min-h-[100svh] bg-[#020617] text-white flex items-center justify-center relative overflow-hidden font-sans" onClick={!completed ? skipToEnd : undefined}>
      
      {/* Aurora Borealis Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div
           animate={{ 
             y: [0, -50, 0], 
             opacity: [0.3, 0.6, 0.3],
             scale: [1, 1.2, 1]
           }}
           transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
           className="absolute -top-[20%] -left-[10%] w-[120%] h-[60%] bg-gradient-to-br from-emerald-500/30 via-teal-500/20 to-transparent blur-[100px] rounded-full"
        />
        <motion.div
           animate={{ 
             y: [0, 50, 0], 
             opacity: [0.2, 0.5, 0.2],
             scale: [1, 1.1, 1]
           }}
           transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
           className="absolute top-[40%] -right-[20%] w-[100%] h-[80%] bg-gradient-to-tl from-indigo-500/30 via-purple-500/20 to-transparent blur-[120px] rounded-full"
        />
        <motion.div
           animate={{ 
             x: [0, -50, 0], 
             opacity: [0.1, 0.4, 0.1],
           }}
           transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 5 }}
           className="absolute bottom-0 left-[10%] w-[80%] h-[50%] bg-gradient-to-t from-emerald-400/20 via-transparent to-transparent blur-[80px] rounded-full"
        />
      </div>

      <NoiseOverlay opacity={0.05} />
      <ProgressIndicator current={currentStep} total={totalSteps} className="text-emerald-300" />

      <AnimatePresence mode="wait">
        {stepId === "intro" && (
          <motion.div key="intro" 
            initial={{ opacity: 0, filter: "blur(20px)", scale: 1.1 }} 
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }} 
            exit={{ opacity: 0, filter: "blur(20px)", scale: 0.9 }} 
            transition={{ duration: 2 }}
            className="text-center space-y-4 z-10 p-8">
            <CinematicText className="text-sm md:text-base uppercase tracking-[1em] text-emerald-200/80 font-light ml-[1em]">
              ILLUMINATION
            </CinematicText>
          </motion.div>
        )}

        {stepId === "name" && (
          <motion.div key="name" 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -30 }} 
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-center space-y-6 z-10 p-8">
            
            <CinematicText className="text-xs uppercase tracking-[0.5em] text-emerald-300/50 mb-2 block">PRESENCE DETECTED</CinematicText>
            <NameReveal name={student.name} delay={0.5} className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-white to-teal-200 text-5xl md:text-7xl font-light tracking-wide drop-shadow-[0_0_15px_rgba(52,211,153,0.3)]" />
            
          </motion.div>
        )}

        {stepId === "usn" && (
          <motion.div key="usn" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="text-center space-y-4 z-10 p-8 relative">
            <div className="absolute inset-0 bg-emerald-500/10 blur-2xl rounded-full" />
            <UsnReveal usn={student.usn} className="text-white text-4xl md:text-6xl font-extralight tracking-[0.4em]" />
            <motion.p 
               initial={{ opacity: 0, letterSpacing: "0em" }} 
               animate={{ opacity: 0.6, letterSpacing: "0.2em" }} 
               transition={{ delay: 1, duration: 1 }}
               className="text-xs text-emerald-200 uppercase mt-4">
               SIGNATURE: {student.id}
            </motion.p>
          </motion.div>
        )}

        {stepId === "message" && (
          <motion.div key="message" 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 1.05 }} 
            transition={{ duration: 1.5 }}
            className="text-center z-10 p-8 max-w-2xl mx-auto">
            
            <StoryParagraph className="text-emerald-50 text-2xl md:text-4xl font-light leading-relaxed drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
              Look up. The sky is putting on a show just for you.
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
