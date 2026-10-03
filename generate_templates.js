const fs = require('fs');
const path = require('path');

const templatesDir = path.join(__dirname, 'src', 'templates');

const themes = [
  { id: "03", name: "Player One", color: "#FF0055", theme: "arcade", text: "Level 1 begins now. Equip yourself for {event}." },
  { id: "04", name: "Cinematic", color: "#FFD700", theme: "movie", text: "Every great story has a beginning." },
  { id: "05", name: "Space", color: "#4B0082", theme: "space", text: "Your mission to {college} launches." },
  { id: "06", name: "Terminal", color: "#00FF00", theme: "terminal", text: "System initialized. Execute startup sequence." },
  { id: "07", name: "Elegant", color: "#C0C0C0", theme: "elegant", text: "It is our distinct pleasure to welcome you." },
  { id: "08", name: "Arcade", color: "#FF4500", theme: "retro", text: "Insert coin to join {event}." },
  { id: "09", name: "Memory", color: "#FF69B4", theme: "polaroid", text: "Let's make some memories." },
  { id: "10", name: "News", color: "#000000", theme: "newspaper", text: "Breaking News: Headlines are being made." },
  { id: "11", name: "Story", color: "#8B4513", theme: "book", text: "Your journey starts here. Welcome to {college}." },
  { id: "12", name: "AI", color: "#00CED1", theme: "ai", text: "Profile analyzed and approved. Systems ready." },
  { id: "13", name: "Journey", color: "#228B22", theme: "nature", text: "Take the first step on a grand adventure." },
  { id: "14", name: "Party", color: "#FF1493", theme: "neon", text: "Let's get loud! Don't miss the party." },
  { id: "15", name: "Spotlight", color: "#F0E68C", theme: "stage", text: "The stage is yours. Let your light shine." },
  { id: "16", name: "Magazine", color: "#DC143C", theme: "magazine", text: "You're on the cover this year." },
  { id: "17", name: "Mystery", color: "#483D8B", theme: "mystery", text: "What awaits you? Discover the secret." },
  { id: "18", name: "Passport", color: "#4682B4", theme: "travel", text: "Your visa is approved. Pack your bags." },
  { id: "19", name: "Energy", color: "#FF8C00", theme: "electric", text: "Feel the rush. Bring your energy." },
  { id: "20", name: "Portal", color: "#9400D3", theme: "portal", text: "Cross the threshold into a new world." }
];

const generateTemplateContent = (theme) => `
"use client";

import { useState, useEffect } from "react";
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

export default function Template${theme.id}({ student, onAgain, onHome }: TemplateProps) {
  const { stepId, completed, skipToEnd, totalSteps, currentStep } = useStorySequence(STEPS);
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    if (stepId === "invitation" || completed) {
      setShowCard(true);
    }
  }, [stepId, completed]);

  if (showCard) {
    return <InvitationCard student={student} templateId={parseInt("${theme.id}", 10)} accentColor="${theme.color}" onAgain={onAgain} onHome={onHome} />;
  }

  return (
    <div className="min-h-[100svh] bg-[#050507] text-white flex items-center justify-center relative overflow-hidden" onClick={!completed ? skipToEnd : undefined}>
      <NoiseOverlay />
      <ProgressIndicator current={currentStep} total={totalSteps} />

      <AnimatePresence mode="wait">
        {stepId === "intro" && (
          <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center space-y-4 z-10 p-8">
            <CinematicText className="text-xs uppercase tracking-[0.5em] text-[${theme.color}]/50">
              ${theme.name}
            </CinematicText>
          </motion.div>
        )}

        {stepId === "name" && (
          <motion.div key="name" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center space-y-4 z-10 p-8">
            <CinematicText className="text-xs uppercase tracking-[0.3em] text-white/40">Welcome</CinematicText>
            <NameReveal name={student.name} delay={0.3} className="text-[${theme.color}]" />
          </motion.div>
        )}

        {stepId === "usn" && (
          <motion.div key="usn" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center space-y-3 z-10 p-8">
            <UsnReveal usn={student.usn} className="text-[${theme.color}]/60" />
            <p className="text-xs text-white/30 uppercase tracking-widest">ID: {student.id}</p>
          </motion.div>
        )}

        {stepId === "message" && (
          <motion.div key="message" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center z-10 p-8 max-w-lg mx-auto">
            <StoryParagraph className="text-white/70 text-center mx-auto">
              ${theme.text.replace("{event}", "{EVENT.name}").replace("{college}", "{EVENT.college}")}
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
`;

themes.forEach(theme => {
  fs.writeFileSync(path.join(templatesDir, `Template${theme.id}.tsx`), generateTemplateContent(theme));
});

console.log("Templates generated");
