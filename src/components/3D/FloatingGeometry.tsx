
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function FloatingMesh({ mouse, scrollY }: { mouse: { x: number; y: number }, scrollY: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Enhanced shader material for maximum visibility in hero section
  const gradientMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        opacity: { value: 1.0 }, // Full opacity for hero visibility
        glowIntensity: { value: 2.2 }, // Enhanced glow for prominence
        scrollOffset: { value: 0 }
      },
      vertexShader: `
        varying vec3 vPosition;
        varying vec3 vNormal;
        uniform float scrollOffset;
        
        void main() {
          vPosition = position;
          vNormal = normal;
          
          // Gentle parallax movement based on scroll
          vec3 newPosition = position;
          newPosition.y += scrollOffset * 0.0005;
          newPosition.x += scrollOffset * 0.0002;
          
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
          // Bright, highly visible orange colors for hero section
          vec3 primaryColor = vec3(1.0, 0.75, 0.4);   // Bright orange
          vec3 accentColor = vec3(1.0, 0.9, 0.6);     // Light orange accent
          
          // Enhanced gradient for better visibility
          float gradient = (vPosition.y + 3.0) / 6.0;
          vec3 finalColor = mix(primaryColor, accentColor, gradient);
          
          // Strong glow effect for hero section prominence
          float fresnel = pow(1.0 - dot(normalize(vNormal), vec3(0.0, 0.0, 1.0)), 1.8);
          vec3 glowEffect = finalColor * fresnel * glowIntensity * 0.8;
          
          // Maximum brightness and contrast for hero visibility
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
      // Slow, elegant rotation for hero section
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.06;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.04;
      
      // Minimal mouse interaction for subtle elegance
      meshRef.current.rotation.x += mouse.y * 0.00008;
      meshRef.current.rotation.y += mouse.x * 0.00008;
      
      // Gentle parallax tilt based on scroll
      const scrollTilt = scrollY * 0.0001;
      meshRef.current.rotation.z = scrollTilt;
    }
    
    // Update shader uniforms
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime;
      materialRef.current.uniforms.scrollOffset.value = scrollY;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <torusGeometry args={[3.5, 0.15, 24, 120]} />
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
      <Canvas 
        camera={{ 
          position: [0, 0, 6], 
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
        <FloatingMesh mouse={mouseRef.current} scrollY={scrollY} />
      </Canvas>
    </div>
  );
}
