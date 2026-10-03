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

function Prism({ name }: { name: string }) {
  const prismRef = useRef<THREE.Mesh>(null);
  const textRef = useRef<THREE.Group>(null);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFocused(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  useFrame((state, delta) => {
    if (prismRef.current) {
      if (!focused) {
        prismRef.current.rotation.y += delta * 2;
        prismRef.current.rotation.x += delta;
      } else {
        // Slow down rotation when focused
        prismRef.current.rotation.y += delta * 0.2;
        
        // Move prism out of the way
        prismRef.current.position.y = THREE.MathUtils.lerp(prismRef.current.position.y, 3, 0.02);
      }
    }

    if (textRef.current) {
      if (focused) {
        textRef.current.position.z = THREE.MathUtils.lerp(textRef.current.position.z, 0, 0.05);
        const mat = textRef.current.children[0] as unknown as { material: THREE.MeshBasicMaterial };
        if (mat && mat.material) {
          mat.material.opacity = THREE.MathUtils.lerp(mat.material.opacity, 1, 0.05);
        }
      } else {
        textRef.current.position.z = -10;
        const mat = textRef.current.children[0] as unknown as { material: THREE.MeshBasicMaterial };
        if (mat && mat.material) {
          mat.material.opacity = 0;
        }
      }
    }
  });

  return (
    <>
      <mesh ref={prismRef} position={[0, 0, 2]}>
        <octahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial 
          color="#ffffff" 
          transmission={1} 
          opacity={1} 
          transparent 
          roughness={0} 
          ior={1.5}
          thickness={2}
        />
      </mesh>
      
      {/* Light beam */}
      <mesh position={[0, 0, 5]} rotation={[Math.PI/2, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 10]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={focused ? 0 : 0.3} />
      </mesh>
      
      <group ref={textRef} position={[0, 0, -10]}>
        <Text
          fontSize={1.2}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxK.woff"
        >
          {name}
          <meshBasicMaterial transparent opacity={0} color="#ffffff" />
        </Text>
      </group>
    </>
  );
}

export default function Template10({ student }: TemplateProps) {
  return (
    <div className="w-full h-screen bg-[#0a0a0a]">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <color attach="background" args={['#0a0a0a']} />
        <ambientLight intensity={0.2} />
        <spotLight position={[0, 0, 10]} intensity={2} angle={0.1} penumbra={1} color="#ffffff" />
        <Prism name={student.name} />
        <OrbitControls enableZoom={false} enablePan={false} />
        <Environment preset="studio" />
      </Canvas>
      <div className="absolute top-8 left-8 text-white pointer-events-none">
        <p className="text-sm tracking-[0.2em] opacity-30">USN // {student.usn}</p>
      </div>
    </div>
  );
}
