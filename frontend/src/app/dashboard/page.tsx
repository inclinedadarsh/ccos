"use client";
import { errorAtom, loadingAtom, newUserAtom } from "@/app/states";
import NewUser from "@/components/NewUser";
import UnprocessedVideos from "@/components/UnprocessedVideos";
import { useClerk } from "@clerk/nextjs";
import { useAtom } from "jotai";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

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
	const { session } = useClerk();
	const [newUser, setNewUser] = useAtom(newUserAtom);
	const [loading, setLoading] = useAtom(loadingAtom);
	const [error, setError] = useAtom(errorAtom);

	useEffect(() => {
		const fetchNewUserStatus = async () => {
			try {
				if (!session) {
					return;
				}

				const token = await session.getToken();
				const response = await fetch(
					"http://20.244.84.131:3000/api/dashboard",
					{
						headers: {
							Authorization: `${token}`,
						},
					},
				);
				const data = await response.json();
				if (data.status === "fail") {
					throw new Error("Failed to fetch new user status");
				}
				setNewUser(data.new_user);
				console.log(data);
			} catch (error) {
				console.error("Error fetching new user status:", error);
				setError(true);
			} finally {
				setLoading(false);
			}
		};

		fetchNewUserStatus();
	}, [session, setNewUser, setLoading, setError]);

	if (loading) {
		return (
			<div className="flex w-full items-center justify-center h-screen gap-4">
				<Loader2 className="animate-spin" />
				Hang on tight, we are processing your videos...
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex w-full items-center justify-center h-screen">
				Something went wrong, please try again later.
			</div>
		);
	}

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
