
/**
 * Extracts the YouTube video ID from various YouTube URL formats
 * Supports regular videos, shorts, embed links, and youtu.be links
 */
export const extractYoutubeId = (url: string): string | null => {
  if (!url) return null;
  
  // Try to match various YouTube URL patterns
  const patterns = [
    // Standard watch URLs
    /(?:youtube\.com\/watch\?v=|youtube\.com\/watch\?.+&v=)([^&]+)/,
    // Short youtu.be URLs
    /youtu\.be\/([^?&]+)/,
    // YouTube Shorts
    /youtube\.com\/shorts\/([^?&]+)/,
    // YouTube Embed
    /youtube\.com\/embed\/([^?&]+)/,
    // YouTube v= parameter anywhere in the URL
    /[?&]v=([^&]+)/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
};

/**
 * Validates if a string is a valid YouTube URL
 */
export const isValidYoutubeUrl = (url: string): boolean => {
  if (!url) return false;
  return extractYoutubeId(url) !== null;
};

/**
 * Generates a YouTube thumbnail URL from a video ID
 */
export const getYoutubeThumbnailUrl = (videoId: string): string => {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
};

/**
 * Generates a YouTube embed URL from a video ID
 */
export const getYoutubeEmbedUrl = (videoId: string): string => {
  return `https://www.youtube.com/embed/${videoId}`;
};
