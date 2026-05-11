
import React, { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { CAMERA_PATH } from '../constants';

interface CameraCruiseProps {
  enabled: boolean;
}

const CameraCruise: React.FC<CameraCruiseProps> = ({ enabled }) => {
  const { camera } = useThree();
  const [waypointIndex, setWaypointIndex] = useState(0);
  const targetPos = useRef(new THREE.Vector3(...CAMERA_PATH[0].position));
  const lookAtPos = useRef(new THREE.Vector3(...CAMERA_PATH[0].lookAt));

  useFrame((state, delta) => {
    if (!enabled) return;

    // Transition to current waypoint
    camera.position.lerp(targetPos.current, delta * 0.5);
    
    const currentLookAt = new THREE.Vector3();
    camera.getWorldDirection(currentLookAt);
    // This is simplified; a better way is to lerp a target vector and call lookAt
    camera.lookAt(lookAtPos.current);

    // Check if close enough to next waypoint
    if (camera.position.distanceTo(targetPos.current) < 1) {
      const nextIdx = (waypointIndex + 1) % CAMERA_PATH.length;
      setWaypointIndex(nextIdx);
      targetPos.current.set(...CAMERA_PATH[nextIdx].position);
      lookAtPos.current.set(...CAMERA_PATH[nextIdx].lookAt);
    }
  });

  return null;
};

export default CameraCruise;
