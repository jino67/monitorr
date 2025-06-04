
import React from 'react';
import { BarChart } from 'lucide-react';

export const ConsumptionSummary: React.FC = () => {
  const weeklyData = [
    { day: 'Lun', consumption: 1250 },
    { day: 'Mar', consumption: 1180 },
    { day: 'Mer', consumption: 1340 },
    { day: 'Jeu', consumption: 1420 },
    { day: 'Ven', consumption: 1380 },
    { day: 'Sam', consumption: 890 },
    { day: 'Dim', consumption: 750 },
  ];

  const maxConsumption = Math.max(...weeklyData.map(d => d.consumption));

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Résumé de consommation</h2>
        <BarChart className="w-5 h-5 text-gray-400" />
      </div>
      
      <p className="text-sm text-gray-600 mb-4">7 derniers jours</p>
      
      {/* Weekly Chart */}
      <div className="space-y-3">
        {weeklyData.map((day, index) => (
          <div key={index} className="flex items-center space-x-3">
            <span className="text-sm font-medium text-gray-700 w-8">{day.day}</span>
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(day.consumption / maxConsumption) * 100}%` }}
              ></div>
            </div>
            <span className="text-sm text-gray-600 w-16 text-right">{day.consumption} kWh</span>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Total cette semaine</span>
          <span className="text-lg font-bold text-gray-900">
            {weeklyData.reduce((sum, day) => sum + day.consumption, 0).toLocaleString()} kWh
          </span>
        </div>
      </div>
    </div>
  );
};
