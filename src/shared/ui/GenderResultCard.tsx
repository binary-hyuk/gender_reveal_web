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
    <div className="w-full max-w-sm space-y-4">
      <GlassCard variant="strong" className={`relative overflow-hidden p-8 text-center ring-1 ${cfg.ring}`}>
        <div
          aria-hidden
          className={`absolute -top-10 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-gradient-to-b ${cfg.glow} to-transparent blur-2xl`}
        />
        <div className="relative">
          <div
            className={`mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-white/80 shadow-sm ring-1 ring-white/60 ${cfg.accent}`}
          >
            <Baby size={30} strokeWidth={2.25} aria-hidden />
          </div>
          <h2 className={`text-2xl font-bold tracking-tight ${cfg.accent}`}>
            {cfg.label}
          </h2>
        </div>
      </GlassCard>

      {details && details.length > 0 && (
        <GlassCard variant="soft" className="px-5 py-4">
          <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-fg-subtle">
            계산 근거
          </h3>
          <div className="space-y-2 text-sm text-fg-muted">
            {details.map(({ label, value }) => (
              <div key={label} className="flex justify-between gap-4">
                <span className="truncate">{label}</span>
                <span className="font-semibold text-fg">{value}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      )}

      {note && (
        <p className="text-center text-xs text-fg-subtle">{note}</p>
      )}

      {onReset && (
        <button
          onClick={onReset}
          className="glass flex w-full items-center justify-center gap-2 rounded-2xl py-3 text-sm font-semibold text-fg-muted transition hover:bg-white/70 active:scale-[0.98]"
        >
          <RotateCcw size={16} strokeWidth={2.25} aria-hidden />
          다시 예측하기
        </button>
      )}
    </div>
  );
}
