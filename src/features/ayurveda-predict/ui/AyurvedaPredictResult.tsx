import { GenderResultCard } from "@/shared/ui/GenderResultCard";
import type { AyurvedaResult } from "../model/useAyurvedaPredictor";

interface Props { result: AyurvedaResult; onReset: () => void; }

export function AyurvedaPredictResult({ result, onReset }: Props) {
  const details = [
    { label: "마지막 생리일", value: result.lastPeriodDate },
    { label: "수정일", value: result.conceptionDate },
    { label: "기본 일수", value: `${result.baseDays.toFixed(1)}일` },
    { label: "집 방위", value: result.direction },
    { label: "기(氣) 보정", value: `+${result.chiModifier} (${result.direction === "East" || result.direction === "South" ? "동·남 양기" : "서·북 음기"})` },
    { label: "최종 일수", value: `${result.finalDays}일` },
    { label: "판정", value: result.isEven ? `${result.finalDays} 짝수 → 아들` : `${result.finalDays} 홀수 → 딸` },
  ];
  return (
    <GenderResultCard
      gender={result.gender}
      details={details}
      note="* 아유르베다: 생리→수정 일수 + 방위 기(氣) 보정 → 짝수면 아들, 홀수면 딸"
      onReset={onReset}
    />
  );
}
