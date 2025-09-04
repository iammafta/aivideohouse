import { NextRequest, NextResponse } from 'next/server';
import { MonetizationService } from '@/lib/monetization/platform-apis';

export async function POST(request: NextRequest) {
  try {
    const { platforms } = await request.json();

    if (!platforms || !Array.isArray(platforms)) {
      return NextResponse.json(
        { error: 'Platforms array is required' },
        { status: 400 }
      );
    }

    const revenueData = await MonetizationService.aggregateRevenue(platforms);
    const totalRevenue = revenueData.reduce((sum, platform) => sum + platform.revenue, 0);
    const suggestions = MonetizationService.getOptimizationSuggestions(revenueData);

    return NextResponse.json({
      success: true,
      data: {
        platforms: revenueData,
        totalRevenue,
        suggestions,
        lastUpdated: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Revenue aggregation error:', error);
    return NextResponse.json(
      { error: 'Failed to aggregate revenue data' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Return mock data for demo purposes
  const mockData = {
    platforms: [
      {
        platform: 'youtube',
        revenue: 2450.50,
        stats: { subscribers: 15420, videos: 47 },
        lastUpdated: new Date().toISOString()
      },
      {
        platform: 'tiktok',
        revenue: 890.25,
        stats: { followers: 8750, videos: 23 },
        lastUpdated: new Date().toISOString()
      },
      {
        platform: 'patreon',
        revenue: 1200.00,
        stats: { patrons: 156, posts: 12 },
        lastUpdated: new Date().toISOString()
      }
    ],
    totalRevenue: 4540.75,
    suggestions: [
      {
        platform: 'instagram',
        type: 'not_connected',
        message: 'Connect Instagram to increase revenue potential',
        priority: 'medium'
      }
    ],
    lastUpdated: new Date().toISOString()
  };

  return NextResponse.json({
    success: true,
    data: mockData
  });
}
