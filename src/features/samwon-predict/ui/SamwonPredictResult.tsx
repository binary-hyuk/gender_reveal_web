import { GenderResultCard } from "@/shared/ui/GenderResultCard";
import type { SamwonResult } from "../model/useSamwonPredictor";

interface Props {
  result: SamwonResult;
  onReset: () => void;
}

export function SamwonPredictResult({ result, onReset }: Props) {
  return (
    <GenderResultCard
      gender={result.gender}
      details={[
        {
          label: "엄마 천간",
          value: `${result.stemNames.mother} · ${result.elementNames.mother} · ${result.yinyangNames.mother}`,
        },
        {
          label: "아빠 천간",
          value: `${result.stemNames.father} · ${result.elementNames.father} · ${result.yinyangNames.father}`,
        },
        {
          label: "잉태 천간",
          value: `${result.stemNames.conception} · ${result.elementNames.conception} · ${result.yinyangNames.conception}`,
        },
        {
          label: "오행 상호작용",
          value: `${result.scores.interaction > 0 ? "+" : ""}${result.scores.interaction}점`,
        },
        {
          label: "음양 밸런스",
          value: `${result.scores.yinyang > 0 ? "+" : ""}${result.scores.yinyang}점`,
        },
        {
          label: "월상 에너지",
          value: `${result.scores.lunar > 0 ? "+" : ""}${result.scores.lunar}점`,
        },
        {
          label: "직감수 변조",
          value: `${result.scores.intuition > 0 ? "+" : ""}${result.scores.intuition}점`,
        },
        {
          label: "총점 → 정규화",
          value: `${result.scores.total} → ${result.scores.normalized} (기준 25)`,
        },
      ]}
      note="* 삼원공명: 대연지수 49로 정규화, 25 이상이면 아들, 미만이면 딸"
      onReset={onReset}
    />
  );
}
