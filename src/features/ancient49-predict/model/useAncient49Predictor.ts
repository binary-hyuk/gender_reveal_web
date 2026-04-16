import { useState } from "react";
import { getChineseAge, solarToLunar } from "@/shared/lib/lunarConverter";
import { AGE_MIN, AGE_MAX } from "@/features/gender-predict/model/genderTable";

export type Ancient49Gender = "Boy" | "Girl";

export interface Ancient49Result {
  gender: Ancient49Gender;
  momLunarAge: number;
  lunarConceptionMonth: number;
  calcValue: number;
  isOdd: boolean;
}

/**
 * 주역 49법 성별 예측
 * result = 49 + 음력임신월 - 음력연나이 + 19
 * 홀수 → 아들, 짝수 → 딸
 */
export function predictByAncient49(
  momLunarAge: number,
  conceptionLunarMonth: number
): { gender: Ancient49Gender; calcValue: number; isOdd: boolean } {
  const calcValue = 49 + conceptionLunarMonth - momLunarAge + 19;
  const isOdd = calcValue % 2 !== 0;
  return { gender: isOdd ? "Boy" : "Girl", calcValue, isOdd };
}

export interface Ancient49State {
  motherBirthDate: string;
  conceptionDate: string;
  result: Ancient49Result | null;
  error: string | null;
}

export interface Ancient49Actions {
  setMotherBirthDate: (v: string) => void;
  setConceptionDate: (v: string) => void;
  predict: () => void;
  reset: () => void;
}

export function useAncient49Predictor(): Ancient49State & Ancient49Actions {
  const [motherBirthDate, setMotherBirthDate] = useState("");
  const [conceptionDate, setConceptionDate] = useState("");
  const [result, setResult] = useState<Ancient49Result | null>(null);
  const [error, setError] = useState<string | null>(null);

  function predict() {
    setError(null);
    setResult(null);

    if (!motherBirthDate || !conceptionDate) {
      setError("날짜를 모두 입력해주세요.");
      return;
    }

    const birth = new Date(motherBirthDate);
    const conception = new Date(conceptionDate);

    if (birth >= conception) {
      setError("임신일은 엄마 생년월일보다 이후여야 합니다.");
      return;
    }

    const momLunarAge = getChineseAge(birth, conception);

    if (momLunarAge < AGE_MIN || momLunarAge > AGE_MAX) {
      setError(`음력 연나이 ${momLunarAge}세는 계산 범위를 벗어납니다.`);
      return;
    }

    const lunarConception = solarToLunar(conception);
    const { gender, calcValue, isOdd } = predictByAncient49(
      momLunarAge,
      lunarConception.month
    );

    setResult({
      gender,
      momLunarAge,
      lunarConceptionMonth: lunarConception.month,
      calcValue,
      isOdd,
    });
  }

  function reset() {
    setResult(null);
    setError(null);
    setMotherBirthDate("");
    setConceptionDate("");
  }

  return {
    motherBirthDate,
    conceptionDate,
    result,
    error,
    setMotherBirthDate,
    setConceptionDate,
    predict,
    reset,
  };
}
