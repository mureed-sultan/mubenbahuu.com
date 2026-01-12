import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, RoundedBox, MeshDistortMaterial, Edges } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedCube({ color = '#00d4ff' }: { color?: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.4;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <RoundedBox ref={meshRef} args={[2, 2, 2]} radius={0.15} smoothness={4}>
        <meshStandardMaterial 
          color={color}
          metalness={0.8}
          roughness={0.2}
          emissive={color}
          emissiveIntensity={0.1}
        />
        <Edges color={color} threshold={15} />
      </RoundedBox>
    </Float>
  );
}

function ParticleRing() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 100;

  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const radius = 2.5;
    positions[i * 3] = Math.cos(angle) * radius;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
    positions[i * 3 + 2] = Math.sin(angle) * radius;
  }

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.08} color="#00d4ff" transparent opacity={0.8} />
    </points>
  );
}

interface FloatingCube3DProps {
  color?: string;
  className?: string;
}

export default function FloatingCube3D({ color = '#00d4ff', className = '' }: FloatingCube3DProps) {
  return (
    <div className={`w-full h-full min-h-[200px] ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#00d4ff" />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#a855f7" />
        
        <AnimatedCube color={color} />
        <ParticleRing />
      </Canvas>
    </div>
  );
}
