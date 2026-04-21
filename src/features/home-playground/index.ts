/**
 * Claude Design (claude.ai/design) 에서 가져온 12개 홈 화면 variant.
 * `/playground` 페이지에서 나란히 비교·확인할 수 있다.
 *
 * 원본 출처: SENTBE Home Prototype (gender-reveal playground)
 * 각 variant 는 순수 inline-style React 컴포넌트이며 375×760 모바일 프레임 전제.
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

export interface VariantMeta {
  slug: string;         // 경로 슬러그 (예: "v1")
  title: string;        // 짧은 제목
  subtitle: string;     // 부제
  group: "origin" | "ai-feel" | "ai-product";
  Component: ComponentType;
}

export const VARIANT_GROUPS: { id: "origin" | "ai-feel" | "ai-product"; title: string; subtitle: string }[] = [
  { id: "origin",     title: "기존 방향",         subtitle: "AS-IS + 초기 탐험 5종" },
  { id: "ai-feel",    title: "AI 기술 감성",       subtitle: "'AI가 일하는 중' 느낌 · 기술적 카피와 데이터 비주얼" },
  { id: "ai-product", title: "AI 프로덕트 오마주", subtitle: "Gemini / Claude / ChatGPT / Codex 감성의 대화 진입점" },
];

export const VARIANTS: VariantMeta[] = [
  { slug: "v1",  title: "V1 · AS-IS",               subtitle: "현재 프로덕션 재현 · 파스텔 블루 glassmorphism", group: "origin",     Component: V1_Home  },
  { slug: "v2",  title: "V2 · Deep Glassmorphism",  subtitle: "컬러풀 메쉬 오브 + 강한 블러 · Vision Pro 스타일", group: "origin",     Component: V2_Home  },
  { slug: "v3",  title: "V3 · Editorial Magazine",  subtitle: "세리프 + 잉크 레드 + 비대칭 · 매거진 표지",        group: "origin",     Component: V3_Home  },
  { slug: "v4",  title: "V4 · Aurora Playful",      subtitle: "다크 우주 + 애니 오로라 + 별 파티클 + 네온",       group: "origin",     Component: V4_Home  },
  { slug: "v5",  title: "V5 · Minimal Dark Mystic", subtitle: "딥 네이비 + 골드 · 타로 카드 그리드",              group: "origin",     Component: V5_Home  },
  { slug: "v6",  title: "V6 · AI Lab / Neural",     subtitle: "다크 + 시안 네온 + 뉴럴 그래프 · 기술 카피",       group: "ai-feel",    Component: V6_Home  },
  { slug: "v7",  title: "V7 · AI Assistant Chat",   subtitle: "ChatGPT/Copilot 스타일 대화형 진입",               group: "ai-feel",    Component: V7_Home  },
  { slug: "v8",  title: "V8 · Gemini-like",         subtitle: "4색 Spark + 라이트 · 메시지 입력창",               group: "ai-product", Component: V8_Home  },
  { slug: "v9",  title: "V9 · Claude-like",         subtitle: "크림 웜톤 + 세리프 + 코랄 · 아티팩트 스타일",      group: "ai-product", Component: V9_Home  },
  { slug: "v10", title: "V10 · ChatGPT-like",       subtitle: "화이트 + 민트 포인트 · 스타터 4 카드 + composer",  group: "ai-product", Component: V10_Home },
  { slug: "v11", title: "V11 · Codex-like",         subtitle: "다크 에디터 + 신택스 하이라이트 + ⌘K",             group: "ai-product", Component: V11_Home },
  { slug: "v12", title: "V12 · Soft Serif Dreamscape", subtitle: "파우더 핑크/라벤더 + conic 오브 + Cormorant",   group: "ai-product", Component: V12_Home },
];

export const VARIANT_MAP: Record<string, VariantMeta> = Object.fromEntries(
  VARIANTS.map((v) => [v.slug, v]),
);
