import { GenderResultCard } from "@/shared/ui/GenderResultCard";
import { VIBE_INFO } from "@/features/cbr-predict/model/useCBRPredictor";
import type { CBRResult } from "@/features/cbr-predict/model/useCBRPredictor";

interface Props { result: CBRResult; onReset: () => void; }

function EnergyBar({ value }: { value: number }) {
  // value: -1.0 ~ 1.0 → bar 위치
  const pct = Math.round((value + 1) / 2 * 100);
  const isBoy = value >= 0;
  return (
    <div className="relative h-3 w-full rounded-full bg-gray-100 overflow-hidden">
      <div
        className={`absolute top-0 h-3 rounded-full transition-all ${isBoy ? "bg-blue-400" : "bg-pink-400"}`}
        style={{ width: `${pct}%` }}
      />
      <div className="absolute top-0 left-1/2 h-3 w-0.5 bg-gray-300" />
    </div>
  );
}

export function CBRPredictResult({ result, onReset }: Props) {
  const vibeInfo = VIBE_INFO[result.fatherVibe];
  const lunarPhase =
    result.lunarCyclePct < 25 ? "🌑 신월 (수렴 기운)" :
    result.lunarCyclePct < 50 ? "🌓 상현달 (성장 기운)" :
    result.lunarCyclePct < 75 ? "🌕 망월 (발산 기운)" :
    "🌗 하현달 (정리 기운)";

  const details = [
    { label: "산모 생년월일", value: result.motherDob },
    { label: "수정 추정일", value: result.conceptionDate },
    { label: "아빠 기운", value: `${vibeInfo.emoji} ${vibeInfo.label} (${vibeInfo.element})` },
    { label: "①  산모 천간 극성", value: `${result.momPolarity > 0 ? "양(陽)" : "음(陰)"} → ${result.momPolarity > 0 ? "+" : ""}${result.momPolarity}` },
    { label: "②  달 위상 공명", value: `${lunarPhase} (${result.lunarCyclePct}%) → ${result.lunarVector}` },
    { label: "③  부친 기운 가중치", value: `${result.fatherWeight > 0 ? "+" : ""}${result.fatherWeight}` },
    { label: "총 에너지", value: `${result.totalEnergy > 0 ? "+" : ""}${result.totalEnergy}` },
    { label: "기운 강도", value: result.energyStrength },
    { label: "판별 확률 (Boy)", value: `${result.probability}% (임계 51.2%)` },
  ];

  return (
    <div className="flex flex-col items-center gap-5 w-full max-w-sm">
      <GenderResultCard gender={result.gender} details={details} onReset={onReset} />

      {/* 에너지 바 */}
      <div className="w-full rounded-2xl border border-gray-100 bg-white px-5 py-4 shadow-sm space-y-2">
        <p className="text-xs font-semibold text-gray-400">에너지 스펙트럼</p>
        <EnergyBar value={result.totalEnergy} />
        <div className="flex justify-between text-xs text-gray-400">
          <span>🔴 딸 (음)</span>
          <span>균형</span>
          <span>🔵 아들 (양)</span>
        </div>

        {/* 강도 메시지 */}
        <p className={[
          "mt-2 text-center text-sm font-semibold",
          Math.abs(result.totalEnergy) > 0.5 ? "text-orange-500" :
          Math.abs(result.totalEnergy) > 0.2 ? "text-indigo-500" :
          "text-gray-500",
        ].join(" ")}>
          {result.energyStrength === "약함 (박빙)"
            ? "⚖️ 기운이 팽팽합니다 — 결과를 신뢰하세요!"
            : `✨ 기운이 ${result.energyStrength}니다`}
        </p>
      </div>

    </div>
  );
}
