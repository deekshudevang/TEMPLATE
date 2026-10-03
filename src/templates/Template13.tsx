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

export default function Template13({ student, onAgain, onHome }: TemplateProps) {
  const { stepId, completed, skipToEnd, totalSteps, currentStep } = useStorySequence(STEPS);
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    if (stepId === "invitation" || completed) {
      setShowCard(true);
    }
  }, [stepId, completed]);

  if (showCard) {
    return <InvitationCard student={student} templateId={parseInt("13", 10)} onAgain={onAgain} onHome={onHome} />;
  }

  return (
    <div className="min-h-[100svh] bg-[#000022] text-white flex items-center justify-center relative overflow-hidden font-sans" onClick={!completed ? skipToEnd : undefined}>
      
      {/* Vaporwave Sun */}
      <div className="absolute top-[20%] w-[60vw] h-[60vw] max-w-[400px] max-h-[400px] rounded-full bg-gradient-to-b from-[#FF71CE] via-[#01CDFE] to-[#05FFA1] opacity-60 mix-blend-screen overflow-hidden">
        {/* Sun stripes */}
        <div className="absolute bottom-0 w-full h-[40%] flex flex-col justify-end space-y-1 md:space-y-2 pb-2">
           {[...Array(6)].map((_, i) => (
             <div key={i} className="w-full bg-[#000022]" style={{ height: `${2 + i * 2}px` }} />
           ))}
        </div>
      </div>
      
      {/* Grid Floor */}
      <div 
         className="absolute bottom-0 w-full h-[30vh] border-t-2 border-[#FF71CE] bg-[linear-gradient(transparent_95%,rgba(255,113,206,0.5)_100%),linear-gradient(90deg,transparent_95%,rgba(1,205,254,0.5)_100%)] bg-[length:40px_40px] opacity-40 transform perspective-[500px] rotateX-[60deg] origin-top"
      />

      <NoiseOverlay opacity={0.15} />
      <ProgressIndicator current={currentStep} total={totalSteps} className="text-[#05FFA1]" />

      <AnimatePresence mode="wait">
        {stepId === "intro" && (
          <motion.div key="intro" 
            initial={{ opacity: 0, y: 50 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -50 }} 
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-center space-y-4 z-10 p-8">
            <CinematicText className="text-3xl md:text-5xl uppercase tracking-[0.3em] text-[#FF71CE] font-bold drop-shadow-[2px_2px_0px_#01CDFE]">
              A E S T H E T I C
            </CinematicText>
          </motion.div>
        )}

        {stepId === "name" && (
          <motion.div key="name" 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 1.1 }} 
            transition={{ duration: 1 }}
            className="text-center space-y-6 z-10 p-8 bg-black/40 backdrop-blur-sm border-y-2 border-[#01CDFE] py-12 w-full">
            
            <CinematicText className="text-sm uppercase tracking-[0.5em] text-[#05FFA1] mb-2 block">USER RECOGNIZED</CinematicText>
            
            <NameReveal name={student.name} delay={0.3} className="text-white text-5xl md:text-7xl font-bold tracking-widest drop-shadow-[3px_3px_0px_#FF71CE]" />
            
          </motion.div>
        )}

        {stepId === "usn" && (
          <motion.div key="usn" 
            initial={{ opacity: 0, y: -30 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 1 }}
            className="text-center space-y-4 z-10 p-8 relative">
            
            <UsnReveal usn={student.usn} className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF71CE] to-[#01CDFE] text-4xl md:text-6xl font-black tracking-[0.3em] drop-shadow-[0_0_10px_rgba(255,113,206,0.5)]" />
            <motion.div 
               initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1, delay: 0.8 }}
               className="h-1 bg-gradient-to-r from-[#01CDFE] to-[#05FFA1] mx-auto mt-4"
            />
            <p className="text-xs text-white uppercase tracking-[0.4em] mt-4">SERIAL: {student.id}</p>
          </motion.div>
        )}

        {stepId === "message" && (
          <motion.div key="message" 
            initial={{ opacity: 0, filter: "blur(10px)" }} 
            animate={{ opacity: 1, filter: "blur(0px)" }} 
            exit={{ opacity: 0, filter: "blur(10px)" }} 
            transition={{ duration: 1.2 }}
            className="text-center z-10 p-8 max-w-2xl mx-auto">
            
            <StoryParagraph className="text-white text-2xl md:text-4xl font-bold italic tracking-wide leading-relaxed drop-shadow-[2px_2px_0px_#B967FF]">
              Ride the wave into a neon-drenched future.
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
