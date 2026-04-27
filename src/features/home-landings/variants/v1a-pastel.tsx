// @ts-nocheck — Claude Design 에서 받아온 풀 랜딩 프로토타입. 런타임만 정상 동작하면 OK.
// V1 — AS-IS 진화형 랜딩
// 파스텔 블루 + glassmorphism. 현재 디자인 언어 유지하되
// hero 임팩트, 신뢰지표, 메서드 프리뷰, 마지막 CTA까지 풀 랜딩으로 확장.

export const V1A_Landing = () => {
  return (
    <div style={{
      width: '100%', minHeight: '100%',
      background: 'linear-gradient(160deg, hsl(230 45% 86%) 0%, hsl(230 28% 94%) 50%, hsl(230 18% 96%) 100%)',
      position: 'relative', overflow: 'hidden',
      fontFamily: '"Pretendard Variable", Pretendard, sans-serif',
      letterSpacing: '-0.015em', color: 'hsl(230 20% 13%)',
    }}>
      <style>{`
        .v1a-blob { position:absolute; border-radius:50%; filter:blur(80px); pointer-events:none; }
        .v1a-card { background:rgba(255,255,255,.55); backdrop-filter:blur(16px) saturate(150%); -webkit-backdrop-filter:blur(16px) saturate(150%); border:1px solid rgba(255,255,255,.7); border-radius:20px; box-shadow:0 2px 8px rgba(40,55,90,.07), 0 12px 32px rgba(40,55,90,.11); }
        .v1a-nav { display:flex; align-items:center; justify-content:space-between; padding:14px 20px; }
        .v1a-pill { display:inline-flex; align-items:center; gap:6px; height:36px; padding:0 14px; border-radius:999px; font-size:13px; font-weight:500; color:hsl(230 12% 42%); cursor:pointer; }
        .v1a-pill.active { background:hsl(230 54% 36%); color:#fff; }
        .v1a-hero h1 { font-size:clamp(34px, 6vw, 64px); font-weight:600; letter-spacing:-0.03em; line-height:1.05; margin:18px 0 18px; text-wrap:balance; }
        .v1a-hero p { font-size:clamp(15px, 1.8vw, 19px); line-height:1.7; color:hsl(230 12% 42%); margin:0; max-width:560px; }
        .v1a-cta-row { display:flex; gap:12px; flex-wrap:wrap; margin-top:32px; }
        .v1a-btn { display:inline-flex; align-items:center; gap:8px; padding:14px 22px; border-radius:14px; font-size:15px; font-weight:600; cursor:pointer; transition:transform .15s; }
        .v1a-btn:hover { transform:translateY(-1px); }
        .v1a-btn.primary { background:hsl(230 54% 36%); color:#fff; box-shadow:0 4px 16px hsl(230 54% 36% / .35); }
        .v1a-btn.ghost { background:rgba(255,255,255,.6); color:hsl(230 20% 13%); border:1px solid rgba(255,255,255,.8); }
        .v1a-grid { display:grid; gap:20px; grid-template-columns: repeat(2, 1fr); }
        @media (max-width: 720px) { .v1a-grid { grid-template-columns: 1fr; } }
        .v1a-stats { display:grid; gap:16px; grid-template-columns: repeat(3, 1fr); margin-top:48px; padding:24px; }
        @media (max-width: 600px) { .v1a-stats { grid-template-columns: 1fr 1fr; } .v1a-stats > :last-child { grid-column: 1 / -1; } }
        .v1a-method-grid { display:grid; gap:10px; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); margin-top:20px; }
        .v1a-method { padding:14px; border-radius:14px; background:rgba(255,255,255,.55); border:1px solid rgba(255,255,255,.7); font-size:12px; }
      `}</style>

      {/* atmosphere */}
      <div className="v1a-blob" style={{ width:520, height:520, top:-160, left:-120, background:'hsl(230 65% 80%)', opacity:.45 }} />
      <div className="v1a-blob" style={{ width:480, height:480, top:200, right:-160, background:'hsl(280 55% 84%)', opacity:.35 }} />
      <div className="v1a-blob" style={{ width:420, height:420, bottom:-160, left:'30%', background:'hsl(200 75% 82%)', opacity:.3 }} />

      <div style={{ position:'relative', zIndex:2, padding:'16px clamp(16px, 4vw, 56px) 0' }}>
        {/* Nav */}
        <nav className="v1a-card v1a-nav">
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            <div style={{ width:34, height:34, borderRadius:10, background:'hsl(230 54% 36%)', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700 }}>GR</div>
            <span style={{ fontSize:14, fontWeight:600 }}>Gender Reveal</span>
          </div>
          <div style={{ display:'flex', gap:4 }}>
            <span className="v1a-pill active">홈</span>
            <span className="v1a-pill">AI 예측</span>
            <span className="v1a-pill">플래너</span>
          </div>
          <button className="v1a-btn primary" style={{ padding:'8px 16px', fontSize:13 }}>지금 예측</button>
        </nav>

        {/* Hero */}
        <section className="v1a-hero" style={{ padding:'clamp(60px, 10vw, 120px) clamp(8px, 2vw, 24px) clamp(40px, 6vw, 80px)', maxWidth:1100 }}>
          <span style={{
            display:'inline-flex', alignItems:'center', gap:8,
            padding:'6px 14px', borderRadius:999,
            background:'rgba(255,255,255,.6)', border:'1px solid rgba(255,255,255,.8)',
            fontSize:11, fontWeight:600, letterSpacing:'0.18em', color:'hsl(230 54% 36%)',
          }}>
            <span style={{ width:6, height:6, borderRadius:'50%', background:'hsl(230 54% 36%)' }} />
            17가지 방법을 하나의 답으로
          </span>
          <h1>
            궁금했던 그 답,<br/>
            <span style={{ background:'linear-gradient(120deg, hsl(230 64% 36%), hsl(280 54% 50%))', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
              AI가 17번 검토합니다.
            </span>
          </h1>
          <p>고대 달력부터 현대 수비학까지. 서로 다른 관점을 한 번에 살펴보고, 가장 가능성 높은 방향을 부드럽게 알려드립니다.</p>
          <div className="v1a-cta-row">
            <button className="v1a-btn primary">
              AI 종합 예측 시작
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </button>
            <button className="v1a-btn ghost">원하는 성별부터 시작</button>
          </div>
          <p style={{ fontSize:12, color:'hsl(230 8% 50%)', marginTop:14 }}>· 무료 · 가입 없이 30초</p>
        </section>

        {/* Stats card */}
        <div className="v1a-card v1a-stats">
          {[
            ['17', '예측 방법'],
            ['~30초', '평균 소요시간'],
            ['12,400+', '이번 달 예측 수'],
          ].map(([n, l], i) => (
            <div key={i}>
              <div style={{ fontSize:'clamp(28px, 4vw, 38px)', fontWeight:700, letterSpacing:'-0.025em', color:'hsl(230 54% 36%)' }}>{n}</div>
              <div style={{ fontSize:12, color:'hsl(230 12% 42%)', marginTop:4 }}>{l}</div>
            </div>
          ))}
        </div>

        {/* Two paths */}
        <section style={{ marginTop:'clamp(60px, 8vw, 100px)' }}>
          <div style={{ marginBottom:24 }}>
            <span style={{ fontSize:11, letterSpacing:'0.22em', color:'hsl(230 54% 36%)', fontWeight:600 }}>HOW TO START</span>
            <h2 style={{ fontSize:'clamp(24px, 3vw, 32px)', fontWeight:600, margin:'8px 0 0', letterSpacing:'-0.02em' }}>두 가지 길 중 편한 방향으로.</h2>
          </div>
          <div className="v1a-grid">
            {[
              { t:'AI 예측', s:'17가지 방법을 한 번에 종합', d:'고대 달력 · 현대 수비학 · 마야식 · 중국 황실력까지. AI가 모든 신호를 가중평균해 단일 답을 제시합니다.', tag:'추천' },
              { t:'성별 플래너', s:'원하는 성별로부터 역추천', d:'아들·딸 중 원하는 쪽을 먼저 정하면, 유리한 시기·방위·라이프스타일 가이드를 받아볼 수 있습니다.', tag:'역방향' },
            ].map((c, i) => (
              <div key={i} className="v1a-card" style={{ padding:'clamp(20px, 3vw, 32px)' }}>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                  <div style={{ width:44, height:44, borderRadius:12, background:'rgba(255,255,255,.8)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="hsl(230 54% 36%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {i === 0 ? <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.582a.5.5 0 0 1 0 .962L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/> : <><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></>}
                    </svg>
                  </div>
                  <span style={{ fontSize:10, fontWeight:600, padding:'4px 10px', borderRadius:999, background:i===0?'hsl(230 54% 36%)':'rgba(255,255,255,.7)', color:i===0?'#fff':'hsl(230 12% 42%)' }}>{c.tag}</span>
                </div>
                <h3 style={{ fontSize:22, fontWeight:600, letterSpacing:'-0.02em', margin:'16px 0 6px' }}>{c.t}</h3>
                <p style={{ fontSize:12, color:'hsl(230 54% 36%)', fontWeight:500, margin:0 }}>{c.s}</p>
                <p style={{ fontSize:14, lineHeight:1.65, color:'hsl(230 12% 42%)', margin:'14px 0 0' }}>{c.d}</p>
                <div style={{ display:'flex', alignItems:'center', gap:6, marginTop:20, fontSize:13, fontWeight:600, color:'hsl(230 54% 36%)' }}>
                  시작하기 →
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Methods preview */}
        <section style={{ marginTop:'clamp(48px, 7vw, 80px)', paddingBottom:'clamp(60px, 8vw, 100px)' }}>
          <span style={{ fontSize:11, letterSpacing:'0.22em', color:'hsl(230 54% 36%)', fontWeight:600 }}>17 METHODS · INSIDE</span>
          <h2 style={{ fontSize:'clamp(20px, 2.4vw, 26px)', fontWeight:600, margin:'8px 0 0', letterSpacing:'-0.02em' }}>이런 방법들을 종합합니다.</h2>
          <div className="v1a-method-grid">
            {['중국 황실 달력', '마야 달력', '오행 사주', '수비학', '아유르베다', '러시아 달력', '드라노 테스트', '심박수 분석', '입덧 패턴', '바라니 달력', '+7가지 더…'].map((m, i) => (
              <div key={i} className="v1a-method" style={{ opacity: i===10 ? .6 : 1, fontWeight: i===10 ? 600 : 500, color: i===10 ? 'hsl(230 54% 36%)' : 'hsl(230 20% 13%)' }}>
                {m}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

