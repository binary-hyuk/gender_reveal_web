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

function MbtiSelector({ label, value, activeColor, onChange }: { label: string; value: string; activeColor: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-semibold text-gray-700">{label}</label>
      <div className="grid grid-cols-4 gap-1.5">
        {MBTI_TYPES.map((t) => (
          <button
            key={t}
            onClick={() => onChange(t)}
            className={[
              "rounded-lg py-2 text-xs font-bold transition-colors",
              value === t ? `${activeColor} text-white shadow` : "border border-gray-200 bg-white text-gray-500 hover:bg-gray-50",
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
      <div className="rounded-2xl bg-purple-50 px-4 py-3 text-sm text-purple-700">
        🧬 MBTI 에너지(E·S·T·P vs I·N·F·J) + 이모티콘 유니코드 홀짝으로 판단합니다.
      </div>

      <MbtiSelector label="엄마 MBTI" value={momMBTI} activeColor="bg-pink-500" onChange={onMomMBTIChange} />
      <MbtiSelector label="아빠 MBTI" value={dadMBTI} activeColor="bg-blue-500" onChange={onDadMBTIChange} />

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">최애 이모티콘</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {EMOJI_PRESETS.map((e) => (
            <button
              key={e}
              onClick={() => onFavEmojiChange(e)}
              className={[
                "rounded-xl px-3 py-2 text-lg transition-colors",
                favEmoji === e ? "bg-purple-500 shadow ring-2 ring-purple-300" : "border border-gray-200 bg-white hover:bg-gray-50",
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
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-800 shadow-sm outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
        />
      </div>

      {error && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-500">{error}</p>
      )}

      <button
        onClick={onPredict}
        className="w-full rounded-xl bg-gradient-to-r from-purple-500 to-violet-400 py-4 text-lg font-bold text-white shadow-md transition-transform active:scale-95 hover:opacity-90"
      >
        성별 예측하기
      </button>
    </div>
  );
}
