import axios from "axios";

const getChannelId = async (channelUrl: string): Promise<string | null> => {
    const channelIdPattern = /youtube\.com\/channel\/([^/?]+)/;
    const usernamePattern = /youtube\.com\/user\/([^/?]+)/;
    const customNamePattern = /youtube\.com\/c\/([^/?]+)/;
    const handlePattern = /youtube\.com\/@([^/?]+)/;

    if (channelIdPattern.test(channelUrl)) {
        const match = channelUrl.match(channelIdPattern);
        return match ? match[1] : null;
    } else if (usernamePattern.test(channelUrl)) {
        const match = channelUrl.match(usernamePattern);
        const username = match ? match[1] : null;

        if (username) {
            return await resolveUsernameToChannelId(username);
        }
    } else if (customNamePattern.test(channelUrl)) {
        const match = channelUrl.match(customNamePattern);
        const customName = match ? match[1] : null;

        if (customName) {
            return await resolveCustomNameToChannelId(customName);
        }
    } else if (handlePattern.test(channelUrl)) {
        const match = channelUrl.match(handlePattern);
        const handle = match ? match[1] : null;

        if (handle) {
            return await resolveHandleToChannelId(handle);
        }
    }

    console.error("Invalid YouTube channel URL.");
    return null;
};

const resolveUsernameToChannelId = async (username: string): Promise<string | null> => {
    const apiUrl = `https://www.googleapis.com/youtube/v3/channels`;
    const params = {
        forUsername: username,
        key: process.env.API_KEY,
        part: "id",
    };

    try {
        const response = await axios.get(apiUrl, { params });
        if (response.data.items && response.data.items.length > 0) {
            return response.data.items[0].id;
        }
    } catch (error) {
        console.error("Error resolving username to channel ID:", (error as Error).message);
    }

    return null;
};

const resolveCustomNameToChannelId = resolveUsernameToChannelId; // Similar logic

const resolveHandleToChannelId = async (handle: string): Promise<string | null> => {
    const apiUrl = `https://www.googleapis.com/youtube/v3/search`;
    const params = {
        q: `@${handle}`,
        key: process.env.API_KEY,
        part: "snippet",
        type: "channel",
    };

    try {
        const response = await axios.get(apiUrl, { params });
        if (response.data.items && response.data.items.length > 0) {
            return response.data.items[0].snippet.channelId;
        }
    } catch (error) {
        console.error("Error resolving handle to channel ID:", (error as Error).message);
    }

    return null;
};


export default getChannelId;
