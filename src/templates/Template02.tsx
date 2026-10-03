"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { TemplateProps } from "../types";
import { useStorySequence } from "@/components/story/useStorySequence";
import { NameReveal, UsnReveal, ProgressIndicator, NoiseOverlay, TapToContinue } from "@/components/story/Primitives";
import { InvitationCard } from "@/components/story/InvitationCard";
import { Finale } from "@/components/story/Finale";
import { EVENT } from "@/config/event";

const STEPS = [
  { id: "boot", duration: 2500 },
  { id: "scan", duration: 3000 },
  { id: "identity", duration: 3500 },
  { id: "usn", duration: 2500 },
  { id: "clearance", duration: 3500 },
  { id: "finale", duration: 4000 },
  { id: "invitation", duration: 0 },
];

function GlitchText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.span
      animate={{ x: [0, -2, 2, 0], opacity: [1, 0.8, 1] }}
      transition={{ duration: 0.1, repeat: 3 }}
      className={className}
    >
      {children}
    </motion.span>
  );
}

function TypewriterText({ text, speed = 30 }: { text: string; speed?: number }) {
  const [display, setDisplay] = useState("");
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) { setDisplay(text.slice(0, i + 1)); i++; }
      else clearInterval(timer);
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);
  return <span>{display}<span className="animate-pulse">▌</span></span>;
}

export default function Template02({ student, onAgain, onHome }: TemplateProps) {
  const { stepId, completed, skipToEnd, totalSteps, currentStep } = useStorySequence(STEPS);
  const [showCard, setShowCard] = useState(false);

  if (showCard) {
    return <InvitationCard student={student} templateId={2} accentColor="#00FF88" onAgain={onAgain} onHome={onHome} />;
  }

  return (
    <div className="min-h-[100svh] bg-black text-[#00FF88] flex items-center justify-center relative overflow-hidden font-mono" onClick={!completed ? skipToEnd : undefined}>
      <NoiseOverlay />
      <ProgressIndicator current={currentStep} total={totalSteps} />

      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none z-[2]" style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,136,0.03) 2px, rgba(0,255,136,0.03) 4px)" }} />

      <AnimatePresence mode="wait">
        {stepId === "boot" && (
          <motion.div key="boot" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center space-y-3 z-10 p-8">
            <p className="text-xs text-[#00FF88]/50">SYSTEM v4.2.1</p>
            <p className="text-sm"><TypewriterText text="INITIALIZING IDENTITY PROTOCOL..." speed={40} /></p>
            <motion.div animate={{ width: ["0%", "100%"] }} transition={{ duration: 2 }} className="h-0.5 bg-[#00FF88]/40 rounded-full mx-auto max-w-xs" />
          </motion.div>
        )}

        {stepId === "scan" && (
          <motion.div key="scan" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center space-y-4 z-10 p-8">
            <motion.div animate={{ scaleY: [1, 0.5, 1] }} transition={{ duration: 0.5, repeat: 4 }} className="w-32 h-32 mx-auto border border-[#00FF88]/30 rounded-lg flex items-center justify-center relative">
              <motion.div animate={{ top: ["0%", "100%", "0%"] }} transition={{ duration: 2, repeat: Infinity }} className="absolute left-0 right-0 h-px bg-[#00FF88]/60" />
              <span className="text-3xl">👤</span>
            </motion.div>
            <p className="text-xs text-[#00FF88]/50"><TypewriterText text="BIOMETRIC SCAN COMPLETE" speed={50} /></p>
          </motion.div>
        )}

        {stepId === "identity" && (
          <motion.div key="identity" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center space-y-4 z-10 p-8">
            <GlitchText className="text-xs text-[#00FF88]/40 block">[IDENTITY MATCH FOUND]</GlitchText>
            <NameReveal name={student.name} delay={0.3} className="text-[#00FF88] font-mono" />
          </motion.div>
        )}

        {stepId === "usn" && (
          <motion.div key="usn" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center space-y-3 z-10 p-8">
            <p className="text-xs text-[#00FF88]/40">CLASSIFICATION: FRESHER</p>
            <UsnReveal usn={student.usn} className="text-[#00FF88]" />
            <p className="text-xs text-[#00FF88]/30">NODE #{student.id}</p>
          </motion.div>
        )}

        {stepId === "clearance" && (
          <motion.div key="clearance" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center space-y-3 z-10 p-8 max-w-md mx-auto">
            <p className="text-sm text-[#00FF88]/70 leading-relaxed">
              <TypewriterText text={`Access granted. Your digital presence is required at ${EVENT.name}. Initiate your journey into the future of ${EVENT.college}.`} speed={25} />
            </p>
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
