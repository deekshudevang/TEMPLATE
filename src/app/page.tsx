"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { students, Student } from "@/data/students";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [usn, setUsn] = useState("");
  const [error, setError] = useState(false);
  const [results, setResults] = useState<Student[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0); // 0: Idle, 1: Identity Found, 2: Preparing, 3: Transition
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!usn.trim()) return;

    setError(false);
    setIsSearching(true);

    const query = usn.trim().toLowerCase();
    const found = students.filter(s => s.usn.toLowerCase() === query || s.id.toString() === query);

    if (found.length === 0) {
      setTimeout(() => {
        setError(true);
        setIsSearching(false);
      }, 500);
    } else if (found.length === 1) {
      beginCinematicTransition(found[0].id);
    } else {
      setResults(found);
      setIsSearching(false);
    }
  };

  const beginCinematicTransition = (id: number) => {
    setLoadingStep(1);
    setTimeout(() => setLoadingStep(2), 800);
    setTimeout(() => {
      setLoadingStep(3);
      router.push(`/f/${id}`);
    }, 1500);
  };

  return (
    <div className="relative min-h-[100svh] overflow-hidden bg-[#050507] text-white flex flex-col items-center justify-center p-4 font-sans">
      {/* Background Layers */}
      <div className="absolute inset-0 z-0 bg-black">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(100,50,255,0.15)_0%,transparent_60%)] blur-[80px]"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 2 }}
          className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,150,255,0.15)_0%,transparent_60%)] blur-[80px]"
        />
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}></div>
      </div>

      <AnimatePresence mode="wait">
        {loadingStep === 0 && results.length === 0 && (
          <motion.div
            key="search-box"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="z-10 w-full"
          >
            <div className="glass-card text-center relative shadow-[0_0_80px_rgba(255,255,255,0.05)] border-white/10 before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/5 before:to-transparent before:rounded-[inherit] before:pointer-events-none overflow-hidden">
              <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
              <h1 className="heading-fluid font-semibold tracking-tight mb-2 text-2xl sm:text-3xl uppercase">
                Welcome To Your Next Chapter
              </h1>
              <p className="subtitle-fluid text-white/60 mb-8 max-w-sm mx-auto">
                Every fresher has a story. Let's begin yours.
              </p>

              <form onSubmit={handleSearch} className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Enter USN..."
                  value={usn}
                  onChange={(e) => {
                    setUsn(e.target.value);
                    setError(false);
                  }}
                  className="glass-input"
                  autoComplete="off"
                  spellCheck="false"
                />
                
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-red-400 text-sm mt-1 mb-2 bg-red-500/10 py-3 rounded-lg border border-red-500/20"
                    >
                      <p className="font-semibold uppercase tracking-wider mb-1 text-xs">We couldn&apos;t find your journey</p>
                      <p className="opacity-80">Please check your USN and try again.</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={isSearching || !usn.trim()}
                  className="glass-button flex items-center justify-center gap-2 mt-2"
                >
                  {isSearching ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, ease: "linear", duration: 1 }}
                      className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full"
                    />
                  ) : (
                    "BEGIN MY JOURNEY →"
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        )}

        {results.length > 0 && loadingStep === 0 && (
          <motion.div
            key="results-list"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="z-10 w-full"
          >
             <div className="glass-card text-center">
              <h2 className="heading-fluid font-semibold mb-6">Select Identity</h2>
              <div className="flex flex-col gap-3">
                {results.map((student) => (
                  <button
                    key={student.id}
                    onClick={() => beginCinematicTransition(student.id)}
                    className="glass-button text-left px-6 py-4 flex flex-col items-start min-h-[auto]"
                  >
                    <span className="font-bold text-lg">{student.name}</span>
                    <span className="text-black/60 text-sm font-mono">USN ending in ••{student.usn.length > 3 ? student.usn.slice(-3) : student.usn}</span>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setResults([])}
                className="mt-6 text-sm text-white/50 hover:text-white transition-colors tracking-widest uppercase"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}

        {loadingStep > 0 && (
          <motion.div
            key="loading-cinematic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="z-10 text-center flex flex-col items-center justify-center"
          >
            <motion.div
              animate={{
                scale: loadingStep === 3 ? 20 : 1,
                opacity: loadingStep === 3 ? 0 : 1
              }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 border border-white/20 rounded-full flex items-center justify-center mb-6 relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  className="absolute inset-0 border-t border-white rounded-full"
                />
                <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]" />
              </div>
              
              <h2 className="text-sm tracking-[0.3em] uppercase text-white/70">
                {loadingStep === 1 && "Identity Found"}
                {loadingStep === 2 && "Preparing Experience"}
              </h2>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
