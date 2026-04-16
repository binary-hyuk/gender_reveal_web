import { GenderResultCard } from "@/shared/ui/GenderResultCard";
import type { DigitalDnaResult } from "../model/useDigitalDnaPredictor";

interface Props { result: DigitalDnaResult; onReset: () => void; }

export function DigitalDnaPredictResult({ result, onReset }: Props) {
  const details = [
    { label: "엄마 MBTI", value: result.momMBTI },
    { label: "아빠 MBTI", value: result.dadMBTI },
    { label: "합산 MBTI", value: result.momMBTI + result.dadMBTI },
    { label: "🔵 아들 에너지 (E·S·T·P)", value: `${result.boyEnergy - (result.emojiBonus === "Boy" ? 2 : 0)}점` },
    { label: "🔴 딸 에너지 (I·N·F·J)", value: `${result.girlEnergy - (result.emojiBonus === "Girl" ? 2 : 0)}점` },
    { label: "최애 이모티콘", value: `${result.favEmoji} (U+${result.emojiCode.toString(16).toUpperCase()})` },
    { label: "이모티콘 보너스", value: `${result.emojiCode} ${result.emojiCode % 2 === 1 ? "홀수" : "짝수"} → ${result.emojiBonus === "Boy" ? "아들" : "딸"} +2` },
    { label: "최종", value: `아들 ${result.boyEnergy} vs 딸 ${result.girlEnergy}` },
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
