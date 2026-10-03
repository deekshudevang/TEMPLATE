"use client";

import { motion } from "framer-motion";

export function TapToContinue({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0.3, 0.7, 0.3] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="absolute bottom-[max(32px,env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-white/50 z-50 select-none"
      aria-label="Tap to continue"
    >
      TAP TO CONTINUE →
    </motion.button>
  );
}

export function CinematicText({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function NameReveal({
  name,
  delay = 0,
  className = "",
}: {
  name: string;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.h1
      initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`text-3xl sm:text-4xl md:text-5xl font-bold leading-tight ${className}`}
      style={{ fontSize: "clamp(1.5rem, 6vw, 3.5rem)" }}
    >
      {name}
    </motion.h1>
  );
}

export function UsnReveal({
  usn,
  delay = 0,
  className = "",
}: {
  usn: string;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.6 }}
      transition={{ duration: 0.8, delay }}
      className={`font-mono text-sm tracking-wider ${className}`}
    >
      {usn}
    </motion.p>
  );
}

export function StoryParagraph({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 0.8, y: 0 }}
      transition={{ duration: 1, delay }}
      className={`text-sm sm:text-base leading-relaxed max-w-md ${className}`}
    >
      {children}
    </motion.p>
  );
}

export function ProgressIndicator({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  return (
    <div className="fixed top-[max(16px,env(safe-area-inset-top))] left-4 right-4 z-50 flex gap-1">
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className="h-0.5 flex-1 rounded-full overflow-hidden bg-white/10"
        >
          <motion.div
            className="h-full bg-white/60"
            initial={{ width: 0 }}
            animate={{ width: i < current ? "100%" : i === current ? "100%" : "0%" }}
            transition={{ duration: i === current ? 3 : 0.3 }}
          />
        </div>
      ))}
    </div>
  );
}

export function NoiseOverlay() {
  return (
    <div
      className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay z-[1]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }}
    />
  );
}
