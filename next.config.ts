import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",   // SSG: 정적 파일만 출력 (서버 불필요)
  trailingSlash: true, // 웹뷰 로컬 파일 경로 호환성
  images: {
    unoptimized: true, // SSG에서는 Image Optimization API 사용 불가
  },
};

export default nextConfig;
