import { NextResponse } from "next/server";
import { videoFileAnalytics } from "./metadata";

export async function POST(req: Request): Promise<NextResponse> {
  const formData = await req.formData();
  const videoFile: File = formData.get("videoFile") as File;

  const videoMetadata = await videoFileAnalytics(videoFile);
  if (!videoMetadata) {
    return NextResponse.json(
      { error: "Metadata could not be parsed" },
      { status: 500 }
    );
  }

  return NextResponse.json(
    {
      title: formData.get("title") as string,
      videoMetadata: videoMetadata,
    },
    { status: 200 }
  );
}
