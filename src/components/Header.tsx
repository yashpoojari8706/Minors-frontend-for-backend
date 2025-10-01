import { Bell, Plus, Download, Wifi } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Title */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mining Safety Control Center</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage all mining operations, safety protocols, and worker activities
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          {/* Quick Actions */}
          <div className="flex items-center space-x-2">
            <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium flex items-center space-x-2">
              <Plus size={16} />
              <span>New Checklist</span>
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center space-x-2">
              <Download size={16} />
              <span>Export Data</span>
            </button>
          </div>

          {/* Status Indicator */}
          <div className="flex items-center space-x-2 px-3 py-2 bg-green-50 text-green-700 rounded-lg">
            <Wifi size={16} className="text-green-600" />
            <span className="text-sm font-medium">System Online</span>
          </div>
        </div>
      </div>
    </header>
  );
}
