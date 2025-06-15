
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function FloatingMesh({ mouse, scrollY }: { mouse: { x: number; y: number }, scrollY: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Enhanced shader material for maximum visibility and prominence
  const gradientMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        opacity: { value: 0.9 }, // High opacity for prominence
        glowIntensity: { value: 1.8 }, // Controlled glow
        scrollOffset: { value: 0 }
      },
      vertexShader: `
        varying vec3 vPosition;
        varying vec3 vNormal;
        uniform float scrollOffset;
        
        void main() {
          vPosition = position;
          vNormal = normal;
          
          // Subtle position shift based on scroll for parallax
          vec3 newPosition = position;
          newPosition.y += scrollOffset * 0.0008;
          newPosition.x += scrollOffset * 0.0003;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform float opacity;
        uniform float glowIntensity;
        varying vec3 vPosition;
        varying vec3 vNormal;
        
        void main() {
          // Bright, prominent orange colors
          vec3 primaryColor = vec3(1.0, 0.7, 0.3);   // Bright orange
          vec3 accentColor = vec3(1.0, 0.85, 0.5);   // Light orange accent
          
          // Create gradient based on position for depth
          float gradient = (vPosition.y + 3.0) / 6.0;
          vec3 finalColor = mix(primaryColor, accentColor, gradient);
          
          // Controlled glow effect for visibility without blur
          float fresnel = pow(1.0 - dot(normalize(vNormal), vec3(0.0, 0.0, 1.0)), 1.5);
          vec3 glowEffect = finalColor * fresnel * glowIntensity * 0.6;
          
          // High contrast and brightness for clear visibility
          gl_FragColor = vec4(finalColor + glowEffect, opacity);
        }
      `,
      transparent: true,
      wireframe: true,
      side: THREE.DoubleSide
    });
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      // Very gentle rotation - elegant and subtle
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.08;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      
      // Minimal mouse interaction for subtle elegance
      meshRef.current.rotation.x += mouse.y * 0.0001;
      meshRef.current.rotation.y += mouse.x * 0.0001;
      
      // Gentle parallax tilt based on scroll
      const scrollTilt = scrollY * 0.0002;
      meshRef.current.rotation.z = scrollTilt;
    }
    
    // Update shader uniforms
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime;
      materialRef.current.uniforms.scrollOffset.value = scrollY;
    }
  });

  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[3.2, 0.12, 24, 120]} />
      <primitive object={gradientMaterial} ref={materialRef} />
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
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <FloatingMesh mouse={mouseRef.current} scrollY={scrollY} />
      </Canvas>
    </div>
  );
}
