// @ts-nocheck — Claude Design 에서 받아온 프로토타입. 런타임만 정상 동작하면 OK.
// V3 — Editorial Magazine
// 세리프 타이포그래피, 크고 과감한 숫자, 좌우 비대칭 레이아웃
// 페이퍼 텍스처 배경. 흑백에 가까운 팔레트 + 1가지 잉크 레드 포인트

import Link from "next/link";
import type { CSSProperties } from "react";

export const V3_Home = () => {
  const bg: CSSProperties = {
    width: '100%', height: '100%',
    background: '#f5f1ea',
    position: 'relative', overflow: 'hidden',
    fontFamily: '"Pretendard Variable", Pretendard, sans-serif',
    color: '#1a1713',
    letterSpacing: '-0.01em',
  };
  const serif = '"Cormorant Garamond", "Noto Serif KR", Georgia, serif';

  // paper grain
  const grain: CSSProperties = {
    position: 'absolute', inset: 0,
    backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.65'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E\")",
    mixBlendMode: 'multiply', opacity: 0.08, pointerEvents: 'none',
  };

  const ink = '#c23a2a';

  const topBar: CSSProperties = {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    borderBottom: '1px solid #1a1713',
    padding: '14px 20px', position: 'relative', zIndex: 2,
    fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase',
  };

  const navRow: CSSProperties = {
    display: 'flex', gap: 18, alignItems: 'center',
    padding: '14px 20px',
    borderBottom: '1px solid rgba(26,23,19,0.15)',
    fontSize: 12, fontWeight: 500, position: 'relative', zIndex: 2,
  };

  const navLink = (active) => ({
    paddingBottom: 4,
    borderBottom: active ? `2px solid ${ink}` : '2px solid transparent',
    color: active ? ink : '#1a1713',
    fontWeight: active ? 600 : 400,
  });

  const rule = (h = 1) => ({ height: h, background: '#1a1713', margin: '0 20px' });

  return (
    <div style={bg}>
      <div style={grain} />

      {/* Masthead */}
      <div style={topBar}>
        <span style={{ fontWeight: 600 }}>No. 01 / 2026</span>
        <span style={{ fontWeight: 600, color: ink }}>◆ GR EDITORIAL ◆</span>
        <span>Seoul · KR</span>
      </div>

      <div style={{ padding: '8px 20px 20px', position: 'relative', zIndex: 2 }}>
        <h1 style={{
          fontFamily: serif, fontWeight: 500, fontStyle: 'italic',
          fontSize: 44, lineHeight: 0.9, letterSpacing: '-0.03em',
          margin: 0, textAlign: 'center',
        }}>
          Gender<br/>
          <span style={{ fontStyle: 'normal', fontWeight: 400 }}>REVEAL</span>
        </h1>
      </div>

      <div style={rule(2)} />
      <div style={{ ...rule(1), marginTop: 3 }} />

      {/* Nav */}
      <div style={navRow}>
        <span style={navLink(true)}>HOME</span>
        <span style={navLink(false)}>AI</span>
        <span style={navLink(false)}>PLANNER</span>
        <span style={{ flex: 1 }} />
        <span style={{ fontSize: 11, color: '#7a6d5e' }}>INDEX ↓</span>
      </div>

      {/* Hero feature */}
      <div style={{ padding: '28px 20px 0', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <span style={{ fontFamily: serif, fontSize: 64, fontWeight: 400, lineHeight: 0.85, color: ink, fontStyle: 'italic' }}>17</span>
          <div style={{ flex: 1, paddingTop: 6 }}>
            <p style={{ fontSize: 9, letterSpacing: '0.26em', textTransform: 'uppercase', color: '#7a6d5e', margin: 0 }}>
              Methods of divination
            </p>
            <p style={{ fontFamily: serif, fontSize: 16, lineHeight: 1.3, margin: '6px 0 0', fontStyle: 'italic' }}>
              고대부터 현대까지,<br/>검증된 모든 관점들.
            </p>
          </div>
        </div>
      </div>

      <div style={{ ...rule(1), marginTop: 22, opacity: 0.4 }} />

      {/* Feature 1 — AI */}
      <Link href="/playground/v3/ai" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
      <article style={{ padding: '22px 20px 0', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#7a6d5e' }}>CH. I — Algorithmic</span>
          <span style={{ fontFamily: serif, fontSize: 18, fontStyle: 'italic', color: ink }}>01</span>
        </div>
        <h2 style={{ fontFamily: serif, fontSize: 28, lineHeight: 1.1, fontWeight: 500, margin: 0, letterSpacing: '-0.02em' }}>
          AI <span style={{ fontStyle: 'italic' }}>예측</span>
        </h2>
        <p style={{ fontSize: 12, lineHeight: 1.65, color: '#3a3228', margin: '10px 0 0', columnCount: 1 }}>
          고대 달력부터 현대 수비학까지, 서로 다른 관점을 AI가 조합해 하나의 판단을 내립니다.
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 14 }}>
          <span style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: ink, fontWeight: 600 }}>Read on</span>
          <span style={{ flex: 1, height: 1, background: ink }} />
          <span style={{ color: ink, fontSize: 16 }}>→</span>
        </div>
      </article>
      </Link>

      <div style={{ ...rule(1), marginTop: 22, opacity: 0.4 }} />

      {/* Feature 2 — Planner */}
      <Link href="/playground/v3/planner" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
      <article style={{ padding: '22px 20px 0', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#7a6d5e' }}>CH. II — Reverse</span>
          <span style={{ fontFamily: serif, fontSize: 18, fontStyle: 'italic', color: ink }}>02</span>
        </div>
        <h2 style={{ fontFamily: serif, fontSize: 28, lineHeight: 1.1, fontWeight: 500, margin: 0, letterSpacing: '-0.02em' }}>
          <span style={{ fontStyle: 'italic' }}>성별</span> 플래너
        </h2>
        <p style={{ fontSize: 12, lineHeight: 1.65, color: '#3a3228', margin: '10px 0 0' }}>
          원하는 성별을 먼저 정하면 유리한 시기·방위·라이프스타일을 역으로 제안합니다.
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 14 }}>
          <span style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: ink, fontWeight: 600 }}>Read on</span>
          <span style={{ flex: 1, height: 1, background: ink }} />
          <span style={{ color: ink, fontSize: 16 }}>→</span>
        </div>
      </article>
      </Link>

      {/* Footer pull quote */}
      <div style={{ position: 'absolute', bottom: 24, left: 20, right: 20, zIndex: 2 }}>
        <div style={{ ...rule(1), margin: 0, opacity: 0.3 }} />
        <p style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 13, textAlign: 'center', margin: '14px 0 0', color: '#3a3228' }}>
          “처음이라면 <span style={{ color: ink }}>AI 예측</span>을 추천드립니다.”
        </p>
      </div>
    </div>
  );
};

