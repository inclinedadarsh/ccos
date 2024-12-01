import getSupabaseClient from "../dbInit";

async function checkIfVideoProcessed(
    videoId: string,
): Promise<{ isProcessed: boolean; data: any }> {
    const supabase = getSupabaseClient();

    let { data, error } = await supabase
        .from("kestra")
        .select("twitter_content, linkdien_content, blog_post")
        .eq("video_id", videoId)
        .select();

    if (error) {
        console.log(error);
        throw new Error("Error in: checkIfVideoProcessed", error);
    }

    data = data[0];

    let isProcessed =
        data &&
        (data?.twitter_content && data?.linkdien_content && data?.blog_post);

    isProcessed = isProcessed ? true : false

    if (!isProcessed) {
        data = null;
    }

    if (data) {
        delete data.video_details;
    }

    return { isProcessed, data: data };
}

export default checkIfVideoProcessed;
