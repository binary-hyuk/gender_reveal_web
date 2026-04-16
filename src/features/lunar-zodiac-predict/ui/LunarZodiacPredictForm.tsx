import { DateTextInput } from "@/shared/ui/DateTextInput";

interface Props {
  conceptionDate: string;
  error: string | null;
  onConceptionDateChange: (v: string) => void;
  onPredict: () => void;
}

export function LunarZodiacPredictForm({
  conceptionDate,
  error,
  onConceptionDateChange,
  onPredict,
}: Props) {
  return (
    <div className="w-full max-w-sm space-y-6">
      <div className="rounded-2xl bg-indigo-50 px-4 py-3 text-sm text-indigo-600">
        임신일 기준으로 달(Moon)이 위치한 황도 별자리를 계산합니다.
        <br />
        <span className="text-xs text-indigo-400">
          남성 별자리: 양·쌍둥이·사자·천칭·사수·물병자리
        </span>
      </div>

      <DateTextInput
        label="임신(수정)일"
        hint="(양력)"
        value={conceptionDate}
        onChange={onConceptionDateChange}
      />
      <p className="-mt-4 text-xs text-gray-400">
        * 정확한 수정일을 모를 경우 마지막 생리 시작일 + 14일을 입력하세요
      </p>

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
