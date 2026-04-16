import { useState } from "react";
import {
  predictByBloodType,
  BLOOD_TYPES,
  type BloodType,
  type BloodTypeProbability,
} from "./bloodTypeMatrix";

export interface BloodTypeResult {
  dadBlood: BloodType;
  momBlood: BloodType;
  probability: BloodTypeProbability;
}

export { BLOOD_TYPES };
export type { BloodType };

export interface BloodTypeState {
  dadBlood: BloodType;
  momBlood: BloodType;
  result: BloodTypeResult | null;
  error: string | null;
}

export interface BloodTypeActions {
  setDadBlood: (v: BloodType) => void;
  setMomBlood: (v: BloodType) => void;
  predict: () => void;
  reset: () => void;
}

export function useBloodTypePredictor(): BloodTypeState & BloodTypeActions {
  const [dadBlood, setDadBlood] = useState<BloodType>("A");
  const [momBlood, setMomBlood] = useState<BloodType>("A");
  const [result, setResult] = useState<BloodTypeResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  function predict() {
    setError(null);
    setResult({
      dadBlood,
      momBlood,
      probability: predictByBloodType(dadBlood, momBlood),
    });
  }

  function reset() {
    setResult(null);
    setError(null);
    setDadBlood("A");
    setMomBlood("A");
  }

  return { dadBlood, momBlood, result, error, setDadBlood, setMomBlood, predict, reset };
}
