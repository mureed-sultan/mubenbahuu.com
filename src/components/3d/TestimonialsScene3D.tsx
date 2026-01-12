import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function GlowingSphere({ position, color, size = 0.3 }: { position: [number, number, number]; color: string; size?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <MeshDistortMaterial color={color} emissive={color} emissiveIntensity={0.5} distort={0.3} speed={2} />
    </mesh>
  );
}

function FloatingQuotes() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  const quotes = useMemo(() => 
    Array.from({ length: 8 }, (_, i) => ({
      position: [
        Math.cos((i / 8) * Math.PI * 2) * 3,
        Math.sin(i * 0.5) * 0.5,
        Math.sin((i / 8) * Math.PI * 2) * 3
      ] as [number, number, number],
      color: i % 2 === 0 ? '#3b82f6' : '#06b6d4',
    }))
  , []);

  return (
    <group ref={groupRef}>
      {quotes.map((quote, i) => (
        <GlowingSphere key={i} position={quote.position} color={quote.color} size={0.15 + (i % 3) * 0.05} />
      ))}
    </group>
  );
}

function CentralRing() {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[2, 0.02, 16, 100]} />
      <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.8} transparent opacity={0.6} />
    </mesh>
  );
}

export default function TestimonialsScene3D() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[5, 5, 5]} intensity={0.5} color="#3b82f6" />
        <pointLight position={[-5, -5, 5]} intensity={0.3} color="#06b6d4" />
        
        <Stars radius={50} depth={50} count={1000} factor={2} saturation={0} fade speed={1} />
        
        <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
          <CentralRing />
        </Float>
        
        <FloatingQuotes />
      </Canvas>
    </div>
  );
}
