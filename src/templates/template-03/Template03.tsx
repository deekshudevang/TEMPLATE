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

function OrigamiBloom({ name }: { name: string }) {
  const petalsRef = useRef<THREE.Group>(null);
  const textRef = useRef<THREE.Group>(null);
  const [opened, setOpened] = useState(false);
  const petalCount = 8;

  useEffect(() => {
    const timer = setTimeout(() => setOpened(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useFrame((state, delta) => {
    if (petalsRef.current) {
      petalsRef.current.rotation.y += delta * 0.2;
      petalsRef.current.children.forEach((petal, i) => {
        const targetRotX = opened ? Math.PI / 2.5 : Math.PI / 2;
        petal.rotation.x = THREE.MathUtils.lerp(petal.rotation.x, targetRotX, 0.02);
      });
    }
    if (textRef.current) {
      const targetScale = opened ? 1 : 0;
      textRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.03);
      textRef.current.position.y = THREE.MathUtils.lerp(textRef.current.position.y, opened ? 1 : 0, 0.03);
    }
  });

  return (
    <>
      <group ref={petalsRef}>
        {Array.from({ length: petalCount }).map((_, i) => (
          <group key={i} rotation={[0, (i * Math.PI * 2) / petalCount, 0]}>
            <mesh position={[0, 0, 1.5]} rotation={[Math.PI / 2, 0, 0]}>
              <coneGeometry args={[1, 3, 3]} />
              <meshStandardMaterial color="#fce4ec" roughness={0.8} />
            </mesh>
          </group>
        ))}
      </group>
      
      <group ref={textRef} scale={0}>
        <Text
          fontSize={0.8}
          color="#d81b60"
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

export default function Template03({ student }: TemplateProps) {
  return (
    <div className="w-full h-screen bg-[#fafafa]">
      <Canvas camera={{ position: [0, 5, 8], fov: 45 }}>
        <color attach="background" args={['#fafafa']} />
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow />
        <OrigamiBloom name={student.name} />
        <OrbitControls enableZoom={false} autoRotate={!true} />
        <Environment preset="studio" />
      </Canvas>
      
      <div className="absolute top-8 left-8 text-black pointer-events-none">
        <p className="text-sm tracking-[0.2em] opacity-60">USN // {student.usn}</p>
      </div>
    </div>
  );
}
