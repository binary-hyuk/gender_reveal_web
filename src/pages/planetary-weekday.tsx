import { PageLayout } from "@/shared/ui/PageLayout";
import {
  usePlanetaryWeekdayPredictor,
  PlanetaryWeekdayPredictForm,
  PlanetaryWeekdayPredictResult,
} from "@/features/planetary-weekday-predict";

export default function PlanetaryWeekdayPage() {
  const {
    conceptionStart,
    conceptionEnd,
    result,
    error,
    setConceptionStart,
    setConceptionEnd,
    predict,
    reset,
  } = usePlanetaryWeekdayPredictor();

  return (
    <PageLayout
      title="🌍 행성 요일 성별 예측"
      description="수정일의 지배 행성으로 성별 예측"
    >
      {result ? (
        <PlanetaryWeekdayPredictResult result={result} onReset={reset} />
      ) : (
        <PlanetaryWeekdayPredictForm
          conceptionStart={conceptionStart}
          conceptionEnd={conceptionEnd}
          error={error}
          onConceptionStartChange={setConceptionStart}
          onConceptionEndChange={setConceptionEnd}
          onPredict={predict}
        />
      )}
    </PageLayout>
  );
}
