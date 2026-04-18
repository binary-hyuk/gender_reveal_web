import { DateTextInput } from "@/shared/ui/DateTextInput";
import { ConceptionDateRangeInput } from "@/shared/ui/ConceptionDateRangeInput";
import { ErrorMessage } from "@/shared/ui/ErrorMessage";
import { PredictButton } from "@/shared/ui/PredictButton";
import { GlassCard } from "@/shared/ui/GlassCard";
import { DIRECTIONS } from "@/features/ayurveda-predict/model/useAyurvedaPredictor";
import type { Direction } from "@/features/ayurveda-predict/model/useAyurvedaPredictor";

const DIR_LABEL: Record<Direction, string> = {
  N:  "북 ❄️",
  NE: "북동 🌨️",
  E:  "동 🌅",
  SE: "남동 ⛅",
  S:  "남 ☀️",
  SW: "남서 🌤️",
  W:  "서 🌇",
  NW: "북서 🌫️",
};

interface Props {
  lastPeriodDate: string;
  conceptionStart: string;
  conceptionEnd: string;
  direction: Direction;
  error: string | null;
  onLastPeriodDateChange: (v: string) => void;
  onConceptionStartChange: (v: string) => void;
  onConceptionEndChange: (v: string) => void;
  onDirectionChange: (v: Direction) => void;
  onPredict: () => void;
}

export function AyurvedaPredictForm({
  lastPeriodDate, conceptionStart, conceptionEnd, direction, error,
  onLastPeriodDateChange, onConceptionStartChange, onConceptionEndChange, onDirectionChange, onPredict,
}: Props) {
  return (
    <div className="w-full max-w-sm space-y-6">
      <GlassCard variant="soft" className="px-4 py-3 text-sm text-fg">
        🪷 생리 주기 일수 + 집의 방위 기운(8방위)으로 성별을 판단합니다.
        <br />
        <span className="text-xs text-brand-700">짝수일 → 아들 / 홀수일 → 딸</span>
      </GlassCard>

      <DateTextInput
        label="마지막 생리 시작일"
        hint="(양력)"
        value={lastPeriodDate}
        onChange={onLastPeriodDateChange}
      />

      <ConceptionDateRangeInput
        label="임신(수정)일"
        startValue={conceptionStart}
        endValue={conceptionEnd}
        onStartChange={onConceptionStartChange}
        onEndChange={onConceptionEndChange}
      />

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-fg">집 주요 방위 <span className="font-normal text-fg-subtle">(8방위)</span></label>
        <div className="grid grid-cols-4 gap-2">
          {DIRECTIONS.map((d) => (
            <button
              key={d}
              onClick={() => onDirectionChange(d)}
              className={[
                "rounded-xl py-2.5 text-xs font-medium transition-colors",
                direction === d
                  ? "bg-brand-600 text-white shadow"
                  : "glass text-fg-muted hover:bg-white/70",
              ].join(" ")}
            >
              {DIR_LABEL[d]}
            </button>
          ))}
        </div>
      </div>

      <ErrorMessage message={error} />

      <PredictButton onClick={onPredict}>성별 예측하기</PredictButton>
    </div>
  );
}
