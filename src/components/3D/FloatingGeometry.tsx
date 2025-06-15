
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function FloatingMesh({ mouse, scrollY }: { mouse: { x: number; y: number }, scrollY: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Bright wireframe material for maximum visibility
  const wireframeMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: 0xFDBA74, // Orange-300
      wireframe: true,
      transparent: true,
      opacity: 0.8,
      side: THREE.DoubleSide
    });
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      // Slow rotation for elegance
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.08;
      
      // Subtle mouse interaction
      meshRef.current.rotation.x += mouse.y * 0.0001;
      meshRef.current.rotation.y += mouse.x * 0.0001;
      
      // Gentle scroll parallax
      const scrollTilt = scrollY * 0.00005;
      meshRef.current.rotation.z = scrollTilt;
    }
  });

  return (
    <mesh ref={meshRef} position={[2, 0, 0]}>
      <torusGeometry args={[3.0, 0.1, 16, 100]} />
      <primitive object={wireframeMaterial} ref={materialRef} />
    </mesh>
  );
}

export default function FloatingGeometry({ scrollY = 0 }: { scrollY?: number }) {
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
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas 
        camera={{ 
          position: [0, 0, 12], 
          fov: 45 
        }}
        style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#FDBA74" />
        <FloatingMesh mouse={mouseRef.current} scrollY={scrollY} />
      </Canvas>
    </div>
  );
}
