import { useState } from "react";
import { getChineseAge, solarToLunar } from "@/shared/lib/lunarConverter";
import { predictGender, AGE_MIN, AGE_MAX } from "./genderTable";

export interface PredictResult {
  gender: "아들" | "딸";
  chineseAge: number;
  lunarConceptionMonth: number;
}

export interface GenderPredictorState {
  motherBirthDate: string;
  conceptionDate: string;
  result: PredictResult | null;
  error: string | null;
}

export interface GenderPredictorActions {
  setMotherBirthDate: (v: string) => void;
  setConceptionDate: (v: string) => void;
  predict: () => void;
  reset: () => void;
}

export function useGenderPredictor(): GenderPredictorState & GenderPredictorActions {
  const [motherBirthDate, setMotherBirthDate] = useState("");
  const [conceptionDate, setConceptionDate] = useState("");
  const [result, setResult] = useState<PredictResult | null>(null);
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

    const chineseAge = getChineseAge(birth, conception);

    if (chineseAge < AGE_MIN || chineseAge > AGE_MAX) {
      setError(
        `음력 연나이 ${chineseAge}세는 예측 범위(${AGE_MIN}~${AGE_MAX}세)를 벗어납니다.`
      );
      return;
    }

    const lunarConception = solarToLunar(conception);
    const gender = predictGender(chineseAge, lunarConception.month);

    if (!gender) {
      setError("예측할 수 없는 범위입니다.");
      return;
    }

    setResult({
      gender,
      chineseAge,
      lunarConceptionMonth: lunarConception.month,
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
