import { NextRequest, NextResponse } from 'next/server';
import { VideoGenerationService } from '@/lib/ai/video-generation-service';

const videoService = new VideoGenerationService();

interface RouteParams {
  params: Promise<{ provider: string }>;
}

export async function POST(
  request: NextRequest,
  context: RouteParams
) {
  try {
    const { provider } = await context.params;
    const payload = await request.json();

    const result = await videoService.handleWebhook(provider, payload);

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Webhook processed successfully',
        jobId: result.jobId
      });
    } else {
      return NextResponse.json(
        { error: 'Failed to process webhook' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  context: RouteParams
) {
  try {
    const { provider } = await context.params;
    
    return NextResponse.json({
      message: `Webhook endpoint for ${provider}`,
      provider: provider,
      method: 'POST',
      description: 'This endpoint receives webhook notifications from video generation providers'
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to get webhook info' },
      { status: 500 }
    );
  }
}
