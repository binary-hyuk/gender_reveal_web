import { useRef } from "react";
import type { AiPredictResult, AiGender, MethodResult } from "../model/useAiPredictor";
import { ShareButton } from "@/shared/ui/ShareButton";
import { GlassCard } from "@/shared/ui/GlassCard";

interface Props {
  result: AiPredictResult;
  onReset: () => void;
}

const GENDER_CFG = {
  Boy: {
    emoji: "👦",
    label: "아들이에요!",
    gradient: "from-blue-400 to-blue-600",
    lightBg: "bg-blue-50",
    text: "text-blue-700",
    bar: "bg-blue-500",
    barBg: "bg-blue-100",
  },
  Girl: {
    emoji: "👧",
    label: "딸이에요!",
    gradient: "from-pink-400 to-pink-600",
    lightBg: "bg-pink-50",
    text: "text-pink-700",
    bar: "bg-pink-500",
    barBg: "bg-pink-100",
  },
} as const;

function GenderBadge({ gender }: { gender: AiGender }) {
  const cfg = GENDER_CFG[gender];
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${cfg.lightBg} ${cfg.text}`}>
      {gender === "Boy" ? "👦 아들" : "👧 딸"}
    </span>
  );
}

function MethodRow({ method, finalGender }: { method: MethodResult; finalGender: AiGender }) {
  const matches = method.available && method.gender === finalGender;
  return (
    <div
      className={[
        "flex items-start gap-3 rounded-xl px-4 py-3 transition-colors glass-soft",
        method.available
          ? matches
            ? ""
            : "opacity-60"
          : "opacity-40",
      ].join(" ")}
    >
      <span className="text-xl flex-shrink-0">{method.emoji}</span>
      <div className="flex-1 min-w-0">
        <span className="text-sm font-semibold text-fg">
          {method.name}
        </span>
        <div className="mt-1 flex items-center gap-2">
          {method.available ? (
            <GenderBadge gender={method.gender} />
          ) : (
            <span className="text-xs text-fg-subtle">판정 불가</span>
          )}
        </div>
        <p className="mt-0.5 text-xs text-fg-subtle leading-relaxed">{method.detail}</p>
      </div>
    </div>
  );
}

export function AiPredictResult({ result, onReset }: Props) {
  const cfg = GENDER_CFG[result.finalGender];
  const captureRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full max-w-sm space-y-4">
      {/* 공유 캡처 대상 영역 */}
      <div ref={captureRef} className="space-y-4">
        {/* ① 최종 예측 히어로 카드 */}
        <GlassCard variant="strong" className="p-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-fg-muted mb-3">
            🤖 AI 최종 예측
          </p>
          <div className="text-7xl mb-3">{cfg.emoji}</div>
          <h2 className="text-3xl font-extrabold text-fg">{cfg.label}</h2>
        </GlassCard>

        {/* ② 방법별 예측 결과 */}
        <GlassCard className="px-5 py-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-fg-subtle mb-3">
            방법별 예측
          </p>
          <div className="space-y-2">
            {result.methods.map((m) => (
              <MethodRow key={m.key} method={m} finalGender={result.finalGender} />
            ))}
          </div>
        </GlassCard>

        <p className="text-center text-xs text-fg-subtle">
          * 전통 예측법의 가중치 합산 결과입니다. 재미로만 참고하세요 😊
        </p>
      </div>

      <ShareButton
        targetRef={captureRef}
        title="AI 성별 예측"
        text={`AI 예측 결과: ${cfg.label} (아들 ${result.boyScore} · 딸 ${result.girlScore})`}
        filenamePrefix="ai-prediction"
      />

      <button
        onClick={onReset}
        className="w-full rounded-xl glass py-3 text-sm font-semibold text-fg hover:bg-white/70"
      >
        다시 예측하기
      </button>
    </div>
  );
}
