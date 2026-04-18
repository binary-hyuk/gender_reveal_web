import { ConceptionDateRangeInput } from "@/shared/ui/ConceptionDateRangeInput";
import { ErrorMessage } from "@/shared/ui/ErrorMessage";
import { PredictButton } from "@/shared/ui/PredictButton";
import { GlassCard } from "@/shared/ui/GlassCard";

interface Props {
  conceptionStart: string;
  conceptionEnd: string;
  error: string | null;
  onConceptionStartChange: (v: string) => void;
  onConceptionEndChange: (v: string) => void;
  onPredict: () => void;
}

export function PlanetaryWeekdayPredictForm({
  conceptionStart,
  conceptionEnd,
  error,
  onConceptionStartChange,
  onConceptionEndChange,
  onPredict,
}: Props) {
  return (
    <div className="w-full max-w-sm space-y-6">
      <GlassCard variant="soft" className="px-5 py-4 text-sm text-fg">
        수정일의 요일에 지배 행성을 대입합니다. 태양·화성·목성·토성 → 아들 / 달·수성·금성 → 딸
      </GlassCard>

      <GlassCard className="px-5 py-5 space-y-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-fg-subtle">
          날짜 정보
        </p>
        <ConceptionDateRangeInput
          label="임신(수정)일"
          startValue={conceptionStart}
          endValue={conceptionEnd}
          onStartChange={onConceptionStartChange}
          onEndChange={onConceptionEndChange}
        />
      </GlassCard>

      <ErrorMessage message={error} />

      <PredictButton onClick={onPredict}>성별 예측하기</PredictButton>
    </div>
  );
}
