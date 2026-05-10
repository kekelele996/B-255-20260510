
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { FACTORY_COLORS } from '../constants';

interface MachineProps {
  position: [number, number, number];
  type: 'CNC' | 'PRESS' | 'CONVEYOR';
}

const Machine: React.FC<MachineProps> = ({ position, type }) => {
  const movingPartRef = useRef<THREE.Mesh>(null!);
  const scannerRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    
    // 机械动作逻辑
    if (type === 'PRESS') {
      movingPartRef.current.position.y = 2.5 + Math.abs(Math.sin(t * 3)) * 1.5;
    } else if (type === 'CNC') {
      movingPartRef.current.position.x = Math.sin(t * 2) * 0.8;
      movingPartRef.current.position.z = Math.cos(t * 2) * 0.8;
    }

    // 状态面板扫描线动画
    if (scannerRef.current) {
      scannerRef.current.position.y = Math.sin(t * 5) * 0.3;
    }
  });

  return (
    <group position={position}>
      {/* 机器主体底座 */}
      <mesh position={[0, 1, 0]} castShadow receiveShadow>
        <boxGeometry args={[3, 2, 3]} />
        <meshStandardMaterial color={FACTORY_COLORS.machine} />
      </mesh>
      
      {/* 上部框架 */}
      <mesh position={[0, 3, 0]} castShadow>
        <boxGeometry args={[3.2, 0.2, 3.2]} />
        <meshStandardMaterial color="#2d3748" />
      </mesh>

      {/* 动态核心部件 */}
      <mesh ref={movingPartRef} position={[0, 2.5, 0]} castShadow>
        {type === 'PRESS' ? (
          <cylinderGeometry args={[0.5, 0.5, 2, 16]} />
        ) : (
          <boxGeometry args={[1, 0.5, 1]} />
        )}
        <meshStandardMaterial 
          color={type === 'PRESS' ? FACTORY_COLORS.warning : FACTORY_COLORS.highlight} 
          emissive={type === 'PRESS' ? FACTORY_COLORS.warning : FACTORY_COLORS.highlight}
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* 数字化状态面板 - 增加细节以消除“空白”感 */}
      <group position={[1.51, 1.5, 0]} rotation={[0, Math.PI / 2, 0]}>
        {/* 屏幕底色 */}
        <mesh>
          <planeGeometry args={[1.2, 0.9]} />
          <meshBasicMaterial color="#000" />
        </mesh>
        {/* 动态扫描条 */}
        <mesh ref={scannerRef}>
          <planeGeometry args={[1.1, 0.05]} />
          <meshBasicMaterial color={FACTORY_COLORS.highlight} transparent opacity={0.8} />
        </mesh>
        {/* 屏幕边框 */}
        <mesh position={[0, 0, -0.01]}>
          <planeGeometry args={[1.3, 1.0]} />
          <meshBasicMaterial color="#333" />
        </mesh>
      </group>
    </group>
  );
};

export default Machine;
