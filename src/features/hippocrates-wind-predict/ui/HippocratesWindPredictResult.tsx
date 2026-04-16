import { GenderResultCard } from "@/shared/ui/GenderResultCard";
import type { HippocratesResult } from "../model/useHippocratesWindPredictor";

interface Props { result: HippocratesResult; onReset: () => void; }

export function HippocratesWindPredictResult({ result, onReset }: Props) {
  const details = [
    { label: "임신 월", value: `${result.conceptionMonth}월` },
    { label: "거주 반구", value: result.isNorthernHemisphere ? "북반구" : "남반구" },
    { label: "겨울·봄 시기", value: result.isWinterSpring ? "예 (11월~4월)" : "아니오 (5월~10월)" },
    { label: "지배 바람", value: result.isNorthWind ? "🌬️ 북풍 (건조)" : "🌀 남풍 (다습)" },
    { label: "판정", value: result.isNorthWind ? "북풍 → 아들" : "남풍 → 딸" },
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
