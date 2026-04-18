/**
 * 자녀 성별 플래너 - 기존 알고리즘을 역방향으로 활용하여
 * 원하는 성별(target)에 유리한 시기·방위·숫자·이모티콘·라이프스타일을 추천.
 */

import { predictGender as predictChinese, AGE_MIN, AGE_MAX } from "@/features/gender-predict/model/genderTable";
import { predictByMayan } from "@/features/mayan-predict/model/useMayanPredictor";
import { predictByAncient49 } from "@/features/ancient49-predict/model/useAncient49Predictor";
import { predictByLunarZodiac } from "@/features/lunar-zodiac-predict/model/useLunarZodiacPredictor";
import { predictByPlanetaryWeekday } from "@/features/planetary-weekday-predict/model/usePlanetaryWeekdayPredictor";
import { predictByHippocratesWind } from "@/features/hippocrates-wind-predict/model/useHippocratesWindPredictor";
import { predictByDigitalDna } from "@/features/digital-dna-predict/model/useDigitalDnaPredictor";
import { getAgeAtDate } from "@/shared/lib/ageUtils";
import { getChineseAge, solarToLunar } from "@/shared/lib/lunarConverter";

export type Target = "Boy" | "Girl";

const WEEKDAYS = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"] as const;

/** 2주 단위 스코어 항목 */
export interface MonthRecommendation {
  yearMonth: string;      // "2026-03-A" (상반기) / "2026-03-B" (하반기)
  label: string;          // "2026년 3월 상반기 (1~14일)"
  targetScore: number;
  maxScore: number;
  boyScore: number;
  girlScore: number;
  supportingAlgorithms: string[];
}

/** 추천 요일 */
export interface WeekdayRecommendation {
  dayOfWeek: number;  // 0=Sun
  name: string;
  planet: string;
  emoji: string;
}

/** 종합 추천 결과 */
export interface PlannerRecommendations {
  target: Target;
  topMonths: MonthRecommendation[];
  weekdays: WeekdayRecommendation[];
  ayurvedaDirections: { code: string; label: string; reason: string }[];
  fengshuiFloorAdvice: string;
  fengshuiDirections: string[];
  hemisphereTip: string;
  luckyNumbers: number[];
  luckyEmojis: string[];
  interests: string[];
  lifestyleTips: string[];
}

// ============================================================
// 개별 추천 모듈
// ============================================================

/**
 * 향후 N개월을 2주 단위로 쪼개서 스코어링.
 * 각 월은 상반기(1~14일, 기준일 7일)와 하반기(15~말일, 기준일 22일) 2개 구간으로 분리.
 * 2년(monthsAhead=24) 기준 → 48개 구간 생성 후 정렬하여 Top-K 반환.
 */
export function scoreMonthsForTarget(
  motherBirth: Date,
  target: Target,
  now: Date = new Date(),
  monthsAhead: number = 24
): MonthRecommendation[] {
  const results: MonthRecommendation[] = [];

  const HALVES = [
    { suffix: "A", midDay: 7,  labelSuffix: "상반기 (1~14일)" },
    { suffix: "B", midDay: 22, labelSuffix: "하반기 (15~말일)" },
  ];

  for (let i = 0; i < monthsAhead; i++) {
    for (const half of HALVES) {
      const probe = new Date(now.getFullYear(), now.getMonth() + i + 1, half.midDay);
      const momAge = getAgeAtDate(motherBirth, probe);
      const chineseAge = getChineseAge(motherBirth, probe);
      const lunar = solarToLunar(probe);
      const solarMonth = probe.getMonth() + 1;
      const solarYear = probe.getFullYear();

      let boyScore = 0;
      let girlScore = 0;
      const supportsBoy: string[] = [];
      const supportsGirl: string[] = [];

      // 중국 황실 달력 (100)
      if (momAge >= AGE_MIN && momAge <= AGE_MAX) {
        const chinese = predictChinese(momAge, lunar.month);
        if (chinese === "아들") { boyScore += 100; supportsBoy.push("중국 황실"); }
        else if (chinese === "딸") { girlScore += 100; supportsGirl.push("중국 황실"); }
      }

      // 마야식 (90)
      const mayan = predictByMayan(momAge, solarMonth);
      if (mayan === "Boy") { boyScore += 90; supportsBoy.push("마야식"); }
      else { girlScore += 90; supportsGirl.push("마야식"); }

      // 주역 49법 (80)
      if (chineseAge >= AGE_MIN && chineseAge <= AGE_MAX) {
        const { gender: a49 } = predictByAncient49(chineseAge, lunar.month);
        if (a49 === "Boy") { boyScore += 80; supportsBoy.push("주역 49법"); }
        else { girlScore += 80; supportsGirl.push("주역 49법"); }
      }

      // 달 별자리 (50) — 구간 기준일로 계산
      const zodiac = predictByLunarZodiac(probe);
      if (zodiac.gender === "Boy") { boyScore += 50; supportsBoy.push("달 별자리"); }
      else { girlScore += 50; supportsGirl.push("달 별자리"); }

      // 히포크라테스 (18, 북반구 기준)
      const hippo = predictByHippocratesWind(solarMonth, true);
      if (hippo.gender === "Boy") { boyScore += 18; supportsBoy.push("히포크라테스"); }
      else { girlScore += 18; supportsGirl.push("히포크라테스"); }

      const targetScore = target === "Boy" ? boyScore : girlScore;
      const supporting = target === "Boy" ? supportsBoy : supportsGirl;

      results.push({
        yearMonth: `${solarYear}-${String(solarMonth).padStart(2, "0")}-${half.suffix}`,
        label: `${solarYear}년 ${solarMonth}월 ${half.labelSuffix}`,
        targetScore,
        maxScore: boyScore + girlScore,
        boyScore,
        girlScore,
        supportingAlgorithms: supporting,
      });
    }
  }

  return results.sort((a, b) => b.targetScore - a.targetScore);
}

/**
 * 행성 요일 예측 역산 - 타겟 성별에 유리한 요일을 반환.
 * Boy: 일/화/목/토 (태양·화성·목성·토성)
 * Girl: 월/수/금 (달·수성·금성)
 */
export function recommendWeekdays(target: Target): WeekdayRecommendation[] {
  const days: WeekdayRecommendation[] = [];
  // 2024-01-07 일요일부터 7일간 probe
  const anchor = new Date(2024, 0, 7);
  for (let d = 0; d < 7; d++) {
    const date = new Date(anchor);
    date.setDate(anchor.getDate() + d);
    const r = predictByPlanetaryWeekday(date.toISOString().slice(0, 10));
    if (r.gender === target) {
      days.push({
        dayOfWeek: date.getDay(),
        name: WEEKDAYS[date.getDay()],
        planet: r.planetName,
        emoji: r.planetEmoji,
      });
    }
  }
  return days;
}

/**
 * 아유르베다 8방위 역산 - 양기 방위(E·SE·S·SW)→Boy, 음기(W·NW·N·NE)→Girl.
 */
export function recommendAyurvedaDirections(target: Target): PlannerRecommendations["ayurvedaDirections"] {
  if (target === "Boy") {
    return [
      { code: "E",  label: "동(E) 🌅",   reason: "해 뜨는 양기 방위" },
      { code: "SE", label: "남동(SE) ⛅", reason: "따뜻한 양기" },
      { code: "S",  label: "남(S) ☀️",   reason: "최대 양기" },
      { code: "SW", label: "남서(SW) 🌤️", reason: "오후의 양기" },
    ];
  }
  return [
    { code: "W",  label: "서(W) 🌇",    reason: "해 지는 음기 방위" },
    { code: "NW", label: "북서(NW) 🌫️", reason: "저녁의 음기" },
    { code: "N",  label: "북(N) ❄️",    reason: "최대 음기" },
    { code: "NE", label: "북동(NE) 🌨️", reason: "새벽의 음기" },
  ];
}

/**
 * 풍수지리 방향 추천
 */
export function recommendFengshuiDirections(target: Target): string[] {
  return target === "Boy"
    ? ["남향", "남동향", "동향", "남서향"]
    : ["북향", "북서향", "서향", "북동향"];
}

/**
 * 풍수지리 층수 추천 - 양수 층(홀수)=Boy, 음수 층(짝수)=Girl.
 */
export function recommendFloorAdvice(target: Target): string {
  return target === "Boy"
    ? "홀수 층 (1·3·5·7·9·11·15층 등) — 양기가 강한 고층 추천"
    : "짝수 층 (2·4·6·8·10·12층 등) — 음기가 안정된 중저층 추천";
}

/**
 * 히포크라테스 바람법 기반 계절 팁
 */
export function recommendHemisphereTip(target: Target): string {
  if (target === "Boy") {
    return "북반구 거주 시 겨울~초봄(11~4월)의 북풍 계절이 건조한 양기를 제공합니다. 남반구는 5~10월 추천.";
  }
  return "북반구 거주 시 여름~가을(5~10월)의 남풍 계절이 다습한 음기를 제공합니다. 남반구는 11~4월 추천.";
}

/**
 * 행운의 숫자 1~9 중 추천.
 * Boy: 양수(홀수) 1·3·5·7·9
 * Girl: 음수(짝수) 2·4·6·8
 * 삼원공명 직감수 양음 규칙과 동일.
 */
export function recommendLuckyNumbers(target: Target): number[] {
  return target === "Boy" ? [1, 3, 5, 7, 9] : [2, 4, 6, 8];
}

/**
 * 디지털 DNA 알고리즘 역산 - 유니코드 codepoint 홀짝이 타겟 성별에 기여하는 이모지.
 * 각 이모지를 predictByDigitalDna에 샘플 MBTI와 함께 넣어 타겟이 나오는 것만 필터.
 */
const EMOJI_POOL = [
  "🔥","⚡","☀️","💎","🔴","🪐","☿️","🎯","✨","💫",
  "🌙","💧","🌊","🌿","🦋","🌸","🌺","🌼","🦄","🌈",
  "⭐","🌟","🌞","🌛","🍀","🌷","🎐","🎁","💖","💕",
];

export function recommendLuckyEmojis(target: Target): string[] {
  // 중립 MBTI 조합("ENTPENFP")로 돌려 emojiBonus 만으로 판단
  const matches = EMOJI_POOL.filter((e) => {
    const r = predictByDigitalDna("ENTP", "ENFP", e);
    return r.emojiBonus === target;
  });
  return matches.slice(0, 8);
}

/**
 * 음양오행 기반 관심사/취미 추천.
 */
export function recommendInterests(target: Target): string[] {
  if (target === "Boy") {
    return [
      "🏃 운동·스포츠 (火 에너지)",
      "🗻 등산·야외 활동 (木→火)",
      "♟️ 전략 게임·보드게임 (金)",
      "🔧 공학·DIY (金·土)",
      "🎯 도전·모험 활동",
    ];
  }
  return [
    "🎨 예술·미술 (水·木)",
    "📚 독서·시·에세이 (水)",
    "🌱 원예·가드닝 (木)",
    "🍰 요리·베이킹 (火+水 조화)",
    "🧘 명상·요가 (土)",
  ];
}

/**
 * 컨디션/라이프스타일 팁.
 */
export function recommendLifestyleTips(target: Target): string[] {
  if (target === "Boy") {
    return [
      "☕ 남성은 임신 전 카페인·고단백 섭취 ↑, 여성은 염분 적당히",
      "🌞 아침 햇살을 충분히 받기 — 양기 축적",
      "💪 가벼운 유산소로 체온 유지 (火 강화)",
      "🥩 붉은 고기·견과류 등 따뜻한 성질 음식",
    ];
  }
  return [
    "🥛 여성은 칼슘·마그네슘 섭취 ↑, 남성은 채식 비율 ↑",
    "🌙 저녁의 조용한 시간 보내기 — 음기 축적",
    "🧘 스트레칭·요가로 유연성 유지 (水 강화)",
    "🥗 녹색 채소·해산물 등 서늘한 성질 음식",
  ];
}

// ============================================================
// 종합 추천 함수
// ============================================================

export function buildRecommendations(
  motherBirth: Date,
  target: Target,
  now: Date = new Date(),
): PlannerRecommendations {
  const months = scoreMonthsForTarget(motherBirth, target, now, 24);
  return {
    target,
    topMonths: months.slice(0, 5),
    weekdays: recommendWeekdays(target),
    ayurvedaDirections: recommendAyurvedaDirections(target),
    fengshuiFloorAdvice: recommendFloorAdvice(target),
    fengshuiDirections: recommendFengshuiDirections(target),
    hemisphereTip: recommendHemisphereTip(target),
    luckyNumbers: recommendLuckyNumbers(target),
    luckyEmojis: recommendLuckyEmojis(target),
    interests: recommendInterests(target),
    lifestyleTips: recommendLifestyleTips(target),
  };
}
