
import React from 'react';
import { Database, User } from 'lucide-react';

export const DeviceStatus: React.FC = () => {
  const deviceStats = [
    { label: 'Connectés', count: 127, total: 150, color: 'green' },
    { label: 'Déconnectés', count: 23, total: 150, color: 'red' },
  ];

  const recentDevices = [
    { name: 'Capteur #127', status: 'Connecté', location: 'Bureau A1' },
    { name: 'Capteur #126', status: 'Connecté', location: 'Salle serveur' },
    { name: 'Capteur #45', status: 'Déconnecté', location: 'Entrepôt' },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Statut des dispositifs</h2>
        <User className="w-5 h-5 text-gray-400" />
      </div>
      
      {/* Device Statistics */}
      <div className="space-y-3 mb-6">
        {deviceStats.map((stat, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-gray-600">{stat.label}</span>
              <span className="text-sm font-medium">{stat.count}/{stat.total}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${
                  stat.color === 'green' ? 'bg-green-500' : 'bg-red-500'
                }`}
                style={{ width: `${(stat.count / stat.total) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Devices */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Dispositifs récents</h3>
        <div className="space-y-2">
          {recentDevices.map((device, index) => (
            <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
              <div className="flex items-center space-x-2">
                <Database className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{device.name}</p>
                  <p className="text-xs text-gray-500">{device.location}</p>
                </div>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${
                device.status === 'Connecté' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {device.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
