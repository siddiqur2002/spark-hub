import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Vector3 } from 'three';
import * as THREE from 'three';

interface TechObject {
  id: number;
  position: Vector3;
  velocity: Vector3;
  rotation: Vector3;
  rotationSpeed: Vector3;
  scale: number;
  type: 'cube' | 'sphere' | 'pyramid' | 'torus' | 'cylinder';
  color: string;
}

export function FallingTechObjects() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Create tech objects with physics properties
  const techObjects = useMemo(() => {
    const objects: TechObject[] = [];
    const colors = ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];
    const types: TechObject['type'][] = ['cube', 'sphere', 'pyramid', 'torus', 'cylinder'];
    
    for (let i = 0; i < 100; i++) {
      objects.push({
        id: i,
        position: new Vector3(
          (Math.random() - 0.5) * 20, // x: -10 to 10
          Math.random() * 20 + 10,    // y: 10 to 30 (start above screen)
          (Math.random() - 0.5) * 10  // z: -5 to 5
        ),
                velocity: new Vector3(
          (Math.random() - 0.5) * 0.1, // very slight horizontal drift
          -(Math.random() * 0.15 + 0.05), // moon gravity falling speed: -0.05 to -0.2
          (Math.random() - 0.5) * 0.05
        ),
        rotation: new Vector3(
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2
        ),
        rotationSpeed: new Vector3(
          (Math.random() - 0.5) * 0.1,
          (Math.random() - 0.5) * 0.1,
          (Math.random() - 0.5) * 0.1
        ),
        scale: Math.random() * 0.4 + 0.1, // 0.1 to 0.5
        type: types[Math.floor(Math.random() * types.length)],
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    
    return objects;
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Update each tech object
    groupRef.current.children.forEach((child, index) => {
      const obj = techObjects[index];
      if (!obj) return;

      // Update position with velocity (gravity simulation)
      obj.position.add(obj.velocity.clone().multiplyScalar(delta * 60));
      
      // Update rotation
      obj.rotation.add(obj.rotationSpeed.clone().multiplyScalar(delta * 60));

      // Reset object when it falls below screen
      if (obj.position.y < -15) {
        obj.position.y = Math.random() * 5 + 15; // Reset above screen
        obj.position.x = (Math.random() - 0.5) * 20;
        obj.position.z = (Math.random() - 0.5) * 10;
      }

      // Apply transforms to mesh
      child.position.copy(obj.position);
      child.rotation.set(obj.rotation.x, obj.rotation.y, obj.rotation.z);
    });
  });

  const renderTechObject = (obj: TechObject, index: number) => {
        const scale = [obj.scale, obj.scale, obj.scale] as [number, number, number];

    const material = (
      <meshStandardMaterial 
        color={obj.color} 
        metalness={0.8} 
        roughness={0.2}
        emissive={obj.color}
        emissiveIntensity={0.1}
      />
    );

    switch (obj.type) {
      case 'cube':
                return (
          <mesh key={obj.id} scale={scale}>
            <boxGeometry args={[1, 1, 1]} />
            {material}
          </mesh>
        );
      case 'sphere':
                return (
          <mesh key={obj.id} scale={scale}>
            <sphereGeometry args={[0.5, 16, 16]} />
            {material}
          </mesh>
        );
      case 'pyramid':
                return (
          <mesh key={obj.id} scale={scale}>
            <coneGeometry args={[0.5, 1, 4]} />
            {material}
          </mesh>
        );
      case 'torus':
                return (
          <mesh key={obj.id} scale={scale}>
            <torusGeometry args={[0.3, 0.1, 8, 16]} />
            {material}
          </mesh>
        );
      case 'cylinder':
                return (
          <mesh key={obj.id} scale={scale}>
            <cylinderGeometry args={[0.2, 0.2, 1, 8]} />
            {material}
          </mesh>
        );
      default:
        return null;
    }
  };

  return (
    <group ref={groupRef}>
      {techObjects.map((obj, index) => renderTechObject(obj, index))}
    </group>
  );
}
