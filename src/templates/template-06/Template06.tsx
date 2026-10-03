'use client';

import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface TemplateProps {
  student: {
    id: number;
    usn: string;
    name: string;
  };
}

function LightWeaver({ name }: { name: string }) {
  const linesRef = useRef<THREE.Group>(null);
  const textRef = useRef<THREE.Group>(null);
  const [woven, setWoven] = useState(false);

  const [lines] = useState(() => {
    return Array.from({ length: 100 }).map(() => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      ),
      target: new THREE.Vector3(
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 2,
        0
      ),
      speed: Math.random() * 0.05 + 0.01,
      color: Math.random() > 0.5 ? '#00ffff' : '#ff00ff'
    }));
  });

  useEffect(() => {
    const timer = setTimeout(() => setWoven(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  useFrame((state, delta) => {
    if (linesRef.current) {
      linesRef.current.children.forEach((line, i) => {
        if (woven) {
          line.position.lerp(lines[i].target, lines[i].speed);
          const mat = (line as THREE.Mesh).material as THREE.MeshBasicMaterial;
          if (mat.opacity > 0) mat.opacity -= delta * 0.2;
        } else {
          line.position.x += Math.sin(state.clock.elapsedTime * 2 + i) * 0.1;
          line.position.y += Math.cos(state.clock.elapsedTime * 2 + i) * 0.1;
        }
      });
    }

    if (textRef.current) {
      if (woven) {
        textRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.05);
      } else {
        textRef.current.scale.set(0, 0, 0);
      }
    }
  });

  return (
    <>
      <group ref={linesRef}>
        {lines.map((l, i) => (
          <mesh key={i} position={l.position}>
            <boxGeometry args={[0.05, 0.05, 4]} />
            <meshBasicMaterial color={l.color} transparent opacity={0.8} />
          </mesh>
        ))}
      </group>
      
      <group ref={textRef} scale={0}>
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

export default function Template06({ student }: TemplateProps) {
  return (
    <div className="w-full h-screen bg-black">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <color attach="background" args={['#000000']} />
        <LightWeaver name={student.name} />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
      </Canvas>
      <div className="absolute bottom-8 right-8 text-white pointer-events-none">
        <p className="text-sm tracking-[0.2em] opacity-40">USN // {student.usn}</p>
      </div>
    </div>
  );
}
