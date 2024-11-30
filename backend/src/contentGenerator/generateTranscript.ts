import { YoutubeTranscript } from 'youtube-transcript';

export async function getVideoTranscript(videoUrl: string) {
  try {
    const videoId = new URL(videoUrl).searchParams.get('v') || 
                   videoUrl.split('youtu.be/')[1];
                   
    if (!videoId) {
      return { success: false, error: "Invalid YouTube URL" };
    }

    const transcript = await YoutubeTranscript.fetchTranscript(videoId);
    return {
      success: true,
      transcript: transcript.map(entry => entry.text).join(' ')
    };

  } catch (error) {
    return {
      success: false, 
      error: 'Failed to get transcript'
    };
  }
}