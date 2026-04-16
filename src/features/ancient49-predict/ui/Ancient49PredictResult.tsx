import { GenderResultCard } from "@/shared/ui/GenderResultCard";
import type { Ancient49Result } from "../model/useAncient49Predictor";

interface Props {
  result: Ancient49Result;
  onReset: () => void;
}

export function Ancient49PredictResult({ result, onReset }: Props) {
  return (
    <GenderResultCard
      gender={result.gender}
      details={[
        { label: "음력 연나이", value: `${result.momLunarAge}세` },
        { label: "음력 임신월", value: `${result.lunarConceptionMonth}월` },
        {
          label: "계산식",
          value: `49 + ${result.lunarConceptionMonth} - ${result.momLunarAge} + 19 = ${result.calcValue}`,
        },
        {
          label: "홀짝 판별",
          value: `${result.calcValue} → ${result.isOdd ? "홀수 (아들)" : "짝수 (딸)"}`,
        },
      ]}
      note="* 주역 49법: 결과가 홀수면 아들, 짝수면 딸"
      onReset={onReset}
    />
  );
}
