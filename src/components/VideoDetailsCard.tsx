import { SiYoutube } from "@icons-pack/react-simple-icons";
import { Calendar, Eye, ThumbsUp } from "lucide-react";
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
}: VideoDetailsCardProps) {
	return (
		<div className="bg-white rounded-lg shadow-lg overflow-hidden border border-border">
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
				</div>
			</div>
		</div>
	);
}
