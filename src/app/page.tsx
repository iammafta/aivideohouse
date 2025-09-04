import VideoStudio from '@/components/studio/VideoStudio';
import MonetizationDashboard from '@/components/monetization/MonetizationDashboard';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-white">
              AI Video Studio
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-white/80">Powered by AI</span>
              <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </div>
          <p className="text-white/70 mt-2">
            Create, edit, and monetize videos with AI-powered tools
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Video Studio - Takes up 2/3 of the space */}
          <div className="xl:col-span-2">
            <VideoStudio />
          </div>
          
          {/* Monetization Dashboard - Takes up 1/3 of the space */}
          <div className="xl:col-span-1">
            <MonetizationDashboard />
          </div>
        </div>
      </main>

      <footer className="bg-black/20 backdrop-blur-sm border-t border-white/10 mt-16">
        <div className="container mx-auto px-4 py-6 text-center text-white/60">
          <p>&copy; 2025 AI Video Studio. Monetize your creativity with AI.</p>
        </div>
      </footer>
    </div>
  );
}