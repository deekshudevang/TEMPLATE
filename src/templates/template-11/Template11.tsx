'use client';

import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';

interface TemplateProps {
  student: {
    id: number;
    usn: string;
    name: string;
  };
}

function FlapChar({ targetChar, position, delay }: { targetChar: string, position: [number, number, number], delay: number }) {
  const ref = useRef<THREE.Group>(null);
  const [char, setChar] = useState('A');
  const [stopped, setStopped] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStopped(true);
      setChar(targetChar);
    }, 2000 + delay * 100);
    return () => clearTimeout(timer);
  }, [targetChar, delay]);

  useFrame((state, delta) => {
    if (ref.current) {
      if (!stopped) {
        ref.current.rotation.x -= delta * 15;
        // Randomize character while spinning
        if (Math.random() > 0.8) {
          setChar(String.fromCharCode(65 + Math.floor(Math.random() * 26)));
        }
      } else {
        // Snap to 0
        ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, 0, 0.2);
        // Ensure it snaps to nearest 2PI if it spun a lot
        if (Math.abs(ref.current.rotation.x) < 0.01) {
          ref.current.rotation.x = 0;
        }
      }
    }
  });

  return (
    <group position={position}>
      <group ref={ref}>
        <mesh>
          <boxGeometry args={[0.8, 1.2, 0.1]} />
          <meshStandardMaterial color="#222222" roughness={0.8} />
        </mesh>
        <Text
          position={[0, 0, 0.06]}
          fontSize={0.8}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxK.woff"
        >
          {char}
        </Text>
      </group>
    </group>
  );
}

function SplitFlap({ name }: { name: string }) {
  // Take up to 10 characters for simplicity
  const chars = name.substring(0, 10).padEnd(10, ' ').split('');
  const startX = -((chars.length - 1) * 0.9) / 2;

  return (
    <group>
      {chars.map((char, i) => (
        <FlapChar key={i} targetChar={char} position={[startX + i * 0.9, 0, 0]} delay={i} />
      ))}
    </group>
  );
}

export default function Template11({ student }: TemplateProps) {
  return (
    <div className="w-full h-screen bg-[#111111]">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <color attach="background" args={['#111111']} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 5, 5]} intensity={1} />
        <SplitFlap name={student.name} />
        <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2 + 0.2} minPolarAngle={Math.PI / 2 - 0.2} />
        <Environment preset="warehouse" />
      </Canvas>
      <div className="absolute top-8 left-8 text-white pointer-events-none">
        <p className="text-sm tracking-[0.2em] opacity-40">USN // {student.usn}</p>
      </div>
    </div>
  );
}
