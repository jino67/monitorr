
import React from 'react';
import { AlertTriangle, Clock } from 'lucide-react';

export const RecentAlerts: React.FC = () => {
  const alerts = [
    {
      id: 1,
      message: 'Seuil de consommation dépassé',
      location: 'Secteur A - Bureau',
      time: 'Il y a 15 min',
      severity: 'high'
    },
    {
      id: 2,
      message: 'Capteur déconnecté',
      location: 'Capteur #45',
      time: 'Il y a 1h',
      severity: 'medium'
    },
    {
      id: 3,
      message: 'Maintenance programmée',
      location: 'Système principal',
      time: 'Il y a 2h',
      severity: 'low'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-blue-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Alertes récentes</h2>
        <button className="text-sm text-blue-600 hover:text-blue-700">Voir tout</button>
      </div>
      
      <div className="space-y-3">
        {alerts.map((alert) => (
          <div key={alert.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <AlertTriangle className={`w-5 h-5 mt-0.5 ${getSeverityColor(alert.severity)}`} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{alert.message}</p>
              <p className="text-xs text-gray-500">{alert.location}</p>
              <div className="flex items-center space-x-1 mt-1">
                <Clock className="w-3 h-3 text-gray-400" />
                <span className="text-xs text-gray-400">{alert.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
