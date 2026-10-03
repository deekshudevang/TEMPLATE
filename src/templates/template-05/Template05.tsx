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

function GlassShatter({ usn, name }: { usn: string, name: string }) {
  const shardsGroup = useRef<THREE.Group>(null);
  const textRef = useRef<THREE.Group>(null);
  const [shattered, setShattered] = useState(false);
  
  const [shards] = useState(() => {
    return Array.from({ length: 40 }).map(() => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 3,
        0
      ),
      rotation: new THREE.Euler(0, 0, 0),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() * 5) + 2
      ),
      rotVelocity: new THREE.Euler(
        Math.random() * 2,
        Math.random() * 2,
        Math.random() * 2
      )
    }));
  });

  useEffect(() => {
    const timer = setTimeout(() => setShattered(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useFrame((state, delta) => {
    if (shattered) {
      if (shardsGroup.current) {
        shardsGroup.current.children.forEach((shard, i) => {
          const s = shards[i];
          shard.position.add(s.velocity.clone().multiplyScalar(delta));
          shard.rotation.x += s.rotVelocity.x * delta;
          shard.rotation.y += s.rotVelocity.y * delta;
          shard.rotation.z += s.rotVelocity.z * delta;
          
          const mat = (shard as THREE.Mesh).material as THREE.MeshPhysicalMaterial;
          if (mat && mat.opacity > 0) {
            mat.opacity -= delta * 0.5;
          }
        });
      }
      
      if (textRef.current) {
        textRef.current.position.z = THREE.MathUtils.lerp(textRef.current.position.z, 0, 0.05);
        textRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.05);
      }
    }
  });

  return (
    <>
      <group ref={shardsGroup}>
        {shards.map((s, i) => (
          <mesh key={i} position={s.position}>
            <boxGeometry args={[Math.random() * 1 + 0.5, Math.random() * 1 + 0.5, 0.1]} />
            <meshPhysicalMaterial 
              color="#ffffff" 
              transmission={0.9} 
              opacity={1} 
              transparent 
              roughness={0.1} 
              thickness={0.5} 
            />
          </mesh>
        ))}
        {!shattered && (
          <Text
            position={[0, 0, 0.1]}
            fontSize={0.5}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            {usn}
          </Text>
        )}
      </group>
      
      <group ref={textRef} position={[0, 0, -10]} scale={0}>
        <Text
          fontSize={0.8}
          color="#ff00ff"
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

export default function Template05({ student }: TemplateProps) {
  return (
    <div className="w-full h-screen bg-gradient-to-br from-[#1a0033] to-[#001a33]">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#ff00ff" />
        <pointLight position={[-10, -10, -10]} intensity={2} color="#00ffff" />
        <GlassShatter usn={student.usn} name={student.name} />
        <OrbitControls enableZoom={false} enableRotate={false} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
