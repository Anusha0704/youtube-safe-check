
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { extractYoutubeId, isValidYoutubeUrl } from "@/utils/youtubeUtils";
import { toast } from "sonner";
import { Search } from "lucide-react";

interface YouTubeFormProps {
  onSubmit: (videoId: string) => void;
  isLoading: boolean;
}

const YouTubeForm = ({ onSubmit, isLoading }: YouTubeFormProps) => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!url.trim()) {
      setError("Please enter a YouTube URL");
      return;
    }

    if (!isValidYoutubeUrl(url)) {
      setError("Please enter a valid YouTube URL");
      toast.error("Invalid YouTube URL format");
      return;
    }

    const videoId = extractYoutubeId(url);
    if (videoId) {
      onSubmit(videoId);
    } else {
      setError("Could not extract video ID from URL");
      toast.error("Invalid YouTube URL format");
    }
  };

  return (
    <Card className="w-full max-w-2xl shadow-lg border-2">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="youtube-url" className="text-sm font-medium text-gray-700">
              Enter YouTube URL
            </label>
            <div className="relative">
              <Input
                id="youtube-url"
                type="text"
                placeholder="https://www.youtube.com/watch?v=..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className={`pr-10 ${
                  error ? "border-red-500 focus-visible:ring-red-500" : ""
                }`}
                disabled={isLoading}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
            </div>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            <p className="text-xs text-gray-500">
              Supports regular videos, Shorts, embed links, and youtu.be URLs
            </p>
          </div>
          <Button 
            type="submit" 
            className="w-full bg-youtube hover:bg-red-700 text-white"
            disabled={isLoading}
          >
            {isLoading ? "Checking Content..." : "Check Content Safety"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default YouTubeForm;
