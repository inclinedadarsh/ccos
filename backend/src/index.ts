import { Hono } from "hono";
import { cors } from "hono/cors";
import getVideoStats from "./getYouTubeStats";
import getChannelId from "./getChannelId";
import getLatestVideos from "./getLatestVideos";

import { createClerkClient } from "@clerk/backend";
import getEmail from "./utils/getEmail";
import emailExistsInDb from "./utils/emailExistsInDb";
import createUser from "./utils/createUser";
import updateUser from "./utils/updateuser";

const app = new Hono();

app.use("/*", cors({ origin: "*" }));

const clerkClient = createClerkClient({
    secretKey: process.env.CLERK_SECRET_KEY,
    publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
});

app.get("/api/dashboard", async (c) => {
    try {
        const jwt_token = c.req.header("Authorization");

        if (!jwt_token) {
            throw new Error("did not get jwt_token");
        }

        let email = await getEmail(clerkClient, jwt_token);

        if (!email) {
            throw new Error("did not get email");
        }

        const [emailExists, isNewUser] = await emailExistsInDb(email); // [emailExists, new_user]

        if (!emailExists) {
            await createUser({
                email,
                new_user: true,
            });
        }

        return c.json({ status: "success", new_user: isNewUser });
    } catch (error) {
        console.log((error as Error).message);
        return c.json({ status: "fail" });
    }
});

app.post("/api/new-user", async (c) => {
    try {
        const jwt_token = c.req.header("Authorization");
        const body = await c.req.json();

        if (!jwt_token) {
            throw new Error("did not get jwt_token");
        }

        let email = await getEmail(clerkClient, jwt_token);

        if (!email) {
            throw new Error("did not get email");
        }

        const server_hook = body.server_hook;
        const personal_hook = body.personal_hook;
        const youtubeChannel = body.channel_link;

        await updateUser(email, {
            server_hook,
            personal_hook,
            youtube_channel_link: youtubeChannel,
            new_user: false,
        });

        const channelId = await getChannelId(youtubeChannel);

        let latestVideos = [];

        if (channelId) {
            latestVideos = await getLatestVideos(channelId, 5);
        } else {
            throw new Error("Unable to get channelID : /api/new-user");
        }

        return c.json({
            status: "success",
            unprocessed_video: latestVideos,
            processed_videos: [],
            new_user: false,
        });
    } catch (error) {
        console.log((error as Error).message);
        return c.json({ status: "fail" });
    }
});

app.get("/get_video_stats", async (c) => {
    const vid_stats = await getVideoStats(c.req.query().video_link);
    if (vid_stats) {
        return c.json({ ...vid_stats, status: "success" });
    }

    return c.json({ status: "fail" });
});

app.get("/get_latest_videos", async (c) => {
    const channel_url = c.req.query().channel_url;
    const channelId = await getChannelId(channel_url);

    if (channelId) {
        const latestVideos = await getLatestVideos(channelId, 5);
        return c.json({ latestVideos, status: "success" });
    }

    return c.json({ status: "fail" });
});

export default app;
