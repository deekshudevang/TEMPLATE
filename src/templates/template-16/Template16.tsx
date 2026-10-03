"use client";

import React, { useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

export default function Template16({ student }: { student: { id: number, usn: string, name: string } }) {
  const [opened, setOpened] = useState(false);

  return (
    <div className="w-full h-screen bg-slate-900 overflow-hidden relative font-sans">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
        <ambientLight intensity={0.2} />
        <spotLight position={[5, 10, 5]} intensity={2} color="#00ffff" penumbra={1} castShadow />
        <spotLight position={[-5, -10, 5]} intensity={2} color="#ff00ff" penumbra={1} />
        <Environment preset="night" />
        
        <Crystal opened={opened} setOpened={setOpened} />
        
        <OrbitControls enableZoom={false} enablePan={false} autoRotate={!opened} autoRotateSpeed={1.5} />
      </Canvas>

      <div className="absolute top-10 w-full flex justify-center pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: opened ? 1 : 0, y: opened ? 0 : -20 }}
          transition={{ duration: 1.5, delay: 1 }}
          className="text-center text-cyan-300"
        >
          <p className="text-xs uppercase tracking-[0.3em] mb-4">Connection Established</p>
          <h1 className="text-5xl font-bold tracking-wider uppercase mb-2" style={{ textShadow: '0 0 10px #00ffff' }}>
            {student.name}
          </h1>
          <p className="text-xl text-fuchsia-400 tracking-widest">{student.usn}</p>
        </motion.div>
      </div>
      
      {!opened && (
        <div className="absolute bottom-20 w-full text-center text-cyan-500 text-sm tracking-[0.5em] animate-pulse pointer-events-none">
          TOUCH THE CRYSTAL
        </div>
      )}
    </div>
  );
}

function Crystal({ opened, setOpened }: { opened: boolean, setOpened: (v: boolean) => void }) {
  const innerRef = React.useRef<THREE.Mesh>(null);
  const outerRef = React.useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (outerRef.current && innerRef.current) {
      if (opened) {
        outerRef.current.position.y = THREE.MathUtils.lerp(outerRef.current.position.y, 5, delta);
        outerRef.current.rotation.x += delta * 2;
        innerRef.current.scale.setScalar(THREE.MathUtils.lerp(innerRef.current.scale.x, 2, delta * 2));
      } else {
        outerRef.current.rotation.y += delta * 0.5;
        innerRef.current.rotation.y -= delta;
      }
    }
  });

  return (
    <group onClick={() => setOpened(true)}>
      <group ref={outerRef}>
        <mesh castShadow receiveShadow>
          <octahedronGeometry args={[2, 0]} />
          <meshPhysicalMaterial 
            color="#00ffff" 
            transmission={0.9} 
            opacity={1} 
            metalness={0.1} 
            roughness={0.1} 
            ior={1.5} 
            thickness={2} 
          />
        </mesh>
        <mesh scale={1.05}>
          <octahedronGeometry args={[2, 0]} />
          <meshBasicMaterial color="#ff00ff" wireframe />
        </mesh>
      </group>

      <mesh ref={innerRef}>
        <icosahedronGeometry args={[0.5, 1]} />
        <meshStandardMaterial color="#ffffff" emissive="#00ffff" emissiveIntensity={2} />
      </mesh>
    </group>
  );
}
