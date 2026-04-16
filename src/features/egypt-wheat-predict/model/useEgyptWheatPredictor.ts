import { useState } from "react";

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
  conceptionDate: string;
  locationString: string;
  result: EgyptWheatResult | null;
  error: string | null;
}
export interface EgyptWheatActions {
  setMomName: (v: string) => void;
  setConceptionDate: (v: string) => void;
  setLocationString: (v: string) => void;
  predict: () => void;
  reset: () => void;
}

export function useEgyptWheatPredictor(): EgyptWheatState & EgyptWheatActions {
  const [momName, setMomName] = useState("");
  const [conceptionDate, setConceptionDate] = useState("");
  const [locationString, setLocationString] = useState("");
  const [result, setResult] = useState<EgyptWheatResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  function predict() {
    setError(null);
    setResult(null);
    if (!momName.trim() || !conceptionDate || !locationString.trim()) {
      setError("모든 항목을 입력해주세요.");
      return;
    }
    setResult(predictByEgyptWheat(momName.trim(), conceptionDate, locationString.trim()));
  }

  function reset() {
    setResult(null); setError(null);
    setMomName(""); setConceptionDate(""); setLocationString("");
  }

  return { momName, conceptionDate, locationString, result, error, setMomName, setConceptionDate, setLocationString, predict, reset };
}
