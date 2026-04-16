import { useState } from "react";
import {
  getMoonSign,
  getZodiacSignKo,
  MALE_SIGNS,
  type ZodiacSign,
} from "@/shared/lib/moonSign";
import {
  aggregateByRange,
  fallbackTieBreaker,
  validateRange,
  normalizeRange,
} from "@/shared/lib/dateRangePrediction";

export type LunarZodiacGender = "Boy" | "Girl";

export interface LunarZodiacResult {
  gender: LunarZodiacGender;
  moonSign: ZodiacSign;
  moonSignKo: string;
  isMaleSign: boolean;
}

/**
 * 점성술 달의 별자리 성별 예측
 * 달 별자리가 남성 별자리(홀수 별자리)면 아들, 아니면 딸
 */
export function predictByLunarZodiac(conceptionDate: Date): LunarZodiacResult {
  const moonSign = getMoonSign(conceptionDate);
  const isMaleSign = (MALE_SIGNS as readonly ZodiacSign[]).includes(moonSign);
  return {
    gender: isMaleSign ? "Boy" : "Girl",
    moonSign,
    moonSignKo: getZodiacSignKo(moonSign),
    isMaleSign,
  };
}

export interface LunarZodiacState {
  conceptionStart: string;
  conceptionEnd: string;
  result: LunarZodiacResult | null;
  error: string | null;
}

export interface LunarZodiacActions {
  setConceptionStart: (v: string) => void;
  setConceptionEnd: (v: string) => void;
  predict: () => void;
  reset: () => void;
}

export function useLunarZodiacPredictor(): LunarZodiacState & LunarZodiacActions {
  const [conceptionStart, setConceptionStart] = useState("");
  const [conceptionEnd, setConceptionEnd] = useState("");
  const [result, setResult] = useState<LunarZodiacResult | null>(null);
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
      const aggregated = aggregateByRange<LunarZodiacResult>(
        startIso,
        endIso,
        (iso) => predictByLunarZodiac(new Date(iso)),
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
    setResult(null);
    setError(null);
    setConceptionStart("");
    setConceptionEnd("");
  }

  return {
    conceptionStart, conceptionEnd, result, error,
    setConceptionStart, setConceptionEnd, predict, reset,
  };
}
