/**
 * Claude Design 에서 가져온 12개 홈 화면 variant.
 * `/playground` 목록과 `/playground/vN` 풀스크린 미리보기,
 * 그리고 `/playground/vN/ai`, `/playground/vN/planner` 실제 시안 기능 페이지를 제공.
 */
export { V1_Home } from "./variants/v1-asis";
export { V2_Home } from "./variants/v2-deepglass";
export { V3_Home } from "./variants/v3-editorial";
export { V4_Home } from "./variants/v4-aurora";
export { V5_Home } from "./variants/v5-mystic";
export { V6_Home } from "./variants/v6-ailab";
export { V7_Home } from "./variants/v7-chat";
export { V8_Home } from "./variants/v8-gemini";
export { V9_Home } from "./variants/v9-claude";
export { V10_Home } from "./variants/v10-chatgpt";
export { V11_Home } from "./variants/v11-codex";
export { V12_Home } from "./variants/v12-dreamscape";

import type { ComponentType } from "react";
import { V1_Home } from "./variants/v1-asis";
import { V2_Home } from "./variants/v2-deepglass";
import { V3_Home } from "./variants/v3-editorial";
import { V4_Home } from "./variants/v4-aurora";
import { V5_Home } from "./variants/v5-mystic";
import { V6_Home } from "./variants/v6-ailab";
import { V7_Home } from "./variants/v7-chat";
import { V8_Home } from "./variants/v8-gemini";
import { V9_Home } from "./variants/v9-claude";
import { V10_Home } from "./variants/v10-chatgpt";
import { V11_Home } from "./variants/v11-codex";
import { V12_Home } from "./variants/v12-dreamscape";

/** 시안별 테마 토큰. 실제 기능 페이지에서 배경/폰트/악센트를 일관되게 유지. */
export interface VariantTheme {
  /** 페이지 배경 (CSS background-value) */
  bg: string;
  /** 기본 텍스트 색 */
  text: string;
  /** 보조 텍스트 색 */
  textMuted: string;
  /** 강조/버튼 배경 */
  accent: string;
  /** 강조 위 텍스트 색 */
  accentOn: string;
  /** 카드/섹션 배경 */
  cardBg: string;
  /** 카드 테두리 */
  cardBorder: string;
  /** 기본 폰트 스택 */
  font: string;
  /** 세리프 폰트 (선택, 특정 시안 전용) */
  fontSerif?: string;
  /** 모노 폰트 (선택, 코덱스 등) */
  fontMono?: string;
  /** 다크 테마 여부 (입력 필드 등 대비 조정용) */
  dark?: boolean;
}

export interface VariantMeta {
  slug: string;
  title: string;
  subtitle: string;
  group: "origin" | "ai-feel" | "ai-product";
  Component: ComponentType;
  theme: VariantTheme;
}

export const VARIANT_GROUPS: { id: "origin" | "ai-feel" | "ai-product"; title: string; subtitle: string }[] = [
  { id: "origin",     title: "기존 방향",         subtitle: "AS-IS + 초기 탐험 5종" },
  { id: "ai-feel",    title: "AI 기술 감성",       subtitle: "'AI가 일하는 중' 느낌 · 기술적 카피와 데이터 비주얼" },
  { id: "ai-product", title: "AI 프로덕트 오마주", subtitle: "Gemini / Claude / ChatGPT / Codex 감성의 대화 진입점" },
];

const SANS = '"Pretendard Variable", Pretendard, -apple-system, sans-serif';
const SERIF = '"Cormorant Garamond", "Noto Serif KR", serif';
const MONO = '"JetBrains Mono", "SF Mono", ui-monospace, monospace';

export const VARIANTS: VariantMeta[] = [
  {
    slug: "v1", title: "V1 · AS-IS",
    subtitle: "현재 프로덕션 재현 · 파스텔 블루 glassmorphism",
    group: "origin", Component: V1_Home,
    theme: {
      bg: "linear-gradient(160deg, hsl(230 45% 86%) 0%, hsl(230 18% 96%) 100%)",
      text: "hsl(230 20% 13%)", textMuted: "hsl(230 12% 42%)",
      accent: "hsl(230 54% 36%)", accentOn: "#fff",
      cardBg: "rgba(255,255,255,0.55)", cardBorder: "rgba(255,255,255,0.7)",
      font: SANS,
    },
  },
  {
    slug: "v2", title: "V2 · Deep Glassmorphism",
    subtitle: "컬러풀 메쉬 오브 + 강한 블러",
    group: "origin", Component: V2_Home,
    theme: {
      bg: "linear-gradient(135deg, #fce0ec 0%, #e6dcff 40%, #d4e6ff 100%)",
      text: "#2a1560", textMuted: "rgba(26,21,48,0.7)",
      accent: "#7a5aff", accentOn: "#fff",
      cardBg: "rgba(255,255,255,0.55)", cardBorder: "rgba(255,255,255,0.7)",
      font: SANS,
    },
  },
  {
    slug: "v3", title: "V3 · Editorial Magazine",
    subtitle: "세리프 + 잉크 레드 + 비대칭",
    group: "origin", Component: V3_Home,
    theme: {
      bg: "#f5efe3",
      text: "#1a1713", textMuted: "#3a3228",
      accent: "#b23a2a", accentOn: "#f5efe3",
      cardBg: "#fff8ea", cardBorder: "rgba(26,23,19,0.1)",
      font: SANS, fontSerif: SERIF,
    },
  },
  {
    slug: "v4", title: "V4 · Aurora Playful",
    subtitle: "다크 우주 + 애니 오로라 + 별",
    group: "origin", Component: V4_Home,
    theme: {
      bg: "radial-gradient(ellipse at top, #1a0e3d 0%, #0a0518 70%)",
      text: "#ffffff", textMuted: "rgba(255,255,255,0.65)",
      accent: "#a478ff", accentOn: "#fff",
      cardBg: "rgba(255,255,255,0.04)", cardBorder: "rgba(255,255,255,0.12)",
      font: SANS, dark: true,
    },
  },
  {
    slug: "v5", title: "V5 · Minimal Dark Mystic",
    subtitle: "딥 네이비 + 골드 · 타로",
    group: "origin", Component: V5_Home,
    theme: {
      bg: "linear-gradient(180deg, #0a1128 0%, #1a1f3a 100%)",
      text: "#f4e8c8", textMuted: "rgba(244,232,200,0.55)",
      accent: "#c9a961", accentOn: "#0a1128",
      cardBg: "rgba(201,169,97,0.05)", cardBorder: "rgba(201,169,97,0.2)",
      font: SANS, fontSerif: SERIF, dark: true,
    },
  },
  {
    slug: "v6", title: "V6 · AI Lab / Neural",
    subtitle: "다크 + 시안 네온 · 기술 카피",
    group: "ai-feel", Component: V6_Home,
    theme: {
      bg: "#0a0e1a",
      text: "#e4edf5", textMuted: "rgba(228,237,245,0.55)",
      accent: "#4fd6ff", accentOn: "#0a0e1a",
      cardBg: "rgba(79,214,255,0.05)", cardBorder: "rgba(79,214,255,0.15)",
      font: SANS, fontMono: MONO, dark: true,
    },
  },
  {
    slug: "v7", title: "V7 · AI Assistant Chat",
    subtitle: "대화형 진입 (ChatGPT/Copilot)",
    group: "ai-feel", Component: V7_Home,
    theme: {
      bg: "#fafaf7",
      text: "#111827", textMuted: "#6b7280",
      accent: "#2f6bff", accentOn: "#fff",
      cardBg: "#ffffff", cardBorder: "#ececea",
      font: SANS, fontMono: MONO,
    },
  },
  {
    slug: "v8", title: "V8 · Gemini-like",
    subtitle: "4색 Spark + 라이트",
    group: "ai-product", Component: V8_Home,
    theme: {
      bg: "linear-gradient(160deg, #ffffff 0%, #f8f9ff 100%)",
      text: "#202124", textMuted: "#5f6368",
      accent: "#1a73e8", accentOn: "#fff",
      cardBg: "linear-gradient(135deg, #e8f0fe 0%, #f3e8fd 50%, #fce8ec 100%)",
      cardBorder: "rgba(26,115,232,0.12)",
      font: SANS,
    },
  },
  {
    slug: "v9", title: "V9 · Claude-like",
    subtitle: "크림 웜톤 + 세리프 + 코랄",
    group: "ai-product", Component: V9_Home,
    theme: {
      bg: "#faf6f0",
      text: "#1f1a15", textMuted: "#5a4e42",
      accent: "#c15f3c", accentOn: "#faf6f0",
      cardBg: "#fff",
      cardBorder: "rgba(31,26,21,0.08)",
      font: SANS, fontSerif: SERIF, fontMono: MONO,
    },
  },
  {
    slug: "v10", title: "V10 · ChatGPT-like",
    subtitle: "화이트 + 민트 포인트",
    group: "ai-product", Component: V10_Home,
    theme: {
      bg: "#ffffff",
      text: "#0d0d0d", textMuted: "#5d5d5d",
      accent: "#10a37f", accentOn: "#fff",
      cardBg: "#fff", cardBorder: "#ececec",
      font: SANS,
    },
  },
  {
    slug: "v11", title: "V11 · Codex-like",
    subtitle: "다크 에디터 + 신택스",
    group: "ai-product", Component: V11_Home,
    theme: {
      bg: "#0d0f13",
      text: "#e6e8ee", textMuted: "rgba(230,232,238,0.6)",
      accent: "#56b6c2", accentOn: "#0d0f13",
      cardBg: "#16181e", cardBorder: "#21242b",
      font: SANS, fontMono: MONO, dark: true,
    },
  },
  {
    slug: "v12", title: "V12 · Soft Serif Dreamscape",
    subtitle: "파우더 핑크/라벤더 + 세리프",
    group: "ai-product", Component: V12_Home,
    theme: {
      bg: "linear-gradient(160deg, #fdebf0 0%, #ede4ff 100%)",
      text: "#3a2d4a", textMuted: "#5a4a5e",
      accent: "#d48aa8", accentOn: "#fff",
      cardBg: "rgba(255,255,255,0.72)", cardBorder: "rgba(255,255,255,0.8)",
      font: SANS, fontSerif: SERIF,
    },
  },
];

export const VARIANT_MAP: Record<string, VariantMeta> = Object.fromEntries(
  VARIANTS.map((v) => [v.slug, v]),
);
