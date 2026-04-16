import { PageLayout } from "@/shared/ui/PageLayout";
import { useEgyptWheatPredictor, EgyptWheatPredictForm, EgyptWheatPredictResult } from "@/features/egypt-wheat-predict";

export default function EgyptWheatPage() {
  const {
    momName, conceptionStart, conceptionEnd, locationString, result, error,
    setMomName, setConceptionStart, setConceptionEnd, setLocationString, predict, reset,
  } = useEgyptWheatPredictor();
  return (
    <PageLayout title="🌾 이집트 밀·보리법" description="고대 이집트 곡물 발아 시뮬레이터 2.0">
      {result
        ? <EgyptWheatPredictResult result={result} onReset={reset} />
        : <EgyptWheatPredictForm
            momName={momName}
            conceptionStart={conceptionStart}
            conceptionEnd={conceptionEnd}
            locationString={locationString}
            error={error}
            onMomNameChange={setMomName}
            onConceptionStartChange={setConceptionStart}
            onConceptionEndChange={setConceptionEnd}
            onLocationStringChange={setLocationString}
            onPredict={predict}
          />
      }
    </PageLayout>
  );
}
