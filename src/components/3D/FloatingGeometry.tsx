
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function FloatingMesh({ mouse }: { mouse: { x: number; y: number } }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Custom shader material for gradient and glow effect
  const gradientMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        opacity: { value: 0.9 }, // Increased opacity
        glowIntensity: { value: 2.0 } // Increased glow
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
          // Bright neon orange colors
          vec3 color1 = vec3(1.0, 0.6, 0.2); // Bright orange
          vec3 color2 = vec3(1.0, 0.8, 0.4);  // Light orange
          
          // Create gradient based on position
          float gradient = (vPosition.y + 2.0) / 4.0;
          vec3 finalColor = mix(color1, color2, gradient);
          
          // Add pulse effect every 8 seconds
          float pulse = sin(time * 0.785) * 0.4 + 0.8; // Stronger pulse
          
          // Enhanced fresnel effect for glow
          float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 1.5);
          float glowEffect = fresnel * glowIntensity * pulse;
          
          gl_FragColor = vec4(finalColor + glowEffect * 0.5, opacity * pulse);
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
      <torusGeometry args={[2.5, 0.15, 16, 100]} />
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
    <div className="fixed inset-0 z-0 opacity-70">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <FloatingMesh mouse={mouseRef.current} />
      </Canvas>
    </div>
  );
}
