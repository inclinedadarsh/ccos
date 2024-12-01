"use client";

import type { ApiResponse, VideoMetadata } from "@/app/types/api";
import { BlogPostCard } from "@/components/BlogPostCard";
import { LinkedInPostCard } from "@/components/LinkedInPostCard";
import { TwitterPostCard } from "@/components/TwitterPostCard";
import { VideoDetailsCard } from "@/components/VideoDetailsCard";
import { useEffect, useState } from "react";

interface ContentState {
	exists: boolean;
	content: string | null;
	isLoading: boolean;
}

export default function VideoPage({ params }: { params: { videoId: string } }) {
	const [tweet, setTweet] = useState<string>("");
	const [linkedinPost, setLinkedinPost] = useState<string>("");
	const [blogPost, setBlogPost] = useState<string>("");

	const [tweetState, setTweetState] = useState<ContentState>({
		exists: false,
		content: null,
		isLoading: true,
	});
	const [linkedinState, setLinkedinState] = useState<ContentState>({
		exists: false,
		content: null,
		isLoading: true,
	});
	const [blogState, setBlogState] = useState<ContentState>({
		exists: false,
		content: null,
		isLoading: true,
	});

	const [videoMetadata, setVideoMetadata] = useState<VideoMetadata | null>(
		null,
	);

	useEffect(() => {
		const checkContentStatus = async () => {
			try {
				const response = await fetch(
					`http://20.244.84.131:3000/api/generate_content?video_id=${params.videoId}`,
				);
				const data: ApiResponse = await response.json();

				if (data.metaData) {
					setVideoMetadata(data.metaData);
				}

				if (data.isProcessed && data.data) {
					setTweetState({
						exists: true,
						content: data.data.twitter_content,
						isLoading: false,
					});
					setTweet(data.data.twitter_content);

					setLinkedinState({
						exists: true,
						content: data.data.linkdien_content,
						isLoading: false,
					});
					setLinkedinPost(data.data.linkdien_content);

					setBlogState({
						exists: true,
						content: data.data.blog_post,
						isLoading: false,
					});
					setBlogPost(data.data.blog_post);
				} else {
					const pollInterval = setInterval(async () => {
						try {
							const supabaseResponse = await fetch(
								"/api/supabase/content",
								{
									method: "POST",
									headers: {
										"Content-Type": "application/json",
									},
									body: JSON.stringify({
										videoId: params.videoId,
									}),
								},
							);
							const supabaseData = await supabaseResponse.json();

							setTweetState({
								exists: supabaseData.twitter.exists,
								content: supabaseData.twitter.content,
								isLoading: !supabaseData.twitter.exists,
							});
							if (supabaseData.twitter.exists) {
								setTweet(supabaseData.twitter.content);
							}

							setLinkedinState({
								exists: supabaseData.linkedin.exists,
								content: supabaseData.linkedin.content,
								isLoading: !supabaseData.linkedin.exists,
							});
							if (supabaseData.linkedin.exists) {
								setLinkedinPost(supabaseData.linkedin.content);
							}

							setBlogState({
								exists: supabaseData.blog.exists,
								content: supabaseData.blog.content,
								isLoading: !supabaseData.blog.exists,
							});
							if (supabaseData.blog.exists) {
								setBlogPost(supabaseData.blog.content);
							}

							if (
								supabaseData.twitter.exists &&
								supabaseData.linkedin.exists &&
								supabaseData.blog.exists
							) {
								clearInterval(pollInterval);
							}
						} catch (error) {
							console.error("Error fetching content:", error);
						}
					}, 2000);

					return () => clearInterval(pollInterval);
				}
			} catch (error) {
				console.error("Error checking content status:", error);
			}
		};

		checkContentStatus();
	}, [params.videoId]);

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
			console.error("Failed to copy to clipboard");
		}
	};

	return (
		<div className="min-h-screen p-8 w-full">
			<div className="max-w-6xl mx-auto space-y-12">
				<div className="space-y-8">
					<h1 className="text-3xl font-semibold">Video Details</h1>
					{videoMetadata && (
						<VideoDetailsCard
							thumbnail={videoMetadata.thumbnailUrl}
							title={videoMetadata.title}
							link={videoMetadata.link}
							channelImage={videoMetadata.channel.imageUrl}
							channelName={videoMetadata.channel.name}
							channelUrl={videoMetadata.channel.link}
							uploadDate={videoMetadata.publishDate}
							viewCount={Number.parseInt(videoMetadata.views)}
							likes={Number.parseInt(videoMetadata.likes)}
							isBlogGenerated={blogState.exists}
							isTweetGenerated={tweetState.exists}
							isLinkedinGenerated={linkedinState.exists}
						/>
					)}
				</div>

				<div className="space-y-8">
					<h1 className="text-3xl font-semibold">
						Generated Content
					</h1>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<TwitterPostCard
							tweet={tweet}
							isLoading={tweetState.isLoading}
							originalTweet={tweet}
							onTweetChange={value => setTweet(value)}
							onReset={() => setTweet(tweetState.content || "")}
							onCopy={copyToClipboard}
						/>
						<LinkedInPostCard
							post={linkedinPost}
							isLoading={linkedinState.isLoading}
							originalPost={linkedinPost}
							onPostChange={value => setLinkedinPost(value)}
							onReset={() =>
								setLinkedinPost(linkedinState.content || "")
							}
							onCopy={copyToClipboard}
						/>
					</div>

					<BlogPostCard
						post={blogPost}
						isLoading={blogState.isLoading}
						originalPost={blogPost}
						onPostChange={value => setBlogPost(value)}
						onReset={() => setBlogPost(blogState.content || "")}
						onCopy={copyToClipboard}
					/>
				</div>
			</div>
		</div>
	);
}
