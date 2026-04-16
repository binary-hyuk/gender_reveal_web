import { PageLayout } from "@/shared/ui/PageLayout";
import {
  useMayanPredictor,
  MayanPredictForm,
  MayanPredictResult,
} from "@/features/mayan-predict";

export default function MayanPage() {
  const {
    momAge,
    conceptionMonth,
    result,
    error,
    setMomAge,
    setConceptionMonth,
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
          momAge={momAge}
          conceptionMonth={conceptionMonth}
          error={error}
          onMomAgeChange={setMomAge}
          onConceptionMonthChange={setConceptionMonth}
          onPredict={predict}
        />
      )}
    </PageLayout>
  );
}
