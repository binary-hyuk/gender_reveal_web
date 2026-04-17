import { useState } from "react";

export type BloodRenewalGender = "Boy" | "Girl" | "Tie";

export interface BloodRenewalResult {
  gender: BloodRenewalGender;
  dadAge: number;
  momAge: number;
  dadRem: number;
  momRem: number;
}

/**
 * 혈액 갱신법 성별 예측
 * 아빠 나이 % 4  vs  엄마 나이 % 3
 * 아빠 나머지 > 엄마 나머지 → 아들
 * 아빠 나머지 < 엄마 나머지 → 딸
 * 같으면 Tie
 */
export function predictByBloodRenewal(
  dadAge: number,
  momAge: number
): BloodRenewalResult {
  const dadRem = dadAge % 4;
  const momRem = momAge % 3;
  let gender: BloodRenewalGender;
  if (dadRem > momRem) gender = "Boy";
  else if (dadRem < momRem) gender = "Girl";
  else gender = "Tie";
  return { gender, dadAge, momAge, dadRem, momRem };
}

export interface BloodRenewalState {
  dadAge: string;
  momAge: string;
  result: BloodRenewalResult | null;
  error: string | null;
}

export interface BloodRenewalActions {
  setDadAge: (v: string) => void;
  setMomAge: (v: string) => void;
  predict: () => void;
  reset: () => void;
}

export function useBloodRenewalPredictor(): BloodRenewalState & BloodRenewalActions {
  const [dadAge, setDadAge] = useState("");
  const [momAge, setMomAge] = useState("");
  const [result, setResult] = useState<BloodRenewalResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  function predict() {
    setError(null);
    setResult(null);

    const dad = parseInt(dadAge, 10);
    const mom = parseInt(momAge, 10);

    if (!dadAge || !momAge) {
      setError("나이를 모두 입력해주세요.");
      return;
    }
    if (isNaN(dad) || dad < 1 || dad > 99) {
      setError("올바른 아빠 나이를 입력해주세요. (1~99)");
      return;
    }
    if (isNaN(mom) || mom < 1 || mom > 99) {
      setError("올바른 엄마 나이를 입력해주세요. (1~99)");
      return;
    }

    setResult(predictByBloodRenewal(dad, mom));
  }

  function reset() {
    setResult(null);
    setError(null);
  }

  return { dadAge, momAge, result, error, setDadAge, setMomAge, predict, reset };
}
