import { PageLayout } from "@/shared/ui/PageLayout";
import {
  useGypsyPredictor,
  GypsyPredictForm,
  GypsyPredictResult,
} from "@/features/gypsy-predict";

export default function GypsyPage() {
  const {
    motherBirthDate,
    conceptionStart,
    conceptionEnd,
    result,
    error,
    setMotherBirthDate,
    setConceptionStart,
    setConceptionEnd,
    predict,
    reset,
  } = useGypsyPredictor();

  return (
    <PageLayout
      title="🎴 집시 성별 예측"
      description="집시 전통 생월법 성별 예측"
    >
      {result ? (
        <GypsyPredictResult result={result} onReset={reset} />
      ) : (
        <GypsyPredictForm
          motherBirthDate={motherBirthDate}
          conceptionStart={conceptionStart}
          conceptionEnd={conceptionEnd}
          error={error}
          onMotherBirthDateChange={setMotherBirthDate}
          onConceptionStartChange={setConceptionStart}
          onConceptionEndChange={setConceptionEnd}
          onPredict={predict}
        />
      )}
    </PageLayout>
  );
}
