"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ViewContainer } from "@/components/ui/view-container";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { youtubeLinkAtom } from "./states";

export default function Home() {
	const router = useRouter();
	const [youtubeLink, setYoutubeLink] = useAtom(youtubeLinkAtom);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (isValidYoutubeLink(youtubeLink)) {
			toast.success("Valid YouTube link submitted!");
			const encodedUrl = encodeURIComponent(youtubeLink);
			router.push(`/dashboard/video?url=${encodedUrl}`);
		} else {
			toast.error("Please enter a valid YouTube link");
		}
	};

	const isValidYoutubeLink = (url: string) => {
		const youtubeRegex =
			/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
		return youtubeRegex.test(url);
	};

	return (
		<ViewContainer>
			<div className="min-h-screen space-y-10 mt-36">
				<h1 className="text-4xl md:text-6xl font-medium max-w-4xl mx-auto text-center">
					Turn Your Videos into{" "}
					<span className="text-blue-600 font-mono">Endless</span>{" "}
					Marketing Assets
				</h1>
				<p className="text-lg md:text-xl text-center max-w-2xl mx-auto">
					We generate a lot of content like blogs, tweets, and other
					stuff using your YouTube video.
				</p>
				<form
					onSubmit={handleSubmit}
					className="w-full max-w-md mx-auto"
				>
					<div className="flex flex-col sm:flex-row gap-4">
						<Input
							type="text"
							placeholder="Enter YouTube video link"
							value={youtubeLink}
							onChange={e => setYoutubeLink(e.target.value)}
							className="flex-grow"
						/>
						<Button type="submit" className="w-full sm:w-auto">
							Generate Content
						</Button>
					</div>
				</form>
			</div>
		</ViewContainer>
	);
}
