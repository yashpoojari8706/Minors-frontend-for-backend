'use client';

import { useState } from 'react';

interface Video {
  id: string;
  title: string;
  description: string;
  category: 'safety' | 'training' | 'equipment' | 'emergency';
  duration: string;
  thumbnail: string;
  uploadDate: string;
  views: number;
  status: 'active' | 'draft' | 'archived';
  tags: string[];
  uploadedBy: string;
}

export default function VideoManager() {
  const [videos, setVideos] = useState<Video[]>([
    {
      id: '1',
      title: 'Mining Safety Training - Equipment Handling',
      description: 'Comprehensive guide on proper handling of mining equipment including safety protocols and best practices.',
      category: 'safety',
      duration: '5:30',
      thumbnail: 'https://via.placeholder.com/300x200/FF6B35/FFFFFF?text=Safety+Training',
      uploadDate: '2024-01-15',
      views: 245,
      status: 'active',
      tags: ['safety', 'equipment', 'training'],
      uploadedBy: 'Safety Team',
    },
    {
      id: '2',
      title: 'Emergency Evacuation Procedures',
      description: 'Step-by-step guide for emergency evacuation procedures in underground mining operations.',
      category: 'emergency',
      duration: '8:15',
      thumbnail: 'https://via.placeholder.com/300x200/DC2626/FFFFFF?text=Emergency+Procedures',
      uploadDate: '2024-01-10',
      views: 189,
      status: 'active',
      tags: ['emergency', 'evacuation', 'safety'],
      uploadedBy: 'Emergency Response Team',
    },
    {
      id: '3',
      title: 'Proper Use of Protective Equipment',
      description: 'Detailed instructions on wearing and maintaining personal protective equipment.',
      category: 'training',
      duration: '6:45',
      thumbnail: 'https://via.placeholder.com/300x200/059669/FFFFFF?text=PPE+Training',
      uploadDate: '2024-01-08',
      views: 312,
      status: 'active',
      tags: ['ppe', 'safety', 'protection'],
      uploadedBy: 'Training Department',
    },
    {
      id: '4',
      title: 'Heavy Machinery Operation Guidelines',
      description: 'Operating procedures for heavy mining machinery and safety considerations.',
      category: 'equipment',
      duration: '12:20',
      thumbnail: 'https://via.placeholder.com/300x200/7C3AED/FFFFFF?text=Machinery+Guide',
      uploadDate: '2024-01-05',
      views: 156,
      status: 'draft',
      tags: ['machinery', 'operation', 'guidelines'],
      uploadedBy: 'Equipment Team',
    },
  ]);

  const [filter, setFilter] = useState('all');
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const filteredVideos = videos.filter((video) => {
    if (filter === 'all') return true;
    return video.category === filter;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'safety':
        return 'bg-red-100 text-red-800';
      case 'training':
        return 'bg-blue-100 text-blue-800';
      case 'equipment':
        return 'bg-purple-100 text-purple-800';
      case 'emergency':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const updateVideoStatus = (videoId: string, newStatus: string) => {
    setVideos(videos.map(video => 
      video.id === videoId 
        ? { ...video, status: newStatus as Video['status'] }
        : video
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Video Management</h2>
          <p className="text-gray-600 mt-1">Manage training videos and safety content</p>
        </div>
        <button
          onClick={() => setShowUploadModal(true)}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
        >
          + Upload Video
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Videos', value: videos.length, color: 'text-blue-600' },
          { label: 'Active', value: videos.filter(v => v.status === 'active').length, color: 'text-green-600' },
          { label: 'Total Views', value: videos.reduce((sum, v) => sum + v.views, 0), color: 'text-purple-600' },
          { label: 'Categories', value: new Set(videos.map(v => v.category)).size, color: 'text-orange-600' },
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
          <span className="text-sm font-medium text-gray-700">Filter by category:</span>
          {['all', 'safety', 'training', 'equipment', 'emergency'].map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filter === category
                  ? 'bg-orange-100 text-orange-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video) => (
          <div
            key={video.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow overflow-hidden"
          >
            {/* Thumbnail */}
            <div className="relative">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
                {video.duration}
              </div>
              <div className="absolute top-2 left-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(video.category)}`}>
                  {video.category}
                </span>
              </div>
              <div className="absolute top-2 right-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(video.status)}`}>
                  {video.status}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{video.title}</h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-3">{video.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-3">
                {video.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Meta Info */}
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center space-x-1">
                    <span>👁️</span>
                    <span>{video.views}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span>📅</span>
                    <span>{formatDate(video.uploadDate)}</span>
                  </span>
                </div>
              </div>

              <div className="text-xs text-gray-500 mb-4">
                Uploaded by {video.uploadedBy}
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setSelectedVideo(video)}
                  className="flex-1 px-3 py-2 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition-colors text-sm font-medium"
                >
                  View Details
                </button>
                <button className="px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium">
                  Edit
                </button>
                <div className="relative">
                  <button className="px-3 py-2 text-gray-400 hover:text-gray-600 transition-colors">
                    ⋮
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredVideos.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🎥</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No videos found</h3>
          <p className="text-gray-600 mb-4">
            {filter === 'all' 
              ? "No videos have been uploaded yet." 
              : `No ${filter} videos available.`}
          </p>
          <button
            onClick={() => setShowUploadModal(true)}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
          >
            Upload Your First Video
          </button>
        </div>
      )}

      {/* Video Details Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-4xl mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">{selectedVideo.title}</h3>
              <button
                onClick={() => setSelectedVideo(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <img
                  src={selectedVideo.thumbnail}
                  alt={selectedVideo.title}
                  className="w-full rounded-lg mb-4"
                />
                <div className="flex items-center space-x-2 mb-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(selectedVideo.category)}`}>
                    {selectedVideo.category}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedVideo.status)}`}>
                    {selectedVideo.status}
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
                    {selectedVideo.duration}
                  </span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                  <p className="text-gray-600">{selectedVideo.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Views</h4>
                    <p className="text-gray-600">{selectedVideo.views}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Upload Date</h4>
                    <p className="text-gray-600">{formatDate(selectedVideo.uploadDate)}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Uploaded By</h4>
                    <p className="text-gray-600">{selectedVideo.uploadedBy}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Duration</h4>
                    <p className="text-gray-600">{selectedVideo.duration}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedVideo.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-sm">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4">
                  <h4 className="font-medium text-gray-900 mb-2">Actions</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedVideo.status === 'draft' && (
                      <button
                        onClick={() => updateVideoStatus(selectedVideo.id, 'active')}
                        className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition-colors"
                      >
                        Publish
                      </button>
                    )}
                    {selectedVideo.status === 'active' && (
                      <button
                        onClick={() => updateVideoStatus(selectedVideo.id, 'archived')}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200 transition-colors"
                      >
                        Archive
                      </button>
                    )}
                    <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-colors">
                      Edit Details
                    </button>
                    <button className="px-3 py-1 bg-orange-100 text-orange-700 rounded text-sm hover:bg-orange-200 transition-colors">
                      View Analytics
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
              <button
                onClick={() => setSelectedVideo(null)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                Play Video
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload New Video</h3>
            <p className="text-gray-600 mb-4">Video upload form will be implemented here.</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
