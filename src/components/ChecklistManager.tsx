'use client';

import { useState } from 'react';
import { Plus, Edit, Eye, Trash2, Calendar, Users as UsersIcon, CheckSquare } from 'lucide-react';

interface ChecklistItem {
  id: string;
  text: string;
  required: boolean;
}

interface Checklist {
  id: string;
  title: string;
  description: string;
  category: string;
  items: ChecklistItem[];
  assignedTo: string[];
  status: 'active' | 'draft' | 'archived';
  createdAt: string;
  completionRate: number;
}

export default function ChecklistManager() {
  const [checklists, setChecklists] = useState<Checklist[]>([
    {
      id: '1',
      title: 'Daily Safety Inspection',
      description: 'Comprehensive safety check for all mining equipment and areas',
      category: 'Safety',
      items: [
        { id: '1', text: 'Check helmet and protective gear', required: true },
        { id: '2', text: 'Inspect mining equipment', required: true },
        { id: '3', text: 'Verify emergency exits', required: true },
        { id: '4', text: 'Test communication devices', required: true },
        { id: '5', text: 'Check ventilation systems', required: true },
      ],
      assignedTo: ['All Workers'],
      status: 'active',
      createdAt: '2024-01-15',
      completionRate: 89,
    },
    {
      id: '2',
      title: 'Equipment Maintenance Check',
      description: 'Weekly maintenance verification for heavy machinery',
      category: 'Maintenance',
      items: [
        { id: '1', text: 'Check hydraulic fluid levels', required: true },
        { id: '2', text: 'Inspect drill bits and cutting tools', required: true },
        { id: '3', text: 'Verify safety switches', required: true },
        { id: '4', text: 'Test emergency stop functions', required: true },
      ],
      assignedTo: ['Maintenance Team', 'Equipment Operators'],
      status: 'active',
      createdAt: '2024-01-10',
      completionRate: 76,
    },
    {
      id: '3',
      title: 'Environmental Compliance',
      description: 'Monthly environmental impact assessment',
      category: 'Environment',
      items: [
        { id: '1', text: 'Monitor air quality levels', required: true },
        { id: '2', text: 'Check water discharge quality', required: true },
        { id: '3', text: 'Inspect waste disposal areas', required: true },
      ],
      assignedTo: ['Environmental Team'],
      status: 'draft',
      createdAt: '2024-01-20',
      completionRate: 0,
    },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedChecklist, setSelectedChecklist] = useState<Checklist | null>(null);
  const [filter, setFilter] = useState('all');

  const filteredChecklists = checklists.filter((checklist) => {
    if (filter === 'all') return true;
    return checklist.status === filter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Safety':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'Maintenance':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Environment':
        return 'bg-green-50 text-green-700 border-green-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Checklist Management</h2>
          <p className="text-gray-600 mt-1">Create and manage safety checklists for workers</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium flex items-center space-x-2"
        >
          <Plus size={16} />
          <span>Create New Checklist</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">Filter:</span>
          {['all', 'active', 'draft', 'archived'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filter === status
                  ? 'bg-orange-100 text-orange-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Checklists Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredChecklists.map((checklist) => (
          <div
            key={checklist.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setSelectedChecklist(checklist)}
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{checklist.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{checklist.description}</p>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(checklist.status)}`}>
                    {checklist.status}
                  </span>
                  <span className={`px-2 py-1 rounded border text-xs font-medium ${getCategoryColor(checklist.category)}`}>
                    {checklist.category}
                  </span>
                </div>
              </div>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Completion Rate</span>
                  <span className="text-sm text-gray-600">{checklist.completionRate}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${checklist.completionRate}%` }}
                  ></div>
                </div>
              </div>

              {/* Items Count */}
              <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                <span>{checklist.items.length} items</span>
                <span>Created {new Date(checklist.createdAt).toLocaleDateString()}</span>
              </div>

              {/* Assigned To */}
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Assigned to:</p>
                <div className="flex flex-wrap gap-1">
                  {checklist.assignedTo.map((assignee, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                    >
                      {assignee}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2 pt-4 border-t border-gray-100">
                <button className="flex-1 px-3 py-2 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition-colors text-sm font-medium flex items-center justify-center space-x-1">
                  <Edit size={14} />
                  <span>Edit</span>
                </button>
                <button className="flex-1 px-3 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium flex items-center justify-center space-x-1">
                  <Eye size={14} />
                  <span>View Reports</span>
                </button>
                <button className="px-3 py-2 text-gray-400 hover:text-red-600 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredChecklists.length === 0 && (
        <div className="text-center py-12">
          <div className="flex justify-center mb-4">
            <CheckSquare size={64} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No checklists found</h3>
          <p className="text-gray-600 mb-4">
            {filter === 'all' 
              ? "You haven't created any checklists yet." 
              : `No ${filter} checklists available.`}
          </p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium flex items-center space-x-2 mx-auto"
          >
            <Plus size={16} />
            <span>Create Your First Checklist</span>
          </button>
        </div>
      )}

      {/* Create Modal Placeholder */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Checklist</h3>
            <p className="text-gray-600 mb-4">Checklist creation form will be implemented here.</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
