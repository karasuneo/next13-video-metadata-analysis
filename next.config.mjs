/** @type {import('next').NextConfig} */
const nextConfig = {
  // 以下を追加
  experimental: {
    serverComponentsExternalPackages: ["fluent-ffmpeg"],
  },
  // ここまで追加
};

export default nextConfig;
