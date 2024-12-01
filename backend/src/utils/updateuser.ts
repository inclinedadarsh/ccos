import getSupabaseClient from "../dbInit";

async function updateUser(
    email: string,
    updates: {
        server_hook?: string;
        personal_hook?: string;
        youtube_channel_link?: string;
        unprocessed_videos?: [];
        new_user?: boolean;
    },
) {
    let supabase = getSupabaseClient();
    const { data, error } = await supabase
        .from("users")
        .update(updates)
        .eq("email", email)
        .select();

    if (error) {
        throw new Error("Error in : updateUser", error);
    }

    return data[0];
}

export default updateUser;
