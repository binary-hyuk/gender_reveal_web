/**
 * localStorage 기반 예측 히스토리 저장소.
 * 페이지 · 결과 요약 · 타임스탬프만 저장하여 네비게이션/복기 용도로만 사용.
 */

const STORAGE_KEY = "prediction-history:v1";
const MAX_ITEMS = 10;

export interface PredictionHistoryEntry {
  id: string;                 // uuid 비슷한 고유 식별자
  page: "ai" | "planner" | string; // 확장 가능
  pageTitle: string;          // "AI 성별 예측" 등
  resultEmoji: string;        // "👦" | "👧" | "🎯"
  resultLabel: string;        // "아들이에요" | "딸 맞춤 가이드" 등
  summary?: string;           // 옵션 부가 설명 (예: "2025-02-10 ~ 2025-02-15")
  timestamp: number;          // Date.now()
}

function genId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function loadHistory(): PredictionHistoryEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((x): x is PredictionHistoryEntry =>
      typeof x === "object" && x !== null && "id" in x && "timestamp" in x,
    );
  } catch {
    return [];
  }
}

export function addHistory(entry: Omit<PredictionHistoryEntry, "id" | "timestamp">): PredictionHistoryEntry {
  const full: PredictionHistoryEntry = { ...entry, id: genId(), timestamp: Date.now() };
  try {
    const list = loadHistory();
    const next = [full, ...list].slice(0, MAX_ITEMS);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // 무시
  }
  return full;
}

export function clearHistory(): void {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // 무시
  }
}

export function removeHistoryItem(id: string): void {
  try {
    const list = loadHistory().filter((x) => x.id !== id);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    // 무시
  }
}
