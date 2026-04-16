import { DateTextInput } from "@/shared/ui/DateTextInput";

const INTUITION_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

interface Props {
  motherBirthDate: string;
  fatherBirthDate: string;
  conceptionMonth: string;
  intuition: number;
  error: string | null;
  onMotherBirthDateChange: (v: string) => void;
  onFatherBirthDateChange: (v: string) => void;
  onConceptionMonthChange: (v: string) => void;
  onIntuitionChange: (v: number) => void;
  onPredict: () => void;
}

export function SamwonPredictForm({
  motherBirthDate, fatherBirthDate, conceptionMonth, intuition, error,
  onMotherBirthDateChange, onFatherBirthDateChange, onConceptionMonthChange,
  onIntuitionChange, onPredict,
}: Props) {
  return (
    <div className="w-full max-w-sm space-y-6">
      <div className="rounded-2xl border border-indigo-100 bg-indigo-50 px-5 py-4 text-sm text-indigo-700">
        삼원(三元)의 천간·오행·음양을 추출하고, 월상 에너지와 직감수를 합산하여
        대연지수 49로 정규화한 결과로 성별을 예측합니다.
      </div>

      <div className="space-y-4">
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

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-600">
            잉태 추정 연월
          </label>
          <input
            type="month"
            value={conceptionMonth}
            onChange={(e) => onConceptionMonthChange(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-800 shadow-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-600">
            엄마의 직감수 <span className="font-normal text-gray-400">(1~9)</span>
          </label>
          <p className="text-xs text-gray-400">
            마음속에 떠오르는 숫자를 골라주세요
          </p>
          <div className="grid grid-cols-9 gap-1.5">
            {INTUITION_NUMBERS.map((n) => (
              <button
                key={n}
                onClick={() => onIntuitionChange(n)}
                className={[
                  "rounded-xl py-2.5 text-sm font-bold transition-colors",
                  intuition === n
                    ? "bg-indigo-500 text-white shadow"
                    : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50",
                ].join(" ")}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
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
