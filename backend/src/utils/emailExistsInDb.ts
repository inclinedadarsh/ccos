import getSupabaseClient from "../dbInit";

async function emailExistsInDb(email: string) {
    let supabase = getSupabaseClient();
    const { data, error } = await supabase
        .from("ccos")
        .select("*")
        .eq("email", email);

    if (error) {
        throw new Error("Error in : emailExistsInDb", error);
    }

    if (data.length === 0) {
        return false;
    }

    return true;
}

export default emailExistsInDb;
