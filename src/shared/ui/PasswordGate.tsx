import { useState, useEffect, type ReactNode } from "react";
import { Lock, ArrowRight } from "lucide-react";

// ─── 비밀번호 여기서 변경 ────────────────────────────────────────────
const PASSWORD = "0000";
// ────────────────────────────────────────────────────────────────────

const SESSION_KEY = "gender_reveal_auth";

interface Props {
  children: ReactNode;
}

export function PasswordGate({ children }: Props) {
  const [authed, setAuthed] = useState<boolean | null>(null); // null = 로딩 중
  const [input, setInput] = useState("");
  const [shake, setShake] = useState(false);
  const [error, setError] = useState(false);

  // 세션 스토리지에서 인증 상태 복원 (페이지 이동 시 유지, 탭 닫으면 초기화)
  useEffect(() => {
    const ok = sessionStorage.getItem(SESSION_KEY) === "1";
    setAuthed(ok);
  }, []);

  if (authed === null) return null; // 하이드레이션 전 깜빡임 방지
  if (authed) return <>{children}</>;

  function tryUnlock() {
    if (input === PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, "1");
      setAuthed(true);
    } else {
      setError(true);
      setShake(true);
      setInput("");
      setTimeout(() => setShake(false), 500);
      setTimeout(() => setError(false), 2000);
    }
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter") tryUnlock();
  }

  return (
    <div className="app-bg flex min-h-screen items-center justify-center px-4">
      <div
        className={[
          "glass-strong w-full max-w-xs rounded-3xl p-8 text-center",
          shake ? "animate-shake" : "",
        ].join(" ")}
      >
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/70 shadow-sm ring-1 ring-white/60">
          <Lock size={24} strokeWidth={2.25} className="text-brand-600" aria-hidden />
        </div>

        <h1 className="text-lg font-bold text-fg">비공개 미리보기</h1>
        <p className="mt-1 text-sm text-fg-muted">비밀번호를 입력해주세요</p>

        <div className="relative mt-6">
          <input
            type="password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            autoFocus
            placeholder="••••"
            className={[
              "w-full rounded-xl border bg-white/70 py-3 pl-4 pr-12 text-center text-lg tracking-[0.5em] text-fg outline-none backdrop-blur transition",
              error
                ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                : "border-white/60 focus:border-brand-400 focus:ring-2 focus:ring-brand-200/50",
            ].join(" ")}
          />
          <button
            type="button"
            onClick={tryUnlock}
            aria-label="확인"
            className="absolute inset-y-0 right-0 flex items-center justify-center px-4 text-fg-subtle transition hover:text-brand-600"
          >
            <ArrowRight size={20} strokeWidth={2.25} aria-hidden />
          </button>
        </div>

        {error && (
          <p className="mt-3 text-xs text-red-500">비밀번호가 올바르지 않습니다</p>
        )}
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%       { transform: translateX(-8px); }
          40%       { transform: translateX(8px); }
          60%       { transform: translateX(-6px); }
          80%       { transform: translateX(6px); }
        }
        .animate-shake { animation: shake 0.45s ease-in-out; }
      `}</style>
    </div>
  );
}
