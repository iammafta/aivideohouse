import { NextRequest, NextResponse } from 'next/server';
import { VideoGenerationService } from '@/lib/ai/video-generation-service';
import { VideoUploadSource } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const { uploadSource } = await request.json();

    if (!uploadSource || !uploadSource.type || !uploadSource.source) {
      return NextResponse.json(
        { error: 'Upload source with type and source are required' },
        { status: 400 }
      );
    }

    // Validate upload type
    const validTypes = ['url', 'cloud', 'file'];
    if (!validTypes.includes(uploadSource.type)) {
      return NextResponse.json(
        { error: `Invalid upload type. Must be one of: ${validTypes.join(', ')}` },
        { status: 400 }
      );
    }

    const job = await VideoGenerationService.uploadVideo(uploadSource as VideoUploadSource);

    return NextResponse.json({
      success: true,
      data: job
    });
  } catch (error) {
    console.error('Video upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload video' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Video Upload API',
    supportedTypes: ['url', 'cloud', 'file'],
    examples: {
      url: {
        type: 'url',
        source: 'https://example.com/video.mp4',
        filename: 'my-video.mp4'
      },
      cloud: {
        type: 'cloud',
        source: 's3://bucket/path/video.mp4',
        filename: 'cloud-video.mp4'
      },
      file: {
        type: 'file',
        source: 'local-file-reference',
        filename: 'uploaded-video.mp4',
        size: 1024000
      }
    }
  });
}
