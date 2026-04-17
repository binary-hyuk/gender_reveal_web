import { useState } from "react";
import { usePersistedState } from "@/shared/lib/usePersistedState";
import { addHistory } from "@/shared/lib/predictionHistory";
import {
  buildRecommendations,
  type PlannerRecommendations,
  type Target,
} from "./recommender";
import { toErrorMessage } from "@/shared/lib/errorMessage";

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
  const [motherBirthDate, setMotherBirthDate] = usePersistedState("planner:motherBirthDate:v1", "");
  const [fatherBirthDate, setFatherBirthDate] = usePersistedState("planner:fatherBirthDate:v1", "");
  const [momMBTI, setMomMBTI] = usePersistedState("planner:momMBTI:v1", "");
  const [dadMBTI, setDadMBTI] = usePersistedState("planner:dadMBTI:v1", "");
  const [target, setTarget] = usePersistedState<PlannerTarget>("planner:target:v1", "Girl");
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
      try {
        const topLabel = r.topMonths[0]?.label ?? "";
        addHistory({
          page: "planner",
          pageTitle: "성별 플래너",
          resultEmoji: target === "Boy" ? "👦" : "👧",
          resultLabel: `${target === "Boy" ? "아들" : "딸"} 맞춤 가이드`,
          summary: topLabel ? `추천 Top: ${topLabel}` : undefined,
        });
      } catch {
        // 무시
      }
    } catch (e) {
      setError(toErrorMessage(e));
    }
  }

  function reset() {
    setResult(null);
    setError(null);
  }

  return {
    motherBirthDate, fatherBirthDate, momMBTI, dadMBTI, target, result, error,
    setMotherBirthDate, setFatherBirthDate, setMomMBTI, setDadMBTI, setTarget, predict, reset,
  };
}
