// @ts-nocheck — 테마 inline style 이 variant 별 문자열 값이라 타입 우회
import Link from "next/link";
import { ArrowLeft, Target } from "lucide-react";
import { VARIANT_MAP } from "@/features/home-playground";
import { usePlannerPredictor } from "@/features/planner-predict";

interface Props {
  slug: string;
}

/**
 * 각 시안 테마의 "플래너" 실제 기능 페이지.
 * 엄마 생년월일 + 원하는 성별만 입력 받고 buildRecommendations 로 추천 결과 생성.
 */
export function VariantPlannerPage({ slug }: Props) {
  const meta = VARIANT_MAP[slug];
  if (!meta) return <div style={{ padding: 20 }}>존재하지 않는 variant: {slug}</div>;

  const t = meta.theme;
  const {
    motherBirthDate, target, result, error,
    setMotherBirthDate, setTarget, predict, reset,
  } = usePlannerPredictor();

  const pageStyle = {
    minHeight: "100vh",
    background: t.bg, color: t.text,
    fontFamily: t.font, paddingBottom: 80,
  } as const;

  const cardStyle = {
    background: t.cardBg,
    border: `1px solid ${t.cardBorder}`,
    borderRadius: 16, padding: 20,
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
  } as const;

  const inputStyle = {
    width: "100%", padding: "10px 12px",
    borderRadius: 10,
    border: `1px solid ${t.cardBorder}`,
    background: t.dark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.7)",
    color: t.text, fontFamily: t.font,
    fontSize: 14, outline: "none",
  } as const;

  const targetBtn = (isActive: boolean) => ({
    flex: 1, padding: "18px 10px", borderRadius: 14,
    cursor: "pointer", fontSize: 14, fontWeight: 600,
    fontFamily: t.font,
    background: isActive ? t.accent : (t.dark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.5)"),
    color: isActive ? t.accentOn : t.text,
    border: `1px solid ${isActive ? t.accent : t.cardBorder}`,
    display: "flex", flexDirection: "column" as const, alignItems: "center", gap: 4,
  });

  return (
    <div style={pageStyle}>
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
        <Link href={`/playground/${slug}`} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: t.textMuted, textDecoration: "none" }}>
          <ArrowLeft size={14} strokeWidth={2.25} />
          {meta.title}
        </Link>
        <span style={{ fontSize: 11, color: t.textMuted }}>플래너 · 역방향</span>
      </header>

      <main style={{ maxWidth: 420, margin: "0 auto", padding: "28px 18px 0" }}>
        <div style={{ marginBottom: 22 }}>
          <p style={{ fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", color: t.accent, margin: 0, fontWeight: 600 }}>
            Planner · Reverse
          </p>
          <h1 style={{ fontFamily: t.fontSerif ?? t.font, fontSize: 26, fontWeight: t.fontSerif ? 500 : 600, margin: "8px 0 0", lineHeight: 1.25, letterSpacing: "-0.02em", color: t.text }}>
            원하는 성별을 정하면<br/>시기와 환경을 제안합니다
          </h1>
        </div>

        {!result && (
          <div style={{ ...cardStyle, display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <p style={{ fontSize: 11, color: t.textMuted, fontWeight: 600, margin: "0 0 10px" }}>원하는 아이 성별</p>
              <div style={{ display: "flex", gap: 10 }}>
                <button type="button" onClick={() => setTarget("Boy")} style={targetBtn(target === "Boy")}>
                  <span style={{ fontSize: 28 }}>👦</span>
                  아들
                </button>
                <button type="button" onClick={() => setTarget("Girl")} style={targetBtn(target === "Girl")}>
                  <span style={{ fontSize: 28 }}>👧</span>
                  딸
                </button>
              </div>
            </div>

            <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={{ fontSize: 11, color: t.textMuted, fontWeight: 600 }}>엄마 생년월일 (YYYY-MM-DD)</span>
              <input type="text" value={motherBirthDate} onChange={(e) => setMotherBirthDate(e.target.value)} placeholder="1994-03-12" style={inputStyle} />
            </label>

            {error && (
              <p style={{ margin: 0, padding: "10px 12px", borderRadius: 10, background: "rgba(255,90,90,0.12)", color: t.dark ? "#ffa0a0" : "#c92a2a", fontSize: 12 }}>
                {error}
              </p>
            )}

            <button
              type="button"
              onClick={predict}
              style={{
                width: "100%", padding: "14px 18px", borderRadius: 12,
                background: t.accent, color: t.accentOn,
                border: "none", cursor: "pointer",
                fontSize: 15, fontWeight: 600, fontFamily: t.font,
                display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
              }}
            >
              <Target size={16} strokeWidth={2.25} />
              {target === "Boy" ? "아들" : "딸"} 맞춤 가이드 받기
            </button>

            <p style={{ fontSize: 11, color: t.textMuted, textAlign: "center", margin: 0 }}>
              {meta.title} 디자인으로 실행됩니다
            </p>
          </div>
        )}

        {result && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ ...cardStyle, textAlign: "center", padding: 28 }}>
              <div style={{ fontSize: 56 }}>{result.target === "Boy" ? "👦" : "👧"}</div>
              <h2 style={{ fontFamily: t.fontSerif ?? t.font, fontSize: 24, fontWeight: t.fontSerif ? 500 : 700, margin: "12px 0 0", color: t.accent }}>
                {result.target === "Boy" ? "아들" : "딸"} 맞춤 가이드
              </h2>
            </div>

            <div style={cardStyle}>
              <p style={{ fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: t.textMuted, margin: "0 0 10px", fontWeight: 600 }}>
                추천 거사 시기 Top 5
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {result.topMonths.slice(0, 5).map((m, i) => (
                  <div key={m.yearMonth} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderRadius: 10, background: t.dark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.45)" }}>
                    <span style={{ minWidth: 22, height: 22, borderRadius: "50%", background: t.accent, color: t.accentOn, fontSize: 11, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                      {i + 1}
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>{m.label}</div>
                      {m.supportingAlgorithms.length > 0 && (
                        <div style={{ fontSize: 11, color: t.textMuted, marginTop: 2 }}>
                          {m.supportingAlgorithms.slice(0, 3).join(" · ")}
                        </div>
                      )}
                    </div>
                    <span style={{ fontSize: 11, color: t.textMuted }}>
                      {m.targetScore}/{m.maxScore}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div style={cardStyle}>
              <p style={{ fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: t.textMuted, margin: "0 0 10px", fontWeight: 600 }}>
                행운의 숫자 · 이모티콘
              </p>
              <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                {result.luckyNumbers.map((n) => (
                  <div key={n} style={{ width: 32, height: 32, borderRadius: "50%", background: t.accent, color: t.accentOn, display: "inline-flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>
                    {n}
                  </div>
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
                {result.luckyEmojis.map((e) => (
                  <div key={e} style={{ aspectRatio: "1", background: t.dark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.45)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>
                    {e}
                  </div>
                ))}
              </div>
            </div>

            <div style={cardStyle}>
              <p style={{ fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: t.textMuted, margin: "0 0 10px", fontWeight: 600 }}>
                관심사 · 라이프스타일
              </p>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
                {[...result.interests, ...result.lifestyleTips].map((x, i) => (
                  <li key={i} style={{ fontSize: 13, color: t.text, lineHeight: 1.55 }}>{x}</li>
                ))}
              </ul>
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
              다시 추천받기
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
