import { NextRequest, NextResponse } from 'next/server';
import { AIVideoService } from '@/lib/ai/video-service';

export async function POST(request: NextRequest) {
  try {
    const { topic, duration } = await request.json();

    if (!topic) {
      return NextResponse.json(
        { error: 'Topic is required' },
        { status: 400 }
      );
    }

    const script = await AIVideoService.generateScript(topic, duration || 60);

    return NextResponse.json({
      success: true,
      data: { script }
    });
  } catch (error) {
    console.error('Script generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate script' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'AI Script Generation API',
    endpoints: {
      POST: 'Generate video script',
      body: {
        topic: 'string (required)',
        duration: 'number (optional, default: 60)'
      }
    }
  });
}
