import { PageLayout } from "@/shared/ui/PageLayout";
import {
  useNumerologyPredictor,
  NumerologyPredictForm,
  NumerologyPredictResult,
} from "@/features/numerology-predict";

export default function NumerologyPage() {
  const {
    momName,
    dadName,
    conceptionMonth,
    result,
    error,
    setMomName,
    setDadName,
    setConceptionMonth,
    predict,
    reset,
  } = useNumerologyPredictor();

  return (
    <PageLayout
      title="🔢 수비학 성별 예측"
      description="서양 수비학 기반 성별 예측법"
    >
      {result ? (
        <NumerologyPredictResult result={result} onReset={reset} />
      ) : (
        <NumerologyPredictForm
          momName={momName}
          dadName={dadName}
          conceptionMonth={conceptionMonth}
          error={error}
          onMomNameChange={setMomName}
          onDadNameChange={setDadName}
          onConceptionMonthChange={setConceptionMonth}
          onPredict={predict}
        />
      )}
    </PageLayout>
  );
}
