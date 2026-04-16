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
    conceptionStart,
    conceptionEnd,
    result,
    error,
    setMomName,
    setDadName,
    setConceptionStart,
    setConceptionEnd,
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
          conceptionStart={conceptionStart}
          conceptionEnd={conceptionEnd}
          error={error}
          onMomNameChange={setMomName}
          onDadNameChange={setDadName}
          onConceptionStartChange={setConceptionStart}
          onConceptionEndChange={setConceptionEnd}
          onPredict={predict}
        />
      )}
    </PageLayout>
  );
}
