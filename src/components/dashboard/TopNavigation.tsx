
import React, { useState } from 'react';
import { Search, Bell, User, Settings } from 'lucide-react';

interface TopNavigationProps {
  onSidebarToggle: () => void;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({ onSidebarToggle }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left section */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onSidebarToggle}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
              <div className="w-full h-0.5 bg-gray-600"></div>
              <div className="w-full h-0.5 bg-gray-600"></div>
              <div className="w-full h-0.5 bg-gray-600"></div>
            </div>
          </button>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-80"
            />
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
            >
              <Bell className="w-6 h-6 text-gray-600" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
            </button>
            
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">Notifications</h3>
                </div>
                <div className="p-2">
                  <div className="p-3 hover:bg-gray-50 rounded">
                    <p className="text-sm font-medium text-gray-900">Alerte de consommation</p>
                    <p className="text-xs text-gray-500">Seuil dépassé - Secteur A</p>
                  </div>
                  <div className="p-3 hover:bg-gray-50 rounded">
                    <p className="text-sm font-medium text-gray-900">Nouveau dispositif</p>
                    <p className="text-xs text-gray-500">Capteur #127 connecté</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900">Jean Dupont</p>
                <p className="text-xs text-gray-500">Administrateur</p>
              </div>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="p-2">
                  <a href="#" className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded">
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">Profil</span>
                  </a>
                  <a href="#" className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded">
                    <Settings className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">Paramètres</span>
                  </a>
                  <hr className="my-2" />
                  <a href="#" className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded text-red-600">
                    <span className="text-sm">Déconnexion</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
