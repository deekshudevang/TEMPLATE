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

function MagneticCubes({ name }: { name: string }) {
  const groupRef = useRef<THREE.Group>(null);
  const textRef = useRef<THREE.Group>(null);
  const [magnetized, setMagnetized] = useState(false);

  const [cubes] = useState(() => {
    const temp = [];
    let idx = 0;
    for (let x = -2; x <= 2; x++) {
      for (let y = -2; y <= 2; y++) {
        for (let z = -2; z <= 2; z++) {
          // Exclude center to make room for text? Actually they just form a 5x5x5 grid
          temp.push({
            id: idx++,
            target: new THREE.Vector3(x * 0.4, y * 0.4, z * 0.4),
            start: new THREE.Vector3(
              (Math.random() - 0.5) * 15,
              (Math.random() - 0.5) * 15,
              (Math.random() - 0.5) * 15
            ),
            rotStart: new THREE.Euler(
              Math.random() * Math.PI,
              Math.random() * Math.PI,
              Math.random() * Math.PI
            )
          });
        }
      }
    }
    return temp;
  });

  useEffect(() => {
    const timer = setTimeout(() => setMagnetized(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      if (magnetized) {
        groupRef.current.children.forEach((mesh, i) => {
          mesh.position.lerp(cubes[i].target, 0.05);
          mesh.rotation.set(0, 0, 0); // snap rotation
        });
      } else {
        groupRef.current.rotation.y += delta * 0.5;
        groupRef.current.rotation.x += delta * 0.2;
      }
    }

    if (textRef.current) {
      if (magnetized) {
        textRef.current.position.z = THREE.MathUtils.lerp(textRef.current.position.z, 2, 0.05);
        textRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.05);
      } else {
        textRef.current.position.z = 0;
        textRef.current.scale.set(0, 0, 0);
      }
    }
  });

  return (
    <>
      <group ref={groupRef}>
        {cubes.map((c) => (
          <mesh key={c.id} position={c.start} rotation={c.rotStart}>
            <boxGeometry args={[0.35, 0.35, 0.35]} />
            <meshStandardMaterial color="#444444" metalness={0.8} roughness={0.2} />
          </mesh>
        ))}
      </group>
      
      <group ref={textRef} scale={0}>
        <Text
          fontSize={0.8}
          color="#00ffff"
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

export default function Template13({ student }: TemplateProps) {
  return (
    <div className="w-full h-screen bg-gray-900">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <color attach="background" args={['#111827']} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
        <MagneticCubes name={student.name} />
        <OrbitControls enableZoom={false} autoRotate={!true} />
        <Environment preset="city" />
      </Canvas>
      <div className="absolute top-8 left-8 text-white pointer-events-none">
        <p className="text-sm tracking-[0.2em] font-mono opacity-50">USN // {student.usn}</p>
      </div>
    </div>
  );
}
