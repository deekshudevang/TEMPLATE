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

export default function Template04({ student, onAgain, onHome }: TemplateProps) {
  const { stepId, completed, skipToEnd, totalSteps, currentStep } = useStorySequence(STEPS);
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    if (stepId === "invitation" || completed) {
      setShowCard(true);
    }
  }, [stepId, completed]);

  if (showCard) {
    return <InvitationCard student={student} templateId={parseInt("04", 10)} onAgain={onAgain} onHome={onHome} />;
  }

  return (
    <div className="min-h-[100svh] bg-[#020609] text-white flex items-center justify-center relative overflow-hidden font-mono" onClick={!completed ? skipToEnd : undefined}>
      <NoiseOverlay opacity={0.08} />
      
      {/* Neural Network Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#00FFCC]/20"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(40px)',
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
        
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00FFCC" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <ProgressIndicator current={currentStep} total={totalSteps} className="text-[#00FFCC]" />

      <AnimatePresence mode="wait">
        {stepId === "intro" && (
          <motion.div key="intro" 
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }} 
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="text-center space-y-4 z-10 p-8 flex flex-col items-center">
            
            <motion.div 
              animate={{ rotate: 360 }} 
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-24 h-24 border border-[#00FFCC]/30 rounded-full flex items-center justify-center border-dashed relative">
                <motion.div animate={{ rotate: -360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="w-16 h-16 border border-[#00FFCC]/50 rounded-full border-dotted" />
                <div className="absolute w-2 h-2 bg-[#00FFCC] rounded-full shadow-[0_0_10px_#00FFCC]" />
            </motion.div>
            
            <CinematicText className="text-xs uppercase tracking-[0.5em] text-[#00FFCC]">
              SYNAPTIC LINK ESTABLISHED
            </CinematicText>
          </motion.div>
        )}

        {stepId === "name" && (
          <motion.div key="name" 
            initial={{ opacity: 0, y: 50 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -50, filter: "blur(10px)" }} 
            transition={{ duration: 1 }}
            className="text-center space-y-4 z-10 p-8">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-px bg-gradient-to-r from-transparent via-[#00FFCC] to-transparent w-full mb-8 origin-left"
            />
            <CinematicText className="text-xs uppercase tracking-[0.3em] text-[#00FFCC]/60 mb-4 block">SUBJECT IDENTIFIED</CinematicText>
            <NameReveal name={student.name} delay={0.5} className="text-[#00FFCC] drop-shadow-[0_0_8px_rgba(0,255,204,0.8)] text-5xl md:text-7xl font-bold tracking-widest uppercase" />
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-px bg-gradient-to-r from-transparent via-[#00FFCC] to-transparent w-full mt-8 origin-right"
            />
          </motion.div>
        )}

        {stepId === "usn" && (
          <motion.div key="usn" 
            initial={{ opacity: 0, scale: 1.2 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 1 }}
            className="text-center space-y-6 z-10 p-8 relative">
            <div className="absolute inset-0 bg-[#00FFCC]/5 blur-3xl rounded-full" />
            <CinematicText className="text-xs uppercase tracking-[0.3em] text-white/50 block">NODE ASSIGNMENT</CinematicText>
            <UsnReveal usn={student.usn} className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] text-4xl md:text-6xl font-light tracking-[0.4em]" />
            <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
               className="inline-block px-4 py-1 border border-[#00FFCC]/30 bg-[#00FFCC]/10 text-xs text-[#00FFCC] uppercase tracking-widest mt-4">
              ID: {student.id}
            </motion.div>
          </motion.div>
        )}

        {stepId === "message" && (
          <motion.div key="message" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0, filter: "blur(20px)" }} 
            transition={{ duration: 1.5 }}
            className="text-center z-10 p-8 max-w-2xl mx-auto flex flex-col items-center">
            
            <motion.div
              animate={{ height: ["0%", "100%", "0%"], top: ["0%", "0%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-1/2 w-px bg-gradient-to-b from-transparent via-[#00FFCC] to-transparent -translate-x-1/2 z-0 opacity-50"
            />

            <StoryParagraph className="text-white/80 text-xl md:text-2xl font-light leading-relaxed tracking-wide mix-blend-screen bg-black/40 p-6 backdrop-blur-sm border border-[#00FFCC]/20 z-10">
              The network is vast. Your potential is limitless. Prepare to synchronize with the collective.
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
