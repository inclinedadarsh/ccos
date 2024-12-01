"use client";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface LinkedInResponse {
	data: {
		id: number;
		video_id: string;
		linkdien_content: string;
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
	}[];
}

export default function LinkedInPage() {
	const [posts, setPosts] = useState<LinkedInResponse>();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const response = await fetch("/api/supabase/tweets");
				if (!response.ok) {
					throw new Error("Failed to fetch LinkedIn posts");
				}
				const data = await response.json();
				setPosts(data);
			} catch (err) {
				setError(
					err instanceof Error
						? err.message
						: "Failed to load LinkedIn posts",
				);
			} finally {
				setLoading(false);
			}
		};

		fetchPosts();
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
			<h1 className="text-2xl font-bold mb-4">LinkedIn Posts</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{posts?.data?.map(post => (
					<div
						key={post.id}
						className="p-6 border rounded-lg bg-white hover:shadow-md transition-shadow"
					>
						<div className="mb-4">
							<p className="text-sm whitespace-pre-wrap">
								{post.linkdien_content}
							</p>
						</div>

						<div className="flex items-center gap-4 mb-4">
							{post.video_details && (
								<p className="text-gray-600 font-medium mb-2 line-clamp-1">
									{post.video_details.title}
								</p>
							)}
						</div>

						<Link
							href={`/dashboard/videos/${post.video_id}`}
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
