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

export function LunarZodiacPredictForm({
  conceptionStart,
  conceptionEnd,
  error,
  onConceptionStartChange,
  onConceptionEndChange,
  onPredict,
}: Props) {
  return (
    <div className="w-full max-w-sm space-y-6">
      <GlassCard variant="soft" className="px-4 py-3 text-sm text-fg">
        임신일 기준으로 달(Moon)이 위치한 황도 별자리를 계산합니다.
        <br />
        <span className="text-xs text-fg-subtle">
          남성 별자리: 양·쌍둥이·사자·천칭·사수·물병자리
        </span>
      </GlassCard>

      <ConceptionDateRangeInput
        label="임신(수정)일"
        startValue={conceptionStart}
        endValue={conceptionEnd}
        onStartChange={onConceptionStartChange}
        onEndChange={onConceptionEndChange}
      />

      <ErrorMessage message={error} />

      <PredictButton onClick={onPredict}>성별 예측하기</PredictButton>
    </div>
  );
}
