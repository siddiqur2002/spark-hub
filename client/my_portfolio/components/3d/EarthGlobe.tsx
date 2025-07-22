import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, CanvasTexture } from 'three';
import * as THREE from 'three';

// Create Earth texture programmatically
const createEarthTexture = (): CanvasTexture => {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  
  if (ctx) {
    // Create Earth-like pattern
    const gradient = ctx.createLinearGradient(0, 0, 512, 256);
    gradient.addColorStop(0, '#0066cc');
    gradient.addColorStop(0.3, '#004499');
    gradient.addColorStop(0.7, '#0088ff');
    gradient.addColorStop(1, '#0066cc');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 256);
    
    // Add continents (simplified shapes)
    ctx.fillStyle = '#228b22';
    
    // North America-like shape
    ctx.beginPath();
    ctx.ellipse(100, 80, 30, 40, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Europe/Africa-like shape
    ctx.beginPath();
    ctx.ellipse(200, 100, 20, 50, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Asia-like shape
    ctx.beginPath();
    ctx.ellipse(350, 70, 40, 30, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Australia-like shape
    ctx.beginPath();
    ctx.ellipse(400, 180, 15, 10, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Add some clouds/atmosphere effect
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    for (let i = 0; i < 90; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 256;
      const radius = Math.random() * 15 + 5;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  return new CanvasTexture(canvas);
};

export function EarthGlobe() {
  const meshRef = useRef<Mesh>(null);
  const earthTexture = useMemo(() => createEarthTexture(), []);

  useFrame((state) => {
    if (meshRef.current) {
      // Slow rotation around Y axis (Earth spinning)
      meshRef.current.rotation.y += 0.005;
      
      // Subtle floating motion
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      
      // Very slight wobble for realism
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  return (
    <group position={[8, 2, -3]}>
      {/* Main Earth sphere */}
      <mesh ref={meshRef} scale={[1.5, 1.5, 1.5]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial 
          map={earthTexture}
          metalness={0.1}
          roughness={0.8}
          emissive="#001122"
          emissiveIntensity={0.1}
        />
      </mesh>
      
      {/* Atmosphere glow effect */}
      <mesh scale={[1.8, 1.8, 1.8]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial 
          color="#4444ff"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>
      
      {/* Subtle light representing sun */}
      <pointLight
        position={[3, 1, 2]}
        intensity={0.5}
        color="#ffffff"
        distance={8}
      />
    </group>
  );
}
