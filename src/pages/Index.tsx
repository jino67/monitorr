
import { useState } from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { TopNavigation } from '@/components/dashboard/TopNavigation';
import { DashboardContent } from '@/components/dashboard/DashboardContent';

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        {/* Top Navigation */}
        <TopNavigation onSidebarToggle={() => setSidebarOpen(!sidebarOpen)} />
        
        {/* Dashboard Content */}
        <DashboardContent />
      </div>
    </div>
  );
};

export default Index;
