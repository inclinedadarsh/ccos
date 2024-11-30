"use client";
import Image from "next/image";
import React from "react";
import { WobbleCard } from "./ui/wobble-card";

export function WobbleCardDemo() {
	return (
		<div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
			<WobbleCard
				containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[500px] lg:min-h-[300px]"
				className=""
			>
				<div className="max-w-xs">
					<h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
						Generate Engaging Posts.
					</h2>
					<p className="mt-4 text-left  text-base/6 text-neutral-200">
						Instantly create platform-specific content that captures
						your video's essence. Twitter threads, LinkedIn posts,
						and Instagram captions - all at the click of a button.
					</p>
				</div>
				<Image
					src="/linear.webp"
					width={500}
					height={500}
					alt="linear demo image"
					className="absolute -right-4 lg:-right-[40%] grayscale filter -bottom-10 object-contain rounded-2xl"
				/>
			</WobbleCard>
			<WobbleCard containerClassName="col-span-1 min-h-[300px]">
				<h2 className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
					Craft Compelling Blogs.
				</h2>
				<p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
					Turn your video insights into long-form content that drives
					traffic and establishes thought leadership. SEO-optimized
					blog posts that tell your story.
				</p>
			</WobbleCard>
			<WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
				<div className="max-w-sm">
					<h2 className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
						Personalized Announcements!
					</h2>
					<p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
						Create tailored, platform-specific announcements that
						resonate with your audience. Each piece of content
						uniquely crafted to maximize engagement.
					</p>
				</div>
				<Image
					src="/linear.webp"
					width={500}
					height={500}
					alt="linear demo image"
					className="absolute -right-10 md:-right-[40%] lg:-right-[20%] -bottom-10 object-contain rounded-2xl"
				/>
			</WobbleCard>
		</div>
	);
}
