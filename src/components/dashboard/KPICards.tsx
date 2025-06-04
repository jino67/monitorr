
import React from 'react';
import { BarChart, Database, AlertTriangle } from 'lucide-react';

export const KPICards: React.FC = () => {
  const kpis = [
    {
      title: 'Consommation aujourd\'hui',
      value: '1,847 kWh',
      change: '+12.5%',
      changeType: 'increase',
      icon: BarChart,
      color: 'blue'
    },
    {
      title: 'Capteurs actifs',
      value: '127',
      change: '+3',
      changeType: 'increase',
      icon: Database,
      color: 'green'
    },
    {
      title: 'Anomalies détectées',
      value: '8',
      change: '-2',
      changeType: 'decrease',
      icon: AlertTriangle,
      color: 'orange'
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-50 text-blue-600';
      case 'green': return 'bg-green-50 text-green-600';
      case 'orange': return 'bg-orange-50 text-orange-600';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {kpis.map((kpi, index) => (
        <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg ${getColorClasses(kpi.color)}`}>
              <kpi.icon className="w-6 h-6" />
            </div>
            <span className={`text-sm font-medium ${
              kpi.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
            }`}>
              {kpi.change}
            </span>
          </div>
          <div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">{kpi.title}</h3>
            <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
