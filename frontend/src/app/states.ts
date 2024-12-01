import { atom } from "jotai";

// Video-related atoms
export const videoLoadingAtom = atom(true);
export const videoDataAtom = atom<{
	title: string;
	link: string;
	thumbnail: string;
	channelName: string;
	channelUrl: string;
	channelImage: string;
	viewCount: number;
	likes: number;
	uploadDate: string;
} | null>(null);

// Tweet-related atoms
export const tweetAtom = atom<string>("");
export const tweetLoadingAtom = atom(true);
export const originalTweetAtom = atom<string>("");

// LinkedIn-related atoms
export const linkedinPostAtom = atom<string>("");
export const linkedinLoadingAtom = atom(true);
export const originalLinkedinPostAtom = atom<string>("");

// YouTube link atom (used in the home page)
export const youtubeLinkAtom = atom("");

// Dashboard-related atoms
export const newUserAtom = atom(false);
export const discordPersonalHookAtom = atom<string>("");
export const discordServerHookAtom = atom<string>("");
export const youtubeChannelAtom = atom("");

export const loadingAtom = atom(true);
export const errorAtom = atom(false);

// Define the video type
type Video = {
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

// Add new videos atom
export const videosAtom = atom<Video[]>([]);
