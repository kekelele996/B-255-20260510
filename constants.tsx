
import { CameraWaypoint } from './types';

export const CAMERA_PATH: CameraWaypoint[] = [
  { position: [20, 15, 20], lookAt: [0, 0, 0] },
  { position: [-20, 10, 10], lookAt: [5, 2, -5] },
  { position: [0, 8, -20], lookAt: [0, 2, 0] },
  { position: [15, 5, 5], lookAt: [-10, 0, 10] },
];

export const FACTORY_COLORS = {
  floor: '#1a1a1a',
  machine: '#4a5568',
  robot: '#ed8936',
  highlight: '#63b3ed',
  warning: '#f56565'
};
