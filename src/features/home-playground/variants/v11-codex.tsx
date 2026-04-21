// @ts-nocheck — Claude Design 에서 받아온 프로토타입. 런타임만 정상 동작하면 OK.
// V11 — Codex-like
// 터미널 / IDE 감성. 다크 에디터 배경 + 모노스페이스 + 줄번호 + 신택스 하이라이트
// 코드 블록으로 예측을 "실행"하는 메타포

import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

export const V11_Home = () => {
  const bg: CSSProperties = {
    width: '100%', height: '100%',
    background: '#0d0f13',
    position: 'relative', overflow: 'hidden',
    fontFamily: '"JetBrains Mono", "SF Mono", ui-monospace, monospace',
    color: '#e6e8ee',
    letterSpacing: '-0.005em',
  };
  const sans = '"Pretendard Variable", Pretendard, -apple-system, sans-serif';

  // syntax colors (CSS 객체 아님, 단순 palette 매핑)
  const c: Record<string, string> = {
    kw: '#c678dd',     // purple keyword
    fn: '#61afef',     // blue function
    str: '#98c379',    // green string
    num: '#d19a66',    // orange number
    cm: '#5c6370',     // comment gray
    prop: '#e06c75',   // red property
    acc: '#56b6c2',    // cyan accent
  };

  const titlebar: CSSProperties = {
    display: 'flex', alignItems: 'center', gap: 8,
    padding: '10px 12px',
    background: '#16181e',
    borderBottom: '1px solid #21242b',
    fontFamily: sans,
    fontSize: 11,
    color: '#8b92a3',
  };

  const dot = (color: string): CSSProperties => ({
    width: 10, height: 10, borderRadius: '50%', background: color,
  });

  const tabs: CSSProperties = {
    display: 'flex', fontSize: 11,
    background: '#0d0f13',
    borderBottom: '1px solid #21242b',
  };

  const tab = (active: boolean): CSSProperties => ({
    padding: '9px 14px',
    borderRight: '1px solid #21242b',
    background: active ? '#181b22' : 'transparent',
    color: active ? '#e6e8ee' : '#6b7185',
    display: 'inline-flex', alignItems: 'center', gap: 6,
    borderTop: active ? '1.5px solid #61afef' : '1.5px solid transparent',
    marginTop: -1,
  });

  const gutter: CSSProperties = { color: '#3e4452', paddingRight: 14, textAlign: 'right', userSelect: 'none', width: 22, display: 'inline-block' };

  const Line = ({ n, children, indent = 0 }: { n: number | string; children: ReactNode; indent?: number }) => (
    <div style={{ display: 'flex', fontSize: 12, lineHeight: 1.8 }}>
      <span style={gutter}>{n}</span>
      <span style={{ paddingLeft: indent * 18 }}>{children}</span>
    </div>
  );

  return (
    <div style={bg}>
      {/* Title bar */}
      <div style={titlebar}>
        <span style={dot('#ff5f57')} />
        <span style={dot('#febc2e')} />
        <span style={dot('#28c840')} />
        <span style={{ flex: 1, textAlign: 'center', fontSize: 11 }}>
          ~/gender-reveal — reveal.py
        </span>
        <span style={{ color: c.acc, fontSize: 10 }}>● codex</span>
      </div>

      {/* Tabs */}
      <div style={tabs}>
        <div style={tab(true)}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill={c.num}><path d="M12 2l2.4 5.6L20 10l-5.6 2.4L12 18l-2.4-5.6L4 10l5.6-2.4z"/></svg>
          reveal.py
        </div>
        <div style={tab(false)}>
          <span style={{ color: c.kw }}>●</span> methods.json
        </div>
        <div style={{ flex: 1 }} />
      </div>

      {/* Code area */}
      <div style={{ padding: '14px 12px 0', height: 460, overflow: 'hidden' }}>
        <Line n={1}><span style={{ color: c.cm }}>{'# gender reveal · multi-method ensemble'}</span></Line>
        <Line n={2}><span style={{ color: c.kw }}>from</span> <span style={{ color: c.prop }}>reveal</span> <span style={{ color: c.kw }}>import</span> <span style={{ color: c.fn }}>predict</span>, <span style={{ color: c.fn }}>plan</span></Line>
        <Line n={3}>&nbsp;</Line>
        <Line n={4}><span style={{ color: c.cm }}>{'# 17 methods available →'}</span></Line>
        <Line n={5}>
          <span style={{ color: c.acc }}>methods</span> <span style={{ color: '#abb2bf' }}>=</span> [
        </Line>
        <Line n={6} indent={1}>
          <span style={{ color: c.str }}>"chinese"</span>, <span style={{ color: c.str }}>"mayan"</span>, <span style={{ color: c.str }}>"ohang"</span>,
        </Line>
        <Line n={7} indent={1}>
          <span style={{ color: c.str }}>"numerology"</span>, <span style={{ color: c.str }}>"ayurveda"</span>, <span style={{ color: c.cm }}>...</span>
        </Line>
        <Line n={8}>]  <span style={{ color: c.cm }}>{'# +12 more'}</span></Line>
        <Line n={9}>&nbsp;</Line>
        <Line n={10}><span style={{ color: c.kw }}>result</span> <span style={{ color: '#abb2bf' }}>=</span> <span style={{ color: c.fn }}>predict</span>(</Line>
        <Line n={11} indent={1}><span style={{ color: c.prop }}>parents</span>=<span style={{ color: c.str }}>"..."</span>,</Line>
        <Line n={12} indent={1}><span style={{ color: c.prop }}>conception</span>=<span style={{ color: c.str }}>"..."</span>,</Line>
        <Line n={13} indent={1}><span style={{ color: c.prop }}>ensemble</span>=<span style={{ color: c.num }}>True</span>,</Line>
        <Line n={14}>)</Line>
      </div>

      {/* Agent panel overlay - bottom */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: '#16181e',
        borderTop: '1px solid #21242b',
      }}>
        <div style={{ padding: '10px 14px 6px', display: 'flex', alignItems: 'center', gap: 8, fontSize: 10, color: '#6b7185' }}>
          <span style={{
            width: 16, height: 16, borderRadius: 4,
            background: 'linear-gradient(135deg, #56b6c2, #61afef)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 700, fontSize: 9,
          }}>C</span>
          <span style={{ color: '#e6e8ee', fontWeight: 500 }}>codex</span>
          <span>·</span>
          <span style={{ color: '#56b6c2' }}>agent ready</span>
          <span style={{ flex: 1 }} />
          <span style={{ fontFamily: sans }}>17 tools</span>
        </div>

        <div style={{ padding: '8px 14px 10px' }}>
          <div style={{ fontSize: 11, color: '#6b7185', marginBottom: 8, fontFamily: sans }}>
            <span style={{ color: c.acc }}>▸</span> Suggested tasks
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <Link href="/playground/v11/ai" style={{
              padding: '10px 12px', borderRadius: 6,
              background: '#0d0f13',
              border: '1px solid #21242b',
              fontSize: 12,
              display: 'flex', alignItems: 'center', gap: 10,
              textDecoration: 'none', color: 'inherit',
            }}>
              <span style={{ color: c.str, fontSize: 11 }}>$</span>
              <span style={{ color: '#e6e8ee', flex: 1 }}>
                reveal <span style={{ color: c.num }}>--all</span> <span style={{ color: c.cm }}># AI 종합 실행</span>
              </span>
              <span style={{ color: c.acc, fontSize: 14 }}>↵</span>
            </Link>
            <Link href="/playground/v11/planner" style={{
              padding: '10px 12px', borderRadius: 6,
              background: '#0d0f13',
              border: '1px solid #21242b',
              fontSize: 12,
              display: 'flex', alignItems: 'center', gap: 10,
              textDecoration: 'none', color: 'inherit',
            }}>
              <span style={{ color: c.str, fontSize: 11 }}>$</span>
              <span style={{ color: '#e6e8ee', flex: 1 }}>
                plan <span style={{ color: c.prop }}>target</span>=<span style={{ color: c.str }}>"girl"</span> <span style={{ color: c.cm }}># 플래너</span>
              </span>
              <span style={{ color: c.acc, fontSize: 14 }}>↵</span>
            </Link>
          </div>

          <div style={{
            marginTop: 10,
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '10px 12px', borderRadius: 8,
            background: '#0d0f13',
            border: '1px solid #2a2e37',
          }}>
            <span style={{ color: c.kw }}>&gt;</span>
            <span style={{ color: '#6b7185', fontSize: 12, flex: 1 }}>
              Ask codex anything
              <span style={{ display: 'inline-block', width: 7, height: 13, background: c.acc, marginLeft: 3, verticalAlign: 'middle' }} />
            </span>
            <span style={{
              fontSize: 9, padding: '2px 5px', borderRadius: 3,
              background: '#21242b', color: '#6b7185',
              fontFamily: sans,
            }}>⌘K</span>
          </div>
        </div>
      </div>
    </div>
  );
};

