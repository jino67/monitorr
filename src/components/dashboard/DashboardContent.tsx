
import React from 'react';
import { KPICards } from './KPICards';
import { ConsumptionChart } from './ConsumptionChart';
import { AlertPanel } from './AlertPanel';
import { RecentAlerts } from './RecentAlerts';
import { DeviceStatus } from './DeviceStatus';
import { ConsumptionSummary } from './ConsumptionSummary';
import { FileText } from 'lucide-react';

export const DashboardContent: React.FC = () => {
  return (
    <main className="flex-1 p-6 overflow-auto">
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
            <p className="text-gray-600">Vue d'ensemble de la consommation électrique</p>
          </div>
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <FileText className="w-5 h-5" />
            <span>Générer rapport</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <KPICards />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Consumption Chart - Takes 2 columns */}
        <div className="lg:col-span-2">
          <ConsumptionChart />
        </div>
        
        {/* Alert Panel */}
        <div>
          <AlertPanel />
        </div>
      </div>

      {/* Bottom Widgets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <ConsumptionSummary />
        <RecentAlerts />
        <DeviceStatus />
      </div>
    </main>
  );
};
