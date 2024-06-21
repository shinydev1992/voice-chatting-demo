import { Message } from "ai";
import { NextRequest, NextResponse } from "next/server";
import { ElevenLabsClient } from "elevenlabs";
import { Readable } from "stream";

/**
 * Converts a Node.js Readable stream to a web-compatible ReadableStream.
 * @param {Readable} nodeStream - The Node.js Readable stream
 * @returns {ReadableStream} - The web-compatible ReadableStream
 */
function nodeStreamToWebReadableStream(
  nodeStream: Readable
): ReadableStream<Uint8Array> {
  return new ReadableStream({
    start(controller) {
      nodeStream.on("data", (chunk) => {
        controller.enqueue(new Uint8Array(chunk));
      });
      nodeStream.on("end", () => {
        controller.close();
      });
      nodeStream.on("error", (err) => {
        controller.error(err);
      });
    },
    cancel() {
      nodeStream.destroy();
    }
  });
}

/**
 * Return a stream from the API
 * @param {NextRequest} req - The HTTP request
 * @returns {Promise<NextResponse>} A NextResponse with the streamable response
 */
export async function POST(req: NextRequest) {
  const url = req.url;
  const model = req.nextUrl.searchParams.get("model") ?? "aura-asteria-en";
  const message: Message = await req.json();
  const start = Date.now();

  let text = message.content;

  text = text
    .replaceAll("¡", "")
    .replaceAll("https://", "")
    .replaceAll("http://", "")
    .replaceAll(".com", " dot com")
    .replaceAll(".org", " dot org")
    .replaceAll(".co.uk", " dot co dot UK")
    .replaceAll(/```[\s\S]*?```/g, "\nAs shown on the app.\n")
    .replaceAll(
      /([a-zA-Z0-9])\/([a-zA-Z0-9])/g,
      (match, precedingText, followingText) => {
        return precedingText + " forward slash " + followingText;
      }
    );

  try {
    const headers = new Headers();
    headers.set("X-DG-Latency", `${Date.now() - start}`);
    headers.set("Content-Type", "audio/mp3");

    const elevenlabs = new ElevenLabsClient({
      apiKey: process.env.ELEVENLABS_API_KEY // Ensure this environment variable is set
    });

    const audioStream: Readable = await elevenlabs.generate({
      stream: true,
      voice: "Rachel",
      text: text,
      model_id: "eleven_multilingual_v2"
    });

    const webReadableStream = nodeStreamToWebReadableStream(audioStream);

    return new NextResponse(webReadableStream, {
      headers,
      status: 200
    });
  } catch (error: any) {
    console.error("Error generating audio:", error);
    return new NextResponse(error.message || "Internal Server Error", {
      status: 500
    });
  }
}
