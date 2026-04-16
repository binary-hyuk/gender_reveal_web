import { useState } from "react";

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
  conceptionMonth: string;
  isNorthernHemisphere: boolean;
  result: HippocratesResult | null;
  error: string | null;
}
export interface HippocratesActions {
  setConceptionMonth: (v: string) => void;
  setIsNorthernHemisphere: (v: boolean) => void;
  predict: () => void;
  reset: () => void;
}

export function useHippocratesWindPredictor(): HippocratesState & HippocratesActions {
  const [conceptionMonth, setConceptionMonth] = useState("");
  const [isNorthernHemisphere, setIsNorthernHemisphere] = useState(true);
  const [result, setResult] = useState<HippocratesResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  function predict() {
    setError(null);
    setResult(null);
    const month = parseInt(conceptionMonth, 10);
    if (!conceptionMonth || isNaN(month) || month < 1 || month > 12) {
      setError("임신 월은 1~12 사이여야 합니다.");
      return;
    }
    setResult(predictByHippocratesWind(month, isNorthernHemisphere));
  }

  function reset() {
    setResult(null); setError(null);
    setConceptionMonth(""); setIsNorthernHemisphere(true);
  }

  return { conceptionMonth, isNorthernHemisphere, result, error, setConceptionMonth, setIsNorthernHemisphere, predict, reset };
}
