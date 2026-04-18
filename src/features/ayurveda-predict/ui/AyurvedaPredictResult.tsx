import { GenderResultCard } from "@/shared/ui/GenderResultCard";
import type { AyurvedaResult, Direction } from "../model/useAyurvedaPredictor";

interface Props { result: AyurvedaResult; onReset: () => void; }

const DIR_FULL: Record<Direction, string> = {
  N: "북(N)", NE: "북동(NE)", E: "동(E)", SE: "남동(SE)",
  S: "남(S)", SW: "남서(SW)", W: "서(W)", NW: "북서(NW)",
};
const YANG = new Set<Direction>(["E", "SE", "S", "SW"]);

export function AyurvedaPredictResult({ result, onReset }: Props) {
  const isYang = YANG.has(result.direction);
  const details = [
    { label: "마지막 생리일", value: result.lastPeriodDate },
    { label: "수정일", value: result.conceptionDate },
    { label: "기본 일수", value: `${result.baseDays.toFixed(1)}일` },
    { label: "집 방위", value: DIR_FULL[result.direction] },
    { label: "기(氣) 보정", value: `+${result.chiModifier} (${isYang ? "아들의 기운(E·SE·S·SW)" : "딸의 기운(W·NW·N·NE)"})` },
    { label: "최종 일수", value: `${result.finalDays}일` },
    { label: "판정", value: result.isEven ? `${result.finalDays} 짝수 → 아들` : `${result.finalDays} 홀수 → 딸` },
  ];
  return (
    <GenderResultCard
      gender={result.gender}
      details={details}
      note="* 아유르베다(8방위): 생리→수정 일수 + 아들의 기운 방위 보정 → 짝수면 아들, 홀수면 딸"
      onReset={onReset}
    />
  );
}
