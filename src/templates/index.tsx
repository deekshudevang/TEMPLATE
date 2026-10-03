"use client";

import React, { Suspense } from "react";
import { Student } from "@/data/students";
import { useRouter } from "next/navigation";
import { Canvas } from "@react-three/fiber";
import { 
  Text, 
  Environment, 
  ContactShadows, 
  PresentationControls, 
  Float,
  Sparkles,
  Stars,
  MeshTransmissionMaterial,
  RoundedBox
} from "@react-three/drei";

interface TemplateProps {
  student: Student;
}

const BackButton = ({ invert = false }: { invert?: boolean }) => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("/")}
      className={`absolute top-[max(24px,env(safe-area-inset-top))] left-6 z-50 transition-colors text-xs tracking-widest uppercase flex items-center gap-2 ${
        invert ? "text-black/70 hover:text-black" : "text-white/70 hover:text-white"
      } font-sans drop-shadow-md`}
    >
      <span>←</span> EXIT
    </button>
  );
};

interface BaseCardProps {
  student: Student;
  title: string;
  material: React.ReactNode;
  textColor?: string;
  accentColor?: string;
  extraNodes?: React.ReactNode;
}

const BaseCard = ({ 
  student, 
  title, 
  material, 
  textColor = "#ffffff", 
  accentColor = "#D4AF37",
  extraNodes 
}: BaseCardProps) => {
  return (
    <PresentationControls 
      global 
      rotation={[0, 0, 0]} 
      polar={[-0.1, 0.1]} 
      azimuth={[-0.3, 0.3]} 
    >
      <Float rotationIntensity={0.2} floatIntensity={0.5} speed={1.5}>
        <RoundedBox args={[3.2, 4.8, 0.08]} radius={0.05} smoothness={4}>
          {material}
        </RoundedBox>

        <Text
          position={[0, 1.4, 0.041]}
          fontSize={0.2}
          color={accentColor}
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.2}
          outlineWidth={0.005}
          outlineColor={accentColor}
        >
          {title.toUpperCase()}
        </Text>

        <mesh position={[0, 0.8, 0.041]}>
          <planeGeometry args={[2, 0.008]} />
          <meshBasicMaterial color={accentColor} transparent opacity={0.6} />
        </mesh>

        <Text
          position={[0, 0.3, 0.041]}
          fontSize={0.12}
          color={textColor}
          anchorX="center"
          anchorY="middle"
          maxWidth={2.2}
          textAlign="center"
          lineHeight={1.6}
          letterSpacing={0.05}
        >
          YOU ARE CORDIALLY INVITED TO THE{"\n"}FRESHERS&apos; WELCOME CEREMONY
        </Text>

        <Text
          position={[0, -0.6, 0.041]}
          fontSize={0.32}
          color={textColor}
          anchorX="center"
          anchorY="middle"
          maxWidth={2.8}
          textAlign="center"
          outlineWidth={0.01}
          outlineColor={textColor}
        >
          {student.name}
        </Text>

        <Text
          position={[0, -1.3, 0.041]}
          fontSize={0.14}
          color={accentColor}
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.15}
        >
          {student.usn}
        </Text>

        {extraNodes}
      </Float>
    </PresentationControls>
  );
};

// 1. Golden Ticket (Matte Black & Gold)
const T1 = ({ student }: TemplateProps) => (
  <div className="w-full h-[100svh] bg-[#050505]">
    <BackButton />
    <Canvas camera={{ position: [0, 0, 7.5], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1.5} />
      <Environment preset="city" />
      <Suspense fallback={null}>
        <BaseCard 
          student={student} 
          title="Golden Ticket"
          material={<meshStandardMaterial color="#111" metalness={0.8} roughness={0.2} />}
          accentColor="#D4AF37"
          textColor="#ffffff"
        />
      </Suspense>
      <ContactShadows position={[0, -3, 0]} opacity={0.5} scale={10} blur={2.5} far={4} />
    </Canvas>
  </div>
);

// 2. Glassmorphism
const T2 = ({ student }: TemplateProps) => (
  <div className="w-full h-[100svh] bg-gradient-to-br from-indigo-900 to-purple-900">
    <BackButton />
    <Canvas camera={{ position: [0, 0, 7.5], fov: 45 }}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      <Environment preset="apartment" />
      <Suspense fallback={null}>
        <BaseCard 
          student={student} 
          title="Premium Invite"
          material={<MeshTransmissionMaterial thickness={0.5} roughness={0.1} transmission={1} ior={1.5} chromaticAberration={0.05} color="#ffffff" />}
          accentColor="#ffffff"
          textColor="#f0f0f0"
        />
      </Suspense>
      <mesh position={[-2, -2, -3]}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial color="#ff0066" />
      </mesh>
      <mesh position={[2, 2, -4]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial color="#00ffff" />
      </mesh>
    </Canvas>
  </div>
);

// 3. Cyberpunk
const T3 = ({ student }: TemplateProps) => (
  <div className="w-full h-[100svh] bg-[#020205]">
    <BackButton />
    <Canvas camera={{ position: [0, 0, 7.5], fov: 45 }}>
      <ambientLight intensity={0.2} />
      <spotLight position={[0, 5, 5]} angle={0.5} penumbra={1} intensity={2} color="#00ff88" />
      <Environment preset="night" />
      <Suspense fallback={null}>
        <BaseCard 
          student={student} 
          title="Cyber Access"
          material={<meshStandardMaterial color="#050510" metalness={0.9} roughness={0.1} />}
          accentColor="#00ff88"
          textColor="#ffffff"
        />
      </Suspense>
    </Canvas>
  </div>
);

// 4. Pure Chrome
const T4 = ({ student }: TemplateProps) => (
  <div className="w-full h-[100svh] bg-[#d0d0d0]">
    <BackButton invert />
    <Canvas camera={{ position: [0, 0, 7.5], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <Environment preset="studio" />
      <Suspense fallback={null}>
        <BaseCard 
          student={student} 
          title="VIP Access"
          material={<meshStandardMaterial color="#e0e0e0" metalness={1} roughness={0} />}
          accentColor="#333333"
          textColor="#111111"
        />
      </Suspense>
      <ContactShadows position={[0, -3, 0]} opacity={0.3} scale={10} blur={2} far={4} color="#000000" />
    </Canvas>
  </div>
);

// 5. White Pearl
const T5 = ({ student }: TemplateProps) => (
  <div className="w-full h-[100svh] bg-[#f8f9fa]">
    <BackButton invert />
    <Canvas camera={{ position: [0, 0, 7.5], fov: 45 }}>
      <ambientLight intensity={1} />
      <directionalLight position={[-5, 5, 5]} intensity={0.5} color="#ffddf4" />
      <directionalLight position={[5, -5, 5]} intensity={0.5} color="#ddf4ff" />
      <Environment preset="dawn" />
      <Suspense fallback={null}>
        <BaseCard 
          student={student} 
          title="Special Guest"
          material={<meshPhysicalMaterial color="#ffffff" metalness={0.1} roughness={0.1} clearcoat={1} clearcoatRoughness={0.1} iridescence={1} iridescenceIOR={1.5} />}
          accentColor="#8892b0"
          textColor="#233554"
        />
      </Suspense>
    </Canvas>
  </div>
);

// 6. Ruby Velvet
const T6 = ({ student }: TemplateProps) => (
  <div className="w-full h-[100svh] bg-[#1a0505]">
    <BackButton />
    <Canvas camera={{ position: [0, 0, 7.5], fov: 45 }}>
      <ambientLight intensity={0.3} />
      <directionalLight position={[2, 5, 2]} intensity={1.5} color="#ff4444" />
      <Environment preset="sunset" />
      <Suspense fallback={null}>
        <BaseCard 
          student={student} 
          title="Honored Guest"
          material={<meshStandardMaterial color="#4a0404" metalness={0.3} roughness={0.8} />}
          accentColor="#e5a93c"
          textColor="#ffeded"
        />
      </Suspense>
    </Canvas>
  </div>
);

// 7. Amethyst
const T7 = ({ student }: TemplateProps) => (
  <div className="w-full h-[100svh] bg-[#0a0515]">
    <BackButton />
    <Canvas camera={{ position: [0, 0, 7.5], fov: 45 }}>
      <ambientLight intensity={0.2} />
      <Environment preset="city" />
      <Suspense fallback={null}>
        <BaseCard 
          student={student} 
          title="Exclusive Entry"
          material={<MeshTransmissionMaterial thickness={1} roughness={0.1} transmission={1} ior={1.8} chromaticAberration={0.1} color="#5b2c6f" />}
          accentColor="#e0e0e0"
          textColor="#ffffff"
          extraNodes={<Sparkles count={50} scale={5} size={2} speed={0.4} opacity={0.5} color="#d7bde2" />}
        />
      </Suspense>
    </Canvas>
  </div>
);

// 8. Emerald
const T8 = ({ student }: TemplateProps) => (
  <div className="w-full h-[100svh] bg-[#03150c]">
    <BackButton />
    <Canvas camera={{ position: [0, 0, 7.5], fov: 45 }}>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 10, 2]} intensity={1} />
      <Environment preset="forest" />
      <Suspense fallback={null}>
        <BaseCard 
          student={student} 
          title="Elite Member"
          material={<meshPhysicalMaterial color="#0b5345" metalness={0.6} roughness={0.1} clearcoat={1} />}
          accentColor="#d4af37"
          textColor="#e8f8f5"
        />
      </Suspense>
    </Canvas>
  </div>
);

// 9. Obsidian
const T9 = ({ student }: TemplateProps) => (
  <div className="w-full h-[100svh] bg-[#080808]">
    <BackButton />
    <Canvas camera={{ position: [0, 0, 7.5], fov: 45 }}>
      <ambientLight intensity={0.1} />
      <spotLight position={[0, 10, 0]} intensity={2} angle={0.6} penumbra={1} color="#ff3333" />
      <Environment preset="night" />
      <Suspense fallback={null}>
        <BaseCard 
          student={student} 
          title="The Initiation"
          material={<meshStandardMaterial color="#000000" metalness={0.9} roughness={0.05} />}
          accentColor="#ff3333"
          textColor="#cccccc"
        />
      </Suspense>
    </Canvas>
  </div>
);

// 10. Arctic Ice
const T10 = ({ student }: TemplateProps) => (
  <div className="w-full h-[100svh] bg-[#dbe9f4]">
    <BackButton invert />
    <Canvas camera={{ position: [0, 0, 7.5], fov: 45 }}>
      <ambientLight intensity={1} />
      <Environment preset="dawn" />
      <Suspense fallback={null}>
        <BaseCard 
          student={student} 
          title="Winter Gala"
          material={<MeshTransmissionMaterial thickness={2} roughness={0.2} transmission={0.9} ior={1.3} color="#a9cce3" />}
          accentColor="#154360"
          textColor="#1b4f72"
        />
      </Suspense>
    </Canvas>
  </div>
);

// 11. Midnight Stars
const T11 = ({ student }: TemplateProps) => (
  <div className="w-full h-[100svh] bg-[#020512]">
    <BackButton />
    <Canvas camera={{ position: [0, 0, 7.5], fov: 45 }}>
      <ambientLight intensity={0.2} />
      <directionalLight position={[0, 5, 5]} intensity={1} color="#ffffff" />
      <Suspense fallback={null}>
        <BaseCard 
          student={student} 
          title="Starlight Invite"
          material={<meshStandardMaterial color="#050a1f" metalness={0.5} roughness={0.5} />}
          accentColor="#85c1e9"
          textColor="#ffffff"
        />
        <Stars radius={50} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      </Suspense>
    </Canvas>
  </div>
);

// 12. Solid Gold
const T12 = ({ student }: TemplateProps) => (
  <div className="w-full h-[100svh] bg-[#1a1813]">
    <BackButton />
    <Canvas camera={{ position: [0, 0, 7.5], fov: 45 }}>
      <ambientLight intensity={0.4} />
      <Environment preset="apartment" />
      <Suspense fallback={null}>
        <BaseCard 
          student={student} 
          title="The Royal"
          material={<meshStandardMaterial color="#ffd700" metalness={1} roughness={0.2} />}
          accentColor="#4a3b00"
          textColor="#2a2200"
        />
      </Suspense>
    </Canvas>
  </div>
);

// 13. Neon Matrix
const T13 = ({ student }: TemplateProps) => (
  <div className="w-full h-[100svh] bg-black">
    <BackButton />
    <Canvas camera={{ position: [0, 0, 7.5], fov: 45 }}>
      <ambientLight intensity={0.1} />
      <directionalLight position={[0, 0, 5]} intensity={1} color="#00ff00" />
      <Suspense fallback={null}>
        <BaseCard 
          student={student} 
          title="System Access"
          material={<meshBasicMaterial color="#001100" wireframe />}
          accentColor="#00ff00"
          textColor="#00cc00"
        />
      </Suspense>
    </Canvas>
  </div>
);

// 14. Holographic
const T14 = ({ student }: TemplateProps) => (
  <div className="w-full h-[100svh] bg-[#101015]">
    <BackButton />
    <Canvas camera={{ position: [0, 0, 7.5], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <Environment preset="city" />
      <Suspense fallback={null}>
        <BaseCard 
          student={student} 
          title="Virtual Event"
          material={<meshPhysicalMaterial color="#ffffff" metalness={0.1} roughness={0} transmission={0.9} ior={1.1} iridescence={1} iridescenceIOR={1.3} thickness={1} />}
          accentColor="#ffffff"
          textColor="#ffffff"
        />
      </Suspense>
      <mesh position={[-2, 1, -2]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#ff00ff" />
      </mesh>
      <mesh position={[2, -1, -2]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#00ffff" />
      </mesh>
    </Canvas>
  </div>
);

// 15. Crimson Matte
const T15 = ({ student }: TemplateProps) => (
  <div className="w-full h-[100svh] bg-[#1a1a1a]">
    <BackButton />
    <Canvas camera={{ position: [0, 0, 7.5], fov: 45 }}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />
      <Suspense fallback={null}>
        <BaseCard 
          student={student} 
          title="The Finale"
          material={<meshStandardMaterial color="#8b0000" metalness={0.1} roughness={0.9} />}
          accentColor="#ffaaaa"
          textColor="#ffffff"
        />
      </Suspense>
    </Canvas>
  </div>
);

// 15 unique premium templates mapped
export const templates: Record<number, React.FC<TemplateProps>> = {
  1: T1, 2: T2, 3: T3, 4: T4, 5: T5,
  6: T6, 7: T7, 8: T8, 9: T9, 10: T10,
  11: T11, 12: T12, 13: T13, 14: T14, 15: T15,
};
