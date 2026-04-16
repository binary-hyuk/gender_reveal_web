import { PageLayout } from "@/shared/ui/PageLayout";
import {
  useMayanPredictor,
  MayanPredictForm,
  MayanPredictResult,
} from "@/features/mayan-predict";

export default function MayanPage() {
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
  } = useMayanPredictor();

  return (
    <PageLayout
      title="마야식 성별 예측"
      description="엄마 나이와 임신 월의 홀짝으로 예측"
    >
      {result ? (
        <MayanPredictResult result={result} onReset={reset} />
      ) : (
        <MayanPredictForm
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
