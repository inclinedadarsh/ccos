"use client";

import { BlogPostCard } from "@/components/BlogPostCard";
import { LinkedInPostCard } from "@/components/LinkedInPostCard";
import { TwitterPostCard } from "@/components/TwitterPostCard";
import { VideoDetailsCard } from "@/components/VideoDetailsCard";
import { useEffect, useState } from "react";

const VIDEO_DATA = {
	title: "Why Everyone Loves Zustand",
	link: "https://www.youtube.com/watch?v=14B85quRQhw",
	thumbnail: "https://i.ytimg.com/vi/14B85quRQhw/hqdefault.jpg",
	likes: 2749,
	viewCount: 109224,
	channelName: "Theo - t3․gg",
	channelUrl: "https://www.youtube.com/channel/UCbRP3c757lWg9M-U7TyEkXA",
	channelImage:
		"https://yt3.ggpht.com/4NapxEtLcHQ6wN2zA_DMmkOk47RFb_gy6sjSmUZGg_ARHjlIUjFsrNFddrcKMkTYpBNxCp3J=s800-c-k-c0x00ffffff-no-rj",
	uploadDate: "2024-09-16T05:50:38Z",
};

const INITIAL_TWEET =
	"Just watched an amazing video! Check out this incredible content that dives deep into fascinating topics. Must watch! #ContentCreation #MustWatch";

const INITIAL_LINKEDIN_POST = `Exciting Content Alert!

Just discovered an incredible video that's packed with valuable insights. This content perfectly illustrates the power of effective communication and knowledge sharing.

#ProfessionalDevelopment #ContentCreation #Learning`;

const INITIAL_BLOG_POST = `# Why Everyone Loves Zustand: A Deep Dive

## Introduction
In the ever-evolving landscape of state management solutions for React applications, Zustand has emerged as a popular choice among developers. This lightweight yet powerful library offers a refreshingly simple approach to managing state.

## Key Highlights from the Video

### 1. Simplicity First
- No boilerplate code required
- Intuitive API that feels natural to React developers
- Zero dependencies and tiny bundle size

### 2. Powerful Features
- Built-in devtools integration
- Middleware support for advanced use cases
- TypeScript support out of the box

### 3. Performance Benefits
- Minimal re-renders by default
- Efficient state updates
- Small memory footprint

## Code Examples

\`\`\`typescript
import create from 'zustand'

interface StoreState {
  count: number
  increment: () => void
}

const useStore = create<StoreState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}))
\`\`\`

## Conclusion
Zustand proves that state management doesn't have to be complicated. Its minimalist approach, combined with powerful features, makes it an excellent choice for both small and large React applications.

#React #JavaScript #WebDevelopment #Zustand #StateMagement`;

export default function VideoPage({ params }: { params: { videoId: string } }) {
	const [tweet, setTweet] = useState(INITIAL_TWEET);
	const [linkedinPost, setLinkedinPost] = useState(INITIAL_LINKEDIN_POST);
	const [blogPost, setBlogPost] = useState(INITIAL_BLOG_POST);

	useEffect(() => {
		console.log("Video ID from path:", params.videoId);
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
					<VideoDetailsCard
						thumbnail={VIDEO_DATA.thumbnail}
						title={VIDEO_DATA.title}
						link={VIDEO_DATA.link}
						channelImage={VIDEO_DATA.channelImage}
						channelName={VIDEO_DATA.channelName}
						channelUrl={VIDEO_DATA.channelUrl}
						uploadDate={VIDEO_DATA.uploadDate}
						viewCount={VIDEO_DATA.viewCount}
						likes={VIDEO_DATA.likes}
						isBlogGenerated={false}
						isTweetGenerated={true}
						isLinkedinGenerated={true}
					/>
				</div>

				<div className="space-y-8">
					<h1 className="text-3xl font-semibold">
						Generated Content
					</h1>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<TwitterPostCard
							tweet={tweet}
							isLoading={false}
							originalTweet={INITIAL_TWEET}
							onTweetChange={value => setTweet(value)}
							onReset={() => setTweet(INITIAL_TWEET)}
							onCopy={copyToClipboard}
						/>
						<LinkedInPostCard
							post={linkedinPost}
							isLoading={false}
							originalPost={INITIAL_LINKEDIN_POST}
							onPostChange={value => setLinkedinPost(value)}
							onReset={() =>
								setLinkedinPost(INITIAL_LINKEDIN_POST)
							}
							onCopy={copyToClipboard}
						/>
					</div>

					<BlogPostCard
						post={blogPost}
						isLoading={false}
						originalPost={INITIAL_BLOG_POST}
						onPostChange={value => setBlogPost(value)}
						onReset={() => setBlogPost(INITIAL_BLOG_POST)}
						onCopy={copyToClipboard}
					/>
				</div>
			</div>
		</div>
	);
}
