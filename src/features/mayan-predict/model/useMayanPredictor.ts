import { useState } from "react";

export type MayanGender = "Boy" | "Girl";

export interface MayanResult {
  gender: MayanGender;
  momAge: number;
  conceptionMonth: number;
  momIsEven: boolean;
  monthIsEven: boolean;
}

/**
 * 마야식 성별 예측
 * 엄마 나이와 임신 월의 홀짝이 같으면 딸, 다르면 아들
 */
export function predictByMayan(
  momAge: number,
  conceptionMonth: number
): MayanGender {
  const momEven = momAge % 2 === 0;
  const monthEven = conceptionMonth % 2 === 0;
  return momEven === monthEven ? "Girl" : "Boy";
}

export interface MayanState {
  momAge: string;
  conceptionMonth: string;
  result: MayanResult | null;
  error: string | null;
}

export interface MayanActions {
  setMomAge: (v: string) => void;
  setConceptionMonth: (v: string) => void;
  predict: () => void;
  reset: () => void;
}

export function useMayanPredictor(): MayanState & MayanActions {
  const [momAge, setMomAge] = useState("");
  const [conceptionMonth, setConceptionMonth] = useState("");
  const [result, setResult] = useState<MayanResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  function predict() {
    setError(null);
    setResult(null);

    const age = parseInt(momAge, 10);
    const month = parseInt(conceptionMonth, 10);

    if (!momAge || !conceptionMonth) {
      setError("모든 항목을 입력해주세요.");
      return;
    }
    if (isNaN(age) || age < 1 || age > 99) {
      setError("올바른 나이를 입력해주세요. (1~99)");
      return;
    }
    if (isNaN(month) || month < 1 || month > 12) {
      setError("임신 월은 1~12 사이여야 합니다.");
      return;
    }

    setResult({
      gender: predictByMayan(age, month),
      momAge: age,
      conceptionMonth: month,
      momIsEven: age % 2 === 0,
      monthIsEven: month % 2 === 0,
    });
  }

  function reset() {
    setResult(null);
    setError(null);
    setMomAge("");
    setConceptionMonth("");
  }

  return { momAge, conceptionMonth, result, error, setMomAge, setConceptionMonth, predict, reset };
}
