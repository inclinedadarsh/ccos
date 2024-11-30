"use client";

import {
	linkedinLoadingAtom,
	linkedinPostAtom,
	tweetAtom,
	tweetLoadingAtom,
	videoDataAtom,
	videoLoadingAtom,
} from "@/app/states";
import { VideoDetailsCard } from "@/components/VideoDetailsCard";
import { SiLinkedin, SiX, SiYoutube } from "@icons-pack/react-simple-icons";
import { useAtom } from "jotai";
import { Calendar, Eye, Loader2, ThumbsUp } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

const createTwitterIntent = (text: string) => {
	return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
};

// Add this interface for type safety
interface VideoStats {
	title: string;
	link: string;
	thumbnailUrl: string;
	likes: string;
	views: string;
	channel: {
		name: string;
		link: string;
		imageUrl: string;
	};
	publishDate: string;
}

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
				const response = await fetch(
					`http://20.244.84.131:3000/get_video_stats?video_link=${encodeURIComponent(url)}`,
				);

				if (!response.ok) {
					throw new Error("Failed to fetch video data");
				}

				const data: VideoStats = await response.json();
				setVideoData({
					title: data.title,
					link: data.link,
					thumbnail: data.thumbnailUrl,
					channelName: data.channel.name,
					channelUrl: data.channel.link,
					channelImage: data.channel.imageUrl,
					viewCount: Number.parseInt(data.views),
					likes: Number.parseInt(data.likes),
					uploadDate: data.publishDate,
				});
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
			<div className="max-w-6xl mx-auto space-y-8">
				<h1 className="text-2xl font-medium">Video Details</h1>

				<VideoDetailsCard
					thumbnail={videoData.thumbnail}
					title={videoData.title}
					link={videoData.link}
					channelImage={videoData.channelImage}
					channelName={videoData.channelName}
					channelUrl={videoData.channelUrl}
					uploadDate={videoData.uploadDate}
					viewCount={videoData.viewCount}
					likes={videoData.likes}
				/>

				<h1 className="text-2xl font-medium pt-4">Generated Content</h1>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div className="bg-white rounded-lg shadow-lg p-6 border border-border">
						<div className="flex items-center gap-2 mb-4">
							<SiX size={20} className=" text-[#1DA1F2]" />
							<h2 className="text-xl font-medium">
								Generated Tweet
							</h2>
						</div>
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
										<SiX />
										Tweet This
									</Link>
								</div>
							</div>
						)}
					</div>

					<div className="bg-white rounded-lg shadow-lg p-6 border border-border">
						<div className="flex items-center gap-2 mb-4">
							<SiLinkedin size={20} className=" text-[#0A66C2]" />
							<h2 className="text-xl font-medium">
								Generated LinkedIn Post
							</h2>
						</div>
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
