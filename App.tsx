
import React, { useState, Suspense, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Loader, ContactShadows } from '@react-three/drei';
import { FactoryState, Weather, TimeOfDay } from './types';
import EnvironmentManager from './components/EnvironmentManager';
import WeatherManager from './components/WeatherManager';
import FactoryLayout from './components/FactoryLayout';
import CameraCruise from './components/CameraCruise';
import OverlayUI from './components/OverlayUI';

const App: React.FC = () => {
  const [state, setState] = useState<FactoryState>({
    weather: Weather.CLEAR,
    timeOfDay: TimeOfDay.DAY,
    isCruising: false,
    activeRobotId: null,
  });

  const updateState = useCallback((updates: Partial<FactoryState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  return (
    <div className="w-full h-full bg-slate-950 relative overflow-hidden">
      <Canvas shadows>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[20, 20, 20]} fov={45} />
          
          <EnvironmentManager timeOfDay={state.timeOfDay} />
          <WeatherManager weather={state.weather} />
          
          <FactoryLayout />
          <CameraCruise enabled={state.isCruising} />
          
          {!state.isCruising && (
            <OrbitControls 
              makeDefault 
              maxPolarAngle={Math.PI / 2.1} 
              enableDamping 
              dampingFactor={0.05} 
            />
          )}
          
          <ContactShadows 
            position={[0, 0.01, 0]} 
            opacity={0.4} 
            scale={40} 
            blur={2} 
            far={10} 
            resolution={512} 
            color="#000000" 
          />
        </Suspense>
      </Canvas>

      <OverlayUI 
        state={state} 
        onUpdate={updateState} 
      />
      
      <Loader />
      
      {/* HUD 噪点叠加效果 */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
    </div>
  );
};

export default App;
