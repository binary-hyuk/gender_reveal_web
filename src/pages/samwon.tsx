import { PageLayout } from "@/shared/ui/PageLayout";
import {
  useSamwonPredictor,
  SamwonPredictForm,
  SamwonPredictResult,
} from "@/features/samwon-predict";

export default function SamwonPage() {
  const {
    motherBirthDate, fatherBirthDate, conceptionMonth, intuition, result, error,
    setMotherBirthDate, setFatherBirthDate, setConceptionMonth, setIntuition, predict, reset,
  } = useSamwonPredictor();

  return (
    <PageLayout
      title="✳️ Cl-ai · 삼원공명"
      description="천간·오행·음양 + 월상 + 직감수 기반 예측법"
    >
      {result ? (
        <SamwonPredictResult result={result} onReset={reset} />
      ) : (
        <SamwonPredictForm
          motherBirthDate={motherBirthDate}
          fatherBirthDate={fatherBirthDate}
          conceptionMonth={conceptionMonth}
          intuition={intuition}
          error={error}
          onMotherBirthDateChange={setMotherBirthDate}
          onFatherBirthDateChange={setFatherBirthDate}
          onConceptionMonthChange={setConceptionMonth}
          onIntuitionChange={setIntuition}
          onPredict={predict}
        />
      )}
    </PageLayout>
  );
}
