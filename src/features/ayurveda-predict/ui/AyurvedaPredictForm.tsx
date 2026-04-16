import { DateTextInput } from "@/shared/ui/DateTextInput";
import { DIRECTIONS } from "@/features/ayurveda-predict/model/useAyurvedaPredictor";
import type { Direction } from "@/features/ayurveda-predict/model/useAyurvedaPredictor";

const DIR_LABEL: Record<Direction, string> = {
  East: "동 (East) 🌅",
  West: "서 (West) 🌇",
  South: "남 (South) ☀️",
  North: "북 (North) ❄️",
};

interface Props {
  lastPeriodDate: string;
  conceptionDate: string;
  direction: Direction;
  error: string | null;
  onLastPeriodDateChange: (v: string) => void;
  onConceptionDateChange: (v: string) => void;
  onDirectionChange: (v: Direction) => void;
  onPredict: () => void;
}

export function AyurvedaPredictForm({
  lastPeriodDate, conceptionDate, direction, error,
  onLastPeriodDateChange, onConceptionDateChange, onDirectionChange, onPredict,
}: Props) {
  return (
    <div className="w-full max-w-sm space-y-6">
      <div className="rounded-2xl bg-orange-50 px-4 py-3 text-sm text-orange-700">
        🪷 생리 주기 일수 + 집의 방위 기운으로 성별을 판단합니다.
        <br />
        <span className="text-xs text-orange-400">짝수일 → 아들 / 홀수일 → 딸</span>
      </div>

      <DateTextInput
        label="마지막 생리 시작일"
        hint="(양력)"
        value={lastPeriodDate}
        onChange={onLastPeriodDateChange}
      />

      <DateTextInput
        label="임신(수정)일"
        hint="(양력)"
        value={conceptionDate}
        onChange={onConceptionDateChange}
      />

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">집 주요 방위</label>
        <div className="grid grid-cols-2 gap-2">
          {DIRECTIONS.map((d) => (
            <button
              key={d}
              onClick={() => onDirectionChange(d)}
              className={[
                "rounded-xl py-2.5 text-sm font-medium transition-colors",
                direction === d
                  ? "bg-orange-500 text-white shadow"
                  : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50",
              ].join(" ")}
            >
              {DIR_LABEL[d]}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-500">{error}</p>
      )}

      <button
        onClick={onPredict}
        className="w-full rounded-xl bg-gradient-to-r from-orange-400 to-amber-400 py-4 text-lg font-bold text-white shadow-md transition-transform active:scale-95 hover:opacity-90"
      >
        성별 예측하기
      </button>
    </div>
  );
}
