import { DateTextInput } from "@/shared/ui/DateTextInput";

interface Props {
  momName: string;
  conceptionDate: string;
  locationString: string;
  error: string | null;
  onMomNameChange: (v: string) => void;
  onConceptionDateChange: (v: string) => void;
  onLocationStringChange: (v: string) => void;
  onPredict: () => void;
}

export function EgyptWheatPredictForm({
  momName, conceptionDate, locationString, error,
  onMomNameChange, onConceptionDateChange, onLocationStringChange, onPredict,
}: Props) {
  return (
    <div className="w-full max-w-sm space-y-6">
      <div className="rounded-2xl bg-yellow-50 px-4 py-3 text-sm text-yellow-700">
        🌾 엄마 이름 + 거주지 글자 수로 밀·보리 발아 일수를 겨룹니다.
        <br />
        <span className="text-xs text-yellow-500">보리(보리) ≤ 밀(wheat) → 아들 / 밀이 더 짧으면 → 딸</span>
      </div>

      <div className="space-y-1.5">
        <label className="block text-sm font-semibold text-gray-700">엄마 이름</label>
        <input
          type="text"
          value={momName}
          onChange={(e) => onMomNameChange(e.target.value)}
          placeholder="예: 김지은"
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-800 shadow-sm outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100"
        />
      </div>

      <DateTextInput
        label="임신(수정)일"
        hint="(양력)"
        value={conceptionDate}
        onChange={onConceptionDateChange}
      />

      <div className="space-y-1.5">
        <label className="block text-sm font-semibold text-gray-700">거주 지역</label>
        <input
          type="text"
          value={locationString}
          onChange={(e) => onLocationStringChange(e.target.value)}
          placeholder="예: 김포시"
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-800 shadow-sm outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100"
        />
      </div>

      {error && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-500">{error}</p>
      )}

      <button
        onClick={onPredict}
        className="w-full rounded-xl bg-gradient-to-r from-yellow-400 to-orange-400 py-4 text-lg font-bold text-white shadow-md transition-transform active:scale-95 hover:opacity-90"
      >
        성별 예측하기
      </button>
    </div>
  );
}
