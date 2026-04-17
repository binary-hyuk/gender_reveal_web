import { GenderResultCard } from "@/shared/ui/GenderResultCard";
import type { PredictResult } from "../model/useGenderPredictor";

interface Props {
  result: PredictResult;
  onReset: () => void;
}

/**
 * 중국 황실 달력 결과를 공용 `GenderResultCard`로 표시.
 * 내부 PredictResult의 "아들"/"딸"은 카드 props에 맞게 "Boy"/"Girl"로 변환한다.
 */
export function GenderPredictResult({ result, onReset }: Props) {
  const gender = result.gender === "아들" ? "Boy" : "Girl";

  return (
    <GenderResultCard
      gender={gender}
      details={[
        { label: "엄마의 만나이", value: `${result.motherAge}세` },
        { label: "임신한 음력 월", value: `${result.lunarConceptionMonth}월` },
        { label: "예측 성별", value: result.gender },
      ]}
      note="* 중국 황실 달력 기반 예측입니다. 재미로만 참고하세요 😊"
      onReset={onReset}
    />
  );
}
