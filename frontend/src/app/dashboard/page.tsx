"use client";
import {
	errorAtom,
	loadingAtom,
	newUserAtom,
	processedVideosAtom,
	unprocessedVideosAtom,
} from "@/app/states";
import NewUser from "@/components/NewUser";
import UnprocessedVideos from "@/components/UnprocessedVideos";
import { VideoDetailsCard } from "@/components/VideoDetailsCard";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useClerk } from "@clerk/nextjs";
import { useAtom } from "jotai";
import { Loader2, ScanEye } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type VideoDetails = {
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
};

const extractVideoId = (url: string) => {
	const regExp =
		/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
	const match = url.match(regExp);
	return match && match[7].length === 11 ? match[7] : null;
};

const Dashboard = () => {
	const { session } = useClerk();
	const [newUser, setNewUser] = useAtom(newUserAtom);
	const [loading, setLoading] = useAtom(loadingAtom);
	const [error, setError] = useAtom(errorAtom);
	const [unprocessedVideos, setUnprocessedVideos] = useAtom(
		unprocessedVideosAtom,
	);
	const [processedVideos, setProcessedVideos] = useAtom(processedVideosAtom);
	const [latestVideo, setLatestVideo] = useState<VideoDetails | null>(null);
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const [latestData, setLatestData] = useState<any>(null);
	const [videoUrl, setVideoUrl] = useState("");

	useEffect(() => {
		const fetchDashboardData = async () => {
			try {
				if (!session) {
					return;
				}

				const token = await session.getToken();

				// Make both API calls in parallel
				const [dashboardResponse, latestResponse] = await Promise.all([
					fetch("http://20.244.84.131:3000/api/dashboard", {
						headers: {
							Authorization: `${token}`,
						},
					}),
					fetch("/api/supabase/latest"),
				]);

				const [dashboardData, latestData] = await Promise.all([
					dashboardResponse.json(),
					latestResponse.json(),
				]);

				if (dashboardData.status === "fail") {
					throw new Error("Failed to fetch dashboard data");
				}

				if (latestData.data?.video_details) {
					setLatestVideo(latestData.data.video_details);
				}

				setNewUser(dashboardData.new_user);
				if (dashboardData.unprocessed_videos) {
					setUnprocessedVideos(dashboardData.unprocessed_videos);
				}
				setProcessedVideos(dashboardData.processed_videos);
				setLatestData(latestData);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching dashboard data:", error);
				setError(true);
				setLoading(false);
			}
		};

		fetchDashboardData();
	}, [
		session,
		setNewUser,
		setLoading,
		setError,
		setUnprocessedVideos,
		setProcessedVideos,
	]);

	const handleVideoSubmit = () => {
		const videoId = extractVideoId(videoUrl);
		if (!videoId) {
			toast.error("Please enter a valid YouTube video URL");
			return;
		}
		window.location.href = `/dashboard/videos/${videoId}`;
	};

	if (loading || !latestData) {
		return (
			<div className="flex w-full items-center justify-center h-screen gap-4">
				<Loader2 className="animate-spin" />
				<span>Hang on tight, we are processing your videos...</span>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex w-full items-center justify-center h-screen">
				Something went wrong, please try again later.
			</div>
		);
	}

	if (newUser) {
		return <NewUser />;
	}

	return (
		<div className="p-4 w-full">
			<h1 className="text-2xl font-bold mb-4">Dashboard</h1>
			{processedVideos === null && !latestVideo && (
				<div className="text-gray-600 mb-4 max-w-md space-y-2">
					<ScanEye />
					<p>
						We're constantly watching your YouTube channel. We'll
						process your videos automatically as soon as you upload
						them.
					</p>
				</div>
			)}
			{latestVideo && (
				<div className="mb-6">
					<VideoDetailsCard
						thumbnail={latestVideo.thumbnailUrl}
						title={latestVideo.title}
						link={latestVideo.link}
						channelImage={latestVideo.channel.imageUrl}
						channelName={latestVideo.channel.name}
						channelUrl={latestVideo.channel.link}
						uploadDate={latestVideo.publishDate}
						viewCount={Number.parseInt(latestVideo.views)}
						likes={Number.parseInt(latestVideo.likes)}
						isBlogGenerated={!!latestData?.data?.blog_post}
						isTweetGenerated={!!latestData?.data?.twitter_content}
						isLinkedinGenerated={
							!!latestData?.data?.linkdien_content
						}
					/>
					<div className="mt-4">
						<Link
							href={`/dashboard/videos/${latestData?.data?.video_id}`}
							className={cn(
								buttonVariants({ variant: "outline" }),
							)}
						>
							View Details
							{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
							<svg
								className="w-4 h-4 ml-2"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M9 5l7 7-7 7"
								/>
							</svg>
						</Link>
					</div>
				</div>
			)}
			<div className="mb-6 space-y-4">
				<div className="flex gap-4 items-end">
					<div className="flex-1">
						<label
							htmlFor="videoUrl"
							className="text text-gray-600 mb-2 block"
						>
							Enter link to any video you want to generate content
							for
						</label>
						<Input
							id="videoUrl"
							value={videoUrl}
							onChange={e => setVideoUrl(e.target.value)}
							placeholder="https://www.youtube.com/watch?v=..."
						/>
					</div>
					<Link
						href="#"
						onClick={e => {
							e.preventDefault();
							handleVideoSubmit();
						}}
						className={cn(buttonVariants({ variant: "outline" }))}
					>
						Generate Content
					</Link>
				</div>
			</div>
			{unprocessedVideos ? (
				<UnprocessedVideos videos={unprocessedVideos} />
			) : (
				<div className="flex w-full items-center justify-center h-screen">
					<Loader2 className="animate-spin" />
					Hang on tight, we are processing your videos...
				</div>
			)}
		</div>
	);
};

export default Dashboard;
