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

export default function Template14({ student, onAgain, onHome }: TemplateProps) {
  const { stepId, completed, skipToEnd, totalSteps, currentStep } = useStorySequence(STEPS);
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    if (stepId === "invitation" || completed) {
      setShowCard(true);
    }
  }, [stepId, completed]);

  if (showCard) {
    return <InvitationCard student={student} templateId={parseInt("14", 10)} onAgain={onAgain} onHome={onHome} />;
  }

  return (
    <div className="min-h-[100svh] bg-[#FAFAFA] text-[#111111] flex items-center justify-center relative overflow-hidden font-sans" onClick={!completed ? skipToEnd : undefined}>
      
      <NoiseOverlay opacity={0.03} />
      <ProgressIndicator current={currentStep} total={totalSteps} className="text-[#111111]" />

      {/* Very subtle expanding circle */}
      <motion.div 
         initial={{ scale: 0, opacity: 0 }}
         animate={{ scale: 1, opacity: 0.02 }}
         transition={{ duration: 10, ease: "easeOut" }}
         className="absolute w-[80vw] h-[80vw] border-[1px] border-black rounded-full pointer-events-none"
      />

      <AnimatePresence mode="wait">
        {stepId === "intro" && (
          <motion.div key="intro" 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }} 
            transition={{ duration: 2, ease: "easeInOut" }}
            className="text-center space-y-4 z-10 p-8">
            <CinematicText className="text-xs uppercase tracking-[0.5em] text-[#555] font-light">
              SIMPLICITY
            </CinematicText>
          </motion.div>
        )}

        {stepId === "name" && (
          <motion.div key="name" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            transition={{ duration: 1.5 }}
            className="text-center space-y-6 z-10 p-8">
            
            <NameReveal name={student.name} delay={0.5} className="text-[#111] text-4xl md:text-6xl font-light tracking-wide" />
            <motion.div 
               initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1, duration: 1 }}
               className="h-px w-24 bg-[#333] mx-auto origin-center"
            />
            
          </motion.div>
        )}

        {stepId === "usn" && (
          <motion.div key="usn" 
            initial={{ opacity: 0, scale: 0.98 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 1.5 }}
            className="text-center space-y-4 z-10 p-8 relative flex flex-col items-center">
            
            <UsnReveal usn={student.usn} className="text-[#333] text-3xl md:text-5xl font-light tracking-[0.2em]" />
            <motion.p 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
               className="text-[10px] text-[#777] uppercase tracking-[0.3em] mt-6">
               ID: {student.id}
            </motion.p>
          </motion.div>
        )}

        {stepId === "message" && (
          <motion.div key="message" 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -10 }} 
            transition={{ duration: 2 }}
            className="text-center z-10 p-8 max-w-2xl mx-auto">
            
            <StoryParagraph className="text-[#111] text-xl md:text-2xl font-light leading-loose tracking-wide">
              Breathe in.
              <br/><br/>
              Embrace the empty space. Find focus in the minimal.
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
