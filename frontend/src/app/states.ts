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
export const discordWebhook1Atom = atom("");
export const discordWebhook2Atom = atom("");
export const youtubeChannelAtom = atom("");
