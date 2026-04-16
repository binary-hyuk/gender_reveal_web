import { GenderResultCard } from "@/shared/ui/GenderResultCard";
import type { MayanResult } from "../model/useMayanPredictor";

interface Props {
  result: MayanResult;
  onReset: () => void;
}

export function MayanPredictResult({ result, onReset }: Props) {
  return (
    <GenderResultCard
      gender={result.gender}
      details={[
        {
          label: "엄마 나이",
          value: `${result.momAge}세 (${result.momIsEven ? "짝수" : "홀수"})`,
        },
        {
          label: "임신 월",
          value: `${result.conceptionMonth}월 (${result.monthIsEven ? "짝수" : "홀수"})`,
        },
        {
          label: "홀짝 일치 여부",
          value: result.momIsEven === result.monthIsEven ? "일치 → 딸" : "불일치 → 아들",
        },
      ]}
      note="* 마야식 예측: 홀짝이 같으면 딸, 다르면 아들"
      onReset={onReset}
    />
  );
}
