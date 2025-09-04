// Video Studio Types
export interface VideoProject {
  id: string;
  name: string;
  description?: string;
  duration: number;
  status: 'draft' | 'processing' | 'completed' | 'error' | 'uploading';
  thumbnail: string;
  videoUrl?: string;
  uploadSource?: VideoUploadSource;
  generationConfig?: VideoGenerationConfig;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface AIFeature {
  id: string;
  name: string;
  icon: string;
  description: string;
  enabled: boolean;
  processing: boolean;
}

// Monetization Types
export interface MonetizationPlatform {
  id: string;
  platform: string;
  icon: string;
  revenue: number;
  growth: number;
  subscribers: number;
  videos: number;
  status: 'connected' | 'disconnected' | 'pending';
  apiKey?: string;
  lastSync?: Date;
}

export interface RevenueStream {
  id: string;
  source: string;
  amount: number;
  period: string;
  color: string;
  platformId: string;
}

export interface Analytics {
  totalRevenue: number;
  monthlyGrowth: number;
  totalSubscribers: number;
  totalViews: number;
  topPerformingVideo: string;
  revenueByPlatform: Record<string, number>;
}

// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  plan: 'free' | 'pro' | 'enterprise';
  createdAt: Date;
  lastLogin: Date;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Video Generation & Processing Types
export interface VideoGenerationJob {
  id: string;
  type: 'video-generation' | 'script-generation' | 'voice-synthesis' | 'auto-edit' | 'thumbnail-generation' | 'captions' | 'scene-detection' | 'video-upload';
  status: 'pending' | 'processing' | 'completed' | 'error';
  input: Record<string, unknown>;
  output?: Record<string, unknown>;
  progress: number;
  error?: string;
  createdAt: Date;
  completedAt?: Date;
  videoUrl?: string;
  webhookUrl?: string;
}

export interface VideoGenerationConfig {
  provider: 'runway' | 'pika' | 'stable-video' | 'luma' | 'custom';
  apiKey?: string;
  webhookUrl?: string;
  maxDuration: number;
  resolution: '720p' | '1080p' | '4k';
  style?: string;
}

export interface VideoUploadSource {
  type: 'url' | 'cloud' | 'file';
  source: string; // URL, cloud path, or file reference
  filename?: string;
  size?: number;
  duration?: number;
}
