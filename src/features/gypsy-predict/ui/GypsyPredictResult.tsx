import { GenderResultCard } from "@/shared/ui/GenderResultCard";
import type { GypsyResult } from "../model/useGypsyPredictor";

interface Props {
  result: GypsyResult;
  onReset: () => void;
}

export function GypsyPredictResult({ result, onReset }: Props) {
  return (
    <GenderResultCard
      gender={result.gender}
      details={[
        {
          label: "엄마 나이",
          value: `${result.motherAge}세`,
        },
        {
          label: "임신 월",
          value: `${result.conceptionMonth}월`,
        },
        {
          label: "합계",
          value: `${result.motherAge} + ${result.conceptionMonth} = ${result.totalSum}`,
        },
        {
          label: "홀짝",
          value: result.isOdd ? "홀수 → 아들" : "짝수 → 딸",
        },
      ]}
      note="* 집시 전통 생월법: 엄마 나이 + 임신 월이 홀수면 아들, 짝수면 딸"
      onReset={onReset}
    />
  );
}
