import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const { url } = await req.json();

		if (!url) {
			return NextResponse.json(
				{ error: "YouTube URL is required" },
				{ status: 400 },
			);
		}

		// Return placeholder metadata
		const metadata = {
			title: "Sample Video Title",
			thumbnail: "https://placekitten.com/1280/720",
			channelName: "Sample Channel",
			channelUrl: "https://youtube.com/channel/sample",
			duration: 180, // 3 minutes in seconds
			viewCount: 10000,
			uploadDate: "20240315",
			description: "This is a sample video description.",
		};

		return NextResponse.json(metadata);
	} catch (error) {
		console.error("Error:", error);
		return NextResponse.json(
			{ error: "Failed to fetch video information" },
			{ status: 500 },
		);
	}
}
