import { DateTextInput } from "@/shared/ui/DateTextInput";
import { ConceptionDateRangeInput } from "@/shared/ui/ConceptionDateRangeInput";
import { ErrorMessage } from "@/shared/ui/ErrorMessage";
import { PredictButton } from "@/shared/ui/PredictButton";
import { GlassCard } from "@/shared/ui/GlassCard";
import { VIBE_INFO } from "@/features/cbr-predict/model/useCBRPredictor";
import type { FatherVibe } from "@/features/cbr-predict/model/useCBRPredictor";

const VIBES: FatherVibe[] = ["PASSION", "CALM", "STABLE", "FLEXIBLE"];

interface Props {
  motherDob: string;
  conceptionStart: string;
  conceptionEnd: string;
  fatherVibe: FatherVibe;
  error: string | null;
  onMotherDobChange: (v: string) => void;
  onConceptionStartChange: (v: string) => void;
  onConceptionEndChange: (v: string) => void;
  onFatherVibeChange: (v: FatherVibe) => void;
  onPredict: () => void;
}

export function CBRPredictForm({
  motherDob, conceptionStart, conceptionEnd, fatherVibe, error,
  onMotherDobChange, onConceptionStartChange, onConceptionEndChange, onFatherVibeChange, onPredict,
}: Props) {
  return (
    <div className="w-full max-w-sm space-y-6">
      <GlassCard variant="soft" className="px-4 py-3 text-sm text-fg">
        🏛️ 천간 오행 극성 · 달 위상 공명 · 부친 기운을 시그모이드로 융합합니다.
        <br />
        <span className="text-xs text-brand-700">확률 ≥ 51.2% → 아들 / &lt; 51.2% → 딸</span>
      </GlassCard>

      <DateTextInput
        label="산모 생년월일"
        hint="(양력)"
        value={motherDob}
        onChange={onMotherDobChange}
      />

      <ConceptionDateRangeInput
        label="수정 추정일"
        startValue={conceptionStart}
        endValue={conceptionEnd}
        onStartChange={onConceptionStartChange}
        onEndChange={onConceptionEndChange}
      />

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-fg">
          아빠의 기운 <span className="font-normal text-fg-subtle">(4원소 · 오행)</span>
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
                    ? "bg-brand-600 text-white shadow"
                    : "glass text-fg-muted hover:bg-white/70",
                ].join(" ")}
              >
                <span className="text-base">{info.emoji}</span>{" "}
                <span className="font-bold">{info.label}</span>
                <br />
                <span className={`text-xs ${isActive ? "text-white/80" : "text-fg-subtle"}`}>
                  {info.element} ({info.weight > 0 ? "+" : ""}{info.weight})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <ErrorMessage message={error} />

      <PredictButton onClick={onPredict}>🏛️ CBR 공명 분석하기</PredictButton>
    </div>
  );
}
