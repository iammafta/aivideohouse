'use client';

import { useState } from 'react';

interface PlatformStats {
  platform: string;
  icon: string;
  revenue: number;
  growth: number;
  subscribers: number;
  videos: number;
  status: 'connected' | 'disconnected';
}

interface RevenueStream {
  source: string;
  amount: number;
  period: string;
  color: string;
}

export default function MonetizationDashboard() {
  const [platforms] = useState<PlatformStats[]>([
    {
      platform: 'YouTube',
      icon: '📺',
      revenue: 2450.50,
      growth: 12.5,
      subscribers: 15420,
      videos: 47,
      status: 'connected'
    },
    {
      platform: 'TikTok',
      icon: '🎵',
      revenue: 890.25,
      growth: 23.8,
      subscribers: 8750,
      videos: 23,
      status: 'connected'
    },
    {
      platform: 'Patreon',
      icon: '💎',
      revenue: 1200.00,
      growth: 8.2,
      subscribers: 156,
      videos: 12,
      status: 'connected'
    },
    {
      platform: 'Instagram',
      icon: '📸',
      revenue: 0,
      growth: 0,
      subscribers: 0,
      videos: 0,
      status: 'disconnected'
    }
  ]);

  const revenueStreams: RevenueStream[] = [
    { source: 'Ad Revenue', amount: 1890.50, period: 'This Month', color: 'bg-blue-500' },
    { source: 'Sponsorships', amount: 1250.00, period: 'This Month', color: 'bg-green-500' },
    { source: 'Memberships', amount: 800.25, period: 'This Month', color: 'bg-purple-500' },
    { source: 'Merchandise', amount: 600.00, period: 'This Month', color: 'bg-yellow-500' }
  ];

  const totalRevenue = revenueStreams.reduce((sum, stream) => sum + stream.amount, 0);

  return (
    <div className="space-y-6">
      {/* Revenue Overview */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
        <h2 className="text-xl font-bold text-white mb-4">Revenue Overview</h2>
        
        <div className="text-center mb-6">
          <div className="text-3xl font-bold text-white mb-2">
            ${totalRevenue.toLocaleString()}
          </div>
          <p className="text-white/70">Total This Month</p>
          <div className="flex items-center justify-center mt-2">
            <span className="text-green-400 text-sm">↗ +15.3%</span>
            <span className="text-white/60 text-sm ml-2">vs last month</span>
          </div>
        </div>

        {/* Revenue Breakdown */}
        <div className="space-y-3">
          {revenueStreams.map((stream, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${stream.color}`}></div>
                <span className="text-white/80 text-sm">{stream.source}</span>
              </div>
              <span className="text-white font-medium">${stream.amount}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Platform Stats */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Platforms</h2>
          <button className="text-blue-400 hover:text-blue-300 text-sm transition-colors">
            Connect New
          </button>
        </div>

        <div className="space-y-4">
          {platforms.map((platform, index) => (
            <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{platform.icon}</span>
                  <div>
                    <h3 className="text-white font-medium">{platform.platform}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      platform.status === 'connected' 
                        ? 'bg-green-600 text-white' 
                        : 'bg-gray-600 text-white'
                    }`}>
                      {platform.status}
                    </span>
                  </div>
                </div>
                {platform.status === 'connected' && (
                  <div className="text-right">
                    <div className="text-white font-semibold">${platform.revenue}</div>
                    <div className="text-green-400 text-sm">+{platform.growth}%</div>
                  </div>
                )}
              </div>

              {platform.status === 'connected' && (
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-white/60">Subscribers</span>
                    <div className="text-white font-medium">{platform.subscribers.toLocaleString()}</div>
                  </div>
                  <div>
                    <span className="text-white/60">Videos</span>
                    <div className="text-white font-medium">{platform.videos}</div>
                  </div>
                </div>
              )}

              {platform.status === 'disconnected' && (
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm transition-colors">
                  Connect {platform.platform}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
        <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
        <div className="space-y-3">
          <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg flex items-center justify-center space-x-2 transition-colors">
            <span>💰</span>
            <span>Withdraw Earnings</span>
          </button>
          <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg flex items-center justify-center space-x-2 transition-colors">
            <span>📊</span>
            <span>Analytics Report</span>
          </button>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg flex items-center justify-center space-x-2 transition-colors">
            <span>🎯</span>
            <span>Set Revenue Goals</span>
          </button>
        </div>
      </div>
    </div>
  );
}
