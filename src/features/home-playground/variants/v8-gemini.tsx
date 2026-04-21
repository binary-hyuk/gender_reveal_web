// @ts-nocheck — Claude Design 에서 받아온 프로토타입. 런타임만 정상 동작하면 OK.
// V8 — Gemini-like
// 밝은 배경, 컬러풀한 Spark 글리프, 그라데이션 텍스트
// 친근하고 넓은 여백, Google Material 3 Expressive 느낌

import Link from "next/link";
import type { CSSProperties } from "react";

export const V8_Home = () => {
  const bg: CSSProperties = {
    width: '100%', height: '100%',
    background: '#ffffff',
    position: 'relative', overflow: 'hidden',
    fontFamily: '"Pretendard Variable", Pretendard, sans-serif',
    color: '#1f1f1f',
    letterSpacing: '-0.015em',
  };

  // 4-color gradient (Gemini inspired)
  const geminiGrad = 'linear-gradient(135deg, #4285f4 0%, #9b72cb 40%, #d96570 75%, #f28b3c 100%)';

  const keyframes = `
    @keyframes v8spin { to { transform: rotate(360deg); } }
    @keyframes v8shine { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
  `;

  const topbar: CSSProperties = {
    position: 'relative', zIndex: 2,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '14px 18px',
  };

  return (
    <div style={bg}>
      <style>{keyframes}</style>

      {/* Top bar */}
      <div style={topbar}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg width="22" height="22" viewBox="0 0 24 24">
            <defs>
              <linearGradient id="gemini-logo" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#4285f4"/>
                <stop offset="40%" stopColor="#9b72cb"/>
                <stop offset="75%" stopColor="#d96570"/>
                <stop offset="100%" stopColor="#f28b3c"/>
              </linearGradient>
            </defs>
            <path d="M12 2C12 7 17 12 22 12C17 12 12 17 12 22C12 17 7 12 2 12C7 12 12 7 12 2Z" fill="url(#gemini-logo)"/>
          </svg>
          <span style={{ fontSize: 16, fontWeight: 500, color: '#5f6368' }}>
            Reveal <span style={{ background: geminiGrad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 500 }}>AI</span>
          </span>
        </div>
        <div style={{
          width: 32, height: 32, borderRadius: 16,
          background: '#f1f3f4',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 12, fontWeight: 600, color: '#5f6368',
        }}>J</div>
      </div>

      {/* Hero */}
      <main style={{ padding: '46px 24px 0', position: 'relative', zIndex: 1 }}>
        <svg width="46" height="46" viewBox="0 0 24 24" style={{ marginBottom: 18 }}>
          <defs>
            <linearGradient id="gemini-hero" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#4285f4"/>
              <stop offset="40%" stopColor="#9b72cb"/>
              <stop offset="75%" stopColor="#d96570"/>
              <stop offset="100%" stopColor="#f28b3c"/>
            </linearGradient>
          </defs>
          <path d="M12 2C12 7 17 12 22 12C17 12 12 17 12 22C12 17 7 12 2 12C7 12 12 7 12 2Z" fill="url(#gemini-hero)"/>
        </svg>

        <h1 style={{
          fontSize: 34, fontWeight: 400, lineHeight: 1.15, margin: 0,
          letterSpacing: '-0.025em',
        }}>
          <span style={{
            background: geminiGrad,
            backgroundSize: '200% 100%',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            animation: 'v8shine 6s ease-in-out infinite',
          }}>안녕하세요</span>
          <span style={{ color: '#5f6368' }}>,</span>
          <br/>
          <span style={{ color: '#1f1f1f', fontWeight: 400 }}>
            무엇을 예측해드릴까요?
          </span>
        </h1>

        <p style={{ fontSize: 14, lineHeight: 1.6, color: '#5f6368', margin: '18px 0 0', fontWeight: 400 }}>
          17가지 고대·현대 예측법을 AI가 종합합니다.
          원하는 방향을 골라보세요.
        </p>

        {/* Cards */}
        <div style={{ display: 'grid', gap: 12, marginTop: 32 }}>
          {/* Primary AI card */}
          <Link href="/ai" style={{
            position: 'relative',
            borderRadius: 28,
            padding: 20,
            background: 'linear-gradient(135deg, #e8f0fe 0%, #f3e8fd 50%, #fce8ec 100%)',
            overflow: 'hidden',
            textDecoration: 'none', color: 'inherit', display: 'block',
          }}>
            {/* sparkle decoration */}
            <svg width="60" height="60" viewBox="0 0 24 24" style={{ position: 'absolute', top: -8, right: -8, opacity: 0.5 }}>
              <path d="M12 2C12 7 17 12 22 12C17 12 12 17 12 22C12 17 7 12 2 12C7 12 12 7 12 2Z" fill="url(#gemini-hero)"/>
            </svg>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 10,
                background: geminiGrad,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff"><path d="M12 2C12 7 17 12 22 12C17 12 12 17 12 22C12 17 7 12 2 12C7 12 12 7 12 2Z"/></svg>
              </div>
              <div style={{ fontSize: 15, fontWeight: 500 }}>AI 종합 예측</div>
              <span style={{
                marginLeft: 'auto',
                fontSize: 10, fontWeight: 500,
                padding: '3px 8px', borderRadius: 8,
                background: 'rgba(255,255,255,0.7)',
                color: '#5f6368',
              }}>추천</span>
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.55, color: '#3c4043', margin: 0 }}>
              Deep Think으로 17가지 방법의 결과를 교차 검증해 가장 가능성 높은 답을 찾습니다.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 14, fontSize: 13, fontWeight: 500, color: '#1a73e8' }}>
              지금 시작하기
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </div>
          </Link>

          {/* Planner card */}
          <Link href="/planner" style={{
            borderRadius: 28, padding: 18,
            background: '#f8f9fa',
            textDecoration: 'none', color: 'inherit', display: 'block',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 10,
                background: '#e8f0fe',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a73e8" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
              </div>
              <div style={{ fontSize: 14, fontWeight: 500 }}>플래너 · 역추천</div>
            </div>
            <p style={{ fontSize: 12, lineHeight: 1.55, color: '#5f6368', margin: 0 }}>
              원하는 성별을 알려주세요. 시기·방위·라이프스타일을 AI가 맞춤 제안합니다.
            </p>
          </Link>
        </div>

        {/* Prompt chips */}
        <div style={{ marginTop: 24 }}>
          <div style={{ fontSize: 11, color: '#5f6368', marginBottom: 10, fontWeight: 500 }}>
            💡 또는 이런 것도 해볼 수 있어요
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['마야식으로만 보기', '중국황실달력', '수비학 단독', '혈액형 예측'].map((t, i) => (
              <span key={i} style={{
                fontSize: 12, padding: '7px 12px',
                borderRadius: 16, border: '1px solid #dadce0',
                color: '#3c4043', background: '#fff',
              }}>{t}</span>
            ))}
          </div>
        </div>
      </main>

      {/* Bottom input */}
      <div style={{
        position: 'absolute', bottom: 16, left: 16, right: 16,
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          background: '#f1f3f4', borderRadius: 28,
          padding: '12px 8px 12px 16px',
        }}>
          <span style={{ fontSize: 13, color: '#5f6368', flex: 1 }}>
            Reveal AI에 메시지
          </span>
          <div style={{
            width: 36, height: 36, borderRadius: 18,
            background: geminiGrad,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>
          </div>
        </div>
      </div>
    </div>
  );
};

