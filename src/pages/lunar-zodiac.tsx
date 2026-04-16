import { PageLayout } from "@/shared/ui/PageLayout";
import {
  useLunarZodiacPredictor,
  LunarZodiacPredictForm,
  LunarZodiacPredictResult,
} from "@/features/lunar-zodiac-predict";

export default function LunarZodiacPage() {
  const { conceptionDate, result, error, setConceptionDate, predict, reset } =
    useLunarZodiacPredictor();

  return (
    <PageLayout
      title="달 별자리 성별 예측"
      description="임신 당시 달(Moon)이 위치한 황도 별자리로 예측"
    >
      {result ? (
        <LunarZodiacPredictResult result={result} onReset={reset} />
      ) : (
        <LunarZodiacPredictForm
          conceptionDate={conceptionDate}
          error={error}
          onConceptionDateChange={setConceptionDate}
          onPredict={predict}
        />
      )}
    </PageLayout>
  );
}
