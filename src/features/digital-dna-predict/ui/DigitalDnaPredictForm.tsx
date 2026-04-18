import { ErrorMessage } from "@/shared/ui/ErrorMessage";
import { PredictButton } from "@/shared/ui/PredictButton";
import { GlassCard } from "@/shared/ui/GlassCard";

const MBTI_TYPES = ["INTJ","INTP","ENTJ","ENTP","INFJ","INFP","ENFJ","ENFP","ISTJ","ISFJ","ESTJ","ESFJ","ISTP","ISFP","ESTP","ESFP"] as const;
const EMOJI_PRESETS = ["🔥","💧","🌿","⚡","🌙","☀️","💎","🌊","🎯","🦋"];

interface Props {
  momMBTI: string;
  dadMBTI: string;
  favEmoji: string;
  error: string | null;
  onMomMBTIChange: (v: string) => void;
  onDadMBTIChange: (v: string) => void;
  onFavEmojiChange: (v: string) => void;
  onPredict: () => void;
}

function MbtiSelector({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-semibold text-fg">{label}</label>
      <div className="grid grid-cols-4 gap-1.5">
        {MBTI_TYPES.map((t) => (
          <button
            key={t}
            onClick={() => onChange(t)}
            className={[
              "rounded-lg py-2 text-xs font-bold transition-colors",
              value === t ? "bg-brand-600 text-white shadow" : "glass text-fg-muted hover:bg-white/70",
            ].join(" ")}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}

export function DigitalDnaPredictForm({
  momMBTI, dadMBTI, favEmoji, error,
  onMomMBTIChange, onDadMBTIChange, onFavEmojiChange, onPredict,
}: Props) {
  return (
    <div className="w-full max-w-sm space-y-6">
      <GlassCard variant="soft" className="px-4 py-3 text-sm text-fg">
        🧬 MBTI 에너지(E·S·T·P vs I·N·F·J) + 이모티콘 유니코드 홀짝으로 판단합니다.
      </GlassCard>

      <MbtiSelector label="엄마 MBTI" value={momMBTI} onChange={onMomMBTIChange} />
      <MbtiSelector label="아빠 MBTI" value={dadMBTI} onChange={onDadMBTIChange} />

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-fg">최애 이모티콘</label>
        <div className="grid grid-cols-5 gap-2 mb-2">
          {EMOJI_PRESETS.map((e) => (
            <button
              key={e}
              onClick={() => onFavEmojiChange(e)}
              className={[
                "aspect-square rounded-xl text-3xl flex items-center justify-center transition-colors",
                favEmoji === e ? "bg-brand-600 text-white shadow" : "glass hover:bg-white/70",
              ].join(" ")}
            >
              {e}
            </button>
          ))}
        </div>
        <input
          type="text"
          value={favEmoji}
          onChange={(e) => onFavEmojiChange(e.target.value)}
          placeholder="직접 입력 (이모티콘 1개)"
          className="w-full rounded-xl glass px-4 py-3 text-fg outline-none focus:ring-2 focus:ring-brand-200"
        />
      </div>

      <ErrorMessage message={error} />

      <PredictButton onClick={onPredict}>성별 예측하기</PredictButton>
    </div>
  );
}
