"use client";

import React, { useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

export default function Template17({ student }: { student: { id: number, usn: string, name: string } }) {
  const [opened, setOpened] = useState(false);

  return (
    <div className="w-full h-screen bg-[#050510] overflow-hidden relative font-sans">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={60} />
        <ambientLight intensity={0.1} />
        <pointLight position={[0, 0, 0]} intensity={2} color="#4466ff" />
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <Galaxy opened={opened} setOpened={setOpened} />
        
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1} />
      </Canvas>

      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: opened ? 1 : 0.8, opacity: opened ? 1 : 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="text-center bg-black/40 p-12 rounded-full backdrop-blur-md border border-indigo-500/30 shadow-[0_0_50px_rgba(68,102,255,0.2)]"
        >
          <p className="text-indigo-400 text-sm tracking-[0.4em] mb-4 uppercase">Stellar Alignment</p>
          <h1 className="text-5xl font-extralight tracking-widest text-white mb-2 uppercase">
            {student.name}
          </h1>
          <div className="h-px w-24 bg-indigo-500/50 mx-auto my-4"></div>
          <p className="text-xl text-indigo-300 tracking-[0.2em]">{student.usn}</p>
        </motion.div>
      </div>
      
      {!opened && (
        <div className="absolute bottom-1/4 w-full text-center text-indigo-200 text-sm tracking-widest animate-pulse pointer-events-none">
          ENTER THE NEBULA
        </div>
      )}
    </div>
  );
}

function Galaxy({ opened, setOpened }: { opened: boolean, setOpened: (v: boolean) => void }) {
  const particlesRef = React.useRef<THREE.Points>(null);

  useFrame((state, delta) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y -= delta * 0.2;
      if (opened) {
        particlesRef.current.scale.x = THREE.MathUtils.lerp(particlesRef.current.scale.x, 3, delta * 2);
        particlesRef.current.scale.y = THREE.MathUtils.lerp(particlesRef.current.scale.y, 3, delta * 2);
        particlesRef.current.scale.z = THREE.MathUtils.lerp(particlesRef.current.scale.z, 3, delta * 2);
      }
    }
  });

  const particleCount = 1000;
  const [posArray] = useState(() => {
    const arr = new Float32Array(particleCount * 3);
    for(let i = 0; i < particleCount * 3; i++) {
      arr[i] = (Math.random() - 0.5) * 10;
    }
    return arr;
  });

  return (
    <group onClick={() => setOpened(true)}>
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[posArray, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.05} color="#88aaff" transparent opacity={0.8} blending={THREE.AdditiveBlending} />
      </points>
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#000000" transparent opacity={opened ? 0 : 0.8} />
      </mesh>
    </group>
  );
}
