
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

export const ConsumptionChart: React.FC = () => {
  // Sample data for the chart
  const data = [
    { time: '00:00', consumption: 850 },
    { time: '04:00', consumption: 720 },
    { time: '08:00', consumption: 1200 },
    { time: '12:00', consumption: 1650 },
    { time: '16:00', consumption: 1890 },
    { time: '20:00', consumption: 1450 },
    { time: '24:00', consumption: 950 },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Consommation en temps réel</h2>
          <p className="text-sm text-gray-600">Dernières 24 heures</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Consommation (kWh)</span>
          </div>
          <button className="text-sm text-blue-600 hover:text-blue-700">Actualiser</button>
        </div>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="time" 
              stroke="#6b7280"
              fontSize={12}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#1f2937',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="consumption" 
              stroke="#3b82f6" 
              strokeWidth={3}
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
