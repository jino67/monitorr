
import React from 'react';
import { BarChart, Clock, Database, FileText, Settings, Users, Bell, User } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const menuItems = [
  { icon: BarChart, label: 'Tableau de bord', active: true },
  { icon: Clock, label: 'Données en temps réel' },
  { icon: Database, label: 'Historique' },
  { icon: FileText, label: 'Rapports' },
  { icon: Bell, label: 'Alertes' },
  { icon: Settings, label: 'Paramètres' },
  { icon: Users, label: 'Utilisateurs' },
  { icon: User, label: 'Dispositifs' },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  return (
    <div className={`fixed left-0 top-0 h-full bg-slate-900 text-white transition-all duration-300 z-30 ${
      isOpen ? 'w-64' : 'w-16'
    }`}>
      {/* Logo/Brand */}
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <BarChart className="w-5 h-5" />
          </div>
          {isOpen && (
            <div>
              <h1 className="font-bold text-lg">EnergieMon</h1>
              <p className="text-xs text-slate-400">Gestion Électrique</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="mt-6">
        <ul className="space-y-2 px-3">
          {menuItems.map((item, index) => (
            <li key={index}>
              <a
                href="#"
                className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors hover:bg-slate-800 ${
                  item.active ? 'bg-blue-600 hover:bg-blue-700' : ''
                }`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {isOpen && <span className="font-medium">{item.label}</span>}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom section */}
      {isOpen && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-slate-800 rounded-lg p-3">
            <p className="text-xs text-slate-400 mb-1">Version</p>
            <p className="text-sm font-medium">Laravel 10.x</p>
          </div>
        </div>
      )}
    </div>
  );
};
