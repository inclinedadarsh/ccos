import { GoogleGenerativeAI } from '@google/generative-ai';
import * as dotenv from 'dotenv';
import { truncateText } from './utils';

dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateBlogs(transcript: string, videoUrl: string) {
    const prompt = `Create 1 blog post about this video transcript. Include the video URL ${videoUrl} in the blog.
  
  Video transcript: ${truncateText(transcript)}
  
  Requirements:
  - SEO-optimized 300-400 word post
  - Compelling headline
  - Scannable sections
  - Include insights and analysis
  - End with call-to-action`;

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
            console.error('Failed to parse blog posts JSON:', parseError);
            return {
                success: false,
                error: 'Generated content was not valid JSON',
                rawResponse: response
            };
        }
    } catch (error) {
        console.error('Failed to generate blog posts:', error);
        return {
            success: false,
            error: 'Failed to generate blog posts'
        };
    }
}
