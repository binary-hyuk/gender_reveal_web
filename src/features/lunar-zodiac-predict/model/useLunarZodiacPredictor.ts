import { useState } from "react";
import {
  getMoonSign,
  getZodiacSignKo,
  MALE_SIGNS,
  type ZodiacSign,
} from "@/shared/lib/moonSign";

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
  conceptionDate: string;
  result: LunarZodiacResult | null;
  error: string | null;
}

export interface LunarZodiacActions {
  setConceptionDate: (v: string) => void;
  predict: () => void;
  reset: () => void;
}

export function useLunarZodiacPredictor(): LunarZodiacState & LunarZodiacActions {
  const [conceptionDate, setConceptionDate] = useState("");
  const [result, setResult] = useState<LunarZodiacResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  function predict() {
    setError(null);
    setResult(null);

    if (!conceptionDate) {
      setError("임신(수정) 날짜를 입력해주세요.");
      return;
    }

    const date = new Date(conceptionDate);
    if (isNaN(date.getTime())) {
      setError("올바른 날짜를 입력해주세요.");
      return;
    }

    setResult(predictByLunarZodiac(date));
  }

  function reset() {
    setResult(null);
    setError(null);
    setConceptionDate("");
  }

  return { conceptionDate, result, error, setConceptionDate, predict, reset };
}
