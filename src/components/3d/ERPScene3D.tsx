import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text, MeshTransmissionMaterial, Environment, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

// Database cylinder representing ERP data storage
function DatabaseCylinder({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group position={position}>
        <mesh ref={meshRef}>
          <cylinderGeometry args={[0.6, 0.6, 0.3, 32]} />
          <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.6, 0.6, 0.1, 32]} />
          <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0, -0.2, 0]}>
          <cylinderGeometry args={[0.6, 0.6, 0.1, 32]} />
          <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
        </mesh>
      </group>
    </Float>
  );
}

// Gear representing process automation
function Gear({ position, size = 1, color }: { position: [number, number, number]; size?: number; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={size}>
        <torusGeometry args={[0.5, 0.15, 16, 8]} />
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} wireframe />
      </mesh>
    </Float>
  );
}

// Connection nodes
function ConnectionNode({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.1);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <octahedronGeometry args={[0.2, 0]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
    </mesh>
  );
}

// Data flow connections
function DataConnections() {
  const groupRef = useRef<THREE.Group>(null);

  const connections = useMemo(() => {
    const points: { start: [number, number, number]; end: [number, number, number] }[] = [
      { start: [-2, 1, 0], end: [0, 0, 0] },
      { start: [2, 1, 0], end: [0, 0, 0] },
      { start: [0, -1.5, 0], end: [0, 0, 0] },
      { start: [-1.5, -1, 1], end: [0, 0, 0] },
      { start: [1.5, -1, 1], end: [0, 0, 0] },
    ];
    return points;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {connections.map((conn, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([...conn.start, ...conn.end])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#00d4ff" opacity={0.4} transparent linewidth={2} />
        </line>
      ))}
      {connections.map((conn, i) => (
        <ConnectionNode key={`node-${i}`} position={conn.start} color="#00d4ff" />
      ))}
    </group>
  );
}

// Central ERP hub
function ERPHub() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
      <RoundedBox ref={meshRef} args={[1.2, 1.2, 1.2]} radius={0.1} smoothness={4}>
        <meshStandardMaterial 
          color="#00d4ff" 
          metalness={0.9} 
          roughness={0.1}
          emissive="#00d4ff"
          emissiveIntensity={0.2}
        />
      </RoundedBox>
    </Float>
  );
}

// Orbiting modules
function OrbitingModules() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  const modules = [
    { angle: 0, label: 'Sales', color: '#00d4ff' },
    { angle: Math.PI / 2, label: 'HR', color: '#a855f7' },
    { angle: Math.PI, label: 'Finance', color: '#3b82f6' },
    { angle: (3 * Math.PI) / 2, label: 'Inventory', color: '#22c55e' },
  ];

  return (
    <group ref={groupRef}>
      {modules.map((mod, i) => {
        const x = Math.cos(mod.angle) * 2.5;
        const z = Math.sin(mod.angle) * 2.5;
        return (
          <Float key={i} speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh position={[x, 0, z]}>
              <boxGeometry args={[0.5, 0.5, 0.5]} />
              <meshStandardMaterial 
                color={mod.color} 
                metalness={0.7} 
                roughness={0.3}
                emissive={mod.color}
                emissiveIntensity={0.3}
              />
            </mesh>
          </Float>
        );
      })}
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00d4ff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a855f7" />
      <spotLight position={[0, 15, 0]} angle={0.4} penumbra={1} intensity={0.8} color="#ffffff" />

      <ERPHub />
      <OrbitingModules />
      <DataConnections />

      <DatabaseCylinder position={[-3, 1.5, -1]} color="#00d4ff" />
      <DatabaseCylinder position={[3, 1.5, -1]} color="#a855f7" />
      
      <Gear position={[-2, -1.5, 1]} size={0.8} color="#3b82f6" />
      <Gear position={[2, -1.5, 1]} size={0.6} color="#22c55e" />
    </>
  );
}

export default function ERPScene3D() {
  return (
    <div className="w-full h-[400px]">
      <Canvas
        camera={{ position: [0, 2, 8], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
