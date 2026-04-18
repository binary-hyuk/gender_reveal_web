import { ConceptionDateRangeInput } from "@/shared/ui/ConceptionDateRangeInput";
import { ErrorMessage } from "@/shared/ui/ErrorMessage";
import { PredictButton } from "@/shared/ui/PredictButton";
import { GlassCard } from "@/shared/ui/GlassCard";

interface Props {
  momName: string;
  dadName: string;
  conceptionStart: string;
  conceptionEnd: string;
  error: string | null;
  onMomNameChange: (v: string) => void;
  onDadNameChange: (v: string) => void;
  onConceptionStartChange: (v: string) => void;
  onConceptionEndChange: (v: string) => void;
  onPredict: () => void;
}

export function NumerologyPredictForm({
  momName,
  dadName,
  conceptionStart,
  conceptionEnd,
  error,
  onMomNameChange,
  onDadNameChange,
  onConceptionStartChange,
  onConceptionEndChange,
  onPredict,
}: Props) {
  return (
    <div className="w-full max-w-sm space-y-6">
      <GlassCard variant="soft" className="px-5 py-4 text-sm text-fg">
        공백 제거 후 엄마·아빠 이름 글자 수 + 임신 월의 합이 홀수면 아들, 짝수면 딸로 예측합니다.
      </GlassCard>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-fg">
            엄마 이름
          </label>
          <input
            type="text"
            value={momName}
            onChange={(e) => onMomNameChange(e.target.value)}
            placeholder="예: 김민지"
            className="w-full rounded-xl glass px-4 py-3 text-fg outline-none focus:ring-2 focus:ring-brand-200"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-fg">
            아빠 이름
          </label>
          <input
            type="text"
            value={dadName}
            onChange={(e) => onDadNameChange(e.target.value)}
            placeholder="예: 이준호"
            className="w-full rounded-xl glass px-4 py-3 text-fg outline-none focus:ring-2 focus:ring-brand-200"
          />
        </div>

        <ConceptionDateRangeInput
          label="임신(수정)일"
          startValue={conceptionStart}
          endValue={conceptionEnd}
          onStartChange={onConceptionStartChange}
          onEndChange={onConceptionEndChange}
        />
      </div>

      <ErrorMessage message={error} />

      <PredictButton onClick={onPredict}>성별 예측하기</PredictButton>
    </div>
  );
}
