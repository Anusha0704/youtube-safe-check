
import { getYoutubeEmbedUrl, getYoutubeThumbnailUrl } from "@/utils/youtubeUtils";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { Video } from "lucide-react";

interface VideoPreviewProps {
  videoId: string;
  title?: string;
}

const VideoPreview = ({ videoId, title }: VideoPreviewProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  if (!videoId) return null;
  
  const handlePlayClick = () => {
    setIsPlaying(true);
  };
  
  return (
    <Card className="w-full max-w-2xl overflow-hidden shadow-md border-2">
      <CardContent className="p-0">
        <div className="aspect-video relative">
          {isPlaying ? (
            <iframe
              src={`${getYoutubeEmbedUrl(videoId)}?autoplay=1`}
              title={title || "YouTube Video"}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <div className="relative aspect-video cursor-pointer group" onClick={handlePlayClick}>
              <img
                src={getYoutubeThumbnailUrl(videoId)}
                alt={title || "Video thumbnail"}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // If maxresdefault fails, try hqdefault
                  (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 group-hover:bg-opacity-40 transition-all">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-youtube bg-opacity-90 group-hover:bg-opacity-100 group-hover:scale-110 transition-all">
                  <Video className="h-7 w-7 text-white" />
                </div>
              </div>
              {title && (
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-2 text-sm">
                  {title}
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoPreview;
