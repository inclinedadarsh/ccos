import getSupabaseClient from "../dbInit";

interface SaveToDbParams {
    videoId: string;
    tweetData?: string;
    linkedinPostData?: string;
    blogPostData?: string;
    videoDetails?: any;
}

async function saveToDb({
    videoId,
    tweetData,
    linkedinPostData,
    blogPostData,
    videoDetails,
}: SaveToDbParams): Promise<void> {
    const supabase = getSupabaseClient();

    const dataToUpsert: any = {
        video_id: videoId,
    };

    if (tweetData) {
        dataToUpsert.twitter_content = tweetData;
    }

    if (linkedinPostData) {
        dataToUpsert.linkdien_content = linkedinPostData;
    }

    if (blogPostData) {
        dataToUpsert.blog_post = blogPostData;
    }

    if (videoDetails) {
        dataToUpsert.video_details = videoDetails;
    }

    const { error } = await supabase
        .from("kestra")
        .upsert([dataToUpsert], { onConflict: "video_id" });

    if (error) {
        console.log(error);
        throw new Error("Error in: saveToDb", error);
    }
}

export default saveToDb;
