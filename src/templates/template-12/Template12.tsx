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

function Diorama({ name }: { name: string }) {
  const bannerRef = useRef<THREE.Group>(null);
  const [dropped, setDropped] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setDropped(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useFrame((state, delta) => {
    if (bannerRef.current) {
      if (dropped) {
        bannerRef.current.position.y = THREE.MathUtils.lerp(bannerRef.current.position.y, 1.5, 0.05);
        bannerRef.current.scale.y = THREE.MathUtils.lerp(bannerRef.current.scale.y, 1, 0.05);
      } else {
        bannerRef.current.position.y = 3;
        bannerRef.current.scale.y = 0;
      }
    }
  });

  return (
    <group position={[0, -1, 0]}>
      {/* Ground */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[4, 4, 0.5, 32]} />
        <meshStandardMaterial color="#81c784" roughness={0.9} />
      </mesh>
      
      {/* Main Building */}
      <mesh position={[0, 1, -1]}>
        <boxGeometry args={[3, 2, 1.5]} />
        <meshStandardMaterial color="#e0e0e0" roughness={0.8} />
      </mesh>
      <mesh position={[0, 2.5, -1]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#bdbdbd" roughness={0.8} />
      </mesh>
      
      {/* Trees */}
      <mesh position={[-2, 0.5, 1]}>
        <sphereGeometry args={[0.4]} />
        <meshStandardMaterial color="#4caf50" roughness={0.9} />
      </mesh>
      <mesh position={[2, 0.5, 2]}>
        <sphereGeometry args={[0.5]} />
        <meshStandardMaterial color="#4caf50" roughness={0.9} />
      </mesh>
      
      {/* Banner */}
      <group ref={bannerRef} position={[0, 3, -0.2]}>
        <mesh>
          <planeGeometry args={[2.5, 1]} />
          <meshStandardMaterial color="#ff5252" roughness={0.5} side={THREE.DoubleSide} />
        </mesh>
        <Text
          position={[0, 0, 0.01]}
          fontSize={0.3}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxK.woff"
        >
          {name}
        </Text>
      </group>
    </group>
  );
}

export default function Template12({ student }: TemplateProps) {
  return (
    <div className="w-full h-screen bg-[#81d4fa]">
      <Canvas camera={{ position: [0, 4, 8], fov: 45 }}>
        <color attach="background" args={['#81d4fa']} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow />
        <Diorama name={student.name} />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} maxPolarAngle={Math.PI / 2.5} />
        <Environment preset="city" />
      </Canvas>
      <div className="absolute top-8 left-8 text-black pointer-events-none">
        <p className="text-sm tracking-[0.2em] font-bold opacity-60">USN // {student.usn}</p>
      </div>
    </div>
  );
}
