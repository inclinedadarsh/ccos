import { generateTweets } from "./generateTweets";
import { generateLinkedinPosts } from "./generateLinkedinPosts";
import { generateBlogs } from "./generateBlogs";
import getTranscript from "./generateTranscript";

async function getContent(videoUrl: string) {
    const transcriptResult = await getTranscript(videoUrl);
    if (transcriptResult.success && transcriptResult.transcript) {
        const transcript = transcriptResult.transcript;
        const tweetsResult = await generateTweets(transcript, videoUrl);
        const linkedinPostsResult = await generateLinkedinPosts(
            transcript,
            videoUrl,
        );
        const blogsResult = await generateBlogs(transcript, videoUrl);

        console.log("Tweets:");
        console.log(tweetsResult);
        console.log("LinkedIn posts:");
        console.log(linkedinPostsResult);
        console.log("Blogs:");
        console.log(blogsResult);

        return {
            tweets: tweetsResult,
            linkedinPosts: linkedinPostsResult,
            blogs: blogsResult,
        };
    } else {
        console.error("Failed to get video transcript:", transcriptResult.error);
    }
}

export default getContent;
