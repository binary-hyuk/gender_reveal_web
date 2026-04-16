import { useState } from "react";

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
  conceptionMonth: string;
  result: NumerologyResult | null;
  error: string | null;
}

export interface NumerologyActions {
  setMomName: (v: string) => void;
  setDadName: (v: string) => void;
  setConceptionMonth: (v: string) => void;
  predict: () => void;
  reset: () => void;
}

export function useNumerologyPredictor(): NumerologyState & NumerologyActions {
  const [momName, setMomName] = useState("");
  const [dadName, setDadName] = useState("");
  const [conceptionMonth, setConceptionMonth] = useState("");
  const [result, setResult] = useState<NumerologyResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  function predict() {
    setError(null);
    setResult(null);

    if (!momName.trim() || !dadName.trim() || !conceptionMonth) {
      setError("모든 항목을 입력해주세요.");
      return;
    }
    const month = parseInt(conceptionMonth, 10);
    if (isNaN(month) || month < 1 || month > 12) {
      setError("임신 월은 1~12 사이여야 합니다.");
      return;
    }

    setResult(predictByNumerology(momName.trim(), dadName.trim(), month));
  }

  function reset() {
    setResult(null);
    setError(null);
    setMomName("");
    setDadName("");
    setConceptionMonth("");
  }

  return {
    momName, dadName, conceptionMonth, result, error,
    setMomName, setDadName, setConceptionMonth, predict, reset,
  };
}
