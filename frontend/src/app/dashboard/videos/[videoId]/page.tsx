"use client";

import {
	linkedinLoadingAtom,
	linkedinPostAtom,
	originalLinkedinPostAtom,
	originalTweetAtom,
	tweetAtom,
	tweetLoadingAtom,
	videoDataAtom,
	videoLoadingAtom,
} from "@/app/states";
import { LinkedInPostCard } from "@/components/LinkedInPostCard";
import { TwitterPostCard } from "@/components/TwitterPostCard";
import { VideoDetailsCard } from "@/components/VideoDetailsCard";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SiYoutube } from "@icons-pack/react-simple-icons";
import { useAtom } from "jotai";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

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
	const [originalTweet, setOriginalTweet] = useAtom(originalTweetAtom);
	const [originalLinkedinPost, setOriginalLinkedinPost] = useAtom(
		originalLinkedinPostAtom,
	);

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
				setOriginalTweet(data.tweet);
			} catch (error) {
				console.error("Error fetching tweet:", error);
			} finally {
				setIsLoadingTweet(false);
			}
		};

		fetchTweet();
	}, [setTweet, setOriginalTweet, setIsLoadingTweet]);

	useEffect(() => {
		const fetchLinkedinPost = async () => {
			try {
				const response = await fetch("/api/linkedin");
				const data = await response.json();
				setLinkedinPost(data.post);
				setOriginalLinkedinPost(data.post);
			} catch (error) {
				console.error("Error fetching LinkedIn post:", error);
			} finally {
				setIsLoadingLinkedin(false);
			}
		};

		fetchLinkedinPost();
	}, [setLinkedinPost, setOriginalLinkedinPost, setIsLoadingLinkedin]);

	const copyToClipboard = async (
		text: string,
		event: React.MouseEvent<HTMLButtonElement>,
	) => {
		const button = event.currentTarget;
		const originalContent = button.innerHTML;

		try {
			await navigator.clipboard.writeText(text);
			button.innerHTML = `<div class="flex items-center gap-2"><svg class="w-4 h-4" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>`;

			setTimeout(() => {
				button.innerHTML = originalContent;
			}, 2000);
		} catch (err) {
			toast.error("Failed to copy to clipboard");
		}
	};

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
			<div className="max-w-6xl mx-auto space-y-12">
				<div className="space-y-8">
					<h1 className="text-3xl font-semibold">Video Details</h1>
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
				</div>

				<div className="space-y-8">
					<h1 className="text-3xl font-semibold">
						Generated Content
					</h1>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<TwitterPostCard
							tweet={tweet}
							isLoading={isLoadingTweet}
							originalTweet={originalTweet}
							onTweetChange={setTweet}
							onReset={() => setTweet(originalTweet)}
							onCopy={copyToClipboard}
						/>
						<LinkedInPostCard
							post={linkedinPost}
							isLoading={isLoadingLinkedin}
							originalPost={originalLinkedinPost}
							onPostChange={setLinkedinPost}
							onReset={() =>
								setLinkedinPost(originalLinkedinPost)
							}
							onCopy={copyToClipboard}
						/>
					</div>
				</div>

				<div className="space-y-8">
					<div className="bg-white rounded-lg shadow-lg p-6 border border-border">
						<div className="flex items-center justify-between mb-4">
							<div className="flex items-center gap-2">
								<SiYoutube size={20} className="text-red-600" />
								<h2 className="text-xl font-medium">
									AI generated Blog Post based on the video
								</h2>
							</div>
							<Link
								href="/sign-up"
								className={cn(
									buttonVariants({ variant: "default" }),
									"flex items-center gap-2",
								)}
							>
								Create account to unlock
							</Link>
						</div>
						<div className="relative">
							{/* Blurred content */}
							<div className="space-y-4 bg-gray-50 p-6 border-border border-2 border-dashed rounded-md  cursor-default">
								<p className="text-gray-800 leading-relaxed blur-[6px] pointer-events-none">
									Lorem ipsum dolor sit amet consectetur
									adipisicing elit. At temporibus minus rem
									reiciendis magni porro. Est qui ratione
									quidem fugit? Hic autem sequi officia porro
									recusandae ab. Labore, nostrum perferendis.
								</p>
								<p className="text-gray-800 leading-relaxed blur-[6px] pointer-events-none">
									Lorem ipsum dolor sit amet, consectetur
									adipisicing elit. Ipsum iste sint tempore
									illum excepturi sit veniam consectetur,
									asperiores recusandae dignissimos beatae
									architecto ipsa aliquam cum fugit adipisci
									totam accusamus? Ipsum vero delectus saepe,
									ad atque libero pariatur eveniet excepturi?
									Tempore officia quasi, maiores amet
									consectetur aut, vero voluptates beatae
									fugiat veniam harum labore error et commodi
									laudantium voluptas repellat debitis?
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
