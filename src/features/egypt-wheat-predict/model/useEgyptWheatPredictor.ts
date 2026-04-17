import { useState } from "react";
import {
  aggregateByRange,
  fallbackTieBreaker,
  validateRange,
  normalizeRange,
} from "@/shared/lib/dateRangePrediction";

export type EgyptWheatGender = "Boy" | "Girl";

export interface EgyptWheatResult {
  gender: EgyptWheatGender;
  momName: string;
  conceptionDateNum: number;
  locationString: string;
  envFactor: number;
  barleyDays: number;
  wheatDays: number;
}

/**
 * 고대 이집트 밀과 보리 시뮬레이터 2.0
 * envFactor = 이름 길이 + 지역 길이
 * barleyDays = (수정일숫자 % envFactor) + 1
 * wheatDays  = (수정일숫자 % (envFactor+3)) + 1
 * barleyDays < wheatDays → Boy / wheatDays < barleyDays → Girl / 동점 → Boy
 */
export function predictByEgyptWheat(
  momName: string,
  conceptionDateIso: string,
  locationString: string
): EgyptWheatResult {
  const conceptionDateNum = parseInt(conceptionDateIso.replace(/-/g, ""), 10);
  const envFactor = momName.replace(/\s/g, "").length + locationString.replace(/\s/g, "").length;
  const safeEnv = envFactor === 0 ? 1 : envFactor;
  const barleyDays = (conceptionDateNum % safeEnv) + 1;
  const wheatDays = (conceptionDateNum % (safeEnv + 3)) + 1;
  const gender: EgyptWheatGender = barleyDays <= wheatDays ? "Boy" : "Girl";
  return { gender, momName, conceptionDateNum, locationString, envFactor: safeEnv, barleyDays, wheatDays };
}

export interface EgyptWheatState {
  momName: string;
  conceptionStart: string;
  conceptionEnd: string;
  locationString: string;
  result: EgyptWheatResult | null;
  error: string | null;
}
export interface EgyptWheatActions {
  setMomName: (v: string) => void;
  setConceptionStart: (v: string) => void;
  setConceptionEnd: (v: string) => void;
  setLocationString: (v: string) => void;
  predict: () => void;
  reset: () => void;
}

export function useEgyptWheatPredictor(): EgyptWheatState & EgyptWheatActions {
  const [momName, setMomName] = useState("");
  const [conceptionStart, setConceptionStart] = useState("");
  const [conceptionEnd, setConceptionEnd] = useState("");
  const [locationString, setLocationString] = useState("");
  const [result, setResult] = useState<EgyptWheatResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  function predict() {
    setError(null);
    setResult(null);
    if (!momName.trim() || !locationString.trim()) {
      setError("엄마 이름과 거주 지역을 입력해주세요.");
      return;
    }
    const [startIso, endIso] = normalizeRange(conceptionStart, conceptionEnd);
    const rangeErr = validateRange(startIso, endIso);
    if (rangeErr) {
      setError(rangeErr);
      return;
    }
    try {
      const aggregated = aggregateByRange<EgyptWheatResult>(
        startIso,
        endIso,
        (iso) => predictByEgyptWheat(momName.trim(), iso, locationString.trim()),
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
    momName, conceptionStart, conceptionEnd, locationString, result, error,
    setMomName, setConceptionStart, setConceptionEnd, setLocationString, predict, reset,
  };
}
