import { PageLayout } from "@/shared/ui/PageLayout";
import {
  useBloodRenewalPredictor,
  BloodRenewalPredictForm,
  BloodRenewalPredictResult,
} from "@/features/blood-renewal-predict";

export default function BloodRenewalPage() {
  const {
    dadAge,
    momAge,
    result,
    error,
    setDadAge,
    setMomAge,
    predict,
    reset,
  } = useBloodRenewalPredictor();

  return (
    <PageLayout
      title="혈액 갱신법 성별 예측"
      description="아빠 나이 ÷ 4, 엄마 나이 ÷ 3의 나머지 비교로 예측"
    >
      {result ? (
        <BloodRenewalPredictResult result={result} onReset={reset} />
      ) : (
        <BloodRenewalPredictForm
          dadAge={dadAge}
          momAge={momAge}
          error={error}
          onDadAgeChange={setDadAge}
          onMomAgeChange={setMomAge}
          onPredict={predict}
        />
      )}
    </PageLayout>
  );
}
