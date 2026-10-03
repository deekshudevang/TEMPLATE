"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { students, Student } from "@/data/students";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { EASE_OUT, EASE_SPRING, DUR } from "@/lib/motion";
import { EVENT } from "@/config/event";

export default function Home() {
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();
  const isReduced = prefersReducedMotion;

  // States
  const [usn, setUsn] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "searching" | "success" | "multiple">("idle");
  const [results, setResults] = useState<Student[]>([]);
  const [loadingStep, setLoadingStep] = useState(0); // 0: Idle, 1: Identity Found, 2: Preparing, 3: Transition
  const [shakeKey, setShakeKey] = useState(0);
  
  // Mouse tracking for parallax and specular
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Track visibility for pausing animations
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const onVisibilityChange = () => setIsVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isReduced) return;
      setMousePos({ x: e.clientX, y: e.clientY });
      
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        cardRef.current.style.setProperty("--mx", `${x}px`);
        cardRef.current.style.setProperty("--my", `${y}px`);
        
        // Tilt effect
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;
        cardRef.current.style.setProperty("--rx", `${rotateX}deg`);
        cardRef.current.style.setProperty("--ry", `${rotateY}deg`);
      }
    };
    
    const handleMouseLeave = () => {
      if (cardRef.current) {
        cardRef.current.style.setProperty("--rx", `0deg`);
        cardRef.current.style.setProperty("--ry", `0deg`);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    if (cardRef.current) cardRef.current.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (cardRef.current) cardRef.current.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isReduced]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!usn.trim()) {
      setStatus("error");
      setShakeKey(k => k + 1);
      return;
    }

    setStatus("searching");

    const query = usn.trim().toLowerCase();
    const found = students.filter(s => s.usn.toLowerCase() === query || s.id.toString() === query);

    if (found.length === 0) {
      setTimeout(() => {
        setStatus("error");
        setShakeKey(k => k + 1);
      }, 500);
    } else if (found.length === 1) {
      beginCinematicTransition(found[0].id);
    } else {
      setResults(found);
      setStatus("multiple");
    }
  };

  const beginCinematicTransition = (id: number) => {
    setStatus("success");
    setLoadingStep(1);
    
    if (isReduced) {
      router.push(`/f/${id}`);
      return;
    }
    
    setTimeout(() => setLoadingStep(2), 500);
    setTimeout(() => {
      setLoadingStep(3);
      router.push(`/f/${id}`);
    }, 900);
  };

  const headingWords = "Welcome to your next chapter".split(" ");
  const isTransiting = loadingStep === 3;

  return (
    <div className={`relative min-h-[100svh] overflow-hidden bg-gradient-to-b from-[#05060f] to-[#0b1030] text-white flex flex-col items-center justify-center font-sans ${isTransiting ? 'pointer-events-none' : ''}`}>
      
      {/* BACKGROUNDS */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-[#05060f]">
        <style jsx>{`
          @keyframes kenburns {
            0% { transform: scale(1); }
            100% { transform: scale(1.05); }
          }
        `}</style>
        <picture>
          <source srcSet="/home/bg-desktop.avif" type="image/avif" media="(min-width: 640px)" />
          <source srcSet="/home/bg-desktop.webp" type="image/webp" media="(min-width: 640px)" />
          <source srcSet="/home/bg-mobile.avif" type="image/avif" />
          <source srcSet="/home/bg-mobile.webp" type="image/webp" />
          <img 
            src="/home/bg-desktop.png" 
            alt="Welcome Background" 
            className="w-full h-full object-cover opacity-60"
            style={{ 
              animation: (isVisible && !isReduced) ? 'kenburns 20s infinite alternate ease-in-out' : 'none',
              willChange: 'transform'
            }}
          />
        </picture>
        {/* Subtle overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#05060f]/60 via-transparent to-[#05060f]/90 mix-blend-multiply" />
      </div>

      {/* TOP PILL */}
      <motion.div 
         initial={isReduced ? { y: 0, opacity: 1 } : { y: -50, opacity: 0 }}
         animate={{ y: 0, opacity: 1 }}
         transition={{ delay: 0.2, ...EASE_SPRING }}
         className="fixed top-[max(16px,env(safe-area-inset-top))] z-50 px-4 py-2 rounded-full flex items-center justify-center gap-2"
         style={{
            background: 'rgba(255,255,255,0.06)',
            backdropFilter: 'blur(24px) saturate(160%)',
            WebkitBackdropFilter: 'blur(24px) saturate(160%)',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)'
         }}
      >
        <AnimatePresence mode="popLayout">
          {status === "success" ? (
             <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_4px_#22c55e]">
                   <motion.path 
                     initial={{ pathLength: 0 }} 
                     animate={{ pathLength: 1 }} 
                     transition={{ duration: 0.5, ease: EASE_OUT }}
                     d="M20 6L9 17l-5-5" 
                   />
                </svg>
                <span className="text-sm font-medium tracking-wide text-green-400 aria-live" role="status">Identity found ✓</span>
             </motion.div>
          ) : status === "error" ? (
             <motion.div key="error" initial={{ x: -5 }} animate={{ x: 0 }} transition={EASE_SPRING} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
                <span className="text-sm font-medium tracking-wide text-red-200">Try again</span>
             </motion.div>
          ) : status === "searching" ? (
             <motion.div key="searching" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                <div className="w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                <span className="text-sm font-medium tracking-wide">Searching...</span>
             </motion.div>
          ) : (
             <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                <motion.div 
                   animate={!isReduced ? { scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] } : {}}
                   transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                   className="w-1.5 h-1.5 rounded-full bg-white"
                />
                <span className="text-xs font-medium tracking-[0.2em] uppercase text-white/90">Freshers 2026</span>
             </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* FLASH TRANSITION */}
      <AnimatePresence>
         {isTransiting && (
            <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               transition={{ duration: 0.15 }}
               className="fixed inset-0 z-[100] bg-white"
            />
         )}
      </AnimatePresence>

      {/* MAIN CONTAINER */}
      <motion.div 
        initial={isReduced ? { opacity: 1, scale: 1 } : { opacity: 0, y: 32, filter: "blur(12px)" }}
        animate={isTransiting ? { scale: 0.96, opacity: 0, filter: "blur(10px)" } : { opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.8, ease: EASE_OUT }}
        className="w-full z-10 flex flex-col items-center px-4"
        style={{ perspective: "1000px" }}
      >
        <motion.div
           ref={cardRef}
           animate={shakeKey > 0 ? { x: [0, -8, 8, -6, 6, 0] } : {}}
           transition={{ duration: 0.4 }}
           className="relative w-full max-w-[clamp(320px,92vw,480px)] xl:max-w-[560px] rounded-[32px] p-[clamp(24px,6vw,48px)] transition-transform duration-200 ease-out"
           style={{
              background: 'rgba(255,255,255,0.06)',
              backdropFilter: 'blur(24px) saturate(160%)',
              WebkitBackdropFilter: 'blur(24px) saturate(160%)',
              boxShadow: '0 30px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.25)',
              transform: !isReduced ? `rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))` : 'none',
              transformStyle: "preserve-3d",
              animation: (isVisible && !isReduced) ? 'float 6s infinite ease-in-out' : 'none',
              willChange: 'transform'
           }}
        >
          {/* Specular sheen */}
          {!isReduced && (
            <div 
              className="absolute inset-0 rounded-[inherit] pointer-events-none opacity-40 mix-blend-overlay transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.8) 0%, transparent 40%)`
              }}
            />
          )}

          {/* Border Mask */}
          <div className="absolute inset-0 rounded-[inherit] pointer-events-none border-[1px] border-transparent" style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.35) 0%, transparent 60%) border-box',
            WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'destination-out',
            maskComposite: 'exclude'
          }} />

          {status === "multiple" ? (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col">
                <h2 className="font-display text-2xl font-semibold mb-4 text-white">Select Identity</h2>
                <div className="flex flex-col gap-3 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                   {results.map((student, i) => (
                      <motion.button
                        key={student.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        onClick={() => beginCinematicTransition(student.id)}
                        className="text-left px-5 py-4 rounded-[16px] bg-white/5 border border-white/10 hover:bg-white/15 transition-colors flex flex-col gap-1"
                      >
                        <span className="font-bold text-lg">{student.name}</span>
                        <span className="text-white/50 text-xs font-mono">USN ending in ••{student.usn.length > 3 ? student.usn.slice(-3) : student.usn}</span>
                      </motion.button>
                   ))}
                </div>
                <button
                  onClick={() => { setResults([]); setStatus("idle"); }}
                  className="mt-6 text-sm text-white/50 hover:text-white transition-colors tracking-widest uppercase font-semibold"
                >
                  Cancel
                </button>
             </motion.div>
          ) : (
            <div className="relative z-10 flex flex-col">
              
              <motion.p 
                initial={isReduced ? {} : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: DUR.base }}
                className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-white/60 mb-3"
              >
                You're Invited
              </motion.p>
              
              <h1 className="font-display font-semibold text-[clamp(28px,7vw,42px)] leading-[1.15] mb-4 text-white" style={{ textWrap: 'balance' }}>
                {headingWords.map((word, i) => (
                   <motion.span 
                     key={i}
                     initial={isReduced ? {} : { opacity: 0, y: 20, filter: "blur(4px)" }}
                     animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                     transition={{ delay: 0.6 + i * 0.06, duration: 0.8, ease: EASE_OUT }}
                     className="inline-block mr-[0.25em] text-transparent bg-clip-text bg-gradient-to-br from-white to-[#c4b5fd]"
                     style={{ animation: (isVisible && !isReduced) ? 'shimmer 6s infinite linear' : 'none' }}
                   >
                     {word}
                   </motion.span>
                ))}
              </h1>
              
              <motion.p 
                initial={isReduced ? {} : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: DUR.base }}
                className="text-white/70 text-[clamp(14px,3.5vw,16px)] leading-relaxed mb-8 font-light"
              >
                Every fresher has a story. Let's begin yours.
              </motion.p>

              <form onSubmit={handleSearch} className="flex flex-col gap-4">
                
                <motion.div 
                  initial={isReduced ? {} : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.88, duration: DUR.base }}
                  className="relative group"
                >
                  <label htmlFor="usn" className="sr-only">USN or Student ID</label>
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-[#a78bfa] group-focus-within:scale-110 transition-all duration-300">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <input
                    id="usn"
                    type="text"
                    placeholder="Enter your USN or Student ID"
                    value={usn}
                    onChange={(e) => {
                      setUsn(e.target.value);
                      if (status === "error") setStatus("idle");
                    }}
                    className="w-full h-[56px] pl-12 pr-4 rounded-[16px] bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:bg-white/10 focus:border-[#a78bfa]/50 focus:ring-4 focus:ring-[#a78bfa]/20 transition-all duration-300 caret-[#a78bfa]"
                    autoComplete="off"
                    autoCapitalize="characters"
                    inputMode="text"
                    enterKeyHint="go"
                  />
                </motion.div>

                <AnimatePresence>
                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div role="alert" className="text-red-300/90 text-sm bg-red-500/10 px-4 py-3 rounded-[12px] border border-red-500/20 font-medium">
                        We couldn't find your story. Please check your USN or Student ID and try again.
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.div
                  initial={isReduced ? {} : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.96, duration: DUR.base }}
                  className="relative"
                >
                  <button
                    type="submit"
                    disabled={status === "searching" || status === "success"}
                    className="w-full h-[56px] rounded-[16px] text-white font-semibold flex items-center justify-center gap-2 overflow-hidden group relative disabled:opacity-80 disabled:cursor-not-allowed min-h-[48px]"
                    style={{
                       background: 'linear-gradient(90deg, #7c3aed, #22d3ee, #7c3aed)',
                       backgroundSize: '200% 100%',
                       animation: (isVisible && !isReduced) ? 'buttonGradient 6s infinite linear' : 'none'
                    }}
                  >
                    {/* Glass highlight inside button */}
                    <div className="absolute inset-0 rounded-[inherit] border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] pointer-events-none" />
                    
                    {status === "searching" || status === "success" ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Preparing your experience...</span>
                        <div className="absolute bottom-0 left-0 h-1 bg-white/40 animate-pulse w-full" />
                      </>
                    ) : (
                      <>
                        <span>BEGIN MY JOURNEY</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                           <line x1="5" y1="12" x2="19" y2="12"></line>
                           <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </>
                    )}
                  </button>
                  
                  {/* Success Sparkles */}
                  {status === "success" && !isReduced && (
                     <div className="absolute inset-0 pointer-events-none">
                        {[...Array(12)].map((_, i) => {
                           const angle = (i / 12) * Math.PI * 2;
                           const dx = Math.cos(angle) * 40;
                           const dy = Math.sin(angle) * 40;
                           return (
                              <motion.div
                                 key={i}
                                 initial={{ x: '50%', y: '50%', scale: 0, opacity: 1 }}
                                 animate={{ x: `calc(50% + ${dx}px)`, y: `calc(50% + ${dy}px)`, scale: 1, opacity: 0 }}
                                 transition={{ duration: 0.6, ease: "easeOut" }}
                                 className="absolute top-0 left-0 w-1.5 h-1.5 rounded-full bg-white blur-[1px]"
                              />
                           );
                        })}
                     </div>
                  )}
                </motion.div>
                
              </form>
            </div>
          )}
        </motion.div>

      </motion.div>

    </div>
  );
}
