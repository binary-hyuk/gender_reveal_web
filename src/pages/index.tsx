import { PageLayout } from "@/shared/ui/PageLayout";
import {
  useAiPredictor,
  AiPredictForm,
  AiPredictLoading,
  AiPredictResult,
} from "@/features/ai-predict";

export default function AiPredictPage() {
  const {
    motherBirthDate, conceptionDate, fatherBirthDate,
    momBlood, dadBlood, momName, dadName,
    locationString, isNorthernHemisphere, lastPeriodDate, direction,
    houseDirection, floorNumber, momMBTI, dadMBTI, favEmoji, fatherVibe,
    isLoading, result, error,
    setMotherBirthDate, setConceptionDate, setFatherBirthDate,
    setMomBlood, setDadBlood, setMomName, setDadName,
    setLocationString, setIsNorthernHemisphere, setLastPeriodDate, setDirection,
    setHouseDirection, setFloorNumber, setMomMBTI, setDadMBTI, setFavEmoji, setFatherVibe,
    predict, reset,
  } = useAiPredictor();

  return (
    <PageLayout
      title="AI 성별 예측"
      description="9가지 전통 예측법을 가중치로 종합한 AI 분석"
    >
      {isLoading ? (
        <AiPredictLoading />
      ) : result ? (
        <AiPredictResult result={result} onReset={reset} />
      ) : (
        <AiPredictForm
          motherBirthDate={motherBirthDate}
          conceptionDate={conceptionDate}
          fatherBirthDate={fatherBirthDate}
          momBlood={momBlood}
          dadBlood={dadBlood}
          momName={momName}
          dadName={dadName}
          locationString={locationString}
          isNorthernHemisphere={isNorthernHemisphere}
          lastPeriodDate={lastPeriodDate}
          direction={direction}
          houseDirection={houseDirection}
          floorNumber={floorNumber}
          momMBTI={momMBTI}
          dadMBTI={dadMBTI}
          favEmoji={favEmoji}
          error={error}
          onMotherBirthDateChange={setMotherBirthDate}
          onConceptionDateChange={setConceptionDate}
          onFatherBirthDateChange={setFatherBirthDate}
          onMomBloodChange={setMomBlood}
          onDadBloodChange={setDadBlood}
          onMomNameChange={setMomName}
          onDadNameChange={setDadName}
          onLocationStringChange={setLocationString}
          onIsNorthernHemisphereChange={setIsNorthernHemisphere}
          onLastPeriodDateChange={setLastPeriodDate}
          onDirectionChange={setDirection}
          onHouseDirectionChange={setHouseDirection}
          onFloorNumberChange={setFloorNumber}
          onMomMBTIChange={setMomMBTI}
          onDadMBTIChange={setDadMBTI}
          onFavEmojiChange={setFavEmoji}
          onFatherVibeChange={setFatherVibe}
          fatherVibe={fatherVibe}
          onPredict={predict}
        />
      )}
    </PageLayout>
  );
}
