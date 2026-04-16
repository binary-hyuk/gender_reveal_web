import { BLOOD_TYPES, type BloodType } from "../model/useBloodTypePredictor";

interface Props {
  dadBlood: BloodType;
  momBlood: BloodType;
  error: string | null;
  onDadBloodChange: (v: BloodType) => void;
  onMomBloodChange: (v: BloodType) => void;
  onPredict: () => void;
}

export function BloodTypePredictForm({
  dadBlood,
  momBlood,
  error,
  onDadBloodChange,
  onMomBloodChange,
  onPredict,
}: Props) {
  return (
    <div className="w-full max-w-sm space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-600">
          아빠 혈액형
        </label>
        <div className="grid grid-cols-4 gap-2">
          {BLOOD_TYPES.map((bt) => (
            <button
              key={bt}
              onClick={() => onDadBloodChange(bt)}
              className={[
                "rounded-xl py-3 text-sm font-bold transition-colors",
                dadBlood === bt
                  ? "bg-blue-500 text-white shadow"
                  : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50",
              ].join(" ")}
            >
              {bt}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-600">
          엄마 혈액형
        </label>
        <div className="grid grid-cols-4 gap-2">
          {BLOOD_TYPES.map((bt) => (
            <button
              key={bt}
              onClick={() => onMomBloodChange(bt)}
              className={[
                "rounded-xl py-3 text-sm font-bold transition-colors",
                momBlood === bt
                  ? "bg-pink-500 text-white shadow"
                  : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50",
              ].join(" ")}
            >
              {bt}
            </button>
          ))}
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
        확률 보기
      </button>
    </div>
  );
}
