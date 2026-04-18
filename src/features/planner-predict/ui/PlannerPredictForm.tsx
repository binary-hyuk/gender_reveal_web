import { DateTextInput } from "@/shared/ui/DateTextInput";
import { ErrorMessage } from "@/shared/ui/ErrorMessage";
import { PredictButton } from "@/shared/ui/PredictButton";
import { GlassCard } from "@/shared/ui/GlassCard";
import { useBodyGenderTheme } from "@/shared/lib/useBodyGenderTheme";
import type { PlannerTarget } from "../model/usePlannerPredictor";

const MBTI_TYPES = ["INTJ","INTP","ENTJ","ENTP","INFJ","INFP","ENFJ","ENFP","ISTJ","ISFJ","ESTJ","ESFJ","ISTP","ISFP","ESTP","ESFP"] as const;

interface Props {
  motherBirthDate: string;
  fatherBirthDate: string;
  momMBTI: string;
  dadMBTI: string;
  target: PlannerTarget;
  error: string | null;
  onMotherBirthDateChange: (v: string) => void;
  onFatherBirthDateChange: (v: string) => void;
  onMomMBTIChange: (v: string) => void;
  onDadMBTIChange: (v: string) => void;
  onTargetChange: (v: PlannerTarget) => void;
  onPredict: () => void;
}

export function PlannerPredictForm({
  motherBirthDate, fatherBirthDate, momMBTI, dadMBTI, target, error,
  onMotherBirthDateChange, onFatherBirthDateChange, onMomMBTIChange, onDadMBTIChange,
  onTargetChange, onPredict,
}: Props) {
  useBodyGenderTheme(target);
  return (
    <div className="w-full max-w-sm space-y-5">
      <GlassCard variant="soft" className="px-5 py-4 text-sm text-fg space-y-1">
        <p className="font-semibold">🎯 역방향 성별 플래너</p>
        <p className="text-xs leading-relaxed text-fg-muted">
          원하는 성별을 정해두면, 17가지 전통 알고리즘을 역산하여
          <strong className="font-semibold text-brand-700"> 유리한 시기·방위·숫자·이모티콘·라이프스타일</strong>을 추천합니다.
          <br />
          <span className="text-fg-subtle">
            (재미로만 봐주세요 😊)
          </span>
        </p>
      </GlassCard>

      {/* 타겟 성별 */}
      <GlassCard className="px-5 py-5 space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-fg-subtle">
          원하는 아이 성별
        </p>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => onTargetChange("Boy")}
            className={[
              "rounded-2xl px-4 py-5 text-center transition-all",
              target === "Boy"
                ? "bg-brand-600 text-white shadow-md ring-2 ring-brand-200"
                : "glass text-fg-muted hover:bg-white/70",
            ].join(" ")}
          >
            <div className="text-4xl">👦</div>
            <div className="mt-1 text-sm font-bold">아들 원해요</div>
          </button>
          <button
            onClick={() => onTargetChange("Girl")}
            className={[
              "rounded-2xl px-4 py-5 text-center transition-all",
              target === "Girl"
                ? "bg-brand-600 text-white shadow-md ring-2 ring-brand-200"
                : "glass text-fg-muted hover:bg-white/70",
            ].join(" ")}
          >
            <div className="text-4xl">👧</div>
            <div className="mt-1 text-sm font-bold">딸 원해요</div>
          </button>
        </div>
      </GlassCard>

      {/* 필수 */}
      <GlassCard className="px-5 py-5 space-y-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-fg-subtle">
          필수 정보
        </p>
        <DateTextInput
          label="엄마 생년월일"
          hint="(양력)"
          value={motherBirthDate}
          onChange={onMotherBirthDateChange}
        />
      </GlassCard>

      {/* 선택 */}
      <GlassCard className="px-5 py-5 space-y-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-fg-subtle">
          선택 정보 <span className="font-normal normal-case text-fg-subtle">(없어도 됩니다)</span>
        </p>
        <DateTextInput
          label="아빠 생년월일"
          hint="(양력, 선택)"
          value={fatherBirthDate}
          onChange={onFatherBirthDateChange}
        />

        <div className="space-y-1.5">
          <label className="block text-sm font-semibold text-fg">엄마 MBTI <span className="font-normal text-fg-subtle">(선택)</span></label>
          <div className="grid grid-cols-4 gap-1.5">
            {MBTI_TYPES.map((t) => (
              <button key={t} onClick={() => onMomMBTIChange(momMBTI === t ? "" : t)}
                className={["rounded-lg py-1.5 text-xs font-bold transition-colors", momMBTI === t ? "bg-brand-600 text-white shadow" : "glass text-fg-muted hover:bg-white/70"].join(" ")}>
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-sm font-semibold text-fg">아빠 MBTI <span className="font-normal text-fg-subtle">(선택)</span></label>
          <div className="grid grid-cols-4 gap-1.5">
            {MBTI_TYPES.map((t) => (
              <button key={t} onClick={() => onDadMBTIChange(dadMBTI === t ? "" : t)}
                className={["rounded-lg py-1.5 text-xs font-bold transition-colors", dadMBTI === t ? "bg-brand-600 text-white shadow" : "glass text-fg-muted hover:bg-white/70"].join(" ")}>
                {t}
              </button>
            ))}
          </div>
        </div>
      </GlassCard>

      <ErrorMessage message={error} />

      <PredictButton onClick={onPredict}>
        🎯 {target === "Boy" ? "아들" : "딸"} 맞춤 가이드 받기
      </PredictButton>
    </div>
  );
}
