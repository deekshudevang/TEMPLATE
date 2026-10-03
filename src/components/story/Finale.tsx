"use client";

import { motion } from "framer-motion";

export function Finale({
  collegeName,
  onNext,
}: {
  collegeName: string;
  onNext: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      onClick={onNext}
      className="min-h-[100svh] flex flex-col items-center justify-center p-8 text-center cursor-pointer select-none"
    >
      <motion.p
        initial={{ opacity: 0, letterSpacing: "0.5em" }}
        animate={{ opacity: 0.4, letterSpacing: "0.3em" }}
        transition={{ duration: 2, delay: 0.5 }}
        className="font-[var(--theme-font-body)] text-[10px] uppercase text-[var(--theme-text-muted)] mb-8"
      >
        Welcome to
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 1 }}
        className="font-[var(--theme-font-display)] text-[var(--theme-accent)] text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-wider leading-tight"
      >
        {collegeName}
      </motion.h1>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="w-20 h-px bg-[var(--theme-border)] my-8"
      />

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 2.5 }}
        className="font-[var(--theme-font-body)] text-sm sm:text-base uppercase tracking-[0.4em] text-[var(--theme-text-muted)]"
      >
        Your Story Has Just Begun.
      </motion.p>
    </motion.div>
  );
}
