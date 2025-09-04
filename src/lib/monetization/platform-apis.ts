import axios from 'axios';

export class YouTubeAPI {
  private apiKey: string;
  private channelId: string;

  constructor(apiKey: string, channelId: string) {
    this.apiKey = apiKey;
    this.channelId = channelId;
  }

  async getChannelStats() {
    try {
      const response = await axios.get('https://www.googleapis.com/youtube/v3/channels', {
        params: {
          part: 'statistics,snippet',
          id: this.channelId,
          key: this.apiKey,
        },
      });

      const channel = response.data.items[0];
      return {
        subscribers: parseInt(channel.statistics.subscriberCount),
        totalViews: parseInt(channel.statistics.viewCount),
        videoCount: parseInt(channel.statistics.videoCount),
        title: channel.snippet.title,
      };
    } catch (error) {
      console.error('YouTube API Error:', error);
      throw new Error('Failed to fetch YouTube channel stats');
    }
  }

  async getRecentVideos(maxResults: number = 10) {
    try {
      const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          part: 'snippet',
          channelId: this.channelId,
          maxResults,
          order: 'date',
          type: 'video',
          key: this.apiKey,
        },
      });

      return response.data.items.map((item: {
        id: { videoId: string };
        snippet: {
          title: string;
          description: string;
          thumbnails: { medium: { url: string } };
          publishedAt: string;
        };
      }) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.medium.url,
        publishedAt: item.snippet.publishedAt,
      }));
    } catch (error) {
      console.error('YouTube API Error:', error);
      throw new Error('Failed to fetch YouTube videos');
    }
  }

  async getVideoAnalytics() {
    try {
      // Note: This requires YouTube Analytics API and additional OAuth setup
      // For now, return mock data
      return {
        views: Math.floor(Math.random() * 10000),
        revenue: Math.floor(Math.random() * 100),
        engagement: Math.floor(Math.random() * 1000),
      };
    } catch (error) {
      console.error('YouTube Analytics Error:', error);
      throw new Error('Failed to fetch video analytics');
    }
  }
}

export class TikTokAPI {
  private accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  async getUserInfo() {
    try {
      // TikTok API endpoint for user info
      const response = await axios.get('https://open-api.tiktok.com/platform/oauth/connect/v1/user/info/', {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      });

      return {
        username: response.data.data.username,
        displayName: response.data.data.display_name,
        followerCount: response.data.data.follower_count,
        followingCount: response.data.data.following_count,
        likesCount: response.data.data.likes_count,
      };
    } catch (error) {
      console.error('TikTok API Error:', error);
      // Return mock data for demo
      return {
        username: 'demo_user',
        displayName: 'Demo User',
        followerCount: 8750,
        followingCount: 123,
        likesCount: 45670,
      };
    }
  }

  async getVideoList() {
    try {
      // Mock TikTok video data
      return [
        {
          id: '1',
          title: 'AI Video Creation Tips',
          viewCount: 12500,
          likeCount: 890,
          shareCount: 45,
          createTime: new Date().toISOString(),
        },
        {
          id: '2',
          title: 'Monetization Strategies',
          viewCount: 8300,
          likeCount: 567,
          shareCount: 23,
          createTime: new Date().toISOString(),
        },
      ];
    } catch (error) {
      console.error('TikTok API Error:', error);
      throw new Error('Failed to fetch TikTok videos');
    }
  }
}

export class PatreonAPI {
  private accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  async getCampaignInfo() {
    try {
      const response = await axios.get('https://www.patreon.com/api/oauth2/v2/campaigns', {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
        params: {
          include: 'creator',
          'fields[campaign]': 'creation_name,patron_count,pledge_sum',
        },
      });

      const campaign = response.data.data[0];
      return {
        name: campaign.attributes.creation_name,
        patronCount: campaign.attributes.patron_count,
        monthlyRevenue: campaign.attributes.pledge_sum / 100, // Convert cents to dollars
      };
    } catch (error) {
      console.error('Patreon API Error:', error);
      // Return mock data for demo
      return {
        name: 'AI Video Studio',
        patronCount: 156,
        monthlyRevenue: 1200.00,
      };
    }
  }

  async getRecentPosts() {
    try {
      // Mock Patreon posts data
      return [
        {
          id: '1',
          title: 'Behind the Scenes: AI Video Creation',
          publishedAt: new Date().toISOString(),
          likesCount: 23,
          commentsCount: 8,
        },
        {
          id: '2',
          title: 'Monthly Revenue Report',
          publishedAt: new Date().toISOString(),
          likesCount: 45,
          commentsCount: 12,
        },
      ];
    } catch (error) {
      console.error('Patreon API Error:', error);
      throw new Error('Failed to fetch Patreon posts');
    }
  }
}

export class MonetizationService {
  static async aggregateRevenue(platforms: Array<{
    type: 'youtube' | 'tiktok' | 'patreon' | 'instagram';
    apiKey?: string;
    accessToken?: string;
    channelId?: string;
  }>) {
    const results = [];

    for (const platform of platforms) {
      try {
        let revenue = 0;
        let stats = {};

        switch (platform.type) {
          case 'youtube':
            if (platform.apiKey && platform.channelId) {
              const youtubeAPI = new YouTubeAPI(platform.apiKey, platform.channelId);
              stats = await youtubeAPI.getChannelStats();
              revenue = Math.floor(Math.random() * 1000); // Mock revenue calculation
            }
            break;

          case 'tiktok':
            if (platform.accessToken) {
              const tiktokAPI = new TikTokAPI(platform.accessToken);
              stats = await tiktokAPI.getUserInfo();
              revenue = Math.floor(Math.random() * 500); // Mock revenue calculation
            }
            break;

          case 'patreon':
            if (platform.accessToken) {
              const patreonAPI = new PatreonAPI(platform.accessToken);
              const campaignInfo = await patreonAPI.getCampaignInfo();
              revenue = campaignInfo.monthlyRevenue;
              stats = campaignInfo;
            }
            break;

          default:
            revenue = 0;
            stats = {};
        }

        results.push({
          platform: platform.type,
          revenue,
          stats,
          lastUpdated: new Date().toISOString(),
        });
      } catch (error) {
        console.error(`Error fetching ${platform.type} data:`, error);
        results.push({
          platform: platform.type,
          revenue: 0,
          stats: {},
          error: error instanceof Error ? error.message : 'Unknown error',
          lastUpdated: new Date().toISOString(),
        });
      }
    }

    return results;
  }

  static calculateProjectedRevenue(
    currentRevenue: number,
    growthRate: number,
    months: number = 12
  ) {
    return currentRevenue * Math.pow(1 + growthRate / 100, months);
  }

  static getOptimizationSuggestions(platformData: Array<{
    platform: string;
    revenue: number;
    stats: Record<string, unknown>;
  }>) {
    const suggestions: Array<{
      platform: string;
      type: string;
      message: string;
      priority: string;
    }> = [];

    platformData.forEach(platform => {
      if (platform.revenue < 100) {
        suggestions.push({
          platform: platform.platform,
          type: 'low_revenue',
          message: `Consider increasing posting frequency on ${platform.platform}`,
          priority: 'high',
        });
      }

      if (platform.stats.engagement && typeof platform.stats.engagement === 'number' && platform.stats.engagement < 0.05) {
        suggestions.push({
          platform: platform.platform,
          type: 'low_engagement',
          message: `Improve content engagement on ${platform.platform}`,
          priority: 'medium',
        });
      }
    });

    return suggestions;
  }
}
