import { ConceptionDateRangeInput } from "@/shared/ui/ConceptionDateRangeInput";
import { ErrorMessage } from "@/shared/ui/ErrorMessage";
import { PredictButton } from "@/shared/ui/PredictButton";
import { GlassCard } from "@/shared/ui/GlassCard";

interface Props {
  conceptionStart: string;
  conceptionEnd: string;
  isNorthernHemisphere: boolean;
  error: string | null;
  onConceptionStartChange: (v: string) => void;
  onConceptionEndChange: (v: string) => void;
  onIsNorthernHemisphereChange: (v: boolean) => void;
  onPredict: () => void;
}

export function HippocratesWindPredictForm({
  conceptionStart, conceptionEnd, isNorthernHemisphere, error,
  onConceptionStartChange, onConceptionEndChange, onIsNorthernHemisphereChange, onPredict,
}: Props) {
  return (
    <div className="w-full max-w-sm space-y-6">
      <GlassCard variant="soft" className="px-4 py-3 text-sm text-fg">
        🌬️ 임신 월의 지배 바람(북풍/남풍)으로 성별을 판단합니다.
        <br />
        <span className="text-xs text-brand-700">북풍(건조) → 아들 / 남풍(다습) → 딸</span>
      </GlassCard>

      <ConceptionDateRangeInput
        label="임신(수정)일"
        startValue={conceptionStart}
        endValue={conceptionEnd}
        onStartChange={onConceptionStartChange}
        onEndChange={onConceptionEndChange}
      />

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-fg">거주 반구</label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { value: true, label: "🌏 북반구 (한국·아시아 등)" },
            { value: false, label: "🌎 남반구 (호주·남미 등)" },
          ].map(({ value, label }) => (
            <button
              key={String(value)}
              onClick={() => onIsNorthernHemisphereChange(value)}
              className={[
                "rounded-xl py-3 px-2 text-sm font-medium transition-colors",
                isNorthernHemisphere === value
                  ? "bg-brand-600 text-white shadow"
                  : "glass text-fg-muted hover:bg-white/70",
              ].join(" ")}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <ErrorMessage message={error} />

      <PredictButton onClick={onPredict}>성별 예측하기</PredictButton>
    </div>
  );
}
