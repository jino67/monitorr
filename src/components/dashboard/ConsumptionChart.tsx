import React, { useState, useEffect } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer, 
  Tooltip, 
  Legend,
  Area,
  ComposedChart,
  Bar
} from 'recharts';
import { Play, Pause, RotateCcw, TrendingUp, TrendingDown } from 'lucide-react';

interface ConsumptionData {
  time: string;
  consumption: number;
  prediction: number;
  temperature: number;
  efficiency: number;
}

export const ConsumptionChart: React.FC = () => {
  const [isRealTime, setIsRealTime] = useState(true);
  const [selectedMetric, setSelectedMetric] = useState<'24h' | '7d' | '30d'>('24h');
  const [data, setData] = useState<ConsumptionData[]>([
    { time: '00:00', consumption: 850, prediction: 820, temperature: 22, efficiency: 85 },
    { time: '04:00', consumption: 720, prediction: 750, temperature: 20, efficiency: 88 },
    { time: '08:00', consumption: 1200, prediction: 1180, temperature: 24, efficiency: 82 },
    { time: '12:00', consumption: 1650, prediction: 1600, temperature: 28, efficiency: 79 },
    { time: '16:00', consumption: 1890, prediction: 1850, temperature: 30, efficiency: 76 },
    { time: '20:00', consumption: 1450, prediction: 1480, temperature: 26, efficiency: 81 },
    { time: '24:00', consumption: 950, prediction: 970, temperature: 23, efficiency: 86 },
  ]);

  // Real-time data simulation
  useEffect(() => {
    if (!isRealTime) return;

    const interval = setInterval(() => {
      setData(prevData => {
        const newData = [...prevData];
        const lastPoint = newData[newData.length - 1];
        
        // Simulate new data point
        const currentTime = new Date();
        const timeStr = currentTime.toLocaleTimeString('fr-FR', { 
          hour: '2-digit', 
          minute: '2-digit' 
        });
        
        const variation = (Math.random() - 0.5) * 200;
        const newConsumption = Math.max(500, lastPoint.consumption + variation);
        const newPrediction = newConsumption + (Math.random() - 0.5) * 100;
        const newTemperature = 20 + Math.random() * 15;
        const newEfficiency = 70 + Math.random() * 20;
        
        newData.push({
          time: timeStr,
          consumption: Math.round(newConsumption),
          prediction: Math.round(newPrediction),
          temperature: Math.round(newTemperature),
          efficiency: Math.round(newEfficiency)
        });
        
        // Keep only last 20 points for smooth animation
        return newData.slice(-20);
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isRealTime]);

  const currentConsumption = data[data.length - 1]?.consumption || 0;
  const previousConsumption = data[data.length - 2]?.consumption || 0;
  const trend = currentConsumption - previousConsumption;

  const resetData = () => {
    setData([
      { time: '00:00', consumption: 850, prediction: 820, temperature: 22, efficiency: 85 },
      { time: '04:00', consumption: 720, prediction: 750, temperature: 20, efficiency: 88 },
      { time: '08:00', consumption: 1200, prediction: 1180, temperature: 24, efficiency: 82 },
      { time: '12:00', consumption: 1650, prediction: 1600, temperature: 28, efficiency: 79 },
      { time: '16:00', consumption: 1890, prediction: 1850, temperature: 30, efficiency: 76 },
      { time: '20:00', consumption: 1450, prediction: 1480, temperature: 26, efficiency: 81 },
      { time: '24:00', consumption: 950, prediction: 970, temperature: 23, efficiency: 86 },
    ]);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900 text-white p-4 rounded-lg shadow-lg border border-gray-700">
          <p className="font-semibold mb-2">{`Heure: ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-sm">{entry.name}:</span>
              </div>
              <span className="font-mono font-bold">
                {entry.name === 'Température' ? `${entry.value}°C` : 
                 entry.name === 'Efficacité' ? `${entry.value}%` :
                 `${entry.value} kWh`}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      {/* Header with controls */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Consommation en temps réel</h2>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-sm text-gray-600">Dernières 24 heures</p>
            <div className="flex items-center gap-1">
              {trend > 0 ? (
                <TrendingUp className="w-4 h-4 text-red-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-green-500" />
              )}
              <span className={`text-sm font-medium ${trend > 0 ? 'text-red-500' : 'text-green-500'}`}>
                {trend > 0 ? '+' : ''}{trend} kWh
              </span>
            </div>
          </div>
        </div>
        
        {/* Control buttons */}
        <div className="flex items-center gap-3">
          <div className="flex bg-gray-100 rounded-lg p-1">
            {(['24h', '7d', '30d'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setSelectedMetric(period)}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                  selectedMetric === period
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
          
          <button
            onClick={() => setIsRealTime(!isRealTime)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              isRealTime 
                ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {isRealTime ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isRealTime ? 'Pause' : 'Play'}
          </button>
          
          <button
            onClick={resetData}
            className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-6 mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Consommation réelle</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Prédiction IA</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Température</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Efficacité</span>
        </div>
        {isRealTime && (
          <div className="flex items-center gap-2 ml-auto">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-600 font-medium">En direct</span>
          </div>
        )}
      </div>
      
      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="time" 
              stroke="#6b7280"
              fontSize={12}
              tick={{ fill: '#6b7280' }}
            />
            <YAxis 
              yAxisId="left"
              stroke="#6b7280"
              fontSize={12}
              tick={{ fill: '#6b7280' }}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              stroke="#6b7280"
              fontSize={12}
              tick={{ fill: '#6b7280' }}
            />
            <Tooltip content={<CustomTooltip />} />
            
            {/* Main consumption line */}
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="consumption" 
              stroke="#3b82f6" 
              strokeWidth={3}
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
              name="Consommation"
            />
            
            {/* Prediction line */}
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="prediction" 
              stroke="#8b5cf6" 
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 3 }}
              name="Prédiction IA"
            />
            
            {/* Temperature line */}
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="temperature" 
              stroke="#f97316" 
              strokeWidth={2}
              dot={{ fill: '#f97316', strokeWidth: 2, r: 3 }}
              name="Température"
            />
            
            {/* Efficiency bars */}
            <Bar 
              yAxisId="right"
              dataKey="efficiency" 
              fill="#10b981"
              fillOpacity={0.3}
              name="Efficacité"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Real-time stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-4 border-t border-gray-200">
        <div className="text-center">
          <p className="text-xs text-gray-500 uppercase tracking-wide">Actuel</p>
          <p className="text-lg font-bold text-blue-600">{currentConsumption} kWh</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500 uppercase tracking-wide">Prédiction</p>
          <p className="text-lg font-bold text-purple-600">{data[data.length - 1]?.prediction} kWh</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500 uppercase tracking-wide">Température</p>
          <p className="text-lg font-bold text-orange-600">{data[data.length - 1]?.temperature}°C</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500 uppercase tracking-wide">Efficacité</p>
          <p className="text-lg font-bold text-green-600">{data[data.length - 1]?.efficiency}%</p>
        </div>
      </div>
    </div>
  );
};
