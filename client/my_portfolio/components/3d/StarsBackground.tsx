'use client';

import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Stars, OrbitControls } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';

export function StarsBackground() {
  return (
    <Canvas
      style={{ position: 'absolute', inset: 0, zIndex: 0 }}
    >
      <ambientLight intensity={0.5} />
      <Stars speed={8} />
      <Suspense fallback={null}>
        <Moon />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
}

function Moon() {
  const moonRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);

  const [moonTexture] = useLoader(THREE.TextureLoader, ['/moon.jpg']);

  useFrame((_, delta) => {
    if (moonRef.current) moonRef.current.rotation.y += delta * 0.1;
    if (cloudsRef.current) cloudsRef.current.rotation.y -= delta * 0.05;
  });

  return (
    <group>
      <mesh ref={moonRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial map={moonTexture} />
      </mesh>
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[2.05, 64, 64]} />
        <meshStandardMaterial transparent opacity={0.2} />
      </mesh>
    </group>
  );
}


