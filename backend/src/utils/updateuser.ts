import getSupabaseClient from "../dbInit";

async function updateUser(
    email: string,
    updates: {
        discord_webhook?: string;
        youtube_channel_link?: string;
        new_user?: boolean;
    },
) {
    let supabase = getSupabaseClient();
    const { error } = await supabase
        .from("ccos")
        .update(updates)
        .eq("email", email);

    if (error) {
        throw new Error("Error in : updateUser", error);
    }
}

export default updateUser;
