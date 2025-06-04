
import React from 'react';
import { AlertTriangle, CheckCircle, Clock } from 'lucide-react';

export const AlertPanel: React.FC = () => {
  const alerts = [
    { type: 'success', message: 'Système opérationnel', icon: CheckCircle },
    { type: 'warning', message: 'Consommation élevée - Secteur B', icon: AlertTriangle },
    { type: 'warning', message: 'Maintenance programmée', icon: Clock },
  ];

  const getAlertStyles = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-50 border-green-200 text-green-800';
      case 'warning': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'error': return 'bg-red-50 border-red-200 text-red-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-green-500';
      case 'warning': return 'text-yellow-500';
      case 'error': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">État du système</h2>
      
      <div className="space-y-3">
        {alerts.map((alert, index) => (
          <div key={index} className={`p-3 rounded-lg border ${getAlertStyles(alert.type)}`}>
            <div className="flex items-center space-x-3">
              <alert.icon className={`w-5 h-5 ${getIconColor(alert.type)}`} />
              <span className="text-sm font-medium">{alert.message}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Statut global</span>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm font-medium text-green-600">Opérationnel</span>
          </div>
        </div>
      </div>
    </div>
  );
};
