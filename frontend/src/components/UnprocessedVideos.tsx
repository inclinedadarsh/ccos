import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

interface Channel {
	name: string;
	link: string;
	imageUrl: string;
}

interface Video {
	title: string;
	link: string;
	thumbnailUrl: string;
	likes: string;
	views: string;
	channel: Channel;
	publishDate: string;
}

interface UnprocessedVideosProps {
	videos: Video[];
}

const UnprocessedVideos: React.FC<UnprocessedVideosProps> = ({ videos }) => {
	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString();
	};

	return (
		<div className="p-4">
			<h2 className="text-2xl font-bold mb-4">Unprocessed Videos</h2>
			<div className="space-y-4 w-full">
				{videos.map((video, index) => (
					<div
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						key={index}
						className="border rounded-lg p-4 flex items-start space-x-4 w-full"
					>
						<Image
							src={video.thumbnailUrl}
							alt={video.title}
							className="rounded-lg aspect-video max-w-[200px]"
							width={1920}
							height={1080}
						/>
						<div className="flex-grow">
							<h3 className="text-xl font-semibold">
								<a
									href={video.link}
									target="_blank"
									rel="noopener noreferrer"
									className="hover:text-blue-500"
								>
									{video.title}
								</a>
							</h3>

							<div className="flex items-center space-x-2 mt-2">
								<Image
									src={video.channel.imageUrl}
									alt={video.channel.name}
									className="w-8 h-8 rounded-full"
									width={1000}
									height={1000}
								/>
								<Link
									href={video.channel.link}
									target="_blank"
									rel="noopener noreferrer"
									className="text-sm hover:text-blue-500"
								>
									{video.channel.name}
								</Link>
							</div>

							<div className="mt-2 text-gray-600">
								<span>{video.views} views</span>
								<span className="mx-2">•</span>
								<span>{video.likes} likes</span>
								<span className="mx-2">•</span>
								<span>{formatDate(video.publishDate)}</span>
							</div>
						</div>

						<Button
							variant="outline"
							onClick={() =>
								console.log(
									`Generate clicked for video: ${video.title}`,
								)
							}
						>
							Generate
						</Button>
					</div>
				))}
			</div>
		</div>
	);
};

export default UnprocessedVideos;
