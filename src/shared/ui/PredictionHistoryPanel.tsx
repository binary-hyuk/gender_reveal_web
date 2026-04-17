import { useEffect, useState } from "react";
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

/**
 * 최근 예측 히스토리 패널. AI/Planner 결과 페이지 또는 폼 하단에 접힌 채로 배치.
 * 페이지 이동 후 마운트 시 로컬 목록을 불러와 표시.
 */
export function PredictionHistoryPanel() {
  const [items, setItems] = useState<PredictionHistoryEntry[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setItems(loadHistory());
  }, []);

  if (items.length === 0) return null;

  return (
    <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-5 py-3 text-left"
        aria-expanded={open}
      >
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
          🕘 최근 예측 <span className="ml-1 text-gray-500 normal-case">({items.length})</span>
        </span>
        <span className="text-xs text-gray-400">{open ? "접기 ▲" : "펼치기 ▼"}</span>
      </button>

      {open && (
        <div className="space-y-2 border-t border-gray-100 px-5 py-3">
          {items.map((it) => (
            <div
              key={it.id}
              className="flex items-center gap-3 rounded-xl bg-gray-50 px-3 py-2 text-sm"
            >
              <span className="text-2xl">{it.resultEmoji}</span>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-gray-800 truncate">{it.resultLabel}</div>
                <div className="text-xs text-gray-500 truncate">
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
                className="text-xs text-gray-300 hover:text-red-400"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => {
              clearHistory();
              setItems([]);
            }}
            className="w-full rounded-lg border border-gray-200 py-1.5 text-xs text-gray-500 hover:bg-gray-50"
          >
            전체 기록 삭제
          </button>
        </div>
      )}
    </div>
  );
}
