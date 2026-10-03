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

export default function Template07({ student, onAgain, onHome }: TemplateProps) {
  const { stepId, completed, skipToEnd, totalSteps, currentStep } = useStorySequence(STEPS);
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    if (stepId === "invitation" || completed) {
      setShowCard(true);
    }
  }, [stepId, completed]);

  if (showCard) {
    return <InvitationCard student={student} templateId={parseInt("07", 10)} onAgain={onAgain} onHome={onHome} />;
  }

  return (
    <div className="min-h-[100svh] bg-[#090014] text-white flex items-center justify-center relative overflow-hidden font-sans" onClick={!completed ? skipToEnd : undefined}>
      <NoiseOverlay opacity={0.12} />
      
      {/* Neon Tokyo Background */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <motion.div 
          animate={{ opacity: [0.3, 0.6, 0.3], y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[30vw] h-[30vw] bg-[#FF00FF] rounded-full blur-[100px] mix-blend-screen"
        />
        <motion.div 
          animate={{ opacity: [0.2, 0.5, 0.2], y: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] bg-[#00FFFF] rounded-full blur-[120px] mix-blend-screen"
        />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMDAwIi8+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMzMzMiLz4KPC9zdmc+')] opacity-30 mix-blend-overlay" />
      </div>

      <ProgressIndicator current={currentStep} total={totalSteps} className="text-[#FF00FF]" />

      <AnimatePresence mode="wait">
        {stepId === "intro" && (
          <motion.div key="intro" 
            initial={{ opacity: 0, y: 50, filter: "blur(10px)" }} 
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} 
            exit={{ opacity: 0, y: -50, filter: "blur(10px)" }} 
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-center space-y-4 z-10 p-8 flex flex-col items-center">
            
            <motion.div
               animate={{ textShadow: ["0 0 10px #FF00FF, 0 0 20px #FF00FF, 0 0 30px #FF00FF", "0 0 5px #FF00FF, 0 0 10px #FF00FF, 0 0 15px #FF00FF", "0 0 10px #FF00FF, 0 0 20px #FF00FF, 0 0 30px #FF00FF"] }}
               transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <CinematicText className="text-2xl uppercase tracking-[0.5em] text-white font-bold">
                NEON NIGHTS
              </CinematicText>
            </motion.div>
            
            <div className="text-[#00FFFF] text-xs uppercase tracking-widest font-mono pt-4">INITIALIZING SEQUENCE</div>
          </motion.div>
        )}

        {stepId === "name" && (
          <motion.div key="name" 
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 1.2, filter: "blur(20px)" }} 
            transition={{ duration: 1 }}
            className="text-center space-y-6 z-10 p-8">
            
            <CinematicText className="text-xs uppercase tracking-[0.4em] text-[#00FFFF] mb-4 block">IDENTIFIED</CinematicText>
            
            <div className="relative inline-block">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: "100%" }}
                 transition={{ duration: 0.5, ease: "easeInOut" }}
                 className="absolute -left-4 -top-4 w-4 h-4 border-t-2 border-l-2 border-[#FF00FF]"
               />
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: "100%" }}
                 transition={{ duration: 0.5, ease: "easeInOut", delay: 0.2 }}
                 className="absolute -right-4 -bottom-4 w-4 h-4 border-b-2 border-r-2 border-[#00FFFF]"
               />
               <NameReveal name={student.name} delay={0.4} className="text-white text-5xl md:text-7xl font-bold uppercase tracking-widest drop-shadow-[0_0_15px_rgba(255,0,255,0.8)]" />
            </div>
            
          </motion.div>
        )}

        {stepId === "usn" && (
          <motion.div key="usn" 
            initial={{ opacity: 0, x: 100 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="text-center space-y-4 z-10 p-8 relative flex flex-col items-center">
            
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-px bg-[#FF00FF]" />
              <CinematicText className="text-xs uppercase tracking-[0.3em] text-white">ACCESS KEY</CinematicText>
              <div className="w-12 h-px bg-[#00FFFF]" />
            </div>
            
            <UsnReveal usn={student.usn} className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF00FF] to-[#00FFFF] text-5xl md:text-7xl font-black tracking-[0.2em]" />
            
            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 1 }}
               className="mt-6 border border-white/20 bg-white/5 backdrop-blur px-4 py-2 text-xs tracking-widest uppercase font-mono"
            >
              ID: {student.id}
            </motion.div>
          </motion.div>
        )}

        {stepId === "message" && (
          <motion.div key="message" 
            initial={{ opacity: 0, scale: 1.1 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }} 
            transition={{ duration: 1.2 }}
            className="text-center z-10 p-8 max-w-3xl mx-auto">
            
            <StoryParagraph className="text-white text-2xl md:text-4xl font-bold uppercase tracking-wide leading-tight drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]">
              Light up the dark.
              <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF00FF] to-[#00FFFF]">Leave your mark on the city.</span>
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
