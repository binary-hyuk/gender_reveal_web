import { PageLayout } from "@/shared/ui/PageLayout";
import {
  useGenderPredictor,
  GenderPredictForm,
  GenderPredictResult,
} from "@/features/gender-predict";

export default function ChinesePage() {
  const {
    motherBirthDate, conceptionDate, result, error,
    setMotherBirthDate, setConceptionDate, predict, reset,
  } = useGenderPredictor();

  return (
    <PageLayout
      title="중국 황실 달력 성별 예측"
      description="음력 연나이 × 음력 임신월 기반 전통 예측"
    >
      {result ? (
        <GenderPredictResult result={result} onReset={reset} />
      ) : (
        <GenderPredictForm
          motherBirthDate={motherBirthDate}
          conceptionDate={conceptionDate}
          error={error}
          onMotherBirthDateChange={setMotherBirthDate}
          onConceptionDateChange={setConceptionDate}
          onPredict={predict}
        />
      )}
    </PageLayout>
  );
}
