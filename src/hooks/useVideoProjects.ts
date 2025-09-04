'use client';

import { useState, useEffect } from 'react';
import { VideoProject, VideoGenerationJob, VideoGenerationConfig, VideoUploadSource } from '@/types';

export function useVideoProjects() {
  const [projects, setProjects] = useState<VideoProject[]>([]);
  const [activeProject, setActiveProject] = useState<VideoProject | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mock data for demo
  useEffect(() => {
    const mockProjects: VideoProject[] = [
      {
        id: '1',
        name: 'AI Marketing Video',
        description: 'Showcase AI-powered video creation tools',
        duration: 120,
        status: 'completed',
        thumbnail: '/api/placeholder/300/200',
        videoUrl: '/api/placeholder/video/1',
        createdAt: new Date('2025-01-01'),
        updatedAt: new Date('2025-01-02'),
        userId: 'user1'
      },
      {
        id: '2',
        name: 'Product Demo',
        description: 'Demonstrate key features and benefits',
        duration: 90,
        status: 'processing',
        thumbnail: '/api/placeholder/300/200',
        createdAt: new Date('2025-01-03'),
        updatedAt: new Date('2025-01-03'),
        userId: 'user1'
      },
      {
        id: '3',
        name: 'Tutorial Series',
        description: 'Step-by-step guide for beginners',
        duration: 180,
        status: 'draft',
        thumbnail: '/api/placeholder/300/200',
        createdAt: new Date('2025-01-04'),
        updatedAt: new Date('2025-01-04'),
        userId: 'user1'
      }
    ];
    
    setProjects(mockProjects);
  }, []);

  const createProject = async (projectData: Partial<VideoProject>) => {
    setIsLoading(true);
    setError(null);

    try {
      const newProject: VideoProject = {
        id: Date.now().toString(),
        name: projectData.name || 'Untitled Project',
        description: projectData.description || '',
        duration: projectData.duration || 60,
        status: 'draft',
        thumbnail: '/api/placeholder/300/200',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 'user1'
      };

      setProjects(prev => [...prev, newProject]);
      setActiveProject(newProject);
      
      return newProject;
    } catch (err) {
      setError('Failed to create project');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProject = async (projectId: string, updates: Partial<VideoProject>) => {
    setIsLoading(true);
    setError(null);

    try {
      setProjects(prev => prev.map(project => 
        project.id === projectId 
          ? { ...project, ...updates, updatedAt: new Date() }
          : project
      ));

      if (activeProject?.id === projectId) {
        setActiveProject(prev => prev ? { ...prev, ...updates, updatedAt: new Date() } : null);
      }
    } catch (err) {
      setError('Failed to update project');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProject = async (projectId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      setProjects(prev => prev.filter(project => project.id !== projectId));
      
      if (activeProject?.id === projectId) {
        setActiveProject(null);
      }
    } catch (err) {
      setError('Failed to delete project');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const generateScript = async (topic: string, duration?: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/ai/generate-script', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic, duration }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate script');
      }

      const data = await response.json();
      return data.data.script;
    } catch (err) {
      setError('Failed to generate script');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    projects,
    activeProject,
    setActiveProject,
    isLoading,
    error,
    createProject,
    updateProject,
    deleteProject,
    generateScript
  };
}

export function useVideoGeneration() {
  const [jobs, setJobs] = useState<VideoGenerationJob[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const generateVideo = async (
    prompt: string,
    config: VideoGenerationConfig,
    webhookUrl?: string
  ) => {
    setIsProcessing(true);
    
    try {
      const response = await fetch('/api/video/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, config, webhookUrl })
      });

      if (!response.ok) throw new Error('Failed to start video generation');

      const data = await response.json();
      const newJob = data.data as VideoGenerationJob;
      
      setJobs(prev => [...prev, newJob]);
      
      // Simulate progress updates
      setTimeout(() => {
        setJobs(prev => prev.map(job => 
          job.id === newJob.id ? { ...job, progress: 50 } : job
        ));
      }, 2000);

      setTimeout(() => {
        setJobs(prev => prev.map(job => 
          job.id === newJob.id 
            ? { 
                ...job, 
                status: 'completed', 
                progress: 100,
                videoUrl: `/generated/${newJob.id}.mp4`,
                completedAt: new Date()
              }
            : job
        ));
        setIsProcessing(false);
      }, 10000);

      return newJob;
    } catch (error) {
      setIsProcessing(false);
      throw error;
    }
  };

  const uploadVideo = async (uploadSource: VideoUploadSource) => {
    setIsProcessing(true);
    
    try {
      const response = await fetch('/api/video/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uploadSource })
      });

      if (!response.ok) throw new Error('Failed to upload video');

      const data = await response.json();
      const newJob = data.data as VideoGenerationJob;
      
      setJobs(prev => [...prev, newJob]);
      setIsProcessing(false);
      
      return newJob;
    } catch (error) {
      setIsProcessing(false);
      throw error;
    }
  };

  const startProcessingJob = async (type: VideoGenerationJob['type'], input: Record<string, unknown>) => {
    const newJob: VideoGenerationJob = {
      id: Date.now().toString(),
      type,
      status: 'pending',
      input,
      progress: 0,
      createdAt: new Date()
    };

    setJobs(prev => [...prev, newJob]);
    setIsProcessing(true);

    // Simulate processing
    setTimeout(() => {
      setJobs(prev => prev.map(job => 
        job.id === newJob.id 
          ? { ...job, status: 'processing', progress: 50 }
          : job
      ));
    }, 1000);

    setTimeout(() => {
      setJobs(prev => prev.map(job => 
        job.id === newJob.id 
          ? { 
              ...job, 
              status: 'completed', 
              progress: 100,
              output: { result: 'Processing completed successfully' },
              completedAt: new Date()
            }
          : job
      ));
      setIsProcessing(false);
    }, 5000);

    return newJob;
  };

  const getJobStatus = (jobId: string) => {
    return jobs.find(job => job.id === jobId);
  };

  return {
    jobs,
    isProcessing,
    generateVideo,
    uploadVideo,
    startProcessingJob,
    getJobStatus
  };
}
