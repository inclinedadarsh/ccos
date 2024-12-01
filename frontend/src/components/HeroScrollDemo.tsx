"use client";
import React from "react";
import { ContainerScroll } from "./ui/container-scroll-animation";

export function HeroScrollDemo() {
	return (
		<div className="flex flex-col overflow-hidden -mt-[20rem]">
			<ContainerScroll
				titleComponent={
					// biome-ignore lint/complexity/noUselessFragments: <explanation>
					<></>
				}
			>
				<iframe
					title="vimeo-player"
					src="https://player.vimeo.com/video/1034899369?h=1ef6cbd109"
					frameBorder="0"
					allowFullScreen
					className="w-full aspect-video"
				/>
			</ContainerScroll>
		</div>
	);
}
