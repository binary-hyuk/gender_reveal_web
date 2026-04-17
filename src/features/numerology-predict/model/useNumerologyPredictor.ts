import { useState } from "react";
import {
  aggregateByRange,
  fallbackTieBreaker,
  validateRange,
  normalizeRange,
} from "@/shared/lib/dateRangePrediction";
import { toErrorMessage } from "@/shared/lib/errorMessage";

export type NumerologyGender = "Boy" | "Girl";

export interface NumerologyResult {
  gender: NumerologyGender;
  momName: string;
  dadName: string;
  conceptionMonth: number;
  momLen: number;
  dadLen: number;
  totalSum: number;
  isOdd: boolean;
}

/**
 * 서양 수비학 성별 예측
 * (공백 제거 후 엄마 이름 글자 수 + 아빠 이름 글자 수 + 임신 월) 의 홀짝
 */
export function predictByNumerology(
  momName: string,
  dadName: string,
  conceptionMonth: number
): NumerologyResult {
  const momLen = momName.replace(/\s/g, "").length;
  const dadLen = dadName.replace(/\s/g, "").length;
  const totalSum = momLen + dadLen + conceptionMonth;
  const isOdd = totalSum % 2 !== 0;
  return {
    gender: isOdd ? "Boy" : "Girl",
    momName,
    dadName,
    conceptionMonth,
    momLen,
    dadLen,
    totalSum,
    isOdd,
  };
}

export interface NumerologyState {
  momName: string;
  dadName: string;
  conceptionStart: string;
  conceptionEnd: string;
  result: NumerologyResult | null;
  error: string | null;
}

export interface NumerologyActions {
  setMomName: (v: string) => void;
  setDadName: (v: string) => void;
  setConceptionStart: (v: string) => void;
  setConceptionEnd: (v: string) => void;
  predict: () => void;
  reset: () => void;
}

export function useNumerologyPredictor(): NumerologyState & NumerologyActions {
  const [momName, setMomName] = useState("");
  const [dadName, setDadName] = useState("");
  const [conceptionStart, setConceptionStart] = useState("");
  const [conceptionEnd, setConceptionEnd] = useState("");
  const [result, setResult] = useState<NumerologyResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  function predict() {
    setError(null);
    setResult(null);

    if (!momName.trim() || !dadName.trim()) {
      setError("엄마·아빠 이름을 입력해주세요.");
      return;
    }

    const [startIso, endIso] = normalizeRange(conceptionStart, conceptionEnd);
    const rangeErr = validateRange(startIso, endIso);
    if (rangeErr) {
      setError(rangeErr);
      return;
    }

    try {
      const aggregated = aggregateByRange<NumerologyResult>(
        startIso,
        endIso,
        (iso) => {
          const conceptionMonth = new Date(iso).getMonth() + 1;
          return predictByNumerology(momName.trim(), dadName.trim(), conceptionMonth);
        },
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
    momName, dadName, conceptionStart, conceptionEnd, result, error,
    setMomName, setDadName, setConceptionStart, setConceptionEnd, predict, reset,
  };
}
