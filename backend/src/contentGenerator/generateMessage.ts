import { GoogleGenerativeAI } from '@google/generative-ai';

export async function generateAnnouncementMessage(
    transcript: string,
    videoUrl: string
): Promise<string> {
    const fallbackMessage = `🎥 Hey everyone! Check out our latest video! ${videoUrl} 🚀`;

    try {
        if (!process.env.GOOGLE_API_KEY) throw new Error('GOOGLE_API_KEY is required');
        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

        const prompt = `
      Generate a short, engaging announcement message for a content creator's community (like Discord) 
      to promote their new video. Use this video transcript to understand the content: 
      "${transcript}"
      
      The message should:
      1. Be exciting and create curiosity
      2. Be concise (max 3-4 sentences)
      3. Include this video URL: ${videoUrl} as a call-to-action
      4. Encourage community members to watch the video
      
      Respond ONLY with a JSON object in this format: {"message": "your message here"}
    `;

        const result = await model.generateContent(prompt);
        const text = result.response.text();
        const jsonMatch = text.match(/\{[\s\S]*\}/);

        if (!jsonMatch) return fallbackMessage;

        const parsedResponse = JSON.parse(jsonMatch[0]);
        return parsedResponse.message || fallbackMessage;

    } catch (error) {
        return fallbackMessage;
    }
}