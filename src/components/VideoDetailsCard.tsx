import { SiYoutube } from "@icons-pack/react-simple-icons";
import { Calendar, Eye, ThumbsUp } from "lucide-react";
import Image from "next/image";

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
				<div className="w-full lg:w-1/2 p-6">
					<div className="flex items-center gap-2 mb-4">
						<SiYoutube size={20} className="text-red-600" />
						<h2 className="text-xl font-medium">
							<a
								href={link}
								target="_blank"
								rel="noopener noreferrer"
								className="hover:text-blue-600 hover:underline"
							>
								{title}
							</a>
						</h2>
					</div>

					<div className="space-y-4 text-gray-600">
						<div className="flex items-center gap-3">
							<img
								src={channelImage}
								alt={channelName}
								className="w-10 h-10 rounded-full"
							/>
							<a
								href={channelUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="text-blue-600 hover:underline"
							>
								{channelName}
							</a>
						</div>
						<div className="flex flex-wrap gap-4 text-sm">
							<span className="flex items-center gap-2">
								<Calendar className="w-4 h-4" />
								{new Date(uploadDate).toLocaleDateString()}
							</span>
							<span className="flex items-center gap-2">
								<Eye className="w-4 h-4" />
								{viewCount.toLocaleString()} views
							</span>
							<span className="flex items-center gap-2">
								<ThumbsUp className="w-4 h-4" />
								{likes.toLocaleString()} likes
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
