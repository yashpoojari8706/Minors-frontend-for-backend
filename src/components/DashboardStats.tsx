'use client';

import { useState, useEffect } from 'react';
import { Users, CheckSquare, FileText, Target, Shield, Trophy, CheckCircle, Clock, AlertTriangle, User } from 'lucide-react';

export default function DashboardStats() {
  const [stats, setStats] = useState({
    totalWorkers: 156,
    activeChecklists: 23,
    pendingReports: 8,
    completedToday: 45,
    safetyScore: 94,
    incidentsFree: 127,
  });

  const [recentActivity, setRecentActivity] = useState([
    {
      id: 1,
      type: 'checklist',
      message: 'Safety checklist completed by John Doe',
      time: '2 minutes ago',
      status: 'completed',
    },
    {
      id: 2,
      type: 'report',
      message: 'Hazard report submitted by Sarah Wilson',
      time: '15 minutes ago',
      status: 'pending',
    },
    {
      id: 3,
      type: 'user',
      message: 'New worker Mike Johnson registered',
      time: '1 hour ago',
      status: 'info',
    },
    {
      id: 4,
      type: 'incident',
      message: 'Minor incident reported in Sector B',
      time: '2 hours ago',
      status: 'warning',
    },
  ]);

  const statCards = [
    {
      title: 'Total Workers',
      value: stats.totalWorkers,
      change: '+12',
      changeType: 'positive',
      icon: Users,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      title: 'Active Checklists',
      value: stats.activeChecklists,
      change: '+3',
      changeType: 'positive',
      icon: CheckSquare,
      color: 'bg-green-50 text-green-600',
    },
    {
      title: 'Pending Reports',
      value: stats.pendingReports,
      change: '-2',
      changeType: 'negative',
      icon: FileText,
      color: 'bg-orange-50 text-orange-600',
    },
    {
      title: 'Completed Today',
      value: stats.completedToday,
      change: '+8',
      changeType: 'positive',
      icon: Target,
      color: 'bg-purple-50 text-purple-600',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'warning':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'checklist':
        return CheckCircle;
      case 'report':
        return FileText;
      case 'user':
        return User;
      case 'incident':
        return AlertTriangle;
      default:
        return FileText;
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <span
                    className={`text-sm font-medium ${
                      stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">from yesterday</span>
                </div>
              </div>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
                <stat.icon size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Safety Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Safety Score */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Safety Score</h3>
            <Shield size={24} className="text-green-600" />
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="flex items-baseline space-x-2">
                <span className="text-4xl font-bold text-green-600">{stats.safetyScore}</span>
                <span className="text-lg text-gray-500">/ 100</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mt-3">
                <div
                  className="bg-green-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${stats.safetyScore}%` }}
                ></div>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-3">
            Excellent safety performance this month
          </p>
        </div>

        {/* Days Without Incident */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Days Without Incident</h3>
            <Trophy size={24} className="text-orange-600" />
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-orange-500 mb-2">{stats.incidentsFree}</div>
            <p className="text-gray-600">Consecutive safe days</p>
            <div className="mt-4 p-3 bg-orange-50 rounded-lg">
              <p className="text-sm text-orange-700 font-medium flex items-center justify-center space-x-2">
                <Trophy size={16} />
                <span>New record! Keep up the excellent work!</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
            <button className="text-sm text-orange-600 hover:text-orange-700 font-medium">
              View All
            </button>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  {(() => {
                    const IconComponent = getActivityIcon(activity.type);
                    return <IconComponent size={20} className="text-gray-600" />;
                  })()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                  <p className="text-sm text-gray-500 mt-1">{activity.time}</p>
                </div>
                <div className="flex-shrink-0">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      activity.status
                    )}`}
                  >
                    {activity.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
