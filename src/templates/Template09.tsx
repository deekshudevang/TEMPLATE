
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
  { id: "intro", duration: 3000 },
  { id: "name", duration: 3500 },
  { id: "usn", duration: 2500 },
  { id: "message", duration: 4000 },
  { id: "finale", duration: 4000 },
  { id: "invitation", duration: 0 },
];

export default function Template09({ student, onAgain, onHome }: TemplateProps) {
  const { stepId, completed, skipToEnd, totalSteps, currentStep } = useStorySequence(STEPS);
  const [showCard, setShowCard] = useState(false);

  if (showCard) {
    return <InvitationCard student={student} templateId={parseInt("09", 10)} accentColor="#FF69B4" onAgain={onAgain} onHome={onHome} />;
  }

  return (
    <div className="min-h-[100svh] bg-[#050507] text-white flex items-center justify-center relative overflow-hidden" onClick={!completed ? skipToEnd : undefined}>
      <NoiseOverlay />
      <ProgressIndicator current={currentStep} total={totalSteps} />

      <AnimatePresence mode="wait">
        {stepId === "intro" && (
          <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center space-y-4 z-10 p-8">
            <CinematicText className="text-xs uppercase tracking-[0.5em] text-[#FF69B4]/50">
              Memory
            </CinematicText>
          </motion.div>
        )}

        {stepId === "name" && (
          <motion.div key="name" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center space-y-4 z-10 p-8">
            <CinematicText className="text-xs uppercase tracking-[0.3em] text-white/40">Welcome</CinematicText>
            <NameReveal name={student.name} delay={0.3} className="text-[#FF69B4]" />
          </motion.div>
        )}

        {stepId === "usn" && (
          <motion.div key="usn" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center space-y-3 z-10 p-8">
            <UsnReveal usn={student.usn} className="text-[#FF69B4]/60" />
            <p className="text-xs text-white/30 uppercase tracking-widest">ID: {student.id}</p>
          </motion.div>
        )}

        {stepId === "message" && (
          <motion.div key="message" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center z-10 p-8 max-w-lg mx-auto">
            <StoryParagraph className="text-white/70 text-center mx-auto">
              Let's make some memories.
            </StoryParagraph>
          </motion.div>
        )}

        {stepId === "finale" && (
          <Finale collegeName={EVENT.college} onNext={() => setShowCard(true)} />
        )}
      </AnimatePresence>

      {!completed && <TapToContinue onClick={skipToEnd} />}
    </div>
  );
}
