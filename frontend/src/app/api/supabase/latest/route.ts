import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
	try {
		const cookieStore = cookies();
		const supabase = createRouteHandlerClient({
			cookies: () => cookieStore,
		});

		const { data, error } = await supabase
			.from("kestra")
			.select("*")
			.order("generate_time", { ascending: false })
			.limit(1)
			.single();

		if (error && error.code !== "PGRST116") {
			console.error("Supabase error:", error);
			return NextResponse.json({ error: error.message }, { status: 500 });
		}

		return NextResponse.json({ data });
	} catch (error) {
		console.error("Caught error:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}
