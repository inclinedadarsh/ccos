import { generateTweets } from "./generateTweets";
import { generateLinkedinPosts } from "./generateLinkedinPosts";
import { generateBlogs } from "./generateBlogs";
import getTranscript from "./generateTranscript";
import saveToDb from "../utils/saveToDb";

async function getContent(videoId: string) {
    let videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

    const transcriptResult = await getTranscript(videoUrl);
    if (transcriptResult.success && transcriptResult.transcript) {
        const transcript = transcriptResult.transcript;

        const tweetsResult = await generateTweets(transcript, videoUrl);
        console.log("Tweets:");
        console.log(tweetsResult);
        await saveToDb({ videoId, tweetData: tweetsResult.data });

        const linkedinPostsResult = await generateLinkedinPosts(
            transcript,
            videoUrl,
        );
        console.log("LinkedIn posts:");
        console.log(linkedinPostsResult);
        await saveToDb({ videoId, linkedinPostData: linkedinPostsResult.data });

        const blogsResult = await generateBlogs(transcript, videoUrl);
        console.log("Blogs:");
        console.log(blogsResult);
        await saveToDb({ videoId, blogPostData: blogsResult.data });
    } else {
        console.error("Failed to get video transcript:", transcriptResult.error);
    }
}

export default getContent;
