
import React, { useState, useEffect } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer, 
  Tooltip
} from 'recharts';
import { Play, Pause } from 'lucide-react';

interface ConsumptionData {
  time: string;
  consumption: number;
  prediction: number;
}

export const ConsumptionChart: React.FC = () => {
  const [isRealTime, setIsRealTime] = useState(true);
  const [data, setData] = useState<ConsumptionData[]>([
    { time: '00:00', consumption: 850, prediction: 870 },
    { time: '04:00', consumption: 720, prediction: 750 },
    { time: '08:00', consumption: 1200, prediction: 1180 },
    { time: '12:00', consumption: 1650, prediction: 1600 },
    { time: '16:00', consumption: 1890, prediction: 1850 },
    { time: '20:00', consumption: 1450, prediction: 1480 },
    { time: '24:00', consumption: 950, prediction: 970 },
  ]);

  // Gentle real-time updates
  useEffect(() => {
    if (!isRealTime) return;

    const interval = setInterval(() => {
      setData(prevData => {
        const newData = [...prevData];
        const lastPoint = newData[newData.length - 1];
        
        const currentTime = new Date();
        const timeStr = currentTime.toLocaleTimeString('fr-FR', { 
          hour: '2-digit', 
          minute: '2-digit' 
        });
        
        // Gentle variation
        const variation = (Math.random() - 0.5) * 100;
        const newConsumption = Math.max(500, lastPoint.consumption + variation);
        const newPrediction = newConsumption + (Math.random() - 0.5) * 50;
        
        newData.push({
          time: timeStr,
          consumption: Math.round(newConsumption),
          prediction: Math.round(newPrediction)
        });
        
        return newData.slice(-15);
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [isRealTime]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-sm text-gray-700 p-3 rounded-xl shadow-lg border border-gray-100">
          <p className="font-medium mb-2 text-gray-800">{`${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div 
                  className="w-2 h-2 rounded-full" 
                  style={{ backgroundColor: entry.color }}
                />
                <span>{entry.name}:</span>
              </div>
              <span className="font-medium">{entry.value} kWh</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 p-6 shadow-sm">
      {/* Soft header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-medium text-gray-700">Consommation</h2>
          <p className="text-sm text-gray-500 mt-1">Suivi en temps réel</p>
        </div>
        
        <button
          onClick={() => setIsRealTime(!isRealTime)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            isRealTime 
              ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100' 
              : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
          }`}
        >
          {isRealTime ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {isRealTime ? 'Pause' : 'Play'}
        </button>
      </div>

      {/* Soft legend */}
      <div className="flex items-center gap-6 mb-6 p-3 bg-gray-50/50 rounded-xl">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Consommation réelle</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full opacity-70"></div>
          <span className="text-sm text-gray-600">Prédiction</span>
        </div>
        {isRealTime && (
          <div className="flex items-center gap-2 ml-auto">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-emerald-600">En direct</span>
          </div>
        )}
      </div>
      
      {/* Soft chart */}
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" strokeWidth={1} />
            <XAxis 
              dataKey="time" 
              stroke="#94a3b8"
              fontSize={12}
              tick={{ fill: '#94a3b8' }}
              axisLine={{ stroke: '#e2e8f0' }}
              tickLine={{ stroke: '#e2e8f0' }}
            />
            <YAxis 
              stroke="#94a3b8"
              fontSize={12}
              tick={{ fill: '#94a3b8' }}
              axisLine={{ stroke: '#e2e8f0' }}
              tickLine={{ stroke: '#e2e8f0' }}
            />
            <Tooltip content={<CustomTooltip />} />
            
            {/* Soft consumption line */}
            <Line 
              type="monotone" 
              dataKey="consumption" 
              stroke="url(#blueGradient)" 
              strokeWidth={3}
              dot={{ fill: '#60a5fa', strokeWidth: 0, r: 4, opacity: 0.8 }}
              activeDot={{ r: 6, stroke: '#60a5fa', strokeWidth: 2, fill: 'white' }}
              name="Consommation"
            />
            
            {/* Soft prediction line */}
            <Line 
              type="monotone" 
              dataKey="prediction" 
              stroke="#a855f7" 
              strokeWidth={2}
              strokeDasharray="8 4"
              dot={{ fill: '#a855f7', strokeWidth: 0, r: 3, opacity: 0.6 }}
              name="Prédiction"
            />
            
            {/* Gradient definitions */}
            <defs>
              <linearGradient id="blueGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Soft stats */}
      <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-gray-100">
        <div className="text-center p-3 bg-blue-50/50 rounded-xl">
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Actuel</p>
          <p className="text-lg font-medium text-blue-600">{data[data.length - 1]?.consumption} kWh</p>
        </div>
        <div className="text-center p-3 bg-purple-50/50 rounded-xl">
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Prédiction</p>
          <p className="text-lg font-medium text-purple-600">{data[data.length - 1]?.prediction} kWh</p>
        </div>
      </div>
    </div>
  );
};
