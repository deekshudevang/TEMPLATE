"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { TemplateProps } from "./types";
import { useStorySequence } from "@/components/story/useStorySequence";
import { CinematicText, NameReveal, ProgressIndicator, NoiseOverlay, TapToContinue } from "@/components/story/Primitives";
import { InvitationCard } from "@/components/story/InvitationCard";
import { Finale } from "@/components/story/Finale";
import { EVENT } from "@/config/event";

const STEPS = [
  { id: "envelope", duration: 3000 },
  { id: "unfold1", duration: 3000 },
  { id: "unfold2", duration: 3500 },
  { id: "name", duration: 4000 },
  { id: "message", duration: 4500 },
  { id: "finale", duration: 4000 },
  { id: "invitation", duration: 0 },
];

const ORIGAMI = "#F5D5C6"; // Soft pastel peach/pink

export default function Template03({ student, onAgain, onHome }: TemplateProps) {
  const { stepId, completed, skipToEnd, totalSteps, currentStep } = useStorySequence(STEPS);
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    if (stepId === "invitation" || completed) {
      setShowCard(true);
    }
  }, [stepId, completed]);

  if (showCard) {
    return <InvitationCard student={student} templateId={3} onAgain={onAgain} onHome={onHome} />;
  }

  return (
    <div className="min-h-[100svh] bg-[#F9F7F5] text-[#8C7A70] flex items-center justify-center relative overflow-hidden" onClick={!completed ? skipToEnd : undefined}>
      <NoiseOverlay opacity={0.3} />
      
      {/* Soft gradient backgrounds for "studio lighting" effect */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.8),transparent_50%)] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,rgba(245,213,198,0.4),transparent_50%)] pointer-events-none" />

      <ProgressIndicator current={currentStep} total={totalSteps} />

      <AnimatePresence mode="wait">
        {stepId === "envelope" && (
          <motion.div key="envelope" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center flex flex-col items-center justify-center z-10 w-full">
            <motion.div
              initial={{ rotate: 45, scale: 0.8 }}
              animate={{ rotate: 45, scale: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="w-32 h-32 bg-white shadow-xl flex items-center justify-center border border-[#F5D5C6]/30 relative"
            >
              <div className="absolute inset-0 border-t border-l border-[#F5D5C6]/50 shadow-[inset_2px_2px_10px_rgba(0,0,0,0.02)]" />
              <div className="w-16 h-16 bg-[#F9F7F5] shadow-inner" />
            </motion.div>
            <p className="mt-12 text-xs tracking-[0.4em] text-[#8C7A70]/60 uppercase">The Folded Bloom</p>
          </motion.div>
        )}

        {stepId === "unfold1" && (
          <motion.div key="unfold1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center w-full max-w-2xl px-4 z-10 flex flex-col items-center justify-center">
            <div className="relative w-48 h-48">
              {/* Four petals unfolding outwards */}
              {[0, 90, 180, 270].map((rot, i) => (
                <motion.div
                  key={i}
                  initial={{ rotate: rot, originX: 0.5, originY: 1, scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 1.5, delay: i * 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute top-0 left-1/2 -ml-12 w-24 h-24 bg-white/80 backdrop-blur-sm border border-[#F5D5C6]/40 shadow-sm"
                  style={{ transformOrigin: "bottom center" }}
                />
              ))}
              <div className="absolute inset-0 flex items-center justify-center font-serif text-[#8C7A70] text-xl z-20 bg-white/40 backdrop-blur-md rounded-full shadow-inner w-16 h-16 m-auto">
                {student.usn.slice(0, 3)}
              </div>
            </div>
            <p className="mt-12 text-xs tracking-[0.4em] text-[#8C7A70]/50 uppercase">Opening Layers</p>
          </motion.div>
        )}

        {stepId === "unfold2" && (
          <motion.div key="unfold2" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.2 }} className="text-center z-10 p-4 flex flex-col items-center justify-center">
             <div className="relative w-64 h-64">
              {/* Complex inner petals */}
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ rotate: i * 45, originX: 0.5, originY: 1, scale: 0 }}
                  animate={{ scale: 1, rotate: i * 45 + 22.5 }}
                  transition={{ duration: 2, ease: "easeOut" }}
                  className="absolute top-0 left-1/2 -ml-16 w-32 h-32 rounded-t-full bg-gradient-to-t from-white/10 to-[#F5D5C6]/30 border border-[#F5D5C6]/50"
                  style={{ transformOrigin: "bottom center" }}
                />
              ))}
            </div>
            <p className="mt-12 text-[10px] tracking-[0.5em] text-[#8C7A70]/40 uppercase">Reaching The Center</p>
          </motion.div>
        )}

        {stepId === "name" && (
          <motion.div key="name" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center z-10 p-8 w-full">
            <CinematicText className="text-[10px] uppercase tracking-[0.4em] text-[#8C7A70]/60 mb-6">
              A New Blossom
            </CinematicText>
            <NameReveal name={student.name} delay={0.2} className="text-[#6D5A50] font-serif text-4xl sm:text-6xl drop-shadow-sm" />
          </motion.div>
        )}

        {stepId === "message" && (
          <motion.div key="message" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="text-center z-10 p-8 max-w-lg mx-auto relative bg-white/40 backdrop-blur-md border border-white/60 shadow-xl rounded-sm">
            <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-[#F5D5C6]" />
            <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-[#F5D5C6]" />
            <p className="text-[#8C7A70] font-serif leading-loose sm:text-lg italic px-4 py-6">
              Every fold of the past has shaped this moment. Unfurl your potential at {EVENT.college}. The future is a blank page waiting for your story.
            </p>
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
