import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';

function ProjectCube({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialPosition = useRef(position);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      meshRef.current.position.y = initialPosition.current[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <MeshDistortMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          distort={0.2}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

function DataStream() {
  const groupRef = useRef<THREE.Group>(null);
  const particlesCount = 50;

  const particles = Array.from({ length: particlesCount }, (_, i) => ({
    position: [
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10
    ] as [number, number, number],
    speed: 0.5 + Math.random() * 0.5,
  }));

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      {particles.map((particle, i) => (
        <mesh key={i} position={particle.position}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshBasicMaterial color={i % 2 === 0 ? '#3b82f6' : '#06b6d4'} transparent opacity={0.8} />
        </mesh>
      ))}
    </group>
  );
}

function HexagonGrid() {
  const gridRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.rotation.z = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <group ref={gridRef} position={[0, 0, -3]}>
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i / 6) * Math.PI * 2) * 2.5,
            Math.sin((i / 6) * Math.PI * 2) * 2.5,
            0
          ]}
        >
          <circleGeometry args={[0.5, 6]} />
          <meshBasicMaterial color="#3b82f6" wireframe transparent opacity={0.3} />
        </mesh>
      ))}
    </group>
  );
}

export default function PortfolioScene3D() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={0.8} color="#3b82f6" />
        <pointLight position={[-5, -5, 5]} intensity={0.5} color="#06b6d4" />
        <spotLight position={[0, 10, 0]} intensity={0.3} angle={0.3} penumbra={1} />

        <ProjectCube position={[-3, 1, 0]} color="#3b82f6" />
        <ProjectCube position={[3, -1, 0]} color="#06b6d4" />
        <ProjectCube position={[0, 2, -2]} color="#8b5cf6" />
        
        <DataStream />
        <HexagonGrid />

        <Environment preset="night" />
      </Canvas>
    </div>
  );
}
