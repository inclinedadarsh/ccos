import { NextResponse } from "next/server";

export async function GET() {
	// Different delay for LinkedIn (4.2 seconds)
	await new Promise(resolve => setTimeout(resolve, 4200));

	const linkedinPost =
		"🎯 Exciting Content Alert!\n\nJust discovered an incredible video that's packed with valuable insights. This content perfectly illustrates the power of effective communication and knowledge sharing.\n\n#ProfessionalDevelopment #ContentCreation #Learning";

	return NextResponse.json({ post: linkedinPost });
}
