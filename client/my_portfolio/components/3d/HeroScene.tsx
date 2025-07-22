import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { OrbitControls, Float } from '@react-three/drei';
import { HeroMesh } from './HeroMesh';
import { FallingTechObjects } from './FallingTechObjects';
import { EarthGlobe } from './EarthGlobe';
import { ThreeErrorBoundary } from './ErrorBoundary';

export function HeroScene() {
  return (
    <ThreeErrorBoundary
      fallback={
        <div className="w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 opacity-20 animate-pulse"></div>
      }
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        style={{ height: '100vh', width: '100%' }}
        dpr={[1, 2]}
        gl={{ 
          antialias: true,
          alpha: true,
          preserveDrawingBuffer: true
        }}
      >
        <Suspense fallback={null}>
          {/* Lighting setup */}
          <ambientLight intensity={0.4} />
          <directionalLight 
            position={[10, 10, 5]} 
            intensity={1}
            color="#ffffff"
          />
          <pointLight 
            position={[-10, -10, -5]} 
            intensity={0.5}
            color="#6366f1"
          />
          
          {/* Main floating center object */}
          <Float
            speed={1.75}
            rotationIntensity={1}
            floatIntensity={2}
            floatingRange={[0, 0.1]}
          >
            <HeroMesh />
          </Float>

          {/* Falling technology objects */}
          <FallingTechObjects />

          {/* Earth Globe */}
          <EarthGlobe />

          {/* Subtle orbit controls for user interaction */}
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
            autoRotate
            autoRotateSpeed={0.3}
            enableDamping
            dampingFactor={0.05}
          />
        </Suspense>
      </Canvas>
    </ThreeErrorBoundary>
  );
}
