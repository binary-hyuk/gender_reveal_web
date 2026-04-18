import { ErrorMessage } from "@/shared/ui/ErrorMessage";
import { PredictButton } from "@/shared/ui/PredictButton";
import { GlassCard } from "@/shared/ui/GlassCard";

interface Props {
  houseDirection: string;
  floorNumber: string;
  locationString: string;
  error: string | null;
  onHouseDirectionChange: (v: string) => void;
  onFloorNumberChange: (v: string) => void;
  onLocationStringChange: (v: string) => void;
  onPredict: () => void;
}

const DIRECTION_PRESETS = ["남향", "북향", "동향", "서향", "남동향", "남서향", "북동향", "북서향"];

export function KFengshuiPredictForm({
  houseDirection, floorNumber, locationString, error,
  onHouseDirectionChange, onFloorNumberChange, onLocationStringChange, onPredict,
}: Props) {
  return (
    <div className="w-full max-w-sm space-y-6">
      <GlassCard variant="soft" className="px-4 py-3 text-sm text-fg">
        🏠 층수 홀짝 + 창문 방향 음양 + 주소 글자수로 기운을 합산합니다.
        <br />
        <span className="text-xs text-brand-700">아들의 기운(+) → 아들 / 딸의 기운(−) → 딸</span>
      </GlassCard>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-fg">집 방향</label>
        <div className="grid grid-cols-4 gap-1.5 mb-2">
          {DIRECTION_PRESETS.map((d) => (
            <button
              key={d}
              onClick={() => onHouseDirectionChange(d)}
              className={[
                "rounded-lg py-2 text-xs font-medium transition-colors",
                houseDirection === d
                  ? "bg-brand-600 text-white shadow"
                  : "glass text-fg-muted hover:bg-white/70",
              ].join(" ")}
            >
              {d}
            </button>
          ))}
        </div>
        <input
          type="text"
          value={houseDirection}
          onChange={(e) => onHouseDirectionChange(e.target.value)}
          placeholder="직접 입력 (예: 남동향)"
          className="w-full rounded-xl glass px-4 py-3 text-fg outline-none focus:ring-2 focus:ring-brand-200"
        />
      </div>

      <div className="space-y-1.5">
        <label className="block text-sm font-semibold text-fg">거주 층수</label>
        <input
          type="number"
          min={1}
          value={floorNumber}
          onChange={(e) => onFloorNumberChange(e.target.value)}
          placeholder="예: 15"
          className="w-full rounded-xl glass px-4 py-3 text-fg outline-none focus:ring-2 focus:ring-brand-200"
        />
      </div>

      <div className="space-y-1.5">
        <label className="block text-sm font-semibold text-fg">거주 지역 <span className="font-normal text-fg-subtle">(시·구까지만 입력해도 됩니다)</span></label>
        <input
          type="text"
          value={locationString}
          onChange={(e) => onLocationStringChange(e.target.value)}
          placeholder="예: 서울시 종로구"
          className="w-full rounded-xl glass px-4 py-3 text-fg outline-none focus:ring-2 focus:ring-brand-200"
        />
      </div>

      <ErrorMessage message={error} />

      <PredictButton onClick={onPredict}>성별 예측하기</PredictButton>
    </div>
  );
}
