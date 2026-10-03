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

function Monolith({ name }: { name: string }) {
  const leftHalf = useRef<THREE.Mesh>(null);
  const rightHalf = useRef<THREE.Mesh>(null);
  const textRef = useRef<THREE.Group>(null);
  const [cracked, setCracked] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setCracked(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useFrame((state, delta) => {
    if (cracked) {
      if (leftHalf.current) {
        leftHalf.current.position.x = THREE.MathUtils.lerp(leftHalf.current.position.x, -2, 0.02);
      }
      if (rightHalf.current) {
        rightHalf.current.position.x = THREE.MathUtils.lerp(rightHalf.current.position.x, 2, 0.02);
      }
      if (textRef.current) {
        textRef.current.position.z = THREE.MathUtils.lerp(textRef.current.position.z, 2, 0.02);
      }
    }
  });

  return (
    <group position={[0, -2, 0]}>
      <mesh ref={leftHalf} position={[-0.02, 2, 0]}>
        <boxGeometry args={[1.96, 6, 1]} />
        <meshStandardMaterial color="#111111" roughness={0.9} />
      </mesh>
      <mesh ref={rightHalf} position={[0.02, 2, 0]}>
        <boxGeometry args={[1.96, 6, 1]} />
        <meshStandardMaterial color="#111111" roughness={0.9} />
      </mesh>
      
      <group ref={textRef} position={[0, 2, 0]}>
        <Text
          fontSize={0.6}
          color="#00ffcc"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxK.woff"
        >
          {name}
          <meshBasicMaterial color="#00ffcc" toneMapped={false} />
        </Text>
      </group>
    </group>
  );
}

export default function Template04({ student }: TemplateProps) {
  return (
    <div className="w-full h-screen bg-black">
      <Canvas camera={{ position: [0, 2, 8], fov: 50 }}>
        <color attach="background" args={['#000000']} />
        <ambientLight intensity={0.1} />
        <directionalLight position={[0, 5, 5]} intensity={0.5} />
        <Monolith name={student.name} />
        <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2 + 0.1} minPolarAngle={Math.PI / 2 - 0.2} />
        <Environment preset="city" />
      </Canvas>
      
      <div className="absolute top-8 left-8 text-white pointer-events-none">
        <p className="text-sm tracking-[0.2em] opacity-40">USN // {student.usn}</p>
      </div>
    </div>
  );
}
