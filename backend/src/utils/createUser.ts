import getSupabaseClient from "../dbInit";

async function createUser({
    email,
    new_user,
}: {
    email: string;
    new_user: boolean;
}) {
    let supabase = getSupabaseClient();
    const { error } = await supabase.from("ccos").insert([{ email, new_user }]);

    if (error) {
        throw new Error("Error in : createUser", error);
    }
}

export default createUser;
