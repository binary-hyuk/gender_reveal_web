/**
 * Claude Design 의 SENTBE Home Landings 번들에서 가져온 풀 랜딩 페이지 8종.
 * 4개 컨셉(V1/V4/V5/V10) × A/B 변형. 모바일~데스크톱 반응형 (clamp/grid 기반).
 *
 * 12개 mobile-only 시안은 `@/features/home-playground` 에 별도로 있으며,
 * 이 모듈은 풀 마케팅 랜딩 비교용입니다.
 */
import type { ComponentType } from "react";

import { V1A_Landing } from "./variants/v1a-pastel";
import { V1B_Landing } from "./variants/v1b-split";
import { V4A_Landing } from "./variants/v4a-aurora";
import { V4B_Landing } from "./variants/v4b-vibrant";
import { V5A_Landing } from "./variants/v5a-mystic";
import { V5B_Landing } from "./variants/v5b-magazine";
import { V10A_Landing } from "./variants/v10a-chatgpt";
import { V10B_Landing } from "./variants/v10b-sidebar";

export {
  V1A_Landing, V1B_Landing,
  V4A_Landing, V4B_Landing,
  V5A_Landing, V5B_Landing,
  V10A_Landing, V10B_Landing,
};

export interface LandingMeta {
  slug: string;          // 경로 슬러그 (예: "v1a")
  title: string;         // 짧은 제목
  variantTag: string;    // "V1A" 등 컨셉 라벨
  subtitle: string;      // 한줄 설명
  conceptId: "v1" | "v4" | "v5" | "v10";
  conceptLabel: string;  // 컨셉 그룹명
  Component: ComponentType;
  // 데스크톱 기준 권장 캡처 사이즈 (참조용)
  desktop: { w: number; h: number };
  mobile:  { w: number; h: number };
}

export const LANDING_GROUPS: { id: "v1" | "v4" | "v5" | "v10"; title: string; subtitle: string }[] = [
  { id: "v1",  title: "V1 · 파스텔 글래스",   subtitle: "AS-IS 진화 — 현재 디자인 언어 유지" },
  { id: "v4",  title: "V4 · Aurora Playful",  subtitle: "활기있는 우주 — 다크/라이트 두 변형" },
  { id: "v5",  title: "V5 · Mystic / Editorial", subtitle: "점성·매거진 감성" },
  { id: "v10", title: "V10 · ChatGPT-like",    subtitle: "대화 중심 진입" },
];

export const LANDINGS: LandingMeta[] = [
  {
    slug: "v1a", title: "Centered + Stats", variantTag: "V1A",
    subtitle: "중앙정렬 hero + 신뢰 지표 카드",
    conceptId: "v1", conceptLabel: "V1 · 파스텔 글래스",
    Component: V1A_Landing,
    desktop: { w: 1440, h: 2400 }, mobile: { w: 390, h: 2600 },
  },
  {
    slug: "v1b", title: "Split + Phone Preview", variantTag: "V1B",
    subtitle: "좌우 split + 폰 미리보기",
    conceptId: "v1", conceptLabel: "V1 · 파스텔 글래스",
    Component: V1B_Landing,
    desktop: { w: 1440, h: 1900 }, mobile: { w: 390, h: 2200 },
  },
  {
    slug: "v4a", title: "Dark Aurora", variantTag: "V4A",
    subtitle: "다크 우주 + 별/오로라 파티클",
    conceptId: "v4", conceptLabel: "V4 · Aurora Playful",
    Component: V4A_Landing,
    desktop: { w: 1440, h: 2000 }, mobile: { w: 390, h: 2200 },
  },
  {
    slug: "v4b", title: "Light Conic Orb", variantTag: "V4B",
    subtitle: "라이트 + 회전 conic orb",
    conceptId: "v4", conceptLabel: "V4 · Aurora Playful",
    Component: V4B_Landing,
    desktop: { w: 1440, h: 1900 }, mobile: { w: 390, h: 2200 },
  },
  {
    slug: "v5a", title: "Mystic Tarot", variantTag: "V5A",
    subtitle: "딥 네이비 + 골드 타로",
    conceptId: "v5", conceptLabel: "V5 · Mystic / Editorial",
    Component: V5A_Landing,
    desktop: { w: 1440, h: 2000 }, mobile: { w: 390, h: 2200 },
  },
  {
    slug: "v5b", title: "Cream Magazine", variantTag: "V5B",
    subtitle: "크림 매거진 (TOC + pull quote)",
    conceptId: "v5", conceptLabel: "V5 · Mystic / Editorial",
    Component: V5B_Landing,
    desktop: { w: 1440, h: 1800 }, mobile: { w: 390, h: 2000 },
  },
  {
    slug: "v10a", title: "Centered Composer", variantTag: "V10A",
    subtitle: "중앙 composer + 스타터 프롬프트",
    conceptId: "v10", conceptLabel: "V10 · ChatGPT-like",
    Component: V10A_Landing,
    desktop: { w: 1440, h: 1800 }, mobile: { w: 390, h: 2000 },
  },
  {
    slug: "v10b", title: "Sidebar + Preview", variantTag: "V10B",
    subtitle: "사이드바 + 대화 미리보기",
    conceptId: "v10", conceptLabel: "V10 · ChatGPT-like",
    Component: V10B_Landing,
    desktop: { w: 1440, h: 1100 }, mobile: { w: 390, h: 1800 },
  },
];

export const LANDING_MAP: Record<string, LandingMeta> = Object.fromEntries(
  LANDINGS.map((l) => [l.slug, l]),
);
