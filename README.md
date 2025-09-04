# AI Video Studio

An AI-powered video creation platform that helps content creators produce, edit, and monetize videos across multiple platforms including YouTube, TikTok, Patreon, and Instagram.

![AI Video Studio](https://img.shields.io/badge/Next.js-15.5.2-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.x-06B6D4?style=flat-square&logo=tailwindcss)
![AI Powered](https://img.shields.io/badge/AI%20Powered-OpenAI-00A67E?style=flat-square&logo=openai)

## 🚀 Features

### 🎬 AI Video Studio
- **Hookable Video Generation APIs**: Support for Runway ML, Pika Labs, Stable Video Diffusion, Luma AI
- **Video Upload & Import**: Upload videos from URLs, cloud storage, or local files
- **AI Script Generation**: Create compelling video scripts using OpenAI
- **Smart Video Editing**: AI-powered editing tools and scene detection
- **Voice Synthesis**: Convert text to natural-sounding speech
- **Auto-Generated Captions**: Automatic subtitle generation with timing
- **Thumbnail Generator**: AI-created thumbnails for maximum click-through rates
- **Project Management**: Organize and track your video projects
- **Webhook Support**: Real-time updates from video generation providers

### 💰 Monetization Dashboard
- **Multi-Platform Integration**: Connect YouTube, TikTok, Patreon, Instagram
- **Revenue Tracking**: Real-time revenue aggregation across platforms
- **Analytics & Insights**: Performance metrics and optimization suggestions
- **Growth Projections**: AI-powered revenue forecasting
- **Platform Management**: Easy connection and management of creator accounts

### 🤖 AI-Powered Features
- Script generation based on topics and duration
- SEO optimization suggestions
- Content analysis for better engagement
- Monetization strategy recommendations
- Automated video processing workflows

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 with TypeScript and Tailwind CSS
- **Backend**: Next.js API Routes
- **AI Integration**: OpenAI API for content generation
- **Database**: PostgreSQL with Prisma ORM (ready for implementation)
- **Icons**: Heroicons
- **Charts**: Recharts for analytics visualization
- **Platform APIs**: YouTube Data API, TikTok API, Patreon API

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- OpenAI API key (optional, for AI features)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd aivideohouse
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Add your API keys to `.env.local`:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   YOUTUBE_API_KEY=your_youtube_api_key_here
   DATABASE_URL=your_database_url_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
npm run start
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── ai/           # AI processing endpoints
│   │   └── monetization/ # Revenue tracking endpoints
│   └── page.tsx          # Main application page
├── components/            # React components
│   ├── studio/           # Video studio components
│   └── monetization/     # Monetization dashboard components
├── hooks/                # Custom React hooks
│   ├── useVideoProjects.ts
│   └── useMonetization.ts
├── lib/                  # Utility libraries
│   ├── ai/              # AI service implementations
│   └── monetization/    # Platform API integrations
└── types/               # TypeScript type definitions
```

## 🔧 API Endpoints

### AI Features
- `POST /api/ai/generate-script` - Generate video scripts
- `POST /api/ai/generate-thumbnails` - Create thumbnail concepts
- `POST /api/ai/analyze-content` - Content optimization analysis

### Monetization
- `GET /api/monetization/revenue` - Aggregate revenue data
- `POST /api/monetization/connect` - Connect platform accounts
- `GET /api/monetization/analytics` - Performance analytics

## 🎯 Usage Examples

### Generate a Video Script

```typescript
const script = await fetch('/api/ai/generate-script', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    topic: 'AI Video Creation',
    duration: 90
  })
});
```

### Connect Monetization Platform

```typescript
const connection = await connectPlatform('youtube', {
  apiKey: 'your-youtube-api-key',
  channelId: 'your-channel-id'
});
```

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | OpenAI API key for AI features | Optional |
| `YOUTUBE_API_KEY` | YouTube Data API key | Optional |
| `DATABASE_URL` | PostgreSQL database connection | Optional |
| `NEXTAUTH_SECRET` | NextAuth.js secret (future feature) | Optional |

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### Docker

```bash
docker build -t ai-video-studio .
docker run -p 3000:3000 ai-video-studio
```

## 🎨 Customization

### Adding New AI Features

1. Create a new service in `src/lib/ai/`
2. Add API route in `src/app/api/ai/`
3. Create React components in `src/components/studio/`
4. Update types in `src/types/index.ts`

### Integrating New Platforms

1. Add platform API in `src/lib/monetization/`
2. Update MonetizationService
3. Add UI components
4. Update type definitions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- 📧 Email: support@aivideostudio.com
- 💬 Discord: [Join our community](https://discord.gg/aivideostudio)
- 📖 Documentation: [docs.aivideostudio.com](https://docs.aivideostudio.com)

## 🗺️ Roadmap

- [ ] Video upload and processing
- [ ] Real-time collaboration
- [ ] Mobile app support
- [ ] Advanced AI video editing
- [ ] Blockchain monetization
- [ ] NFT marketplace integration

---

**AI Video Studio** - Monetize your creativity with AI-powered video creation tools.

⭐ **Star this repository if you find it helpful!**
