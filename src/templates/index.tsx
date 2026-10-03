"use client";

import React, { useState, useEffect } from "react";
import { Student } from "@/data/students";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface TemplateProps { student: Student; }

const BackButton = ({ invert = false }: { invert?: boolean }) => {
  const router = useRouter();
  return (
    <button onClick={() => router.push("/")} className={`absolute top-[max(24px,env(safe-area-inset-top))] left-6 z-50 transition-colors text-xs tracking-widest uppercase flex items-center gap-2 ${invert ? "text-black/70 hover:text-black" : "text-white/70 hover:text-white"} font-sans drop-shadow-md`}>
      <span>←</span> EXIT
    </button>
  );
};


const T1 = ({ student }: TemplateProps) => {
  const [showStory, setShowStory] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setShowStory(false), 12000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="w-full min-h-[100svh] relative overflow-hidden" style={{ backgroundColor: "#050505", color: "#ffffff" }}>
      <BackButton invert={false} />
      <AnimatePresence mode="wait">
        {showStory ? (
          <motion.div key="story" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex items-center justify-center p-8 cursor-pointer z-10" onClick={() => setShowStory(false)}>
            <div className="text-center max-w-sm">
              <motion.h2 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 1 }} className="text-2xl font-serif mb-6" style={{ color: "#D4AF37" }}>
                A new journey begins...
              </motion.h2>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }} className="text-sm uppercase tracking-widest opacity-60 mt-12">
                Tap to skip
              </motion.p>
            </div>
          </motion.div>
        ) : (
          <motion.div key="card" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="absolute inset-0 flex flex-col items-center text-center p-8 z-20 justify-center">
            <div className="border border-white/20 p-8 backdrop-blur-xl bg-black/20 rounded-2xl w-full max-w-md shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
              <p className="text-xs tracking-[0.3em] uppercase mb-8" style={{ color: "#D4AF37" }}>Formal Invitation 1</p>
              <h1 className="text-4xl font-light mb-2 leading-tight">{student.name}</h1>
              <p className="font-mono text-sm opacity-50 mb-12">{student.usn}</p>
              <div className="space-y-4">
                <p className="text-sm font-medium leading-relaxed max-w-[280px] mx-auto">
                  You are cordially invited to the Freshers&apos; Welcome Ceremony.
                </p>
                <p className="text-xs opacity-60">
                  Join us in celebrating the beginning of your academic excellence.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const T2 = ({ student }: TemplateProps) => {
  const [showStory, setShowStory] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setShowStory(false), 12000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="w-full min-h-[100svh] relative overflow-hidden" style={{ backgroundColor: "#1a0505", color: "#ffeded" }}>
      <BackButton invert={false} />
      <AnimatePresence mode="wait">
        {showStory ? (
          <motion.div key="story" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex items-center justify-center p-8 cursor-pointer z-10" onClick={() => setShowStory(false)}>
            <div className="text-center max-w-sm">
              <motion.h2 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 1 }} className="text-2xl font-serif mb-6" style={{ color: "#e5a93c" }}>
                A new journey begins...
              </motion.h2>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }} className="text-sm uppercase tracking-widest opacity-60 mt-12">
                Tap to skip
              </motion.p>
            </div>
          </motion.div>
        ) : (
          <motion.div key="card" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="absolute inset-0 flex flex-col items-start text-left p-8 z-20 justify-center">
            <div className="border border-white/20 p-8 backdrop-blur-xl bg-black/20 rounded-2xl w-full max-w-md shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
              <p className="text-xs tracking-[0.3em] uppercase mb-8" style={{ color: "#e5a93c" }}>Formal Invitation 2</p>
              <h1 className="text-4xl font-light mb-2 leading-tight">{student.name}</h1>
              <p className="font-mono text-sm opacity-50 mb-12">{student.usn}</p>
              <div className="space-y-4">
                <p className="text-sm font-medium leading-relaxed max-w-[280px] ">
                  You are cordially invited to the Freshers&apos; Welcome Ceremony.
                </p>
                <p className="text-xs opacity-60">
                  Join us in celebrating the beginning of your academic excellence.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const T3 = ({ student }: TemplateProps) => {
  const [showStory, setShowStory] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setShowStory(false), 12000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="w-full min-h-[100svh] relative overflow-hidden" style={{ backgroundColor: "#020512", color: "#ffffff" }}>
      <BackButton invert={false} />
      <AnimatePresence mode="wait">
        {showStory ? (
          <motion.div key="story" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex items-center justify-center p-8 cursor-pointer z-10" onClick={() => setShowStory(false)}>
            <div className="text-center max-w-sm">
              <motion.h2 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 1 }} className="text-2xl font-serif mb-6" style={{ color: "#85c1e9" }}>
                A new journey begins...
              </motion.h2>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }} className="text-sm uppercase tracking-widest opacity-60 mt-12">
                Tap to skip
              </motion.p>
            </div>
          </motion.div>
        ) : (
          <motion.div key="card" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="absolute inset-0 flex flex-col items-end text-right p-8 z-20 justify-center">
            <div className="border border-white/20 p-8 backdrop-blur-xl bg-black/20 rounded-2xl w-full max-w-md shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
              <p className="text-xs tracking-[0.3em] uppercase mb-8" style={{ color: "#85c1e9" }}>Formal Invitation 3</p>
              <h1 className="text-4xl font-light mb-2 leading-tight">{student.name}</h1>
              <p className="font-mono text-sm opacity-50 mb-12">{student.usn}</p>
              <div className="space-y-4">
                <p className="text-sm font-medium leading-relaxed max-w-[280px] ">
                  You are cordially invited to the Freshers&apos; Welcome Ceremony.
                </p>
                <p className="text-xs opacity-60">
                  Join us in celebrating the beginning of your academic excellence.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const T4 = ({ student }: TemplateProps) => {
  const [showStory, setShowStory] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setShowStory(false), 12000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="w-full min-h-[100svh] relative overflow-hidden" style={{ backgroundColor: "#03150c", color: "#e8f8f5" }}>
      <BackButton invert={false} />
      <AnimatePresence mode="wait">
        {showStory ? (
          <motion.div key="story" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex items-center justify-center p-8 cursor-pointer z-10" onClick={() => setShowStory(false)}>
            <div className="text-center max-w-sm">
              <motion.h2 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 1 }} className="text-2xl font-serif mb-6" style={{ color: "#d4af37" }}>
                A new journey begins...
              </motion.h2>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }} className="text-sm uppercase tracking-widest opacity-60 mt-12">
                Tap to skip
              </motion.p>
            </div>
          </motion.div>
        ) : (
          <motion.div key="card" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="absolute inset-0 flex flex-col items-center text-center justify-end pb-24 p-8 z-20 ">
            <div className="border border-white/20 p-8 backdrop-blur-xl bg-black/20 rounded-2xl w-full max-w-md shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
              <p className="text-xs tracking-[0.3em] uppercase mb-8" style={{ color: "#d4af37" }}>Formal Invitation 4</p>
              <h1 className="text-4xl font-light mb-2 leading-tight">{student.name}</h1>
              <p className="font-mono text-sm opacity-50 mb-12">{student.usn}</p>
              <div className="space-y-4">
                <p className="text-sm font-medium leading-relaxed max-w-[280px] ">
                  You are cordially invited to the Freshers&apos; Welcome Ceremony.
                </p>
                <p className="text-xs opacity-60">
                  Join us in celebrating the beginning of your academic excellence.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const T5 = ({ student }: TemplateProps) => {
  const [showStory, setShowStory] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setShowStory(false), 12000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="w-full min-h-[100svh] relative overflow-hidden" style={{ backgroundColor: "#0a0515", color: "#ffffff" }}>
      <BackButton invert={false} />
      <AnimatePresence mode="wait">
        {showStory ? (
          <motion.div key="story" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex items-center justify-center p-8 cursor-pointer z-10" onClick={() => setShowStory(false)}>
            <div className="text-center max-w-sm">
              <motion.h2 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 1 }} className="text-2xl font-serif mb-6" style={{ color: "#d7bde2" }}>
                A new journey begins...
              </motion.h2>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }} className="text-sm uppercase tracking-widest opacity-60 mt-12">
                Tap to skip
              </motion.p>
            </div>
          </motion.div>
        ) : (
          <motion.div key="card" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="absolute inset-0 flex flex-col items-center text-center p-8 z-20 justify-center">
            <div className="border border-white/20 p-8 backdrop-blur-xl bg-black/20 rounded-2xl w-full max-w-md shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
              <p className="text-xs tracking-[0.3em] uppercase mb-8" style={{ color: "#d7bde2" }}>Formal Invitation 5</p>
              <h1 className="text-4xl font-light mb-2 leading-tight">{student.name}</h1>
              <p className="font-mono text-sm opacity-50 mb-12">{student.usn}</p>
              <div className="space-y-4">
                <p className="text-sm font-medium leading-relaxed max-w-[280px] mx-auto">
                  You are cordially invited to the Freshers&apos; Welcome Ceremony.
                </p>
                <p className="text-xs opacity-60">
                  Join us in celebrating the beginning of your academic excellence.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const T6 = ({ student }: TemplateProps) => {
  const [showStory, setShowStory] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setShowStory(false), 12000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="w-full min-h-[100svh] relative overflow-hidden" style={{ backgroundColor: "#080808", color: "#cccccc" }}>
      <BackButton invert={false} />
      <AnimatePresence mode="wait">
        {showStory ? (
          <motion.div key="story" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex items-center justify-center p-8 cursor-pointer z-10" onClick={() => setShowStory(false)}>
            <div className="text-center max-w-sm">
              <motion.h2 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 1 }} className="text-2xl font-serif mb-6" style={{ color: "#ff3333" }}>
                A new journey begins...
              </motion.h2>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }} className="text-sm uppercase tracking-widest opacity-60 mt-12">
                Tap to skip
              </motion.p>
            </div>
          </motion.div>
        ) : (
          <motion.div key="card" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="absolute inset-0 flex flex-col items-start text-left p-8 z-20 justify-center">
            <div className="border border-white/20 p-8 backdrop-blur-xl bg-black/20 rounded-2xl w-full max-w-md shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
              <p className="text-xs tracking-[0.3em] uppercase mb-8" style={{ color: "#ff3333" }}>Formal Invitation 6</p>
              <h1 className="text-4xl font-light mb-2 leading-tight">{student.name}</h1>
              <p className="font-mono text-sm opacity-50 mb-12">{student.usn}</p>
              <div className="space-y-4">
                <p className="text-sm font-medium leading-relaxed max-w-[280px] ">
                  You are cordially invited to the Freshers&apos; Welcome Ceremony.
                </p>
                <p className="text-xs opacity-60">
                  Join us in celebrating the beginning of your academic excellence.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const T7 = ({ student }: TemplateProps) => {
  const [showStory, setShowStory] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setShowStory(false), 12000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="w-full min-h-[100svh] relative overflow-hidden" style={{ backgroundColor: "#dbe9f4", color: "#1b4f72" }}>
      <BackButton invert={true} />
      <AnimatePresence mode="wait">
        {showStory ? (
          <motion.div key="story" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex items-center justify-center p-8 cursor-pointer z-10" onClick={() => setShowStory(false)}>
            <div className="text-center max-w-sm">
              <motion.h2 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 1 }} className="text-2xl font-serif mb-6" style={{ color: "#154360" }}>
                A new journey begins...
              </motion.h2>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }} className="text-sm uppercase tracking-widest opacity-60 mt-12">
                Tap to skip
              </motion.p>
            </div>
          </motion.div>
        ) : (
          <motion.div key="card" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="absolute inset-0 flex flex-col items-end text-right p-8 z-20 justify-center">
            <div className="border border-white/20 p-8 backdrop-blur-xl bg-black/20 rounded-2xl w-full max-w-md shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
              <p className="text-xs tracking-[0.3em] uppercase mb-8" style={{ color: "#154360" }}>Formal Invitation 7</p>
              <h1 className="text-4xl font-light mb-2 leading-tight">{student.name}</h1>
              <p className="font-mono text-sm opacity-50 mb-12">{student.usn}</p>
              <div className="space-y-4">
                <p className="text-sm font-medium leading-relaxed max-w-[280px] ">
                  You are cordially invited to the Freshers&apos; Welcome Ceremony.
                </p>
                <p className="text-xs opacity-60">
                  Join us in celebrating the beginning of your academic excellence.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const T8 = ({ student }: TemplateProps) => {
  const [showStory, setShowStory] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setShowStory(false), 12000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="w-full min-h-[100svh] relative overflow-hidden" style={{ backgroundColor: "#1a1813", color: "#ffd700" }}>
      <BackButton invert={false} />
      <AnimatePresence mode="wait">
        {showStory ? (
          <motion.div key="story" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex items-center justify-center p-8 cursor-pointer z-10" onClick={() => setShowStory(false)}>
            <div className="text-center max-w-sm">
              <motion.h2 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 1 }} className="text-2xl font-serif mb-6" style={{ color: "#4a3b00" }}>
                A new journey begins...
              </motion.h2>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }} className="text-sm uppercase tracking-widest opacity-60 mt-12">
                Tap to skip
              </motion.p>
            </div>
          </motion.div>
        ) : (
          <motion.div key="card" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="absolute inset-0 flex flex-col items-center text-center justify-end pb-24 p-8 z-20 ">
            <div className="border border-white/20 p-8 backdrop-blur-xl bg-black/20 rounded-2xl w-full max-w-md shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
              <p className="text-xs tracking-[0.3em] uppercase mb-8" style={{ color: "#4a3b00" }}>Formal Invitation 8</p>
              <h1 className="text-4xl font-light mb-2 leading-tight">{student.name}</h1>
              <p className="font-mono text-sm opacity-50 mb-12">{student.usn}</p>
              <div className="space-y-4">
                <p className="text-sm font-medium leading-relaxed max-w-[280px] ">
                  You are cordially invited to the Freshers&apos; Welcome Ceremony.
                </p>
                <p className="text-xs opacity-60">
                  Join us in celebrating the beginning of your academic excellence.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const T9 = ({ student }: TemplateProps) => {
  const [showStory, setShowStory] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setShowStory(false), 12000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="w-full min-h-[100svh] relative overflow-hidden" style={{ backgroundColor: "#d0d0d0", color: "#111111" }}>
      <BackButton invert={true} />
      <AnimatePresence mode="wait">
        {showStory ? (
          <motion.div key="story" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex items-center justify-center p-8 cursor-pointer z-10" onClick={() => setShowStory(false)}>
            <div className="text-center max-w-sm">
              <motion.h2 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 1 }} className="text-2xl font-serif mb-6" style={{ color: "#333333" }}>
                A new journey begins...
              </motion.h2>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }} className="text-sm uppercase tracking-widest opacity-60 mt-12">
                Tap to skip
              </motion.p>
            </div>
          </motion.div>
        ) : (
          <motion.div key="card" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="absolute inset-0 flex flex-col items-center text-center p-8 z-20 justify-center">
            <div className="border border-white/20 p-8 backdrop-blur-xl bg-black/20 rounded-2xl w-full max-w-md shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
              <p className="text-xs tracking-[0.3em] uppercase mb-8" style={{ color: "#333333" }}>Formal Invitation 9</p>
              <h1 className="text-4xl font-light mb-2 leading-tight">{student.name}</h1>
              <p className="font-mono text-sm opacity-50 mb-12">{student.usn}</p>
              <div className="space-y-4">
                <p className="text-sm font-medium leading-relaxed max-w-[280px] mx-auto">
                  You are cordially invited to the Freshers&apos; Welcome Ceremony.
                </p>
                <p className="text-xs opacity-60">
                  Join us in celebrating the beginning of your academic excellence.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const T10 = ({ student }: TemplateProps) => {
  const [showStory, setShowStory] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setShowStory(false), 12000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="w-full min-h-[100svh] relative overflow-hidden" style={{ backgroundColor: "#000000", color: "#00ff00" }}>
      <BackButton invert={false} />
      <AnimatePresence mode="wait">
        {showStory ? (
          <motion.div key="story" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex items-center justify-center p-8 cursor-pointer z-10" onClick={() => setShowStory(false)}>
            <div className="text-center max-w-sm">
              <motion.h2 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 1 }} className="text-2xl font-serif mb-6" style={{ color: "#00cc00" }}>
                A new journey begins...
              </motion.h2>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }} className="text-sm uppercase tracking-widest opacity-60 mt-12">
                Tap to skip
              </motion.p>
            </div>
          </motion.div>
        ) : (
          <motion.div key="card" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="absolute inset-0 flex flex-col items-start text-left p-8 z-20 justify-center">
            <div className="border border-white/20 p-8 backdrop-blur-xl bg-black/20 rounded-2xl w-full max-w-md shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
              <p className="text-xs tracking-[0.3em] uppercase mb-8" style={{ color: "#00cc00" }}>Formal Invitation 10</p>
              <h1 className="text-4xl font-light mb-2 leading-tight">{student.name}</h1>
              <p className="font-mono text-sm opacity-50 mb-12">{student.usn}</p>
              <div className="space-y-4">
                <p className="text-sm font-medium leading-relaxed max-w-[280px] ">
                  You are cordially invited to the Freshers&apos; Welcome Ceremony.
                </p>
                <p className="text-xs opacity-60">
                  Join us in celebrating the beginning of your academic excellence.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const T11 = ({ student }: TemplateProps) => {
  const [showStory, setShowStory] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setShowStory(false), 12000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="w-full min-h-[100svh] relative overflow-hidden" style={{ backgroundColor: "#050505", color: "#ffffff" }}>
      <BackButton invert={false} />
      <AnimatePresence mode="wait">
        {showStory ? (
          <motion.div key="story" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex items-center justify-center p-8 cursor-pointer z-10" onClick={() => setShowStory(false)}>
            <div className="text-center max-w-sm">
              <motion.h2 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 1 }} className="text-2xl font-serif mb-6" style={{ color: "#D4AF37" }}>
                A new journey begins...
              </motion.h2>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }} className="text-sm uppercase tracking-widest opacity-60 mt-12">
                Tap to skip
              </motion.p>
            </div>
          </motion.div>
        ) : (
          <motion.div key="card" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="absolute inset-0 flex flex-col items-end text-right p-8 z-20 justify-center">
            <div className="border border-white/20 p-8 backdrop-blur-xl bg-black/20 rounded-2xl w-full max-w-md shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
              <p className="text-xs tracking-[0.3em] uppercase mb-8" style={{ color: "#D4AF37" }}>Formal Invitation 11</p>
              <h1 className="text-4xl font-light mb-2 leading-tight">{student.name}</h1>
              <p className="font-mono text-sm opacity-50 mb-12">{student.usn}</p>
              <div className="space-y-4">
                <p className="text-sm font-medium leading-relaxed max-w-[280px] ">
                  You are cordially invited to the Freshers&apos; Welcome Ceremony.
                </p>
                <p className="text-xs opacity-60">
                  Join us in celebrating the beginning of your academic excellence.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const T12 = ({ student }: TemplateProps) => {
  const [showStory, setShowStory] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setShowStory(false), 12000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="w-full min-h-[100svh] relative overflow-hidden" style={{ backgroundColor: "#1a0505", color: "#ffeded" }}>
      <BackButton invert={false} />
      <AnimatePresence mode="wait">
        {showStory ? (
          <motion.div key="story" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex items-center justify-center p-8 cursor-pointer z-10" onClick={() => setShowStory(false)}>
            <div className="text-center max-w-sm">
              <motion.h2 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 1 }} className="text-2xl font-serif mb-6" style={{ color: "#e5a93c" }}>
                A new journey begins...
              </motion.h2>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }} className="text-sm uppercase tracking-widest opacity-60 mt-12">
                Tap to skip
              </motion.p>
            </div>
          </motion.div>
        ) : (
          <motion.div key="card" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="absolute inset-0 flex flex-col items-center text-center justify-end pb-24 p-8 z-20 ">
            <div className="border border-white/20 p-8 backdrop-blur-xl bg-black/20 rounded-2xl w-full max-w-md shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
              <p className="text-xs tracking-[0.3em] uppercase mb-8" style={{ color: "#e5a93c" }}>Formal Invitation 12</p>
              <h1 className="text-4xl font-light mb-2 leading-tight">{student.name}</h1>
              <p className="font-mono text-sm opacity-50 mb-12">{student.usn}</p>
              <div className="space-y-4">
                <p className="text-sm font-medium leading-relaxed max-w-[280px] ">
                  You are cordially invited to the Freshers&apos; Welcome Ceremony.
                </p>
                <p className="text-xs opacity-60">
                  Join us in celebrating the beginning of your academic excellence.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const T13 = ({ student }: TemplateProps) => {
  const [showStory, setShowStory] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setShowStory(false), 12000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="w-full min-h-[100svh] relative overflow-hidden" style={{ backgroundColor: "#020512", color: "#ffffff" }}>
      <BackButton invert={false} />
      <AnimatePresence mode="wait">
        {showStory ? (
          <motion.div key="story" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex items-center justify-center p-8 cursor-pointer z-10" onClick={() => setShowStory(false)}>
            <div className="text-center max-w-sm">
              <motion.h2 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 1 }} className="text-2xl font-serif mb-6" style={{ color: "#85c1e9" }}>
                A new journey begins...
              </motion.h2>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }} className="text-sm uppercase tracking-widest opacity-60 mt-12">
                Tap to skip
              </motion.p>
            </div>
          </motion.div>
        ) : (
          <motion.div key="card" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="absolute inset-0 flex flex-col items-center text-center p-8 z-20 justify-center">
            <div className="border border-white/20 p-8 backdrop-blur-xl bg-black/20 rounded-2xl w-full max-w-md shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
              <p className="text-xs tracking-[0.3em] uppercase mb-8" style={{ color: "#85c1e9" }}>Formal Invitation 13</p>
              <h1 className="text-4xl font-light mb-2 leading-tight">{student.name}</h1>
              <p className="font-mono text-sm opacity-50 mb-12">{student.usn}</p>
              <div className="space-y-4">
                <p className="text-sm font-medium leading-relaxed max-w-[280px] mx-auto">
                  You are cordially invited to the Freshers&apos; Welcome Ceremony.
                </p>
                <p className="text-xs opacity-60">
                  Join us in celebrating the beginning of your academic excellence.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const T14 = ({ student }: TemplateProps) => {
  const [showStory, setShowStory] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setShowStory(false), 12000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="w-full min-h-[100svh] relative overflow-hidden" style={{ backgroundColor: "#03150c", color: "#e8f8f5" }}>
      <BackButton invert={false} />
      <AnimatePresence mode="wait">
        {showStory ? (
          <motion.div key="story" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex items-center justify-center p-8 cursor-pointer z-10" onClick={() => setShowStory(false)}>
            <div className="text-center max-w-sm">
              <motion.h2 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 1 }} className="text-2xl font-serif mb-6" style={{ color: "#d4af37" }}>
                A new journey begins...
              </motion.h2>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }} className="text-sm uppercase tracking-widest opacity-60 mt-12">
                Tap to skip
              </motion.p>
            </div>
          </motion.div>
        ) : (
          <motion.div key="card" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="absolute inset-0 flex flex-col items-start text-left p-8 z-20 justify-center">
            <div className="border border-white/20 p-8 backdrop-blur-xl bg-black/20 rounded-2xl w-full max-w-md shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
              <p className="text-xs tracking-[0.3em] uppercase mb-8" style={{ color: "#d4af37" }}>Formal Invitation 14</p>
              <h1 className="text-4xl font-light mb-2 leading-tight">{student.name}</h1>
              <p className="font-mono text-sm opacity-50 mb-12">{student.usn}</p>
              <div className="space-y-4">
                <p className="text-sm font-medium leading-relaxed max-w-[280px] ">
                  You are cordially invited to the Freshers&apos; Welcome Ceremony.
                </p>
                <p className="text-xs opacity-60">
                  Join us in celebrating the beginning of your academic excellence.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const T15 = ({ student }: TemplateProps) => {
  const [showStory, setShowStory] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setShowStory(false), 12000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="w-full min-h-[100svh] relative overflow-hidden" style={{ backgroundColor: "#0a0515", color: "#ffffff" }}>
      <BackButton invert={false} />
      <AnimatePresence mode="wait">
        {showStory ? (
          <motion.div key="story" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex items-center justify-center p-8 cursor-pointer z-10" onClick={() => setShowStory(false)}>
            <div className="text-center max-w-sm">
              <motion.h2 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 1 }} className="text-2xl font-serif mb-6" style={{ color: "#d7bde2" }}>
                A new journey begins...
              </motion.h2>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }} className="text-sm uppercase tracking-widest opacity-60 mt-12">
                Tap to skip
              </motion.p>
            </div>
          </motion.div>
        ) : (
          <motion.div key="card" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="absolute inset-0 flex flex-col items-end text-right p-8 z-20 justify-center">
            <div className="border border-white/20 p-8 backdrop-blur-xl bg-black/20 rounded-2xl w-full max-w-md shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
              <p className="text-xs tracking-[0.3em] uppercase mb-8" style={{ color: "#d7bde2" }}>Formal Invitation 15</p>
              <h1 className="text-4xl font-light mb-2 leading-tight">{student.name}</h1>
              <p className="font-mono text-sm opacity-50 mb-12">{student.usn}</p>
              <div className="space-y-4">
                <p className="text-sm font-medium leading-relaxed max-w-[280px] ">
                  You are cordially invited to the Freshers&apos; Welcome Ceremony.
                </p>
                <p className="text-xs opacity-60">
                  Join us in celebrating the beginning of your academic excellence.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const T16 = ({ student }: TemplateProps) => {
  const [showStory, setShowStory] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setShowStory(false), 12000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="w-full min-h-[100svh] relative overflow-hidden" style={{ backgroundColor: "#080808", color: "#cccccc" }}>
      <BackButton invert={false} />
      <AnimatePresence mode="wait">
        {showStory ? (
          <motion.div key="story" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex items-center justify-center p-8 cursor-pointer z-10" onClick={() => setShowStory(false)}>
            <div className="text-center max-w-sm">
              <motion.h2 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 1 }} className="text-2xl font-serif mb-6" style={{ color: "#ff3333" }}>
                A new journey begins...
              </motion.h2>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }} className="text-sm uppercase tracking-widest opacity-60 mt-12">
                Tap to skip
              </motion.p>
            </div>
          </motion.div>
        ) : (
          <motion.div key="card" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="absolute inset-0 flex flex-col items-center text-center justify-end pb-24 p-8 z-20 ">
            <div className="border border-white/20 p-8 backdrop-blur-xl bg-black/20 rounded-2xl w-full max-w-md shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
              <p className="text-xs tracking-[0.3em] uppercase mb-8" style={{ color: "#ff3333" }}>Formal Invitation 16</p>
              <h1 className="text-4xl font-light mb-2 leading-tight">{student.name}</h1>
              <p className="font-mono text-sm opacity-50 mb-12">{student.usn}</p>
              <div className="space-y-4">
                <p className="text-sm font-medium leading-relaxed max-w-[280px] ">
                  You are cordially invited to the Freshers&apos; Welcome Ceremony.
                </p>
                <p className="text-xs opacity-60">
                  Join us in celebrating the beginning of your academic excellence.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const T17 = ({ student }: TemplateProps) => {
  const [showStory, setShowStory] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setShowStory(false), 12000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="w-full min-h-[100svh] relative overflow-hidden" style={{ backgroundColor: "#dbe9f4", color: "#1b4f72" }}>
      <BackButton invert={true} />
      <AnimatePresence mode="wait">
        {showStory ? (
          <motion.div key="story" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex items-center justify-center p-8 cursor-pointer z-10" onClick={() => setShowStory(false)}>
            <div className="text-center max-w-sm">
              <motion.h2 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 1 }} className="text-2xl font-serif mb-6" style={{ color: "#154360" }}>
                A new journey begins...
              </motion.h2>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }} className="text-sm uppercase tracking-widest opacity-60 mt-12">
                Tap to skip
              </motion.p>
            </div>
          </motion.div>
        ) : (
          <motion.div key="card" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="absolute inset-0 flex flex-col items-center text-center p-8 z-20 justify-center">
            <div className="border border-white/20 p-8 backdrop-blur-xl bg-black/20 rounded-2xl w-full max-w-md shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
              <p className="text-xs tracking-[0.3em] uppercase mb-8" style={{ color: "#154360" }}>Formal Invitation 17</p>
              <h1 className="text-4xl font-light mb-2 leading-tight">{student.name}</h1>
              <p className="font-mono text-sm opacity-50 mb-12">{student.usn}</p>
              <div className="space-y-4">
                <p className="text-sm font-medium leading-relaxed max-w-[280px] mx-auto">
                  You are cordially invited to the Freshers&apos; Welcome Ceremony.
                </p>
                <p className="text-xs opacity-60">
                  Join us in celebrating the beginning of your academic excellence.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const T18 = ({ student }: TemplateProps) => {
  const [showStory, setShowStory] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setShowStory(false), 12000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="w-full min-h-[100svh] relative overflow-hidden" style={{ backgroundColor: "#1a1813", color: "#ffd700" }}>
      <BackButton invert={false} />
      <AnimatePresence mode="wait">
        {showStory ? (
          <motion.div key="story" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex items-center justify-center p-8 cursor-pointer z-10" onClick={() => setShowStory(false)}>
            <div className="text-center max-w-sm">
              <motion.h2 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 1 }} className="text-2xl font-serif mb-6" style={{ color: "#4a3b00" }}>
                A new journey begins...
              </motion.h2>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }} className="text-sm uppercase tracking-widest opacity-60 mt-12">
                Tap to skip
              </motion.p>
            </div>
          </motion.div>
        ) : (
          <motion.div key="card" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="absolute inset-0 flex flex-col items-start text-left p-8 z-20 justify-center">
            <div className="border border-white/20 p-8 backdrop-blur-xl bg-black/20 rounded-2xl w-full max-w-md shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
              <p className="text-xs tracking-[0.3em] uppercase mb-8" style={{ color: "#4a3b00" }}>Formal Invitation 18</p>
              <h1 className="text-4xl font-light mb-2 leading-tight">{student.name}</h1>
              <p className="font-mono text-sm opacity-50 mb-12">{student.usn}</p>
              <div className="space-y-4">
                <p className="text-sm font-medium leading-relaxed max-w-[280px] ">
                  You are cordially invited to the Freshers&apos; Welcome Ceremony.
                </p>
                <p className="text-xs opacity-60">
                  Join us in celebrating the beginning of your academic excellence.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const T19 = ({ student }: TemplateProps) => {
  const [showStory, setShowStory] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setShowStory(false), 12000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="w-full min-h-[100svh] relative overflow-hidden" style={{ backgroundColor: "#d0d0d0", color: "#111111" }}>
      <BackButton invert={true} />
      <AnimatePresence mode="wait">
        {showStory ? (
          <motion.div key="story" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex items-center justify-center p-8 cursor-pointer z-10" onClick={() => setShowStory(false)}>
            <div className="text-center max-w-sm">
              <motion.h2 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 1 }} className="text-2xl font-serif mb-6" style={{ color: "#333333" }}>
                A new journey begins...
              </motion.h2>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }} className="text-sm uppercase tracking-widest opacity-60 mt-12">
                Tap to skip
              </motion.p>
            </div>
          </motion.div>
        ) : (
          <motion.div key="card" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="absolute inset-0 flex flex-col items-end text-right p-8 z-20 justify-center">
            <div className="border border-white/20 p-8 backdrop-blur-xl bg-black/20 rounded-2xl w-full max-w-md shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
              <p className="text-xs tracking-[0.3em] uppercase mb-8" style={{ color: "#333333" }}>Formal Invitation 19</p>
              <h1 className="text-4xl font-light mb-2 leading-tight">{student.name}</h1>
              <p className="font-mono text-sm opacity-50 mb-12">{student.usn}</p>
              <div className="space-y-4">
                <p className="text-sm font-medium leading-relaxed max-w-[280px] ">
                  You are cordially invited to the Freshers&apos; Welcome Ceremony.
                </p>
                <p className="text-xs opacity-60">
                  Join us in celebrating the beginning of your academic excellence.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const T20 = ({ student }: TemplateProps) => {
  const [showStory, setShowStory] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setShowStory(false), 12000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="w-full min-h-[100svh] relative overflow-hidden" style={{ backgroundColor: "#000000", color: "#00ff00" }}>
      <BackButton invert={false} />
      <AnimatePresence mode="wait">
        {showStory ? (
          <motion.div key="story" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex items-center justify-center p-8 cursor-pointer z-10" onClick={() => setShowStory(false)}>
            <div className="text-center max-w-sm">
              <motion.h2 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 1 }} className="text-2xl font-serif mb-6" style={{ color: "#00cc00" }}>
                A new journey begins...
              </motion.h2>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }} className="text-sm uppercase tracking-widest opacity-60 mt-12">
                Tap to skip
              </motion.p>
            </div>
          </motion.div>
        ) : (
          <motion.div key="card" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="absolute inset-0 flex flex-col items-center text-center justify-end pb-24 p-8 z-20 ">
            <div className="border border-white/20 p-8 backdrop-blur-xl bg-black/20 rounded-2xl w-full max-w-md shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
              <p className="text-xs tracking-[0.3em] uppercase mb-8" style={{ color: "#00cc00" }}>Formal Invitation 20</p>
              <h1 className="text-4xl font-light mb-2 leading-tight">{student.name}</h1>
              <p className="font-mono text-sm opacity-50 mb-12">{student.usn}</p>
              <div className="space-y-4">
                <p className="text-sm font-medium leading-relaxed max-w-[280px] ">
                  You are cordially invited to the Freshers&apos; Welcome Ceremony.
                </p>
                <p className="text-xs opacity-60">
                  Join us in celebrating the beginning of your academic excellence.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const templates: Record<number, React.FC<TemplateProps>> = {
  1: T1,
  2: T2,
  3: T3,
  4: T4,
  5: T5,
  6: T6,
  7: T7,
  8: T8,
  9: T9,
  10: T10,
  11: T11,
  12: T12,
  13: T13,
  14: T14,
  15: T15,
  16: T16,
  17: T17,
  18: T18,
  19: T19,
  20: T20,
};
