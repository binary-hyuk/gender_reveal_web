import { useEffect, useState } from "react";

const MESSAGES = [
  "음력 데이터 변환 중",
  "중국 황실 달력 분석 중",
  "마야 예측 공식 적용 중",
  "주역 49법 계산 중",
  "달의 황도 별자리 추적 중",
  "혈액 갱신 주기 분석 중",
  "혈액형 조합 확률 계산 중",
  "6가지 결과 종합 중",
  "가중치 점수 산출 중",
  "최종 예측 생성 중",
];

export function AiPredictLoading() {
  const [msgIdx, setMsgIdx] = useState(0);
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const msgTimer = setInterval(() => {
      setMsgIdx((i) => (i + 1) % MESSAGES.length);
    }, 600);
    const dotsTimer = setInterval(() => {
      setDots((d) => (d.length >= 3 ? "." : d + "."));
    }, 350);
    return () => {
      clearInterval(msgTimer);
      clearInterval(dotsTimer);
    };
  }, []);

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-8 py-8">
      {/* 스피너 */}
      <div className="relative h-28 w-28">
        {/* 바깥 링 */}
        <div
          className="absolute inset-0 rounded-full border-4 border-purple-100 border-t-purple-500"
          style={{
            animation: "spin 1.2s linear infinite",
          }}
        />
        {/* 안쪽 링 (반대방향) */}
        <div
          className="absolute inset-4 rounded-full border-4 border-pink-100 border-b-pink-400"
          style={{
            animation: "spin 1.8s linear infinite reverse",
          }}
        />
        {/* 가운데 아이콘 */}
        <div className="absolute inset-0 flex items-center justify-center text-4xl">
          🤖
        </div>
      </div>

      {/* 텍스트 */}
      <div className="text-center space-y-2">
        <p className="text-2xl font-extrabold text-gray-800 tracking-tight">
          Thinking{dots}
        </p>
        <div className="min-h-[1.5rem]">
          <p className="text-sm text-purple-500 font-medium animate-pulse">
            {MESSAGES[msgIdx]}
          </p>
        </div>
      </div>

      {/* 진행 도트 */}
      <div className="flex gap-1.5">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-2 w-2 rounded-full bg-purple-300"
            style={{
              animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>

      <p className="text-xs text-gray-400">
        6가지 예측 방법을 종합하고 있어요
      </p>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}
