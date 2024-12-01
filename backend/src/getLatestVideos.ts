import axios from "axios";

const getLatestVideos = async (channelId: string, maxResults: number = 5) => {
    const apiUrl = `https://www.googleapis.com/youtube/v3/search`;
    const videoDetailsApiUrl = `https://www.googleapis.com/youtube/v3/videos`;

    const searchParams = {
        channelId,
        key: process.env.API_KEY,
        part: "snippet",
        order: "date",
        type: "video",
        maxResults,
    };

    try {
        const searchResponse = await axios.get(apiUrl, { params: searchParams });
        const videos = searchResponse.data.items;

        if (videos && videos.length > 0) {
            const videoIds = videos.map((video: any) => video.id.videoId).join(",");
            const detailsParams = {
                id: videoIds,
                key: process.env.API_KEY,
                part: "snippet,statistics",
            };

            const detailsResponse = await axios.get(videoDetailsApiUrl, {
                params: detailsParams,
            });

            const videoDetails = detailsResponse.data.items;

            let channelLogo = await getChannelLogo(channelId);

            const latestVideos = videoDetails.map((video: any) => {
                const snippet = video.snippet;
                const stats = video.statistics;

                return {
                    title: snippet.title,
                    link: `https://www.youtube.com/watch?v=${video.id}`,
                    videoId: video.id,
                    thumbnailUrl: snippet.thumbnails?.maxres?.url || snippet.thumbnails?.medium?.url || null,
                    likes: stats.likeCount || "N/A",
                    views: stats.viewCount,
                    channel: {
                        name: snippet.channelTitle,
                        link: `https://www.youtube.com/channel/${snippet.channelId}`,
                        imageUrl: channelLogo,
                    },
                    publishDate: snippet.publishedAt,
                };
            });

            while (latestVideos.length < maxResults) {
                latestVideos.push({
                    title: "No title",
                    link: "",
                    thumbnailUrl: "",
                    likes: "N/A",
                    views: "0",
                    channel: {
                        name: "Unknown",
                        link: "",
                        imageUrl: "",
                    },
                    publishDate: "",
                });
            }

            return latestVideos;
        } else {
            console.log("No videos found for the provided channel ID.");
        }
    } catch (error) {
        console.error("Error fetching latest videos:", (error as Error).message);
    }
};

async function getChannelLogo(channelId: string) {
    const channelApiUrl = "https://www.googleapis.com/youtube/v3/channels";

    const paramsForChannel = {
        id: channelId,
        key: process.env.API_KEY,
        part: "snippet",
    };

    const response = await axios.get(channelApiUrl, { params: paramsForChannel });

    return response.data.items[0].snippet.thumbnails.high.url;
}

export default getLatestVideos;
