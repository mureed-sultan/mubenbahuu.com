import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function GearShape({ position, size, speed, color }: { position: [number, number, number]; size: number; speed: number; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * speed;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <torusGeometry args={[size, size * 0.15, 6, 8]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} metalness={0.8} roughness={0.2} />
    </mesh>
  );
}

function DataNode({ position, delay }: { position: [number, number, number]; delay: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const scale = 0.5 + Math.sin(state.clock.elapsedTime * 2 + delay) * 0.3;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <octahedronGeometry args={[0.15]} />
      <meshBasicMaterial color="#3b82f6" transparent opacity={0.8} />
    </mesh>
  );
}

function ConnectionLines() {
  const lineRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (lineRef.current) {
      lineRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  const lines = [
    { start: [-2, 0, 0], end: [2, 0, 0] },
    { start: [0, -2, 0], end: [0, 2, 0] },
    { start: [-1.5, -1.5, 0], end: [1.5, 1.5, 0] },
    { start: [-1.5, 1.5, 0], end: [1.5, -1.5, 0] },
  ];

  return (
    <group ref={lineRef}>
      {lines.map((line, i) => {
        const points = [
          new THREE.Vector3(...line.start),
          new THREE.Vector3(...line.end),
        ];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        return (
          <line key={i}>
            <bufferGeometry attach="geometry" {...geometry} />
            <lineBasicMaterial attach="material" color="#3b82f6" transparent opacity={0.3} />
          </line>
        );
      })}
    </group>
  );
}

export default function ServicesScene3D() {
  return (
    <div className="absolute inset-0 -z-10 opacity-50">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={0.5} color="#3b82f6" />
        <pointLight position={[-5, -5, 5]} intensity={0.3} color="#06b6d4" />

        <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
          <GearShape position={[-2, 1, 0]} size={0.6} speed={0.5} color="#3b82f6" />
          <GearShape position={[2, -1, 0]} size={0.5} speed={-0.7} color="#06b6d4" />
          <GearShape position={[0, 2, -1]} size={0.4} speed={0.8} color="#8b5cf6" />
        </Float>

        {/* Data nodes */}
        {Array.from({ length: 8 }).map((_, i) => (
          <DataNode
            key={i}
            position={[
              Math.cos((i / 8) * Math.PI * 2) * 2.5,
              Math.sin((i / 8) * Math.PI * 2) * 2.5,
              0
            ]}
            delay={i * 0.5}
          />
        ))}
      </Canvas>
    </div>
  );
}
