// ================================================================
// 🎨 테마 토큰 — 이 파일만 수정하면 모든 색상이 바뀝니다
//
// 수정 순서:
//   1️⃣  hue          — 색상환 각도 (0=빨 30=주황 120=초 180=청록 230=파 350=핑크)
//   2️⃣  sat          — 포인트 채도 (0=무채색 ~ 100=쨍함)
//   3️⃣  bgSat        — 배경 채도 (낮을수록 차분, 30~55 권장)
//   4️⃣  bgLightTop   — 배경 상단 명도 (78~90 권장. 높으면 색 안 보임)
//   5️⃣  shadowRgb    — 그림자 색 RGB (브랜드 계열로 맞추기)
// ================================================================

export interface ThemeTokens {
  /** 색상환 각도 0–360 */
  hue: number;
  /** 포인트 채도 0–100 */
  sat: number;
  /** 명도 오프셋 -15~+10. 음수면 팔레트가 더 진해짐 */
  lightnessShift: number;
  /** 배경 채도 0–60 */
  bgSat: number;
  /** 배경 상단 명도 78–92 */
  bgLightTop: number;
  /** 배경 하단 명도 93–98 */
  bgLightBottom: number;
  /** 그림자 RGB 튜플 */
  shadowRgb: [number, number, number];
}

// ── 기본 (파랑) — 성별 무관 페이지 ──────────────────────────────
export const DEFAULT: ThemeTokens = {
  hue: 230,
  sat: 54,
  lightnessShift: -10,
  bgSat: 45,
  bgLightTop: 86,
  bgLightBottom: 96,
  shadowRgb: [40, 55, 90],
};

// ── 아들 (초록) ─────────────────────────────────────────────────
export const BOY: ThemeTokens = {
  hue: 155,
  sat: 52,
  lightnessShift: -10,
  bgSat: 40,
  bgLightTop: 86,
  bgLightBottom: 96,
  shadowRgb: [50, 120, 80],
};

// ── 딸 (핑크) ───────────────────────────────────────────────────
export const GIRL: ThemeTokens = {
  hue: 350,
  sat: 60,
  lightnessShift: -8,
  bgSat: 48,
  bgLightTop: 86,
  bgLightBottom: 96,
  shadowRgb: [160, 55, 75],
};

// ================================================================
// 아래는 자동 계산 — 수정 불필요
// ================================================================

function hsl(h: number, s: number, l: number): string {
  return `hsl(${h} ${Math.round(Math.max(0, Math.min(100, s)))}% ${Math.round(Math.max(0, Math.min(100, l)))}%)`;
}

export function buildCssVars(t: ThemeTokens): string {
  const { hue: h, sat: s, lightnessShift: ls, bgSat: bs, bgLightTop: blt, bgLightBottom: blb } = t;
  const [sr, sg, sb] = t.shadowRgb;

  const lines = [
    `--bg-accent: ${hsl(h, bs, 80)}`,  /* ::after blob 색상 */
    `--brand-50:  ${hsl(h, s, 97 + ls)}`,
    `--brand-100: ${hsl(h, s, 94 + ls)}`,
    `--brand-200: ${hsl(h, s, 88 + ls)}`,
    `--brand-300: ${hsl(h, s, 78 + ls)}`,
    `--brand-400: ${hsl(h, s, 66 + ls)}`,
    `--brand-500: ${hsl(h, s, 55 + ls)}`,
    `--brand-600: ${hsl(h, s, 46 + ls)}`,
    `--brand-700: ${hsl(h, s, 36 + ls)}`,
    `--bg-from: ${hsl(h, bs, blt)}`,
    `--bg-to:   ${hsl(h, bs * 0.4, blb)}`,
    `--fg:        ${hsl(h, 20, 13)}`,
    `--fg-muted:  ${hsl(h, 12, 42)}`,
    `--fg-subtle: ${hsl(h,  8, 58)}`,
    `--glass-shadow: 0 2px 8px rgba(${sr},${sg},${sb},0.07), 0 12px 32px rgba(${sr},${sg},${sb},0.11)`,
    `--glass-shadow-lg: 0 4px 12px rgba(${sr},${sg},${sb},0.09), 0 20px 48px rgba(${sr},${sg},${sb},0.15)`,
  ];

  return lines.join(';\n  ') + ';';
}
