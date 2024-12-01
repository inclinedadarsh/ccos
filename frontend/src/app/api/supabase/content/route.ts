import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
	try {
		const cookieStore = cookies();
		const { videoId } = await req.json();

		console.log("Received videoId:", videoId);

		if (!videoId) {
			return NextResponse.json(
				{ error: "Video ID is required" },
				{ status: 400 },
			);
		}

		const supabase = createRouteHandlerClient({
			cookies: () => cookieStore,
		});

		const { data, error } = await supabase
			.from("kestra")
			.select("twitter_content, linkdien_content, blog_post")
			.eq("video_id", videoId)
			.single();

		console.log("Supabase query result:", { data, error });

		if (error && error.code !== "PGRST116") {
			console.error("Supabase error:", error);
			return NextResponse.json({ error: error.message }, { status: 500 });
		}

		const response = {
			twitter: {
				exists: false,
				content: null,
			},
			linkedin: {
				exists: false,
				content: null,
			},
			blog: {
				exists: false,
				content: null,
			},
		};

		if (data) {
			response.twitter.exists = !!data.twitter_content;
			response.twitter.content = data.twitter_content || null;

			response.linkedin.exists = !!data.linkdien_content;
			response.linkedin.content = data.linkdien_content || null;

			response.blog.exists = !!data.blog_post;
			response.blog.content = data.blog_post || null;
		}

		console.log("Final response:", response);
		return NextResponse.json(response);
	} catch (error) {
		console.error("Caught error:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}
