import { useState } from "react";
import {
  aggregateByRange,
  fallbackTieBreaker,
  validateRange,
  normalizeRange,
  datesInRange,
} from "@/shared/lib/dateRangePrediction";
import { toErrorMessage } from "@/shared/lib/errorMessage";

export type AyurvedaGender = "Boy" | "Girl";
/**
 * 8방위. 양기(E, SE, S, SW) vs 음기(W, NW, N, NE)
 */
export const DIRECTIONS = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"] as const;
export type Direction = typeof DIRECTIONS[number];

/** 양기 방위면 true → chiModifier = 1, 아니면 0 */
const YANG_DIRECTIONS = new Set<Direction>(["E", "SE", "S", "SW"]);

export interface AyurvedaResult {
  gender: AyurvedaGender;
  lastPeriodDate: string;
  conceptionDate: string;
  direction: Direction;
  baseDays: number;
  chiModifier: number;
  finalDays: number;
  isEven: boolean;
}

/**
 * 고대 인도 아유르베다 주기법 2.0 (8방위 버전)
 * baseDays = (수정일 - 마지막 생리일) / ms하루
 * chiModifier = 양기 방위(E·SE·S·SW) → 1 / 음기 방위(W·NW·N·NE) → 0
 * finalDays = floor(baseDays) + chiModifier
 * 짝수 → Boy / 홀수 → Girl
 */
export function predictByAyurveda(
  lastPeriodDateIso: string,
  conceptionDateIso: string,
  direction: Direction
): AyurvedaResult {
  const ms = new Date(conceptionDateIso).getTime() - new Date(lastPeriodDateIso).getTime();
  const baseDays = ms / (1000 * 60 * 60 * 24);
  const chiModifier = YANG_DIRECTIONS.has(direction) ? 1 : 0;
  const finalDays = Math.floor(baseDays) + chiModifier;
  const isEven = finalDays % 2 === 0;
  return { gender: isEven ? "Boy" : "Girl", lastPeriodDate: lastPeriodDateIso, conceptionDate: conceptionDateIso, direction, baseDays, chiModifier, finalDays, isEven };
}

export interface AyurvedaState {
  lastPeriodDate: string;
  conceptionStart: string;
  conceptionEnd: string;
  direction: Direction;
  result: AyurvedaResult | null;
  error: string | null;
}
export interface AyurvedaActions {
  setLastPeriodDate: (v: string) => void;
  setConceptionStart: (v: string) => void;
  setConceptionEnd: (v: string) => void;
  setDirection: (v: Direction) => void;
  predict: () => void;
  reset: () => void;
}

export function useAyurvedaPredictor(): AyurvedaState & AyurvedaActions {
  const [lastPeriodDate, setLastPeriodDate] = useState("");
  const [conceptionStart, setConceptionStart] = useState("");
  const [conceptionEnd, setConceptionEnd] = useState("");
  const [direction, setDirection] = useState<Direction>("E");
  const [result, setResult] = useState<AyurvedaResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  function predict() {
    setError(null); setResult(null);
    if (!lastPeriodDate) {
      setError("마지막 생리 시작일을 입력해주세요.");
      return;
    }
    const [startIso, endIso] = normalizeRange(conceptionStart, conceptionEnd);
    const rangeErr = validateRange(startIso, endIso);
    if (rangeErr) {
      setError(rangeErr);
      return;
    }
    const days = datesInRange(startIso, endIso);
    if (new Date(lastPeriodDate) >= new Date(days[0])) {
      setError("수정일은 마지막 생리일 이후여야 합니다.");
      return;
    }
    try {
      const aggregated = aggregateByRange<AyurvedaResult>(
        startIso,
        endIso,
        (iso) => predictByAyurveda(lastPeriodDate, iso, direction),
        fallbackTieBreaker,
      );
      const { rangeInfo: _rangeInfo, ...rest } = aggregated;
      setResult(rest);
    } catch (e) {
      setError(toErrorMessage(e));
    }
  }

  function reset() {
    setResult(null);
    setError(null);
  }

  return {
    lastPeriodDate, conceptionStart, conceptionEnd, direction, result, error,
    setLastPeriodDate, setConceptionStart, setConceptionEnd, setDirection, predict, reset,
  };
}
