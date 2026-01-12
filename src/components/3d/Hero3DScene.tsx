import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Box, Torus, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';

function FloatingGeometry({ position, geometry, color, speed = 1 }: { 
  position: [number, number, number]; 
  geometry: 'sphere' | 'box' | 'torus' | 'icosahedron';
  color: string;
  speed?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2 * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 * speed;
    }
  });

  const renderGeometry = () => {
    switch (geometry) {
      case 'sphere':
        return <Sphere args={[1, 32, 32]} ref={meshRef}>
          <MeshDistortMaterial color={color} speed={2} distort={0.3} radius={1} />
        </Sphere>;
      case 'box':
        return <Box args={[1.5, 1.5, 1.5]} ref={meshRef}>
          <meshStandardMaterial color={color} wireframe opacity={0.8} transparent />
        </Box>;
      case 'torus':
        return <Torus args={[1, 0.4, 16, 100]} ref={meshRef}>
          <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
        </Torus>;
      case 'icosahedron':
        return <Icosahedron args={[1, 1]} ref={meshRef}>
          <meshStandardMaterial color={color} wireframe />
        </Icosahedron>;
      default:
        return null;
    }
  };

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <group position={position} scale={0.6}>
        {renderGeometry()}
      </group>
    </Float>
  );
}

function Particles({ count = 200 }) {
  const points = useRef<THREE.Points>(null);
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.02;
      points.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#00d4ff" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

function DataFlowLines() {
  const linesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.z = state.clock.elapsedTime * 0.05;
    }
  });

  const lines = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => {
      const angle = (i / 8) * Math.PI * 2;
      const radius = 4;
      return {
        start: [Math.cos(angle) * radius, Math.sin(angle) * radius, -2] as [number, number, number],
        end: [Math.cos(angle + 0.5) * radius * 0.5, Math.sin(angle + 0.5) * radius * 0.5, 2] as [number, number, number],
      };
    });
  }, []);

  return (
    <group ref={linesRef}>
      {lines.map((line, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([...line.start, ...line.end])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#00d4ff" opacity={0.3} transparent />
        </line>
      ))}
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00d4ff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a855f7" />
      <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={0.5} color="#ffffff" />
      
      <Particles count={300} />
      <DataFlowLines />
      
      <FloatingGeometry position={[-3, 1, 0]} geometry="sphere" color="#00d4ff" speed={0.8} />
      <FloatingGeometry position={[3, -1, -1]} geometry="box" color="#a855f7" speed={1.2} />
      <FloatingGeometry position={[0, 2, -2]} geometry="torus" color="#00d4ff" speed={0.6} />
      <FloatingGeometry position={[-2, -2, 1]} geometry="icosahedron" color="#3b82f6" speed={1} />
      <FloatingGeometry position={[4, 2, -3]} geometry="sphere" color="#a855f7" speed={0.9} />
    </>
  );
}

export default function Hero3DScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
