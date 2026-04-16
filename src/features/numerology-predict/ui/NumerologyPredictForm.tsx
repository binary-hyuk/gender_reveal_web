import { ConceptionDateRangeInput } from "@/shared/ui/ConceptionDateRangeInput";

interface Props {
  momName: string;
  dadName: string;
  conceptionStart: string;
  conceptionEnd: string;
  error: string | null;
  onMomNameChange: (v: string) => void;
  onDadNameChange: (v: string) => void;
  onConceptionStartChange: (v: string) => void;
  onConceptionEndChange: (v: string) => void;
  onPredict: () => void;
}

export function NumerologyPredictForm({
  momName,
  dadName,
  conceptionStart,
  conceptionEnd,
  error,
  onMomNameChange,
  onDadNameChange,
  onConceptionStartChange,
  onConceptionEndChange,
  onPredict,
}: Props) {
  return (
    <div className="w-full max-w-sm space-y-6">
      <div className="rounded-2xl border border-purple-100 bg-purple-50 px-5 py-4 text-sm text-purple-700">
        공백 제거 후 엄마·아빠 이름 글자 수 + 임신 월의 합이 홀수면 아들, 짝수면 딸로 예측합니다.
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-600">
            엄마 이름
          </label>
          <input
            type="text"
            value={momName}
            onChange={(e) => onMomNameChange(e.target.value)}
            placeholder="예: 김민지"
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-800 shadow-sm outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-600">
            아빠 이름
          </label>
          <input
            type="text"
            value={dadName}
            onChange={(e) => onDadNameChange(e.target.value)}
            placeholder="예: 이준호"
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-800 shadow-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <ConceptionDateRangeInput
          label="임신(수정)일"
          startValue={conceptionStart}
          endValue={conceptionEnd}
          onStartChange={onConceptionStartChange}
          onEndChange={onConceptionEndChange}
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
