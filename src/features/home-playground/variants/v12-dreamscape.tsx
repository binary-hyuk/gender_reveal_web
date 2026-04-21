// @ts-nocheck — Claude Design 에서 받아온 프로토타입. 런타임만 정상 동작하면 OK.
// V12 — Soft Serif Dreamscape
// 따뜻한 파우더 핑크 + 크림 + 그라데이션 구체(gradient orb)
// 부드러운 세리프 + sans 조합, 마치 에디토리얼 앱 같은 분위기
// 자체 판단 — 가장 우아하고 이모셔널한 방향

import Link from "next/link";
import type { CSSProperties } from "react";

export const V12_Home = () => {
  const bg: CSSProperties = {
    width: '100%', height: '100%',
    background: 'linear-gradient(180deg, #fff4eb 0%, #ffeef0 45%, #f5ecff 100%)',
    position: 'relative', overflow: 'hidden',
    fontFamily: '"Pretendard Variable", Pretendard, sans-serif',
    color: '#2a1f2e',
    letterSpacing: '-0.01em',
  };
  const serif = '"Cormorant Garamond", "Noto Serif KR", Georgia, serif';
  const rose = '#d85577';
  const peach = '#ff9a7a';
  const lav = '#a07aff';

  // Big soft gradient orb (hero visual)
  const orb: CSSProperties = {
    position: 'absolute',
    top: 72, right: -40,
    width: 240, height: 240, borderRadius: '50%',
    background: `conic-gradient(from 220deg at 50% 50%, ${peach}, ${rose}, ${lav}, ${peach})`,
    filter: 'blur(2px)',
    opacity: 0.9,
  };
  const orbShadow: CSSProperties = {
    position: 'absolute',
    top: 92, right: -60,
    width: 240, height: 240, borderRadius: '50%',
    background: `radial-gradient(circle, ${rose}40 0%, transparent 60%)`,
    filter: 'blur(30px)',
  };

  const keyframes = `
    @keyframes v12orb { 0%,100% { transform: rotate(0deg) scale(1); } 50% { transform: rotate(180deg) scale(1.05); } }
    @keyframes v12dot { 0%,100% { opacity: .4; transform: scale(.8); } 50% { opacity: 1; transform: scale(1); } }
  `;

  const topbar: CSSProperties = {
    position: 'relative', zIndex: 3,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '16px 20px',
  };

  return (
    <div style={bg}>
      <style>{keyframes}</style>

      {/* Hero orb */}
      <div style={{ ...orb, animation: 'v12orb 20s linear infinite' }} />
      <div style={orbShadow} />

      {/* Grain texture */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.75'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
        mixBlendMode: 'multiply', opacity: 0.08, pointerEvents: 'none',
      }} />

      {/* Top */}
      <div style={topbar}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 24, height: 24, borderRadius: '50%',
            background: `conic-gradient(from 0deg, ${peach}, ${rose}, ${lav}, ${peach})`,
          }} />
          <span style={{ fontFamily: serif, fontSize: 17, fontWeight: 500, fontStyle: 'italic' }}>Reveal</span>
        </div>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          <span style={{ fontSize: 11, color: '#6a5f6e' }}>홈</span>
          <span style={{ fontSize: 11, color: '#a89aa8' }}>전체</span>
        </div>
      </div>

      {/* Hero */}
      <main style={{ padding: '56px 22px 0', position: 'relative', zIndex: 2 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase',
          color: rose, fontWeight: 600,
        }}>
          <span style={{ width: 14, height: 1, background: rose }} />
          A gentle forecast
        </div>

        <h1 style={{
          fontFamily: serif, fontWeight: 400,
          fontSize: 42, lineHeight: 1.05, letterSpacing: '-0.02em',
          margin: '14px 0 0',
          color: '#2a1f2e',
        }}>
          작은 생명의<br/>
          <span style={{ fontStyle: 'italic', background: `linear-gradient(135deg, ${rose}, ${lav})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>첫 인사</span>,<br/>
          함께 들어볼까요?
        </h1>
        <p style={{ fontSize: 13, lineHeight: 1.7, color: '#5a4a5e', margin: '18px 0 0', maxWidth: 260 }}>
          17가지 고전과 현대의 이야기를 AI가 한 목소리로 정리해드려요.
        </p>

        {/* CTA primary */}
        <Link href="/ai" style={{
          marginTop: 28,
          position: 'relative',
          borderRadius: 24,
          padding: '2px',
          background: `linear-gradient(135deg, ${peach}, ${rose}, ${lav})`,
          textDecoration: 'none', color: 'inherit', display: 'block',
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: 22,
            padding: 18,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 44, height: 44, borderRadius: '50%',
                background: `conic-gradient(from 0deg, ${peach}, ${rose}, ${lav}, ${peach})`,
                position: 'relative',
              }}>
                <div style={{
                  position: 'absolute', inset: 8, borderRadius: '50%',
                  background: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 16,
                }}>✧</div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <span style={{ fontFamily: serif, fontSize: 19, fontWeight: 500, fontStyle: 'italic' }}>AI 종합 예측</span>
                </div>
                <div style={{ fontSize: 11, color: '#8a7a8e', marginTop: 2 }}>
                  17가지 관점 한 번에 · 추천
                </div>
              </div>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: `linear-gradient(135deg, ${rose}, ${lav})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 8px 20px ${rose}40`,
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </div>
            </div>
          </div>
        </Link>

        {/* Planner — secondary */}
        <Link href="/planner" style={{
          marginTop: 14,
          padding: '16px 18px',
          borderRadius: 22,
          background: 'rgba(255,255,255,0.55)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          border: '1px solid rgba(255,255,255,0.8)',
          display: 'flex', alignItems: 'center', gap: 12,
          textDecoration: 'none', color: 'inherit',
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            border: `1.5px solid ${lav}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{ width: 18, height: 18, borderRadius: '50%', border: `1.5px solid ${lav}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: lav }} />
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: serif, fontSize: 16, fontWeight: 500, fontStyle: 'italic' }}>플래너</div>
            <div style={{ fontSize: 11, color: '#8a7a8e', marginTop: 1 }}>
              원하는 성별로 시작 · 시기를 역으로
            </div>
          </div>
          <span style={{ color: '#a89aa8', fontSize: 14 }}>→</span>
        </Link>

        {/* Tiny dot indicator line */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 26 }}>
          {[0, 1, 2].map((i) => (
            <span key={i} style={{
              width: 5, height: 5, borderRadius: '50%',
              background: rose,
              animation: `v12dot 1.8s ease-in-out ${i * 0.3}s infinite`,
            }} />
          ))}
        </div>

        <p style={{
          fontFamily: serif, fontStyle: 'italic',
          textAlign: 'center', fontSize: 13,
          color: '#6a5f6e', margin: '12px 0 0',
        }}>
          “당신의 궁금증에 살며시 답해드릴게요.”
        </p>
      </main>
    </div>
  );
};

