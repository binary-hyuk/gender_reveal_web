import { useState } from "react";
import { getChineseAge, solarToLunar } from "@/shared/lib/lunarConverter";
import { AGE_MIN, AGE_MAX } from "@/features/gender-predict/model/genderTable";
import {
  aggregateByRange,
  fallbackTieBreaker,
  validateRange,
  normalizeRange,
  datesInRange,
} from "@/shared/lib/dateRangePrediction";
import { toErrorMessage } from "@/shared/lib/errorMessage";

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
  conceptionStart: string;
  conceptionEnd: string;
  result: Ancient49Result | null;
  error: string | null;
}

export interface Ancient49Actions {
  setMotherBirthDate: (v: string) => void;
  setConceptionStart: (v: string) => void;
  setConceptionEnd: (v: string) => void;
  predict: () => void;
  reset: () => void;
}

export function useAncient49Predictor(): Ancient49State & Ancient49Actions {
  const [motherBirthDate, setMotherBirthDate] = useState("");
  const [conceptionStart, setConceptionStart] = useState("");
  const [conceptionEnd, setConceptionEnd] = useState("");
  const [result, setResult] = useState<Ancient49Result | null>(null);
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

    // 각 날짜에서 음력 연나이 범위 체크 (모두 벗어나면 실패)
    const midIdx = Math.floor((days.length - 1) / 2);
    const midMomAge = getChineseAge(birth, new Date(days[midIdx]));
    if (midMomAge < AGE_MIN || midMomAge > AGE_MAX) {
      setError(`음력 연나이 ${midMomAge}세는 계산 범위를 벗어납니다.`);
      return;
    }

    try {
      const aggregated = aggregateByRange<Ancient49Result>(
        startIso,
        endIso,
        (iso) => {
          const conception = new Date(iso);
          const momLunarAge = getChineseAge(birth, conception);
          const lunarConception = solarToLunar(conception);
          const r = predictByAncient49(momLunarAge, lunarConception.month);
          return {
            gender: r.gender,
            momLunarAge,
            lunarConceptionMonth: lunarConception.month,
            calcValue: r.calcValue,
            isOdd: r.isOdd,
          };
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
    // 입력값은 유지하고 결과/에러만 초기화 — 같은 입력으로 재예측 가능
    setResult(null);
    setError(null);
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
