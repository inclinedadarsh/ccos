import { GoogleGenerativeAI } from '@google/generative-ai';
import * as dotenv from 'dotenv';
import { truncateText } from './utils';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateLinkedinPosts(transcript: string, videoUrl: string) {
    const prompt = `Create 1 professional LinkedIn post about this video transcript. Include the video URL ${videoUrl} in the post.

  Video transcript: ${truncateText(transcript)}

  Requirements:
  - Start with powerful professional hook
  - Include business insights
  - Use bullet points where relevant
  - Share industry context
  - End with thought-provoking question`
  ;

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
            console.error('Failed to parse LinkedIn posts JSON:', parseError);
            return {
                success: false,
                error: 'Generated content was not valid JSON',
                rawResponse: response
            };
        }
    } catch (error) {
        console.error('Failed to generate LinkedIn posts:', error);
        return {
            success: false,
            error: 'Failed to generate LinkedIn posts'
        };
    }
}
