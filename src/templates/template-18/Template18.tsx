"use client";

import React, { useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, Grid } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

export default function Template18({ student }: { student: { id: number, usn: string, name: string } }) {
  const [opened, setOpened] = useState(false);

  return (
    <div className="w-full h-screen bg-[#0a0f0a] overflow-hidden relative font-mono">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 5, 10]} fov={50} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 10, 5]} intensity={1} color="#00ff00" />
        
        <Grid position={[0, -2, 0]} args={[50, 50]} cellSize={1} cellThickness={1} cellColor="#004400" sectionSize={5} sectionThickness={1.5} sectionColor="#00ff00" fadeDistance={30} />
        
        <DataCube opened={opened} setOpened={setOpened} />
        
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>

      <div className="absolute inset-0 p-8 pointer-events-none flex flex-col justify-between">
        <div className="text-[#00ff00] text-sm opacity-50">
          <p>SYSTEM.BOOT</p>
          <p>SCANNING_ID: {student.usn.substring(0, 4)}***</p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: opened ? 1 : 0, x: opened ? 0 : -50 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="bg-[#002200]/80 p-6 border-l-4 border-[#00ff00] backdrop-blur-sm self-start max-w-md w-full"
        >
          <p className="text-[#00ff00] text-xs mb-2 animate-pulse">&gt; DECRYPTED_PROFILE</p>
          <h1 className="text-3xl font-bold text-white uppercase mb-1">
            {student.name}
          </h1>
          <p className="text-[#88ff88] text-lg font-mono">ID: {student.usn}</p>
        </motion.div>
      </div>
      
      {!opened && (
        <div className="absolute top-1/2 w-full text-center text-[#00ff00] text-xl font-bold animate-ping pointer-events-none">
          [ ACCESS DATA ]
        </div>
      )}
    </div>
  );
}

function DataCube({ opened, setOpened }: { opened: boolean, setOpened: (v: boolean) => void }) {
  const meshRef = React.useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta;
      meshRef.current.rotation.y += delta * 1.5;
      if (opened) {
        meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, 8, delta * 2);
        meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, 0, delta * 3));
      }
    }
  });

  return (
    <group onClick={() => setOpened(true)}>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <boxGeometry args={[3, 3, 3]} />
        <meshBasicMaterial color="#00ff00" wireframe />
      </mesh>
      <mesh position={[0, 0, 0]} scale={0.9}>
        <boxGeometry args={[3, 3, 3]} />
        <meshStandardMaterial color="#002200" opacity={0.8} transparent />
      </mesh>
    </group>
  );
}
