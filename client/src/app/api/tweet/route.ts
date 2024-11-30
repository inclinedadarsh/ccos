import { NextResponse } from "next/server";

export async function GET() {
	// Simulate API delay
	await new Promise(resolve => setTimeout(resolve, 3500));

	// Simple tweet generation (you can make this more sophisticated later)
	const tweet =
		"🎥 Just watched an amazing video! Check out this incredible content that dives deep into fascinating topics. Must watch! #ContentCreation #MustWatch";

	return NextResponse.json({ tweet });
}
