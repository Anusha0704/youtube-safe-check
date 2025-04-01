
import { useState } from "react";
import YouTubeForm from "@/components/YouTubeForm";
import VideoPreview from "@/components/VideoPreview";
import SafetyResult from "@/components/SafetyResult";
import { checkYoutubeContent, ContentCheckResult } from "@/services/apiService";
import { toast } from "sonner";

const Index = () => {
  const [videoId, setVideoId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<ContentCheckResult | null>(null);

  const handleFormSubmit = async (newVideoId: string) => {
    if (isLoading) return;
    
    if (newVideoId === videoId && result) {
      toast("Already checked this video", {
        description: "Enter a different YouTube URL to check another video",
      });
      return;
    }
    
    setVideoId(newVideoId);
    setIsLoading(true);
    
    try {
      const checkResult = await checkYoutubeContent(newVideoId);
      setResult(checkResult);
    } catch (error) {
      console.error("Error checking content:", error);
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-white to-gray-50">
      <header className="w-full py-8 px-4 border-b border-gray-200">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold text-center flex items-center justify-center">
            <span className="text-youtube mr-2">YouTube</span> 
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-700 to-gray-900">Safe Check</span>
          </h1>
          <p className="text-center text-gray-500 mt-2 font-light">
            Check if YouTube content is safe for children
          </p>
        </div>
      </header>
      
      <main className="flex-1 w-full container max-w-4xl px-4 py-8 space-y-8">
        <section className="space-y-8">
          <YouTubeForm onSubmit={handleFormSubmit} isLoading={isLoading} />
          
          {isLoading && (
            <div className="flex flex-col items-center justify-center p-8">
              <div className="animate-pulse-scale">
                <div className="h-14 w-14 rounded-full border-4 border-youtube border-t-transparent animate-spin"></div>
              </div>
              <p className="mt-6 text-gray-500 font-light">Analyzing content safety...</p>
            </div>
          )}
          
          {videoId && !isLoading && (
            <div className="space-y-8">
              <VideoPreview videoId={videoId} title={result?.title} />
              
              {result && <SafetyResult result={result} />}
            </div>
          )}
        </section>
      </main>
      
      <footer className="w-full py-8 px-4 border-t border-gray-200 bg-white">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-gray-500 text-sm">YouTube Safe Check | Content Moderation Tool</p>
          <p className="mt-2 text-xs text-gray-400">
            Note: This is a frontend demo. In a real implementation, this would connect to a Python backend using the YouTube Transcript API and LLaMA 3 for content moderation.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
