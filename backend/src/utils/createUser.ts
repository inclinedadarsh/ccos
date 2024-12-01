import getSupabaseClient from "../dbInit";

async function createUser({
    email,
    new_user,
}: {
    email: string;
    new_user: boolean;
}) {
    let supabase = getSupabaseClient();
    const { data, error } = await supabase
        .from("users")
        .insert([{ email, new_user }])
        .select();

    if (error) {
        console.log(error);
        throw new Error("Error in : createUser", error);
    }

    delete data[0].new_user;
    delete data[0].id;

    return data[0];
}

export default createUser;
