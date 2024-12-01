import { GoogleGenerativeAI } from '@google/generative-ai';
import * as dotenv from 'dotenv';

dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateBlogs(transcript: string, videoUrl: string) {
  const prompt = `Create 1 blog post about this video transcript. Return ONLY a JSON object with a single key 'blog' and the blog text as value. Include the video URL ${videoUrl} in the blog.
  
  Video transcript: ${transcript}
  
  Requirements:
  - SEO-optimized 300-400 word post
  - Compelling headline
  - Scannable sections
  - Include insights and analysis
  - End with call-to-action
  
  Return format:
  {
    "blog": "..."
  }`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const result = await model.generateContent(prompt);
    const response = result.response.text();

    try {
      const parsedResponse = response.replace(/```json\n|\n```/g, '');
      const parsedBlogs = JSON.parse(parsedResponse);
      return {
        success: true,
        data: parsedBlogs
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