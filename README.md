
# YouTube Safe Check

A modern web application that analyzes YouTube video transcripts to determine if the content is safe for viewing. The app checks for hate speech, political content, explicit language, violent speech, and sexual content.

## Features

- Clean, responsive user interface
- Support for all YouTube URL formats (standard videos, Shorts, embed links, youtu.be)
- Video preview with thumbnail and playback
- Clear safety status indicators
- Transcript viewer

## Project Structure

```
src/
├── components/           # React components
│   ├── YouTubeForm.tsx   # URL input form
│   ├── VideoPreview.tsx  # Video thumbnail and player
│   └── SafetyResult.tsx  # Safety analysis results
├── services/
│   └── apiService.ts     # API service for content checking
├── utils/
│   └── youtubeUtils.ts   # YouTube URL parsing utilities
└── pages/
    └── Index.tsx         # Main application page
```

## Implementation Notes

### Frontend (React + TypeScript)

The frontend is implemented with React and TypeScript, using Tailwind CSS for styling. The application consists of:

1. A form for entering YouTube URLs
2. A video preview component
3. A safety result display that shows whether the content is safe and what issues were detected

### Backend Implementation (To Be Added)

This demo currently uses a mock implementation for content checking. To implement a real backend:

1. Create a Python API using Flask or FastAPI
2. Use the YouTube Transcript API to fetch video transcripts
3. Integrate with an LLM model (like Meta's LLaMA 3) to analyze the transcript content
4. Return a structured response with safety analysis

Example backend code structure (Python with FastAPI):

```python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from youtube_transcript_api import YouTubeTranscriptApi
import requests
import os

app = FastAPI()

class VideoRequest(BaseModel):
    video_id: str

@app.post("/api/check-content")
async def check_content(request: VideoRequest):
    try:
        # Get transcript
        transcript_list = YouTubeTranscriptApi.get_transcript(request.video_id)
        transcript_text = " ".join([item["text"] for item in transcript_list])
        
        # Process with LLM
        analysis_result = analyze_with_llm(transcript_text)
        
        return {
            "isSafe": analysis_result["is_safe"],
            "videoId": request.video_id,
            "transcript": transcript_text,
            "categories": {
                "hateSpeech": analysis_result["hate_speech"],
                "politicalContent": analysis_result["political_content"],
                "explicitLanguage": analysis_result["explicit_language"],
                "violentSpeech": analysis_result["violent_speech"],
                "sexualContent": analysis_result["sexual_content"]
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def analyze_with_llm(transcript):
    # Implement LLM integration here
    # This could use OpenAI, Hugging Face, or a self-hosted model
    pass
```

## Running the Project

To run the frontend:

```bash
npm install
npm run dev
```

## Deployment

The frontend can be easily deployed to Vercel, Netlify, or similar platforms.

For the backend, consider deploying to:
- Render
- Heroku
- AWS Lambda
- Google Cloud Functions

## Future Improvements

- Add user authentication
- Save and display history of checked videos
- Improve transcript analysis with more detailed breakdowns
- Add bulk URL checking capability
