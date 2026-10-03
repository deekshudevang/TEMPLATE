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
  onAgain,
  onHome,
}: {
  student: Student;
  templateId: number;
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
      // We must read the computed background color for the image capture
      const computedStyle = window.getComputedStyle(cardRef.current);
      const bgColor = computedStyle.getPropertyValue("--theme-bg").trim() || "#050507";
      
      const url = await toPng(cardRef.current, {
        pixelRatio: 3,
        backgroundColor: bgColor,
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
      className="min-h-[100svh] flex flex-col items-center justify-center p-4 sm:p-6 relative text-[var(--theme-text)]"
    >
      <div
        ref={cardRef}
        className="w-full max-w-md mx-auto rounded-[var(--theme-radius)] border border-[var(--theme-border)] bg-[var(--theme-card)] shadow-[var(--theme-shadow)] p-6 sm:p-8 space-y-5 relative overflow-hidden"
      >
        {/* Top accent line */}
        <div
          className="absolute top-0 left-1/4 right-1/4 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, var(--theme-accent), transparent)`,
            opacity: 0.4
          }}
        />

        <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--theme-text-muted)] text-center">
          {EVENT.name}
        </p>

        <h2
          className="font-[var(--theme-font-display)] text-xl sm:text-2xl font-bold text-center leading-tight text-[var(--theme-accent)]"
        >
          {headline}
        </h2>

        <p className="font-[var(--theme-font-body)] text-sm text-[var(--theme-text-muted)] text-center leading-relaxed">{body}</p>

        <div className="h-px bg-[var(--theme-border)] my-4" />

        {/* Event Details */}
        <div className="space-y-2 text-center text-sm text-[var(--theme-text-muted)]">
          <p className="font-[var(--theme-font-mono)]">
            {EVENT.date} at {EVENT.time}
          </p>
          <p className="font-[var(--theme-font-body)]">{EVENT.venue}</p>
        </div>

        <div className="h-px bg-[var(--theme-border)] my-4" />

        <p className="font-[var(--theme-font-body)] text-center text-xs text-[var(--theme-text-muted)] uppercase tracking-widest">
          Fresher No. {student.id}
        </p>

        <p className="font-[var(--theme-font-body)] text-center text-[10px] text-[var(--theme-text-muted)] opacity-70 uppercase tracking-wider">
          Hosted by {EVENT.hostedBy}
        </p>
      </div>

      {/* Action Bar */}
      <div className="flex gap-3 mt-6 w-full max-w-md mx-auto font-[var(--theme-font-body)]">
        <button
          onClick={handleSave}
          className="flex-1 py-3 text-xs uppercase tracking-widest rounded-full border border-[var(--theme-border)] bg-[var(--theme-card)] text-[var(--theme-text)] hover:opacity-80 transition-opacity"
        >
          Save Card
        </button>
        <button
          onClick={onAgain}
          className="flex-1 py-3 text-xs uppercase tracking-widest rounded-full border border-[var(--theme-border)] bg-[var(--theme-card)] text-[var(--theme-text)] hover:opacity-80 transition-opacity"
        >
          Experience Again
        </button>
        <button
          onClick={onHome}
          className="py-3 px-5 text-xs uppercase tracking-widest rounded-full border border-[var(--theme-border)] bg-[var(--theme-card)] text-[var(--theme-text)] hover:opacity-80 transition-opacity"
        >
          Home
        </button>
      </div>
    </motion.div>
  );
}
