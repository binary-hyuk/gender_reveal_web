import { PageLayout } from "@/shared/ui/PageLayout";
import {
  useBloodTypePredictor,
  BloodTypePredictForm,
  BloodTypePredictResult,
} from "@/features/blood-type-predict";

export default function BloodTypePage() {
  const {
    dadBlood,
    momBlood,
    result,
    error,
    setDadBlood,
    setMomBlood,
    predict,
    reset,
  } = useBloodTypePredictor();

  return (
    <PageLayout
      title="혈액형 조합 성별 예측"
      description="아빠와 엄마의 혈액형 조합으로 확률 예측"
    >
      {result ? (
        <BloodTypePredictResult result={result} onReset={reset} />
      ) : (
        <BloodTypePredictForm
          dadBlood={dadBlood}
          momBlood={momBlood}
          error={error}
          onDadBloodChange={setDadBlood}
          onMomBloodChange={setMomBlood}
          onPredict={predict}
        />
      )}
    </PageLayout>
  );
}
