
export enum Weather {
  CLEAR = 'CLEAR',
  RAIN = 'RAIN',
  SNOW = 'SNOW'
}

export enum TimeOfDay {
  DAY = 'DAY',
  NIGHT = 'NIGHT'
}

export interface FactoryState {
  weather: Weather;
  timeOfDay: TimeOfDay;
  isCruising: boolean;
  activeRobotId: string | null;
}

export interface CameraWaypoint {
  position: [number, number, number];
  lookAt: [number, number, number];
}
