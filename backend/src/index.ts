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
import getContent from "./contentGenerator/getContent";
import saveToDb from "./utils/saveToDb";
import checkIfVideoProcessed from "./utils/checkIfVideoProcessed";

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

    const { emailExists, isNewUser, ...data } = await emailExistsInDb(email);

    if (!emailExists) {
      let data = await createUser({
        email,
        new_user: true,
      });

      return c.json({ status: "success", new_user: isNewUser, ...data });
    }

    return c.json({ status: "success", new_user: isNewUser, ...data });
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

    const channelId = await getChannelId(youtubeChannel);
    let latestVideos = [];

    let data = null;

    if (channelId) {
      latestVideos = await getLatestVideos(channelId, 5);

      data = await updateUser(email, {
        server_hook,
        personal_hook,
        youtube_channel_link: youtubeChannel,
        unprocessed_videos: latestVideos,
        new_user: false,
      });
    } else {
      throw new Error("Unable to get channelID : /api/new-user");
    }

    // triggerKestraFlow({email, server_hook, personal_hook, yotube_channel_link, channel_id});

    return c.json({
      status: "success",
      ...data,
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

async function processVid(videoId: string) {
  if (videoId) {
    let videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

    const { isProcessed } = await checkIfVideoProcessed(videoId);

    let videoDetails = await getVideoStats(videoUrl);
    if (!isProcessed) {
      await saveToDb({ videoId, videoDetails });

      await getContent(videoId);
    }
  }
}

app.get("/api/kestra_generate_content", async (c) => {
  const videoId = c.req.query().video_id;
  const email = c.req.query().email;

  let videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

  try {
    processVid(videoId).then((res) => {
      updateUser(email, { processed_videos: videoUrl });
    });

    return c.json({
      status: "success",
    });
  } catch (error) {
    console.log((error as Error).message);
    return c.json({ status: "fail" });
  }
});

app.get("/api/generate_content", async (c) => {
  const videoId = c.req.query().video_id;

  try {
    if (videoId) {
      let videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

      const { isProcessed, data } = await checkIfVideoProcessed(videoId);

      let videoDetails = await getVideoStats(videoUrl);
      if (!isProcessed) {
        await saveToDb({ videoId, videoDetails });

        getContent(videoId);
      }

      return c.json({
        status: "success",
        isProcessed,
        data,
        metaData: videoDetails,
      });
    }
  } catch (error) {
    console.log((error as Error).message);
    return c.json({ status: "fail" });
  }
});

app.get("/hi", (c) => {
  return c.json({ hi: "hi" });
});

export default app;
