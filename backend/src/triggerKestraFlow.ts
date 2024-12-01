import axios from "axios";

export interface YouTubeLooperData {
  email: string;
  youtube_channel_link: string;
  personal_hook: string;
  channel_id: string;
  server_hook: string;
}

export async function triggerKestraFlow(data: YouTubeLooperData) {
  const url = `http://${process.env.SERVER_IP}:8080/api/v1/executions/company.team/youtube_looper`;

  try {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("youtube_channel_link", data.youtube_channel_link);
    formData.append("personal_hook", data.personal_hook);
    formData.append("channel_id", data.channel_id);
    formData.append("server_hook", data.server_hook);

    const response = await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error occurred:",
      error.response ? error.response.data : error.message,
    );
    throw error;
  }
}
