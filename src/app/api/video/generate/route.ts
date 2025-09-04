import { NextRequest, NextResponse } from 'next/server';
import { VideoGenerationService } from '@/lib/ai/video-generation-service';
import { VideoGenerationConfig } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const { prompt, config, webhookUrl } = await request.json();

    if (!prompt || !config) {
      return NextResponse.json(
        { error: 'Prompt and config are required' },
        { status: 400 }
      );
    }

    // Validate config
    const validProviders = ['runway', 'pika', 'stable-video', 'luma', 'custom'];
    if (!validProviders.includes(config.provider)) {
      return NextResponse.json(
        { error: `Invalid provider. Must be one of: ${validProviders.join(', ')}` },
        { status: 400 }
      );
    }

    const job = await VideoGenerationService.generateVideo(
      prompt,
      config as VideoGenerationConfig,
      webhookUrl
    );

    return NextResponse.json({
      success: true,
      data: job
    });
  } catch (error) {
    console.error('Video generation error:', error);
    return NextResponse.json(
      { error: 'Failed to start video generation' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const jobId = searchParams.get('jobId');
  const provider = searchParams.get('provider');

  if (!jobId || !provider) {
    return NextResponse.json(
      { error: 'jobId and provider are required' },
      { status: 400 }
    );
  }

  try {
    const job = await VideoGenerationService.checkJobStatus(jobId, provider);
    
    if (!job) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: job
    });
  } catch (error) {
    console.error('Status check error:', error);
    return NextResponse.json(
      { error: 'Failed to check job status' },
      { status: 500 }
    );
  }
}
