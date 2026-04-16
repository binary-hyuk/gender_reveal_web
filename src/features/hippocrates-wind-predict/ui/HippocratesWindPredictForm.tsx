import { ConceptionDateRangeInput } from "@/shared/ui/ConceptionDateRangeInput";

interface Props {
  conceptionStart: string;
  conceptionEnd: string;
  isNorthernHemisphere: boolean;
  error: string | null;
  onConceptionStartChange: (v: string) => void;
  onConceptionEndChange: (v: string) => void;
  onIsNorthernHemisphereChange: (v: boolean) => void;
  onPredict: () => void;
}

export function HippocratesWindPredictForm({
  conceptionStart, conceptionEnd, isNorthernHemisphere, error,
  onConceptionStartChange, onConceptionEndChange, onIsNorthernHemisphereChange, onPredict,
}: Props) {
  return (
    <div className="w-full max-w-sm space-y-6">
      <div className="rounded-2xl bg-sky-50 px-4 py-3 text-sm text-sky-700">
        🌬️ 임신 월의 지배 바람(북풍/남풍)으로 성별을 판단합니다.
        <br />
        <span className="text-xs text-sky-400">북풍(건조) → 아들 / 남풍(다습) → 딸</span>
      </div>

      <ConceptionDateRangeInput
        label="임신(수정)일"
        startValue={conceptionStart}
        endValue={conceptionEnd}
        onStartChange={onConceptionStartChange}
        onEndChange={onConceptionEndChange}
      />

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">거주 반구</label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { value: true, label: "🌏 북반구 (한국·아시아 등)" },
            { value: false, label: "🌎 남반구 (호주·남미 등)" },
          ].map(({ value, label }) => (
            <button
              key={String(value)}
              onClick={() => onIsNorthernHemisphereChange(value)}
              className={[
                "rounded-xl py-3 px-2 text-sm font-medium transition-colors",
                isNorthernHemisphere === value
                  ? "bg-sky-500 text-white shadow"
                  : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50",
              ].join(" ")}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-500">{error}</p>
      )}

      <button
        onClick={onPredict}
        className="w-full rounded-xl bg-gradient-to-r from-sky-400 to-cyan-400 py-4 text-lg font-bold text-white shadow-md transition-transform active:scale-95 hover:opacity-90"
      >
        성별 예측하기
      </button>
    </div>
  );
}
