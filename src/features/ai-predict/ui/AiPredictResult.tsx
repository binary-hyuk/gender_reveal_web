import type { AiPredictResult, AiGender, MethodResult } from "../model/useAiPredictor";

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
        "flex items-start gap-3 rounded-xl px-4 py-3 transition-colors",
        method.available
          ? matches
            ? "bg-gray-50"
            : "bg-gray-50 opacity-60"
          : "bg-gray-50 opacity-40",
      ].join(" ")}
    >
      <span className="text-xl flex-shrink-0">{method.emoji}</span>
      <div className="flex-1 min-w-0">
        <span className="text-sm font-semibold text-gray-700">
          {method.name}
        </span>
        <div className="mt-1 flex items-center gap-2">
          {method.available ? (
            <GenderBadge gender={method.gender} />
          ) : (
            <span className="text-xs text-gray-400">판정 불가</span>
          )}
        </div>
        <p className="mt-0.5 text-xs text-gray-400 leading-relaxed">{method.detail}</p>
      </div>
    </div>
  );
}

export function AiPredictResult({ result, onReset }: Props) {
  const cfg = GENDER_CFG[result.finalGender];

  return (
    <div className="w-full max-w-sm space-y-4">
      {/* ① 최종 예측 히어로 카드 */}
      <div className={`rounded-2xl bg-gradient-to-br ${cfg.gradient} p-8 text-center text-white shadow-xl`}>
        <p className="text-xs font-semibold uppercase tracking-widest opacity-80 mb-3">
          🤖 AI 최종 예측
        </p>
        <div className="text-7xl mb-3">{cfg.emoji}</div>
        <h2 className="text-3xl font-extrabold">{cfg.label}</h2>
      </div>

      {/* ② 방법별 예측 결과 */}
      <div className="rounded-2xl border border-gray-100 bg-white px-5 py-4 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
          방법별 예측
        </p>
        <div className="space-y-2">
          {result.methods.map((m) => (
            <MethodRow key={m.key} method={m} finalGender={result.finalGender} />
          ))}
        </div>
      </div>

      <p className="text-center text-xs text-gray-400">
        * 6가지 전통 예측법의 가중치 합산 결과입니다. 재미로만 참고하세요 😊
      </p>

      <button
        onClick={onReset}
        className="w-full rounded-xl border border-gray-200 bg-white py-3 text-sm font-semibold text-gray-600 shadow-sm hover:bg-gray-50"
      >
        다시 예측하기
      </button>
    </div>
  );
}
