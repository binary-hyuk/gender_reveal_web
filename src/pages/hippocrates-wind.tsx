import { PageLayout } from "@/shared/ui/PageLayout";
import { useHippocratesWindPredictor, HippocratesWindPredictForm, HippocratesWindPredictResult } from "@/features/hippocrates-wind-predict";

export default function HippocratesWindPage() {
  const { conceptionMonth, isNorthernHemisphere, result, error, setConceptionMonth, setIsNorthernHemisphere, predict, reset } = useHippocratesWindPredictor();
  return (
    <PageLayout title="🌬️ 히포크라테스 바람법" description="고대 그리스 바람 성질 성별 예측법 2.0">
      {result
        ? <HippocratesWindPredictResult result={result} onReset={reset} />
        : <HippocratesWindPredictForm conceptionMonth={conceptionMonth} isNorthernHemisphere={isNorthernHemisphere} error={error} onConceptionMonthChange={setConceptionMonth} onIsNorthernHemisphereChange={setIsNorthernHemisphere} onPredict={predict} />
      }
    </PageLayout>
  );
}
