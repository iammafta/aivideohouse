'use client';

import { useState, useEffect } from 'react';
import { MonetizationPlatform, RevenueStream, Analytics } from '@/types';

export function useMonetization() {
  const [platforms, setPlatforms] = useState<MonetizationPlatform[]>([]);
  const [revenueStreams, setRevenueStreams] = useState<RevenueStream[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize with mock data
  useEffect(() => {
    const mockPlatforms: MonetizationPlatform[] = [
      {
        id: '1',
        platform: 'YouTube',
        icon: '📺',
        revenue: 2450.50,
        growth: 12.5,
        subscribers: 15420,
        videos: 47,
        status: 'connected',
        lastSync: new Date()
      },
      {
        id: '2',
        platform: 'TikTok',
        icon: '🎵',
        revenue: 890.25,
        growth: 23.8,
        subscribers: 8750,
        videos: 23,
        status: 'connected',
        lastSync: new Date()
      },
      {
        id: '3',
        platform: 'Patreon',
        icon: '💎',
        revenue: 1200.00,
        growth: 8.2,
        subscribers: 156,
        videos: 12,
        status: 'connected',
        lastSync: new Date()
      },
      {
        id: '4',
        platform: 'Instagram',
        icon: '📸',
        revenue: 0,
        growth: 0,
        subscribers: 0,
        videos: 0,
        status: 'disconnected'
      }
    ];

    const mockRevenueStreams: RevenueStream[] = [
      {
        id: '1',
        source: 'Ad Revenue',
        amount: 1890.50,
        period: 'This Month',
        color: 'bg-blue-500',
        platformId: '1'
      },
      {
        id: '2',
        source: 'Sponsorships',
        amount: 1250.00,
        period: 'This Month',
        color: 'bg-green-500',
        platformId: '1'
      },
      {
        id: '3',
        source: 'Memberships',
        amount: 800.25,
        period: 'This Month',
        color: 'bg-purple-500',
        platformId: '3'
      },
      {
        id: '4',
        source: 'Creator Fund',
        amount: 600.00,
        period: 'This Month',
        color: 'bg-yellow-500',
        platformId: '2'
      }
    ];

    const mockAnalytics: Analytics = {
      totalRevenue: 4540.75,
      monthlyGrowth: 15.3,
      totalSubscribers: 24326,
      totalViews: 892456,
      topPerformingVideo: 'AI Video Creation Tutorial',
      revenueByPlatform: {
        'YouTube': 2450.50,
        'TikTok': 890.25,
        'Patreon': 1200.00,
        'Instagram': 0
      }
    };

    setPlatforms(mockPlatforms);
    setRevenueStreams(mockRevenueStreams);
    setAnalytics(mockAnalytics);
  }, []);

  const connectPlatform = async (platformId: string, credentials: Record<string, string>) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      setPlatforms(prev => prev.map(platform => 
        platform.id === platformId 
          ? { 
              ...platform, 
              status: 'connected',
              lastSync: new Date(),
              // Add some mock data when connecting
              revenue: Math.floor(Math.random() * 1000),
              subscribers: Math.floor(Math.random() * 10000),
              videos: Math.floor(Math.random() * 50)
            }
          : platform
      ));

      return { success: true };
    } catch (err) {
      setError('Failed to connect platform');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const disconnectPlatform = async (platformId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      setPlatforms(prev => prev.map(platform => 
        platform.id === platformId 
          ? { 
              ...platform, 
              status: 'disconnected',
              revenue: 0,
              subscribers: 0,
              videos: 0,
              lastSync: undefined
            }
          : platform
      ));

      return { success: true };
    } catch (err) {
      setError('Failed to disconnect platform');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const refreshPlatformData = async (platformId?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/monetization/revenue', {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch revenue data');
      }

      const data = await response.json();
      
      if (data.success) {
        // Update analytics with fresh data
        setAnalytics(prev => ({
          ...prev!,
          totalRevenue: data.data.totalRevenue,
          lastUpdated: data.data.lastUpdated
        }));
      }

      return data.data;
    } catch (err) {
      setError('Failed to refresh platform data');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const calculateProjectedRevenue = (months: number = 12) => {
    if (!analytics) return 0;

    const currentGrowthRate = analytics.monthlyGrowth / 100;
    return analytics.totalRevenue * Math.pow(1 + currentGrowthRate, months);
  };

  const getTopPerformingPlatform = () => {
    return platforms.reduce((top, current) => 
      current.revenue > top.revenue ? current : top
    );
  };

  const getTotalSubscribers = () => {
    return platforms.reduce((total, platform) => total + platform.subscribers, 0);
  };

  const getRevenueGrowth = () => {
    return analytics?.monthlyGrowth || 0;
  };

  return {
    platforms,
    revenueStreams,
    analytics,
    isLoading,
    error,
    connectPlatform,
    disconnectPlatform,
    refreshPlatformData,
    calculateProjectedRevenue,
    getTopPerformingPlatform,
    getTotalSubscribers,
    getRevenueGrowth
  };
}
