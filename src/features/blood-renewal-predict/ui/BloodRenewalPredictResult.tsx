import { GenderResultCard } from "@/shared/ui/GenderResultCard";
import { GlassCard } from "@/shared/ui/GlassCard";
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
        <GlassCard variant="strong" className="p-8 text-center">
          <div className="mb-3 text-7xl">{TIE_CONFIG.emoji}</div>
          <h2 className="text-2xl font-extrabold text-fg">
            {TIE_CONFIG.label}
          </h2>
          <p className="mt-2 text-sm text-fg-muted">
            나머지가 동일하여 예측 불가
          </p>
        </GlassCard>

        <GlassCard className="px-6 py-4">
          <div className="space-y-2 text-sm text-fg-muted">
            <div className="flex justify-between">
              <span>아빠 나이 % 4</span>
              <span className="font-semibold text-fg">
                {result.dadAge} % 4 = {result.dadRem}
              </span>
            </div>
            <div className="flex justify-between">
              <span>엄마 나이 % 3</span>
              <span className="font-semibold text-fg">
                {result.momAge} % 3 = {result.momRem}
              </span>
            </div>
          </div>
        </GlassCard>

        <button
          onClick={onReset}
          className="w-full rounded-xl glass py-3 text-sm font-semibold text-fg hover:bg-white/70"
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
