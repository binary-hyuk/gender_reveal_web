// @ts-nocheck — Claude Design 에서 받아온 프로토타입. 런타임만 정상 동작하면 OK.
// V6 — AI Lab / Neural
// "AI가 일하는 공간" 느낌. 데이터 비주얼, 뉴럴 네트워크 그래프, 신뢰도 게이지
// 다크 + 시안 네온. 기술적이고 지적인 톤의 카피라이팅

import type { CSSProperties } from "react";

export const V6_Home = () => {
  const bg: CSSProperties = {
    width: '100%', height: '100%',
    background: '#0b1016',
    position: 'relative', overflow: 'hidden',
    fontFamily: '"Pretendard Variable", Pretendard, sans-serif',
    color: '#e4edf5',
    letterSpacing: '-0.01em',
  };
  const mono = '"JetBrains Mono", "SF Mono", ui-monospace, monospace';
  const cyan = '#4fd6ff';
  const green = '#6bff9e';

  // grid background
  const grid: CSSProperties = {
    position: 'absolute', inset: 0,
    backgroundImage: `linear-gradient(rgba(79,214,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(79,214,255,0.05) 1px, transparent 1px)`,
    backgroundSize: '24px 24px',
    maskImage: 'radial-gradient(ellipse at 50% 30%, #000 40%, transparent 80%)',
    WebkitMaskImage: 'radial-gradient(ellipse at 50% 30%, #000 40%, transparent 80%)',
  };

  // scanning line animation
  const keyframes = `
    @keyframes v6scan { 0% { transform: translateY(-40px); opacity: 0; } 50% { opacity: 1; } 100% { transform: translateY(280px); opacity: 0; } }
    @keyframes v6pulse { 0%,100% { opacity: 0.5; } 50% { opacity: 1; } }
    @keyframes v6ticker { 0%,30% { opacity: 0.3; } 50% { opacity: 1; } }
  `;

  const statusBar: CSSProperties = {
    position: 'relative', zIndex: 3,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '14px 20px',
    borderBottom: '1px solid rgba(79,214,255,0.12)',
    fontFamily: mono, fontSize: 10,
  };

  const navRow: CSSProperties = {
    position: 'relative', zIndex: 3,
    display: 'flex', gap: 4, padding: '10px 14px',
    borderBottom: '1px solid rgba(79,214,255,0.08)',
  };

  const tab = (active) => ({
    padding: '8px 14px', borderRadius: 6,
    fontSize: 12, fontWeight: 500,
    fontFamily: mono,
    color: active ? cyan : 'rgba(228,237,245,0.45)',
    background: active ? 'rgba(79,214,255,0.1)' : 'transparent',
    border: active ? '1px solid rgba(79,214,255,0.3)' : '1px solid transparent',
    display: 'inline-flex', alignItems: 'center', gap: 6,
  });

  const card: CSSProperties = {
    position: 'relative',
    border: '1px solid rgba(79,214,255,0.18)',
    borderRadius: 8,
    padding: 18,
    background: 'linear-gradient(180deg, rgba(79,214,255,0.05), rgba(79,214,255,0.01))',
  };

  return (
    <div style={bg}>
      <style>{keyframes}</style>
      <div style={grid} />

      {/* Status bar */}
      <div style={statusBar}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: green, animation: 'v6pulse 2s ease-in-out infinite' }} />
          <span style={{ color: green }}>MODEL · gr-17b</span>
        </div>
        <span style={{ color: 'rgba(228,237,245,0.4)' }}>17 METHODS · v2.6.1</span>
      </div>

      {/* Nav */}
      <div style={navRow}>
        <span style={tab(true)}>
          <span style={{ width: 5, height: 5, borderRadius: 2, background: cyan }} />
          home
        </span>
        <span style={tab(false)}>_/ai</span>
        <span style={tab(false)}>_/planner</span>
        <span style={{ flex: 1 }} />
        <span style={{ ...tab(false), fontSize: 11 }}>all <span style={{ opacity: 0.5 }}>↓</span></span>
      </div>

      {/* Hero */}
      <main style={{ position: 'relative', zIndex: 2, padding: '34px 24px 0' }}>
        <p style={{ fontFamily: mono, fontSize: 10, color: cyan, letterSpacing: '0.14em', margin: 0 }}>
          {'> initializing inference engine...'}
        </p>
        <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.03em', margin: '12px 0 14px', lineHeight: 1.15 }}>
          성별 예측을<br/>
          <span style={{ color: cyan }}>AI로 재구성</span>했습니다.
        </h1>
        <p style={{ fontSize: 13, lineHeight: 1.65, color: 'rgba(228,237,245,0.6)', margin: 0 }}>
          17가지 전통 알고리즘을 Transformer 기반 앙상블로 통합.
          확률 분포와 근거를 함께 출력합니다.
        </p>

        {/* Live metrics strip */}
        <div style={{ display: 'flex', gap: 10, marginTop: 20, fontFamily: mono, fontSize: 10 }}>
          <div style={{ flex: 1, padding: '10px 12px', background: 'rgba(79,214,255,0.05)', border: '1px solid rgba(79,214,255,0.12)', borderRadius: 6 }}>
            <div style={{ color: 'rgba(228,237,245,0.4)' }}>methods</div>
            <div style={{ color: cyan, fontSize: 18, fontWeight: 600, marginTop: 2 }}>17</div>
          </div>
          <div style={{ flex: 1, padding: '10px 12px', background: 'rgba(79,214,255,0.05)', border: '1px solid rgba(79,214,255,0.12)', borderRadius: 6 }}>
            <div style={{ color: 'rgba(228,237,245,0.4)' }}>ensemble</div>
            <div style={{ color: cyan, fontSize: 18, fontWeight: 600, marginTop: 2 }}>weighted</div>
          </div>
          <div style={{ flex: 1, padding: '10px 12px', background: 'rgba(107,255,158,0.05)', border: '1px solid rgba(107,255,158,0.15)', borderRadius: 6 }}>
            <div style={{ color: 'rgba(228,237,245,0.4)' }}>status</div>
            <div style={{ color: green, fontSize: 18, fontWeight: 600, marginTop: 2 }}>ready</div>
          </div>
        </div>

        {/* AI card with neural viz */}
        <div style={{ ...card, marginTop: 20 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
            <div>
              <div style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.2em', color: cyan, marginBottom: 6 }}>
                01 · INFERENCE
              </div>
              <div style={{ fontSize: 18, fontWeight: 700 }}>AI 예측</div>
              <div style={{ fontSize: 11, color: 'rgba(228,237,245,0.55)', marginTop: 4 }}>
                17개 신호를 벡터로 결합 · 확률적 판단
              </div>
            </div>
            {/* neural graph */}
            <svg width="70" height="60" viewBox="0 0 70 60">
              <g stroke="rgba(79,214,255,0.4)" strokeWidth="0.8" fill="none">
                <line x1="6" y1="10" x2="35" y2="20"/><line x1="6" y1="30" x2="35" y2="20"/>
                <line x1="6" y1="50" x2="35" y2="20"/><line x1="6" y1="10" x2="35" y2="40"/>
                <line x1="6" y1="30" x2="35" y2="40"/><line x1="6" y1="50" x2="35" y2="40"/>
                <line x1="35" y1="20" x2="64" y2="30"/><line x1="35" y1="40" x2="64" y2="30"/>
              </g>
              <g fill={cyan}>
                <circle cx="6" cy="10" r="2"/><circle cx="6" cy="30" r="2"/><circle cx="6" cy="50" r="2"/>
                <circle cx="35" cy="20" r="2.5"/><circle cx="35" cy="40" r="2.5"/>
                <circle cx="64" cy="30" r="3"/>
              </g>
            </svg>
          </div>
          {/* method tokens */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 14 }}>
            {['chinese', 'mayan', 'ohang', 'numerology', 'ayurveda', '+12'].map((t, i) => (
              <span key={i} style={{
                fontFamily: mono, fontSize: 9,
                padding: '3px 7px', borderRadius: 3,
                background: 'rgba(79,214,255,0.08)',
                color: i === 5 ? 'rgba(228,237,245,0.6)' : cyan,
                border: '1px solid rgba(79,214,255,0.15)',
              }}>{t}</span>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px dashed rgba(79,214,255,0.15)' }}>
            <span style={{ fontFamily: mono, fontSize: 10, color: 'rgba(228,237,245,0.5)' }}>~3s inference</span>
            <span style={{ fontFamily: mono, fontSize: 11, fontWeight: 600, color: cyan }}>run →</span>
          </div>
        </div>

        {/* Planner card — compact */}
        <div style={{ ...card, marginTop: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.2em', color: 'rgba(107,255,158,0.9)', marginBottom: 6 }}>
                02 · REVERSE
              </div>
              <div style={{ fontSize: 18, fontWeight: 700 }}>플래너</div>
              <div style={{ fontSize: 11, color: 'rgba(228,237,245,0.55)', marginTop: 4 }}>
                목표값 → 역추론 → 조건 제안
              </div>
            </div>
            <div style={{ fontFamily: mono, fontSize: 10, color: 'rgba(107,255,158,0.8)' }}>
              <div>y → x</div>
              <div style={{ marginTop: 2 }}>optimizer</div>
            </div>
          </div>
        </div>

        <p style={{ fontFamily: mono, fontSize: 10, textAlign: 'center', color: 'rgba(228,237,245,0.35)', marginTop: 22 }}>
          [ tip ] 첫 실행은 AI 예측을 권장합니다.
        </p>
      </main>
    </div>
  );
};

