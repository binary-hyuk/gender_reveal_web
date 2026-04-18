import { useEffect, useState } from "react";
import { History, ChevronDown, X } from "lucide-react";
import { GlassCard } from "@/shared/ui/GlassCard";
import { loadHistory, clearHistory, removeHistoryItem, type PredictionHistoryEntry } from "@/shared/lib/predictionHistory";

function formatRelative(ts: number): string {
  const diff = Date.now() - ts;
  const sec = Math.floor(diff / 1000);
  if (sec < 60) return "방금 전";
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}분 전`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}시간 전`;
  const day = Math.floor(hr / 24);
  if (day < 30) return `${day}일 전`;
  return new Date(ts).toLocaleDateString("ko-KR");
}

export function PredictionHistoryPanel() {
  const [items, setItems] = useState<PredictionHistoryEntry[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setItems(loadHistory());
  }, []);

  if (items.length === 0) return null;

  return (
    <GlassCard>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between rounded-2xl px-5 py-3 text-left"
        aria-expanded={open}
      >
        <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-fg-subtle">
          <History size={13} strokeWidth={2.25} aria-hidden />
          최근 예측
          <span className="normal-case text-fg-muted">({items.length})</span>
        </span>
        <ChevronDown
          size={14}
          strokeWidth={2.5}
          className={`text-fg-subtle transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>

      {open && (
        <div className="space-y-2 border-t border-white/40 px-3 py-3">
          {items.map((it) => (
            <div
              key={it.id}
              className="flex items-center gap-3 rounded-xl bg-white/50 px-3 py-2 text-sm"
            >
              <span className="text-2xl" aria-hidden>{it.resultEmoji}</span>
              <div className="flex-1 min-w-0">
                <div className="truncate font-semibold text-fg">{it.resultLabel}</div>
                <div className="truncate text-xs text-fg-muted">
                  {it.pageTitle} · {formatRelative(it.timestamp)}
                  {it.summary ? ` · ${it.summary}` : ""}
                </div>
              </div>
              <button
                type="button"
                aria-label="이 기록 삭제"
                onClick={() => {
                  removeHistoryItem(it.id);
                  setItems(loadHistory());
                }}
                className="rounded-md p-1 text-fg-subtle transition hover:bg-white/60 hover:text-red-500"
              >
                <X size={14} strokeWidth={2.25} aria-hidden />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => {
              clearHistory();
              setItems([]);
            }}
            className="w-full rounded-lg border border-white/60 bg-white/40 py-1.5 text-xs text-fg-muted transition hover:bg-white/70"
          >
            전체 기록 삭제
          </button>
        </div>
      )}
    </GlassCard>
  );
}
