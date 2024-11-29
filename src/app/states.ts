import { atom } from "jotai";

// Video-related atoms
export const videoLoadingAtom = atom(true);
export const videoDataAtom = atom<{
	title: string;
	thumbnail: string;
	channelName: string;
	channelUrl: string;
	duration: number;
	viewCount: number;
	uploadDate: string;
	description: string;
} | null>(null);

// Tweet-related atoms
export const tweetAtom = atom<string>("");
export const tweetLoadingAtom = atom(true);

// LinkedIn-related atoms
export const linkedinPostAtom = atom<string>("");
export const linkedinLoadingAtom = atom(true);

// YouTube link atom (used in the home page)
export const youtubeLinkAtom = atom("");
