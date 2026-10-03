'use client';

import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

interface TemplateProps {
  student: {
    id: number;
    usn: string;
    name: string;
  };
}

function Constellation({ name }: { name: string }) {
  const textRef = useRef<THREE.Group>(null);
  const [aligned, setAligned] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAligned(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  useFrame((state, delta) => {
    if (textRef.current) {
      if (aligned) {
        textRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.02);
      } else {
        textRef.current.scale.set(0, 0, 0);
      }
    }
  });

  return (
    <>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      <group ref={textRef} scale={0}>
        <Text
          fontSize={1}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxK.woff"
        >
          {name}
          <meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
        </Text>
        {/* Decorative connecting lines around the text to simulate a constellation */}
        <mesh position={[0, 0, -0.1]}>
          <planeGeometry args={[10, 2]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.1} wireframe />
        </mesh>
      </group>
    </>
  );
}

export default function Template08({ student }: TemplateProps) {
  return (
    <div className="w-full h-screen bg-[#020205]">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <color attach="background" args={['#020205']} />
        <Constellation name={student.name} />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
      <div className="absolute bottom-8 left-8 text-white pointer-events-none">
        <p className="text-sm tracking-[0.3em] opacity-50 uppercase">USN // {student.usn}</p>
      </div>
    </div>
  );
}
