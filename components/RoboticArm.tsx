
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { FACTORY_COLORS } from '../constants';

interface RoboticArmProps {
  position: [number, number, number];
  rotationY?: number;
  speedMultiplier?: number;
}

const RoboticArm: React.FC<RoboticArmProps> = ({ position, rotationY = 0, speedMultiplier = 1 }) => {
  const baseRef = useRef<THREE.Group>(null!);
  const arm1Ref = useRef<THREE.Mesh>(null!);
  const arm2Ref = useRef<THREE.Mesh>(null!);
  const effectorRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime * speedMultiplier;
    
    // Rotate base
    baseRef.current.rotation.y = rotationY + Math.sin(t) * 0.5;
    
    // Animate joints
    arm1Ref.current.rotation.z = Math.sin(t * 1.5) * 0.3 + 0.5;
    arm2Ref.current.rotation.z = Math.cos(t * 2) * 0.4 - 0.5;
    
    // Effector flash
    if (effectorRef.current) {
        const material = effectorRef.current.material as THREE.MeshStandardMaterial;
        material.emissiveIntensity = Math.abs(Math.sin(t * 5)) * 2;
    }
  });

  return (
    <group position={position} ref={baseRef}>
      {/* Base */}
      <mesh position={[0, 0.25, 0]} castShadow>
        <cylinderGeometry args={[0.8, 1, 0.5, 16]} />
        <meshStandardMaterial color={FACTORY_COLORS.machine} />
      </mesh>
      
      {/* Joint 1 */}
      <group position={[0, 0.5, 0]} ref={arm1Ref}>
        <mesh position={[0, 1.5, 0]} castShadow>
          <boxGeometry args={[0.4, 3, 0.4]} />
          <meshStandardMaterial color={FACTORY_COLORS.robot} />
        </mesh>
        
        {/* Joint 2 */}
        <group position={[0, 3, 0]} ref={arm2Ref}>
           <mesh position={[0, 1, 0]} castShadow>
            <boxGeometry args={[0.3, 2, 0.3]} />
            <meshStandardMaterial color={FACTORY_COLORS.robot} />
          </mesh>
          
          {/* Effector */}
          <mesh position={[0, 2, 0]} ref={effectorRef} castShadow>
            <sphereGeometry args={[0.2, 8, 8]} />
            <meshStandardMaterial color={FACTORY_COLORS.highlight} emissive={FACTORY_COLORS.highlight} emissiveIntensity={1} />
          </mesh>
        </group>
      </group>
    </group>
  );
};

export default RoboticArm;
