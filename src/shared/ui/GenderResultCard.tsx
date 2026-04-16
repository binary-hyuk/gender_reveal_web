type Gender = "Boy" | "Girl";

interface Detail {
  label: string;
  value: string;
}

interface Props {
  gender: Gender;
  details?: Detail[];
  note?: string;
  onReset: () => void;
}

const CONFIG = {
  Boy: {
    emoji: "👦",
    label: "아들이에요!",
    bg: "from-blue-100 to-blue-200",
    text: "text-blue-700",
  },
  Girl: {
    emoji: "👧",
    label: "딸이에요!",
    bg: "from-pink-100 to-pink-200",
    text: "text-pink-700",
  },
} as const;

export function GenderResultCard({ gender, details, note, onReset }: Props) {
  const cfg = CONFIG[gender];

  return (
    <div className="w-full max-w-sm space-y-4">
      <div
        className={`rounded-2xl bg-gradient-to-br ${cfg.bg} p-8 text-center shadow-lg`}
      >
        <div className="mb-3 text-7xl">{cfg.emoji}</div>
        <h2 className={`text-3xl font-extrabold ${cfg.text}`}>{cfg.label}</h2>
      </div>

      {details && details.length > 0 && (
        <div className="rounded-2xl border border-gray-100 bg-white px-6 py-4 shadow-sm">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
            계산 근거
          </h3>
          <div className="space-y-2 text-sm text-gray-600">
            {details.map(({ label, value }) => (
              <div key={label} className="flex justify-between">
                <span>{label}</span>
                <span className="font-semibold text-gray-800">{value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {note && (
        <p className="text-center text-xs text-gray-400">{note}</p>
      )}

      <button
        onClick={onReset}
        className="w-full rounded-xl border border-gray-200 bg-white py-3 text-sm font-semibold text-gray-600 shadow-sm transition-colors hover:bg-gray-50"
      >
        다시 예측하기
      </button>
    </div>
  );
}
