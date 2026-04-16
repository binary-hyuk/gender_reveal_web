import { PageLayout } from "@/shared/ui/PageLayout";
import { useCBRPredictor, CBRPredictForm, CBRPredictResult } from "@/features/cbr-predict";

export default function CBRPage() {
  const { motherDob, conceptionDate, fatherVibe, result, error, setMotherDob, setConceptionDate, setFatherVibe, predict, reset } = useCBRPredictor();
  return (
    <PageLayout title="🏛️ CBR-Engine" description="시공간 생체 공명 판별 엔진 · Chrono-Biological Resonance">
      {result
        ? <CBRPredictResult result={result} onReset={reset} />
        : <CBRPredictForm motherDob={motherDob} conceptionDate={conceptionDate} fatherVibe={fatherVibe} error={error} onMotherDobChange={setMotherDob} onConceptionDateChange={setConceptionDate} onFatherVibeChange={setFatherVibe} onPredict={predict} />
      }
    </PageLayout>
  );
}
