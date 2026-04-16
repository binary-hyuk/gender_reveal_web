import { ConceptionDateRangeInput } from "@/shared/ui/ConceptionDateRangeInput";

interface Props {
  conceptionStart: string;
  conceptionEnd: string;
  error: string | null;
  onConceptionStartChange: (v: string) => void;
  onConceptionEndChange: (v: string) => void;
  onPredict: () => void;
}

export function PlanetaryWeekdayPredictForm({
  conceptionStart,
  conceptionEnd,
  error,
  onConceptionStartChange,
  onConceptionEndChange,
  onPredict,
}: Props) {
  return (
    <div className="w-full max-w-sm space-y-6">
      <div className="rounded-2xl border border-indigo-100 bg-indigo-50 px-5 py-4 text-sm text-indigo-700">
        수정일의 요일에 지배 행성을 대입합니다. 태양·화성·목성·토성 → 아들 / 달·수성·금성 → 딸
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white px-5 py-5 shadow-sm space-y-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
          날짜 정보
        </p>
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
