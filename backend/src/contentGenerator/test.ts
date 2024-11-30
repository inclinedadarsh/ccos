import { getVideoTranscript } from './generateTranscript';
import { generateTweets } from './generateTweets';
import { generateLinkedinPosts } from './generateLinkedinPosts';
import { generateBlogs } from './generateBlogs';

async function test() {
    const videoUrl = "https://www.youtube.com/watch?v=E0EY4dxMAxA";
    const transcriptResult = await getVideoTranscript(videoUrl);
    if (transcriptResult.success && transcriptResult.transcript) {
        const transcript = transcriptResult.transcript;
        const tweetsResult = await generateTweets(transcript, videoUrl);
        const linkedinPostsResult = await generateLinkedinPosts(transcript, videoUrl);
        const blogsResult = await generateBlogs(transcript, videoUrl);
        console.log('Tweets:');
        console.log(tweetsResult);
        console.log('LinkedIn posts:');
        console.log(linkedinPostsResult);
        console.log('Blogs:');
        console.log(blogsResult);
    }
    else {
        console.error('Failed to get video transcript:', transcriptResult.error);
    }
}
test();