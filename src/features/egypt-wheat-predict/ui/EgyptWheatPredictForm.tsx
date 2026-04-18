import { ConceptionDateRangeInput } from "@/shared/ui/ConceptionDateRangeInput";
import { ErrorMessage } from "@/shared/ui/ErrorMessage";
import { PredictButton } from "@/shared/ui/PredictButton";
import { GlassCard } from "@/shared/ui/GlassCard";

interface Props {
  momName: string;
  conceptionStart: string;
  conceptionEnd: string;
  locationString: string;
  error: string | null;
  onMomNameChange: (v: string) => void;
  onConceptionStartChange: (v: string) => void;
  onConceptionEndChange: (v: string) => void;
  onLocationStringChange: (v: string) => void;
  onPredict: () => void;
}

export function EgyptWheatPredictForm({
  momName, conceptionStart, conceptionEnd, locationString, error,
  onMomNameChange, onConceptionStartChange, onConceptionEndChange, onLocationStringChange, onPredict,
}: Props) {
  return (
    <div className="w-full max-w-sm space-y-6">
      <GlassCard variant="soft" className="px-4 py-3 text-sm text-fg">
        🌾 엄마 이름 + 거주지 글자 수로 밀·보리 발아 일수를 겨룹니다.
        <br />
        <span className="text-xs text-brand-700">보리(보리) ≤ 밀(wheat) → 아들 / 밀이 더 짧으면 → 딸</span>
      </GlassCard>

      <div className="space-y-1.5">
        <label className="block text-sm font-semibold text-fg">엄마 이름</label>
        <input
          type="text"
          value={momName}
          onChange={(e) => onMomNameChange(e.target.value)}
          placeholder="예: 김지은"
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

      <div className="space-y-1.5">
        <label className="block text-sm font-semibold text-fg">거주 지역</label>
        <input
          type="text"
          value={locationString}
          onChange={(e) => onLocationStringChange(e.target.value)}
          placeholder="예: 김포시"
          className="w-full rounded-xl glass px-4 py-3 text-fg outline-none focus:ring-2 focus:ring-brand-200"
        />
      </div>

      <ErrorMessage message={error} />

      <PredictButton onClick={onPredict}>성별 예측하기</PredictButton>
    </div>
  );
}
