
import React from 'react';
import { BarChart, Clock, Database, FileText, Settings, Users, Bell, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const menuItems = [
  { icon: BarChart, label: 'Tableau de bord', path: '/', active: false },
  { icon: Clock, label: 'Données en temps réel', path: '/realtime', active: false },
  { icon: Database, label: 'Historique', path: '/history', active: false },
  { icon: FileText, label: 'Rapports', path: '/reports', active: false },
  { icon: Bell, label: 'Alertes', path: '/alerts', active: false },
  { icon: Settings, label: 'Paramètres', path: '/settings', active: false },
  { icon: Users, label: 'Utilisateurs', path: '/users', active: false },
  { icon: User, label: 'Dispositifs', path: '/devices', active: false },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const location = useLocation();

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
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors hover:bg-slate-800 ${
                    isActive ? 'bg-blue-600 hover:bg-blue-700' : ''
                  }`}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {isOpen && <span className="font-medium">{item.label}</span>}
                </Link>
              </li>
            );
          })}
          {/* Logs Menu Item */}
          <li>
            <Link
              to="/logs"
              className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors hover:bg-slate-800 ${
                location.pathname === '/logs' ? 'bg-blue-600 hover:bg-blue-700' : ''
              }`}
            >
              <FileText className="w-5 h-5 flex-shrink-0" />
              {isOpen && <span className="font-medium">Journal des logs</span>}
            </Link>
          </li>
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
