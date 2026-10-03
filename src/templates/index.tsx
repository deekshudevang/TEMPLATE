"use client";

import React, { useState, useEffect } from "react";
import { Student } from "@/data/students";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { EVENT } from "@/config/event";
import { INVITATION_COPY } from "@/config/invitationCopy";

const replacePlaceholders = (text: string, student: Student) => {
  return text
    .replace(/{name}/g, student.name)
    .replace(/{firstName}/g, student.name.split(" ")[0])
    .replace(/{event}/g, EVENT.name)
    .replace(/{college}/g, EVENT.college)
    .replace(/{date}/g, EVENT.date)
    .replace(/{time}/g, EVENT.time)
    .replace(/{venue}/g, EVENT.venue);
};

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
              <p className="text-xs tracking-[0.3em] uppercase mb-8" style={{ color: "#D4AF37" }}>{replacePlaceholders(INVITATION_COPY[1]?.headline || "Formal Invitation 1", student)}</p>
              <h1 className="text-4xl font-light mb-2 leading-tight">{student.name}</h1>
              <p className="font-mono text-sm opacity-50 mb-4">Fresher No. {student.id}</p>
              <div className="space-y-4">
                <p className="text-sm font-medium leading-relaxed max-w-[280px] mx-auto">
                  {replacePlaceholders(INVITATION_COPY[1]?.body || "You are cordially invited to the Freshers' Welcome Ceremony.", student)}
                </p>
                <div className="pt-4 space-y-1 text-xs opacity-80 font-mono">
                  <p>{EVENT.date} at {EVENT.time}</p>
                  <p>{EVENT.venue}</p>
                </div>
                <div className="pt-6">
                  <p className="text-xs opacity-60">
                    {replacePlaceholders(INVITATION_COPY[1]?.cta || "Join us in celebrating the beginning of your academic excellence.", student)}
                  </p>
                  <p className="text-xs font-semibold mt-2 opacity-80">Hosted by {EVENT.hostedBy}</p>
                </div>
              </div>
              <div className="mt-12 flex justify-between items-center border-t border-white/10 pt-4">
                <button className="text-xs uppercase tracking-wider hover:opacity-70 transition-opacity">Decline</button>
                <button className="text-xs uppercase tracking-wider px-4 py-2 bg-white/10 hover:bg-white/20 rounded transition-colors" style={{ color: "#D4AF37" }}>Accept Invite</button>
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
              <p className="text-xs tracking-[0.3em] uppercase mb-8" style={{ color: "#e5a93c" }}>{replacePlaceholders(INVITATION_COPY[2]?.headline || "Formal Invitation 2", student)}</p>
              <h1 className="text-4xl font-light mb-2 leading-tight">{student.name}</h1>
              <p className="font-mono text-sm opacity-50 mb-4">Fresher No. {student.id}</p>
              <div className="space-y-4">
                <p className="text-sm font-medium leading-relaxed max-w-[280px] ">
                  {replacePlaceholders(INVITATION_COPY[2]?.body || "You are cordially invited to the Freshers' Welcome Ceremony.", student)}
                </p>
                <div className="pt-4 space-y-1 text-xs opacity-80 font-mono">
                  <p>{EVENT.date} at {EVENT.time}</p>
                  <p>{EVENT.venue}</p>
                </div>
                <div className="pt-6">
                  <p className="text-xs opacity-60">
                    {replacePlaceholders(INVITATION_COPY[2]?.cta || "Join us in celebrating the beginning of your academic excellence.", student)}
                  </p>
                  <p className="text-xs font-semibold mt-2 opacity-80">Hosted by {EVENT.hostedBy}</p>
                </div>
              </div>
              <div className="mt-12 flex justify-between items-center border-t border-white/10 pt-4">
                <button className="text-xs uppercase tracking-wider hover:opacity-70 transition-opacity">Decline</button>
                <button className="text-xs uppercase tracking-wider px-4 py-2 bg-white/10 hover:bg-white/20 rounded transition-colors" style={{ color: "#e5a93c" }}>Accept Invite</button>
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
              <p className="text-xs tracking-[0.3em] uppercase mb-8" style={{ color: "#85c1e9" }}>{replacePlaceholders(INVITATION_COPY[3]?.headline || "Formal Invitation 3", student)}</p>
              <h1 className="text-4xl font-light mb-2 leading-tight">{student.name}</h1>
              <p className="font-mono text-sm opacity-50 mb-4">Fresher No. {student.id}</p>
              <div className="space-y-4">
                <p className="text-sm font-medium leading-relaxed max-w-[280px] ">
                  {replacePlaceholders(INVITATION_COPY[3]?.body || "You are cordially invited to the Freshers' Welcome Ceremony.", student)}
                </p>
                <div className="pt-4 space-y-1 text-xs opacity-80 font-mono">
                  <p>{EVENT.date} at {EVENT.time}</p>
                  <p>{EVENT.venue}</p>
                </div>
                <div className="pt-6">
                  <p className="text-xs opacity-60">
                    {replacePlaceholders(INVITATION_COPY[3]?.cta || "Join us in celebrating the beginning of your academic excellence.", student)}
                  </p>
                  <p className="text-xs font-semibold mt-2 opacity-80">Hosted by {EVENT.hostedBy}</p>
                </div>
              </div>
              <div className="mt-12 flex justify-between items-center border-t border-white/10 pt-4">
                <button className="text-xs uppercase tracking-wider hover:opacity-70 transition-opacity">Decline</button>
                <button className="text-xs uppercase tracking-wider px-4 py-2 bg-white/10 hover:bg-white/20 rounded transition-colors" style={{ color: "#85c1e9" }}>Accept Invite</button>
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
              <p className="text-xs tracking-[0.3em] uppercase mb-8" style={{ color: "#d4af37" }}>{replacePlaceholders(INVITATION_COPY[4]?.headline || "Formal Invitation 4", student)}</p>
              <h1 className="text-4xl font-light mb-2 leading-tight">{student.name}</h1>
              <p className="font-mono text-sm opacity-50 mb-4">Fresher No. {student.id}</p>
              <div className="space-y-4">
                <p className="text-sm font-medium leading-relaxed max-w-[280px] ">
                  {replacePlaceholders(INVITATION_COPY[4]?.body || "You are cordially invited to the Freshers' Welcome Ceremony.", student)}
                </p>
                <div className="pt-4 space-y-1 text-xs opacity-80 font-mono">
                  <p>{EVENT.date} at {EVENT.time}</p>
                  <p>{EVENT.venue}</p>
                </div>
                <div className="pt-6">
                  <p className="text-xs opacity-60">
                    {replacePlaceholders(INVITATION_COPY[4]?.cta || "Join us in celebrating the beginning of your academic excellence.", student)}
                  </p>
                  <p className="text-xs font-semibold mt-2 opacity-80">Hosted by {EVENT.hostedBy}</p>
                </div>
              </div>
              <div className="mt-12 flex justify-between items-center border-t border-white/10 pt-4">
                <button className="text-xs uppercase tracking-wider hover:opacity-70 transition-opacity">Decline</button>
                <button className="text-xs uppercase tracking-wider px-4 py-2 bg-white/10 hover:bg-white/20 rounded transition-colors" style={{ color: "#d4af37" }}>Accept Invite</button>
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
              <p className="text-xs tracking-[0.3em] uppercase mb-8" style={{ color: "#d7bde2" }}>{replacePlaceholders(INVITATION_COPY[5]?.headline || "Formal Invitation 5", student)}</p>
              <h1 className="text-4xl font-light mb-2 leading-tight">{student.name}</h1>
              <p className="font-mono text-sm opacity-50 mb-4">Fresher No. {student.id}</p>
              <div className="space-y-4">
                <p className="text-sm font-medium leading-relaxed max-w-[280px] mx-auto">
                  {replacePlaceholders(INVITATION_COPY[5]?.body || "You are cordially invited to the Freshers' Welcome Ceremony.", student)}
                </p>
                <div className="pt-4 space-y-1 text-xs opacity-80 font-mono">
                  <p>{EVENT.date} at {EVENT.time}</p>
                  <p>{EVENT.venue}</p>
                </div>
                <div className="pt-6">
                  <p className="text-xs opacity-60">
                    {replacePlaceholders(INVITATION_COPY[5]?.cta || "Join us in celebrating the beginning of your academic excellence.", student)}
                  </p>
                  <p className="text-xs font-semibold mt-2 opacity-80">Hosted by {EVENT.hostedBy}</p>
                </div>
              </div>
              <div className="mt-12 flex justify-between items-center border-t border-white/10 pt-4">
                <button className="text-xs uppercase tracking-wider hover:opacity-70 transition-opacity">Decline</button>
                <button className="text-xs uppercase tracking-wider px-4 py-2 bg-white/10 hover:bg-white/20 rounded transition-colors" style={{ color: "#d7bde2" }}>Accept Invite</button>
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
              <p className="text-xs tracking-[0.3em] uppercase mb-8" style={{ color: "#ff3333" }}>{replacePlaceholders(INVITATION_COPY[6]?.headline || "Formal Invitation 6", student)}</p>
              <h1 className="text-4xl font-light mb-2 leading-tight">{student.name}</h1>
              <p className="font-mono text-sm opacity-50 mb-4">Fresher No. {student.id}</p>
              <div className="space-y-4">
                <p className="text-sm font-medium leading-relaxed max-w-[280px] ">
                  {replacePlaceholders(INVITATION_COPY[6]?.body || "You are cordially invited to the Freshers' Welcome Ceremony.", student)}
                </p>
                <div className="pt-4 space-y-1 text-xs opacity-80 font-mono">
                  <p>{EVENT.date} at {EVENT.time}</p>
                  <p>{EVENT.venue}</p>
                </div>
                <div className="pt-6">
                  <p className="text-xs opacity-60">
                    {replacePlaceholders(INVITATION_COPY[6]?.cta || "Join us in celebrating the beginning of your academic excellence.", student)}
                  </p>
                  <p className="text-xs font-semibold mt-2 opacity-80">Hosted by {EVENT.hostedBy}</p>
                </div>
              </div>
              <div className="mt-12 flex justify-between items-center border-t border-white/10 pt-4">
                <button className="text-xs uppercase tracking-wider hover:opacity-70 transition-opacity">Decline</button>
                <button className="text-xs uppercase tracking-wider px-4 py-2 bg-white/10 hover:bg-white/20 rounded transition-colors" style={{ color: "#ff3333" }}>Accept Invite</button>
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
              <p className="text-xs tracking-[0.3em] uppercase mb-8" style={{ color: "#154360" }}>{replacePlaceholders(INVITATION_COPY[7]?.headline || "Formal Invitation 7", student)}</p>
              <h1 className="text-4xl font-light mb-2 leading-tight">{student.name}</h1>
              <p className="font-mono text-sm opacity-50 mb-4">Fresher No. {student.id}</p>
              <div className="space-y-4">
                <p className="text-sm font-medium leading-relaxed max-w-[280px] ">
                  {replacePlaceholders(INVITATION_COPY[7]?.body || "You are cordially invited to the Freshers' Welcome Ceremony.", student)}
                </p>
                <div className="pt-4 space-y-1 text-xs opacity-80 font-mono">
                  <p>{EVENT.date} at {EVENT.time}</p>
                  <p>{EVENT.venue}</p>
                </div>
                <div className="pt-6">
                  <p className="text-xs opacity-60">
                    {replacePlaceholders(INVITATION_COPY[7]?.cta || "Join us in celebrating the beginning of your academic excellence.", student)}
                  </p>
                  <p className="text-xs font-semibold mt-2 opacity-80">Hosted by {EVENT.hostedBy}</p>
                </div>
              </div>
              <div className="mt-12 flex justify-between items-center border-t border-white/10 pt-4">
                <button className="text-xs uppercase tracking-wider hover:opacity-70 transition-opacity">Decline</button>
                <button className="text-xs uppercase tracking-wider px-4 py-2 bg-white/10 hover:bg-white/20 rounded transition-colors" style={{ color: "#154360" }}>Accept Invite</button>
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
              <p className="text-xs tracking-[0.3em] uppercase mb-8" style={{ color: "#4a3b00" }}>{replacePlaceholders(INVITATION_COPY[8]?.headline || "Formal Invitation 8", student)}</p>
              <h1 className="text-4xl font-light mb-2 leading-tight">{student.name}</h1>
              <p className="font-mono text-sm opacity-50 mb-4">Fresher No. {student.id}</p>
              <div className="space-y-4">
                <p className="text-sm font-medium leading-relaxed max-w-[280px] ">
                  {replacePlaceholders(INVITATION_COPY[8]?.body || "You are cordially invited to the Freshers' Welcome Ceremony.", student)}
                </p>
                <div className="pt-4 space-y-1 text-xs opacity-80 font-mono">
                  <p>{EVENT.date} at {EVENT.time}</p>
                  <p>{EVENT.venue}</p>
                </div>
                <div className="pt-6">
                  <p className="text-xs opacity-60">
                    {replacePlaceholders(INVITATION_COPY[8]?.cta || "Join us in celebrating the beginning of your academic excellence.", student)}
                  </p>
                  <p className="text-xs font-semibold mt-2 opacity-80">Hosted by {EVENT.hostedBy}</p>
                </div>
              </div>
              <div className="mt-12 flex justify-between items-center border-t border-white/10 pt-4">
                <button className="text-xs uppercase tracking-wider hover:opacity-70 transition-opacity">Decline</button>
                <button className="text-xs uppercase tracking-wider px-4 py-2 bg-white/10 hover:bg-white/20 rounded transition-colors" style={{ color: "#4a3b00" }}>Accept Invite</button>
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
              <p className="text-xs tracking-[0.3em] uppercase mb-8" style={{ color: "#333333" }}>{replacePlaceholders(INVITATION_COPY[9]?.headline || "Formal Invitation 9", student)}</p>
              <h1 className="text-4xl font-light mb-2 leading-tight">{student.name}</h1>
              <p className="font-mono text-sm opacity-50 mb-4">Fresher No. {student.id}</p>
              <div className="space-y-4">
                <p className="text-sm font-medium leading-relaxed max-w-[280px] mx-auto">
                  {replacePlaceholders(INVITATION_COPY[9]?.body || "You are cordially invited to the Freshers' Welcome Ceremony.", student)}
                </p>
                <div className="pt-4 space-y-1 text-xs opacity-80 font-mono">
                  <p>{EVENT.date} at {EVENT.time}</p>
                  <p>{EVENT.venue}</p>
                </div>
                <div className="pt-6">
                  <p className="text-xs opacity-60">
                    {replacePlaceholders(INVITATION_COPY[9]?.cta || "Join us in celebrating the beginning of your academic excellence.", student)}
                  </p>
                  <p className="text-xs font-semibold mt-2 opacity-80">Hosted by {EVENT.hostedBy}</p>
                </div>
              </div>
              <div className="mt-12 flex justify-between items-center border-t border-white/10 pt-4">
                <button className="text-xs uppercase tracking-wider hover:opacity-70 transition-opacity">Decline</button>
                <button className="text-xs uppercase tracking-wider px-4 py-2 bg-white/10 hover:bg-white/20 rounded transition-colors" style={{ color: "#333333" }}>Accept Invite</button>
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
              <p className="text-xs tracking-[0.3em] uppercase mb-8" style={{ color: "#00cc00" }}>{replacePlaceholders(INVITATION_COPY[10]?.headline || "Formal Invitation 10", student)}</p>
              <h1 className="text-4xl font-light mb-2 leading-tight">{student.name}</h1>
              <p className="font-mono text-sm opacity-50 mb-4">Fresher No. {student.id}</p>
              <div className="space-y-4">
                <p className="text-sm font-medium leading-relaxed max-w-[280px] ">
                  {replacePlaceholders(INVITATION_COPY[10]?.body || "You are cordially invited to the Freshers' Welcome Ceremony.", student)}
                </p>
                <div className="pt-4 space-y-1 text-xs opacity-80 font-mono">
                  <p>{EVENT.date} at {EVENT.time}</p>
                  <p>{EVENT.venue}</p>
                </div>
                <div className="pt-6">
                  <p className="text-xs opacity-60">
                    {replacePlaceholders(INVITATION_COPY[10]?.cta || "Join us in celebrating the beginning of your academic excellence.", student)}
                  </p>
                  <p className="text-xs font-semibold mt-2 opacity-80">Hosted by {EVENT.hostedBy}</p>
                </div>
              </div>
              <div className="mt-12 flex justify-between items-center border-t border-white/10 pt-4">
                <button className="text-xs uppercase tracking-wider hover:opacity-70 transition-opacity">Decline</button>
                <button className="text-xs uppercase tracking-wider px-4 py-2 bg-white/10 hover:bg-white/20 rounded transition-colors" style={{ color: "#00cc00" }}>Accept Invite</button>
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
              <p className="text-xs tracking-[0.3em] uppercase mb-8" style={{ color: "#D4AF37" }}>{replacePlaceholders(INVITATION_COPY[11]?.headline || "Formal Invitation 11", student)}</p>
              <h1 className="text-4xl font-light mb-2 leading-tight">{student.name}</h1>
              <p className="font-mono text-sm opacity-50 mb-4">Fresher No. {student.id}</p>
              <div className="space-y-4">
                <p className="text-sm font-medium leading-relaxed max-w-[280px] ">
                  {replacePlaceholders(INVITATION_COPY[11]?.body || "You are cordially invited to the Freshers' Welcome Ceremony.", student)}
                </p>
                <div className="pt-4 space-y-1 text-xs opacity-80 font-mono">
                  <p>{EVENT.date} at {EVENT.time}</p>
                  <p>{EVENT.venue}</p>
                </div>
                <div className="pt-6">
                  <p className="text-xs opacity-60">
                    {replacePlaceholders(INVITATION_COPY[11]?.cta || "Join us in celebrating the beginning of your academic excellence.", student)}
                  </p>
                  <p className="text-xs font-semibold mt-2 opacity-80">Hosted by {EVENT.hostedBy}</p>
                </div>
              </div>
              <div className="mt-12 flex justify-between items-center border-t border-white/10 pt-4">
                <button className="text-xs uppercase tracking-wider hover:opacity-70 transition-opacity">Decline</button>
                <button className="text-xs uppercase tracking-wider px-4 py-2 bg-white/10 hover:bg-white/20 rounded transition-colors" style={{ color: "#D4AF37" }}>Accept Invite</button>
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
              <p className="text-xs tracking-[0.3em] uppercase mb-8" style={{ color: "#e5a93c" }}>{replacePlaceholders(INVITATION_COPY[12]?.headline || "Formal Invitation 12", student)}</p>
              <h1 className="text-4xl font-light mb-2 leading-tight">{student.name}</h1>
              <p className="font-mono text-sm opacity-50 mb-4">Fresher No. {student.id}</p>
              <div className="space-y-4">
                <p className="text-sm font-medium leading-relaxed max-w-[280px] ">
                  {replacePlaceholders(INVITATION_COPY[12]?.body || "You are cordially invited to the Freshers' Welcome Ceremony.", student)}
                </p>
                <div className="pt-4 space-y-1 text-xs opacity-80 font-mono">
                  <p>{EVENT.date} at {EVENT.time}</p>
                  <p>{EVENT.venue}</p>
                </div>
                <div className="pt-6">
                  <p className="text-xs opacity-60">
                    {replacePlaceholders(INVITATION_COPY[12]?.cta || "Join us in celebrating the beginning of your academic excellence.", student)}
                  </p>
                  <p className="text-xs font-semibold mt-2 opacity-80">Hosted by {EVENT.hostedBy}</p>
                </div>
              </div>
              <div className="mt-12 flex justify-between items-center border-t border-white/10 pt-4">
                <button className="text-xs uppercase tracking-wider hover:opacity-70 transition-opacity">Decline</button>
                <button className="text-xs uppercase tracking-wider px-4 py-2 bg-white/10 hover:bg-white/20 rounded transition-colors" style={{ color: "#e5a93c" }}>Accept Invite</button>
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
              <p className="text-xs tracking-[0.3em] uppercase mb-8" style={{ color: "#85c1e9" }}>{replacePlaceholders(INVITATION_COPY[13]?.headline || "Formal Invitation 13", student)}</p>
              <h1 className="text-4xl font-light mb-2 leading-tight">{student.name}</h1>
              <p className="font-mono text-sm opacity-50 mb-4">Fresher No. {student.id}</p>
              <div className="space-y-4">
                <p className="text-sm font-medium leading-relaxed max-w-[280px] mx-auto">
                  {replacePlaceholders(INVITATION_COPY[13]?.body || "You are cordially invited to the Freshers' Welcome Ceremony.", student)}
                </p>
                <div className="pt-4 space-y-1 text-xs opacity-80 font-mono">
                  <p>{EVENT.date} at {EVENT.time}</p>
                  <p>{EVENT.venue}</p>
                </div>
                <div className="pt-6">
                  <p className="text-xs opacity-60">
                    {replacePlaceholders(INVITATION_COPY[13]?.cta || "Join us in celebrating the beginning of your academic excellence.", student)}
                  </p>
                  <p className="text-xs font-semibold mt-2 opacity-80">Hosted by {EVENT.hostedBy}</p>
                </div>
              </div>
              <div className="mt-12 flex justify-between items-center border-t border-white/10 pt-4">
                <button className="text-xs uppercase tracking-wider hover:opacity-70 transition-opacity">Decline</button>
                <button className="text-xs uppercase tracking-wider px-4 py-2 bg-white/10 hover:bg-white/20 rounded transition-colors" style={{ color: "#85c1e9" }}>Accept Invite</button>
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
              <p className="text-xs tracking-[0.3em] uppercase mb-8" style={{ color: "#d4af37" }}>{replacePlaceholders(INVITATION_COPY[14]?.headline || "Formal Invitation 14", student)}</p>
              <h1 className="text-4xl font-light mb-2 leading-tight">{student.name}</h1>
              <p className="font-mono text-sm opacity-50 mb-4">Fresher No. {student.id}</p>
              <div className="space-y-4">
                <p className="text-sm font-medium leading-relaxed max-w-[280px] ">
                  {replacePlaceholders(INVITATION_COPY[14]?.body || "You are cordially invited to the Freshers' Welcome Ceremony.", student)}
                </p>
                <div className="pt-4 space-y-1 text-xs opacity-80 font-mono">
                  <p>{EVENT.date} at {EVENT.time}</p>
                  <p>{EVENT.venue}</p>
                </div>
                <div className="pt-6">
                  <p className="text-xs opacity-60">
                    {replacePlaceholders(INVITATION_COPY[14]?.cta || "Join us in celebrating the beginning of your academic excellence.", student)}
                  </p>
                  <p className="text-xs font-semibold mt-2 opacity-80">Hosted by {EVENT.hostedBy}</p>
                </div>
              </div>
              <div className="mt-12 flex justify-between items-center border-t border-white/10 pt-4">
                <button className="text-xs uppercase tracking-wider hover:opacity-70 transition-opacity">Decline</button>
                <button className="text-xs uppercase tracking-wider px-4 py-2 bg-white/10 hover:bg-white/20 rounded transition-colors" style={{ color: "#d4af37" }}>Accept Invite</button>
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
              <p className="text-xs tracking-[0.3em] uppercase mb-8" style={{ color: "#d7bde2" }}>{replacePlaceholders(INVITATION_COPY[15]?.headline || "Formal Invitation 15", student)}</p>
              <h1 className="text-4xl font-light mb-2 leading-tight">{student.name}</h1>
              <p className="font-mono text-sm opacity-50 mb-4">Fresher No. {student.id}</p>
              <div className="space-y-4">
                <p className="text-sm font-medium leading-relaxed max-w-[280px] ">
                  {replacePlaceholders(INVITATION_COPY[15]?.body || "You are cordially invited to the Freshers' Welcome Ceremony.", student)}
                </p>
                <div className="pt-4 space-y-1 text-xs opacity-80 font-mono">
                  <p>{EVENT.date} at {EVENT.time}</p>
                  <p>{EVENT.venue}</p>
                </div>
                <div className="pt-6">
                  <p className="text-xs opacity-60">
                    {replacePlaceholders(INVITATION_COPY[15]?.cta || "Join us in celebrating the beginning of your academic excellence.", student)}
                  </p>
                  <p className="text-xs font-semibold mt-2 opacity-80">Hosted by {EVENT.hostedBy}</p>
                </div>
              </div>
              <div className="mt-12 flex justify-between items-center border-t border-white/10 pt-4">
                <button className="text-xs uppercase tracking-wider hover:opacity-70 transition-opacity">Decline</button>
                <button className="text-xs uppercase tracking-wider px-4 py-2 bg-white/10 hover:bg-white/20 rounded transition-colors" style={{ color: "#d7bde2" }}>Accept Invite</button>
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
              <p className="text-xs tracking-[0.3em] uppercase mb-8" style={{ color: "#ff3333" }}>{replacePlaceholders(INVITATION_COPY[16]?.headline || "Formal Invitation 16", student)}</p>
              <h1 className="text-4xl font-light mb-2 leading-tight">{student.name}</h1>
              <p className="font-mono text-sm opacity-50 mb-4">Fresher No. {student.id}</p>
              <div className="space-y-4">
                <p className="text-sm font-medium leading-relaxed max-w-[280px] ">
                  {replacePlaceholders(INVITATION_COPY[16]?.body || "You are cordially invited to the Freshers' Welcome Ceremony.", student)}
                </p>
                <div className="pt-4 space-y-1 text-xs opacity-80 font-mono">
                  <p>{EVENT.date} at {EVENT.time}</p>
                  <p>{EVENT.venue}</p>
                </div>
                <div className="pt-6">
                  <p className="text-xs opacity-60">
                    {replacePlaceholders(INVITATION_COPY[16]?.cta || "Join us in celebrating the beginning of your academic excellence.", student)}
                  </p>
                  <p className="text-xs font-semibold mt-2 opacity-80">Hosted by {EVENT.hostedBy}</p>
                </div>
              </div>
              <div className="mt-12 flex justify-between items-center border-t border-white/10 pt-4">
                <button className="text-xs uppercase tracking-wider hover:opacity-70 transition-opacity">Decline</button>
                <button className="text-xs uppercase tracking-wider px-4 py-2 bg-white/10 hover:bg-white/20 rounded transition-colors" style={{ color: "#ff3333" }}>Accept Invite</button>
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
              <p className="text-xs tracking-[0.3em] uppercase mb-8" style={{ color: "#154360" }}>{replacePlaceholders(INVITATION_COPY[17]?.headline || "Formal Invitation 17", student)}</p>
              <h1 className="text-4xl font-light mb-2 leading-tight">{student.name}</h1>
              <p className="font-mono text-sm opacity-50 mb-4">Fresher No. {student.id}</p>
              <div className="space-y-4">
                <p className="text-sm font-medium leading-relaxed max-w-[280px] mx-auto">
                  {replacePlaceholders(INVITATION_COPY[17]?.body || "You are cordially invited to the Freshers' Welcome Ceremony.", student)}
                </p>
                <div className="pt-4 space-y-1 text-xs opacity-80 font-mono">
                  <p>{EVENT.date} at {EVENT.time}</p>
                  <p>{EVENT.venue}</p>
                </div>
                <div className="pt-6">
                  <p className="text-xs opacity-60">
                    {replacePlaceholders(INVITATION_COPY[17]?.cta || "Join us in celebrating the beginning of your academic excellence.", student)}
                  </p>
                  <p className="text-xs font-semibold mt-2 opacity-80">Hosted by {EVENT.hostedBy}</p>
                </div>
              </div>
              <div className="mt-12 flex justify-between items-center border-t border-white/10 pt-4">
                <button className="text-xs uppercase tracking-wider hover:opacity-70 transition-opacity">Decline</button>
                <button className="text-xs uppercase tracking-wider px-4 py-2 bg-white/10 hover:bg-white/20 rounded transition-colors" style={{ color: "#154360" }}>Accept Invite</button>
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
              <p className="text-xs tracking-[0.3em] uppercase mb-8" style={{ color: "#4a3b00" }}>{replacePlaceholders(INVITATION_COPY[18]?.headline || "Formal Invitation 18", student)}</p>
              <h1 className="text-4xl font-light mb-2 leading-tight">{student.name}</h1>
              <p className="font-mono text-sm opacity-50 mb-4">Fresher No. {student.id}</p>
              <div className="space-y-4">
                <p className="text-sm font-medium leading-relaxed max-w-[280px] ">
                  {replacePlaceholders(INVITATION_COPY[18]?.body || "You are cordially invited to the Freshers' Welcome Ceremony.", student)}
                </p>
                <div className="pt-4 space-y-1 text-xs opacity-80 font-mono">
                  <p>{EVENT.date} at {EVENT.time}</p>
                  <p>{EVENT.venue}</p>
                </div>
                <div className="pt-6">
                  <p className="text-xs opacity-60">
                    {replacePlaceholders(INVITATION_COPY[18]?.cta || "Join us in celebrating the beginning of your academic excellence.", student)}
                  </p>
                  <p className="text-xs font-semibold mt-2 opacity-80">Hosted by {EVENT.hostedBy}</p>
                </div>
              </div>
              <div className="mt-12 flex justify-between items-center border-t border-white/10 pt-4">
                <button className="text-xs uppercase tracking-wider hover:opacity-70 transition-opacity">Decline</button>
                <button className="text-xs uppercase tracking-wider px-4 py-2 bg-white/10 hover:bg-white/20 rounded transition-colors" style={{ color: "#4a3b00" }}>Accept Invite</button>
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
              <p className="text-xs tracking-[0.3em] uppercase mb-8" style={{ color: "#333333" }}>{replacePlaceholders(INVITATION_COPY[19]?.headline || "Formal Invitation 19", student)}</p>
              <h1 className="text-4xl font-light mb-2 leading-tight">{student.name}</h1>
              <p className="font-mono text-sm opacity-50 mb-4">Fresher No. {student.id}</p>
              <div className="space-y-4">
                <p className="text-sm font-medium leading-relaxed max-w-[280px] ">
                  {replacePlaceholders(INVITATION_COPY[19]?.body || "You are cordially invited to the Freshers' Welcome Ceremony.", student)}
                </p>
                <div className="pt-4 space-y-1 text-xs opacity-80 font-mono">
                  <p>{EVENT.date} at {EVENT.time}</p>
                  <p>{EVENT.venue}</p>
                </div>
                <div className="pt-6">
                  <p className="text-xs opacity-60">
                    {replacePlaceholders(INVITATION_COPY[19]?.cta || "Join us in celebrating the beginning of your academic excellence.", student)}
                  </p>
                  <p className="text-xs font-semibold mt-2 opacity-80">Hosted by {EVENT.hostedBy}</p>
                </div>
              </div>
              <div className="mt-12 flex justify-between items-center border-t border-white/10 pt-4">
                <button className="text-xs uppercase tracking-wider hover:opacity-70 transition-opacity">Decline</button>
                <button className="text-xs uppercase tracking-wider px-4 py-2 bg-white/10 hover:bg-white/20 rounded transition-colors" style={{ color: "#333333" }}>Accept Invite</button>
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
              <p className="text-xs tracking-[0.3em] uppercase mb-8" style={{ color: "#00cc00" }}>{replacePlaceholders(INVITATION_COPY[20]?.headline || "Formal Invitation 20", student)}</p>
              <h1 className="text-4xl font-light mb-2 leading-tight">{student.name}</h1>
              <p className="font-mono text-sm opacity-50 mb-4">Fresher No. {student.id}</p>
              <div className="space-y-4">
                <p className="text-sm font-medium leading-relaxed max-w-[280px] ">
                  {replacePlaceholders(INVITATION_COPY[20]?.body || "You are cordially invited to the Freshers' Welcome Ceremony.", student)}
                </p>
                <div className="pt-4 space-y-1 text-xs opacity-80 font-mono">
                  <p>{EVENT.date} at {EVENT.time}</p>
                  <p>{EVENT.venue}</p>
                </div>
                <div className="pt-6">
                  <p className="text-xs opacity-60">
                    {replacePlaceholders(INVITATION_COPY[20]?.cta || "Join us in celebrating the beginning of your academic excellence.", student)}
                  </p>
                  <p className="text-xs font-semibold mt-2 opacity-80">Hosted by {EVENT.hostedBy}</p>
                </div>
              </div>
              <div className="mt-12 flex justify-between items-center border-t border-white/10 pt-4">
                <button className="text-xs uppercase tracking-wider hover:opacity-70 transition-opacity">Decline</button>
                <button className="text-xs uppercase tracking-wider px-4 py-2 bg-white/10 hover:bg-white/20 rounded transition-colors" style={{ color: "#00cc00" }}>Accept Invite</button>
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
