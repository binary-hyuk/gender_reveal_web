// @ts-nocheck — Claude Design 에서 받아온 프로토타입. 런타임만 정상 동작하면 OK.
// V9 — Claude-like
// 웜 톤 크림 배경, 세리프 헤드라인, 오렌지 코랄 악센트
// 서재/북 스타일, 인라인 꼬리표(tag), 아티팩트 느낌

import type { CSSProperties } from "react";

export const V9_Home = () => {
  const bg: CSSProperties = {
    width: '100%', height: '100%',
    background: '#f7f5ef',
    position: 'relative', overflow: 'hidden',
    fontFamily: '"Pretendard Variable", Pretendard, sans-serif',
    color: '#1f1a15',
    letterSpacing: '-0.012em',
  };
  const serif = '"Cormorant Garamond", "Noto Serif KR", Georgia, serif';
  const coral = '#c15f3c'; // Claude orange-ish
  const mono = '"JetBrains Mono", "SF Mono", ui-monospace, monospace';

  const topbar: CSSProperties = {
    position: 'relative', zIndex: 2,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '16px 20px',
    borderBottom: '1px solid rgba(31,26,21,0.06)',
  };

  return (
    <div style={bg}>
      {/* Top bar */}
      <div style={topbar}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* spiral mark */}
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill={coral}/>
            <path d="M8 13.5c1.5-3 2.5-4 4-4s3 1 3 3-1.5 3-3.5 3-3.5-1-4-2" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
          </svg>
          <span style={{ fontFamily: serif, fontSize: 18, fontStyle: 'italic', fontWeight: 500 }}>
            reveal
          </span>
        </div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <span style={{ fontSize: 12, color: '#78706a' }}>홈</span>
          <span style={{ fontSize: 12, color: '#78706a' }}>대화</span>
          <div style={{
            width: 28, height: 28, borderRadius: 14,
            background: '#e8e2d5', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11, fontWeight: 600, color: '#5a4e42',
          }}>J</div>
        </div>
      </div>

      {/* Hero */}
      <main style={{ padding: '38px 24px 0', position: 'relative', zIndex: 1 }}>
        <div style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: coral, fontFamily: mono, marginBottom: 14 }}>
          ✦ New conversation
        </div>
        <h1 style={{
          fontFamily: serif, fontWeight: 500,
          fontSize: 38, lineHeight: 1.1, letterSpacing: '-0.02em',
          margin: 0,
        }}>
          안녕하세요, <span style={{ fontStyle: 'italic', color: coral }}>저녁</span>이네요.
          <br/>
          <span style={{ fontStyle: 'italic' }}>무엇을</span> 궁금해하고 계세요?
        </h1>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: '#5a4e42', margin: '18px 0 0' }}>
          17가지 전통 방법과 현대 수비학을 모두 알고 있어요. 
          편한 방식으로 같이 찾아봐요.
        </p>

        {/* Input panel - artifact style */}
        <div style={{
          marginTop: 26,
          background: '#fff',
          border: '1px solid rgba(31,26,21,0.1)',
          borderRadius: 12,
          padding: 14,
          boxShadow: '0 1px 0 rgba(31,26,21,0.04)',
        }}>
          <div style={{ fontSize: 14, color: '#9b9087', minHeight: 40, lineHeight: 1.5 }}>
            아기 성별이 궁금한데, 어떻게 시작하면 좋을까요?
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10, paddingTop: 10, borderTop: '1px solid rgba(31,26,21,0.06)' }}>
            <div style={{ display: 'flex', gap: 6 }}>
              <span style={{
                fontFamily: mono, fontSize: 10,
                padding: '4px 8px', borderRadius: 6,
                background: '#f2ede3', color: '#5a4e42',
                display: 'inline-flex', alignItems: 'center', gap: 4,
              }}>
                <span>@</span> claude-sonnet-4.5
              </span>
              <span style={{
                fontFamily: mono, fontSize: 10,
                padding: '4px 8px', borderRadius: 6,
                background: 'rgba(193,95,60,0.1)', color: coral,
              }}>17 tools</span>
            </div>
            <div style={{
              width: 28, height: 28, borderRadius: 8,
              background: coral,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>
            </div>
          </div>
        </div>

        {/* Two entry points - more like artifacts/threads */}
        <div style={{ marginTop: 28 }}>
          <div style={{ fontSize: 11, fontFamily: mono, letterSpacing: '0.12em', color: '#9b9087', textTransform: 'uppercase', marginBottom: 12 }}>
            Recent · 시작점
          </div>

          <div style={{
            display: 'flex', gap: 12, padding: '14px 0',
            borderBottom: '1px solid rgba(31,26,21,0.06)',
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 8,
              background: 'rgba(193,95,60,0.12)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={coral} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.582a.5.5 0 0 1 0 .962L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/></svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ fontFamily: serif, fontSize: 17, fontWeight: 500, fontStyle: 'italic' }}>AI 종합 예측</span>
                <span style={{ fontSize: 10, color: '#9b9087', fontFamily: mono }}>· 추천</span>
              </div>
              <p style={{ fontSize: 12, lineHeight: 1.6, color: '#5a4e42', margin: '4px 0 0' }}>
                17가지 방법을 함께 살펴보고, 각 관점이 어떻게 말하는지 근거와 함께 설명해드릴게요.
              </p>
              <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
                {['chinese', 'mayan', 'numerology', '+14'].map((t, i) => (
                  <span key={i} style={{
                    fontFamily: mono, fontSize: 9,
                    padding: '2px 6px', borderRadius: 4,
                    background: 'rgba(31,26,21,0.05)', color: '#78706a',
                  }}>{t}</span>
                ))}
              </div>
            </div>
            <span style={{ color: '#9b9087', fontSize: 16 }}>↗</span>
          </div>

          <div style={{
            display: 'flex', gap: 12, padding: '14px 0',
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 8,
              background: 'rgba(31,26,21,0.06)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5a4e42" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: serif, fontSize: 17, fontWeight: 500, fontStyle: 'italic' }}>플래너 · 역방향</div>
              <p style={{ fontSize: 12, lineHeight: 1.6, color: '#5a4e42', margin: '4px 0 0' }}>
                원하는 성별을 먼저 말씀해주시면, 유리한 시기·방위·라이프스타일을 차근차근 같이 정리해볼게요.
              </p>
            </div>
            <span style={{ color: '#9b9087', fontSize: 16 }}>↗</span>
          </div>
        </div>

        <p style={{
          fontFamily: serif, fontStyle: 'italic', fontSize: 13,
          textAlign: 'center', color: '#9b9087', margin: '24px 0 0',
        }}>
          — 천천히, 같이 생각해봐요.
        </p>
      </main>
    </div>
  );
};

