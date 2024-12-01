import axios from "axios";

async function getTranscript(videoUrl: string) {
    const apiHost = "youtube-transcripts.p.rapidapi.com";
    const apiKey = process.env.YOUTUBE_API_KEY;

    const encodedUrl = encodeURIComponent(videoUrl);
    const apiUrl = `https://${apiHost}/youtube/transcript?url=${encodedUrl}&chunkSize=500`;

    try {
        const response = await axios.get(apiUrl, {
            headers: {
                "x-rapidapi-host": apiHost,
                "x-rapidapi-key": apiKey,
            },
        });

        const transcriptChunks = response.data.content;
        const transcript = transcriptChunks.map((chunk: { text: string }) => chunk.text).join(" ");

        console.log("\n--- Transcript ---\n");
        console.log(transcript);

        return {
            success: true,
            transcript,
        };
    } catch (error) {
        console.error(
            "Error fetching transcript:",
            error.response?.data || (error as Error).message,
        );

        return {
            success: false,
            error: "Failed to get transcript",
        };
    }
}

export default getTranscript;

// // Replace with your YouTube video URL
// const videoUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
// getYouTubeTranscript(videoUrl);
