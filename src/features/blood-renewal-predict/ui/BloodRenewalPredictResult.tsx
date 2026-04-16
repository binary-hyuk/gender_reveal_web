import { GenderResultCard } from "@/shared/ui/GenderResultCard";
import type {
  BloodRenewalResult,
  BloodRenewalGender,
} from "../model/useBloodRenewalPredictor";

interface Props {
  result: BloodRenewalResult;
  onReset: () => void;
}

const TIE_CONFIG = {
  emoji: "🤝",
  label: "판정 불가 (동점)",
  bg: "from-gray-100 to-gray-200",
  text: "text-gray-700",
};

export function BloodRenewalPredictResult({ result, onReset }: Props) {
  if (result.gender === "Tie") {
    return (
      <div className="w-full max-w-sm space-y-4">
        <div
          className={`rounded-2xl bg-gradient-to-br ${TIE_CONFIG.bg} p-8 text-center shadow-lg`}
        >
          <div className="mb-3 text-7xl">{TIE_CONFIG.emoji}</div>
          <h2 className={`text-2xl font-extrabold ${TIE_CONFIG.text}`}>
            {TIE_CONFIG.label}
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            나머지가 동일하여 예측 불가
          </p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white px-6 py-4 shadow-sm">
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>아빠 나이 % 4</span>
              <span className="font-semibold text-gray-800">
                {result.dadAge} % 4 = {result.dadRem}
              </span>
            </div>
            <div className="flex justify-between">
              <span>엄마 나이 % 3</span>
              <span className="font-semibold text-gray-800">
                {result.momAge} % 3 = {result.momRem}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={onReset}
          className="w-full rounded-xl border border-gray-200 bg-white py-3 text-sm font-semibold text-gray-600 shadow-sm hover:bg-gray-50"
        >
          다시 예측하기
        </button>
      </div>
    );
  }

  return (
    <GenderResultCard
      gender={result.gender as Exclude<BloodRenewalGender, "Tie">}
      details={[
        {
          label: "아빠 나이 % 4",
          value: `${result.dadAge} % 4 = ${result.dadRem}`,
        },
        {
          label: "엄마 나이 % 3",
          value: `${result.momAge} % 3 = ${result.momRem}`,
        },
        {
          label: "비교",
          value:
            result.dadRem > result.momRem
              ? `${result.dadRem} > ${result.momRem} → 아들`
              : `${result.dadRem} < ${result.momRem} → 딸`,
        },
      ]}
      note="* 아빠 나머지 > 엄마 나머지면 아들, 작으면 딸"
      onReset={onReset}
    />
  );
}
