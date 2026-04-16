import { DateTextInput } from "@/shared/ui/DateTextInput";

interface Props {
  motherBirthDate: string;
  conceptionDate: string;
  error: string | null;
  onMotherBirthDateChange: (v: string) => void;
  onConceptionDateChange: (v: string) => void;
  onPredict: () => void;
}

export function GypsyPredictForm({
  motherBirthDate,
  conceptionDate,
  error,
  onMotherBirthDateChange,
  onConceptionDateChange,
  onPredict,
}: Props) {
  return (
    <div className="w-full max-w-sm space-y-6">
      <div className="rounded-2xl border border-amber-100 bg-amber-50 px-5 py-4 text-sm text-amber-700">
        임신 당시 엄마 나이 + 임신 월의 합이 홀수면 아들, 짝수면 딸로 예측합니다.
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white px-5 py-5 shadow-sm space-y-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
          날짜 정보
        </p>
        <DateTextInput
          label="엄마 생년월일"
          hint="(양력)"
          value={motherBirthDate}
          onChange={onMotherBirthDateChange}
        />
        <DateTextInput
          label="임신(수정)일"
          hint="(양력)"
          value={conceptionDate}
          onChange={onConceptionDateChange}
        />
        <p className="text-xs text-gray-400">
          * 정확한 수정일을 모를 경우 마지막 생리 시작일 + 14일을 입력하세요
        </p>
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
