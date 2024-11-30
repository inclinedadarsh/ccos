"use client";
import NewUser from "@/components/NewUser";
import UnprocessedVideos from "@/components/UnprocessedVideos";
import { useState } from "react";

const videos = [
	{
		title: "Swipe Assigment",
		link: "https://www.youtube.com/watch?v=9DnQmmn0fRo",
		thumbnailUrl: "https://i.ytimg.com/vi/9DnQmmn0fRo/hqdefault.jpg",
		likes: "0",
		views: "12",
		channel: {
			name: "Sushant Mishra",
			link: "https://www.youtube.com/channel/UCgMtrCPBEsqSYE2ZM22ooYA",
			imageUrl: "https://i.ytimg.com/vi/9DnQmmn0fRo/default.jpg",
		},
		publishDate: "2024-11-23T11:33:09Z",
	},
	{
		title: "Locus",
		link: "https://www.youtube.com/watch?v=qW-37O67yW0",
		thumbnailUrl: "https://i.ytimg.com/vi/qW-37O67yW0/hqdefault.jpg",
		likes: "1",
		views: "33",
		channel: {
			name: "Sushant Mishra",
			link: "https://www.youtube.com/channel/UCgMtrCPBEsqSYE2ZM22ooYA",
			imageUrl: "https://i.ytimg.com/vi/qW-37O67yW0/default.jpg",
		},
		publishDate: "2024-11-14T09:51:14Z",
	},
	{
		title: "Locus",
		link: "https://www.youtube.com/watch?v=qW-37O67yW0",
		thumbnailUrl: "https://i.ytimg.com/vi/qW-37O67yW0/hqdefault.jpg",
		likes: "1",
		views: "33",
		channel: {
			name: "Sushant Mishra",
			link: "https://www.youtube.com/channel/UCgMtrCPBEsqSYE2ZM22ooYA",
			imageUrl: "https://i.ytimg.com/vi/qW-37O67yW0/default.jpg",
		},
		publishDate: "2024-11-14T09:51:14Z",
	},
	{
		title: "Locus",
		link: "https://www.youtube.com/watch?v=qW-37O67yW0",
		thumbnailUrl: "https://i.ytimg.com/vi/qW-37O67yW0/hqdefault.jpg",
		likes: "1",
		views: "33",
		channel: {
			name: "Sushant Mishra",
			link: "https://www.youtube.com/channel/UCgMtrCPBEsqSYE2ZM22ooYA",
			imageUrl: "https://i.ytimg.com/vi/qW-37O67yW0/default.jpg",
		},
		publishDate: "2024-11-14T09:51:14Z",
	},
	{
		title: "Locus",
		link: "https://www.youtube.com/watch?v=qW-37O67yW0",
		thumbnailUrl: "https://i.ytimg.com/vi/qW-37O67yW0/hqdefault.jpg",
		likes: "1",
		views: "33",
		channel: {
			name: "Sushant Mishra",
			link: "https://www.youtube.com/channel/UCgMtrCPBEsqSYE2ZM22ooYA",
			imageUrl: "https://i.ytimg.com/vi/qW-37O67yW0/default.jpg",
		},
		publishDate: "2024-11-14T09:51:14Z",
	},
];

const Dashboard = () => {
	const [newUser, setNewUser] = useState(false);

	if (newUser) {
		return <NewUser />;
	}

	return (
		<div className="p-4 w-full">
			<h1 className="text-2xl font-bold mb-4">Dashboard</h1>
			<UnprocessedVideos videos={videos} />
		</div>
	);
};

export default Dashboard;
