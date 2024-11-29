"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
		<div className="min-h-screen flex flex-col items-center justify-center p-4">
			<h1 className="text-6xl font-bold mb-10 text-center">
				Content Creation on
				<br />
				<span className="text-blue-600 italic font-bold">Steroids</span>
			</h1>
			<p className="text-xl text-center mb-8 max-w-2xl">
				We generate a lot of content like blogs, tweets, and other stuff
				using your YouTube video.
			</p>
			<form onSubmit={handleSubmit} className="w-full max-w-md">
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
	);
}
