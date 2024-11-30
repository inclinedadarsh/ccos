import { getVideoTranscript } from './generateTranscript';
import { generateTweets } from './generateTweets';
import { generateLinkedinPosts } from './generateLinkedinPosts';

async function test() {
    const videoUrl = "https://www.youtube.com/watch?v=E0EY4dxMAxA";
    const transcriptResult = await getVideoTranscript(videoUrl);
    if (transcriptResult.success && transcriptResult.transcript) {
        const transcript = transcriptResult.transcript;
        const tweetsResult = await generateTweets(transcript, videoUrl);
        const linkedinPostsResult = await generateLinkedinPosts(transcript, videoUrl);
        console.log(tweetsResult);
        console.log(linkedinPostsResult);
    }
    else {
        console.error('Failed to get video transcript:', transcriptResult.error);
    }
}
test();