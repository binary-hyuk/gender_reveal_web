import { useEffect, useRef, useState, type RefObject } from "react";
import { toPng } from "html-to-image";

interface Props {
  /** 캡처할 DOM 영역 ref. 이미지 저장에 사용. */
  targetRef: RefObject<HTMLElement | null>;
  /** Web Share API 에 넘길 title */
  title: string;
  /** Web Share API 에 넘길 text */
  text: string;
  /** 복사·공유할 URL (선택). 기본값은 현재 location.href */
  url?: string;
  /** 다운로드 파일명 prefix. 기본값은 'gender-prediction' */
  filenamePrefix?: string;
}

type Feedback = { type: "success" | "error"; message: string } | null;

/**
 * 결과 카드 영역을 PNG 로 캡처해서 저장하거나, URL 을 복사하거나,
 * 시스템 공유(지원 시) 할 수 있는 공용 버튼 컴포넌트.
 *
 * TODO: Kakao SDK 공유는 후속 작업 — NEXT_PUBLIC_KAKAO_APP_KEY 설정 후 추가 예정.
 */
export function ShareButton({
  targetRef,
  title,
  text,
  url,
  filenamePrefix = "gender-prediction",
}: Props) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [canNativeShare, setCanNativeShare] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCanNativeShare(typeof navigator !== "undefined" && typeof navigator.share === "function");
  }, []);

  // 외부 클릭 / ESC 로 메뉴 닫기
  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  // feedback 자동 소멸
  useEffect(() => {
    if (!feedback) return;
    const t = setTimeout(() => setFeedback(null), 2500);
    return () => clearTimeout(t);
  }, [feedback]);

  function resolvedUrl(): string {
    if (url) return url;
    if (typeof window !== "undefined") return window.location.href;
    return "";
  }

  async function handleSaveImage() {
    if (!targetRef.current) {
      setFeedback({ type: "error", message: "캡처할 영역을 찾지 못했어요." });
      return;
    }
    setBusy(true);
    try {
      const dataUrl = await toPng(targetRef.current, {
        pixelRatio: 2,
        cacheBust: true,
        backgroundColor: "#ffffff",
      });
      const link = document.createElement("a");
      const today = new Date().toISOString().slice(0, 10).replace(/-/g, "");
      link.download = `${filenamePrefix}-${today}.png`;
      link.href = dataUrl;
      link.click();
      setFeedback({ type: "success", message: "이미지를 저장했어요 📥" });
      setOpen(false);
    } catch {
      setFeedback({ type: "error", message: "이미지 생성에 실패했어요." });
    } finally {
      setBusy(false);
    }
  }

  async function handleCopyUrl() {
    try {
      await navigator.clipboard.writeText(resolvedUrl());
      setFeedback({ type: "success", message: "링크를 복사했어요 🔗" });
      setOpen(false);
    } catch {
      setFeedback({ type: "error", message: "링크 복사에 실패했어요." });
    }
  }

  async function handleNativeShare() {
    if (!canNativeShare) return;
    try {
      await navigator.share({ title, text, url: resolvedUrl() });
      setOpen(false);
    } catch {
      // 사용자가 취소한 경우 등은 조용히 무시
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="결과 공유"
        aria-expanded={open}
        className="w-full rounded-xl border border-purple-200 bg-purple-50 py-3 text-sm font-semibold text-purple-700 transition-colors hover:bg-purple-100"
      >
        📤 공유하기
      </button>

      {open && (
        <div
          role="menu"
          className="absolute bottom-full left-0 right-0 mb-2 z-20 space-y-1 rounded-2xl border border-gray-100 bg-white p-2 shadow-lg"
        >
          <MenuItem emoji="🖼️" label="이미지 저장" onClick={handleSaveImage} disabled={busy} />
          <MenuItem emoji="🔗" label="링크 복사" onClick={handleCopyUrl} disabled={busy} />
          {canNativeShare && (
            <MenuItem emoji="📤" label="다른 앱으로 공유" onClick={handleNativeShare} disabled={busy} />
          )}
          {/* TODO: Kakao SDK 공유는 후속 작업 — NEXT_PUBLIC_KAKAO_APP_KEY 설정 후 추가 */}
        </div>
      )}

      {feedback && (
        <p
          role="status"
          className={[
            "mt-2 rounded-lg px-3 py-2 text-center text-xs",
            feedback.type === "success"
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-600",
          ].join(" ")}
        >
          {feedback.message}
        </p>
      )}
    </div>
  );
}

function MenuItem({
  emoji,
  label,
  onClick,
  disabled,
}: {
  emoji: string;
  label: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="menuitem"
      onClick={onClick}
      disabled={disabled}
      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50"
    >
      <span className="text-base" aria-hidden="true">{emoji}</span>
      <span className="flex-1">{label}</span>
    </button>
  );
}
