import { GenderResultCard } from "@/shared/ui/GenderResultCard";
import type { KFengshuiResult } from "../model/useKFengshuiPredictor";

interface Props { result: KFengshuiResult; onReset: () => void; }

export function KFengshuiPredictResult({ result, onReset }: Props) {
  const details = [
    { label: "집 방향", value: result.houseDirection },
    { label: "거주 층수", value: `${result.floorNumber}층` },
    { label: "주소 글자수", value: `${result.locationLen}자` },
    { label: "층수 점수", value: `${result.floorScore > 0 ? "+" : ""}${result.floorScore} (${result.floorNumber % 2 !== 0 ? "홀수층" : "짝수층"})` },
    { label: "방향 점수", value: `${result.dirScore > 0 ? "+" : ""}${result.dirScore}` },
    { label: "주소 점수", value: `${result.locScore > 0 ? "+" : ""}${result.locScore} (${result.locationLen % 2 !== 0 ? "홀수" : "짝수"})` },
    { label: "합계", value: `${result.totalScore > 0 ? "+" : ""}${result.totalScore} → ${result.totalScore > 0 ? "아들의 기운" : "딸의 기운"}` },
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
