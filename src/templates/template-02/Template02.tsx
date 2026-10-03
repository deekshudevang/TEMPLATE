'use client';

import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, OrbitControls, Environment, Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface TemplateProps {
  student: {
    id: number;
    usn: string;
    name: string;
  };
}

function KineticSphere({ name }: { name: string }) {
  const groupRef = useRef<THREE.Group>(null);
  const textRef = useRef<THREE.Group>(null);
  const [revealed, setRevealed] = useState(false);
  const [particles] = useState(() => {
    const temp = [];
    for (let i = 0; i < 300; i++) {
      const phi = Math.acos(-1 + (2 * i) / 300);
      const theta = Math.sqrt(300 * Math.PI) * phi;
      temp.push({
        position: new THREE.Vector3(
          3 * Math.cos(theta) * Math.sin(phi),
          3 * Math.sin(theta) * Math.sin(phi),
          3 * Math.cos(phi)
        ),
        rotation: new THREE.Euler(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI),
      });
    }
    return temp;
  });

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5;
      groupRef.current.rotation.x += delta * 0.2;
      
      if (revealed) {
        groupRef.current.scale.lerp(new THREE.Vector3(0, 0, 0), 0.05);
      }
    }
    if (textRef.current) {
      if (revealed) {
        textRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.05);
      } else {
        textRef.current.scale.set(0, 0, 0);
      }
    }
  });

  return (
    <>
      <group ref={groupRef}>
        {particles.map((p, i) => (
          <Text
            key={i}
            position={p.position}
            rotation={p.rotation}
            fontSize={0.2}
            color="rgba(255, 255, 255, 0.8)"
            font="https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxK.woff"
          >
            {String.fromCharCode(65 + (i % 26))}
          </Text>
        ))}
      </group>
      
      <group ref={textRef}>
        <Text
          fontSize={0.8}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxK.woff"
        >
          {name}
        </Text>
      </group>
    </>
  );
}

export default function Template02({ student }: TemplateProps) {
  return (
    <div className="w-full h-screen bg-[#050507]">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <color attach="background" args={['#050507']} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <KineticSphere name={student.name} />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate={!true} />
        <Environment preset="city" />
      </Canvas>
      
      <div className="absolute top-8 left-8 text-[var(--text-primary)] pointer-events-none">
        <p className="text-sm tracking-[0.2em] text-[var(--text-secondary)]">USN // {student.usn}</p>
      </div>
    </div>
  );
}
