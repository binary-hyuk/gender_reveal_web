import { useState } from "react";
import { getAgeAtDate } from "@/shared/lib/ageUtils";
import {
  aggregateByRange,
  fallbackTieBreaker,
  validateRange,
  normalizeRange,
  datesInRange,
} from "@/shared/lib/dateRangePrediction";

export type GypsyGender = "Boy" | "Girl";

export interface GypsyResult {
  gender: GypsyGender;
  motherBirthDate: string;
  conceptionDate: string;
  motherAge: number;
  conceptionMonth: number;
  totalSum: number;
  isOdd: boolean;
}

/**
 * 집시 전통 생월법 성별 예측
 * 임신 당시 엄마 나이 + 임신 월 → 홀수=아들, 짝수=딸
 */
export function predictByGypsy(
  motherBirthDateIso: string,
  conceptionDateIso: string
): GypsyResult {
  const birthDate = new Date(motherBirthDateIso);
  const conceptionDate = new Date(conceptionDateIso);
  const motherAge = getAgeAtDate(birthDate, conceptionDate);
  const conceptionMonth = conceptionDate.getMonth() + 1;
  const totalSum = motherAge + conceptionMonth;
  const isOdd = totalSum % 2 !== 0;
  return {
    gender: isOdd ? "Boy" : "Girl",
    motherBirthDate: motherBirthDateIso,
    conceptionDate: conceptionDateIso,
    motherAge,
    conceptionMonth,
    totalSum,
    isOdd,
  };
}

export interface GypsyState {
  motherBirthDate: string;
  conceptionStart: string;
  conceptionEnd: string;
  result: GypsyResult | null;
  error: string | null;
}

export interface GypsyActions {
  setMotherBirthDate: (v: string) => void;
  setConceptionStart: (v: string) => void;
  setConceptionEnd: (v: string) => void;
  predict: () => void;
  reset: () => void;
}

export function useGypsyPredictor(): GypsyState & GypsyActions {
  const [motherBirthDate, setMotherBirthDate] = useState("");
  const [conceptionStart, setConceptionStart] = useState("");
  const [conceptionEnd, setConceptionEnd] = useState("");
  const [result, setResult] = useState<GypsyResult | null>(null);
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

    const birthDate = new Date(motherBirthDate);
    const days = datesInRange(startIso, endIso);
    if (birthDate >= new Date(days[0])) {
      setError("임신일은 엄마 생년월일보다 이후여야 합니다.");
      return;
    }

    try {
      const aggregated = aggregateByRange<GypsyResult>(
        startIso,
        endIso,
        (iso) => predictByGypsy(motherBirthDate, iso),
        fallbackTieBreaker,
      );
      const { rangeInfo: _r, ...rest } = aggregated;
      void _r;
      setResult(rest);
    } catch (e) {
      setError((e as Error).message);
    }
  }

  function reset() {
    setResult(null);
    setError(null);
  }

  return {
    motherBirthDate, conceptionStart, conceptionEnd, result, error,
    setMotherBirthDate, setConceptionStart, setConceptionEnd, predict, reset,
  };
}
