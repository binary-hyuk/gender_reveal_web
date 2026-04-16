import { PageLayout } from '@/shared/ui/PageLayout';
import { useOhangPredictor, OhangPredictForm, OhangPredictResult } from '@/features/ohang-predict';

export default function OhangPage() {
  const {
    momBirth, dadBirth, conceptionStart, conceptionEnd, result, error,
    setMomBirth, setDadBirth, setConceptionStart, setConceptionEnd, predict, reset,
  } = useOhangPredictor();
  return (
    <PageLayout title="✖️ Gr-ai · 오행천문융합" description="오행·주역·천문학·황금비율 융합 성별 예측">
      {result
        ? <OhangPredictResult result={result} onReset={reset} />
        : <OhangPredictForm
            momBirth={momBirth}
            dadBirth={dadBirth}
            conceptionStart={conceptionStart}
            conceptionEnd={conceptionEnd}
            error={error}
            onMomBirthChange={setMomBirth}
            onDadBirthChange={setDadBirth}
            onConceptionStartChange={setConceptionStart}
            onConceptionEndChange={setConceptionEnd}
            onPredict={predict}
          />
      }
    </PageLayout>
  );
}
