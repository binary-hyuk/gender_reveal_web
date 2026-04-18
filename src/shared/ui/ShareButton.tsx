import { useEffect, useRef, useState, type RefObject } from "react";
import { toPng } from "html-to-image";
import { Share2, Image as ImageIcon, Link as LinkIcon, Send } from "lucide-react";

interface Props {
  targetRef: RefObject<HTMLElement | null>;
  title: string;
  text: string;
  url?: string;
  filenamePrefix?: string;
}

type Feedback = { type: "success" | "error"; message: string } | null;

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
      setFeedback({ type: "success", message: "이미지를 저장했어요" });
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
      setFeedback({ type: "success", message: "링크를 복사했어요" });
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
      // 사용자 취소는 무시
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="결과 공유"
        aria-expanded={open}
        className="glass flex w-full items-center justify-center gap-2 rounded-2xl py-3 text-sm font-semibold text-fg transition hover:bg-white/70"
      >
        <Share2 size={16} strokeWidth={2.25} aria-hidden />
        공유하기
      </button>

      {open && (
        <div
          role="menu"
          className="glass-strong absolute bottom-full left-0 right-0 z-20 mb-2 space-y-1 rounded-2xl p-2"
        >
          <MenuItem icon={ImageIcon} label="이미지 저장" onClick={handleSaveImage} disabled={busy} />
          <MenuItem icon={LinkIcon} label="링크 복사" onClick={handleCopyUrl} disabled={busy} />
          {canNativeShare && (
            <MenuItem icon={Send} label="다른 앱으로 공유" onClick={handleNativeShare} disabled={busy} />
          )}
        </div>
      )}

      {feedback && (
        <p
          role="status"
          className={[
            "mt-2 rounded-xl px-3 py-2 text-center text-xs backdrop-blur",
            feedback.type === "success"
              ? "border border-emerald-200/60 bg-emerald-50/70 text-emerald-700"
              : "border border-red-200/60 bg-red-50/70 text-red-600",
          ].join(" ")}
        >
          {feedback.message}
        </p>
      )}
    </div>
  );
}

function MenuItem({
  icon: Icon,
  label,
  onClick,
  disabled,
}: {
  icon: typeof Share2;
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
      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-fg transition hover:bg-white/60 disabled:opacity-50"
    >
      <Icon size={16} strokeWidth={2.25} className="text-brand-600" aria-hidden />
      <span className="flex-1">{label}</span>
    </button>
  );
}
