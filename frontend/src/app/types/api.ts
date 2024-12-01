interface ChannelMetadata {
	name: string;
	link: string;
	imageUrl: string;
}

export interface VideoMetadata {
	title: string;
	link: string;
	thumbnailUrl: string;
	likes: string;
	views: string;
	channel: ChannelMetadata;
	publishDate: string;
}

interface GeneratedContent {
	id: number;
	video_id: string;
	twitter_content: string;
	linkdien_content: string;
	blog_post: string;
}

export interface ApiResponse {
	status: string;
	isProcessed: boolean;
	data: GeneratedContent | null;
	metaData: VideoMetadata;
}
