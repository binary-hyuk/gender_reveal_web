import { ConceptionDateRangeInput } from "@/shared/ui/ConceptionDateRangeInput";

interface Props {
  momBirth: string;
  dadBirth: string;
  conceptionStart: string;
  conceptionEnd: string;
  error: string | null;
  onMomBirthChange: (v: string) => void;
  onDadBirthChange: (v: string) => void;
  onConceptionStartChange: (v: string) => void;
  onConceptionEndChange: (v: string) => void;
  onPredict: () => void;
}

export function OhangPredictForm({
  momBirth, dadBirth, conceptionStart, conceptionEnd, error,
  onMomBirthChange, onDadBirthChange, onConceptionStartChange, onConceptionEndChange, onPredict,
}: Props) {
  return (
    <div className="w-full max-w-sm space-y-6">
      <div className="rounded-2xl bg-amber-50 px-4 py-3 text-sm text-amber-700">
        ☯️ 오행·간지·주역·황금비율을 융합한 천문 성별 예측법입니다.
        <br />
        <span className="text-xs text-amber-500">오행점수 + 주역점수 &gt; 20 → 아들 / ≤ 20 → 딸</span>
      </div>

      <div className="space-y-1.5">
        <label className="block text-sm font-semibold text-gray-700">엄마 생년월일 <span className="font-normal text-gray-400">(YYYYMMDD)</span></label>
        <input
          type="text" maxLength={8} value={momBirth}
          onChange={(e) => onMomBirthChange(e.target.value.replace(/\D/g, ''))}
          placeholder="예: 19950115"
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-800 shadow-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
        />
      </div>

      <div className="space-y-1.5">
        <label className="block text-sm font-semibold text-gray-700">아빠 생년월일 <span className="font-normal text-gray-400">(YYYYMMDD)</span></label>
        <input
          type="text" maxLength={8} value={dadBirth}
          onChange={(e) => onDadBirthChange(e.target.value.replace(/\D/g, ''))}
          placeholder="예: 19920320"
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-800 shadow-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
        />
      </div>

      <ConceptionDateRangeInput
        label="임신(수정)일"
        startValue={conceptionStart}
        endValue={conceptionEnd}
        onStartChange={onConceptionStartChange}
        onEndChange={onConceptionEndChange}
      />

      {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-500">{error}</p>}

      <button
        onClick={onPredict}
        className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 py-4 text-lg font-bold text-white shadow-md transition-transform active:scale-95 hover:opacity-90"
      >
        ☯️ 오행 성별 예측하기
      </button>
    </div>
  );
}
