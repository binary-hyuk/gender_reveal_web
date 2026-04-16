import { PageLayout } from "@/shared/ui/PageLayout";
import { useAyurvedaPredictor, AyurvedaPredictForm, AyurvedaPredictResult } from "@/features/ayurveda-predict";

export default function AyurvedaPage() {
  const { lastPeriodDate, conceptionDate, direction, result, error, setLastPeriodDate, setConceptionDate, setDirection, predict, reset } = useAyurvedaPredictor();
  return (
    <PageLayout title="🪷 아유르베다 주기법" description="고대 인도 생리 주기 + 방위 기운 성별 예측법 2.0">
      {result
        ? <AyurvedaPredictResult result={result} onReset={reset} />
        : <AyurvedaPredictForm lastPeriodDate={lastPeriodDate} conceptionDate={conceptionDate} direction={direction} error={error} onLastPeriodDateChange={setLastPeriodDate} onConceptionDateChange={setConceptionDate} onDirectionChange={setDirection} onPredict={predict} />
      }
    </PageLayout>
  );
}
