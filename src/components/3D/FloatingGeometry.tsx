
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedPoints({ mouse }: { mouse: { x: number; y: number } }) {
  const ref = useRef<THREE.Points>(null);
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(2000 * 3);
    
    for (let i = 0; i < 2000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    
    return positions;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.05;
      ref.current.rotation.y = state.clock.elapsedTime * 0.1;
      
      // Subtle mouse interaction
      ref.current.rotation.x += mouse.y * 0.0001;
      ref.current.rotation.y += mouse.x * 0.0001;
    }
  });

  return (
    <Points ref={ref} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#8b5cf6"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

function FloatingMesh({ mouse }: { mouse: { x: number; y: number } }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      
      // Mouse interaction
      meshRef.current.rotation.x += mouse.y * 0.0005;
      meshRef.current.rotation.y += mouse.x * 0.0005;
    }
  });

  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[2, 0.1, 16, 100]} />
      <meshBasicMaterial color="#3b82f6" wireframe transparent opacity={0.1} />
    </mesh>
  );
}

export default function FloatingGeometry() {
  const mouseRef = useRef({ x: 0, y: 0 });

  const handleMouseMove = (event: MouseEvent) => {
    mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
  };

  useMemo(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 z-0 opacity-40">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <AnimatedPoints mouse={mouseRef.current} />
        <FloatingMesh mouse={mouseRef.current} />
      </Canvas>
    </div>
  );
}
