import { useState } from "react";
import { solarToLunar } from "@/shared/lib/lunarConverter";
import { getAgeAtDate } from "@/shared/lib/ageUtils";
import { predictGender, AGE_MIN, AGE_MAX } from "./genderTable";
import {
  datesInRange,
  triangularWeights,
  fallbackTieBreaker,
  validateRange,
  normalizeRange,
} from "@/shared/lib/dateRangePrediction";

export interface PredictResult {
  gender: "아들" | "딸";
  /** 임신 당시 엄마의 만나이 */
  motherAge: number;
  lunarConceptionMonth: number;
}

export interface GenderPredictorState {
  motherBirthDate: string;
  conceptionStart: string;
  conceptionEnd: string;
  result: PredictResult | null;
  error: string | null;
}

export interface GenderPredictorActions {
  setMotherBirthDate: (v: string) => void;
  setConceptionStart: (v: string) => void;
  setConceptionEnd: (v: string) => void;
  predict: () => void;
  reset: () => void;
}

export function useGenderPredictor(): GenderPredictorState & GenderPredictorActions {
  const [motherBirthDate, setMotherBirthDate] = useState("");
  const [conceptionStart, setConceptionStart] = useState("");
  const [conceptionEnd, setConceptionEnd] = useState("");
  const [result, setResult] = useState<PredictResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  function predict() {
    setError(null);
    setResult(null);

    if (!motherBirthDate) {
      setError("엄마 생년월일을 입력해주세요.");
      return;
    }

    const [startIso, endIso] = normalizeRange(conceptionStart, conceptionEnd);
    const rangeErr = validateRange(startIso, endIso);
    if (rangeErr) {
      setError(rangeErr);
      return;
    }

    const birth = new Date(motherBirthDate);
    const days = datesInRange(startIso, endIso);
    if (birth >= new Date(days[0])) {
      setError("임신일은 엄마 생년월일보다 이후여야 합니다.");
      return;
    }

    const weights = triangularWeights(days.length);
    const midIdx = Math.floor((days.length - 1) / 2);

    let midResult: PredictResult | null = null;
    let boyW = 0;
    let girlW = 0;

    for (let i = 0; i < days.length; i++) {
      const conception = new Date(days[i]);
      const motherAge = getAgeAtDate(birth, conception);
      if (motherAge < AGE_MIN || motherAge > AGE_MAX) continue;
      const lunar = solarToLunar(conception);
      const korean = predictGender(motherAge, lunar.month);
      if (!korean) continue;

      if (korean === "아들") boyW += weights[i];
      else girlW += weights[i];

      if (i === midIdx) {
        midResult = {
          gender: korean,
          motherAge,
          lunarConceptionMonth: lunar.month,
        };
      }
    }

    // midpoint가 실패했다면 성공한 다른 날짜를 대체 표시값으로 사용
    if (!midResult) {
      for (let i = 0; i < days.length; i++) {
        const conception = new Date(days[i]);
        const motherAge = getAgeAtDate(birth, conception);
        if (motherAge < AGE_MIN || motherAge > AGE_MAX) continue;
        const lunar = solarToLunar(conception);
        const korean = predictGender(motherAge, lunar.month);
        if (korean) {
          midResult = {
            gender: korean,
            motherAge,
            lunarConceptionMonth: lunar.month,
          };
          break;
        }
      }
    }

    if (!midResult || boyW + girlW === 0) {
      setError("예측 범위를 벗어나는 기간입니다.");
      return;
    }

    let finalKorean: "아들" | "딸";
    if (boyW === girlW) {
      const tb = fallbackTieBreaker(days[midIdx]);
      finalKorean = tb === "Boy" ? "아들" : "딸";
    } else {
      finalKorean = boyW > girlW ? "아들" : "딸";
    }

    setResult({ ...midResult, gender: finalKorean });
  }

  function reset() {
    setResult(null);
    setError(null);
    setMotherBirthDate("");
    setConceptionStart("");
    setConceptionEnd("");
  }

  return {
    motherBirthDate,
    conceptionStart,
    conceptionEnd,
    result,
    error,
    setMotherBirthDate,
    setConceptionStart,
    setConceptionEnd,
    predict,
    reset,
  };
}
