import { GoogleGenerativeAI } from '@google/generative-ai';
import * as dotenv from 'dotenv';

dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateTweets(transcript: string, videoUrl: string) {
    const prompt = `Create 5 viral tweets about this video transcript. Return ONLY a JSON object where keys are tweet1, tweet2, etc. and values are the tweet text. Include the video URL ${videoUrl} in each tweet.

  Video transcript: ${transcript}

  Requirements:
  - Use attention-grabbing hooks
  - Include relevant hashtags
  - Create curiosity
  - Add engaging questions
  - Keep each tweet under 280 characters

  Return format:
  {
    "tweet1": "...",
    "tweet2": "...",
    ...
  }`;

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
        const result = await model.generateContent(prompt);
        const response = result.response.text();

        try {
            const parsedResponse = response.replace(/```json\n|\n```/g, '');
            const parsedTweets = JSON.parse(parsedResponse);
            return {
                success: true,
                data: parsedTweets
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