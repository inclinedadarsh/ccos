import axios from "axios";

const extractVideoId = (url: string): string | null => {
    const urlPattern =
        /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/;
    const match = url.match(urlPattern);
    return match ? match[1] : null;
};

const getVideoStats = async (videoUrl: string) => {
    const videoId = extractVideoId(videoUrl);

    if (!videoId) {
        console.error("Invalid YouTube video URL");
        return;
    }

    const apiUrl = `https://www.googleapis.com/youtube/v3/videos`;
    const params = {
        id: videoId,
        key: process.env.API_KEY,
        part: "snippet,statistics",
    };

    const channelApiUrl = "https://www.googleapis.com/youtube/v3/channels";

    try {
        const response = await axios.get(apiUrl, { params });
        const videoData = response.data;

        if (videoData.items && videoData.items.length > 0) {
            const video = videoData.items[0];
            const snippet = video.snippet;
            const stats = video.statistics;

            const details = {
                title: snippet.title,
                link: `https://www.youtube.com/watch?v=${videoId}`,
                thumbnailUrl: snippet.thumbnails.high.url,
                likes: stats.likeCount || "N/A",
                views: stats.viewCount,
                channel: {
                    name: snippet.channelTitle,
                    link: `https://www.youtube.com/channel/${snippet.channelId}`,
                    imageUrl: snippet.thumbnails.default.url,
                },
                publishDate: snippet.publishedAt,
            };

            const paramsForChannel = {
                id: snippet.channelId,
                key: process.env.API_KEY,
                part: "snippet"
            };

            const response = await axios.get(channelApiUrl, { params: paramsForChannel });

            details.channel.imageUrl = response.data.items[0].snippet.thumbnails.high.url;

            return details;
        } else {
            console.log("No data found for the provided video ID.");
        }
    } catch (error) {
        console.error("Error fetching video stats:", (error as Error).message);
    }
};

export default getVideoStats;
