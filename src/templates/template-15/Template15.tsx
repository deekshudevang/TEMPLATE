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

function Terminal({ student }: { student: any }) {
  const [text, setText] = useState('');
  const fullText = `> INITIALIZING SYSTEM...
> AUTHENTICATING USN: ${student.usn}
> ACCESS GRANTED
> 
> WELCOME,
> ${student.name.toUpperCase()}
> 
> AWAITING DIRECTIVE..._`;

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.substring(0, i));
      i++;
      if (i > fullText.length) {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [fullText]);

  return (
    <group position={[0, 0, 0]}>
      <mesh>
        <planeGeometry args={[8, 6, 32, 32]} />
        {/* Curving the plane could be done via a custom shader, but a simple plane works for retro text */}
        <meshBasicMaterial color="#001100" />
      </mesh>
      
      {/* Scanline effect using wireframe */}
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[8, 6, 10, 50]} />
        <meshBasicMaterial color="#00ff00" wireframe transparent opacity={0.05} />
      </mesh>

      <Text
        position={[-3.5, 2.5, 0.1]}
        fontSize={0.3}
        color="#00ff00"
        anchorX="left"
        anchorY="top"
        font="https://fonts.gstatic.com/s/robotomono/v22/L0xuDF4xlVMF-BfR8bXMIhJHg45mwgGEFl0_3vrtSM1J-gEPO9TxGL1O.woff"
      >
        {text}
      </Text>
    </group>
  );
}

export default function Template15({ student }: TemplateProps) {
  return (
    <div className="w-full h-screen bg-black">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <color attach="background" args={['#000000']} />
        <Terminal student={student} />
        {/* CRT curve effect via camera FOV and slightly limited rotation */}
        <OrbitControls enableZoom={false} maxAzimuthAngle={0.2} minAzimuthAngle={-0.2} maxPolarAngle={Math.PI/2 + 0.2} minPolarAngle={Math.PI/2 - 0.2} />
      </Canvas>
      
      {/* CSS overlay for scanlines and CRT flicker */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
        backgroundSize: '100% 2px, 3px 100%'
      }} />
      <div className="absolute inset-0 pointer-events-none border-[20px] border-black rounded-[50px] shadow-[inset_0_0_50px_rgba(0,0,0,0.8)]" />
    </div>
  );
}
