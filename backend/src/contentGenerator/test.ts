import { getVideoTranscript } from './generateTranscript';
import { generateTweets } from './generateTweets';

async function test() {
    const videoUrl = "https://www.youtube.com/watch?v=E0EY4dxMAxA";
    const transcriptResult = await getVideoTranscript(videoUrl);
    if (transcriptResult.success && transcriptResult.transcript) {
        const transcript = transcriptResult.transcript;
        const tweetsResult = await generateTweets(transcript, videoUrl);
        console.log(tweetsResult);
    }
    else {
        console.error('Failed to get video transcript:', transcriptResult.error);
    }
}
test();