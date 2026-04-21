// @ts-nocheck — 테마 inline style 이 variant 별 문자열 값이라 타입 우회
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { VARIANT_MAP } from "@/features/home-playground";
import { useAiPredictor } from "@/features/ai-predict";
import { VariantSpinner } from "./VariantSpinner";

interface Props {
  slug: string;
}

/**
 * 각 시안 테마를 배경·폰트·악센트에 적용한 "AI 예측" 실제 기능 페이지.
 * 기존 useAiPredictor 훅을 재사용해 실제 예측 로직은 그대로 동작하되,
 * 폼/결과 UI 는 variant 테마에 맞게 간소화 렌더.
 * localStorage 덕에 /ai 에서 입력한 값은 이 페이지에서도 이어짐.
 */
export function VariantAiPage({ slug }: Props) {
  const meta = VARIANT_MAP[slug];
  if (!meta) {
    return <div style={{ padding: 20 }}>존재하지 않는 variant: {slug}</div>;
  }

  const t = meta.theme;
  const {
    motherBirthDate, fatherBirthDate, conceptionStart, conceptionEnd,
    isLoading, result, error,
    setMotherBirthDate, setFatherBirthDate, setConceptionStart, setConceptionEnd,
    predict, reset,
  } = useAiPredictor();

  const pageStyle = {
    minHeight: "100vh",
    background: t.bg,
    color: t.text,
    fontFamily: t.font,
    paddingBottom: 80,
  } as const;

  const cardStyle = {
    background: t.cardBg,
    border: `1px solid ${t.cardBorder}`,
    borderRadius: 16,
    padding: 20,
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
  } as const;

  const inputStyle = {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 10,
    border: `1px solid ${t.cardBorder}`,
    background: t.dark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.7)",
    color: t.text,
    fontFamily: t.font,
    fontSize: 14,
    outline: "none",
  } as const;

  return (
    <div style={pageStyle}>
      {/* 헤더 */}
      <header
        style={{
          position: "sticky", top: 0, zIndex: 10,
          padding: "14px 18px",
          background: t.dark ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.5)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderBottom: `1px solid ${t.cardBorder}`,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}
      >
        <Link
          href={`/playground/${slug}`}
          style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            fontSize: 12, color: t.textMuted, textDecoration: "none",
          }}
        >
          <ArrowLeft size={14} strokeWidth={2.25} />
          {meta.title}
        </Link>
        <span style={{ fontSize: 11, color: t.textMuted }}>AI 예측</span>
      </header>

      <main style={{ maxWidth: 420, margin: "0 auto", padding: "28px 18px 0" }}>
        {/* Hero */}
        <div style={{ marginBottom: 22 }}>
          <p
            style={{
              fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase",
              color: t.accent, margin: 0, fontWeight: 600,
            }}
          >
            Gender Reveal · AI
          </p>
          <h1
            style={{
              fontFamily: t.fontSerif ?? t.font,
              fontSize: 26, fontWeight: t.fontSerif ? 500 : 600, margin: "8px 0 0",
              lineHeight: 1.25, letterSpacing: "-0.02em",
              color: t.text,
            }}
          >
            17가지 방법을 한 번에
          </h1>
          <p style={{ fontSize: 13, color: t.textMuted, margin: "10px 0 0", lineHeight: 1.65 }}>
            부모 생년월일과 임신 추정 기간만 입력하면 기본 8개 예측법이 자동 실행됩니다.
          </p>
        </div>

        {/* 입력 폼 — 결과·로딩 중엔 숨김 */}
        {!result && !isLoading && (
          <div style={{ ...cardStyle, display: "flex", flexDirection: "column", gap: 14 }}>
            <Field label="엄마 생년월일 (YYYY-MM-DD)" value={motherBirthDate} onChange={setMotherBirthDate} style={inputStyle} placeholder="1994-03-12" t={t} />
            <Field label="아빠 생년월일 (YYYY-MM-DD)" value={fatherBirthDate} onChange={setFatherBirthDate} style={inputStyle} placeholder="1992-07-22" t={t} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <Field label="임신 시작일" value={conceptionStart} onChange={setConceptionStart} style={inputStyle} placeholder="2026-01-15" t={t} />
              <Field label="임신 종료일 (선택)" value={conceptionEnd} onChange={setConceptionEnd} style={inputStyle} placeholder="2026-01-21" t={t} />
            </div>

            {error && (
              <p
                style={{
                  margin: 0, padding: "10px 12px", borderRadius: 10,
                  background: "rgba(255,90,90,0.12)",
                  color: t.dark ? "#ffa0a0" : "#c92a2a",
                  fontSize: 12,
                }}
              >
                {error}
              </p>
            )}

            <button
              type="button"
              onClick={predict}
              disabled={isLoading}
              style={{
                width: "100%", padding: "14px 18px", borderRadius: 12,
                background: t.accent, color: t.accentOn,
                border: "none", cursor: "pointer",
                fontSize: 15, fontWeight: 600, fontFamily: t.font,
                display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
                opacity: isLoading ? 0.6 : 1,
              }}
            >
              <Sparkles size={16} strokeWidth={2.25} />
              {isLoading ? "AI 계산 중…" : "AI 예측 시작"}
            </button>

            <p style={{ fontSize: 11, color: t.textMuted, textAlign: "center", margin: 0 }}>
              {meta.title} 디자인으로 실행됩니다
            </p>
          </div>
        )}

        {/* 로딩 상태 — variant 테마 스피너 */}
        {isLoading && (
          <div style={{ ...cardStyle, marginTop: 14, padding: 8 }}>
            <VariantSpinner slug={slug} label="17가지 알고리즘을 조합하고 있어요…" />
          </div>
        )}

        {/* 결과 */}
        {result && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ ...cardStyle, textAlign: "center", padding: 32 }}>
              <p
                style={{
                  fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase",
                  color: t.textMuted, margin: 0,
                }}
              >
                AI Final Prediction
              </p>
              <div style={{ fontSize: 64, margin: "14px 0 8px" }}>
                {result.finalGender === "Boy" ? "👦" : "👧"}
              </div>
              <h2
                style={{
                  fontFamily: t.fontSerif ?? t.font,
                  fontSize: 28, fontWeight: t.fontSerif ? 500 : 700, margin: 0,
                  color: t.accent,
                }}
              >
                {result.finalGender === "Boy" ? "아들이에요" : "딸이에요"}
              </h2>
              <p style={{ fontSize: 12, color: t.textMuted, margin: "14px 0 0" }}>
                아들 {result.boyScore}점 · 딸 {result.girlScore}점
              </p>
            </div>

            <div style={cardStyle}>
              <p
                style={{
                  fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase",
                  color: t.textMuted, margin: "0 0 12px", fontWeight: 600,
                }}
              >
                방법별 예측
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {result.methods.map((m) => (
                  <div
                    key={m.key}
                    style={{
                      display: "flex", alignItems: "flex-start", gap: 10,
                      padding: "8px 10px", borderRadius: 10,
                      background: t.dark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.45)",
                      opacity: m.available ? 1 : 0.4,
                    }}
                  >
                    <span style={{ fontSize: 16 }}>{m.emoji}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                        <span style={{ fontSize: 13, fontWeight: 600, color: t.text }}>
                          {m.name}
                        </span>
                        {m.available && (
                          <span style={{ fontSize: 11, color: t.textMuted }}>
                            → {m.gender === "Boy" ? "아들" : "딸"}
                          </span>
                        )}
                      </div>
                      <p style={{ fontSize: 11, color: t.textMuted, margin: "2px 0 0", lineHeight: 1.5 }}>
                        {m.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={reset}
              style={{
                width: "100%", padding: "12px 16px", borderRadius: 12,
                background: "transparent", color: t.text,
                border: `1px solid ${t.cardBorder}`, cursor: "pointer",
                fontSize: 13, fontWeight: 500, fontFamily: t.font,
              }}
            >
              다시 예측하기
            </button>

            <p style={{ fontSize: 11, color: t.textMuted, textAlign: "center", margin: 0 }}>
              * 전통 예측법의 가중치 합산 결과입니다. 재미로만 참고하세요.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

function Field({
  label, value, onChange, style, placeholder, t,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  style: React.CSSProperties;
  placeholder?: string;
  t: { textMuted: string };
}) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span style={{ fontSize: 11, color: t.textMuted, fontWeight: 600, letterSpacing: "0.02em" }}>
        {label}
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={style}
      />
    </label>
  );
}
