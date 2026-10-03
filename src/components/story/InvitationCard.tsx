"use client";

import { motion } from "framer-motion";
import { useRef, useCallback } from "react";
import { toPng } from "html-to-image";
import { EVENT } from "@/config/event";
import { INVITATION_COPY } from "@/config/invitationCopy";
import type { Student } from "@/data/students";

function replacePlaceholders(text: string, student: Student): string {
  const firstName = student.name.split(" ")[0];
  const titleCase = firstName.charAt(0) + firstName.slice(1).toLowerCase();
  return text
    .replace(/\{name\}/g, student.name)
    .replace(/\{firstName\}/g, titleCase)
    .replace(/\{event\}/g, EVENT.name)
    .replace(/\{college\}/g, EVENT.college)
    .replace(/\{date\}/g, EVENT.date)
    .replace(/\{time\}/g, EVENT.time)
    .replace(/\{venue\}/g, EVENT.venue);
}

export function InvitationCard({
  student,
  templateId,
  accentColor = "white",
  onAgain,
  onHome,
}: {
  student: Student;
  templateId: number;
  accentColor?: string;
  onAgain: () => void;
  onHome: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const copy = INVITATION_COPY[templateId] ?? INVITATION_COPY[1];

  const headline = replacePlaceholders(copy.headline, student);
  const body = replacePlaceholders(copy.body, student);

  const handleSave = useCallback(async () => {
    if (!cardRef.current) return;
    try {
      const url = await toPng(cardRef.current, {
        pixelRatio: 3,
        backgroundColor: "#050507",
      });
      const a = document.createElement("a");
      a.href = url;
      a.download = `invitation-${student.usn}.png`;
      a.click();
    } catch {
      // silent fail
    }
  }, [student.usn]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-[100svh] flex flex-col items-center justify-center p-4 sm:p-6 relative"
    >
      <div
        ref={cardRef}
        className="w-full max-w-md mx-auto rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 sm:p-8 space-y-5 relative overflow-hidden"
      >
        {/* Top accent line */}
        <div
          className="absolute top-0 left-1/4 right-1/4 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${accentColor}40, transparent)`,
          }}
        />

        <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 text-center">
          {EVENT.name}
        </p>

        <h2
          className="text-xl sm:text-2xl font-bold text-center leading-tight"
          style={{ color: accentColor }}
        >
          {headline}
        </h2>

        <p className="text-sm text-white/70 text-center leading-relaxed">{body}</p>

        <div className="h-px bg-white/10 my-4" />

        {/* Event Details */}
        <div className="space-y-2 text-center text-sm text-white/60">
          <p className="font-mono">
            {EVENT.date} at {EVENT.time}
          </p>
          <p>{EVENT.venue}</p>
        </div>

        <div className="h-px bg-white/10 my-4" />

        <p className="text-center text-xs text-white/40 uppercase tracking-widest">
          Fresher No. {student.id}
        </p>

        <p className="text-center text-[10px] text-white/30 uppercase tracking-wider">
          Hosted by {EVENT.hostedBy}
        </p>
      </div>

      {/* Action Bar */}
      <div className="flex gap-3 mt-6 w-full max-w-md mx-auto">
        <button
          onClick={handleSave}
          className="flex-1 py-3 text-xs uppercase tracking-widest rounded-full border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 transition-colors"
        >
          Save Card
        </button>
        <button
          onClick={onAgain}
          className="flex-1 py-3 text-xs uppercase tracking-widest rounded-full border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 transition-colors"
        >
          Experience Again
        </button>
        <button
          onClick={onHome}
          className="py-3 px-5 text-xs uppercase tracking-widest rounded-full border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 transition-colors"
        >
          Home
        </button>
      </div>
    </motion.div>
  );
}
