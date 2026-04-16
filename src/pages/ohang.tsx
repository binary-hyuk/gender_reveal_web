import { PageLayout } from '@/shared/ui/PageLayout';
import { useOhangPredictor, OhangPredictForm, OhangPredictResult } from '@/features/ohang-predict';

export default function OhangPage() {
  const { momBirth, dadBirth, conceptionMonth, result, error, setMomBirth, setDadBirth, setConceptionMonth, predict, reset } = useOhangPredictor();
  return (
    <PageLayout title="✖️ Gr-ai · 오행천문융합" description="오행·주역·천문학·황금비율 융합 성별 예측">
      {result
        ? <OhangPredictResult result={result} onReset={reset} />
        : <OhangPredictForm momBirth={momBirth} dadBirth={dadBirth} conceptionMonth={conceptionMonth} error={error} onMomBirthChange={setMomBirth} onDadBirthChange={setDadBirth} onConceptionMonthChange={setConceptionMonth} onPredict={predict} />
      }
    </PageLayout>
  );
}
