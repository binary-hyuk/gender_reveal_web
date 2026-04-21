// @ts-nocheck — Claude Design 에서 받아온 프로토타입. 런타임만 정상 동작하면 OK.
// V5 — Minimal Dark Mystic
// 딥 네이비 + 골드 + 얇은 라인. 점성술/타로 카드 스타일
// 극도의 미니멀, 타이포 중심, 고급스러운 카드

import type { CSSProperties } from "react";

export const V5_Home = () => {
  const bg: CSSProperties = {
    width: '100%', height: '100%',
    background: 'radial-gradient(ellipse at top, #1a1a3a 0%, #0a0a1e 60%, #050510 100%)',
    position: 'relative', overflow: 'hidden',
    fontFamily: '"Pretendard Variable", Pretendard, sans-serif',
    color: '#f4e8c8',
    letterSpacing: '-0.01em',
  };
  const gold = '#d4b871';
  const goldSoft = 'rgba(212,184,113,0.5)';
  const serif = '"Cormorant Garamond", "Noto Serif KR", Georgia, serif';

  // constellation stars (fixed positions)
  const stars = [
    [30, 50, 1.5, 0.6], [80, 120, 1, 0.4], [140, 60, 2, 0.8],
    [210, 90, 1, 0.5], [280, 40, 1.5, 0.7], [320, 130, 1, 0.3],
    [50, 200, 1, 0.4], [170, 220, 1.5, 0.6], [260, 190, 1, 0.5],
    [40, 380, 1, 0.3], [150, 400, 1.5, 0.7], [300, 370, 1, 0.4],
    [60, 540, 1, 0.5], [180, 560, 1, 0.3], [280, 540, 1.5, 0.6],
    [40, 680, 1, 0.4], [200, 700, 1, 0.3], [320, 690, 1, 0.5],
  ];

  const hairline = { height: 1, background: `linear-gradient(90deg, transparent, ${goldSoft}, transparent)`, margin: '0 20px' };

  const navRow: CSSProperties = {
    position: 'relative', zIndex: 3,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '18px 24px',
  };
  const navLink = (active) => ({
    fontSize: 11, letterSpacing: '0.26em', textTransform: 'uppercase',
    color: active ? gold : 'rgba(244,232,200,0.4)',
    fontWeight: active ? 500 : 400,
    position: 'relative',
    paddingBottom: 4,
    borderBottom: active ? `1px solid ${gold}` : '1px solid transparent',
  });

  const card: CSSProperties = {
    position: 'relative',
    border: `1px solid ${goldSoft}`,
    borderRadius: 2,
    padding: '28px 22px',
    background: 'linear-gradient(180deg, rgba(212,184,113,0.06) 0%, rgba(212,184,113,0.01) 100%)',
  };

  const corner = (pos) => ({
    position: 'absolute', width: 12, height: 12,
    borderColor: gold,
    ...(pos === 'tl' && { top: -1, left: -1, borderTop: `1px solid ${gold}`, borderLeft: `1px solid ${gold}` }),
    ...(pos === 'tr' && { top: -1, right: -1, borderTop: `1px solid ${gold}`, borderRight: `1px solid ${gold}` }),
    ...(pos === 'bl' && { bottom: -1, left: -1, borderBottom: `1px solid ${gold}`, borderLeft: `1px solid ${gold}` }),
    ...(pos === 'br' && { bottom: -1, right: -1, borderBottom: `1px solid ${gold}`, borderRight: `1px solid ${gold}` }),
  });

  return (
    <div style={bg}>
      {/* Stars */}
      {stars.map(([l, t, s, o], i) => (
        <div key={i} style={{
          position: 'absolute', left: l, top: t, width: s, height: s,
          borderRadius: '50%', background: '#fff', opacity: o,
          boxShadow: `0 0 ${s * 2}px rgba(255,255,255,${o})`,
        }} />
      ))}

      {/* Moon glow */}
      <div style={{
        position: 'absolute', top: -60, right: -60, width: 240, height: 240,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(212,184,113,0.15) 0%, transparent 70%)',
        filter: 'blur(20px)',
      }} />

      {/* Nav */}
      <div style={navRow}>
        <span style={{ fontFamily: serif, fontSize: 16, fontWeight: 500, fontStyle: 'italic', color: gold, letterSpacing: 0 }}>
          G · R
        </span>
        <div style={{ display: 'flex', gap: 22 }}>
          <span style={navLink(true)}>Home</span>
          <span style={navLink(false)}>AI</span>
          <span style={navLink(false)}>Planner</span>
        </div>
      </div>

      <div style={hairline} />

      {/* Hero */}
      <div style={{ padding: '48px 24px 0', position: 'relative', zIndex: 2, textAlign: 'center' }}>
        {/* ornament */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 20 }}>
          <span style={{ width: 40, height: 1, background: goldSoft }} />
          <svg width="14" height="14" viewBox="0 0 24 24" fill={gold}><polygon points="12,2 13.5,10 22,12 13.5,14 12,22 10.5,14 2,12 10.5,10"/></svg>
          <span style={{ width: 40, height: 1, background: goldSoft }} />
        </div>

        <p style={{ fontSize: 9, letterSpacing: '0.4em', textTransform: 'uppercase', color: goldSoft, margin: 0 }}>
          Gender · Reveal
        </p>
        <h1 style={{
          fontFamily: serif, fontWeight: 400, fontStyle: 'italic',
          fontSize: 44, lineHeight: 1.05, letterSpacing: '-0.01em',
          margin: '16px 0 0',
          background: `linear-gradient(180deg, ${gold} 0%, #8a7040 100%)`,
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>
          운명의<br/>두 갈래 길
        </h1>
        <p style={{ fontSize: 11, lineHeight: 1.9, color: 'rgba(244,232,200,0.55)', margin: '22px 0 0', maxWidth: 260, marginLeft: 'auto', marginRight: 'auto' }}>
          당신이 마주할 길을 선택하세요.<br/>별과 고대의 지혜가 안내합니다.
        </p>
      </div>

      {/* Two tarot-like cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, padding: '42px 24px 0', position: 'relative', zIndex: 2 }}>
        <div style={card}>
          <span style={corner('tl')} /><span style={corner('tr')} />
          <span style={corner('bl')} /><span style={corner('br')} />

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 10, letterSpacing: '0.3em', color: goldSoft, marginBottom: 4 }}>I</div>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1" style={{ margin: '4px auto' }}>
              <path d="M12 2v20M2 12h20M4 4l16 16M20 4L4 20"/>
            </svg>
            <div style={{ fontFamily: serif, fontSize: 18, fontStyle: 'italic', margin: '10px 0 6px', color: '#f4e8c8' }}>AI</div>
            <div style={{ fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: goldSoft }}>종합 예측</div>
            <p style={{ fontSize: 10, lineHeight: 1.7, color: 'rgba(244,232,200,0.5)', margin: '16px 0 0' }}>
              17가지 관점을<br/>하나의 해석으로
            </p>
          </div>
        </div>

        <div style={card}>
          <span style={corner('tl')} /><span style={corner('tr')} />
          <span style={corner('bl')} /><span style={corner('br')} />

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 10, letterSpacing: '0.3em', color: goldSoft, marginBottom: 4 }}>II</div>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1" style={{ margin: '4px auto' }}>
              <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2" fill={gold}/>
            </svg>
            <div style={{ fontFamily: serif, fontSize: 18, fontStyle: 'italic', margin: '10px 0 6px', color: '#f4e8c8' }}>Planner</div>
            <div style={{ fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: goldSoft }}>역방향 추천</div>
            <p style={{ fontSize: 10, lineHeight: 1.7, color: 'rgba(244,232,200,0.5)', margin: '16px 0 0' }}>
              원하는 성별로부터<br/>시기와 방위까지
            </p>
          </div>
        </div>
      </div>

      {/* CTA hint */}
      <div style={{ position: 'absolute', bottom: 36, left: 0, right: 0, textAlign: 'center', zIndex: 2 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 24, height: 1, background: goldSoft }} />
          <span style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: gold, fontWeight: 500 }}>
            Begin with AI
          </span>
          <span style={{ width: 24, height: 1, background: goldSoft }} />
        </div>
      </div>
    </div>
  );
};

