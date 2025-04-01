
import { useState } from "react";
import YouTubeForm from "@/components/YouTubeForm";
import VideoPreview from "@/components/VideoPreview";
import SafetyResult from "@/components/SafetyResult";
import { checkYoutubeContent, ContentCheckResult } from "@/services/apiService";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [videoId, setVideoId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<ContentCheckResult | null>(null);
  const { toast } = useToast();

  const handleFormSubmit = async (newVideoId: string) => {
    if (isLoading) return;
    
    if (newVideoId === videoId && result) {
      toast({
        title: "Already checked this video",
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
    <div className="min-h-screen flex flex-col items-center bg-gray-50">
      <header className="w-full bg-white border-b py-6 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-2xl md:text-3xl font-bold text-center flex items-center justify-center">
            <span className="text-youtube mr-2">YouTube</span> 
            Safe Check
          </h1>
          <p className="text-center text-gray-600 mt-2">
            Check if YouTube content is safe for viewing
          </p>
        </div>
      </header>
      
      <main className="flex-1 w-full container max-w-4xl px-4 py-8 space-y-6">
        <section className="space-y-8">
          <YouTubeForm onSubmit={handleFormSubmit} isLoading={isLoading} />
          
          {isLoading && (
            <div className="flex flex-col items-center justify-center p-8">
              <div className="animate-pulse-scale">
                <div className="h-12 w-12 rounded-full border-4 border-youtube border-t-transparent animate-spin"></div>
              </div>
              <p className="mt-4 text-gray-600">Analyzing content safety...</p>
            </div>
          )}
          
          {videoId && !isLoading && (
            <div className="space-y-6">
              <VideoPreview videoId={videoId} title={result?.title} />
              
              {result && <SafetyResult result={result} />}
            </div>
          )}
        </section>
      </main>
      
      <footer className="w-full bg-white border-t py-6 px-4">
        <div className="container mx-auto max-w-4xl text-center text-sm text-gray-500">
          <p>YouTube Safe Check | Content Moderation Tool</p>
          <p className="mt-1 text-xs">
            Note: This is a frontend demo. In a real implementation, this would connect to a backend API.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
