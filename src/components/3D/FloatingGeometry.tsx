
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
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Custom shader material for gradient and glow effect
  const gradientMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        opacity: { value: 0.5 },
        glowIntensity: { value: 1.0 }
      },
      vertexShader: `
        varying vec3 vPosition;
        varying vec3 vNormal;
        
        void main() {
          vPosition = position;
          vNormal = normal;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform float opacity;
        uniform float glowIntensity;
        varying vec3 vPosition;
        varying vec3 vNormal;
        
        void main() {
          // Gradient from neon aqua to electric blue-purple
          vec3 color1 = vec3(0.22, 0.976, 0.843); // #38f9d7 neon aqua
          vec3 color2 = vec3(0.373, 0.373, 1.0);  // #5f5fff electric blue-purple
          
          // Create gradient based on position
          float gradient = (vPosition.y + 2.0) / 4.0;
          vec3 finalColor = mix(color1, color2, gradient);
          
          // Add pulse effect every 8 seconds
          float pulse = sin(time * 0.785) * 0.3 + 0.7; // 0.785 ≈ 2π/8 for 8-second cycle
          
          // Fresnel effect for glow
          float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          float glowEffect = fresnel * glowIntensity * pulse;
          
          gl_FragColor = vec4(finalColor + glowEffect, opacity * pulse);
        }
      `,
      transparent: true,
      wireframe: true,
      side: THREE.DoubleSide
    });
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      
      // Mouse interaction
      meshRef.current.rotation.x += mouse.y * 0.0005;
      meshRef.current.rotation.y += mouse.x * 0.0005;
    }
    
    // Update shader time uniform for pulse effect
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[2, 0.1, 16, 100]} />
      <primitive object={gradientMaterial} ref={materialRef} />
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
