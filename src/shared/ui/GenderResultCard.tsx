import { Baby, RotateCcw } from "lucide-react";
import { GlassCard } from "./GlassCard";

type Gender = "Boy" | "Girl";

interface Detail {
  label: string;
  value: string;
}

interface Props {
  gender: Gender;
  details?: Detail[];
  note?: string;
  onReset?: () => void;
}

const CONFIG = {
  Boy: {
    label: "아들이에요!",
    accent: "text-sky-600",
    ring: "ring-sky-200/60",
    glow: "from-sky-200/60",
  },
  Girl: {
    label: "딸이에요!",
    accent: "text-pink-600",
    ring: "ring-pink-200/60",
    glow: "from-pink-200/60",
  },
} as const;

export function GenderResultCard({ gender, details, note, onReset }: Props) {
  const cfg = CONFIG[gender];

  return (
    <div className="w-full max-w-sm space-y-5">
      <GlassCard variant="strong" className={`relative overflow-hidden px-8 py-10 text-center`}>
        <div className="relative">
          <div
            className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/80 ${cfg.accent}`}
          >
            <Baby size={26} strokeWidth={2} aria-hidden />
          </div>
          <h2 className={`text-2xl font-semibold tracking-tight ${cfg.accent}`}>
            {cfg.label}
          </h2>
        </div>
      </GlassCard>

      {details && details.length > 0 && (
        <GlassCard variant="soft" className="px-6 py-5">
          <h3 className="mb-4 text-[11px] font-medium uppercase tracking-[0.15em] text-fg-subtle">
            계산 근거
          </h3>
          <div className="space-y-3 text-sm">
            {details.map(({ label, value }) => (
              <div key={label} className="flex justify-between gap-4">
                <span className="text-fg-muted truncate">{label}</span>
                <span className="font-medium text-fg">{value}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      )}

      {note && (
        <p className="text-center text-xs leading-relaxed text-fg-subtle">{note}</p>
      )}

      {onReset && (
        <button
          onClick={onReset}
          className="glass flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-sm font-medium text-fg-muted transition hover:bg-white/70 active:scale-[0.98]"
        >
          <RotateCcw size={15} strokeWidth={2} aria-hidden />
          다시 예측하기
        </button>
      )}
    </div>
  );
}
