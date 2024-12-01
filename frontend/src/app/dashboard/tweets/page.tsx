"use client";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface TweetResponse {
	data: {
		id: number;
		video_id: string;
		twitter_content: string;
		generate_time: string;
		video_details: {
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
		linkdien_content: string;
		blog_post: string;
	}[];
}

export default function TweetsPage() {
	const [tweets, setTweets] = useState<TweetResponse>();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchTweets = async () => {
			try {
				const response = await fetch("/api/supabase/tweets");
				if (!response.ok) {
					throw new Error("Failed to fetch tweets");
				}
				const data = await response.json();
				console.log("Fetched tweets:", data);
				setTweets(data);
			} catch (err) {
				setError(
					err instanceof Error
						? err.message
						: "Failed to load tweets",
				);
			} finally {
				setLoading(false);
			}
		};

		fetchTweets();
	}, []);

	if (loading)
		return (
			<div className="h-[calc(100vh-4rem)] flex items-center justify-center">
				<div className="flex flex-col items-center gap-2">
					<Loader2 className="h-8 w-8 animate-spin text-gray-500" />
					<p className="text-gray-500">Loading posts...</p>
				</div>
			</div>
		);
	if (error) return <div>Error: {error}</div>;

	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-4">Tweets</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{tweets?.data?.map(tweet => (
					<div
						key={tweet.id}
						className="p-4 border rounded-lg bg-white hover:shadow-md transition-shadow"
					>
						<p className="text-sm mb-3 p-3 bg-gray-50 rounded-md border-2 border-dashed">
							{tweet.twitter_content}
						</p>
						{tweet.video_details && (
							<p className="text-gray-600 font-medium mb-2 line-clamp-1">
								{tweet.video_details.title}
							</p>
						)}
						<Link
							href={`/dashboard/videos/${tweet.video_id}`}
							className={cn(
								buttonVariants({
									variant: "outline",
									size: "sm",
								}),
							)}
						>
							View video →
						</Link>
					</div>
				))}
			</div>
		</div>
	);
}
