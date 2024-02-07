"use client";

import { ChangeEvent, FormEvent, useState } from "react";

export default function Home() {
  const [title, setTitle] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setVideoFile(e.target.files[0]);
    } else {
      setVideoFile(null);
    }
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!videoFile) {
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("videoFile", videoFile);

    await fetch("/api/video", {
      method: "POST",
      body: formData,
    }).then((res) => {
      res.json().then((data) => {
        console.log(data.title);
        console.log(data.videoMetadata);
      });
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        タイトルを入力:
        <input type="title" onChange={handleTitleChange} />
      </label>
      <label>
        ファイルを選択:
        <input type="file" accept=".mp4" onChange={handleFileChange} />
      </label>
      <button type="submit">送信</button>
    </form>
  );
}
