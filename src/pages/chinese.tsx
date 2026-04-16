import { PageLayout } from "@/shared/ui/PageLayout";
import {
  useGenderPredictor,
  GenderPredictForm,
  GenderPredictResult,
} from "@/features/gender-predict";

export default function ChinesePage() {
  const {
    motherBirthDate, conceptionStart, conceptionEnd, result, error,
    setMotherBirthDate, setConceptionStart, setConceptionEnd, predict, reset,
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
