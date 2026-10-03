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

export default function Template12({ student, onAgain, onHome }: TemplateProps) {
  const { stepId, completed, skipToEnd, totalSteps, currentStep } = useStorySequence(STEPS);
  const [showCard, setShowCard] = useState(false);
  const [matrixText, setMatrixText] = useState("");

  useEffect(() => {
    if (stepId === "invitation" || completed) {
      setShowCard(true);
    }
  }, [stepId, completed]);

  // Matrix background effect
  useEffect(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~";
    const generateColumn = () => {
        let col = "";
        for(let i=0; i<30; i++) col += chars.charAt(Math.floor(Math.random() * chars.length)) + "\n";
        return col;
    };
    
    const interval = setInterval(() => {
        setMatrixText(generateColumn());
    }, 100);
    
    return () => clearInterval(interval);
  }, []);

  if (showCard) {
    return <InvitationCard student={student} templateId={parseInt("12", 10)} onAgain={onAgain} onHome={onHome} />;
  }

  return (
    <div className="min-h-[100svh] bg-black text-[#00FF41] flex items-center justify-center relative overflow-hidden font-mono" onClick={!completed ? skipToEnd : undefined}>
      
      {/* Matrix Falling Code Background */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-20 pointer-events-none flex justify-around text-xs leading-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div 
            key={i}
            initial={{ y: -1000 }}
            animate={{ y: 1000 }}
            transition={{ duration: Math.random() * 5 + 5, repeat: Infinity, ease: "linear", delay: Math.random() * -10 }}
            className="whitespace-pre flex-col text-center"
            style={{ textShadow: "0 0 5px #00FF41" }}
          >
            {matrixText}
          </motion.div>
        ))}
      </div>

      <NoiseOverlay opacity={0.1} />
      <ProgressIndicator current={currentStep} total={totalSteps} className="text-[#00FF41]" />

      <AnimatePresence mode="wait">
        {stepId === "intro" && (
          <motion.div key="intro" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            transition={{ duration: 0.5 }}
            className="text-left w-full max-w-2xl mx-auto space-y-4 z-10 p-8">
            <motion.div
               initial={{ width: "0%" }}
               animate={{ width: "100%" }}
               transition={{ duration: 2, ease: "linear" }}
               className="overflow-hidden whitespace-nowrap"
            >
              <CinematicText className="text-xl uppercase tracking-widest text-[#00FF41] font-bold">
                &gt; WAKE UP, USER...
              </CinematicText>
            </motion.div>
            <motion.div animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.8, repeat: Infinity }} className="w-4 h-6 bg-[#00FF41]" />
          </motion.div>
        )}

        {stepId === "name" && (
          <motion.div key="name" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            transition={{ duration: 0.5 }}
            className="text-left w-full max-w-2xl mx-auto space-y-4 z-10 p-8 border-l-2 border-[#00FF41]">
            
            <CinematicText className="text-xs uppercase tracking-widest text-[#00FF41]/70 mb-2 block">
              &gt; DECRYPTING ALIAS...
            </CinematicText>
            
            <NameReveal name={student.name} delay={0.5} className="text-white text-5xl md:text-7xl font-bold uppercase tracking-widest drop-shadow-[0_0_8px_#00FF41]" />
            
          </motion.div>
        )}

        {stepId === "usn" && (
          <motion.div key="usn" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-4 z-10 p-8 relative bg-black/80 border border-[#00FF41]/50 p-12">
            
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#00FF41]" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#00FF41]" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#00FF41]" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#00FF41]" />

            <CinematicText className="text-xs uppercase tracking-[0.3em] text-[#00FF41]/70 block mb-4">ACCESS_TOKEN:</CinematicText>
            <UsnReveal usn={student.usn} className="text-white text-4xl md:text-6xl font-bold tracking-[0.2em]" />
            <p className="text-xs text-[#00FF41]/50 uppercase tracking-widest mt-4">SYS_ID: {student.id}</p>
          </motion.div>
        )}

        {stepId === "message" && (
          <motion.div key="message" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            transition={{ duration: 0.5 }}
            className="text-center z-10 p-8 max-w-2xl mx-auto">
            
            <StoryParagraph className="text-[#00FF41] text-xl md:text-2xl font-bold uppercase tracking-widest leading-loose bg-[#00FF41]/10 p-8 border-y border-[#00FF41]/30">
              The construct is ready. Enter the system.
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
