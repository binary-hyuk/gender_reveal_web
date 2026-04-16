import { PageLayout } from "@/shared/ui/PageLayout";
import {
  useAncient49Predictor,
  Ancient49PredictForm,
  Ancient49PredictResult,
} from "@/features/ancient49-predict";

export default function Ancient49Page() {
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
  } = useAncient49Predictor();

  return (
    <PageLayout
      title="주역 49법 성별 예측"
      description="49 + 음력 임신월 - 음력 연나이 + 19의 홀짝으로 예측"
    >
      {result ? (
        <Ancient49PredictResult result={result} onReset={reset} />
      ) : (
        <Ancient49PredictForm
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
