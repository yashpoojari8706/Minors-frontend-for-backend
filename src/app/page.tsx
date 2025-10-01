'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import DashboardStats from '@/components/DashboardStats';
import ChecklistManager from '@/components/ChecklistManager';
import ReportsManager from '@/components/ReportsManager';
import UserManager from '@/components/UserManager';
import VideoManager from '@/components/VideoManager';

export default function ModeratorDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardStats />;
      case 'checklists':
        return <ChecklistManager />;
      case 'reports':
        return <ReportsManager />;
      case 'users':
        return <UserManager />;
      case 'videos':
        return <VideoManager />;
      default:
        return <DashboardStats />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {/* Main Content */}
        <div className="flex-1 ml-64">
          <Header />
          <main className="p-6">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
}
