
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function FloatingMesh({ mouse, scrollY }: { mouse: { x: number; y: number }, scrollY: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Enhanced wireframe material for maximum visibility
  const wireframeMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: 0xFDBA74, // Orange-300
      wireframe: true,
      transparent: true,
      opacity: 1.0, // Full opacity
      side: THREE.DoubleSide
    });
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      // Slow rotation for elegance
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.08;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      
      // Subtle mouse interaction
      meshRef.current.rotation.x += mouse.y * 0.0002;
      meshRef.current.rotation.y += mouse.x * 0.0002;
      
      // Gentle scroll parallax
      const scrollTilt = scrollY * 0.00003;
      meshRef.current.rotation.z = scrollTilt;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <torusGeometry args={[4.5, 0.15, 20, 120]} />
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
          position: [0, 0, 10], 
          fov: 50 
        }}
        style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[8, 8, 8]} intensity={1.5} />
        <pointLight position={[12, 12, 12]} intensity={1.2} color="#FDBA74" />
        <pointLight position={[-8, -8, 8]} intensity={0.8} color="#FED7AA" />
        <FloatingMesh mouse={mouseRef.current} scrollY={scrollY} />
      </Canvas>
    </div>
  );
}
