import type { PredictResult } from "../model/useGenderPredictor";

interface Props {
  result: PredictResult;
  onReset: () => void;
}

const GENDER_CONFIG = {
  아들: {
    emoji: "👦",
    label: "아들이에요!",
    bg: "from-blue-100 to-blue-200",
    badge: "bg-blue-500",
    text: "text-blue-700",
  },
  딸: {
    emoji: "👧",
    label: "딸이에요!",
    bg: "from-pink-100 to-pink-200",
    badge: "bg-pink-500",
    text: "text-pink-700",
  },
} as const;

export function GenderPredictResult({ result, onReset }: Props) {
  const config = GENDER_CONFIG[result.gender];

  return (
    <div className="w-full max-w-sm space-y-4">
      <div
        className={`rounded-2xl bg-gradient-to-br ${config.bg} p-8 text-center shadow-lg`}
      >
        <div className="mb-3 text-7xl">{config.emoji}</div>
        <h2 className={`text-3xl font-extrabold ${config.text}`}>
          {config.label}
        </h2>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white px-6 py-4 shadow-sm">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
          계산 근거
        </h3>
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>엄마의 음력 연나이</span>
            <span className="font-semibold text-gray-800">
              {result.chineseAge}세
            </span>
          </div>
          <div className="flex justify-between">
            <span>임신한 음력 월</span>
            <span className="font-semibold text-gray-800">
              {result.lunarConceptionMonth}월
            </span>
          </div>
          <div className="flex justify-between">
            <span>예측 성별</span>
            <span
              className={`font-bold ${config.text}`}
            >
              {result.gender}
            </span>
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-gray-400">
        * 중국 황실 달력 기반 예측입니다. 재미로만 참고하세요 😊
      </p>

      <button
        onClick={onReset}
        className="w-full rounded-xl border border-gray-200 bg-white py-3 text-sm font-semibold text-gray-600 shadow-sm transition-colors hover:bg-gray-50"
      >
        다시 예측하기
      </button>
    </div>
  );
}
