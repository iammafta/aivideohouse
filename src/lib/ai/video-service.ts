import OpenAI from 'openai';

// Initialize OpenAI client (API key should be in environment variables)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export class AIVideoService {
  /**
   * Generate video script using AI
   */
  static async generateScript(topic: string, duration: number = 60): Promise<string> {
    try {
      const prompt = `Create a compelling video script for a ${duration}-second video about "${topic}". 
      Include:
      - Hook in the first 5 seconds
      - Clear structure with introduction, main points, and conclusion
      - Engaging language suitable for social media
      - Call-to-action at the end
      
      Format as natural speech, not bullet points.`;

      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are a professional video script writer specializing in engaging, monetizable content for social media platforms."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 800,
        temperature: 0.7,
      });

      return completion.choices[0]?.message?.content || '';
    } catch (error) {
      console.error('Error generating script:', error);
      throw new Error('Failed to generate script');
    }
  }

  /**
   * Generate video thumbnail suggestions
   */
  static async generateThumbnailPrompts(videoTitle: string): Promise<string[]> {
    try {
      const prompt = `Generate 3 compelling thumbnail concepts for a video titled "${videoTitle}". 
      Each concept should be described as a detailed prompt for image generation, including:
      - Visual composition
      - Color scheme
      - Text overlay suggestions
      - Emotional appeal
      
      Focus on high click-through rate elements.`;

      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are a thumbnail design expert who creates viral, high-CTR thumbnail concepts."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 600,
        temperature: 0.8,
      });

      const response = completion.choices[0]?.message?.content || '';
      return response.split('\n\n').filter(concept => concept.trim().length > 0);
    } catch (error) {
      console.error('Error generating thumbnail prompts:', error);
      throw new Error('Failed to generate thumbnail prompts');
    }
  }

  /**
   * Generate video captions/subtitles
   */
  static async generateCaptions(transcript: string): Promise<Array<{ start: number; end: number; text: string }>> {
    try {
      const prompt = `Convert this video transcript into properly timed captions suitable for social media. 
      Break into short, readable segments (max 5 words per caption) with estimated timing.
      
      Transcript: "${transcript}"
      
      Return as JSON array with format: [{"start": 0, "end": 3, "text": "Hey everyone!"}]`;

      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are a video captioning expert. Create engaging, readable captions with perfect timing."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 1000,
        temperature: 0.3,
      });

      const response = completion.choices[0]?.message?.content || '';
      try {
        return JSON.parse(response);
      } catch {
        // Fallback if JSON parsing fails
        return [{ start: 0, end: 10, text: transcript.substring(0, 50) + '...' }];
      }
    } catch (error) {
      console.error('Error generating captions:', error);
      throw new Error('Failed to generate captions');
    }
  }

  /**
   * Analyze video content for optimization suggestions
   */
  static async analyzeVideoContent(title: string, description: string, tags: string[]): Promise<{
    seoScore: number;
    suggestions: string[];
    recommendedTags: string[];
  }> {
    try {
      const prompt = `Analyze this video content for SEO and monetization optimization:
      
      Title: "${title}"
      Description: "${description}"
      Current Tags: ${tags.join(', ')}
      
      Provide:
      1. SEO score (0-100)
      2. 5 specific improvement suggestions
      3. 10 recommended tags for better discoverability
      
      Format as JSON: {"seoScore": 85, "suggestions": [...], "recommendedTags": [...]}`;

      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are a video SEO and monetization expert who helps creators optimize their content for maximum reach and revenue."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 800,
        temperature: 0.5,
      });

      const response = completion.choices[0]?.message?.content || '';
      try {
        return JSON.parse(response);
      } catch {
        // Fallback response
        return {
          seoScore: 75,
          suggestions: ['Optimize title for keywords', 'Add trending hashtags', 'Improve thumbnail design'],
          recommendedTags: ['viral', 'trending', 'tutorial']
        };
      }
    } catch (error) {
      console.error('Error analyzing video content:', error);
      throw new Error('Failed to analyze video content');
    }
  }

  /**
   * Generate monetization suggestions based on content
   */
  static async getMonetizationSuggestions(videoData: {
    title: string;
    category: string;
    audience: string;
    duration: number;
  }): Promise<{
    platforms: string[];
    strategies: string[];
    estimatedRevenue: Record<string, number>;
  }> {
    try {
      const prompt = `Suggest monetization strategies for this video:
      
      Title: "${videoData.title}"
      Category: "${videoData.category}"
      Target Audience: "${videoData.audience}"
      Duration: ${videoData.duration} seconds
      
      Recommend:
      1. Best platforms for this content
      2. Monetization strategies
      3. Estimated revenue potential per platform
      
      Format as JSON: {"platforms": [...], "strategies": [...], "estimatedRevenue": {"youtube": 100, "tiktok": 50}}`;

      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are a content monetization strategist who helps creators maximize revenue across platforms."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 600,
        temperature: 0.6,
      });

      const response = completion.choices[0]?.message?.content || '';
      try {
        return JSON.parse(response);
      } catch {
        // Fallback response
        return {
          platforms: ['YouTube', 'TikTok', 'Instagram'],
          strategies: ['Ad revenue', 'Sponsorships', 'Affiliate marketing'],
          estimatedRevenue: { youtube: 100, tiktok: 50, instagram: 30 }
        };
      }
    } catch (error) {
      console.error('Error getting monetization suggestions:', error);
      throw new Error('Failed to get monetization suggestions');
    }
  }
}
