import { ConceptionDateRangeInput } from "@/shared/ui/ConceptionDateRangeInput";
import { ErrorMessage } from "@/shared/ui/ErrorMessage";
import { PredictButton } from "@/shared/ui/PredictButton";
import { GlassCard } from "@/shared/ui/GlassCard";

interface Props {
  momBirth: string;
  dadBirth: string;
  conceptionStart: string;
  conceptionEnd: string;
  error: string | null;
  onMomBirthChange: (v: string) => void;
  onDadBirthChange: (v: string) => void;
  onConceptionStartChange: (v: string) => void;
  onConceptionEndChange: (v: string) => void;
  onPredict: () => void;
}

export function OhangPredictForm({
  momBirth, dadBirth, conceptionStart, conceptionEnd, error,
  onMomBirthChange, onDadBirthChange, onConceptionStartChange, onConceptionEndChange, onPredict,
}: Props) {
  return (
    <div className="w-full max-w-sm space-y-6">
      <GlassCard variant="soft" className="px-4 py-3 text-sm text-fg">
        ☯️ 오행·간지·주역·황금비율을 융합한 천문 성별 예측법입니다.
        <br />
        <span className="text-xs text-brand-700">오행점수 + 주역점수 &gt; 20 → 아들 / ≤ 20 → 딸</span>
      </GlassCard>

      <div className="space-y-1.5">
        <label className="block text-sm font-semibold text-fg">엄마 생년월일 <span className="font-normal text-fg-subtle">(YYYYMMDD)</span></label>
        <input
          type="text" maxLength={8} value={momBirth}
          onChange={(e) => onMomBirthChange(e.target.value.replace(/\D/g, ''))}
          placeholder="예: 19950115"
          className="w-full rounded-xl glass px-4 py-3 text-fg outline-none focus:ring-2 focus:ring-brand-200"
        />
      </div>

      <div className="space-y-1.5">
        <label className="block text-sm font-semibold text-fg">아빠 생년월일 <span className="font-normal text-fg-subtle">(YYYYMMDD)</span></label>
        <input
          type="text" maxLength={8} value={dadBirth}
          onChange={(e) => onDadBirthChange(e.target.value.replace(/\D/g, ''))}
          placeholder="예: 19920320"
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

      <ErrorMessage message={error} />

      <PredictButton onClick={onPredict}>☯️ 오행 성별 예측하기</PredictButton>
    </div>
  );
}
