"use client";

import React, { useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

export default function Template19({ student }: { student: { id: number, usn: string, name: string } }) {
  const [opened, setOpened] = useState(false);

  return (
    <div className="w-full h-screen bg-rose-950 overflow-hidden relative font-sans">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={45} />
        <ambientLight intensity={0.4} />
        <pointLight position={[0, 0, 0]} intensity={2} color="#ff3366" />
        
        <Fractal opened={opened} setOpened={setOpened} />
        
        <OrbitControls enableZoom={false} enablePan={false} autoRotate={!opened} autoRotateSpeed={2} />
      </Canvas>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, rotateX: 90 }}
          animate={{ opacity: opened ? 1 : 0, rotateX: opened ? 0 : 90 }}
          transition={{ duration: 1, type: "spring", bounce: 0.5 }}
          className="bg-white/10 backdrop-blur-md p-10 rounded-2xl shadow-2xl text-center border border-rose-500/30"
          style={{ transformPerspective: 1000 }}
        >
          <div className="w-16 h-16 bg-rose-500 rounded-full mx-auto mb-6 flex items-center justify-center">
            <span className="text-2xl text-white font-bold">{student.name.charAt(0)}</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">{student.name}</h1>
          <p className="text-rose-200 text-lg">{student.usn}</p>
        </motion.div>
      </div>
      
      {!opened && (
        <div className="absolute bottom-10 w-full text-center text-rose-300 text-sm tracking-widest pointer-events-none animate-bounce">
          CLICK TO REVEAL
        </div>
      )}
    </div>
  );
}

function Fractal({ opened, setOpened }: { opened: boolean, setOpened: (v: boolean) => void }) {
  const groupRef = React.useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.x += delta * 0.5;
      groupRef.current.rotation.y += delta * 0.8;
      
      if (opened) {
        groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, 0, delta * 4));
      }
    }
  });

  return (
    <group ref={groupRef} onClick={() => setOpened(true)}>
      {Array.from({ length: 20 }).map((_, i) => (
        <mesh key={i} rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]} scale={1 - i * 0.04}>
          <torusGeometry args={[3, 0.1, 16, 100]} />
          <meshStandardMaterial color={new THREE.Color(`hsl(${330 + i * 2}, 100%, 60%)`)} emissive={new THREE.Color(`hsl(${330 + i * 2}, 100%, 30%)`)} wireframe />
        </mesh>
      ))}
    </group>
  );
}
