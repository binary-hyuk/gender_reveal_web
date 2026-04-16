import { GenderResultCard } from "@/shared/ui/GenderResultCard";
import type { EgyptWheatResult } from "../model/useEgyptWheatPredictor";

interface Props { result: EgyptWheatResult; onReset: () => void; }

export function EgyptWheatPredictResult({ result, onReset }: Props) {
  const details = [
    { label: "엄마 이름", value: result.momName },
    { label: "거주 지역", value: result.locationString },
    { label: "환경 계수 (envFactor)", value: `${result.envFactor}` },
    { label: "수정일 숫자", value: `${result.conceptionDateNum}` },
    { label: "보리 발아 일수", value: `${result.barleyDays}일` },
    { label: "밀 발아 일수", value: `${result.wheatDays}일` },
    { label: "판정", value: result.barleyDays <= result.wheatDays ? `보리(${result.barleyDays}) ≤ 밀(${result.wheatDays}) → 아들` : `밀(${result.wheatDays}) < 보리(${result.barleyDays}) → 딸` },
  ];
  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-sm">
      <GenderResultCard gender={result.gender} details={details} />
      <button onClick={onReset} className="w-full rounded-xl border border-gray-200 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50">
        다시 예측하기
      </button>
    </div>
  );
}
