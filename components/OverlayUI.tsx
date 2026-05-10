
import React from 'react';
import { Sun, Moon, CloudRain, Snowflake, Camera, Activity } from 'lucide-react';
import { FactoryState, Weather, TimeOfDay } from '../types';

interface OverlayUIProps {
  state: FactoryState;
  onUpdate: (updates: Partial<FactoryState>) => void;
}

const OverlayUI: React.FC<OverlayUIProps> = ({ state, onUpdate }) => {
  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6 font-sans">
      {/* Top Header */}
      <div className="flex justify-between items-start pointer-events-auto">
        <div className="bg-black/60 backdrop-blur-md p-4 rounded-xl border border-white/10 text-white">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Activity className="text-blue-400" />
            三维虚拟工厂 V3
          </h1>
          <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-medium">自主数字孪生控制系统</p>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="flex flex-wrap gap-4 items-end justify-between pointer-events-auto">
        <div className="flex gap-2 bg-black/40 backdrop-blur-lg p-2 rounded-2xl border border-white/5">
          {/* Time Controls */}
          <div className="flex flex-col gap-1 p-2 border-r border-white/10">
            <span className="text-[10px] text-gray-500 uppercase font-bold px-1">昼夜周期</span>
            <div className="flex gap-1">
              <ControlBtn 
                active={state.timeOfDay === TimeOfDay.DAY} 
                onClick={() => onUpdate({ timeOfDay: TimeOfDay.DAY })}
                icon={<Sun size={18} />} 
              />
              <ControlBtn 
                active={state.timeOfDay === TimeOfDay.NIGHT} 
                onClick={() => onUpdate({ timeOfDay: TimeOfDay.NIGHT })}
                icon={<Moon size={18} />} 
              />
            </div>
          </div>

          {/* Weather Controls */}
          <div className="flex flex-col gap-1 p-2 border-r border-white/10">
            <span className="text-[10px] text-gray-500 uppercase font-bold px-1">天气系统</span>
            <div className="flex gap-1">
              <ControlBtn 
                active={state.weather === Weather.CLEAR} 
                onClick={() => onUpdate({ weather: Weather.CLEAR })}
                icon={<Sun size={18} className="text-yellow-400" />} 
              />
              <ControlBtn 
                active={state.weather === Weather.RAIN} 
                onClick={() => onUpdate({ weather: Weather.RAIN })}
                icon={<CloudRain size={18} className="text-blue-400" />} 
              />
              <ControlBtn 
                active={state.weather === Weather.SNOW} 
                onClick={() => onUpdate({ weather: Weather.SNOW })}
                icon={<Snowflake size={18} className="text-blue-100" />} 
              />
            </div>
          </div>

          {/* View Controls */}
          <div className="flex flex-col gap-1 p-2">
            <span className="text-[10px] text-gray-500 uppercase font-bold px-1">导航模式</span>
            <div className="flex gap-1">
              <button 
                onClick={() => onUpdate({ isCruising: !state.isCruising })}
                className={`p-3 rounded-xl transition-all flex items-center gap-2 ${
                  state.isCruising ? 'bg-blue-600 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                <Camera size={18} />
                <span className="text-xs font-bold">{state.isCruising ? '自动巡航' : '手动控制'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard Status */}
        <div className="hidden md:flex gap-6 bg-black/60 backdrop-blur-xl p-4 rounded-2xl border border-white/10 text-white">
          <Stat label="运行效率" value="98.2%" color="text-green-400" />
          <Stat label="实时负载" value="142 kW" color="text-blue-400" />
          <Stat label="活跃设备" value="08" color="text-orange-400" />
        </div>
      </div>
    </div>
  );
};

const ControlBtn = ({ active, onClick, icon }: { active: boolean, onClick: () => void, icon: React.ReactNode }) => (
  <button 
    onClick={onClick}
    className={`p-3 rounded-xl transition-all ${
      active ? 'bg-white/20 text-white shadow-lg' : 'bg-white/5 text-gray-500 hover:bg-white/10'
    }`}
  >
    {icon}
  </button>
);

const Stat = ({ label, value, color }: { label: string, value: string, color: string }) => (
  <div className="flex flex-col">
    <span className="text-[10px] text-gray-400 uppercase font-bold">{label}</span>
    <span className={`text-xl font-mono font-bold ${color}`}>{value}</span>
  </div>
);

export default OverlayUI;
