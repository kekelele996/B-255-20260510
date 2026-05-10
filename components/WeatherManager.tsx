
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Weather } from '../types';

interface WeatherManagerProps {
  weather: Weather;
}

const WeatherManager: React.FC<WeatherManagerProps> = ({ weather }) => {
  const count = 2000;
  const meshRef = useRef<THREE.Points>(null!);
  
  const particles = useMemo(() => {
    const temp = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      temp[i * 3] = (Math.random() - 0.5) * 60;     // x
      temp[i * 3 + 1] = Math.random() * 40;         // y
      temp[i * 3 + 2] = (Math.random() - 0.5) * 60; // z
    }
    return temp;
  }, []);

  useFrame((state, delta) => {
    if (weather === Weather.CLEAR) return;
    
    const positions = meshRef.current.geometry.attributes.position.array as Float32Array;
    const speed = weather === Weather.RAIN ? 0.8 : 0.2;
    const drift = weather === Weather.RAIN ? 0 : 0.05;

    for (let i = 0; i < count; i++) {
      // Move Y down
      positions[i * 3 + 1] -= speed;
      // Drift X for snow
      if (weather === Weather.SNOW) {
        positions[i * 3] += Math.sin(state.clock.elapsedTime + i) * drift;
      }
      
      // Reset if below floor
      if (positions[i * 3 + 1] < 0) {
        positions[i * 3 + 1] = 40;
      }
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  if (weather === Weather.CLEAR) return null;

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={weather === Weather.RAIN ? 0.1 : 0.2}
        color={weather === Weather.RAIN ? "#93c5fd" : "#ffffff"}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

export default WeatherManager;
