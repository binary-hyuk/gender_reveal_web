// @ts-nocheck — Claude Design 에서 받아온 프로토타입. 런타임만 정상 동작하면 OK.
// V10 — ChatGPT-like
// 다크 섹션 + 모노톤 베이스 + 민트 그린 포인트 (OpenAI 느낌)
// 중앙 정렬 대형 input, 프롬프트 스타터 카드 그리드

import type { CSSProperties } from "react";

export const V10_Home = () => {
  const bg: CSSProperties = {
    width: '100%', height: '100%',
    background: '#ffffff',
    position: 'relative', overflow: 'hidden',
    fontFamily: '"Söhne", "Pretendard Variable", Pretendard, sans-serif',
    color: '#0d0d0d',
    letterSpacing: '-0.01em',
  };
  const accent = '#10a37f';

  const topbar: CSSProperties = {
    position: 'relative', zIndex: 2,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '12px 14px',
    borderBottom: '1px solid #ececec',
  };

  return (
    <div style={bg}>
      {/* Top bar */}
      <div style={topbar}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg width="22" height="22" viewBox="0 0 24 24">
            <path d="M22 10.9a5.5 5.5 0 0 0-.5-4.5 5.6 5.6 0 0 0-6-2.7A5.5 5.5 0 0 0 11.3 2a5.5 5.5 0 0 0-5.3 4 5.5 5.5 0 0 0-3.6 2.7 5.6 5.6 0 0 0 .7 6.5 5.5 5.5 0 0 0 .5 4.5 5.6 5.6 0 0 0 6 2.7A5.5 5.5 0 0 0 13.7 24a5.5 5.5 0 0 0 5.3-4 5.5 5.5 0 0 0 3.6-2.7 5.6 5.6 0 0 0-.7-6.5z" fill="#0d0d0d"/>
          </svg>
          <span style={{ fontSize: 14, fontWeight: 600 }}>Reveal</span>
          <span style={{
            fontSize: 10, fontWeight: 500,
            padding: '2px 6px', borderRadius: 4,
            background: '#f4f4f4', color: '#5d5d5d',
            marginLeft: 2,
          }}>Plus</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0d0d0d" strokeWidth="1.8" strokeLinecap="round">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0d0d0d" strokeWidth="1.8" strokeLinecap="round">
            <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </div>
      </div>

      {/* Hero */}
      <main style={{ padding: '80px 22px 0', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        {/* Mark */}
        <svg width="42" height="42" viewBox="0 0 24 24" style={{ marginBottom: 22 }}>
          <path d="M22 10.9a5.5 5.5 0 0 0-.5-4.5 5.6 5.6 0 0 0-6-2.7A5.5 5.5 0 0 0 11.3 2a5.5 5.5 0 0 0-5.3 4 5.5 5.5 0 0 0-3.6 2.7 5.6 5.6 0 0 0 .7 6.5 5.5 5.5 0 0 0 .5 4.5 5.6 5.6 0 0 0 6 2.7A5.5 5.5 0 0 0 13.7 24a5.5 5.5 0 0 0 5.3-4 5.5 5.5 0 0 0 3.6-2.7 5.6 5.6 0 0 0-.7-6.5z" fill="#0d0d0d"/>
        </svg>

        <h1 style={{
          fontSize: 26, fontWeight: 600, letterSpacing: '-0.02em',
          margin: '0 0 10px', lineHeight: 1.2,
        }}>
          어떻게 도와드릴까요?
        </h1>
        <p style={{ fontSize: 13, color: '#5d5d5d', margin: 0, lineHeight: 1.55 }}>
          질문을 입력하거나 아래 예시로 시작하세요.
        </p>

        {/* Prompt starter grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8,
          marginTop: 28, textAlign: 'left',
        }}>
          {[
            { icon: '🔮', title: 'AI 종합 예측', sub: '17가지 방법 한 번에', badge: true },
            { icon: '🎯', title: '원하는 성별', sub: '플래너 역추천' },
            { icon: '🀄', title: '중국 황실', sub: '단독 예측' },
            { icon: '🌿', title: '더 많은 방법', sub: '14가지 더 보기' },
          ].map((c, i) => (
            <div key={i} style={{
              padding: 14, borderRadius: 12,
              border: '1px solid #ececec',
              background: '#fff',
              position: 'relative',
            }}>
              <div style={{ fontSize: 18, marginBottom: 10 }}>{c.icon}</div>
              <div style={{ fontSize: 12, fontWeight: 500, color: '#0d0d0d', lineHeight: 1.35 }}>{c.title}</div>
              <div style={{ fontSize: 11, color: '#8e8e8e', marginTop: 2 }}>{c.sub}</div>
              {c.badge && (
                <span style={{
                  position: 'absolute', top: 10, right: 10,
                  fontSize: 8, fontWeight: 600, letterSpacing: '0.08em',
                  padding: '2px 5px', borderRadius: 3,
                  background: accent, color: '#fff',
                }}>NEW</span>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* Bottom composer */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '16px 16px 20px',
      }}>
        <div style={{
          background: '#f4f4f4',
          borderRadius: 24,
          padding: '12px 12px 12px 18px',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8e8e8e" strokeWidth="2" strokeLinecap="round">
            <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
          </svg>
          <div style={{ flex: 1, fontSize: 13, color: '#8e8e8e' }}>
            메시지 보내기...
          </div>
          <div style={{
            width: 28, height: 28, borderRadius: 14,
            background: '#0d0d0d',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>
          </div>
        </div>
        <p style={{ fontSize: 10, textAlign: 'center', color: '#8e8e8e', margin: '8px 0 0' }}>
          Reveal은 실수할 수 있습니다. 중요한 정보는 직접 확인하세요.
        </p>
      </div>
    </div>
  );
};

