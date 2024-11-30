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
    const { data, error } = await supabase
        .from("ccos")
        .update(updates)
        .eq("email", email)
        .select();

    if (error) {
        throw new Error("Error in : updateUser", error);
    }

    delete (data as { id?: number }).id;

    return data;
}

export default updateUser;
