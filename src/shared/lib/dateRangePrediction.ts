// ============================================================
// 임신 추정일 기간(최대 7일) 기반 성별 예측 aggregator
// - 중간일에 최대 가중치, 끝으로 갈수록 가중치 감소 (삼각 가중치)
// - 가중 합산이 정확히 동률이면 fallback tie-breaker 사용
// ============================================================

export type Gender = "Boy" | "Girl";
export const MAX_RANGE_DAYS = 7;

/**
 * start~end ISO date string(YYYY-MM-DD) 사이의 모든 날짜를 ISO 문자열로 반환.
 * 최대 7일, 순서 보장 (start <= end).
 */
export function datesInRange(startIso: string, endIso: string): string[] {
  const start = new Date(startIso);
  const end = new Date(endIso);
  if (isNaN(start.getTime()) || isNaN(end.getTime())) return [];
  if (end < start) return [];

  const days: string[] = [];
  const cursor = new Date(start);
  while (cursor <= end && days.length < MAX_RANGE_DAYS) {
    days.push(cursor.toISOString().slice(0, 10));
    cursor.setDate(cursor.getDate() + 1);
  }
  return days;
}

/**
 * n개 날짜에 대한 삼각 가중치 (중간일 최대, 끝으로 갈수록 감소).
 * 예: n=7 → [1,2,3,4,3,2,1], n=1 → [1], n=2 → [1,1]
 */
export function triangularWeights(n: number): number[] {
  if (n <= 0) return [];
  if (n === 1) return [1];
  const midIdx = (n - 1) / 2;
  const maxDist = midIdx;
  return Array.from({ length: n }, (_, i) => maxDist + 1 - Math.abs(i - midIdx));
}

/**
 * Fallback tie-breaker — 가중치 합산이 정확히 동률일 때 사용.
 * 사용자에게 노출하지 않음. 단순 결정론적 규칙(중간일 요일 짝수/홀수).
 */
export function fallbackTieBreaker(midpointIso: string): Gender {
  const d = new Date(midpointIso);
  // 요일(0=일)과 일자 합의 짝홀로 결정 — 어떤 predictor에도 의존하지 않음
  const marker = (d.getDay() + d.getDate()) % 2;
  return marker === 0 ? "Boy" : "Girl";
}

export interface RangeInfo {
  startIso: string;
  endIso: string;
  days: number;
  boyWeight: number;
  girlWeight: number;
  midpointIso: string;
}

/**
 * 기간 내 각 날짜에 대해 predictFn을 호출하고 삼각 가중치로 합산.
 * 최종 결과는 중간일 결과(T)의 모든 필드를 유지하되 gender만 가중 합산으로 교체.
 * 가중 합산이 동률이면 tieBreakerFn을 silent하게 호출해 gender 결정.
 *
 * @param startIso 기간 시작일 ISO (YYYY-MM-DD)
 * @param endIso 기간 종료일 ISO (YYYY-MM-DD). 단일일이면 startIso === endIso.
 * @param predictFn 주어진 ISO 날짜로 예측 결과(T) 반환
 * @param tieBreakerFn 동률일 때 호출. midpoint ISO 기반으로 Gender 반환
 */
export function aggregateByRange<T extends { gender: Gender }>(
  startIso: string,
  endIso: string,
  predictFn: (isoDate: string) => T,
  tieBreakerFn: (midpointIso: string) => Gender = fallbackTieBreaker,
): T & { rangeInfo: RangeInfo } {
  const days = datesInRange(startIso, endIso);
  if (days.length === 0) {
    throw new Error("유효한 기간이 아닙니다.");
  }

  const weights = triangularWeights(days.length);
  const midIdx = Math.floor((days.length - 1) / 2);
  const midpointIso = days[midIdx];

  let midResult: T | null = null;
  let boyWeight = 0;
  let girlWeight = 0;

  for (let i = 0; i < days.length; i++) {
    const r = predictFn(days[i]);
    if (r.gender === "Boy") boyWeight += weights[i];
    else girlWeight += weights[i];
    if (i === midIdx) midResult = r;
  }

  let finalGender: Gender;
  if (boyWeight === girlWeight) {
    finalGender = tieBreakerFn(midpointIso);
  } else {
    finalGender = boyWeight > girlWeight ? "Boy" : "Girl";
  }

  return {
    ...(midResult as T),
    gender: finalGender,
    rangeInfo: {
      startIso: days[0],
      endIso: days[days.length - 1],
      days: days.length,
      boyWeight,
      girlWeight,
      midpointIso,
    },
  };
}

/**
 * 기간 유효성 검증. start가 비어있거나 순서가 잘못되거나 7일 초과면 에러 메시지 반환.
 * end가 비어있으면 start와 동일한 단일일 모드로 처리.
 * OK면 null 반환.
 */
export function validateRange(startIso: string, endIso: string): string | null {
  if (!startIso) return "임신 추정일(시작일)을 입력해주세요.";
  const start = new Date(startIso);
  if (isNaN(start.getTime())) return "유효한 시작일을 입력해주세요.";
  const effectiveEnd = endIso || startIso;
  const end = new Date(effectiveEnd);
  if (isNaN(end.getTime())) return "유효한 종료일을 입력해주세요.";
  if (end < start) return "종료일은 시작일 이후여야 합니다.";
  const diffDays = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  if (diffDays > MAX_RANGE_DAYS) return `기간은 최대 ${MAX_RANGE_DAYS}일까지 지정할 수 있습니다.`;
  return null;
}

/**
 * 종료일이 비어있으면 시작일과 동일하게 처리한 정규화된 (start, end) 반환
 */
export function normalizeRange(startIso: string, endIso: string): [string, string] {
  return [startIso, endIso || startIso];
}

/**
 * 기간의 중간일을 ISO로 반환. 단일일이면 그 날짜.
 */
export function midpointIso(startIso: string, endIso: string): string {
  const days = datesInRange(startIso, endIso);
  if (days.length === 0) return startIso;
  return days[Math.floor((days.length - 1) / 2)];
}
