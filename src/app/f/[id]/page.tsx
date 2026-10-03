"use client";

import { useState, use, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Student } from "@/data/students";
import { getRandomTemplateId } from "@/lib/template-engine";
import { motion } from "framer-motion";

import { templates } from "@/templates";

export default function ExperiencePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [templateId, setTemplateId] = useState<number | null>(() => getRandomTemplateId());
  const [key, setKey] = useState(0);
  
  const resolvedParams = use(params);
  const id = parseInt(resolvedParams.id, 10);
  
  const [found, setFound] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`/api/students/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then(data => {
        setFound(data.student);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [id]);

  if (error) {
    return (
      <div className="min-h-[100svh] bg-[#050507] text-white flex flex-col items-center justify-center p-8 font-sans relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />
        <div className="glass-card text-center z-10 relative shadow-[0_0_80px_rgba(255,255,255,0.05)] border-white/10">
          <h1 className="heading-fluid font-semibold mb-4 tracking-tight uppercase text-2xl">Identity Not Found</h1>
          <p className="subtitle-fluid text-white/60 mb-8 max-w-sm mx-auto">
            The requested student record could not be located in our system.
          </p>
          <button
            onClick={() => router.push("/")}
            className="glass-button text-sm uppercase tracking-widest px-6 py-3 border border-white/20 rounded-full"
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
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-16 h-16 border-t-2 border-white rounded-full animate-spin"
        />
      </div>
    );
  }

  // Render the selected template
  const TemplateComponent = templates[templateId];

  if (!TemplateComponent) {
    return null;
  }

  return (
    <div className="relative w-full h-full">
      <TemplateComponent key={key} student={found} />
      
      {/* Experience Again Button overlay */}
      <div className="absolute top-6 right-6 z-50">
        <button
          onClick={() => {
            setKey(k => k + 1);
            setTemplateId(getRandomTemplateId());
          }}
          className="px-6 py-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-xs font-medium text-white/80 hover:text-white hover:bg-white/10 hover:scale-105 transition-all uppercase tracking-widest shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
        >
          EXPERIENCE AGAIN
        </button>
      </div>
    </div>
  );
}
