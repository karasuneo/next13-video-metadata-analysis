import { existsSync, mkdirSync, unlinkSync } from "fs";
import { writeFile } from "fs/promises";
import path from "path";
import { FfprobeData, ffprobe } from "fluent-ffmpeg";
import { VIDEO_FILE_PATH } from "@/const";

export async function videoFileAnalytics(file: File) {
  if (!existsSync(VIDEO_FILE_PATH)) {
    mkdirSync(VIDEO_FILE_PATH);
  }

  const buffer = Buffer.from(await file?.arrayBuffer());
  const fileName = `${file.name}.mp4`;
  const filePath = path.join(VIDEO_FILE_PATH, fileName);
  const getMetadata = (filePath: string): Promise<FfprobeData | undefined> => {
    return new Promise((resolve, reject) => {
      ffprobe(filePath, (e, metadata) => {
        if (e) {
          reject(undefined);
        } else {
          resolve(metadata);
        }
      });
    });
  };

  await writeFile(filePath, buffer);

  const metadata = await getMetadata(filePath);
  if (!metadata) {
    return undefined;
  }

  unlinkSync(filePath);

  return metadata;
}
