import { Hono } from "hono";
import { cors } from "hono/cors";
import getVideoStats from "./getYouTubeStats";
import getChannelId from "./getChannelId";
import getLatestVideos from "./getLatestVideos";

const app = new Hono();

app.use("/*", cors({ origin: "*" }));

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
  const listLength = Number(c.req.query().list_length);
  if (channelId) {
    const latestVideos = await getLatestVideos(channelId, listLength);
    return c.json({ ...latestVideos, status: "success" });
  }

  return c.json({ status: "fail" });
});

export default app;
