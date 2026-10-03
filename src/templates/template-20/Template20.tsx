"use client";

import React, { useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

export default function Template20({ student }: { student: { id: number, usn: string, name: string } }) {
  const [opened, setOpened] = useState(false);

  return (
    <div className="w-full h-screen bg-gradient-to-b from-blue-900 to-black overflow-hidden relative font-sans">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={50} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
        
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
          <Core opened={opened} setOpened={setOpened} />
        </Float>
        
        <OrbitControls enableZoom={false} enablePan={false} autoRotate={!opened} autoRotateSpeed={1} />
      </Canvas>

      <div className="absolute left-0 top-0 h-full w-full pointer-events-none flex items-center justify-start p-12">
        <motion.div 
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: opened ? 1 : 0, x: opened ? 0 : -100 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-left"
        >
          <div className="w-12 h-1 bg-amber-400 mb-6"></div>
          <h1 className="text-6xl font-black text-white uppercase tracking-tighter leading-none mb-4">
            {student.name.split(' ').map((part, i) => (
              <span key={i} className="block">{part}</span>
            ))}
          </h1>
          <p className="text-2xl text-blue-300 tracking-widest">{student.usn}</p>
        </motion.div>
      </div>
      
      {!opened && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-32 h-32 rounded-full border border-white/20 flex items-center justify-center animate-pulse">
            <span className="text-white/50 text-xs tracking-widest">ACTIVATE</span>
          </div>
        </div>
      )}
    </div>
  );
}

function Core({ opened, setOpened }: { opened: boolean, setOpened: (v: boolean) => void }) {
  const meshRef = React.useRef<THREE.Mesh>(null);
  const ringRef = React.useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (meshRef.current && ringRef.current) {
      if (opened) {
        meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, 0.1, delta * 3));
        ringRef.current.scale.setScalar(THREE.MathUtils.lerp(ringRef.current.scale.x, 5, delta * 2));
        ringRef.current.children.forEach(child => {
          (child as THREE.Mesh).material.opacity = THREE.MathUtils.lerp((child as THREE.Mesh).material.opacity, 0, delta * 2);
        });
      } else {
        ringRef.current.rotation.x -= delta * 0.5;
        ringRef.current.rotation.y += delta * 0.5;
      }
    }
  });

  return (
    <group onClick={() => setOpened(true)}>
      <mesh ref={meshRef}>
        <dodecahedronGeometry args={[2, 0]} />
        <meshStandardMaterial color="#3b82f6" metalness={0.8} roughness={0.2} wireframe={opened} />
      </mesh>
      
      <group ref={ringRef}>
        <mesh rotation={[Math.PI/2, 0, 0]}>
          <ringGeometry args={[3, 3.2, 64]} />
          <meshBasicMaterial color="#fbbf24" side={THREE.DoubleSide} transparent />
        </mesh>
        <mesh rotation={[0, Math.PI/2, 0]}>
          <ringGeometry args={[3, 3.2, 64]} />
          <meshBasicMaterial color="#60a5fa" side={THREE.DoubleSide} transparent />
        </mesh>
      </group>
    </group>
  );
}
