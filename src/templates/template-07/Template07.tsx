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

function Gear({ position, speed, scale }: { position: [number, number, number], speed: number, scale: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.z += speed * delta;
    }
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <cylinderGeometry args={[1, 1, 0.2, 16]} />
      <meshStandardMaterial color="#b87333" metalness={0.8} roughness={0.3} />
    </mesh>
  );
}

function Clockwork({ name }: { name: string }) {
  const ticketRef = useRef<THREE.Group>(null);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLocked(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  useFrame((state, delta) => {
    if (ticketRef.current) {
      if (locked) {
        ticketRef.current.position.y = THREE.MathUtils.lerp(ticketRef.current.position.y, 0, 0.05);
      } else {
        ticketRef.current.position.y = -3;
      }
    }
  });

  return (
    <>
      <group rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -2]}>
        <Gear position={[-1.5, 0, 0]} speed={locked ? 0 : 2} scale={1.2} />
        <Gear position={[1.5, 0, 0]} speed={locked ? 0 : -2} scale={1.2} />
        <Gear position={[0, 1.5, 0]} speed={locked ? 0 : 3} scale={0.8} />
      </group>
      
      <group ref={ticketRef} position={[0, -3, 0]}>
        <mesh>
          <planeGeometry args={[4, 2]} />
          <meshStandardMaterial color="#ffd700" metalness={0.9} roughness={0.2} />
        </mesh>
        <Text
          position={[0, 0, 0.01]}
          fontSize={0.4}
          color="#000000"
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

export default function Template07({ student }: TemplateProps) {
  return (
    <div className="w-full h-screen bg-[#1c140d]">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <color attach="background" args={['#1c140d']} />
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1.5} color="#ffa500" />
        <Clockwork name={student.name} />
        <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
        <Environment preset="apartment" />
      </Canvas>
      <div className="absolute top-8 right-8 text-[#b87333] pointer-events-none">
        <p className="text-sm tracking-[0.2em] font-serif">USN // {student.usn}</p>
      </div>
    </div>
  );
}
