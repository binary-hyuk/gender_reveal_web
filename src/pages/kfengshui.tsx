import { PageLayout } from "@/shared/ui/PageLayout";
import { useKFengshuiPredictor, KFengshuiPredictForm, KFengshuiPredictResult } from "@/features/kfengshui-predict";

export default function KFengshuiPage() {
  const { houseDirection, floorNumber, locationString, result, error, setHouseDirection, setFloorNumber, setLocationString, predict, reset } = useKFengshuiPredictor();
  return (
    <PageLayout title="🏠 K-풍수지리 예측법" description="거주 층수·방향·주소 기운 음양 성별 예측">
      {result
        ? <KFengshuiPredictResult result={result} onReset={reset} />
        : <KFengshuiPredictForm houseDirection={houseDirection} floorNumber={floorNumber} locationString={locationString} error={error} onHouseDirectionChange={setHouseDirection} onFloorNumberChange={setFloorNumber} onLocationStringChange={setLocationString} onPredict={predict} />
      }
    </PageLayout>
  );
}
