
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sky, Stars, Cloud } from '@react-three/drei';
import * as THREE from 'three';
import { TimeOfDay } from '../types';

interface EnvironmentManagerProps {
  timeOfDay: TimeOfDay;
}

const EnvironmentManager: React.FC<EnvironmentManagerProps> = ({ timeOfDay }) => {
  const isNight = timeOfDay === TimeOfDay.NIGHT;
  const sunPos: [number, number, number] = isNight ? [0, -10, -10] : [10, 10, 10];
  
  return (
    <>
      <Sky 
        distance={450000} 
        sunPosition={sunPos} 
        inclination={isNight ? 0.6 : 0} 
        azimuth={0.25} 
      />
      {isNight && (
        <Stars 
          radius={100} 
          depth={50} 
          count={5000} 
          factor={4} 
          saturation={0} 
          fade 
          speed={1} 
        />
      )}
      {!isNight && <Cloud opacity={0.5} speed={0.4} width={20} depth={1.5} segments={20} position={[0, 20, 0]} />}
      
      <ambientLight intensity={isNight ? 0.1 : 0.4} />
      <directionalLight 
        position={sunPos} 
        intensity={isNight ? 0.2 : 1.2} 
        castShadow 
        shadow-mapSize={[1024, 1024]}
      />
      
      {/* Dynamic factory interior lights */}
      <pointLight position={[0, 10, 0]} intensity={isNight ? 0.8 : 0.2} color="#ffffff" />
      <pointLight position={[10, 5, 10]} intensity={isNight ? 0.5 : 0} color="#63b3ed" />
      <pointLight position={[-10, 5, -10]} intensity={isNight ? 0.5 : 0} color="#ed8936" />
    </>
  );
};

export default EnvironmentManager;
