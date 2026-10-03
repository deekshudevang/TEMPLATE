'use client';

import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, OrbitControls, Environment, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface TemplateProps {
  student: {
    id: number;
    usn: string;
    name: string;
  };
}

function FluidAura({ name }: { name: string }) {
  const blobRef = useRef<THREE.Mesh>(null);
  const textRef = useRef<THREE.Group>(null);
  const [morphed, setMorphed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMorphed(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  useFrame((state, delta) => {
    if (blobRef.current) {
      if (morphed) {
        // Flatten into a card
        blobRef.current.scale.x = THREE.MathUtils.lerp(blobRef.current.scale.x, 3, 0.05);
        blobRef.current.scale.y = THREE.MathUtils.lerp(blobRef.current.scale.y, 1.5, 0.05);
        blobRef.current.scale.z = THREE.MathUtils.lerp(blobRef.current.scale.z, 0.1, 0.05);
      } else {
        blobRef.current.rotation.x += delta * 0.2;
        blobRef.current.rotation.y += delta * 0.3;
      }
    }
    
    if (textRef.current) {
      if (morphed) {
        textRef.current.position.z = THREE.MathUtils.lerp(textRef.current.position.z, 0.2, 0.05);
        const mat = textRef.current.children[0] as unknown as { material: THREE.MeshBasicMaterial };
        if (mat && mat.material) {
          mat.material.opacity = THREE.MathUtils.lerp(mat.material.opacity, 1, 0.05);
        }
      } else {
        textRef.current.position.z = -1;
      }
    }
  });

  return (
    <group>
      <mesh ref={blobRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial 
          color="#ff0088" 
          envMapIntensity={1} 
          clearcoat={1} 
          clearcoatRoughness={0} 
          metalness={0.1}
          roughness={0.2}
          distort={morphed ? 0 : 0.4} 
          speed={morphed ? 0 : 3} 
        />
      </mesh>
      
      <group ref={textRef} position={[0, 0, -1]}>
        <Text
          fontSize={0.5}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxK.woff"
        >
          {name}
          <meshBasicMaterial transparent opacity={0} color="#ffffff" />
        </Text>
      </group>
    </group>
  );
}

export default function Template14({ student }: TemplateProps) {
  return (
    <div className="w-full h-screen bg-[#fff0f5]">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={1} />
        <directionalLight position={[2, 5, 2]} intensity={1} />
        <FluidAura name={student.name} />
        <OrbitControls enableZoom={false} enablePan={false} />
        <Environment preset="dawn" />
      </Canvas>
      <div className="absolute top-8 right-8 text-[#ff0088] pointer-events-none">
        <p className="text-sm tracking-[0.2em]">USN // {student.usn}</p>
      </div>
    </div>
  );
}
