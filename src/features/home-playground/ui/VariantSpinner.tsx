// @ts-nocheck — 테마 기반 inline style 다량 사용
import { VARIANT_MAP, type VariantTheme } from "@/features/home-playground";

/**
 * 시안 테마에 맞는 로딩 스피너. AI/플래너 예측 대기 시간 동안 표시.
 * 12개 시안 전부 개별 구현 대신:
 * - 특색 5개(V4 오로라, V6 뉴럴, V8 제미나이 스파크, V11 터미널, V12 드림스케이프)
 *   는 각자의 모티브에 맞게 커스텀
 * - 나머지 7개는 공용 ring 스피너 + accent 컬러
 */

interface Props {
  slug: string;
  label?: string;
}

const SPINNER_KEYFRAMES = `
@keyframes vspin { to { transform: rotate(360deg); } }
@keyframes vpulse { 0%, 100% { opacity: 0.35; transform: scale(0.7); } 50% { opacity: 1; transform: scale(1.1); } }
@keyframes vblink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0.15; } }
@keyframes vstar { 0%, 100% { opacity: 0.2; transform: scale(0.7); } 50% { opacity: 1; transform: scale(1.3); } }
@keyframes vdot { 0%, 80%, 100% { opacity: 0.2; transform: translateY(0); } 40% { opacity: 1; transform: translateY(-4px); } }
@keyframes vconic { to { transform: rotate(360deg); } }
@keyframes vbar { 0%, 100% { transform: scaleY(0.4); } 50% { transform: scaleY(1); } }
@keyframes vswirl { 0% { transform: rotate(0deg) scale(1); } 50% { transform: rotate(180deg) scale(1.1); } 100% { transform: rotate(360deg) scale(1); } }
`;

const Keyframes = () => <style dangerouslySetInnerHTML={{ __html: SPINNER_KEYFRAMES }} />;

export function VariantSpinner({ slug, label }: Props) {
  const meta = VARIANT_MAP[slug];
  if (!meta) return null;
  const t = meta.theme;

  switch (slug) {
    case "v4":  return <AuroraSpinner t={t} label={label} />;
    case "v6":  return <NeuralSpinner t={t} label={label} />;
    case "v8":  return <GeminiSpinner t={t} label={label} />;
    case "v11": return <TerminalSpinner t={t} label={label} />;
    case "v12": return <DreamscapeSpinner t={t} label={label} />;
    default:    return <DefaultSpinner t={t} label={label} />;
  }
}

/* ─────────── 공용 Default (V1, V2, V3, V5, V7, V9, V10) ─────────── */
function DefaultSpinner({ t, label }: { t: VariantTheme; label?: string }) {
  return (
    <div style={containerStyle}>
      <Keyframes />
      <div
        style={{
          width: 44, height: 44, borderRadius: "50%",
          border: `3px solid ${t.cardBorder}`,
          borderTopColor: t.accent,
          animation: "vspin 0.9s linear infinite",
        }}
      />
      {label && <LabelText t={t}>{label}</LabelText>}
    </div>
  );
}

/* ─────────── V4 · Aurora (다크 우주 + 별빛 파티클) ─────────── */
function AuroraSpinner({ t, label }: { t: VariantTheme; label?: string }) {
  const stars = [
    { top: "30%", left: "30%", size: 5, delay: "0s" },
    { top: "20%", left: "55%", size: 3, delay: "0.3s" },
    { top: "55%", left: "25%", size: 4, delay: "0.6s" },
    { top: "60%", left: "60%", size: 6, delay: "0.15s" },
    { top: "40%", left: "75%", size: 3, delay: "0.9s" },
  ];
  return (
    <div style={containerStyle}>
      <Keyframes />
      <div style={{ position: "relative", width: 88, height: 88 }}>
        {/* 오로라 스위프 링 */}
        <div
          style={{
            position: "absolute", inset: 0, borderRadius: "50%",
            background: "conic-gradient(from 0deg, transparent, #ff8fbe, #a478ff, #6ac4ff, transparent)",
            animation: "vconic 1.6s linear infinite",
            filter: "blur(8px)",
            opacity: 0.6,
          }}
        />
        {/* 내부 다크 원 */}
        <div
          style={{
            position: "absolute", inset: 6, borderRadius: "50%",
            background: "#0a0518",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          {/* 별들 */}
          {stars.map((s, i) => (
            <span
              key={i}
              style={{
                position: "absolute",
                top: s.top, left: s.left,
                width: s.size, height: s.size,
                borderRadius: "50%",
                background: "#fff",
                boxShadow: `0 0 ${s.size * 2}px #fff`,
                animation: `vstar 1.8s ease-in-out ${s.delay} infinite`,
              }}
            />
          ))}
        </div>
      </div>
      {label && <LabelText t={t}>{label}</LabelText>}
    </div>
  );
}

/* ─────────── V6 · Neural (pulsing bars) ─────────── */
function NeuralSpinner({ t, label }: { t: VariantTheme; label?: string }) {
  return (
    <div style={containerStyle}>
      <Keyframes />
      <div style={{ display: "flex", alignItems: "center", gap: 6, height: 36 }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            style={{
              width: 4, height: 28,
              background: t.accent,
              borderRadius: 2,
              transformOrigin: "center",
              animation: `vbar 0.9s ease-in-out ${i * 0.12}s infinite`,
              boxShadow: `0 0 8px ${t.accent}`,
            }}
          />
        ))}
      </div>
      <p style={{ ...labelStyle(t), fontFamily: t.fontMono ?? t.font, letterSpacing: "0.15em", textTransform: "uppercase" as const, fontSize: 10 }}>
        {label ?? "INFERENCE RUNNING..."}
      </p>
    </div>
  );
}

/* ─────────── V8 · Gemini (4색 spark) ─────────── */
function GeminiSpinner({ t, label }: { t: VariantTheme; label?: string }) {
  const colors = ["#4285f4", "#ea4335", "#fbbc04", "#34a853"];
  return (
    <div style={containerStyle}>
      <Keyframes />
      <div style={{ position: "relative", width: 56, height: 56 }}>
        {colors.map((c, i) => (
          <span
            key={c}
            style={{
              position: "absolute",
              inset: 0,
              margin: "auto",
              width: 20, height: 20,
              borderRadius: "50%",
              background: c,
              filter: "blur(2px)",
              opacity: 0.85,
              transformOrigin: "50% 28px",
              transform: `rotate(${i * 90}deg) translate(-14px, 0)`,
              animation: `vpulse 1.4s ease-in-out ${i * 0.15}s infinite`,
            }}
          />
        ))}
        {/* 중앙 흰 원 */}
        <span
          style={{
            position: "absolute", inset: 0, margin: "auto",
            width: 14, height: 14, borderRadius: "50%",
            background: "#fff",
            animation: "vpulse 1.4s ease-in-out infinite",
          }}
        />
      </div>
      {label && <LabelText t={t}>{label}</LabelText>}
    </div>
  );
}

/* ─────────── V11 · Terminal (blinking cursor + progress) ─────────── */
function TerminalSpinner({ t, label }: { t: VariantTheme; label?: string }) {
  return (
    <div style={{ ...containerStyle, fontFamily: t.fontMono ?? t.font }}>
      <Keyframes />
      <div
        style={{
          width: 260, maxWidth: "90%",
          border: `1px solid ${t.cardBorder}`,
          borderRadius: 10,
          background: t.cardBg,
          padding: "14px 16px",
          fontFamily: t.fontMono ?? t.font,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: t.text }}>
          <span style={{ color: t.accent }}>$</span>
          <span style={{ flex: 1 }}>
            reveal <span style={{ color: "#c678dd" }}>--infer</span>
            <span style={{
              display: "inline-block", width: 7, height: 12, marginLeft: 2,
              background: t.accent, verticalAlign: "middle",
              animation: "vblink 1s steps(2) infinite",
            }} />
          </span>
        </div>
        <div style={{ marginTop: 10, height: 3, background: "#21242b", borderRadius: 2, overflow: "hidden" }}>
          <div
            style={{
              height: "100%", width: "40%",
              background: `linear-gradient(90deg, transparent, ${t.accent}, transparent)`,
              animation: "vspin 1.2s linear infinite",
              transformOrigin: "center",
            }}
          />
        </div>
        <p style={{ margin: "8px 0 0", fontSize: 10, color: t.textMuted }}>
          {label ?? "analyzing 17 methods..."}
        </p>
      </div>
    </div>
  );
}

/* ─────────── V12 · Dreamscape (세리프 + conic orb) ─────────── */
function DreamscapeSpinner({ t, label }: { t: VariantTheme; label?: string }) {
  return (
    <div style={containerStyle}>
      <Keyframes />
      <div
        style={{
          width: 64, height: 64, borderRadius: "50%",
          background: "conic-gradient(from 0deg, #ffc9d4, #d48aa8, #b08bd4, #8fb5e0, #ffc9d4)",
          animation: "vconic 2.2s linear infinite",
          position: "relative",
          boxShadow: "0 8px 28px rgba(212,138,168,0.35)",
        }}
      >
        <div style={{
          position: "absolute", inset: 10, borderRadius: "50%",
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(12px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 20, color: t.accent,
        }}>
          ✧
        </div>
      </div>
      <p style={{ ...labelStyle(t), fontFamily: t.fontSerif ?? t.font, fontStyle: "italic" as const, fontSize: 14 }}>
        {label ?? "곰곰이 생각 중…"}
      </p>
    </div>
  );
}

/* ─────────── 공용 유틸 ─────────── */
const containerStyle = {
  display: "flex", flexDirection: "column" as const,
  alignItems: "center", justifyContent: "center",
  gap: 16, padding: "40px 20px",
};

const labelStyle = (t: VariantTheme) => ({
  fontSize: 12, color: t.textMuted, margin: 0, textAlign: "center" as const, lineHeight: 1.6,
});

function LabelText({ t, children }: { t: VariantTheme; children: React.ReactNode }) {
  return <p style={labelStyle(t)}>{children}</p>;
}
