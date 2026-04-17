import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        {/* 모바일 웹뷰 최적화 */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="성별 예측" />
        <meta name="format-detection" content="telephone=no" />

        {/* OpenGraph (공유용 기본값) */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="성별 예측" />
        <meta property="og:title" content="17가지 성별 예측 · AI 통합" />
        <meta property="og:description" content="전통 17가지 알고리즘 + AI 통합 + 역방향 플래너로 태아 성별을 예측해보세요" />
        <meta property="og:locale" content="ko_KR" />
        <meta name="twitter:card" content="summary" />

        {/* 파비콘 */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
