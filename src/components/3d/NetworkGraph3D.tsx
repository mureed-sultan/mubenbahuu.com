import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface Node {
  id: number;
  position: [number, number, number];
  color: string;
  size: number;
}

interface Edge {
  from: number;
  to: number;
}

function NetworkNode({ position, color, size }: { position: [number, number, number]; color: string; size: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(size * (1 + Math.sin(state.clock.elapsedTime * 2) * 0.1));
    }
  });

  return (
    <Float speed={3} rotationIntensity={0} floatIntensity={0.3}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color}
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </Float>
  );
}

function NetworkEdge({ start, end }: { start: [number, number, number]; end: [number, number, number] }) {
  return (
    <line>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={2}
          array={new Float32Array([...start, ...end])}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#00d4ff" opacity={0.3} transparent />
    </line>
  );
}

function PulsingSignal({ start, end }: { start: [number, number, number]; end: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const t = (state.clock.elapsedTime * 0.5) % 1;
      meshRef.current.position.set(
        start[0] + (end[0] - start[0]) * t,
        start[1] + (end[1] - start[1]) * t,
        start[2] + (end[2] - start[2]) * t
      );
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshBasicMaterial color="#00d4ff" />
    </mesh>
  );
}

function Graph() {
  const groupRef = useRef<THREE.Group>(null);

  const nodes: Node[] = useMemo(() => [
    { id: 0, position: [0, 0, 0], color: '#00d4ff', size: 1.5 },
    { id: 1, position: [-2, 1, 0.5], color: '#a855f7', size: 1 },
    { id: 2, position: [2, 1, -0.5], color: '#3b82f6', size: 1 },
    { id: 3, position: [-1.5, -1.5, 0], color: '#22c55e', size: 1 },
    { id: 4, position: [1.5, -1.5, 0.5], color: '#f59e0b', size: 1 },
    { id: 5, position: [0, 2, -1], color: '#ec4899', size: 0.8 },
    { id: 6, position: [-2.5, -0.5, -0.5], color: '#06b6d4', size: 0.8 },
    { id: 7, position: [2.5, -0.5, 0], color: '#8b5cf6', size: 0.8 },
  ], []);

  const edges: Edge[] = useMemo(() => [
    { from: 0, to: 1 },
    { from: 0, to: 2 },
    { from: 0, to: 3 },
    { from: 0, to: 4 },
    { from: 0, to: 5 },
    { from: 1, to: 6 },
    { from: 2, to: 7 },
    { from: 1, to: 5 },
    { from: 2, to: 5 },
    { from: 3, to: 6 },
    { from: 4, to: 7 },
  ], []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {edges.map((edge, i) => (
        <NetworkEdge 
          key={`edge-${i}`} 
          start={nodes[edge.from].position} 
          end={nodes[edge.to].position} 
        />
      ))}
      {edges.slice(0, 3).map((edge, i) => (
        <PulsingSignal
          key={`signal-${i}`}
          start={nodes[edge.from].position}
          end={nodes[edge.to].position}
        />
      ))}
      {nodes.map((node) => (
        <NetworkNode 
          key={node.id} 
          position={node.position} 
          color={node.color} 
          size={node.size}
        />
      ))}
    </group>
  );
}

export default function NetworkGraph3D({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full h-[300px] ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00d4ff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a855f7" />
        
        <Graph />
      </Canvas>
    </div>
  );
}
