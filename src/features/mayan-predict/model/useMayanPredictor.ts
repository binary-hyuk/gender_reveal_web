import { useState } from "react";
import { getAgeAtDate } from "@/shared/lib/ageUtils";
import {
  aggregateByRange,
  fallbackTieBreaker,
  validateRange,
  normalizeRange,
  datesInRange,
} from "@/shared/lib/dateRangePrediction";

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
  motherBirthDate: string;
  conceptionStart: string;
  conceptionEnd: string;
  result: MayanResult | null;
  error: string | null;
}

export interface MayanActions {
  setMotherBirthDate: (v: string) => void;
  setConceptionStart: (v: string) => void;
  setConceptionEnd: (v: string) => void;
  predict: () => void;
  reset: () => void;
}

export function useMayanPredictor(): MayanState & MayanActions {
  const [motherBirthDate, setMotherBirthDate] = useState("");
  const [conceptionStart, setConceptionStart] = useState("");
  const [conceptionEnd, setConceptionEnd] = useState("");
  const [result, setResult] = useState<MayanResult | null>(null);
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

    try {
      const aggregated = aggregateByRange<MayanResult>(
        startIso,
        endIso,
        (iso) => {
          const conception = new Date(iso);
          const momAge = getAgeAtDate(birth, conception);
          const conceptionMonth = conception.getMonth() + 1;
          return {
            gender: predictByMayan(momAge, conceptionMonth),
            momAge,
            conceptionMonth,
            momIsEven: momAge % 2 === 0,
            monthIsEven: conceptionMonth % 2 === 0,
          };
        },
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
