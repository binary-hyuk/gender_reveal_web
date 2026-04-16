import { PageLayout } from "@/shared/ui/PageLayout";
import { useDigitalDnaPredictor, DigitalDnaPredictForm, DigitalDnaPredictResult } from "@/features/digital-dna-predict";

export default function DigitalDnaPage() {
  const { momMBTI, dadMBTI, favEmoji, result, error, setMomMBTI, setDadMBTI, setFavEmoji, predict, reset } = useDigitalDnaPredictor();
  return (
    <PageLayout title="🧬 디지털 DNA 예측법" description="MBTI + 이모티콘 유니코드 에너지 성별 예측">
      {result
        ? <DigitalDnaPredictResult result={result} onReset={reset} />
        : <DigitalDnaPredictForm momMBTI={momMBTI} dadMBTI={dadMBTI} favEmoji={favEmoji} error={error} onMomMBTIChange={setMomMBTI} onDadMBTIChange={setDadMBTI} onFavEmojiChange={setFavEmoji} onPredict={predict} />
      }
    </PageLayout>
  );
}
