import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, CanvasTexture } from 'three';
import * as THREE from 'three';

interface LaptopProps {
  screenImage?: string;
}

// Create a default texture canvas
const createDefaultTexture = (): CanvasTexture => {
  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 600;
  const ctx = canvas.getContext('2d');
  
  if (ctx) {
    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, 800, 600);
    gradient.addColorStop(0, '#1e1e1e');
    gradient.addColorStop(1, '#374151');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 800, 600);
    
    // Add some text
    ctx.fillStyle = '#6366f1';
    ctx.font = 'bold 24px monospace';
    ctx.fillText('const portfolio = () => {', 50, 100);
    ctx.fillStyle = '#10b981';
    ctx.font = '20px monospace';
    ctx.fillText('return (', 80, 140);
    ctx.fillStyle = '#f59e45';
    ctx.fillText('<div>Welcome to my portfolio!</div>', 120, 180);
    ctx.fillStyle = '#10b981';
    ctx.fillText(');', 80, 220);
    ctx.fillStyle = '#6366f1';
    ctx.font = 'bold 24px monospace';
    ctx.fillText('};', 50, 260);
  }
  
  return new CanvasTexture(canvas);
};

export function Laptop({ screenImage }: LaptopProps) {
  const laptopRef = useRef<THREE.Group>(null);
  const screenRef = useRef<Mesh>(null);
  
  // Create texture with error handling
  const texture = useMemo(() => {
    if (screenImage && screenImage.startsWith('data:')) {
      try {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        
        const canvas = document.createElement('canvas');
        canvas.width = 800;
        canvas.height = 600;
        const ctx = canvas.getContext('2d');
        
        if (ctx) {
          img.onload = () => {
            ctx.drawImage(img, 0, 0, 800, 600);
          };
          img.src = screenImage;
          return new CanvasTexture(canvas);
        }
      } catch (error) {
        console.warn('Failed to load custom image, using default:', error);
      }
    }
    return createDefaultTexture();
  }, [screenImage]);
  
  useFrame((state) => {
    if (laptopRef.current) {
      laptopRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      laptopRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <group ref={laptopRef} position={[0, -0.5, 0]} scale={[1.2, 1.2, 1.2]}>
      {/* Laptop Base */}
      <mesh position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <boxGeometry args={[3, 2, 0.15]} />
        <meshStandardMaterial 
          color="#2d3748" 
          metalness={0.8} 
          roughness={0.2} 
        />
      </mesh>

      {/* Laptop Bottom Bezel */}
      <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <boxGeometry args={[3.1, 2.1, 0.05]} />
        <meshStandardMaterial 
          color="#1a202c" 
          metalness={0.9} 
          roughness={0.1} 
        />
      </mesh>

      {/* Laptop Screen (Back) */}
      <mesh position={[0, 0.8, -0.95]} rotation={[Math.PI * 0.1, 0, 0]}>
        <boxGeometry args={[3, 1.8, 0.1]} />
        <meshStandardMaterial 
          color="#2d3748" 
          metalness={0.8} 
          roughness={0.2} 
        />
      </mesh>

      {/* Screen Display */}
      <mesh 
        ref={screenRef}
        position={[0, 0.8, -0.89]} 
        rotation={[Math.PI * 0.1, 0, 0]}
      >
        <planeGeometry args={[2.6, 1.4]} />
        <meshStandardMaterial 
          map={texture}
          emissive="#111111"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Screen Border */}
      <mesh position={[0, 0.8, -0.9]} rotation={[Math.PI * 0.1, 0, 0]}>
        <planeGeometry args={[2.8, 1.6]} />
        <meshStandardMaterial 
          color="#000000" 
          metalness={0.9} 
          roughness={0.1} 
        />
      </mesh>

      {/* Keyboard */}
      <mesh position={[0, 0.02, 0.3]}>
        <boxGeometry args={[2.4, 0.05, 1.2]} />
        <meshStandardMaterial 
          color="#4a5568" 
          metalness={0.6} 
          roughness={0.4} 
        />
      </mesh>

      {/* Trackpad */}
      <mesh position={[0, 0.025, -0.4]}>
        <boxGeometry args={[0.8, 0.02, 0.6]} />
        <meshStandardMaterial 
          color="#2d3748" 
          metalness={0.8} 
          roughness={0.2} 
        />
      </mesh>

      {/* Apple Logo (or custom logo) */}
      <mesh position={[0, 1.5, -0.89]} rotation={[Math.PI * 0.1, 0, 0]}>
        <circleGeometry args={[0.08]} />
        <meshStandardMaterial 
          color="#ffffff" 
          emissive="#ffffff"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Subtle lighting effect */}
      <pointLight
        position={[0, 0.8, -0.5]}
        intensity={0.5}
        color="#6366f1"
        distance={3}
      />
    </group>
  );
}
