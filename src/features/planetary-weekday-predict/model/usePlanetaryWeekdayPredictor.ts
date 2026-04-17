import { useState } from "react";
import {
  aggregateByRange,
  fallbackTieBreaker,
  validateRange,
  normalizeRange,
} from "@/shared/lib/dateRangePrediction";
import { toErrorMessage } from "@/shared/lib/errorMessage";

export type PlanetaryGender = "Boy" | "Girl";

export interface PlanetaryResult {
  gender: PlanetaryGender;
  conceptionDate: string; // ISO date
  dayOfWeek: number; // 0=Sun, 6=Sat
  dayName: string; // Korean day name
  planetName: string; // Korean planet name
  planetEmoji: string;
}

const DAY_INFO = [
  { dayName: "일요일", planetName: "태양", planetEmoji: "☀️", gender: "Boy" as PlanetaryGender },
  { dayName: "월요일", planetName: "달",   planetEmoji: "🌙", gender: "Girl" as PlanetaryGender },
  { dayName: "화요일", planetName: "화성", planetEmoji: "🔴", gender: "Boy" as PlanetaryGender },
  { dayName: "수요일", planetName: "수성", planetEmoji: "☿️", gender: "Girl" as PlanetaryGender },
  { dayName: "목요일", planetName: "목성", planetEmoji: "🪐", gender: "Boy" as PlanetaryGender },
  { dayName: "금요일", planetName: "금성", planetEmoji: "♀️", gender: "Girl" as PlanetaryGender },
  { dayName: "토요일", planetName: "토성", planetEmoji: "🪐", gender: "Boy" as PlanetaryGender },
];

export function predictByPlanetaryWeekday(conceptionDateIso: string): PlanetaryResult {
  const date = new Date(conceptionDateIso);
  const dow = date.getDay(); // 0=Sun

  const info = DAY_INFO[dow];
  return {
    gender: info.gender,
    conceptionDate: conceptionDateIso,
    dayOfWeek: dow,
    dayName: info.dayName,
    planetName: info.planetName,
    planetEmoji: info.planetEmoji,
  };
}

export interface PlanetaryState {
  conceptionStart: string;
  conceptionEnd: string;
  result: PlanetaryResult | null;
  error: string | null;
}

export interface PlanetaryActions {
  setConceptionStart: (v: string) => void;
  setConceptionEnd: (v: string) => void;
  predict: () => void;
  reset: () => void;
}

export function usePlanetaryWeekdayPredictor(): PlanetaryState & PlanetaryActions {
  const [conceptionStart, setConceptionStart] = useState("");
  const [conceptionEnd, setConceptionEnd] = useState("");
  const [result, setResult] = useState<PlanetaryResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  function predict() {
    setError(null);
    setResult(null);

    const [startIso, endIso] = normalizeRange(conceptionStart, conceptionEnd);
    const rangeErr = validateRange(startIso, endIso);
    if (rangeErr) {
      setError(rangeErr);
      return;
    }

    try {
      const aggregated = aggregateByRange<PlanetaryResult>(
        startIso,
        endIso,
        (iso) => predictByPlanetaryWeekday(iso),
        fallbackTieBreaker,
      );
      const { rangeInfo: _rangeInfo, ...rest } = aggregated;
      setResult(rest);
    } catch (e) {
      setError(toErrorMessage(e));
    }
  }

  function reset() {
    setResult(null);
    setError(null);
  }

  return {
    conceptionStart, conceptionEnd, result, error,
    setConceptionStart, setConceptionEnd, predict, reset,
  };
}
