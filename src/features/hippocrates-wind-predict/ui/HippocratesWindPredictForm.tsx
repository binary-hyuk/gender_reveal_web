interface Props {
  conceptionMonth: string;
  isNorthernHemisphere: boolean;
  error: string | null;
  onConceptionMonthChange: (v: string) => void;
  onIsNorthernHemisphereChange: (v: boolean) => void;
  onPredict: () => void;
}

export function HippocratesWindPredictForm({
  conceptionMonth, isNorthernHemisphere, error,
  onConceptionMonthChange, onIsNorthernHemisphereChange, onPredict,
}: Props) {
  return (
    <div className="w-full max-w-sm space-y-6">
      <div className="rounded-2xl bg-sky-50 px-4 py-3 text-sm text-sky-700">
        🌬️ 임신 월의 지배 바람(북풍/남풍)으로 성별을 판단합니다.
        <br />
        <span className="text-xs text-sky-400">북풍(건조) → 아들 / 남풍(다습) → 딸</span>
      </div>

      <div className="space-y-1.5">
        <label className="block text-sm font-semibold text-gray-700">임신 월 <span className="font-normal text-gray-400">(1~12)</span></label>
        <input
          type="number"
          min={1}
          max={12}
          value={conceptionMonth}
          onChange={(e) => onConceptionMonthChange(e.target.value)}
          placeholder="예: 5"
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-800 shadow-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
        />
      </div>

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
