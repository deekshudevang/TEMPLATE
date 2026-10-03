"use client";

import React from "react";
import { Student } from "@/data/students";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface TemplateProps {
  student: Student;
}

const BackButton = ({ invert = false }: { invert?: boolean }) => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("/")}
      className={`absolute top-[max(24px,env(safe-area-inset-top))] left-6 z-50 transition-colors text-xs tracking-widest uppercase flex items-center gap-2 ${
        invert ? "text-black/50 hover:text-black" : "text-white/50 hover:text-white"
      }`}
    >
      <span>←</span> EXIT
    </button>
  );
};

// TEMPLATE 01: Grand Ceremony (Phase 18)
const T1 = ({ student }: TemplateProps) => (
  <div className="experience bg-black text-[#D4AF37] flex flex-col justify-center items-center text-center">
    <BackButton />
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }} className="experience-content border-y border-[#D4AF37]/30 py-12 md:py-24 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-[#D4AF37]/20 to-transparent" />
      <p className="text-xs md:text-sm tracking-[0.4em] uppercase opacity-60 mb-6 font-serif">Welcome</p>
      <h1 className="student-name font-serif mb-6">{student.name}</h1>
      <p className="usn font-serif opacity-80 tracking-widest">{student.usn}</p>
    </motion.div>
  </div>
);

// TEMPLATE 02: Cyber Identity (Phase 19)
const T2 = ({ student }: TemplateProps) => (
  <div className="experience bg-zinc-950 text-emerald-400 font-mono flex flex-col justify-center items-center relative">
    <BackButton />
    <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
    <motion.div initial={{ opacity: 0, filter: "brightness(2)" }} animate={{ opacity: 1, filter: "brightness(1)" }} transition={{ duration: 0.8 }} className="experience-content border border-emerald-500/30 p-8 md:p-16 bg-black/40 backdrop-blur-sm relative z-10">
      <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-emerald-500" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-emerald-500" />
      <p className="text-xs opacity-50 mb-4 uppercase">&gt; IDENTITY_VERIFIED</p>
      <h1 className="student-name uppercase shadow-[0_0_20px_rgba(16,185,129,0.2)]">{student.name}</h1>
      <p className="usn mt-6 opacity-70 border-t border-emerald-500/30 pt-4">{student.usn}</p>
    </motion.div>
  </div>
);

// TEMPLATE 03: Player One (Phase 20)
const T3 = ({ student }: TemplateProps) => (
  <div className="experience bg-[#0B0C10] text-[#66FCF1] flex flex-col justify-center items-center font-sans">
    <BackButton />
    <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: "spring", bounce: 0.4 }} className="experience-content text-center">
      <p className="text-sm font-bold uppercase tracking-widest mb-2 text-[#45A29E]">Level 1 Reached</p>
      <h1 className="student-name font-black italic uppercase tracking-tighter mb-4" style={{ textShadow: "4px 4px 0px rgba(69, 162, 158, 0.4)" }}>
        {student.name}
      </h1>
      <div className="inline-block bg-[#1F2833] rounded-full px-6 py-2 border border-[#45A29E]/50 mt-4">
        <p className="usn text-[#C5C6C7] font-mono">{student.usn}</p>
      </div>
    </motion.div>
  </div>
);

// TEMPLATE 04: Cinematic Story (Phase 21)
const T4 = ({ student }: TemplateProps) => (
  <div className="experience bg-[#0a0a0a] text-[#f5f5f5] flex flex-col justify-center items-center relative">
    <BackButton />
    <div className="absolute inset-0 bg-black/40 mix-blend-multiply pointer-events-none" />
    <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.9)] pointer-events-none" />
    <motion.div initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 2 }} className="experience-content text-center relative z-10">
      <h1 className="student-name font-serif mb-8 tracking-widest">{student.name}</h1>
      <div className="w-12 h-[1px] bg-white/50 mx-auto mb-8" />
      <p className="usn font-serif tracking-[0.2em] opacity-60 uppercase">{student.usn}</p>
    </motion.div>
  </div>
);

// TEMPLATE 05: Space Explorer (Phase 22)
const T5 = ({ student }: TemplateProps) => (
  <div className="experience bg-[#020014] text-indigo-100 flex flex-col justify-center items-center overflow-hidden">
    <BackButton />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-900/20 rounded-full blur-[100px] pointer-events-none" />
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5 }} className="experience-content text-center relative z-10">
      <p className="text-xs uppercase tracking-[0.5em] text-indigo-300/60 mb-6">Crew Member</p>
      <h1 className="student-name font-light mb-6 tracking-tight">{student.name}</h1>
      <p className="usn font-mono opacity-50 tracking-widest">{student.usn}</p>
    </motion.div>
  </div>
);

// TEMPLATE 06: Terminal (Phase 23)
const T6 = ({ student }: TemplateProps) => (
  <div className="experience bg-[#1e1e1e] text-[#d4d4d4] font-mono p-4 md:p-12 flex flex-col justify-start">
    <BackButton />
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="experience-content mt-20">
      <p className="mb-2">deeks@system:~$ ./init_fresher.sh</p>
      <p className="mb-2 text-[#569cd6]">Loading identity matrix...</p>
      <p className="mb-6 text-[#4ec9b0]">Success.</p>
      <div className="border-l-2 border-[#569cd6] pl-4 mb-6">
        <h1 className="text-2xl md:text-5xl font-bold mb-4">{student.name}</h1>
        <p className="usn text-[#ce9178]">ID: {student.usn}</p>
      </div>
      <p className="flex items-center gap-2">deeks@system:~$ <span className="w-2 h-5 bg-[#d4d4d4] animate-pulse" /></p>
    </motion.div>
  </div>
);

// TEMPLATE 07: Elegant Welcome (Phase 24)
const T7 = ({ student }: TemplateProps) => (
  <div className="experience bg-[#f9f9f7] text-[#2c2c2a] flex flex-col justify-center items-center text-center">
    <BackButton invert />
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: "easeOut" }} className="experience-content">
      <h1 className="student-name font-serif mb-8 text-[#1a1a18]">{student.name}</h1>
      <p className="usn font-sans tracking-[0.15em] opacity-60 uppercase">{student.usn}</p>
    </motion.div>
  </div>
);

// TEMPLATE 08: Arcade (Phase 25)
const T8 = ({ student }: TemplateProps) => (
  <div className="experience bg-[#110022] text-[#ff00ff] font-mono flex flex-col justify-center items-center relative">
    <BackButton />
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay" />
    <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[size:100%_4px] pointer-events-none" />
    <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 100 }} className="experience-content text-center border-4 border-[#00ffff] p-8 md:p-16 bg-[#110022]/80 shadow-[0_0_40px_rgba(0,255,255,0.3)]">
      <h1 className="student-name uppercase font-black text-[#ffff00] drop-shadow-[0_4px_0_#ff00ff] mb-8">
        {student.name}
      </h1>
      <p className="usn text-white text-xl animate-pulse">P1: {student.usn}</p>
    </motion.div>
  </div>
);

// TEMPLATE 09: New Memory (Phase 26)
const T9 = ({ student }: TemplateProps) => (
  <div className="experience bg-[#eaddcf] flex flex-col justify-center items-center">
    <BackButton invert />
    <motion.div initial={{ rotate: -5, y: 50, opacity: 0 }} animate={{ rotate: 2, y: 0, opacity: 1 }} transition={{ type: "spring", damping: 15 }} className="experience-content max-w-lg bg-[#fdfbf7] p-8 pb-16 md:p-12 md:pb-24 shadow-2xl relative">
      <div className="w-full aspect-square bg-[#d9cbb8] mb-8" />
      <h1 className="student-name font-serif italic text-[#3c3024] mb-2">{student.name}</h1>
      <p className="usn font-sans text-sm text-[#8c7b64]">{student.usn}</p>
    </motion.div>
  </div>
);

// TEMPLATE 10: Breaking News (Phase 27)
const T10 = ({ student }: TemplateProps) => (
  <div className="experience bg-white text-black p-6 md:p-12">
    <BackButton invert />
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="experience-content mt-16 border-t-4 border-b-2 border-black py-6">
      <p className="text-xs font-bold uppercase tracking-widest mb-4">The Campus Times</p>
      <h1 className="student-name font-serif font-black leading-none mb-6">{student.name}</h1>
      <div className="w-full h-[1px] bg-black/20 mb-6" />
      <p className="usn font-serif text-xl">{student.usn}</p>
    </motion.div>
  </div>
);

// TEMPLATE 11: New Face (Phase 28)
const T11 = ({ student }: TemplateProps) => (
  <div className="experience bg-gradient-to-br from-blue-50 to-purple-50 text-slate-800 flex flex-col justify-center items-center">
    <BackButton invert />
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="experience-content max-w-md bg-white rounded-[32px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] p-8 text-center">
      <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-400 to-purple-400 mx-auto mb-6" />
      <h1 className="student-name font-bold mb-2 text-3xl">{student.name}</h1>
      <p className="usn text-slate-500 bg-slate-100 rounded-full px-4 py-1 inline-block mt-2">{student.usn}</p>
    </motion.div>
  </div>
);

// TEMPLATE 12: AI Identification (Phase 29)
const T12 = ({ student }: TemplateProps) => (
  <div className="experience bg-[#010a15] text-[#4ea8ff] font-sans flex flex-col justify-center items-center overflow-hidden">
    <BackButton />
    <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute w-[80vw] md:w-[600px] aspect-square border border-[#4ea8ff]/20 rounded-full border-dashed" />
    <motion.div animate={{ rotate: -360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute w-[60vw] md:w-[400px] aspect-square border-2 border-[#4ea8ff]/10 rounded-full" />
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="experience-content text-center relative z-10 bg-[#010a15]/80 backdrop-blur-sm p-8 rounded-full">
      <h1 className="student-name font-light tracking-tight mb-4">{student.name}</h1>
      <p className="usn font-mono text-sm tracking-widest opacity-80">{student.usn}</p>
    </motion.div>
  </div>
);

// TEMPLATE 13: The Journey (Phase 30)
const T13 = ({ student }: TemplateProps) => (
  <div className="experience bg-[#e8efe9] text-[#2c4c3b] flex flex-col justify-center items-center text-center">
    <BackButton invert />
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 2, ease: "easeOut" }} className="experience-content">
      <h1 className="student-name font-serif mb-8 text-[#1b3326]">{student.name}</h1>
      <p className="usn font-sans tracking-[0.2em] opacity-70 uppercase">{student.usn}</p>
    </motion.div>
  </div>
);

// TEMPLATE 14: Campus Celebration (Phase 31)
const T14 = ({ student }: TemplateProps) => (
  <div className="experience bg-[#FF4F00] text-white flex flex-col justify-center items-center text-center">
    <BackButton />
    <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", bounce: 0.6 }} className="experience-content">
      <h1 className="student-name font-black uppercase italic tracking-tighter mb-4 text-yellow-300 drop-shadow-xl">{student.name}</h1>
      <div className="bg-white text-[#FF4F00] px-6 py-2 rounded-full inline-block font-bold">
        <p className="usn">{student.usn}</p>
      </div>
    </motion.div>
  </div>
);

// TEMPLATE 15: Spotlight (Phase 32)
const T15 = ({ student }: TemplateProps) => (
  <div className="experience bg-black text-white flex flex-col justify-center items-center relative overflow-hidden">
    <BackButton />
    <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[200vw] md:w-[800px] h-[120%] bg-gradient-to-b from-white/20 via-white/5 to-transparent blur-[40px] pointer-events-none" />
    <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.5, ease: "circOut" }} className="experience-content text-center relative z-10 mt-32">
      <h1 className="student-name font-serif mb-6 drop-shadow-2xl">{student.name}</h1>
      <p className="usn opacity-50 tracking-[0.3em] font-light">{student.usn}</p>
    </motion.div>
  </div>
);

// TEMPLATE 16: The Feature (Phase 33)
const T16 = ({ student }: TemplateProps) => (
  <div className="experience bg-[#f4f4f4] text-[#111] p-6 md:p-16 flex flex-col justify-center">
    <BackButton invert />
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="experience-content max-w-4xl border-l-4 border-red-600 pl-6 md:pl-12 py-8">
      <h1 className="student-name font-serif font-black tracking-tight mb-8 leading-[0.9]">{student.name}</h1>
      <p className="usn font-sans font-bold text-red-600 text-xl tracking-widest">{student.usn}</p>
    </motion.div>
  </div>
);

// TEMPLATE 17: Mystery (Phase 34)
const T17 = ({ student }: TemplateProps) => (
  <div className="experience bg-[#09090b] text-[#71717a] flex flex-col justify-center items-center text-center">
    <BackButton />
    <motion.div initial={{ filter: "blur(20px)", opacity: 0 }} animate={{ filter: "blur(0px)", opacity: 1 }} transition={{ duration: 2.5 }} className="experience-content">
      <h1 className="student-name font-light tracking-[0.1em] text-[#e4e4e7] mb-8">{student.name}</h1>
      <p className="usn font-mono text-xs tracking-[0.5em]">{student.usn}</p>
    </motion.div>
  </div>
);

// TEMPLATE 18: Campus Passport (Phase 35)
const T18 = ({ student }: TemplateProps) => (
  <div className="experience bg-[#2b4c7e] flex flex-col justify-center items-center p-4">
    <BackButton />
    <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="experience-content max-w-2xl w-full bg-[#fdfbf7] rounded-xl shadow-2xl overflow-hidden border border-white/20">
      <div className="bg-[#1a3256] text-white p-4 flex justify-between items-center">
        <span className="font-bold tracking-widest uppercase text-sm">Official Entry</span>
        <span className="opacity-50 text-xs">2026</span>
      </div>
      <div className="p-8 md:p-12 text-[#2c3e50]">
        <p className="text-xs uppercase tracking-widest opacity-50 mb-2">Name</p>
        <h1 className="student-name font-serif font-bold mb-8 text-3xl md:text-5xl">{student.name}</h1>
        <p className="text-xs uppercase tracking-widest opacity-50 mb-2">ID Number</p>
        <p className="usn font-mono text-xl">{student.usn}</p>
      </div>
    </motion.div>
  </div>
);

// TEMPLATE 19: The Energy (Phase 36)
const T19 = ({ student }: TemplateProps) => (
  <div className="experience bg-gradient-to-br from-[#FF0055] via-[#FF5500] to-[#FFCC00] text-white flex flex-col justify-center items-center overflow-hidden">
    <BackButton />
    <motion.div initial={{ skewY: 10, y: 100, opacity: 0 }} animate={{ skewY: -5, y: 0, opacity: 1 }} transition={{ type: "spring", damping: 12 }} className="experience-content text-center">
      <h1 className="student-name font-black uppercase leading-none mb-6 drop-shadow-2xl">{student.name}</h1>
      <div className="bg-black text-white px-8 py-3 transform skew-y-3 inline-block">
        <p className="usn font-bold tracking-widest">{student.usn}</p>
      </div>
    </motion.div>
  </div>
);

// TEMPLATE 20: Portal (Phase 37)
const T20 = ({ student }: TemplateProps) => (
  <div className="experience bg-[#040014] text-[#d6b4fc] flex flex-col justify-center items-center relative overflow-hidden">
    <BackButton />
    <motion.div animate={{ rotate: 360, scale: [1, 1.1, 1] }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="absolute w-[150vw] md:w-[800px] aspect-square bg-[conic-gradient(from_0deg,transparent,rgba(168,85,247,0.2),transparent)] rounded-full blur-[20px]" />
    <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.5, ease: "circOut" }} className="experience-content text-center relative z-10 bg-black/40 backdrop-blur-md p-12 rounded-[40px] border border-purple-500/20">
      <h1 className="student-name font-sans font-semibold tracking-tight mb-4 text-white drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">{student.name}</h1>
      <p className="usn font-mono tracking-widest opacity-80">{student.usn}</p>
    </motion.div>
  </div>
);

// 20 unique templates mapped
export const templates: Record<number, React.FC<TemplateProps>> = {
  1: T1, 2: T2, 3: T3, 4: T4, 5: T5,
  6: T6, 7: T7, 8: T8, 9: T9, 10: T10,
  11: T11, 12: T12, 13: T13, 14: T14, 15: T15,
  16: T16, 17: T17, 18: T18, 19: T19, 20: T20,
};
