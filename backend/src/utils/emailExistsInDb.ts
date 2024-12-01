import getSupabaseClient from "../dbInit";

async function emailExistsInDb(email: string) {
    let supabase = getSupabaseClient();
    const { data, error } = await supabase
        .from("ccos")
        .select("*")
        .eq("email", email)
        .select();

    if (error) {
        throw new Error("Error in : emailExistsInDb", error);
    }

    if (data.length === 0) {
        return [false, true];
    }

    return [true, data[0].new_user];
}

export default emailExistsInDb;
