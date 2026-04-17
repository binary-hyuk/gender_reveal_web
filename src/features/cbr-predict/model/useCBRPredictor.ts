import { useState } from "react";
import {
  aggregateByRange,
  fallbackTieBreaker,
  validateRange,
  normalizeRange,
  datesInRange,
} from "@/shared/lib/dateRangePrediction";

export type FatherVibe = "PASSION" | "CALM" | "STABLE" | "FLEXIBLE";
export type CBRGender = "Boy" | "Girl";

export const VIBE_INFO: Record<FatherVibe, { label: string; emoji: string; element: string; weight: number }> = {
  PASSION:  { label: "열정",  emoji: "🔥", element: "火(양)", weight:  0.45 },
  CALM:     { label: "고요함", emoji: "💧", element: "水(음)", weight: -0.45 },
  STABLE:   { label: "안정",  emoji: "⛰️", element: "土(중립-양)", weight:  0.15 },
  FLEXIBLE: { label: "유연함", emoji: "🌿", element: "木(중립-음)", weight: -0.15 },
};

export interface CBRResult {
  gender: CBRGender;
  probability: number;     // 0~1 sigmoid 결과
  totalEnergy: number;
  momPolarity: number;
  lunarVector: number;
  fatherWeight: number;
  lunarCyclePct: number;   // 달 주기 0~1
  energyStrength: string;  // "매우 강함" | "강함" | "보통" | "약함(박빙)"
  motherDob: string;       // ISO
  conceptionDate: string;  // ISO
  fatherVibe: FatherVibe;
}

const KNOWN_NEW_MOON = new Date("2024-01-11").getTime();
const MS_PER_DAY = 86400000;

function sigmoid(x: number): number {
  return 1 / (1 + Math.exp(-x));
}

function energyStrength(totalEnergy: number): string {
  const abs = Math.abs(totalEnergy);
  if (abs > 0.5) return "매우 강함 🔥";
  if (abs > 0.2) return "강함";
  if (abs > 0.1) return "보통";
  return "약함 (박빙)";
}

/**
 * CBR-Engine: Chrono-Biological Resonance Gender Prediction
 * 시공간 생체 공명 판별 엔진
 */
export function predictCBR(
  motherDob: Date,
  conceptionDate: Date,
  fatherVibe: FatherVibe
): CBRResult {
  // 1. 산모의 연도별 오행 극성
  const momYear = motherDob.getFullYear();
  const momPolarity = (momYear % 10) % 2 === 0 ? 0.65 : -0.65;

  // 2. 달 위상 공명도 (29.53일 주기 사인파)
  const daysSinceNewMoon = (conceptionDate.getTime() - KNOWN_NEW_MOON) / MS_PER_DAY;
  const lunarCyclePct = ((daysSinceNewMoon % 29.53) + 29.53) % 29.53 / 29.53;
  const lunarVector = Math.sin(lunarCyclePct * 2 * Math.PI);

  // 3. 부친의 기운 가중치
  const fatherWeight = VIBE_INFO[fatherVibe].weight;

  // 4. 최종 합산 + 시그모이드 판별 (생물학적 성비 편향 0.052 반영)
  const totalEnergy = momPolarity * 0.3 + lunarVector * 0.4 + fatherWeight * 0.3;
  const probability = sigmoid(totalEnergy + 0.052);

  return {
    gender: probability >= 0.512 ? "Boy" : "Girl",
    probability: Math.round(probability * 10000) / 100,   // % 2자리
    totalEnergy: Math.round(totalEnergy * 1000) / 1000,
    momPolarity,
    lunarVector: Math.round(lunarVector * 1000) / 1000,
    fatherWeight,
    lunarCyclePct: Math.round(lunarCyclePct * 100),
    energyStrength: energyStrength(totalEnergy),
    motherDob: motherDob.toISOString().slice(0, 10),
    conceptionDate: conceptionDate.toISOString().slice(0, 10),
    fatherVibe,
  };
}

export interface CBRState {
  motherDob: string;
  conceptionStart: string;
  conceptionEnd: string;
  fatherVibe: FatherVibe;
  result: CBRResult | null;
  error: string | null;
}
export interface CBRActions {
  setMotherDob: (v: string) => void;
  setConceptionStart: (v: string) => void;
  setConceptionEnd: (v: string) => void;
  setFatherVibe: (v: FatherVibe) => void;
  predict: () => void;
  reset: () => void;
}

export function useCBRPredictor(): CBRState & CBRActions {
  const [motherDob, setMotherDob] = useState("");
  const [conceptionStart, setConceptionStart] = useState("");
  const [conceptionEnd, setConceptionEnd] = useState("");
  const [fatherVibe, setFatherVibe] = useState<FatherVibe>("STABLE");
  const [result, setResult] = useState<CBRResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  function predict() {
    setError(null); setResult(null);
    if (!motherDob) {
      setError("산모 생년월일을 입력해주세요.");
      return;
    }
    const mom = new Date(motherDob);
    if (isNaN(mom.getTime())) {
      setError("올바른 산모 생년월일을 입력해주세요.");
      return;
    }
    const [startIso, endIso] = normalizeRange(conceptionStart, conceptionEnd);
    const rangeErr = validateRange(startIso, endIso);
    if (rangeErr) {
      setError(rangeErr);
      return;
    }
    const days = datesInRange(startIso, endIso);
    if (mom >= new Date(days[0])) {
      setError("수정일은 산모 생년월일 이후여야 합니다.");
      return;
    }

    try {
      const aggregated = aggregateByRange<CBRResult>(
        startIso,
        endIso,
        (iso) => predictCBR(mom, new Date(iso), fatherVibe),
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
    motherDob, conceptionStart, conceptionEnd, fatherVibe, result, error,
    setMotherDob, setConceptionStart, setConceptionEnd, setFatherVibe, predict, reset,
  };
}
