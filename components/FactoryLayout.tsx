
import React from 'react';
import { Grid } from '@react-three/drei';
import RoboticArm from './RoboticArm';
import Machine from './Machine';
import { FACTORY_COLORS } from '../constants';

const FactoryLayout: React.FC = () => {
  return (
    <group>
      {/* 工厂地面 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color={FACTORY_COLORS.floor} roughness={0.8} metalness={0.2} />
      </mesh>
      
      {/* 辅助网格线 */}
      <Grid 
        infiniteGrid 
        fadeDistance={50} 
        sectionSize={5} 
        sectionThickness={1.5} 
        sectionColor="#333" 
        cellSize={1} 
        cellThickness={0.5} 
        cellColor="#222" 
      />

      {/* 生产线 A 侧：包含压力机和机械臂的组合布局 */}
      <group position={[-8, 0, 0]}>
        <Machine position={[0, 0, -8]} type="PRESS" />
        <RoboticArm position={[0, 0, -3]} rotationY={0} />
        <Machine position={[0, 0, 2]} type="CNC" />
        <RoboticArm position={[0, 0, 7]} rotationY={Math.PI} speedMultiplier={1.2} />
      </group>

      {/* 生产线 B 侧：镜像布局，不同配置 */}
      <group position={[8, 0, 0]}>
        <Machine position={[0, 0, -8]} type="CNC" />
        <RoboticArm position={[0, 0, -3]} rotationY={Math.PI / 2} />
        <Machine position={[0, 0, 2]} type="PRESS" />
        <RoboticArm position={[0, 0, 7]} rotationY={-Math.PI / 2} speedMultiplier={0.8} />
      </group>
      
      {/* 移除原有的装饰性浮动无人机与背景线框墙，保持场景整洁 */}
    </group>
  );
};

export default FactoryLayout;
