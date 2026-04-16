import { PageLayout } from "@/shared/ui/PageLayout";
import {
  useAiPredictor,
  AiPredictForm,
  AiPredictLoading,
  AiPredictResult,
} from "@/features/ai-predict";

export default function AiPredictPage() {
  const {
    motherBirthDate, conceptionDate, fatherBirthDate,
    momBlood, dadBlood, isLoading, result, error,
    setMotherBirthDate, setConceptionDate, setFatherBirthDate,
    setMomBlood, setDadBlood, predict, reset,
  } = useAiPredictor();

  return (
    <PageLayout
      title="AI 성별 예측"
      description="6가지 전통 예측법을 가중치로 종합한 AI 분석"
    >
      {isLoading ? (
        <AiPredictLoading />
      ) : result ? (
        <AiPredictResult result={result} onReset={reset} />
      ) : (
        <AiPredictForm
          motherBirthDate={motherBirthDate}
          conceptionDate={conceptionDate}
          fatherBirthDate={fatherBirthDate}
          momBlood={momBlood}
          dadBlood={dadBlood}
          error={error}
          onMotherBirthDateChange={setMotherBirthDate}
          onConceptionDateChange={setConceptionDate}
          onFatherBirthDateChange={setFatherBirthDate}
          onMomBloodChange={setMomBlood}
          onDadBloodChange={setDadBlood}
          onPredict={predict}
        />
      )}
    </PageLayout>
  );
}
