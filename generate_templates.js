/* eslint-disable */
const fs = require('fs');
const path = require('path');

let templatesContent = '"use client";\n\n';
templatesContent += 'import React, { useState, useEffect } from "react";\n';
templatesContent += 'import { Student } from "@/data/students";\n';
templatesContent += 'import { useRouter } from "next/navigation";\n';
templatesContent += 'import { motion, AnimatePresence } from "framer-motion";\n\n';

templatesContent += 'interface TemplateProps { student: Student; }\n\n';

templatesContent += 'const BackButton = ({ invert = false }: { invert?: boolean }) => {\n';
templatesContent += '  const router = useRouter();\n';
templatesContent += '  return (\n';
templatesContent += '    <button onClick={() => router.push("/")} className={`absolute top-[max(24px,env(safe-area-inset-top))] left-6 z-50 transition-colors text-xs tracking-widest uppercase flex items-center gap-2 ${invert ? "text-black/70 hover:text-black" : "text-white/70 hover:text-white"} font-sans drop-shadow-md`}>\n';
templatesContent += '      <span>←</span> EXIT\n';
templatesContent += '    </button>\n';
templatesContent += '  );\n';
templatesContent += '};\n\n';

for (let i = 0; i < 20; i++) {
  const n = i + 1;
  const layouts = ['center', 'left', 'right', 'bottom'];
  const layout = layouts[i % layouts.length];
  
  const bgColors = ['#050505', '#1a0505', '#020512', '#03150c', '#0a0515', '#080808', '#dbe9f4', '#1a1813', '#d0d0d0', '#000000'];
  const textColors = ['#ffffff', '#ffeded', '#ffffff', '#e8f8f5', '#ffffff', '#cccccc', '#1b4f72', '#ffd700', '#111111', '#00ff00'];
  const accentColors = ['#D4AF37', '#e5a93c', '#85c1e9', '#d4af37', '#d7bde2', '#ff3333', '#154360', '#4a3b00', '#333333', '#00cc00'];

  const bg = bgColors[i % bgColors.length];
  const tc = textColors[i % textColors.length];
  const ac = accentColors[i % accentColors.length];

  templatesContent += `
const T${n} = ({ student }: TemplateProps) => {
  const [showStory, setShowStory] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setShowStory(false), 12000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="w-full min-h-[100svh] relative overflow-hidden" style={{ backgroundColor: "${bg}", color: "${tc}" }}>
      <BackButton invert={${bg === '#dbe9f4' || bg === '#d0d0d0' ? 'true' : 'false'}} />
      <AnimatePresence mode="wait">
        {showStory ? (
          <motion.div key="story" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex items-center justify-center p-8 cursor-pointer z-10" onClick={() => setShowStory(false)}>
            <div className="text-center max-w-sm">
              <motion.h2 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 1 }} className="text-2xl font-serif mb-6" style={{ color: "${ac}" }}>
                A new journey begins...
              </motion.h2>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }} className="text-sm uppercase tracking-widest opacity-60 mt-12">
                Tap to skip
              </motion.p>
            </div>
          </motion.div>
        ) : (
          <motion.div key="card" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="absolute inset-0 flex flex-col items-${layout === 'center' ? 'center text-center' : layout === 'left' ? 'start text-left' : layout === 'right' ? 'end text-right' : 'center text-center justify-end pb-24'} p-8 z-20 ${layout === 'bottom' ? '' : 'justify-center'}">
            <div className="border border-white/20 p-8 backdrop-blur-xl bg-black/20 rounded-2xl w-full max-w-md shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
              <p className="text-xs tracking-[0.3em] uppercase mb-8" style={{ color: "${ac}" }}>Formal Invitation ${n}</p>
              <h1 className="text-4xl font-light mb-2 leading-tight">{student.name}</h1>
              <p className="font-mono text-sm opacity-50 mb-12">{student.usn}</p>
              <div className="space-y-4">
                <p className="text-sm font-medium leading-relaxed max-w-[280px] ${layout === 'center' ? 'mx-auto' : ''}">
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
`;
}

templatesContent += '\nexport const templates: Record<number, React.FC<TemplateProps>> = {\n';
for (let i = 1; i <= 20; i++) {
  templatesContent += `  ${i}: T${i},\n`;
}
templatesContent += '};\n';

fs.writeFileSync(path.join(__dirname, 'src/templates/index.tsx'), templatesContent);
console.log('Templates written.');
