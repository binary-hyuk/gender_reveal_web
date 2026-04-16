interface Props {
  dadAge: string;
  momAge: string;
  error: string | null;
  onDadAgeChange: (v: string) => void;
  onMomAgeChange: (v: string) => void;
  onPredict: () => void;
}

export function BloodRenewalPredictForm({
  dadAge,
  momAge,
  error,
  onDadAgeChange,
  onMomAgeChange,
  onPredict,
}: Props) {
  return (
    <div className="w-full max-w-sm space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-600">
          아빠 나이
        </label>
        <input
          type="number"
          min={1}
          max={99}
          value={dadAge}
          onChange={(e) => onDadAgeChange(e.target.value)}
          placeholder="예: 32"
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-800 shadow-sm outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-600">
          엄마 나이
        </label>
        <input
          type="number"
          min={1}
          max={99}
          value={momAge}
          onChange={(e) => onMomAgeChange(e.target.value)}
          placeholder="예: 29"
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-800 shadow-sm outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
        />
      </div>

      {error && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-500">
          {error}
        </p>
      )}

      <button
        onClick={onPredict}
        className="w-full rounded-xl bg-gradient-to-r from-pink-400 to-blue-400 py-4 text-lg font-bold text-white shadow-md transition-transform active:scale-95 hover:opacity-90"
      >
        성별 예측하기
      </button>
    </div>
  );
}
