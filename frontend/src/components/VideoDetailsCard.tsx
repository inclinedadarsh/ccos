import { BadgeCheck, BadgeX, Calendar, Eye, ThumbsUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface VideoDetailsCardProps {
	thumbnail: string;
	title: string;
	link: string;
	channelImage: string;
	channelName: string;
	channelUrl: string;
	uploadDate: string;
	viewCount: number;
	likes: number;
	isBlogGenerated: boolean;
	isTweetGenerated: boolean;
	isLinkedinGenerated: boolean;
}

export function VideoDetailsCard({
	thumbnail,
	title,
	link,
	channelImage,
	channelName,
	channelUrl,
	uploadDate,
	viewCount,
	likes,
	isBlogGenerated,
	isTweetGenerated,
	isLinkedinGenerated,
}: VideoDetailsCardProps) {
	return (
		<div className="w-full bg-white rounded-lg shadow-lg overflow-hidden border border-border">
			<div className="flex flex-col lg:flex-row">
				<div className="w-full lg:w-1/2 p-4">
					<Image
						src={thumbnail}
						alt={title}
						className="aspect-video w-full h-full object-cover rounded shadow-md"
						width={1000}
						height={1000}
					/>
				</div>
				<div className="w-full lg:w-1/2 p-6 space-y-6">
					<div className="flex items-center gap-2 mb-4">
						<h2 className="text-xl md:text-2xl font-semibold">
							<Link
								href={link}
								target="_blank"
								rel="noopener noreferrer"
								className="hover:text-blue-600 underline"
							>
								{title}
							</Link>
						</h2>
					</div>

					<div className="space-y-4 text-gray-600">
						<div className="flex flex-wrap gap-4">
							<span className="flex items-center gap-2">
								<Calendar size={20} />
								{new Date(uploadDate).toLocaleDateString()}
							</span>
							<span className="flex items-center gap-2">
								<Eye size={20} />
								{viewCount.toLocaleString()} views
							</span>
							<span className="flex items-center gap-2">
								<ThumbsUp size={20} />
								{likes.toLocaleString()} likes
							</span>
						</div>
					</div>
					<div className="flex items-center gap-3">
						<Image
							src={channelImage}
							alt={channelName}
							className="w-8 h-8 rounded-full"
							width={100}
							height={100}
						/>
						<Link
							href={channelUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="text-lg font-medium text-black hover:text-blue-600 hover:underline"
						>
							{channelName}
						</Link>
					</div>

					<div className="flex flex-col space-y-2 text-gray-600">
						<span className="flex items-center gap-2">
							{isBlogGenerated ? (
								<BadgeCheck
									className="text-green-500"
									size={20}
								/>
							) : (
								<BadgeX className="text-red-500" size={20} />
							)}
							{isBlogGenerated
								? "Blog has been generated!"
								: "Blog has not been generated yet"}
						</span>
						<span className="flex items-center gap-2">
							{isTweetGenerated ? (
								<BadgeCheck
									className="text-green-500"
									size={20}
								/>
							) : (
								<BadgeX className="text-red-500" size={20} />
							)}
							{isTweetGenerated
								? "Tweet has been generated!"
								: "Tweet has not been generated yet"}
						</span>
						<span className="flex items-center gap-2">
							{isLinkedinGenerated ? (
								<BadgeCheck
									className="text-green-500"
									size={20}
								/>
							) : (
								<BadgeX className="text-red-500" size={20} />
							)}
							{isLinkedinGenerated
								? "LinkedIn post has been generated!"
								: "LinkedIn post has not been generated yet"}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
