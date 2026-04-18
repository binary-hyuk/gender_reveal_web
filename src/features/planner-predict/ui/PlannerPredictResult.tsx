import { useRef } from "react";
import type { PlannerRecommendations } from "../model/recommender";
import { ShareButton } from "@/shared/ui/ShareButton";
import { GlassCard } from "@/shared/ui/GlassCard";

interface Props {
  result: PlannerRecommendations;
  onReset: () => void;
}

const TARGET_INFO = {
  Boy: {
    emoji: "👦",
    label: "아들",
    accent: "text-blue-700",
    bg: "from-blue-100 to-blue-50",
    chip: "bg-blue-100 text-blue-700",
    pill: "bg-blue-500",
  },
  Girl: {
    emoji: "👧",
    label: "딸",
    accent: "text-pink-700",
    bg: "from-pink-100 to-pink-50",
    chip: "bg-pink-100 text-pink-700",
    pill: "bg-pink-500",
  },
} as const;

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <GlassCard className="px-5 py-4 space-y-3">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-fg-subtle">{title}</h3>
      {children}
    </GlassCard>
  );
}

export function PlannerPredictResult({ result, onReset }: Props) {
  const info = TARGET_INFO[result.target];
  const captureRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full max-w-sm space-y-4">
      <div ref={captureRef} className="space-y-4">
      {/* Hero */}
      <GlassCard variant="strong" className="p-6 text-center">
        <div className="text-6xl">{info.emoji}</div>
        <h2 className="mt-2 text-xl font-extrabold text-fg">
          {info.label} 맞춤 가이드
        </h2>
        <p className="mt-1 text-xs text-fg-muted">
          17가지 알고리즘을 역산한 추천입니다 · 재미로만 참고하세요
        </p>
      </GlassCard>

      {/* 1. 추천 시기 */}
      <Section title="📅 추천 거사 시기 (Top 5)">
        <p className="text-xs text-fg-muted">
          향후 2년을 2주 단위로 분석해 <strong className="text-fg">{info.label}</strong>에 가장 유리한 구간입니다.
        </p>
        <div className="space-y-2">
          {result.topMonths.map((m, idx) => (
            <GlassCard key={m.yearMonth} variant="soft" className="px-3 py-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-bold text-white ${info.pill}`}>
                    #{idx + 1}
                  </span>
                  <span className="font-semibold text-fg">{m.label}</span>
                </div>
                <span className="text-xs text-fg-muted">
                  {m.targetScore}/{m.maxScore}점
                </span>
              </div>
              {m.supportingAlgorithms.length > 0 && (
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {m.supportingAlgorithms.map((alg) => (
                    <span key={alg} className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${info.chip}`}>
                      {alg}
                    </span>
                  ))}
                </div>
              )}
            </GlassCard>
          ))}
        </div>
      </Section>

      {/* 2. 추천 요일 */}
      <Section title="📆 추천 요일 (행성 요일법)">
        <div className="flex flex-wrap gap-2">
          {result.weekdays.map((d) => (
            <div key={d.dayOfWeek} className="rounded-full glass px-3 py-1.5 text-xs flex items-center gap-1">
              <span>{d.emoji}</span>
              <span className="font-semibold text-fg">{d.name}</span>
              <span className="text-fg-subtle">· {d.planet}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* 3. 방위 */}
      <Section title="🧭 추천 방위 (아유르베다 8방위)">
        <div className="grid grid-cols-2 gap-2">
          {result.ayurvedaDirections.map((d) => (
            <GlassCard key={d.code} variant="soft" className="px-3 py-2">
              <div className="font-semibold text-fg text-sm">{d.label}</div>
              <div className="text-[10px] text-fg-muted">{d.reason}</div>
            </GlassCard>
          ))}
        </div>
      </Section>

      {/* 4. 집 */}
      <Section title="🏠 집 · 풍수지리">
        <div className="space-y-2 text-sm">
          <div>
            <span className="text-xs font-semibold text-fg-subtle">추천 층수</span>
            <p className="text-fg">{result.fengshuiFloorAdvice}</p>
          </div>
          <div>
            <span className="text-xs font-semibold text-fg-subtle">추천 집 방향</span>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {result.fengshuiDirections.map((d) => (
                <span key={d} className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${info.chip}`}>
                  {d}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* 5. 반구/계절 */}
      <Section title="🌬️ 계절 · 반구 팁">
        <p className="text-sm text-fg leading-relaxed">{result.hemisphereTip}</p>
      </Section>

      {/* 6. 숫자 */}
      <Section title="🔢 행운의 숫자">
        <div className="flex flex-wrap gap-2">
          {result.luckyNumbers.map((n) => (
            <div key={n} className={`h-10 w-10 rounded-full flex items-center justify-center text-lg font-bold text-white shadow-sm ${info.pill}`}>
              {n}
            </div>
          ))}
        </div>
        <p className="text-[11px] text-fg-muted leading-tight">
          삼원공명 직감수·수비학에서 {info.label}에 유리한 {result.target === "Boy" ? "양수(홀수)" : "음수(짝수)"}.
        </p>
      </Section>

      {/* 7. 이모티콘 */}
      <Section title="💫 행운의 이모티콘">
        <div className="grid grid-cols-4 gap-2">
          {result.luckyEmojis.map((e) => (
            <GlassCard key={e} variant="soft" className="aspect-square flex items-center justify-center text-3xl">
              {e}
            </GlassCard>
          ))}
        </div>
        <p className="text-[11px] text-fg-muted leading-tight">
          디지털 DNA 알고리즘 역산 — 유니코드 {result.target === "Boy" ? "홀수" : "짝수"} codepoint 이모지.
        </p>
      </Section>

      {/* 8. 관심사 */}
      <Section title="💡 관심사 · 취미 추천">
        <ul className="space-y-1 text-sm text-fg">
          {result.interests.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      </Section>

      {/* 9. 라이프스타일 */}
      <Section title="🧘 컨디션 · 라이프스타일 팁">
        <ul className="space-y-1 text-sm text-fg">
          {result.lifestyleTips.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </Section>

      <p className="text-center text-[11px] text-fg-subtle">
        * 의학적 근거는 없으며, 전통 알고리즘의 역산 결과입니다.
      </p>
      </div>

      <ShareButton
        targetRef={captureRef}
        title={`${info.label} 맞춤 가이드`}
        text={`${info.label} 맞춤 가이드 — 성별 플래너로 받은 추천`}
        filenamePrefix={`planner-${result.target.toLowerCase()}`}
      />

      <button
        onClick={onReset}
        className="w-full rounded-xl glass py-3 text-sm font-semibold text-fg transition-colors hover:bg-white/70"
      >
        다시 추천받기
      </button>
    </div>
  );
}
