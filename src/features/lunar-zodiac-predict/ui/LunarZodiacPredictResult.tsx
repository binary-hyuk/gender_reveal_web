import { GenderResultCard } from "@/shared/ui/GenderResultCard";
import type { LunarZodiacResult } from "../model/useLunarZodiacPredictor";

interface Props {
  result: LunarZodiacResult;
  onReset: () => void;
}

export function LunarZodiacPredictResult({ result, onReset }: Props) {
  return (
    <GenderResultCard
      gender={result.gender}
      details={[
        {
          label: "달 별자리",
          value: `${result.moonSignKo} (${result.moonSign})`,
        },
        {
          label: "별자리 성질",
          value: result.isMaleSign ? "남성 별자리 → 아들" : "여성 별자리 → 딸",
        },
      ]}
      note="* 근사 계산 기반입니다. 별자리 경계 근방 날짜는 오차가 있을 수 있습니다."
      onReset={onReset}
    />
  );
}
