import { useRef, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Mesh, DoubleSide } from 'three';
import { TextureLoader } from 'three';
import { Html } from '@react-three/drei';
import { animated, useSpring } from '@react-spring/three';

interface ProjectCard3DProps {
  title: string;
  description: string;
  github: string;
  live: string;
}

function CardMesh({ title, description, github, live }: ProjectCard3DProps) {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // এখানে cards.jpg texture লোড করো
  const texture = useLoader(TextureLoader, '/card4.jpg');

  const { rotation } = useSpring({
    rotation: hovered ? [0, 0.2, 0] : [0, 0, 0],
    config: { mass: 1, tension: 170, friction: 26 },
  });

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.011;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 2]} />
      <animated.mesh
        ref={meshRef}
        rotation={rotation}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <planeGeometry args={[3, 2]} />
        <meshStandardMaterial map={texture} side={DoubleSide} />
      </animated.mesh>

      <Html>
        <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/70 to-transparent text-white">
          <h4 className="text-lg font-bold">{title}</h4>
          <p className="text-sm line-clamp-2">{description}</p>
          <div className="flex space-x-2 mt-2">
            <a
              href={live}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 bg-white text-black rounded-md text-xs"
            >
              Live
            </a>
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 bg-black/70 text-white border border-white rounded-md text-xs"
            >
              Code
            </a>
          </div>
        </div>
      </Html>
    </>
  );
}

export function ProjectCard3D(props: ProjectCard3DProps) {
  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl">
      <Canvas camera={{ position: [0, 0, 2.5] }}>
        <CardMesh {...props} />
      </Canvas>
    </div>
  );
}

