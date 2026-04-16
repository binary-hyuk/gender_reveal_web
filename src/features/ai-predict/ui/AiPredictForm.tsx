import { DateTextInput } from "@/shared/ui/DateTextInput";
import { BLOOD_TYPES } from "@/features/blood-type-predict/model/useBloodTypePredictor";
import type { BloodType } from "@/features/blood-type-predict/model/bloodTypeMatrix";

interface Props {
  motherBirthDate: string;
  conceptionDate: string;
  fatherBirthDate: string;
  momBlood: BloodType;
  dadBlood: BloodType;
  error: string | null;
  onMotherBirthDateChange: (v: string) => void;
  onConceptionDateChange: (v: string) => void;
  onFatherBirthDateChange: (v: string) => void;
  onMomBloodChange: (v: BloodType) => void;
  onDadBloodChange: (v: BloodType) => void;
  onPredict: () => void;
}

function BloodTypeSelector({
  label,
  value,
  activeColor,
  onChange,
}: {
  label: string;
  value: BloodType;
  activeColor: string;
  onChange: (v: BloodType) => void;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-semibold text-gray-700">{label}</label>
      <div className="grid grid-cols-4 gap-2">
        {BLOOD_TYPES.map((bt) => (
          <button
            key={bt}
            onClick={() => onChange(bt)}
            className={[
              "rounded-xl py-2.5 text-sm font-bold transition-colors",
              value === bt
                ? `${activeColor} text-white shadow`
                : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50",
            ].join(" ")}
          >
            {bt}
          </button>
        ))}
      </div>
    </div>
  );
}

export function AiPredictForm({
  motherBirthDate,
  conceptionDate,
  fatherBirthDate,
  momBlood,
  dadBlood,
  error,
  onMotherBirthDateChange,
  onConceptionDateChange,
  onFatherBirthDateChange,
  onMomBloodChange,
  onDadBloodChange,
  onPredict,
}: Props) {
  return (
    <div className="w-full max-w-sm space-y-5">
      {/* 날짜 입력 섹션 */}
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
          label="아빠 생년월일"
          hint="(양력)"
          value={fatherBirthDate}
          onChange={onFatherBirthDateChange}
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

      {/* 혈액형 섹션 */}
      <div className="rounded-2xl border border-gray-100 bg-white px-5 py-5 shadow-sm space-y-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
          혈액형
        </p>
        <BloodTypeSelector
          label="아빠 혈액형"
          value={dadBlood}
          activeColor="bg-blue-500"
          onChange={onDadBloodChange}
        />
        <BloodTypeSelector
          label="엄마 혈액형"
          value={momBlood}
          activeColor="bg-pink-500"
          onChange={onMomBloodChange}
        />
      </div>

      {error && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-500">
          {error}
        </p>
      )}

      <button
        onClick={onPredict}
        className="w-full rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 py-4 text-lg font-bold text-white shadow-lg transition-transform active:scale-95 hover:opacity-90"
      >
        🤖 AI 성별 예측 시작
      </button>
    </div>
  );
}
