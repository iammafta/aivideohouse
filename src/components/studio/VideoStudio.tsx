'use client';

import { useState } from 'react';
import { PlayIcon, PauseIcon, StopIcon, ArrowUpTrayIcon, SparklesIcon } from '@heroicons/react/24/solid';
import { VideoProject } from '@/types';

interface LocalVideoProject {
  id: string;
  name: string;
  duration: number;
  status: 'draft' | 'processing' | 'completed';
  thumbnail: string;
}

export default function VideoStudio() {
  const [activeProject, setActiveProject] = useState<VideoProject | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [projects, setProjects] = useState<VideoProject[]>([
    {
      id: '1',
      name: 'AI Marketing Video',
      duration: 120,
      status: 'completed',
      thumbnail: '/api/placeholder/300/200',
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 'user1'
    },
    {
      id: '2',
      name: 'Product Demo',
      duration: 90,
      status: 'processing',
      thumbnail: '/api/placeholder/300/200',
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 'user1'
    }
  ]);

  const [isGenerating, setIsGenerating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadUrl, setUploadUrl] = useState('');

  const videoGenerationFeatures = [
    { name: 'AI Video Generation', icon: '🎬', description: 'Generate videos from text prompts', provider: 'runway' },
    { name: 'Pika Labs', icon: '⚡', description: 'Fast video generation', provider: 'pika' },
    { name: 'Stable Video', icon: '🎥', description: 'High-quality video diffusion', provider: 'stable-video' },
    { name: 'Luma Dream Machine', icon: '🌟', description: 'Creative video generation', provider: 'luma' },
    { name: 'Custom API', icon: '🔧', description: 'Your own video generation API', provider: 'custom' },
    { name: 'Upload from URL', icon: '�', description: 'Import video from URL', provider: 'upload' }
  ];

  const handleVideoGeneration = async (provider: string, prompt?: string) => {
    setIsGenerating(true);
    try {
      if (provider === 'upload') {
        if (!uploadUrl) {
          alert('Please enter a video URL');
          return;
        }
        
        const response = await fetch('/api/video/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            uploadSource: {
              type: 'url',
              source: uploadUrl,
              filename: `imported-${Date.now()}.mp4`
            }
          })
        });

        const data = await response.json();
        if (data.success) {
          // Create new project with uploaded video
          const newProject: VideoProject = {
            id: data.data.id,
            name: 'Imported Video',
            duration: 60,
            status: 'processing',
            thumbnail: '/api/placeholder/300/200',
            videoUrl: data.data.videoUrl,
            createdAt: new Date(),
            updatedAt: new Date(),
            userId: 'user1'
          };
          setProjects(prev => [newProject, ...prev]);
          setActiveProject(newProject);
        }
      } else {
        const videoPrompt = prompt || 'A beautiful cinematic video showcasing creativity';
        const response = await fetch('/api/video/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: videoPrompt,
            config: {
              provider,
              maxDuration: 10,
              resolution: '1080p',
              style: 'cinematic'
            },
            webhookUrl: `${window.location.origin}/api/video/webhook/${provider}`
          })
        });

        const data = await response.json();
        if (data.success) {
          // Create new project with generating video
          const newProject: VideoProject = {
            id: data.data.id,
            name: `AI Generated Video (${provider})`,
            duration: 10,
            status: 'processing',
            thumbnail: '/api/placeholder/300/200',
            createdAt: new Date(),
            updatedAt: new Date(),
            userId: 'user1'
          };
          setProjects(prev => [newProject, ...prev]);
          setActiveProject(newProject);
        }
      }
    } catch (error) {
      console.error('Video generation/upload error:', error);
      alert('Failed to generate/upload video');
    } finally {
      setIsGenerating(false);
      setUploadUrl('');
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Video Studio</h2>
        <div className="flex space-x-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <ArrowUpTrayIcon className="h-5 w-5" />
            <span>Upload Media</span>
          </button>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <SparklesIcon className="h-5 w-5" />
            <span>AI Create</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Video Preview */}
        <div className="space-y-4">
          <div className="bg-black rounded-lg aspect-video flex items-center justify-center relative overflow-hidden">
            {activeProject ? (
              <div className="w-full h-full bg-gradient-to-br from-purple-900 to-blue-900 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-xl font-semibold mb-2">{activeProject.name}</h3>
                  <p className="text-white/70">Duration: {activeProject.duration}s</p>
                </div>
              </div>
            ) : (
              <div className="text-center text-white/50">
                <div className="text-6xl mb-4">🎬</div>
                <p>Select a project or create a new one</p>
              </div>
            )}
          </div>

          {/* Video Controls */}
          {activeProject && (
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="bg-white text-black p-2 rounded-full hover:bg-gray-200 transition-colors"
                >
                  {isPlaying ? (
                    <PauseIcon className="h-6 w-6" />
                  ) : (
                    <PlayIcon className="h-6 w-6" />
                  )}
                </button>
                <button className="bg-gray-600 text-white p-2 rounded-full hover:bg-gray-500 transition-colors">
                  <StopIcon className="h-6 w-6" />
                </button>
              </div>
              
              {/* Timeline */}
              <div className="w-full bg-gray-600 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full w-1/3"></div>
              </div>
              <div className="flex justify-between text-white/70 text-sm mt-1">
                <span>0:40</span>
                <span>2:00</span>
              </div>
            </div>
          )}
        </div>

        {/* Project List & AI Features */}
        <div className="space-y-6">
          {/* Video Generation & AI Features */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Video Generation</h3>
            
            {/* URL Upload Section */}
            <div className="mb-4 p-4 bg-white/5 rounded-lg border border-white/10">
              <h4 className="text-white font-medium mb-2">Upload from URL</h4>
              <div className="flex space-x-2">
                <input
                  type="url"
                  value={uploadUrl}
                  onChange={(e) => setUploadUrl(e.target.value)}
                  placeholder="https://example.com/video.mp4"
                  className="flex-1 px-3 py-2 bg-gray-800 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                />
                <button
                  onClick={() => handleVideoGeneration('upload')}
                  disabled={isGenerating || !uploadUrl}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-4 py-2 rounded transition-colors"
                >
                  {isGenerating ? 'Uploading...' : 'Upload'}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {videoGenerationFeatures.filter(f => f.provider !== 'upload').map((feature, index) => (
                <button
                  key={index}
                  onClick={() => handleVideoGeneration(feature.provider, 'A cinematic video showcasing AI creativity')}
                  disabled={isGenerating}
                  className="bg-white/5 hover:bg-white/10 disabled:bg-white/5 disabled:opacity-50 border border-white/10 rounded-lg p-3 text-left transition-colors group"
                >
                  <div className="text-2xl mb-2">{feature.icon}</div>
                  <h4 className="text-white font-medium text-sm mb-1">{feature.name}</h4>
                  <p className="text-white/60 text-xs">{feature.description}</p>
                  {isGenerating && (
                    <div className="mt-2 text-blue-400 text-xs">Generating...</div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Recent Projects</h3>
            <div className="space-y-3">
              {projects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => setActiveProject(project)}
                  className={`bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg p-4 cursor-pointer transition-colors ${
                    activeProject?.id === project.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-12 bg-gray-700 rounded flex items-center justify-center">
                      <span className="text-2xl">🎥</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-medium">{project.name}</h4>
                      <p className="text-white/60 text-sm">{project.duration}s</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        project.status === 'completed' ? 'bg-green-600 text-white' :
                        project.status === 'processing' ? 'bg-yellow-600 text-white' :
                        'bg-gray-600 text-white'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
