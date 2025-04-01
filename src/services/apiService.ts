
import { toast } from "sonner";

// Types for API responses
export interface ContentCheckResult {
  isSafe: boolean;
  videoId: string;
  transcript: string;
  title?: string;
  categories?: {
    hateSpeech: boolean;
    politicalContent: boolean;
    explicitLanguage: boolean;
    violentSpeech: boolean;
    sexualContent: boolean;
  };
}

// For demo purposes, we'll mock the API responses
// In a real implementation, this would call a Python backend service
export const checkYoutubeContent = async (videoId: string): Promise<ContentCheckResult> => {
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // This is a mock implementation
    // In a real app, this would make a fetch call to your Python backend API
    // Example:
    // const response = await fetch('/api/check-content', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ videoId })
    // });
    // const data = await response.json();
    // return data;
    
    // Mock implementation for demo purposes
    const isSafe = Math.random() > 0.3; // Make 70% of videos "safe" for demo
    
    // Create mock categories with at least one being true if not safe
    const categories = {
      hateSpeech: !isSafe ? Math.random() > 0.7 : false,
      politicalContent: !isSafe ? Math.random() > 0.5 : false,
      explicitLanguage: !isSafe ? Math.random() > 0.3 : false,
      violentSpeech: !isSafe ? Math.random() > 0.8 : false,
      sexualContent: !isSafe ? Math.random() > 0.6 : false
    };
    
    // Make sure at least one category is true if not safe
    if (!isSafe && !Object.values(categories).includes(true)) {
      const keys = Object.keys(categories) as (keyof typeof categories)[];
      const randomIndex = Math.floor(Math.random() * keys.length);
      categories[keys[randomIndex]] = true;
    }
    
    // Create a realistic-looking transcript
    const transcript = !isSafe 
      ? "This is a mock transcript that would contain content that would be flagged by the moderation model. In a real implementation, this would be the actual transcript fetched from the YouTube API." 
      : "This is a mock transcript that is suitable for children. In a real implementation, this would be the actual transcript fetched using the YouTube Transcript API as shown in the Python code.";
    
    return {
      isSafe,
      videoId,
      transcript,
      title: "Sample YouTube Video",
      categories
    };
  } catch (error) {
    console.error("Error checking YouTube content:", error);
    toast.error("Failed to check YouTube content. Please try again.");
    throw error;
  }
};
