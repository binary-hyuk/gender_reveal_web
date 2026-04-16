import { GenderResultCard } from '@/shared/ui/GenderResultCard';
import type { OhangResult } from '../model/useOhangPredictor';

interface Props { result: OhangResult; onReset: () => void; }

export function OhangPredictResult({ result, onReset }: Props) {
  const details = [
    { label: '엄마 생년월일', value: result.momBirth },
    { label: '아빠 생년월일', value: result.dadBirth },
    { label: '임신 월', value: `${result.conceptionMonth}월` },
    { label: '🌿 오행·황금비 점수 (O)', value: `${result.oScore}` },
    { label: '☯️ 주역·파동 점수 (I)', value: `${result.iScore}` },
    { label: '합계', value: `${result.total}` },
    { label: '판정', value: result.total > 20 ? `${result.total} > 20 → 아들` : `${result.total} ≤ 20 → 딸` },
  ];
  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-sm">
      <GenderResultCard gender={result.gender} details={details} />
      <button onClick={onReset} className="w-full rounded-xl border border-gray-200 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50">
        다시 예측하기
      </button>
    </div>
  );
}
