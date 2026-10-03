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

export default function Template09({ student, onAgain, onHome }: TemplateProps) {
  const { stepId, completed, skipToEnd, totalSteps, currentStep } = useStorySequence(STEPS);
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    if (stepId === "invitation" || completed) {
      setShowCard(true);
    }
  }, [stepId, completed]);

  if (showCard) {
    return <InvitationCard student={student} templateId={parseInt("09", 10)} onAgain={onAgain} onHome={onHome} />;
  }

  return (
    <div className="min-h-[100svh] bg-[#111] text-white flex items-center justify-center relative overflow-hidden font-mono" onClick={!completed ? skipToEnd : undefined}>
      
      {/* VHS Scanlines & Noise */}
      <NoiseOverlay opacity={0.3} />
      <div className="absolute inset-0 pointer-events-none z-40 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px]" />
      
      {/* VHS Tracking Glitch */}
      <motion.div 
        animate={{ 
          top: ["-10%", "110%", "-10%"],
          opacity: [0, 0.5, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-16 bg-white/5 blur-sm z-30 pointer-events-none"
      />

      <div className="absolute top-8 right-8 z-50 flex items-center space-x-2 text-[#00FF00] font-bold text-xl">
        <motion.div animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }} className="w-3 h-3 rounded-full bg-[#00FF00]" />
        <span>PLAY</span>
      </div>
      
      <div className="absolute bottom-8 left-8 z-50 text-white/50 text-sm md:text-xl uppercase">
        SP 0:0{currentStep}:00
      </div>

      <AnimatePresence mode="wait">
        {stepId === "intro" && (
          <motion.div key="intro" 
            initial={{ opacity: 0, skewX: 10 }} 
            animate={{ opacity: 1, skewX: 0 }} 
            exit={{ opacity: 0, skewX: -10 }} 
            transition={{ duration: 0.5 }}
            className="text-center space-y-4 z-10 p-8">
            <CinematicText className="text-4xl md:text-6xl uppercase tracking-[0.2em] text-[#FFCC00] font-black italic drop-shadow-[2px_2px_0px_#FF0000,-2px_-2px_0px_#0000FF]">
              PRESS START
            </CinematicText>
          </motion.div>
        )}

        {stepId === "name" && (
          <motion.div key="name" 
            initial={{ opacity: 0, scale: 0.8, filter: "contrast(200%) brightness(150%) blur(5px)" }} 
            animate={{ opacity: 1, scale: 1, filter: "contrast(100%) brightness(100%) blur(0px)" }} 
            exit={{ opacity: 0, y: 100 }} 
            transition={{ duration: 0.8 }}
            className="text-center space-y-4 z-10 p-8 bg-blue-900/40 border-4 border-blue-500 p-12 shadow-[0_0_20px_#0000FF]">
            
            <CinematicText className="text-sm uppercase tracking-[0.3em] text-[#FFCC00] mb-4 font-bold">PLAYER 1</CinematicText>
            
            <NameReveal name={student.name} delay={0.2} className="text-white text-5xl md:text-7xl font-black uppercase tracking-tighter drop-shadow-[3px_3px_0px_#000]" />
            
          </motion.div>
        )}

        {stepId === "usn" && (
          <motion.div key="usn" 
            initial={{ opacity: 0, x: -100 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.5, type: "tween" }}
            className="text-center space-y-4 z-10 p-8 relative">
            <CinematicText className="text-sm uppercase tracking-[0.3em] text-white/70 block mb-4">SAVE DATA</CinematicText>
            <div className="bg-black border-2 border-white p-6 inline-block">
               <UsnReveal usn={student.usn} className="text-[#00FF00] text-4xl md:text-6xl font-bold tracking-[0.2em]" />
            </div>
            <p className="text-xs text-white/50 uppercase tracking-widest mt-4">ID: {student.id}</p>
          </motion.div>
        )}

        {stepId === "message" && (
          <motion.div key="message" 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 1.1 }} 
            transition={{ duration: 0.5 }}
            className="text-center z-10 p-8 max-w-2xl mx-auto">
            
            <StoryParagraph className="text-white text-2xl md:text-4xl font-bold uppercase tracking-widest leading-relaxed drop-shadow-[2px_2px_0px_#FF00FF]">
              Fast forward to the best part of the tape.
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
