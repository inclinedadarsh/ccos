import getSupabaseClient from "../dbInit";

async function emailExistsInDb(email: string) {
    let supabase = getSupabaseClient();
    const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .select();

    if (error) {
        throw new Error("Error in : emailExistsInDb", error);
    }

    if (data.length === 0) {
        return { emailExists: false, isNewUser: true };
    }

    let isNewUser = data[0].new_user;

    delete data[0].new_user;
    delete data[0].id;

    return { emailExists: true, isNewUser, ...data[0] };
}

export default emailExistsInDb;
