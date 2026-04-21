// @ts-nocheck — Claude Design 에서 받아온 프로토타입. 런타임만 정상 동작하면 OK.
// V4 — Aurora Playful
// 애니메이션 오로라 메쉬 그라데이션 + 둥실거리는 별 파티클
// 다크 우주 배경 + 네온 글로우 카드. 즐거운 느낌, 인스타 스토리 스타일

import Link from "next/link";
import type { CSSProperties } from "react";

export const V4_Home = () => {
  const bg: CSSProperties = {
    width: '100%', height: '100%',
    background: '#0a0820',
    position: 'relative', overflow: 'hidden',
    fontFamily: '"Pretendard Variable", Pretendard, sans-serif',
    letterSpacing: '-0.015em',
    color: '#fff',
  };

  // keyframes via inline style tag
  const keyframes = `
    @keyframes v4float { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(20px,-30px) scale(1.08); } }
    @keyframes v4float2 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-30px,20px) scale(1.12); } }
    @keyframes v4float3 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(15px,25px) scale(0.95); } }
    @keyframes v4twinkle { 0%,100% { opacity: 0.3; } 50% { opacity: 1; } }
    @keyframes v4shine { 0% { background-position: -200% 50%; } 100% { background-position: 200% 50%; } }
  `;

  const aurora = (c, w, h, t, l, delay, anim) => ({
    position: 'absolute', width: w, height: h,
    top: t, left: l, borderRadius: '50%',
    background: `radial-gradient(circle, ${c} 0%, transparent 70%)`,
    filter: 'blur(40px)',
    animation: `${anim} 8s ease-in-out infinite`,
    animationDelay: `${delay}s`,
  });

  const star = (top, left, size, delay) => ({
    position: 'absolute', top, left, width: size, height: size,
    borderRadius: '50%', background: '#fff',
    boxShadow: `0 0 ${size * 3}px #fff`,
    animation: 'v4twinkle 3s ease-in-out infinite',
    animationDelay: `${delay}s`,
  });

  const navGlass: CSSProperties = {
    position: 'relative', zIndex: 3,
    margin: '16px 16px 0',
    background: 'rgba(255,255,255,0.06)',
    backdropFilter: 'blur(20px) saturate(150%)',
    WebkitBackdropFilter: 'blur(20px) saturate(150%)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 999, height: 52,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '0 8px',
  };

  const pillActive: CSSProperties = {
    display: 'inline-flex', alignItems: 'center', gap: 6,
    height: 38, padding: '0 14px', borderRadius: 999,
    background: 'linear-gradient(135deg, #ff8fbe, #8a6aff)',
    color: '#fff', fontSize: 13, fontWeight: 600,
    boxShadow: '0 0 20px rgba(170,100,255,0.5)',
  };
  const pill: CSSProperties = {
    display: 'inline-flex', alignItems: 'center', gap: 6,
    height: 38, padding: '0 12px', borderRadius: 999,
    color: 'rgba(255,255,255,0.6)', fontSize: 13, fontWeight: 500,
  };

  const card = (grad, glow) => ({
    position: 'relative',
    background: 'rgba(255,255,255,0.04)',
    backdropFilter: 'blur(24px)',
    WebkitBackdropFilter: 'blur(24px)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 24, padding: 22,
    overflow: 'hidden',
    boxShadow: `0 0 40px ${glow}30, 0 20px 48px rgba(0,0,0,0.4)`,
  });

  const cardAura = (grad) => ({
    position: 'absolute', inset: -1,
    background: grad, opacity: 0.12,
    pointerEvents: 'none',
  });

  return (
    <div style={bg}>
      <style>{keyframes}</style>

      {/* aurora orbs */}
      <div style={aurora('#ff6ab0', 380, 380, -100, -80, 0, 'v4float')} />
      <div style={aurora('#6a8aff', 340, 340, 180, 180, 1.5, 'v4float2')} />
      <div style={aurora('#b86aff', 300, 300, 450, -60, 3, 'v4float3')} />
      <div style={aurora('#ffb86a', 260, 260, 600, 160, 2, 'v4float')} />

      {/* stars */}
      <div style={star(60, 40, 2, 0)} />
      <div style={star(100, 320, 3, 1.2)} />
      <div style={star(180, 80, 2, 0.6)} />
      <div style={star(240, 290, 2, 2.1)} />
      <div style={star(420, 50, 3, 1.8)} />
      <div style={star(480, 320, 2, 0.3)} />
      <div style={star(560, 150, 2, 1.5)} />
      <div style={star(680, 50, 2, 2.8)} />
      <div style={star(720, 310, 3, 0.9)} />

      <nav style={navGlass}>
        <div style={{ display: 'flex', gap: 2 }}>
          <span style={pillActive}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            홈
          </span>
          <span style={pill}>✦ AI</span>
          <span style={pill}>◎ 플래너</span>
        </div>
        <span style={{ ...pill, paddingRight: 10 }}>
          전체
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M6 9l6 6 6-6"/></svg>
        </span>
      </nav>

      <main style={{ position: 'relative', zIndex: 2, padding: '42px 24px 0' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.05)' }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ff8fbe', boxShadow: '0 0 10px #ff8fbe' }} />
          <span style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)' }}>Gender Reveal</span>
        </div>

        <h1 style={{
          fontSize: 36, fontWeight: 700, letterSpacing: '-0.03em',
          margin: '14px 0 14px', lineHeight: 1.1,
          background: 'linear-gradient(90deg, #ff8fbe 0%, #b08aff 50%, #6ac4ff 100%)',
          backgroundSize: '200% auto',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          animation: 'v4shine 4s linear infinite',
        }}>
          별이 알려주는<br/>성별 이야기
        </h1>
        <p style={{ fontSize: 13, lineHeight: 1.7, color: 'rgba(255,255,255,0.65)', margin: 0 }}>
          두 가지 여정 중 하나를 골라<br/>우주의 힌트를 받아보세요.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 36 }}>
          <Link href="/playground/v4/ai" style={{ ...card('', '#a478ff'), textDecoration: 'none', color: 'inherit' }}>
            <div style={cardAura('linear-gradient(135deg, #ff8fbe, #a478ff)')} />
            <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', position: 'relative' }}>
              <div style={{
                width: 52, height: 52, borderRadius: 16,
                background: 'linear-gradient(135deg, #ff8fbe, #a478ff)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 24px rgba(170,120,255,0.6)',
                flexShrink: 0,
              }}>
                <span style={{ fontSize: 24 }}>✨</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 16, fontWeight: 700 }}>AI 예측</span>
                  <span style={{ fontSize: 10, fontWeight: 600, color: '#ff8fbe', padding: '2px 8px', borderRadius: 10, background: 'rgba(255,143,190,0.12)', border: '1px solid rgba(255,143,190,0.3)' }}>17 METHODS</span>
                </div>
                <p style={{ fontSize: 12, lineHeight: 1.55, color: 'rgba(255,255,255,0.65)', margin: '6px 0 0' }}>
                  고대 달력부터 현대 수비학까지. AI가 모든 관점을 종합합니다.
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 12, fontSize: 11, fontWeight: 600, color: '#ff8fbe' }}>
                  시작하기 <span style={{ fontSize: 14 }}>→</span>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/playground/v4/planner" style={{ ...card('', '#6ac4ff'), textDecoration: 'none', color: 'inherit' }}>
            <div style={cardAura('linear-gradient(135deg, #6ac4ff, #8a6aff)')} />
            <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', position: 'relative' }}>
              <div style={{
                width: 52, height: 52, borderRadius: 16,
                background: 'linear-gradient(135deg, #6ac4ff, #8a6aff)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 24px rgba(106,196,255,0.6)',
                flexShrink: 0,
              }}>
                <span style={{ fontSize: 24 }}>🎯</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 16, fontWeight: 700 }}>플래너</span>
                  <span style={{ fontSize: 10, fontWeight: 600, color: '#6ac4ff', padding: '2px 8px', borderRadius: 10, background: 'rgba(106,196,255,0.12)', border: '1px solid rgba(106,196,255,0.3)' }}>REVERSE</span>
                </div>
                <p style={{ fontSize: 12, lineHeight: 1.55, color: 'rgba(255,255,255,0.65)', margin: '6px 0 0' }}>
                  원하는 성별을 먼저 정하면 유리한 시기·방위를 역으로 제안합니다.
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 12, fontSize: 11, fontWeight: 600, color: '#6ac4ff' }}>
                  시작하기 <span style={{ fontSize: 14 }}>→</span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        <p style={{ textAlign: 'center', fontSize: 11, color: 'rgba(255,255,255,0.45)', marginTop: 32 }}>
          ✦ &nbsp; 처음이라면 AI 예측을 추천드립니다 &nbsp; ✦
        </p>
      </main>
    </div>
  );
};

