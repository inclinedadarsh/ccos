import { GoogleGenerativeAI } from '@google/generative-ai';
import * as dotenv from 'dotenv';

dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateTweets(transcript: string, videoUrl: string) {
    const prompt = `Create 1 viral tweet about this video transcript. Include the video URL ${videoUrl} in the tweet.

  Video transcript: ${transcript}

  Requirements:
  - Use attention-grabbing hook
  - Include relevant hashtags
  - Create curiosity
  - Add engaging question
  - Keep tweet under 280 characters
  `;

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
        const result = await model.generateContent(prompt);
        const response = result.response.text();

        try {
            return {
                success: true,
                data: response
            };
        } catch (parseError) {
            console.error('Failed to parse tweets JSON:', parseError);
            return {
                success: false,
                error: 'Generated content was not valid JSON',
                rawResponse: response
            };
        }
    } catch (error) {
        console.error('Failed to generate tweets:', error);
        return {
            success: false,
            error: 'Failed to generate tweets'
        };
    }
}
