import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { OrbitControls, Float, PerspectiveCamera } from '@react-three/drei';
import { Laptop } from './Laptop';
import { ThreeErrorBoundary } from './ErrorBoundary';

interface LaptopSceneProps {
  screenImage?: string;
  className?: string;
}

// Loading fallback component for inside Canvas (must be Three.js compatible)
const ThreeLoadingFallback = () => (
  <mesh>
    <boxGeometry args={[1, 1, 1]} />
    <meshBasicMaterial color="#6366f1" transparent opacity={0.5} />
  </mesh>
);

export function LaptopScene({ screenImage, className }: LaptopSceneProps) {
  return (
    <div className={className}>
      <ThreeErrorBoundary
        fallback={
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-2xl">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg opacity-20 animate-pulse"></div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                3D Scene Loading...
              </p>
              <p className="text-gray-500 dark:text-gray-500 text-xs mt-1">
                Please wait while we initialize the 3D environment
              </p>
            </div>
          </div>
        }
      >
        <Canvas
          style={{ height: '100%', width: '100%' }}
          dpr={[1, 2]}
          gl={{ 
            antialias: true,
            alpha: true,
            preserveDrawingBuffer: true
          }}
          onCreated={({ gl }) => {
            gl.setClearColor('#f8fafc', 0);
          }}
        >
          <Suspense fallback={<ThreeLoadingFallback />}>
            <PerspectiveCamera makeDefault position={[0, 2, 4]} fov={50} />
            
            {/* Enhanced Lighting Setup - No Environment component to avoid fetch errors */}
            <ambientLight intensity={0.6} color="#ffffff" />
            <directionalLight 
              position={[10, 10, 5]} 
              intensity={1.2}
              color="#ffffff"
              castShadow
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
            />
            <spotLight
              position={[0, 5, 3]}
              angle={0.3}
              penumbra={1}
              intensity={0.8}
              color="#6366f1"
            />
            {/* Additional rim lighting for better visual appeal */}
            <directionalLight 
              position={[-5, 3, -3]} 
              intensity={0.5}
              color="#a855f7"
            />

            <Float
              speed={1.5}
              rotationIntensity={0.5}
              floatIntensity={0.5}
              floatingRange={[0, 0.1]}
            >
              <Laptop screenImage={screenImage} />
            </Float>

            <OrbitControls
              enablePan={false}
              enableZoom={true}
              maxDistance={8}
              minDistance={3}
              maxPolarAngle={Math.PI / 2.2}
              minPolarAngle={Math.PI / 4}
              autoRotate
              autoRotateSpeed={2}
            />
          </Suspense>
        </Canvas>
      </ThreeErrorBoundary>
    </div>
  );
}
