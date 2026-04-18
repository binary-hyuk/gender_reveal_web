import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",        // SSG: 정적 파일만 출력
  trailingSlash: true,     // 웹뷰 로컬 파일 경로 호환성
  basePath: isProd ? "/gender_reveal_web" : "",  // GitHub Pages 서브경로
  assetPrefix: isProd ? "/gender_reveal_web/" : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
