
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
    racialComments: boolean;
    riotIncitement: boolean;
    cultContent: boolean;
    misinformation: boolean;
    drugReferences: boolean;
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
    
    // Demo videos with predefined results for better accuracy demonstration
    const demoVideos: Record<string, Partial<ContentCheckResult>> = {
      // Educational content - Safe
      "dQw4w9WgXcQ": {
        isSafe: true,
        title: "Educational Content",
        transcript: "This is an educational video suitable for children talking about science and nature in a kid-friendly way.",
        categories: {
          hateSpeech: false,
          politicalContent: false,
          explicitLanguage: false,
          violentSpeech: false,
          sexualContent: false,
          racialComments: false,
          riotIncitement: false,
          cultContent: false,
          misinformation: false,
          drugReferences: false
        }
      },
      // Violence content - Unsafe
      "C0DPdy98e4c": {
        isSafe: false,
        title: "Content with Violent Themes",
        transcript: "This video contains violent speech and imagery that's not suitable for children.",
        categories: {
          hateSpeech: false,
          politicalContent: false,
          explicitLanguage: true,
          violentSpeech: true,
          sexualContent: false,
          racialComments: false,
          riotIncitement: false,
          cultContent: false,
          misinformation: false,
          drugReferences: false
        }
      },
      // Political and racial content - Unsafe
      "ZbZSe6N_BXs": {
        isSafe: false,
        title: "Political Commentary",
        transcript: "This video contains divisive political content and some racial commentary that may not be appropriate for younger audiences.",
        categories: {
          hateSpeech: false,
          politicalContent: true,
          explicitLanguage: false,
          violentSpeech: false,
          sexualContent: false,
          racialComments: true,
          riotIncitement: false,
          cultContent: false,
          misinformation: false,
          drugReferences: false
        }
      },
      // Explicit content - Unsafe
      "9bZkp7q19f0": {
        isSafe: false,
        title: "Explicit Content",
        transcript: "This video contains explicit language and adult themes not suitable for children.",
        categories: {
          hateSpeech: false,
          politicalContent: false,
          explicitLanguage: true,
          violentSpeech: false,
          sexualContent: true,
          racialComments: false,
          riotIncitement: false,
          cultContent: false,
          misinformation: false,
          drugReferences: false
        }
      },
      // Hate speech and misinformation - Unsafe
      "y6120QOlsfU": {
        isSafe: false,
        title: "Problematic Content",
        transcript: "This video contains hate speech, misinformation, and content that may promote harmful views.",
        categories: {
          hateSpeech: true,
          politicalContent: true,
          explicitLanguage: false,
          violentSpeech: false,
          sexualContent: false,
          racialComments: true,
          riotIncitement: false,
          cultContent: false,
          misinformation: true,
          drugReferences: false
        }
      },
      // Riot incitement and cult content - Unsafe
      "J---aiyznGQ": {
        isSafe: false,
        title: "Extremist Content",
        transcript: "This video contains content that may incite riots and discusses harmful cult activities.",
        categories: {
          hateSpeech: false,
          politicalContent: true,
          explicitLanguage: false,
          violentSpeech: true,
          sexualContent: false,
          racialComments: false,
          riotIncitement: true,
          cultContent: true,
          misinformation: true,
          drugReferences: false
        }
      },
      // Drug references - Unsafe
      "MtN1YnoL46Q": {
        isSafe: false,
        title: "Content with Drug References",
        transcript: "This video contains references to drug use and adult themes not appropriate for children.",
        categories: {
          hateSpeech: false,
          politicalContent: false,
          explicitLanguage: true,
          violentSpeech: false,
          sexualContent: false,
          racialComments: false,
          riotIncitement: false,
          cultContent: false,
          misinformation: false,
          drugReferences: true
        }
      }
    };

    // Check if this is a demo video
    if (demoVideos[videoId]) {
      const demoResult = demoVideos[videoId];
      return {
        isSafe: demoResult.isSafe ?? false,
        videoId,
        transcript: demoResult.transcript ?? "",
        title: demoResult.title ?? "YouTube Video",
        categories: demoResult.categories ?? {
          hateSpeech: false,
          politicalContent: false,
          explicitLanguage: false,
          violentSpeech: false,
          sexualContent: false,
          racialComments: false,
          riotIncitement: false,
          cultContent: false,
          misinformation: false,
          drugReferences: false
        }
      };
    }
    
    // If not a demo video, generate a randomized result
    // But with more control to ensure better representation
    const isSafe = Math.random() > 0.3; // Make 70% of videos "safe" for demo
    
    // Create more controlled categories
    const categories = {
      hateSpeech: !isSafe ? Math.random() > 0.6 : false,
      politicalContent: !isSafe ? Math.random() > 0.5 : false,
      explicitLanguage: !isSafe ? Math.random() > 0.3 : false,
      violentSpeech: !isSafe ? Math.random() > 0.7 : false,
      sexualContent: !isSafe ? Math.random() > 0.6 : false,
      racialComments: !isSafe ? Math.random() > 0.7 : false,
      riotIncitement: !isSafe ? Math.random() > 0.8 : false,
      cultContent: !isSafe ? Math.random() > 0.8 : false,
      misinformation: !isSafe ? Math.random() > 0.65 : false,
      drugReferences: !isSafe ? Math.random() > 0.7 : false
    };
    
    // Make sure at least one category is true if not safe
    if (!isSafe && !Object.values(categories).includes(true)) {
      const keys = Object.keys(categories) as (keyof typeof categories)[];
      const randomIndex = Math.floor(Math.random() * keys.length);
      categories[keys[randomIndex]] = true;
    }
    
    // Create more descriptive transcripts based on categories
    let transcript = "";
    
    if (!isSafe) {
      transcript = "This is a mock transcript that contains ";
      
      const activeCategories = Object.entries(categories)
        .filter(([_, value]) => value)
        .map(([key]) => {
          switch(key) {
            case 'hateSpeech': return "hate speech";
            case 'politicalContent': return "political content";
            case 'explicitLanguage': return "explicit language";
            case 'violentSpeech': return "violent themes";
            case 'sexualContent': return "sexual content";
            case 'racialComments': return "racial comments";
            case 'riotIncitement': return "riot incitement";
            case 'cultContent': return "cult-related content";
            case 'misinformation': return "misinformation";
            case 'drugReferences': return "drug references";
            default: return key;
          }
        });
      
      if (activeCategories.length > 0) {
        transcript += activeCategories.join(", ") + ". ";
      }
      
      transcript += "In a real implementation, this would be the actual transcript fetched using the YouTube API and analyzed for harmful content by LLaMA 3.";
    } else {
      transcript = "This is a mock transcript that is suitable for children. In a real implementation, this would be the actual transcript fetched using the YouTube Transcript API and analyzed by LLaMA 3 for safety.";
    }
    
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
