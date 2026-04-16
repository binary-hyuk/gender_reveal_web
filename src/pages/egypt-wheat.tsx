import { PageLayout } from "@/shared/ui/PageLayout";
import { useEgyptWheatPredictor, EgyptWheatPredictForm, EgyptWheatPredictResult } from "@/features/egypt-wheat-predict";

export default function EgyptWheatPage() {
  const { momName, conceptionDate, locationString, result, error, setMomName, setConceptionDate, setLocationString, predict, reset } = useEgyptWheatPredictor();
  return (
    <PageLayout title="🌾 이집트 밀·보리법" description="고대 이집트 곡물 발아 시뮬레이터 2.0">
      {result
        ? <EgyptWheatPredictResult result={result} onReset={reset} />
        : <EgyptWheatPredictForm momName={momName} conceptionDate={conceptionDate} locationString={locationString} error={error} onMomNameChange={setMomName} onConceptionDateChange={setConceptionDate} onLocationStringChange={setLocationString} onPredict={predict} />
      }
    </PageLayout>
  );
}
