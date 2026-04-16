import { DateTextInput } from "@/shared/ui/DateTextInput";
import { VIBE_INFO } from "@/features/cbr-predict/model/useCBRPredictor";
import type { FatherVibe } from "@/features/cbr-predict/model/useCBRPredictor";

const VIBES: FatherVibe[] = ["PASSION", "CALM", "STABLE", "FLEXIBLE"];

interface Props {
  motherDob: string;
  conceptionDate: string;
  fatherVibe: FatherVibe;
  error: string | null;
  onMotherDobChange: (v: string) => void;
  onConceptionDateChange: (v: string) => void;
  onFatherVibeChange: (v: FatherVibe) => void;
  onPredict: () => void;
}

export function CBRPredictForm({
  motherDob, conceptionDate, fatherVibe, error,
  onMotherDobChange, onConceptionDateChange, onFatherVibeChange, onPredict,
}: Props) {
  return (
    <div className="w-full max-w-sm space-y-6">
      <div className="rounded-2xl bg-indigo-50 px-4 py-3 text-sm text-indigo-700">
        🏛️ 천간 오행 극성 · 달 위상 공명 · 부친 기운을 시그모이드로 융합합니다.
        <br />
        <span className="text-xs text-indigo-400">확률 ≥ 51.2% → 아들 / &lt; 51.2% → 딸</span>
      </div>

      <DateTextInput
        label="산모 생년월일"
        hint="(양력)"
        value={motherDob}
        onChange={onMotherDobChange}
      />

      <DateTextInput
        label="수정 추정일"
        hint="(양력)"
        value={conceptionDate}
        onChange={onConceptionDateChange}
      />

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">
          아빠의 기운 <span className="font-normal text-gray-400">(4원소 · 오행)</span>
        </label>
        <div className="grid grid-cols-2 gap-3">
          {VIBES.map((v) => {
            const info = VIBE_INFO[v];
            const isActive = fatherVibe === v;
            return (
              <button
                key={v}
                onClick={() => onFatherVibeChange(v)}
                className={[
                  "rounded-xl px-3 py-3 text-sm font-medium transition-colors text-left",
                  isActive
                    ? "bg-indigo-600 text-white shadow"
                    : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50",
                ].join(" ")}
              >
                <span className="text-base">{info.emoji}</span>{" "}
                <span className="font-bold">{info.label}</span>
                <br />
                <span className={`text-xs ${isActive ? "text-indigo-200" : "text-gray-400"}`}>
                  {info.element} ({info.weight > 0 ? "+" : ""}{info.weight})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {error && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-500">{error}</p>
      )}

      <button
        onClick={onPredict}
        className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 py-4 text-lg font-bold text-white shadow-md transition-transform active:scale-95 hover:opacity-90"
      >
        🏛️ CBR 공명 분석하기
      </button>
    </div>
  );
}
