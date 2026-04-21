// @ts-nocheck — Claude Design 에서 받아온 프로토타입. 런타임만 정상 동작하면 OK.
// V7 — AI Assistant Chat
// ChatGPT/Copilot처럼 대화 입력으로 시작. "무엇을 예측해드릴까요?"
// AI가 먼저 말을 거는 느낌. 부드러운 페이퍼 화이트 + 블루 포인트

import type { CSSProperties } from "react";

export const V7_Home = () => {
  const bg: CSSProperties = {
    width: '100%', height: '100%',
    background: '#fafaf7',
    position: 'relative', overflow: 'hidden',
    fontFamily: '"Pretendard Variable", Pretendard, sans-serif',
    color: '#1a1a1f',
    letterSpacing: '-0.015em',
  };
  const accent = '#2f6bff';
  const mono = '"JetBrains Mono", "SF Mono", ui-monospace, monospace';

  const keyframes = `
    @keyframes v7blink { 0%,50%,100% { opacity: 1; } 25%,75% { opacity: 0; } }
    @keyframes v7typing { from { width: 0; } to { width: 100%; } }
    @keyframes v7shimmer { 0% { background-position: -100% 0; } 100% { background-position: 200% 0; } }
  `;

  const topbar: CSSProperties = {
    position: 'relative', zIndex: 2,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '14px 20px', borderBottom: '1px solid #ececea',
  };

  return (
    <div style={bg}>
      <style>{keyframes}</style>

      {/* Top bar */}
      <div style={topbar}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 8,
            background: `linear-gradient(135deg, ${accent}, #8a5bff)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(47,107,255,0.3)',
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff"><path d="M12 2l2.4 5.6L20 10l-5.6 2.4L12 18l-2.4-5.6L4 10l5.6-2.4z"/></svg>
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>GR Assistant</div>
            <div style={{ fontSize: 10, color: '#6b7280', display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#3db87a' }} />
              온라인 · GPT-4 기반
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h.01M12 12h.01M21 12h.01"/></svg>
          </div>
        </div>
      </div>

      {/* Chat area */}
      <div style={{ padding: '24px 18px 0', position: 'relative', zIndex: 1 }}>
        {/* Welcome AI bubble */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 8, flexShrink: 0,
            background: `linear-gradient(135deg, ${accent}, #8a5bff)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(47,107,255,0.25)',
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff"><path d="M12 2l2.4 5.6L20 10l-5.6 2.4L12 18l-2.4-5.6L4 10l5.6-2.4z"/></svg>
          </div>
          <div style={{
            background: '#fff', borderRadius: '4px 16px 16px 16px',
            padding: '12px 14px', border: '1px solid #ececea',
            maxWidth: 280,
          }}>
            <div style={{ fontSize: 10, color: '#6b7280', marginBottom: 4, fontFamily: mono }}>GR · 방금 전</div>
            <div style={{ fontSize: 13, lineHeight: 1.6 }}>
              안녕하세요. 아기 성별이 궁금하시죠? <br/>
              <strong style={{ color: accent, fontWeight: 600 }}>17가지 방법</strong>을 종합해서
              알아볼 수 있어요. 어떻게 시작해볼까요?
            </div>
          </div>
        </div>

        {/* Quick action chips */}
        <div style={{ marginLeft: 38, marginBottom: 16 }}>
          <div style={{ fontSize: 10, color: '#9ca3af', marginBottom: 8, fontFamily: mono, letterSpacing: '0.1em' }}>
            SUGGESTED
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <button style={{
              textAlign: 'left', padding: '12px 14px',
              border: `1.5px solid ${accent}`, borderRadius: 14,
              background: '#fff', cursor: 'pointer',
              boxShadow: '0 1px 3px rgba(47,107,255,0.08)',
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: 10,
                background: `${accent}15`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.582a.5.5 0 0 1 0 .962L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/></svg>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>AI로 종합 예측해줘</div>
                <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>17가지 방법을 한 번에 계산</div>
              </div>
              <span style={{
                fontSize: 9, padding: '3px 7px', borderRadius: 6,
                background: `${accent}15`, color: accent, fontWeight: 600,
                fontFamily: mono, letterSpacing: '0.05em',
              }}>RECOMMENDED</span>
            </button>

            <button style={{
              textAlign: 'left', padding: '12px 14px',
              border: '1px solid #ececea', borderRadius: 14,
              background: '#fff', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: 10,
                background: '#f3f4f6',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4b5563" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>원하는 성별부터 정할게</div>
                <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>플래너 · 역추천 모드</div>
              </div>
            </button>

            <button style={{
              textAlign: 'left', padding: '10px 14px',
              border: '1px solid #ececea', borderRadius: 14,
              background: '#fff', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <div style={{ fontSize: 14, width: 20, textAlign: 'center' }}>📚</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 500 }}>개별 예측법 살펴보기</div>
                <div style={{ fontSize: 10, color: '#9ca3af', marginTop: 1 }}>마야식 · 중국달력 · 수비학 · 외 14가지</div>
              </div>
              <span style={{ color: '#9ca3af' }}>→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Input bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '12px 18px 18px',
        background: 'linear-gradient(180deg, rgba(250,250,247,0), rgba(250,250,247,0.9) 30%, rgba(250,250,247,1))',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          background: '#fff', border: '1px solid #ececea',
          borderRadius: 14, padding: '12px 14px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
        }}>
          <div style={{ flex: 1, fontSize: 13, color: '#9ca3af' }}>
            AI에게 물어보세요
            <span style={{ display: 'inline-block', width: 2, height: 12, background: accent, marginLeft: 2, animation: 'v7blink 1s infinite', verticalAlign: 'middle' }} />
          </div>
          <div style={{
            width: 32, height: 32, borderRadius: 10,
            background: `linear-gradient(135deg, ${accent}, #8a5bff)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>
          </div>
        </div>
        <p style={{ fontSize: 10, textAlign: 'center', color: '#9ca3af', margin: '8px 0 0', fontFamily: mono }}>
          AI 판단은 참고용이며 결과의 정확성을 보장하지 않습니다.
        </p>
      </div>
    </div>
  );
};

