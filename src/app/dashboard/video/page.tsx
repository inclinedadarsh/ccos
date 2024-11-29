"use client";

import {
	linkedinLoadingAtom,
	linkedinPostAtom,
	tweetAtom,
	tweetLoadingAtom,
	videoDataAtom,
	videoLoadingAtom,
} from "@/app/states";
import { useAtom } from "jotai";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

const createTwitterIntent = (text: string) => {
	return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
};

export default function VideoPage() {
	const searchParams = useSearchParams();
	const [loading, setLoading] = useAtom(videoLoadingAtom);
	const [videoData, setVideoData] = useAtom(videoDataAtom);
	const [tweet, setTweet] = useAtom(tweetAtom);
	const [isLoadingTweet, setIsLoadingTweet] = useAtom(tweetLoadingAtom);
	const [linkedinPost, setLinkedinPost] = useAtom(linkedinPostAtom);
	const [isLoadingLinkedin, setIsLoadingLinkedin] =
		useAtom(linkedinLoadingAtom);

	useEffect(() => {
		const fetchVideoData = async () => {
			const url = searchParams.get("url");
			if (!url) {
				toast.error("No YouTube URL provided");
				return;
			}

			try {
				const response = await fetch("/api/youtube", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ url: decodeURIComponent(url) }),
				});

				if (!response.ok) {
					throw new Error("Failed to fetch video data");
				}

				const data = await response.json();
				setVideoData(data);
			} catch (error) {
				console.error("Error:", error);
				toast.error("Failed to fetch video information");
			} finally {
				setLoading(false);
			}
		};

		fetchVideoData();
	}, [searchParams, setVideoData, setLoading]);

	useEffect(() => {
		const fetchTweet = async () => {
			try {
				const response = await fetch("/api/tweet");
				const data = await response.json();
				setTweet(data.tweet);
			} catch (error) {
				console.error("Error fetching tweet:", error);
			} finally {
				setIsLoadingTweet(false);
			}
		};

		fetchTweet();
	}, [setTweet, setIsLoadingTweet]);

	useEffect(() => {
		const fetchLinkedinPost = async () => {
			try {
				const response = await fetch("/api/linkedin");
				const data = await response.json();
				setLinkedinPost(data.post);
			} catch (error) {
				console.error("Error fetching LinkedIn post:", error);
			} finally {
				setIsLoadingLinkedin(false);
			}
		};

		fetchLinkedinPost();
	}, [setLinkedinPost, setIsLoadingLinkedin]);

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<Loader2 className="w-10 h-10 animate-spin" />
			</div>
		);
	}

	if (!videoData) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<p className="text-xl text-red-500">
					Failed to load video data
				</p>
			</div>
		);
	}

	return (
		<div className="min-h-screen p-8">
			<div className="max-w-6xl mx-auto space-y-6">
				<div className="bg-white rounded-lg shadow-lg overflow-hidden">
					<div className="flex">
						<div className="w-1/3 flex-shrink-0">
							<img
								src={videoData.thumbnail}
								alt={videoData.title}
								className="w-full h-full object-cover"
							/>
						</div>
						<div className="w-2/3 p-6">
							<h1 className="text-2xl font-bold mb-2">
								{videoData.title}
							</h1>

							<div className="mb-3 text-gray-600">
								<a
									href={videoData.channelUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-600 hover:underline"
								>
									{videoData.channelName}
								</a>
								<div className="flex gap-3 mt-1 text-sm">
									<span>
										{new Date(
											videoData.uploadDate,
										).toLocaleDateString()}
									</span>
									<span>
										{videoData.viewCount.toLocaleString()}{" "}
										views
									</span>
									<span>
										{Math.floor(videoData.duration / 60)}:
										{(videoData.duration % 60)
											.toString()
											.padStart(2, "0")}
									</span>
								</div>
							</div>

							<div className="mt-4">
								<h2 className="text-lg font-semibold mb-1">
									Description
								</h2>
								<p className="text-gray-700 whitespace-pre-wrap text-sm">
									{videoData.description}
								</p>
							</div>
						</div>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div className="bg-white rounded-lg shadow-lg p-6">
						<h2 className="text-xl font-bold mb-4">
							Generated Tweet
						</h2>
						{isLoadingTweet ? (
							<div className="flex flex-col items-center justify-center py-8">
								<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4" />
								<p className="text-gray-600 text-center">
									Hang on tight, we're generating a tweet for
									you...
								</p>
							</div>
						) : (
							<div className="bg-gray-50 p-4 rounded-md">
								<p className="text-gray-800 whitespace-pre-line">
									{tweet}
								</p>
								<div className="mt-4">
									<Link
										href={createTwitterIntent(tweet)}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center px-4 py-2 bg-[#1DA1F2] text-white rounded-md hover:bg-[#1a8cd8] transition-colors"
									>
										{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
										<svg
											className="w-5 h-5 mr-2"
											fill="currentColor"
											viewBox="0 0 24 24"
										>
											<path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
										</svg>
										Tweet This
									</Link>
								</div>
							</div>
						)}
					</div>

					<div className="bg-white rounded-lg shadow-lg p-6">
						<h2 className="text-xl font-bold mb-4">
							Generated LinkedIn Post
						</h2>
						{isLoadingLinkedin ? (
							<div className="flex flex-col items-center justify-center py-8">
								<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4" />
								<p className="text-gray-600 text-center">
									Crafting a professional LinkedIn post...
								</p>
							</div>
						) : (
							<div className="bg-gray-50 p-4 rounded-md">
								<p className="text-gray-800 whitespace-pre-line">
									{linkedinPost}
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
