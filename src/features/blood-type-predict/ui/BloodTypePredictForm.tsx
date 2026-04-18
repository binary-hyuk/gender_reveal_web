import { BLOOD_TYPES, type BloodType } from "../model/useBloodTypePredictor";
import { ErrorMessage } from "@/shared/ui/ErrorMessage";
import { PredictButton } from "@/shared/ui/PredictButton";

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
        <label className="block text-sm font-semibold text-fg">
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
                  ? "bg-brand-600 text-white shadow"
                  : "glass text-fg-muted hover:bg-white/70",
              ].join(" ")}
            >
              {bt}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-fg">
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
                  ? "bg-brand-600 text-white shadow"
                  : "glass text-fg-muted hover:bg-white/70",
              ].join(" ")}
            >
              {bt}
            </button>
          ))}
        </div>
      </div>

      <ErrorMessage message={error} />

      <PredictButton onClick={onPredict}>확률 보기</PredictButton>
    </div>
  );
}
