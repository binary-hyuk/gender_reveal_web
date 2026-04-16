import type { BloodTypeResult } from "../model/useBloodTypePredictor";

interface Props {
  result: BloodTypeResult;
  onReset: () => void;
}

export function BloodTypePredictResult({ result, onReset }: Props) {
  const { probability, dadBlood, momBlood } = result;
  const boyLeads = probability.boy >= probability.girl;

  return (
    <div className="w-full max-w-sm space-y-4">
      {/* 헤더 */}
      <div className="rounded-2xl border border-gray-100 bg-white px-6 py-4 shadow-sm text-center">
        <p className="text-sm text-gray-500 mb-1">
          아빠 <span className="font-bold text-blue-600">{dadBlood}</span> ×
          엄마 <span className="font-bold text-pink-600">{momBlood}</span>
        </p>
        <h2 className="text-xl font-extrabold text-gray-800">
          {boyLeads
            ? `아들 가능성이 더 높아요 👦`
            : `딸 가능성이 더 높아요 👧`}
        </h2>
      </div>

      {/* 게이지 바 */}
      <div className="rounded-2xl border border-gray-100 bg-white px-6 py-5 shadow-sm space-y-4">
        <div className="space-y-1.5">
          <div className="flex justify-between text-sm font-semibold">
            <span className="text-blue-600">👦 아들</span>
            <span className="text-blue-600">{probability.boy}%</span>
          </div>
          <div className="h-4 w-full overflow-hidden rounded-full bg-blue-100">
            <div
              className="h-full rounded-full bg-blue-500 transition-all duration-700"
              style={{ width: `${probability.boy}%` }}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-sm font-semibold">
            <span className="text-pink-600">👧 딸</span>
            <span className="text-pink-600">{probability.girl}%</span>
          </div>
          <div className="h-4 w-full overflow-hidden rounded-full bg-pink-100">
            <div
              className="h-full rounded-full bg-pink-500 transition-all duration-700"
              style={{ width: `${probability.girl}%` }}
            />
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-gray-400">
        * 인터넷 통계 기반 민간 속설입니다. 재미로만 참고하세요 😊
      </p>

      <button
        onClick={onReset}
        className="w-full rounded-xl border border-gray-200 bg-white py-3 text-sm font-semibold text-gray-600 shadow-sm hover:bg-gray-50"
      >
        다시 예측하기
      </button>
    </div>
  );
}
