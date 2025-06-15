
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function FloatingMesh({ mouse, scrollY }: { mouse: { x: number; y: number }, scrollY: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Maximum visibility shader material for hero section
  const gradientMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        opacity: { value: 1.0 }, // Full opacity
        glowIntensity: { value: 3.0 }, // Maximum glow for visibility
        scrollOffset: { value: 0 }
      },
      vertexShader: `
        varying vec3 vPosition;
        varying vec3 vNormal;
        uniform float scrollOffset;
        
        void main() {
          vPosition = position;
          vNormal = normal;
          
          // Gentle parallax movement
          vec3 newPosition = position;
          newPosition.y += scrollOffset * 0.0003;
          newPosition.x += scrollOffset * 0.0001;
          
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
          // Maximum brightness orange colors
          vec3 primaryColor = vec3(1.0, 0.6, 0.2);   // Vibrant orange
          vec3 accentColor = vec3(1.0, 0.8, 0.4);    // Bright orange accent
          
          // High contrast gradient
          float gradient = (vPosition.y + 2.0) / 4.0;
          vec3 finalColor = mix(primaryColor, accentColor, gradient);
          
          // Maximum glow effect for visibility
          float fresnel = pow(1.0 - dot(normalize(vNormal), vec3(0.0, 0.0, 1.0)), 2.0);
          vec3 glowEffect = finalColor * fresnel * glowIntensity;
          
          // Ultra-bright output for maximum visibility
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
    
    // Update shader uniforms
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime;
      materialRef.current.uniforms.scrollOffset.value = scrollY;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <torusGeometry args={[4.0, 0.2, 32, 128]} />
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
          position: [0, 0, 8], 
          fov: 60 
        }}
        style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <FloatingMesh mouse={mouseRef.current} scrollY={scrollY} />
      </Canvas>
    </div>
  );
}
