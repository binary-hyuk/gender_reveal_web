// @ts-nocheck — Claude Design 에서 받아온 프로토타입. 런타임만 정상 동작하면 OK.
// V2 — Deep Glassmorphism
// 컬러풀한 메쉬 오브 배경 + 강한 블러 + 레이어드 투명 카드
// Apple Vision Pro / iOS 26 스타일

import Link from "next/link";
import type { CSSProperties } from "react";

export const V2_Home = () => {
  const bg: CSSProperties = {
    width: '100%', height: '100%',
    background: '#e8e4ff',
    position: 'relative', overflow: 'hidden',
    fontFamily: '"Pretendard Variable", Pretendard, -apple-system, sans-serif',
    letterSpacing: '-0.015em',
    color: '#1a1530',
  };
  // colorful blob orbs
  const orb = (c, w, h, t, l, op = 0.85) => ({
    position: 'absolute', width: w, height: h,
    top: t, left: l, borderRadius: '50%',
    background: c, filter: 'blur(60px)', opacity: op,
  });
  const navGlass: CSSProperties = {
    position: 'relative', zIndex: 3,
    margin: '16px 16px 0',
    background: 'rgba(255,255,255,0.3)',
    backdropFilter: 'blur(28px) saturate(180%)',
    WebkitBackdropFilter: 'blur(28px) saturate(180%)',
    border: '1px solid rgba(255,255,255,0.55)',
    borderRadius: 20, height: 52,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '0 10px',
    boxShadow: '0 1px 0 rgba(255,255,255,0.7) inset, 0 10px 40px rgba(60,40,140,0.15)',
  };
  const pillActive: CSSProperties = {
    display: 'inline-flex', alignItems: 'center', gap: 6,
    height: 36, padding: '0 14px', borderRadius: 999,
    background: 'linear-gradient(135deg, rgba(255,255,255,0.85), rgba(255,255,255,0.55))',
    color: '#4a2a8a', fontSize: 13, fontWeight: 600,
    boxShadow: '0 2px 8px rgba(80,40,160,0.12), 0 0 0 1px rgba(255,255,255,0.8) inset',
  };
  const pill: CSSProperties = {
    display: 'inline-flex', alignItems: 'center', gap: 6,
    height: 36, padding: '0 12px', borderRadius: 999,
    color: 'rgba(26,21,48,0.55)', fontSize: 13, fontWeight: 500,
  };

  // heavy glass card with color tint + inner highlight
  const card = (tint) => ({
    position: 'relative',
    background: `linear-gradient(135deg, ${tint}25 0%, rgba(255,255,255,0.15) 100%)`,
    backdropFilter: 'blur(24px) saturate(180%)',
    WebkitBackdropFilter: 'blur(24px) saturate(180%)',
    border: '1px solid rgba(255,255,255,0.5)',
    borderRadius: 22, padding: 22,
    display: 'flex', gap: 16, alignItems: 'flex-start',
    boxShadow: '0 1px 0 rgba(255,255,255,0.8) inset, 0 -1px 0 rgba(255,255,255,0.25) inset, 0 16px 48px rgba(60,30,140,0.14)',
    overflow: 'hidden',
  });
  const cardShine: CSSProperties = {
    position: 'absolute', top: 0, left: 0, right: 0, height: '50%',
    background: 'linear-gradient(180deg, rgba(255,255,255,0.35) 0%, transparent 100%)',
    pointerEvents: 'none',
  };
  const iconBox = (grad) => ({
    position: 'relative',
    width: 46, height: 46, borderRadius: 14,
    background: grad,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
    boxShadow: '0 6px 16px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.6)',
  });

  return (
    <div style={bg}>
      {/* colorful mesh orbs */}
      <div style={orb('#ff8fbe', 280, 280, -60, -60)} />
      <div style={orb('#8aa4ff', 320, 320, 120, 220)} />
      <div style={orb('#ffce6b', 240, 240, 340, -80, 0.7)} />
      <div style={orb('#b38aff', 260, 260, 520, 180, 0.75)} />
      <div style={orb('#7ce4d4', 200, 200, 600, -50, 0.6)} />

      {/* subtle grain */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")", mixBlendMode: 'overlay', opacity: 0.15, pointerEvents: 'none' }} />

      <nav style={navGlass}>
        <div style={{ display: 'flex', gap: 2 }}>
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

      <main style={{ position: 'relative', zIndex: 2, padding: '52px 24px 0' }}>
        <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(74,42,138,0.75)', margin: 0 }}>
          ⟡ Gender Reveal
        </p>
        <h1 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.025em', margin: '10px 0 14px', lineHeight: 1.2, background: 'linear-gradient(135deg, #2a1560 0%, #6a3aaa 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          어떻게<br/>시작할까요?
        </h1>
        <p style={{ fontSize: 13, lineHeight: 1.75, color: 'rgba(26,21,48,0.65)', margin: 0 }}>
          투명한 유리 너머로 펼쳐진<br/>두 가지 여정 중 하나를 선택하세요.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 38 }}>
          <Link href="/ai" style={{ ...card('#a478ff'), textDecoration: 'none', color: 'inherit' }}>
            <div style={cardShine} />
            <div style={iconBox('linear-gradient(135deg, #b38aff, #7a5aff)')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.582a.5.5 0 0 1 0 .962L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/></svg>
            </div>
            <div style={{ flex: 1, position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: '#2a1560' }}>AI 예측</span>
                <span style={{ fontSize: 10, fontWeight: 600, color: '#7a5aff', background: 'rgba(255,255,255,0.5)', padding: '3px 8px', borderRadius: 10 }}>17가지</span>
              </div>
              <p style={{ fontSize: 12, lineHeight: 1.55, color: 'rgba(26,21,48,0.7)', margin: '8px 0 0' }}>
                고대 달력부터 현대 수비학까지, 서로 다른 관점을 AI가 조합해 성별을 판별합니다.
              </p>
            </div>
          </Link>

          <Link href="/planner" style={{ ...card('#ff8fbe'), textDecoration: 'none', color: 'inherit' }}>
            <div style={cardShine} />
            <div style={iconBox('linear-gradient(135deg, #ff8fbe, #ff5a8a)')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
            </div>
            <div style={{ flex: 1, position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: '#2a1560' }}>플래너</span>
                <span style={{ fontSize: 10, fontWeight: 600, color: '#d83a78', background: 'rgba(255,255,255,0.5)', padding: '3px 8px', borderRadius: 10 }}>역추천</span>
              </div>
              <p style={{ fontSize: 12, lineHeight: 1.55, color: 'rgba(26,21,48,0.7)', margin: '8px 0 0' }}>
                원하는 성별을 먼저 정하면 유리한 시기·방위·라이프스타일을 역으로 제안합니다.
              </p>
            </div>
          </Link>
        </div>

        {/* floating hint chip */}
        <div style={{
          marginTop: 36, alignSelf: 'center', textAlign: 'center',
          display: 'inline-flex', gap: 6, alignItems: 'center',
          padding: '8px 14px', borderRadius: 999,
          background: 'rgba(255,255,255,0.45)',
          backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.7)',
          fontSize: 11, color: 'rgba(26,21,48,0.7)',
          margin: '32px auto 0',
          width: 'fit-content',
        }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#a478ff', boxShadow: '0 0 8px #a478ff' }} />
          처음이라면 AI 예측을 추천드립니다
        </div>
      </main>
    </div>
  );
};

