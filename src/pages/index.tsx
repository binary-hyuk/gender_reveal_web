import { PageLayout } from "@/shared/ui/PageLayout";
import { PredictionHistoryPanel } from "@/shared/ui/PredictionHistoryPanel";
import {
  useAiPredictor,
  AiPredictForm,
  AiPredictLoading,
  AiPredictResult,
} from "@/features/ai-predict";

export default function AiPredictPage() {
  const {
    motherBirthDate, conceptionStart, conceptionEnd, fatherBirthDate,
    momBlood, dadBlood, momName, dadName,
    locationString, isNorthernHemisphere, lastPeriodDate, direction,
    houseDirection, floorNumber, momMBTI, dadMBTI, favEmoji, fatherVibe, intuition,
    selectedCategories,
    isLoading, result, error,
    setMotherBirthDate, setConceptionStart, setConceptionEnd, setFatherBirthDate,
    setMomBlood, setDadBlood, setMomName, setDadName,
    setLocationString, setIsNorthernHemisphere, setLastPeriodDate, setDirection,
    setHouseDirection, setFloorNumber, setMomMBTI, setDadMBTI, setFavEmoji, setFatherVibe, setIntuition,
    toggleCategory, clearSavedInputs,
    predict, reset,
  } = useAiPredictor();

  return (
    <PageLayout
      title="AI 성별 예측"
      description="필수 정보만 입력하고, 관심있는 예측법을 골라서 추가해보세요"
    >
      {isLoading ? (
        <AiPredictLoading />
      ) : result ? (
        <AiPredictResult result={result} onReset={reset} />
      ) : (
        <div className="w-full max-w-sm space-y-5">
          <AiPredictForm
            motherBirthDate={motherBirthDate}
            conceptionStart={conceptionStart}
            conceptionEnd={conceptionEnd}
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
            fatherVibe={fatherVibe}
            intuition={intuition}
            selectedCategories={selectedCategories}
            error={error}
            onMotherBirthDateChange={setMotherBirthDate}
            onConceptionStartChange={setConceptionStart}
            onConceptionEndChange={setConceptionEnd}
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
            onIntuitionChange={setIntuition}
            onToggleCategory={toggleCategory}
            onClearSavedInputs={clearSavedInputs}
            onPredict={predict}
          />
          <PredictionHistoryPanel />
        </div>
      )}
    </PageLayout>
  );
}
