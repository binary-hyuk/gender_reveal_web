import { ErrorMessage } from "@/shared/ui/ErrorMessage";
import { PredictButton } from "@/shared/ui/PredictButton";

interface Props {
  dadAge: string;
  momAge: string;
  error: string | null;
  onDadAgeChange: (v: string) => void;
  onMomAgeChange: (v: string) => void;
  onPredict: () => void;
}

export function BloodRenewalPredictForm({
  dadAge,
  momAge,
  error,
  onDadAgeChange,
  onMomAgeChange,
  onPredict,
}: Props) {
  return (
    <div className="w-full max-w-sm space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-fg">
          아빠 나이
        </label>
        <input
          type="number"
          min={1}
          max={99}
          value={dadAge}
          onChange={(e) => onDadAgeChange(e.target.value)}
          placeholder="예: 32"
          className="w-full rounded-xl glass px-4 py-3 text-fg outline-none focus:ring-2 focus:ring-brand-200"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-fg">
          엄마 나이
        </label>
        <input
          type="number"
          min={1}
          max={99}
          value={momAge}
          onChange={(e) => onMomAgeChange(e.target.value)}
          placeholder="예: 29"
          className="w-full rounded-xl glass px-4 py-3 text-fg outline-none focus:ring-2 focus:ring-brand-200"
        />
      </div>

      <ErrorMessage message={error} />

      <PredictButton onClick={onPredict}>성별 예측하기</PredictButton>
    </div>
  );
}
