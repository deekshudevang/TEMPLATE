"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { students, Student } from "@/data/students";
import { getRandomTemplateId } from "@/lib/template-engine";
import { motion } from "framer-motion";

import { templates } from "@/templates";

export default function ExperiencePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [student, setStudent] = useState<Student | null>(null);
  const [templateId, setTemplateId] = useState<number | null>(null);
  
  const resolvedParams = use(params);
  
  useEffect(() => {
    const id = parseInt(resolvedParams.id, 10);
    const found = students.find(s => s.id === id);
    
    if (!found) {
      router.push("/");
      return;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStudent(found);
    setTemplateId(getRandomTemplateId());
  }, [resolvedParams.id, router]);

  if (!student || !templateId) {
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

  // Render the selected template, or a fallback if not yet implemented
  const TemplateComponent = templates[templateId];

  if (!TemplateComponent) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
        <h1 className="text-4xl font-bold mb-4">{student.name}</h1>
        <p className="text-xl text-white/60 mb-8">{student.usn}</p>
        <div className="border border-white/20 p-6 rounded-2xl max-w-md text-center">
          <p>Template {templateId} selected.</p>
          <p className="text-sm text-white/40 mt-2">(Templates 1-20 are being built)</p>
        </div>
        <button
          onClick={() => router.push("/")}
          className="mt-12 px-8 py-3 rounded-full border border-white/20 hover:bg-white/10 transition-colors tracking-widest text-sm"
        >
          EXPERIENCE AGAIN
        </button>
      </div>
    );
  }

  return <TemplateComponent student={student} />;
}
