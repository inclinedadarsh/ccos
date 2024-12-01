"use client";
import {
	errorAtom,
	loadingAtom,
	newUserAtom,
	processedVideosAtom,
	unprocessedVideosAtom,
} from "@/app/states";
import NewUser from "@/components/NewUser";
import UnprocessedVideos from "@/components/UnprocessedVideos";
import { useClerk } from "@clerk/nextjs";
import { useAtom } from "jotai";
import { Loader2, ScanEye } from "lucide-react";
import { useEffect } from "react";

const Dashboard = () => {
	const { session } = useClerk();
	const [newUser, setNewUser] = useAtom(newUserAtom);
	const [loading, setLoading] = useAtom(loadingAtom);
	const [error, setError] = useAtom(errorAtom);
	const [unprocessedVideos, setUnprocessedVideos] = useAtom(
		unprocessedVideosAtom,
	);
	const [processedVideos, setProcessedVideos] = useAtom(processedVideosAtom);

	useEffect(() => {
		const fetchDashboardData = async () => {
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
					throw new Error("Failed to fetch dashboard data");
				}
				setNewUser(data.new_user);
				if (data.unprocessed_videos) {
					setUnprocessedVideos(data.unprocessed_videos);
				}
				setProcessedVideos(data.processed_videos);
			} catch (error) {
				console.error("Error fetching dashboard data:", error);
				setError(true);
			} finally {
				setLoading(false);
			}
		};

		fetchDashboardData();
	}, [
		session,
		setNewUser,
		setLoading,
		setError,
		setUnprocessedVideos,
		setProcessedVideos,
	]);

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
			{processedVideos === null && (
				<div className="text-gray-600 mb-4 max-w-md space-y-2">
					<ScanEye />
					<p>
						We're constantly watching your YouTube channel. We'll
						process your videos automatically as soon as you upload
						them.
					</p>
				</div>
			)}
			{unprocessedVideos ? (
				<UnprocessedVideos videos={unprocessedVideos} />
			) : (
				<div className="flex w-full items-center justify-center h-screen">
					<Loader2 className="animate-spin" />
					Hang on tight, we are processing your videos...
				</div>
			)}
		</div>
	);
};

export default Dashboard;
