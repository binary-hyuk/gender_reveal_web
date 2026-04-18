import { DateTextInput } from "@/shared/ui/DateTextInput";
import { ConceptionDateRangeInput } from "@/shared/ui/ConceptionDateRangeInput";
import { ErrorMessage } from "@/shared/ui/ErrorMessage";
import { PredictButton } from "@/shared/ui/PredictButton";
import { GlassCard } from "@/shared/ui/GlassCard";

interface Props {
  motherBirthDate: string;
  conceptionStart: string;
  conceptionEnd: string;
  error: string | null;
  onMotherBirthDateChange: (v: string) => void;
  onConceptionStartChange: (v: string) => void;
  onConceptionEndChange: (v: string) => void;
  onPredict: () => void;
}

export function GypsyPredictForm({
  motherBirthDate,
  conceptionStart,
  conceptionEnd,
  error,
  onMotherBirthDateChange,
  onConceptionStartChange,
  onConceptionEndChange,
  onPredict,
}: Props) {
  return (
    <div className="w-full max-w-sm space-y-6">
      <GlassCard variant="soft" className="px-5 py-4 text-sm text-fg">
        임신 당시 엄마 나이 + 임신 월의 합이 홀수면 아들, 짝수면 딸로 예측합니다.
      </GlassCard>

      <GlassCard className="px-5 py-5 space-y-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-fg-subtle">
          날짜 정보
        </p>
        <DateTextInput
          label="엄마 생년월일"
          hint="(양력)"
          value={motherBirthDate}
          onChange={onMotherBirthDateChange}
        />
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
