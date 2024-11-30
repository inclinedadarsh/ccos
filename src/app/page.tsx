"use client";

import { WobbleCardDemo } from "@/components/WobbleCardDemo";
import { Button } from "@/components/ui/button";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { Input } from "@/components/ui/input";
import { ViewContainer } from "@/components/ui/view-container";
import { Noise } from "@/components/ui/wobble-card";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { BookHeart, Megaphone, NotebookPen } from "lucide-react";
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

	const features = [
		{
			title: "Blog",
			description: "Generate a detailed blog post from the video.",
			icon: NotebookPen,
		},
		{
			title: "Social Media",
			description: "Generate social media posts from the video.",
			icon: BookHeart,
		},
		{
			title: "Announcement",
			description: "Generate an announcement from the video.",
			icon: Megaphone,
		},
	];

	return (
		<main className="">
			<HeroHighlight className="">
				<ViewContainer className="space-y-10">
					<motion.h1
						initial={{
							opacity: 0,
							y: 20,
						}}
						animate={{
							opacity: 1,
							y: [20, -5, 0],
						}}
						transition={{
							duration: 0.5,
							delay: 0.1,
							ease: [0.4, 0.0, 0.2, 1],
						}}
						className="text-4xl md:text-6xl font-medium max-w-4xl mx-auto text-center"
					>
						Turn Your Videos into{" "}
						<Highlight className="font-mono font-semibold">
							Endless
							<Noise />
						</Highlight>{" "}
						Marketing Assets
					</motion.h1>
					<motion.p
						initial={{
							opacity: 0,
							y: 20,
						}}
						animate={{
							opacity: 1,
							y: [20, -5, 0],
						}}
						transition={{
							duration: 0.5,
							delay: 0.2,
							ease: [0.4, 0.0, 0.2, 1],
						}}
						className="text-lg md:text-xl text-center max-w-2xl mx-auto"
					>
						We generate a lot of content like blogs, tweets, and
						other stuff using your YouTube video.
					</motion.p>
					<motion.form
						initial={{
							opacity: 0,
							y: 20,
						}}
						animate={{
							opacity: 1,
							y: [20, -5, 0],
						}}
						transition={{
							duration: 0.5,
							delay: 0.3,
							ease: [0.4, 0.0, 0.2, 1],
						}}
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
					</motion.form>
				</ViewContainer>
			</HeroHighlight>
			<ViewContainer>
				<motion.h2
					initial={{
						opacity: 0,
						y: 20,
					}}
					animate={{
						opacity: 1,
						y: [20, -5, 0],
					}}
					transition={{
						duration: 0.5,
						delay: 0.1,
						ease: [0.4, 0.0, 0.2, 1],
					}}
					className="text-2xl md:text-4xl text-center my-10 font-medium"
				>
					What all can you do?
				</motion.h2>
				<WobbleCardDemo />
			</ViewContainer>
		</main>
	);
}
