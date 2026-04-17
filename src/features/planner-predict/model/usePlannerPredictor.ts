import { useState } from "react";
import {
  buildRecommendations,
  type PlannerRecommendations,
  type Target,
} from "./recommender";

export type PlannerTarget = Target;

export interface PlannerState {
  motherBirthDate: string;
  fatherBirthDate: string;
  momMBTI: string;
  dadMBTI: string;
  target: PlannerTarget;
  result: PlannerRecommendations | null;
  error: string | null;
}

export interface PlannerActions {
  setMotherBirthDate: (v: string) => void;
  setFatherBirthDate: (v: string) => void;
  setMomMBTI: (v: string) => void;
  setDadMBTI: (v: string) => void;
  setTarget: (v: PlannerTarget) => void;
  predict: () => void;
  reset: () => void;
}

export function usePlannerPredictor(): PlannerState & PlannerActions {
  const [motherBirthDate, setMotherBirthDate] = useState("");
  const [fatherBirthDate, setFatherBirthDate] = useState("");
  const [momMBTI, setMomMBTI] = useState("");
  const [dadMBTI, setDadMBTI] = useState("");
  const [target, setTarget] = useState<PlannerTarget>("Girl");
  const [result, setResult] = useState<PlannerRecommendations | null>(null);
  const [error, setError] = useState<string | null>(null);

  function predict() {
    setError(null);
    setResult(null);

    if (!motherBirthDate) {
      setError("엄마 생년월일을 입력해주세요.");
      return;
    }

    const motherBirth = new Date(motherBirthDate);
    if (isNaN(motherBirth.getTime())) {
      setError("올바른 엄마 생년월일을 입력해주세요.");
      return;
    }

    try {
      const r = buildRecommendations(motherBirth, target);
      setResult(r);
    } catch (e) {
      setError((e as Error).message);
    }
  }

  function reset() {
    setMotherBirthDate("");
    setFatherBirthDate("");
    setMomMBTI("");
    setDadMBTI("");
    setTarget("Girl");
    setResult(null);
    setError(null);
  }

  return {
    motherBirthDate, fatherBirthDate, momMBTI, dadMBTI, target, result, error,
    setMotherBirthDate, setFatherBirthDate, setMomMBTI, setDadMBTI, setTarget, predict, reset,
  };
}
