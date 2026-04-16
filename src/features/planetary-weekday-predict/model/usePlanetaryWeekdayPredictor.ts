import { useState } from "react";

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
  conceptionDate: string;
  result: PlanetaryResult | null;
  error: string | null;
}

export interface PlanetaryActions {
  setConceptionDate: (v: string) => void;
  predict: () => void;
  reset: () => void;
}

export function usePlanetaryWeekdayPredictor(): PlanetaryState & PlanetaryActions {
  const [conceptionDate, setConceptionDate] = useState("");
  const [result, setResult] = useState<PlanetaryResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  function predict() {
    setError(null);
    setResult(null);

    if (!conceptionDate) {
      setError("임신(수정)일을 입력해주세요.");
      return;
    }

    setResult(predictByPlanetaryWeekday(conceptionDate));
  }

  function reset() {
    setResult(null);
    setError(null);
    setConceptionDate("");
  }

  return {
    conceptionDate, result, error,
    setConceptionDate, predict, reset,
  };
}
