import { useState } from "react";
import {
  aggregateByRange,
  fallbackTieBreaker,
  validateRange,
  normalizeRange,
} from "@/shared/lib/dateRangePrediction";

export type HippocratesGender = "Boy" | "Girl";

export interface HippocratesResult {
  gender: HippocratesGender;
  conceptionMonth: number;
  isNorthernHemisphere: boolean;
  isWinterSpring: boolean;
  isNorthWind: boolean;
}

/**
 * 고대 그리스 히포크라테스 바람법 2.0
 * isWinterSpring = month >= 11 || month <= 4
 * isNorthWind = 북반구 ? isWinterSpring : !isWinterSpring
 * 북풍(건조) → Boy / 남풍(다습) → Girl
 */
export function predictByHippocratesWind(
  conceptionMonth: number,
  isNorthernHemisphere: boolean
): HippocratesResult {
  const isWinterSpring = conceptionMonth >= 11 || conceptionMonth <= 4;
  const isNorthWind = isNorthernHemisphere ? isWinterSpring : !isWinterSpring;
  return {
    gender: isNorthWind ? "Boy" : "Girl",
    conceptionMonth,
    isNorthernHemisphere,
    isWinterSpring,
    isNorthWind,
  };
}

export interface HippocratesState {
  conceptionStart: string;
  conceptionEnd: string;
  isNorthernHemisphere: boolean;
  result: HippocratesResult | null;
  error: string | null;
}
export interface HippocratesActions {
  setConceptionStart: (v: string) => void;
  setConceptionEnd: (v: string) => void;
  setIsNorthernHemisphere: (v: boolean) => void;
  predict: () => void;
  reset: () => void;
}

export function useHippocratesWindPredictor(): HippocratesState & HippocratesActions {
  const [conceptionStart, setConceptionStart] = useState("");
  const [conceptionEnd, setConceptionEnd] = useState("");
  const [isNorthernHemisphere, setIsNorthernHemisphere] = useState(true);
  const [result, setResult] = useState<HippocratesResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  function predict() {
    setError(null);
    setResult(null);
    const [startIso, endIso] = normalizeRange(conceptionStart, conceptionEnd);
    const rangeErr = validateRange(startIso, endIso);
    if (rangeErr) {
      setError(rangeErr);
      return;
    }
    try {
      const aggregated = aggregateByRange<HippocratesResult>(
        startIso,
        endIso,
        (iso) => {
          const conceptionMonth = new Date(iso).getMonth() + 1;
          return predictByHippocratesWind(conceptionMonth, isNorthernHemisphere);
        },
        fallbackTieBreaker,
      );
      const { rangeInfo: _r, ...rest } = aggregated;
      void _r;
      setResult(rest);
    } catch (e) {
      setError((e as Error).message);
    }
  }

  function reset() {
    setResult(null); setError(null);
    setConceptionStart(""); setConceptionEnd(""); setIsNorthernHemisphere(true);
  }

  return {
    conceptionStart, conceptionEnd, isNorthernHemisphere, result, error,
    setConceptionStart, setConceptionEnd, setIsNorthernHemisphere, predict, reset,
  };
}
