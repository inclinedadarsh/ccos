import { GoogleGenerativeAI } from '@google/generative-ai';
import * as dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateLinkedinPosts(transcript: string, videoUrl: string) {
    const prompt = `Create 5 professional LinkedIn posts about this video transcript. Return ONLY a JSON object where keys are post1, post2, etc. and values are the post text. Include the video URL ${videoUrl} in each post.

  Video transcript: ${transcript}

  Requirements:
  - Start with powerful professional hooks
  - Include business insights
  - Use bullet points where relevant
  - Share industry context
  - End with thought-provoking questions

  Return format:
  {
    "post1": "...",
    "post2": "...",
    ...
  }`;

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
        const result = await model.generateContent(prompt);
        const response = result.response.text();

        try {
            const parsedResponse = response.replace(/```json\n|\n```/g, '');
            const parsedPosts = JSON.parse(parsedResponse);
            return {
                success: true,
                data: parsedPosts
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