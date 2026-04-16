import { GenderResultCard } from "@/shared/ui/GenderResultCard";
import type { PlanetaryResult } from "../model/usePlanetaryWeekdayPredictor";

interface Props {
  result: PlanetaryResult;
  onReset: () => void;
}

function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
}

export function PlanetaryWeekdayPredictResult({ result, onReset }: Props) {
  const isMalePlanet = result.gender === "Boy";

  return (
    <GenderResultCard
      gender={result.gender}
      details={[
        {
          label: "임신일",
          value: formatDate(result.conceptionDate),
        },
        {
          label: "요일",
          value: result.dayName,
        },
        {
          label: "지배 행성",
          value: `${result.planetEmoji} ${result.planetName}`,
        },
        {
          label: "판정",
          value: isMalePlanet ? "남성 행성 → 아들" : "여성 행성 → 딸",
        },
      ]}
      note="* 전통 행성 점성술: 태양·화성·목성·토성은 아들, 달·수성·금성은 딸"
      onReset={onReset}
    />
  );
}
