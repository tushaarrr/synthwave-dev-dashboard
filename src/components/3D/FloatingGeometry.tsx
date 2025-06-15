
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function FloatingMesh({ mouse }: { mouse: { x: number; y: number } }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Enhanced shader material for maximum visibility and orange theme
  const gradientMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        opacity: { value: 1.0 }, // Full opacity for prominence
        glowIntensity: { value: 2.5 } // Enhanced glow
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
          // Enhanced orange colors for better visibility
          vec3 color1 = vec3(1.0, 0.73, 0.45); // Orange-300 equivalent
          vec3 color2 = vec3(1.0, 0.6, 0.2);   // Brighter orange
          
          // Create gradient based on position
          float gradient = (vPosition.y + 2.0) / 4.0;
          vec3 finalColor = mix(color1, color2, gradient);
          
          // Subtle pulse effect for visual interest
          float pulse = sin(time * 0.8) * 0.3 + 0.9; // More stable pulse
          
          // Enhanced fresnel effect for glow
          float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 1.2);
          float glowEffect = fresnel * glowIntensity * pulse;
          
          // Ensure strong visibility with consistent opacity
          gl_FragColor = vec4(finalColor + glowEffect * 0.4, opacity);
        }
      `,
      transparent: true,
      wireframe: true,
      side: THREE.DoubleSide
    });
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      // Slower, more elegant rotation
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.08;
      
      // Subtle mouse interaction for elegance
      meshRef.current.rotation.x += mouse.y * 0.0003;
      meshRef.current.rotation.y += mouse.x * 0.0003;
    }
    
    // Update shader time uniform
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[2.8, 0.18, 16, 100]} />
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
    <div className="fixed inset-0 z-0 opacity-100">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <FloatingMesh mouse={mouseRef.current} />
      </Canvas>
    </div>
  );
}
