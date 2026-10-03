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
  { id: "intro", duration: 3500 },
  { id: "name", duration: 4000 },
  { id: "usn", duration: 3500 },
  { id: "message", duration: 4000 },
  { id: "finale", duration: 4000 },
  { id: "invitation", duration: 0 },
];

const GlitchText = ({ text, className = "" }: { text: string; className?: string }) => (
  <div className={`relative inline-block ${className}`}>
    <motion.span
      animate={{ x: [-2, 2, -1, 1, 0], opacity: [1, 0.8, 1, 0.9, 1] }}
      transition={{ duration: 0.2, repeat: Infinity, repeatType: "mirror", repeatDelay: Math.random() * 2 + 1 }}
      className="absolute top-0 left-0 text-red-500 opacity-70 mix-blend-screen"
      style={{ transform: "translate(-2px, 2px)" }}
    >
      {text}
    </motion.span>
    <motion.span
      animate={{ x: [2, -2, 1, -1, 0], opacity: [1, 0.9, 1, 0.8, 1] }}
      transition={{ duration: 0.2, repeat: Infinity, repeatType: "mirror", repeatDelay: Math.random() * 2 + 0.5 }}
      className="absolute top-0 left-0 text-cyan-500 opacity-70 mix-blend-screen"
      style={{ transform: "translate(2px, -2px)" }}
    >
      {text}
    </motion.span>
    <span className="relative z-10 text-white">{text}</span>
  </div>
);

export default function Template06({ student, onAgain, onHome }: TemplateProps) {
  const { stepId, completed, skipToEnd, totalSteps, currentStep } = useStorySequence(STEPS);
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    if (stepId === "invitation" || completed) {
      setShowCard(true);
    }
  }, [stepId, completed]);

  if (showCard) {
    return <InvitationCard student={student} templateId={parseInt("06", 10)} onAgain={onAgain} onHome={onHome} />;
  }

  return (
    <div className="min-h-[100svh] bg-black text-white flex items-center justify-center relative overflow-hidden font-mono" onClick={!completed ? skipToEnd : undefined}>
      <NoiseOverlay opacity={0.15} />
      
      {/* Glitch Scanlines */}
      <div className="absolute inset-0 pointer-events-none z-50 opacity-10 bg-[linear-gradient(rgba(255,255,255,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />

      <ProgressIndicator current={currentStep} total={totalSteps} className="text-[#FF003C]" />

      <AnimatePresence mode="wait">
        {stepId === "intro" && (
          <motion.div key="intro" 
            initial={{ opacity: 0, scale: 1.5, rotate: 5 }} 
            animate={{ opacity: 1, scale: 1, rotate: 0 }} 
            exit={{ opacity: 0, scale: 0.5, rotate: -5 }} 
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            className="text-center space-y-4 z-10 p-8">
            <div className="border-4 border-[#FF003C] p-6 inline-block bg-black">
              <GlitchText text="PROTOCOL: AWAKEN" className="text-2xl md:text-4xl uppercase tracking-[0.2em] font-bold" />
            </div>
            <motion.div 
              animate={{ opacity: [1, 0, 1] }} 
              transition={{ duration: 0.1, repeat: 5, repeatDelay: 0.5 }}
              className="h-2 w-full bg-[#FF003C] mt-2" 
            />
          </motion.div>
        )}

        {stepId === "name" && (
          <motion.div key="name" 
            initial={{ opacity: 0, x: -100, skewX: 20 }} 
            animate={{ opacity: 1, x: 0, skewX: 0 }} 
            exit={{ opacity: 0, x: 100, skewX: -20 }} 
            transition={{ duration: 0.6, type: "spring" }}
            className="text-center space-y-4 z-10 p-8 bg-black/80 border-l-8 border-[#FF003C] py-12 px-8">
            
            <CinematicText className="text-xs uppercase tracking-[0.4em] text-[#FF003C] mb-4">USER OVERRIDE</CinematicText>
            
            <motion.div
               animate={{ filter: ["hue-rotate(0deg)", "hue-rotate(90deg)", "hue-rotate(0deg)"] }}
               transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
            >
              <NameReveal name={student.name} delay={0.2} className="text-white text-5xl md:text-7xl font-black uppercase tracking-tighter" />
            </motion.div>
            
          </motion.div>
        )}

        {stepId === "usn" && (
          <motion.div key="usn" 
            initial={{ opacity: 0, scale: 0.5 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 1.5 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-4 z-10 p-8 relative">
            
            <motion.div
               className="absolute inset-0 bg-[#FF003C] z-[-1]"
               initial={{ height: "0%" }}
               animate={{ height: "100%" }}
               exit={{ height: "0%" }}
               transition={{ duration: 0.3 }}
            />
            
            <CinematicText className="text-xs uppercase tracking-[0.3em] text-black bg-white px-2 py-1 inline-block mb-4 font-bold">ACCESS CODE</CinematicText>
            <UsnReveal usn={student.usn} className="text-white text-4xl md:text-6xl font-bold tracking-[0.2em] mix-blend-difference" />
            <p className="text-xs text-white/70 uppercase tracking-widest bg-black px-2 py-1 inline-block mt-4 border border-white/20">SEQ: {student.id}</p>
          </motion.div>
        )}

        {stepId === "message" && (
          <motion.div key="message" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            transition={{ duration: 0.5 }}
            className="text-center z-10 p-8 max-w-2xl mx-auto">
            
            <motion.div
               animate={{ y: [-5, 5, -5] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <StoryParagraph className="text-white text-xl md:text-2xl font-bold uppercase tracking-widest leading-loose bg-[#FF003C]/20 p-8 border border-[#FF003C]">
                <GlitchText text="THE SYSTEM IS YOURS TO BREAK. REWRITE THE RULES." />
              </StoryParagraph>
            </motion.div>
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
