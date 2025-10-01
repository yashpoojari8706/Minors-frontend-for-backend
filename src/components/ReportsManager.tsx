'use client';

import { useState } from 'react';
import { AlertTriangle, Wrench, FileText, BarChart3, User, Building, MapPin, Clock, Paperclip, Download, TrendingUp, Eye, X } from 'lucide-react';

interface Report {
  id: string;
  title: string;
  type: 'hazard' | 'incident' | 'maintenance' | 'compliance';
  description: string;
  reportedBy: string;
  department: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'under_review' | 'resolved' | 'closed';
  createdAt: string;
  location: string;
  attachments?: number;
}

export default function ReportsManager() {
  const [reports, setReports] = useState<Report[]>([
    {
      id: '1',
      title: 'Loose rocks in Tunnel B-3',
      type: 'hazard',
      description: 'Noticed several loose rocks near the entrance of Tunnel B-3 that could pose a safety risk to workers.',
      reportedBy: 'John Doe',
      department: 'Mining Operations',
      priority: 'high',
      status: 'pending',
      createdAt: '2024-01-20T10:30:00Z',
      location: 'Tunnel B-3, Level 2',
      attachments: 3,
    },
    {
      id: '2',
      title: 'Equipment malfunction - Drill #7',
      type: 'maintenance',
      description: 'Drill #7 is making unusual noises and vibrating excessively during operation.',
      reportedBy: 'Sarah Wilson',
      department: 'Equipment Operations',
      priority: 'medium',
      status: 'under_review',
      createdAt: '2024-01-19T14:15:00Z',
      location: 'Main Shaft, Level 1',
      attachments: 2,
    },
    {
      id: '3',
      title: 'Minor injury - Cut on hand',
      type: 'incident',
      description: 'Worker sustained a minor cut on left hand while handling equipment. First aid was administered.',
      reportedBy: 'Mike Johnson',
      department: 'Safety Team',
      priority: 'medium',
      status: 'resolved',
      createdAt: '2024-01-18T09:45:00Z',
      location: 'Workshop Area',
      attachments: 1,
    },
    {
      id: '4',
      title: 'Air quality monitoring results',
      type: 'compliance',
      description: 'Monthly air quality assessment shows levels within acceptable ranges.',
      reportedBy: 'Environmental Team',
      department: 'Environmental',
      priority: 'low',
      status: 'closed',
      createdAt: '2024-01-15T16:20:00Z',
      location: 'All Areas',
      attachments: 5,
    },
  ]);

  const [filter, setFilter] = useState('all');
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  const filteredReports = reports.filter((report) => {
    if (filter === 'all') return true;
    return report.status === filter;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'hazard':
        return 'bg-red-100 text-red-800';
      case 'incident':
        return 'bg-orange-100 text-orange-800';
      case 'maintenance':
        return 'bg-blue-100 text-blue-800';
      case 'compliance':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-500 text-white';
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'under_review':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'hazard':
        return AlertTriangle;
      case 'incident':
        return AlertTriangle;
      case 'maintenance':
        return Wrench;
      case 'compliance':
        return BarChart3;
      default:
        return FileText;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const updateReportStatus = (reportId: string, newStatus: string) => {
    setReports(reports.map(report => 
      report.id === reportId 
        ? { ...report, status: newStatus as Report['status'] }
        : report
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Reports Management</h2>
          <p className="text-gray-600 mt-1">Monitor and manage all safety reports and incidents</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">
            Export Reports
          </button>
          <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium">
            Generate Summary
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Reports', value: reports.length, color: 'text-blue-600' },
          { label: 'Pending', value: reports.filter(r => r.status === 'pending').length, color: 'text-yellow-600' },
          { label: 'Under Review', value: reports.filter(r => r.status === 'under_review').length, color: 'text-blue-600' },
          { label: 'Resolved', value: reports.filter(r => r.status === 'resolved').length, color: 'text-green-600' },
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className={`text-sm font-medium ${stat.color}`}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">Filter by status:</span>
          {['all', 'pending', 'under_review', 'resolved', 'closed'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filter === status
                  ? 'bg-orange-100 text-orange-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {status === 'all' ? 'All' : status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </button>
          ))}
        </div>
      </div>

      {/* Reports List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="divide-y divide-gray-200">
          {filteredReports.map((report) => (
            <div key={report.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    {(() => {
                      const IconComponent = getTypeIcon(report.type);
                      return <IconComponent size={24} className="text-gray-600" />;
                    })()}
                    <h3 className="text-lg font-semibold text-gray-900">{report.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(report.type)}`}>
                      {report.type}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(report.priority)}`}>
                      {report.priority}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-3 line-clamp-2">{report.description}</p>
                  
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <User size={14} />
                      <span>{report.reportedBy}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Building size={14} />
                      <span>{report.department}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin size={14} />
                      <span>{report.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock size={14} />
                      <span>{formatDate(report.createdAt)}</span>
                    </div>
                    {report.attachments && (
                      <div className="flex items-center space-x-1">
                        <Paperclip size={14} />
                        <span>{report.attachments} files</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(report.status)}`}>
                    {report.status.replace('_', ' ')}
                  </span>
                  
                  <div className="flex items-center space-x-1">
                    {report.status === 'pending' && (
                      <>
                        <button
                          onClick={() => updateReportStatus(report.id, 'under_review')}
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-colors"
                        >
                          Review
                        </button>
                        <button
                          onClick={() => updateReportStatus(report.id, 'resolved')}
                          className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition-colors"
                        >
                          Resolve
                        </button>
                      </>
                    )}
                    
                    {report.status === 'under_review' && (
                      <button
                        onClick={() => updateReportStatus(report.id, 'resolved')}
                        className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition-colors"
                      >
                        Resolve
                      </button>
                    )}
                    
                    {report.status === 'resolved' && (
                      <button
                        onClick={() => updateReportStatus(report.id, 'closed')}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200 transition-colors"
                      >
                        Close
                      </button>
                    )}
                    
                    <button
                      onClick={() => setSelectedReport(report)}
                      className="px-3 py-1 bg-orange-100 text-orange-700 rounded text-sm hover:bg-orange-200 transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {filteredReports.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📋</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No reports found</h3>
          <p className="text-gray-600">
            {filter === 'all' 
              ? "No reports have been submitted yet." 
              : `No ${filter.replace('_', ' ')} reports available.`}
          </p>
        </div>
      )}

      {/* Report Details Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">{selectedReport.title}</h3>
              <button
                onClick={() => setSelectedReport(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(selectedReport.type)}`}>
                  {selectedReport.type}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(selectedReport.priority)}`}>
                  {selectedReport.priority} priority
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedReport.status)}`}>
                  {selectedReport.status.replace('_', ' ')}
                </span>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                <p className="text-gray-600">{selectedReport.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Reported By</h4>
                  <p className="text-gray-600">{selectedReport.reportedBy}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Department</h4>
                  <p className="text-gray-600">{selectedReport.department}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Location</h4>
                  <p className="text-gray-600">{selectedReport.location}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Date Reported</h4>
                  <p className="text-gray-600">{formatDate(selectedReport.createdAt)}</p>
                </div>
              </div>
              
              {selectedReport.attachments && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Attachments ({selectedReport.attachments})</h4>
                  <div className="text-sm text-gray-500">Attachment viewer would be implemented here</div>
                </div>
              )}
            </div>
            
            <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
              <button
                onClick={() => setSelectedReport(null)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                Take Action
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
