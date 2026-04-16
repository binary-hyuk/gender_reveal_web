import { GenderResultCard } from "@/shared/ui/GenderResultCard";
import type { NumerologyResult } from "../model/useNumerologyPredictor";

interface Props {
  result: NumerologyResult;
  onReset: () => void;
}

export function NumerologyPredictResult({ result, onReset }: Props) {
  return (
    <GenderResultCard
      gender={result.gender}
      details={[
        {
          label: "엄마 이름",
          value: `${result.momName} (공백 제거: ${result.momLen}글자)`,
        },
        {
          label: "아빠 이름",
          value: `${result.dadName} (공백 제거: ${result.dadLen}글자)`,
        },
        {
          label: "임신 월",
          value: `${result.conceptionMonth}월`,
        },
        {
          label: "합계",
          value: `${result.momLen} + ${result.dadLen} + ${result.conceptionMonth} = ${result.totalSum}`,
        },
        {
          label: "홀짝",
          value: result.isOdd ? "홀수 → 아들" : "짝수 → 딸",
        },
      ]}
      note="* 수비학 예측: 이름 글자 수 합 + 임신 월이 홀수면 아들, 짝수면 딸"
      onReset={onReset}
    />
  );
}
