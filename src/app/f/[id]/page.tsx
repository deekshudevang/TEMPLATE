"use client";

import { useState, use, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { students } from "@/data/students";
import type { Student } from "@/data/students";
import { getRandomTemplateId } from "@/lib/template-engine";
import { motion } from "framer-motion";

import { templates } from "@/templates";
import { ThemeScope } from "@/components/ThemeScope";

export default function ExperiencePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [templateId, setTemplateId] = useState<number | null>(null);
  const [key, setKey] = useState(0);
  
  const resolvedParams = use(params);
  const id = parseInt(resolvedParams.id, 10);
  
  const found = useMemo(() => students.find(s => s.id === id) || null, [id]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Artificial small delay for effect
    const timer = setTimeout(() => {
      setTemplateId(getRandomTemplateId());
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  if (!loading && !found) {
    return (
      <div className="min-h-[100svh] bg-[#050507] text-white flex flex-col items-center justify-center p-8 font-sans relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />
        <div className="glass-card text-center z-10 relative shadow-[0_0_80px_rgba(255,255,255,0.05)] border-white/10 p-8">
          <h1 className="heading-fluid font-semibold mb-4 tracking-tight uppercase text-2xl">Identity Not Found</h1>
          <p className="subtitle-fluid text-white/60 mb-8 max-w-sm mx-auto">
            The requested student record could not be located in our system.
          </p>
          <button
            onClick={() => router.push("/")}
            className="text-xs uppercase tracking-widest px-6 py-3 border border-white/20 rounded-full hover:bg-white/10 transition-colors"
          >
            RETURN HOME
          </button>
        </div>
      </div>
    );
  }

  if (loading || !found || !templateId) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-white/50 text-xs tracking-[0.5em] uppercase font-mono"
        >
          Loading Identity...
        </motion.div>
      </div>
    );
  }

  // Render the selected template
  const TemplateComponent = templates[templateId];

  if (!TemplateComponent) {
    return null;
  }

  return (
    <ThemeScope themeId={templateId}>
      <TemplateComponent 
        key={key} 
        student={found} 
        onAgain={() => {
          setKey(k => k + 1);
          setTemplateId(getRandomTemplateId());
        }}
        onHome={() => router.push("/")}
      />
    </ThemeScope>
  );
}
