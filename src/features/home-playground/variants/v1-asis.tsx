// @ts-nocheck — Claude Design 에서 받아온 프로토타입. 런타임만 정상 동작하면 OK.
// V1 — AS-IS: 현재 프로덕션 디자인 재현
// 파스텔 블루 그라데이션 + glassmorphism card + pretendard

import type { CSSProperties } from "react";

export const V1_Home = () => {
  const bg: CSSProperties = {
    width: '100%', height: '100%',
    background: 'linear-gradient(160deg, hsl(230 45% 86%) 0%, hsl(230 18% 96%) 100%)',
    position: 'relative', overflow: 'hidden',
    fontFamily: '"Pretendard Variable", Pretendard, -apple-system, sans-serif',
    letterSpacing: '-0.015em',
    color: 'hsl(230 20% 13%)',
  };
  const blob1: CSSProperties = {
    position: 'absolute', width: 360, height: 360,
    top: -100, left: -80, borderRadius: '50%',
    background: 'hsl(230 45% 86%)', filter: 'blur(60px)', opacity: 0.35,
  };
  const blob2: CSSProperties = {
    position: 'absolute', width: 300, height: 300,
    bottom: -60, right: -60, borderRadius: '50%',
    background: 'hsl(230 45% 80%)', filter: 'blur(60px)', opacity: 0.35,
  };
  const nav: CSSProperties = {
    position: 'relative', zIndex: 2,
    margin: '16px 16px 0',
    background: 'rgba(255,255,255,0.55)',
    backdropFilter: 'blur(16px) saturate(150%)',
    WebkitBackdropFilter: 'blur(16px) saturate(150%)',
    border: '1px solid rgba(255,255,255,0.7)',
    borderRadius: 16, height: 52,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '0 12px',
    boxShadow: '0 2px 8px rgba(40,55,90,0.07), 0 12px 32px rgba(40,55,90,0.11)',
  };
  const pillActive: CSSProperties = {
    display: 'inline-flex', alignItems: 'center', gap: 6,
    height: 34, padding: '0 14px', borderRadius: 999,
    background: 'hsl(230 54% 36%)', color: '#fff',
    fontSize: 13, fontWeight: 500,
  };
  const pill: CSSProperties = {
    display: 'inline-flex', alignItems: 'center', gap: 6,
    height: 34, padding: '0 12px', borderRadius: 999,
    color: 'hsl(230 12% 42%)', fontSize: 13, fontWeight: 500,
  };
  const card: CSSProperties = {
    background: 'rgba(255,255,255,0.55)',
    backdropFilter: 'blur(16px) saturate(150%)',
    WebkitBackdropFilter: 'blur(16px) saturate(150%)',
    border: '1px solid rgba(255,255,255,0.7)',
    borderRadius: 16, padding: 20,
    display: 'flex', gap: 14, alignItems: 'flex-start',
    boxShadow: '0 2px 8px rgba(40,55,90,0.07), 0 12px 32px rgba(40,55,90,0.11)',
  };
  const iconBox: CSSProperties = {
    width: 40, height: 40, borderRadius: 12,
    background: 'rgba(255,255,255,0.8)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  };
  return (
    <div style={bg}>
      <div style={blob1} />
      <div style={blob2} />
      <nav style={nav}>
        <div style={{ display: 'flex', gap: 4 }}>
          <span style={pillActive}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            홈
          </span>
          <span style={pill}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.582a.5.5 0 0 1 0 .962L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/></svg>
            AI
          </span>
          <span style={pill}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
            플래너
          </span>
        </div>
        <span style={{ ...pill, paddingRight: 10 }}>
          전체
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M6 9l6 6 6-6"/></svg>
        </span>
      </nav>

      <main style={{ position: 'relative', zIndex: 2, padding: '48px 28px 0' }}>
        <p style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'hsl(230 54% 36% / 0.7)', margin: 0 }}>
          Gender Reveal
        </p>
        <h1 style={{ fontSize: 24, fontWeight: 600, letterSpacing: '-0.02em', margin: '10px 0 14px', lineHeight: 1.3 }}>
          어떻게 시작할까요?
        </h1>
        <p style={{ fontSize: 13, lineHeight: 1.9, color: 'hsl(230 12% 42%)', margin: 0 }}>
          두 가지 방식 중 하나를 선택하세요. 개별 예측법은 상단 <strong style={{ fontWeight: 500, color: 'hsl(230 20% 13%)' }}>전체</strong> 메뉴에서 바로 이용할 수 있습니다.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 40 }}>
          <div style={card}>
            <div style={iconBox}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="hsl(230 54% 36%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.582a.5.5 0 0 1 0 .962L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/></svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 600 }}>AI 예측</span>
                <span style={{ fontSize: 10, color: 'hsl(230 8% 58%)' }}>17가지 방법 종합</span>
              </div>
              <p style={{ fontSize: 12, lineHeight: 1.55, color: 'hsl(230 12% 42%)', margin: '6px 0 0' }}>
                고대 달력부터 현대 수비학까지, 서로 다른 관점을 AI가 조합해 성별을 판별합니다.
              </p>
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="hsl(230 8% 58% / 0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: 4 }}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </div>

          <div style={card}>
            <div style={iconBox}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="hsl(230 54% 36%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 600 }}>플래너</span>
                <span style={{ fontSize: 10, color: 'hsl(230 8% 58%)' }}>원하는 성별 역추천</span>
              </div>
              <p style={{ fontSize: 12, lineHeight: 1.55, color: 'hsl(230 12% 42%)', margin: '6px 0 0' }}>
                원하는 성별을 먼저 정하면 유리한 시기·방위·라이프스타일을 역으로 제안합니다.
              </p>
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="hsl(230 8% 58% / 0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: 4 }}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </div>
        </div>

        <p style={{ textAlign: 'center', fontSize: 11, color: 'hsl(230 8% 58%)', marginTop: 40 }}>
          처음이라면 AI 예측을 추천드립니다
        </p>
      </main>
    </div>
  );
};

