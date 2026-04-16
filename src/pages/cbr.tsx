import { PageLayout } from "@/shared/ui/PageLayout";
import { useCBRPredictor, CBRPredictForm, CBRPredictResult } from "@/features/cbr-predict";

export default function CBRPage() {
  const {
    motherDob, conceptionStart, conceptionEnd, fatherVibe, result, error,
    setMotherDob, setConceptionStart, setConceptionEnd, setFatherVibe, predict, reset,
  } = useCBRPredictor();
  return (
    <PageLayout title="✨ Ge-ai · CBR-Engine" description="시공간 생체 공명 판별 엔진 · Chrono-Biological Resonance">
      {result
        ? <CBRPredictResult result={result} onReset={reset} />
        : <CBRPredictForm
            motherDob={motherDob}
            conceptionStart={conceptionStart}
            conceptionEnd={conceptionEnd}
            fatherVibe={fatherVibe}
            error={error}
            onMotherDobChange={setMotherDob}
            onConceptionStartChange={setConceptionStart}
            onConceptionEndChange={setConceptionEnd}
            onFatherVibeChange={setFatherVibe}
            onPredict={predict}
          />
      }
    </PageLayout>
  );
}
