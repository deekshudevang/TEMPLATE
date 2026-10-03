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
  { id: "lock", duration: 3000 },
  { id: "decrypt", duration: 4500 },
  { id: "reveal", duration: 4000 },
  { id: "message", duration: 4500 },
  { id: "finale", duration: 4000 },
  { id: "invitation", duration: 0 },
];

const GOLD = "#D4AF37";

// Helper for the slot machine effect
const CryptexRings = ({ usn }: { usn: string }) => {
  const chars = usn.split("");
  
  return (
    <div className="flex gap-2 sm:gap-4 items-center justify-center font-mono text-3xl sm:text-5xl font-bold text-[#D4AF37]">
      {chars.map((char, i) => (
        <div key={i} className="h-16 sm:h-24 w-12 sm:w-16 overflow-hidden relative border-y-2 border-[#D4AF37]/40 bg-gradient-to-b from-[#1a1710] via-[#2a2515] to-[#1a1710] shadow-[inset_0_10px_20px_rgba(0,0,0,0.8)]">
          <motion.div
            initial={{ y: "0%" }}
            animate={{ y: "-80%" }}
            transition={{
              duration: 2 + i * 0.3,
              ease: [0.2, 0.8, 0.2, 1], // Custom bounce/snap ease
            }}
            className="absolute top-0 left-0 w-full flex flex-col items-center justify-start text-center"
          >
            {/* Fake characters for the spin */}
            {Array.from({ length: 15 }).map((_, j) => (
              <div key={j} className="h-16 sm:h-24 flex items-center justify-center opacity-30">
                {String.fromCharCode(65 + Math.floor(Math.random() * 26))}
              </div>
            ))}
            {/* The final character */}
            <div className="h-16 sm:h-24 flex items-center justify-center text-[#FFF5D1] drop-shadow-[0_0_10px_rgba(212,175,55,0.8)]">
              {char}
            </div>
          </motion.div>
        </div>
      ))}
    </div>
  );
};

export default function Template01({ student, onAgain, onHome }: TemplateProps) {
  const { stepId, completed, skipToEnd, totalSteps, currentStep } = useStorySequence(STEPS);
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    if (stepId === "invitation" || completed) {
      setShowCard(true);
    }
  }, [stepId, completed]);

  if (showCard) {
    return <InvitationCard student={student} templateId={1} onAgain={onAgain} onHome={onHome} />;
  }

  return (
    <div className="min-h-[100svh] bg-[#0A0908] text-[#D4AF37] flex items-center justify-center relative overflow-hidden" onClick={!completed ? skipToEnd : undefined}>
      <NoiseOverlay opacity={0.15} />
      <ProgressIndicator current={currentStep} total={totalSteps} />

      <AnimatePresence mode="wait">
        {stepId === "lock" && (
          <motion.div key="lock" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center flex flex-col items-center justify-center z-10 w-full">
            <motion.div 
              initial={{ rotate: -90, scale: 0.8 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="relative w-48 h-48 flex items-center justify-center"
            >
              <div className="absolute inset-0 rounded-full border border-[#D4AF37]/20 border-dashed animate-[spin_10s_linear_infinite]" />
              <div className="absolute inset-4 rounded-full border-2 border-[#D4AF37]/40 animate-[spin_15s_linear_infinite_reverse]" />
              <div className="absolute inset-8 rounded-full border border-[#D4AF37]/60" />
              <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center backdrop-blur-md border border-[#D4AF37]">
                <div className="w-2 h-8 bg-[#D4AF37] rounded-full" />
              </div>
            </motion.div>
            <p className="mt-8 text-[10px] uppercase tracking-[0.5em] text-[#D4AF37]/50">The Cryptex is Sealed</p>
          </motion.div>
        )}

        {stepId === "decrypt" && (
          <motion.div key="decrypt" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center w-full max-w-2xl px-4 z-10">
            <p className="mb-8 text-[10px] uppercase tracking-[0.4em] text-[#D4AF37]/60">Decrypting Access Code</p>
            <CryptexRings usn={student.usn} />
            <motion.p 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 3, duration: 1 }}
              className="mt-8 text-sm text-[#D4AF37] font-serif italic"
            >
              Identity Confirmed.
            </motion.p>
          </motion.div>
        )}

        {stepId === "reveal" && (
          <motion.div key="reveal" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="text-center space-y-6 z-10 p-8 w-full">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.15)_0%,transparent_60%)] pointer-events-none" />
            <CinematicText className="text-[10px] uppercase tracking-[0.4em] text-[#D4AF37]/50">
              The Scroll Opens For
            </CinematicText>
            <NameReveal name={student.name} delay={0.2} className="text-[#FFF5D1] font-serif text-4xl sm:text-6xl drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]" />
          </motion.div>
        )}

        {stepId === "message" && (
          <motion.div key="message" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center z-10 p-8 max-w-lg mx-auto relative">
            <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-transparent via-[#D4AF37]/50 to-transparent" />
            <div className="absolute top-0 bottom-0 right-0 w-px bg-gradient-to-b from-transparent via-[#D4AF37]/50 to-transparent" />
            
            <p className="text-[#FFF5D1]/90 font-serif leading-relaxed sm:text-lg px-6">
              Ancient wisdom meets modern ambition. Your name has been etched into the legacy of {EVENT.college}. Step forward into the light of knowledge and claim your destiny.
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
