import { getVideoTranscript } from './generateTranscript';

async function test() {
    const videoUrl = "https://www.youtube.com/watch?v=E0EY4dxMAxA";
    const transcriptResult = await getVideoTranscript(videoUrl);
    console.log(transcriptResult);
}
test();