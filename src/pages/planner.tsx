import { PageLayout } from "@/shared/ui/PageLayout";
import {
  usePlannerPredictor,
  PlannerPredictForm,
  PlannerPredictResult,
} from "@/features/planner-predict";

export default function PlannerPage() {
  const {
    motherBirthDate, fatherBirthDate, momMBTI, dadMBTI, target, result, error,
    setMotherBirthDate, setFatherBirthDate, setMomMBTI, setDadMBTI, setTarget,
    predict, reset,
  } = usePlannerPredictor();

  return (
    <PageLayout
      title="🎯 성별 플래너"
      description="원하는 성별에 맞춰 시기·방위·숫자·라이프스타일을 추천합니다"
    >
      {result ? (
        <PlannerPredictResult result={result} onReset={reset} />
      ) : (
        <PlannerPredictForm
          motherBirthDate={motherBirthDate}
          fatherBirthDate={fatherBirthDate}
          momMBTI={momMBTI}
          dadMBTI={dadMBTI}
          target={target}
          error={error}
          onMotherBirthDateChange={setMotherBirthDate}
          onFatherBirthDateChange={setFatherBirthDate}
          onMomMBTIChange={setMomMBTI}
          onDadMBTIChange={setDadMBTI}
          onTargetChange={setTarget}
          onPredict={predict}
        />
      )}
    </PageLayout>
  );
}
