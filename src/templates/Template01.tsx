"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { TemplateProps } from "../types";
import { useStorySequence } from "@/components/story/useStorySequence";
import { CinematicText, NameReveal, UsnReveal, StoryParagraph, ProgressIndicator, NoiseOverlay, TapToContinue } from "@/components/story/Primitives";
import { InvitationCard } from "@/components/story/InvitationCard";
import { Finale } from "@/components/story/Finale";
import { EVENT } from "@/config/event";

const STEPS = [
  { id: "seal", duration: 3000 },
  { id: "welcome", duration: 3500 },
  { id: "name", duration: 3500 },
  { id: "usn", duration: 2500 },
  { id: "reflection", duration: 4000 },
  { id: "finale", duration: 4000 },
  { id: "invitation", duration: 0 },
];

export default function Template01({ student, onAgain, onHome }: TemplateProps) {
  const { stepId, completed, skipToEnd, totalSteps, currentStep } = useStorySequence(STEPS);
  const [showCard, setShowCard] = useState(false);

  if (showCard) {
    return <InvitationCard student={student} templateId={1} accentColor="#C9A84C" onAgain={onAgain} onHome={onHome} />;
  }

  return (
    <div className="min-h-[100svh] bg-[#0A0806] text-[#C9A84C] flex items-center justify-center relative overflow-hidden" onClick={!completed ? skipToEnd : undefined}>
      <NoiseOverlay />
      <ProgressIndicator current={currentStep} total={totalSteps} />

      <AnimatePresence mode="wait">
        {stepId === "seal" && (
          <motion.div key="seal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center space-y-4 z-10 p-8">
            <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="w-24 h-24 mx-auto border-2 border-[#C9A84C]/30 rounded-full flex items-center justify-center">
              <div className="w-16 h-16 border border-[#C9A84C]/50 rounded-full flex items-center justify-center text-2xl font-serif">
                ✦
              </div>
            </motion.div>
            <p className="text-xs uppercase tracking-[0.5em] text-[#C9A84C]/50">The Royal Seal</p>
          </motion.div>
        )}

        {stepId === "welcome" && (
          <motion.div key="welcome" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center space-y-4 z-10 p-8">
            <CinematicText className="text-xs uppercase tracking-[0.5em] text-[#C9A84C]/50">
              By Royal Decree
            </CinematicText>
            <CinematicText delay={0.5} className="text-lg sm:text-xl font-serif text-[#C9A84C]/80">
              Let it be known throughout the realm
            </CinematicText>
          </motion.div>
        )}

        {stepId === "name" && (
          <motion.div key="name" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center space-y-4 z-10 p-8">
            <CinematicText className="text-xs uppercase tracking-[0.3em] text-[#C9A84C]/40">We Present</CinematicText>
            <NameReveal name={student.name} delay={0.3} className="text-[#C9A84C] font-serif" />
          </motion.div>
        )}

        {stepId === "usn" && (
          <motion.div key="usn" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center space-y-3 z-10 p-8">
            <UsnReveal usn={student.usn} className="text-[#C9A84C]/60" />
            <p className="text-xs text-[#C9A84C]/30 uppercase tracking-widest">Fresher No. {student.id}</p>
          </motion.div>
        )}

        {stepId === "reflection" && (
          <motion.div key="reflection" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center z-10 p-8 max-w-lg mx-auto">
            <StoryParagraph className="text-[#C9A84C]/70 font-serif italic text-center mx-auto">
              A new chapter in the annals of {EVENT.college} begins today. Your name now joins the distinguished registry of scholars who have walked these hallowed halls.
            </StoryParagraph>
          </motion.div>
        )}

        {stepId === "finale" && (
          <Finale collegeName={EVENT.college} onNext={() => setShowCard(true)} />
        )}

        {stepId === "invitation" && (
          <InvitationCard student={student} templateId={1} accentColor="#C9A84C" onAgain={onAgain} onHome={onHome} />
        )}
      </AnimatePresence>

      {!completed && <TapToContinue onClick={skipToEnd} />}
    </div>
  );
}
