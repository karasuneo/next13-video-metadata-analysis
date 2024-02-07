type VideoRequest = {
  title: string;
  videoFile: File;
};

type VideoResponse = {
  title: string;
  videoMetadata: FfprobeData;
};

