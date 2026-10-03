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

function Tunnel({ name }: { name: string }) {
  const tunnelRef = useRef<THREE.Mesh>(null);
  const textRef = useRef<THREE.Group>(null);
  const [burst, setBurst] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setBurst(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  useFrame((state, delta) => {
    if (tunnelRef.current) {
      if (!burst) {
        tunnelRef.current.position.z += delta * 20;
        if (tunnelRef.current.position.z > 20) {
          tunnelRef.current.position.z = 0;
        }
      } else {
        const mat = (tunnelRef.current.material as THREE.MeshBasicMaterial);
        mat.opacity = THREE.MathUtils.lerp(mat.opacity, 0, 0.1);
      }
    }
    if (textRef.current) {
      if (burst) {
        textRef.current.position.z = THREE.MathUtils.lerp(textRef.current.position.z, 0, 0.05);
      } else {
        textRef.current.position.z = -50;
      }
    }
    
    // Change background color
    if (burst) {
      state.scene.background = new THREE.Color().lerpColors(
        state.scene.background as THREE.Color || new THREE.Color(0x000000), 
        new THREE.Color(0xffffff), 
        0.05
      );
    }
  });

  return (
    <>
      <mesh ref={tunnelRef} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[5, 5, 100, 16, 32, true]} />
        <meshBasicMaterial color="#00ffcc" wireframe transparent opacity={0.5} />
      </mesh>
      
      <group ref={textRef} position={[0, 0, -50]}>
        <Text
          fontSize={1}
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

export default function Template09({ student }: TemplateProps) {
  return (
    <div className="w-full h-screen bg-black">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <color attach="background" args={['#000000']} />
        <Tunnel name={student.name} />
      </Canvas>
      <div className="absolute top-8 right-8 text-black mix-blend-difference pointer-events-none">
        <p className="text-sm tracking-[0.2em] uppercase text-white">USN // {student.usn}</p>
      </div>
    </div>
  );
}
