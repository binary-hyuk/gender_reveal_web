// @ts-nocheck — Claude Design 에서 받아온 풀 랜딩 프로토타입. 런타임만 정상 동작하면 OK.
// V5B — Mystic 변형: 라이트 크림 + 골드. 매거진/북 컨셉
// 종이 텍스처, 챕터 인덱스, 큰 세리프 디스플레이

export const V5B_Landing = () => {
  const ink = '#1f1813';
  const gold = '#a8814a';
  return (
    <div style={{
      width:'100%', minHeight:'100%',
      background:'#f5efe2',
      position:'relative', overflow:'hidden',
      fontFamily:'"Pretendard Variable", Pretendard, sans-serif',
      color:ink, letterSpacing:'-0.01em',
    }}>
      <style>{`
        .v5b-serif { font-family:"Cormorant Garamond","Noto Serif KR",Georgia,serif; }
        .v5b-grain { position:absolute; inset:0; background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.65'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E"); mix-blend-mode:multiply; opacity:.07; pointer-events:none; }
        .v5b-nav { display:flex; align-items:center; justify-content:space-between; padding:20px clamp(20px,4vw,56px); border-bottom:1px solid ${ink}; }
        .v5b-link { font-size:10px; letter-spacing:0.24em; text-transform:uppercase; color:${ink}; cursor:pointer; padding-bottom:3px; border-bottom:1px solid transparent; }
        .v5b-link.active { border-color:${gold}; color:${gold}; }
        .v5b-rule { height:1px; background:${ink}; margin:0 clamp(20px,4vw,56px); }
        .v5b-rule.thick { height:3px; }
        .v5b-hero h1 { margin:0; }
        .v5b-btn { display:inline-flex; align-items:center; gap:10px; padding:16px 28px; font-size:11px; letter-spacing:0.3em; text-transform:uppercase; font-weight:600; cursor:pointer; border:1px solid ${ink}; background:${ink}; color:#f5efe2; transition:.2s; }
        .v5b-btn.ghost { background:transparent; color:${ink}; }
        .v5b-btn:hover { background:${gold}; border-color:${gold}; color:#fff; }
        .v5b-grid { display:grid; gap:0; grid-template-columns: 1fr 1fr; }
        @media (max-width: 800px) { .v5b-grid { grid-template-columns: 1fr; } }
        .v5b-chapter { padding:clamp(28px,4vw,48px); border-right:1px solid ${ink}33; border-top:1px solid ${ink}33; }
        @media (max-width: 800px) { .v5b-chapter { border-right:none; } }
      `}</style>

      <div className="v5b-grain" />

      <div style={{ position:'relative', zIndex:2 }}>
        {/* Masthead */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'14px clamp(20px,4vw,56px)', fontSize:10, letterSpacing:'0.22em', textTransform:'uppercase' }}>
          <span style={{ fontWeight:600 }}>Vol. 01 / Issue 04</span>
          <span style={{ fontWeight:600, color:gold }}>◆ THE REVEAL ◆</span>
          <span>Seoul · 2026</span>
        </div>
        <div className="v5b-rule thick" />
        <div className="v5b-rule" style={{ marginTop:3 }} />

        <nav className="v5b-nav" style={{ borderBottom:`1px solid ${ink}33`, borderTop:'none' }}>
          <span className="v5b-serif" style={{ fontSize:24, fontStyle:'italic', fontWeight:500 }}>Reveal</span>
          <div style={{ display:'flex', gap:28 }}>
            <span className="v5b-link active">Home</span>
            <span className="v5b-link">Chapter I — AI</span>
            <span className="v5b-link">Chapter II — Planner</span>
            <span className="v5b-link">Index</span>
          </div>
          <span style={{ fontSize:10, letterSpacing:'0.24em' }}>Subscribe ↗</span>
        </nav>

        {/* Hero */}
        <section className="v5b-hero" style={{ padding:'clamp(60px,9vw,100px) clamp(20px,4vw,56px) clamp(60px,8vw,100px)', display:'grid', gridTemplateColumns:'auto 1fr', gap:'clamp(20px,4vw,56px)', alignItems:'flex-end' }}>
          <div className="v5b-serif" style={{ fontSize:'clamp(80px,14vw,200px)', fontStyle:'italic', fontWeight:400, color:gold, lineHeight:.85, letterSpacing:'-0.04em' }}>
            17
          </div>
          <div>
            <div style={{ fontSize:11, letterSpacing:'0.28em', textTransform:'uppercase', color:gold, fontWeight:600, marginBottom:14 }}>The Cover Story</div>
            <h1 className="v5b-serif" style={{ fontSize:'clamp(40px,6.5vw,84px)', fontWeight:500, letterSpacing:'-0.025em', lineHeight:1, marginBottom:24, fontStyle:'italic' }}>
              ancient methods,<br/>
              <span style={{ fontStyle:'normal', fontWeight:400 }}>one quiet answer.</span>
            </h1>
            <p style={{ fontSize:'clamp(15px,1.7vw,18px)', lineHeight:1.7, color:'#5a4a3a', maxWidth:520, margin:0 }}>
              고대 달력부터 현대 수비학까지. 17가지 방법을 AI가 천천히, 그리고 정중히 종합해 단 하나의 답으로 풀어냅니다.
            </p>
            <div style={{ display:'flex', gap:14, marginTop:32, flexWrap:'wrap' }}>
              <button className="v5b-btn">Begin Reading</button>
              <button className="v5b-btn ghost">Reverse Path</button>
            </div>
          </div>
        </section>

        <div className="v5b-rule" />

        {/* TOC chapters */}
        <section style={{ padding:'clamp(40px,5vw,60px) 0' }}>
          <div style={{ padding:'0 clamp(20px,4vw,56px)', marginBottom:24 }}>
            <div style={{ fontSize:11, letterSpacing:'0.28em', textTransform:'uppercase', color:gold, fontWeight:600 }}>Table of Contents</div>
            <h2 className="v5b-serif" style={{ fontSize:'clamp(28px,3.4vw,40px)', fontStyle:'italic', fontWeight:500, margin:'8px 0 0', letterSpacing:'-0.02em' }}>두 개의 챕터.</h2>
          </div>
          <div className="v5b-grid">
            {[
              { num:'01', t:'AI 종합 예측', sub:'17 methods · weighted', d:'고대와 현대의 방법을 같은 무게로 두지 않습니다. 각 방법의 신뢰도를 가중해 단일 결론을 만듭니다.' },
              { num:'02', t:'성별 플래너', sub:'reverse · personal', d:'원하는 성별을 먼저 알려주세요. 별자리·시기·방위·라이프스타일까지 한 페이지로 정리해드립니다.' },
            ].map((c,i)=>(
              <article key={i} className="v5b-chapter">
                <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between', marginBottom:18 }}>
                  <span className="v5b-serif" style={{ fontSize:48, fontStyle:'italic', color:gold, fontWeight:400, lineHeight:1 }}>{c.num}</span>
                  <span style={{ fontSize:10, letterSpacing:'0.24em', textTransform:'uppercase', color:'#7a6a5a' }}>{c.sub}</span>
                </div>
                <h3 className="v5b-serif" style={{ fontSize:'clamp(28px,3vw,38px)', fontStyle:'italic', fontWeight:500, margin:'0 0 12px', letterSpacing:'-0.02em' }}>{c.t}</h3>
                <p style={{ fontSize:14, lineHeight:1.7, color:'#3a2a1a', margin:0 }}>{c.d}</p>
                <div style={{ display:'flex', alignItems:'center', gap:8, marginTop:24, fontSize:10, letterSpacing:'0.22em', textTransform:'uppercase', color:gold, fontWeight:600 }}>
                  Read on
                  <span style={{ flex:1, height:1, background:gold }} />
                  →
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="v5b-rule" />

        {/* Pull quote */}
        <section style={{ padding:'clamp(60px,8vw,100px) clamp(20px,4vw,56px)', textAlign:'center' }}>
          <p className="v5b-serif" style={{
            fontSize:'clamp(22px,3vw,34px)', fontStyle:'italic', fontWeight:400,
            lineHeight:1.4, margin:0, maxWidth:720, marginInline:'auto', color:'#3a2a1a',
          }}>
            “답은 한 곳에 있지 않습니다. <span style={{ color:gold }}>17가지 별이 모인 자리</span>, 거기서 천천히 떠오릅니다.”
          </p>
          <div style={{ marginTop:28, fontSize:10, letterSpacing:'0.3em', textTransform:'uppercase', color:'#7a6a5a' }}>— editor's note</div>
        </section>
      </div>
    </div>
  );
};

