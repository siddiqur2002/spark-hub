import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { OrbitControls, Environment, Float } from '@react-three/drei';
import { HeroMesh } from './HeroMesh';

export function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45 }}
      style={{ height: '100vh', width: '100%' }}
      dpr={[1, 2]}
    >
      <Suspense fallback={null}>
        <Environment preset="studio" />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Float
          speed={1.75}
          rotationIntensity={1}
          floatIntensity={2}
          floatingRange={[0, 0.1]}
        >
          <HeroMesh />
        </Float>
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Suspense>
    </Canvas>
  );
}
