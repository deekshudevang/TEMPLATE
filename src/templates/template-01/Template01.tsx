"use client";

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, PerspectiveCamera, OrbitControls, Environment, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

export default function Template01({ student }: { student: { id: number, usn: string, name: string } }) {
  const [opened, setOpened] = useState(false);

  return (
    <div className="w-full h-screen bg-black overflow-hidden relative font-sans">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={45} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <Environment preset="city" />
        
        <Cryptex student={student} opened={opened} setOpened={setOpened} />
        
        {/* We use orbit controls so the user can interact slightly with the 3D space */}
        <OrbitControls enableZoom={false} enablePan={false} autoRotate={!opened} autoRotateSpeed={0.5} />
      </Canvas>

      {/* HTML Overlay for UI */}
      <div className="absolute bottom-10 left-0 w-full flex justify-center pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: opened ? 1 : 0, y: opened ? 0 : 20 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-white text-center"
        >
          <p className="text-sm uppercase tracking-widest text-amber-500 mb-2">Identity Confirmed</p>
          <h1 className="text-4xl font-light mb-1">{student.name}</h1>
          <p className="text-gray-400">{student.usn}</p>
        </motion.div>
      </div>
      
      {!opened && (
        <div className="absolute top-1/4 w-full text-center text-white/50 text-sm tracking-widest animate-pulse pointer-events-none">
          TAP TO UNLOCK
        </div>
      )}
    </div>
  );
}

function Cryptex({ student, opened, setOpened }: { student: { id: number, usn: string, name: string }, opened: boolean, setOpened: (v: boolean) => void }) {
  const groupRef = useRef<THREE.Group>(null);
  const scrollRef = useRef<THREE.Group>(null);
  
  // Animate the opening
  useFrame((state, delta) => {
    if (opened && groupRef.current) {
      // Split the cryptex open
      const leftPart = groupRef.current.children[0];
      const rightPart = groupRef.current.children[1];
      
      leftPart.position.x = THREE.MathUtils.lerp(leftPart.position.x, -3, delta * 2);
      rightPart.position.x = THREE.MathUtils.lerp(rightPart.position.x, 3, delta * 2);
    }
    
    if (opened && scrollRef.current) {
      // Unfurl the scroll
      scrollRef.current.scale.y = THREE.MathUtils.lerp(scrollRef.current.scale.y, 1, delta * 2);
      scrollRef.current.position.z = THREE.MathUtils.lerp(scrollRef.current.position.z, 2, delta * 1.5);
    }
  });

  return (
    <group onClick={() => setOpened(true)}>
      {/* The Cryptex Shell */}
      <group ref={groupRef}>
        {/* Left half */}
        <mesh position={[-1, 0, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[1, 1, 2, 32]} />
          <meshStandardMaterial color="#b8860b" metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Right half */}
        <mesh position={[1, 0, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[1, 1, 2, 32]} />
          <meshStandardMaterial color="#b8860b" metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Center Ring (spins) */}
        <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[1.1, 1.1, 0.5, 32]} />
          <meshStandardMaterial color="#222" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>

      {/* The Scroll inside */}
      <group ref={scrollRef} scale={[1, 0.01, 1]} position={[0, 0, -1]}>
        <mesh rotation={[0, 0, 0]}>
          <planeGeometry args={[3, 5]} />
          <meshStandardMaterial color="#fff" emissive="#222" side={THREE.DoubleSide} />
        </mesh>
        <Text
          position={[0, 1, 0.01]}
          fontSize={0.4}
          color="#111"
          anchorX="center"
          anchorY="middle"
          maxWidth={2.5}
        >
          Welcome to the
        </Text>
        <Text
          position={[0, 0, 0.01]}
          fontSize={0.3}
          color="#b8860b"
          anchorX="center"
          anchorY="middle"
          maxWidth={2.5}
        >
          FRESHER EVENT
        </Text>
      </group>
    </group>
  );
}
