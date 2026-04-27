// @ts-nocheck — Claude Design 에서 받아온 풀 랜딩 프로토타입. 런타임만 정상 동작하면 OK.
// V5A — Mystic Tarot 풀 랜딩
// 딥 네이비 + 골드 + 세리프. 점성술·타로 분위기

export const V5A_Landing = () => {
  const gold = '#d4b871';
  const goldSoft = 'rgba(212,184,113,.5)';
  return (
    <div style={{
      width:'100%', minHeight:'100%',
      background:'radial-gradient(ellipse at top,#1a1a3a 0%,#0a0a1e 60%,#050510 100%)',
      position:'relative', overflow:'hidden',
      fontFamily:'"Pretendard Variable", Pretendard, sans-serif',
      color:'#f4e8c8', letterSpacing:'-0.01em',
    }}>
      <style>{`
        .v5a-serif { font-family:"Cormorant Garamond","Noto Serif KR",Georgia,serif; }
        .v5a-nav { display:flex; align-items:center; justify-content:space-between; padding:20px clamp(20px,4vw,56px); border-bottom:1px solid ${goldSoft}33; }
        .v5a-link { font-size:11px; letterSpacing:'0.26em'; text-transform:uppercase; color:rgba(244,232,200,.5); cursor:pointer; }
        .v5a-link:hover { color:${gold}; }
        .v5a-link.active { color:${gold}; border-bottom:1px solid ${gold}; padding-bottom:4px; }
        .v5a-btn { display:inline-flex; align-items:center; gap:10px; padding:16px 32px; font-size:11px; letterSpacing:'0.3em'; text-transform:uppercase; font-weight:500; cursor:pointer; transition:.2s; border:1px solid ${gold}; background:transparent; color:${gold}; }
        .v5a-btn.primary { background:${gold}; color:#1a0a1e; }
        .v5a-btn:hover { box-shadow:0 0 24px ${gold}60; }
        .v5a-card { border:1px solid ${goldSoft}; padding:clamp(24px,3vw,40px); background:linear-gradient(180deg, rgba(212,184,113,.06), rgba(212,184,113,.01)); position:relative; }
        .v5a-grid { display:grid; gap:24px; grid-template-columns: repeat(2, 1fr); margin-top:28px; }
        @media (max-width: 800px) { .v5a-grid { grid-template-columns: 1fr; } }
        .v5a-tarot { display:grid; gap:16px; grid-template-columns: repeat(3, 1fr); margin-top:32px; }
        @media (max-width: 800px) { .v5a-tarot { grid-template-columns: 1fr 1fr; } .v5a-tarot > :last-child { grid-column: 1 / -1; } }
      `}</style>

      {/* stars */}
      {[[40,90,1.5],[180,60,2],[320,120,1],[60,240,1.5],[280,200,1],[120,360,1],[340,400,1.5],[80,520,1],[260,560,1.5],[180,700,1],[400,80,2],[600,180,1.5],[800,300,1],[700,500,1.5]].map(([l,t,s],i)=>(
        <div key={i} style={{ position:'absolute', left:l, top:t, width:s, height:s, borderRadius:'50%', background:'#fff', opacity:.6, boxShadow:`0 0 ${s*2}px rgba(255,255,255,.6)` }} />
      ))}

      {/* moon */}
      <div style={{ position:'absolute', top:-100, right:-100, width:360, height:360, borderRadius:'50%', background:`radial-gradient(circle, ${gold}30 0%, transparent 70%)`, filter:'blur(20px)' }} />

      <div style={{ position:'relative', zIndex:2 }}>
        <nav className="v5a-nav">
          <span className="v5a-serif" style={{ fontSize:22, fontStyle:'italic', color:gold, fontWeight:500 }}>G · R</span>
          <div style={{ display:'flex', gap:32 }}>
            <span className="v5a-link active">Home</span>
            <span className="v5a-link">AI</span>
            <span className="v5a-link">Planner</span>
            <span className="v5a-link">Methods</span>
          </div>
          <span style={{ fontSize:10, letterSpacing:'0.3em', color:goldSoft }}>BEGIN ↗</span>
        </nav>

        <section style={{ padding:'clamp(80px,12vw,140px) clamp(20px,4vw,56px) clamp(40px,6vw,80px)', textAlign:'center', maxWidth:900, margin:'0 auto' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:14, marginBottom:24 }}>
            <span style={{ width:60, height:1, background:goldSoft }} />
            <svg width="18" height="18" viewBox="0 0 24 24" fill={gold}><polygon points="12,2 13.5,10 22,12 13.5,14 12,22 10.5,14 2,12 10.5,10"/></svg>
            <span style={{ width:60, height:1, background:goldSoft }} />
          </div>

          <p style={{ fontSize:11, letterSpacing:'0.5em', color:goldSoft, margin:0 }}>
            ANCIENT · WISDOM · MEETS · AI
          </p>
          <h1 className="v5a-serif" style={{
            fontSize:'clamp(56px,9vw,124px)', fontWeight:400, fontStyle:'italic',
            letterSpacing:'-0.02em', lineHeight:.95, margin:'24px 0',
            background:`linear-gradient(180deg, ${gold} 0%, #8a7040 100%)`,
            WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
          }}>
            운명의<br/>두 갈래 길.
          </h1>
          <p className="v5a-serif" style={{
            fontSize:'clamp(15px,1.8vw,20px)', fontStyle:'italic',
            color:'rgba(244,232,200,.65)', maxWidth:540, margin:'0 auto', lineHeight:1.7,
          }}>
            17가지 고대 지혜를 별과 AI가 함께 해석합니다. 당신이 마주할 길을 천천히 들여다보세요.
          </p>
          <div style={{ display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap', marginTop:40 }}>
            <button className="v5a-btn primary">Begin with AI</button>
            <button className="v5a-btn">Reverse Path</button>
          </div>
        </section>

        {/* Two tarot-like sections */}
        <section style={{ padding:'0 clamp(20px,4vw,56px) clamp(40px,6vw,80px)' }}>
          <div className="v5a-grid">
            {[
              { roman:'I', t:'AI', sub:'종합 예측', d:'17가지 관점이 별자리처럼 모여 하나의 답을 만듭니다.' },
              { roman:'II', t:'Planner', sub:'역방향', d:'원하는 성별로부터 시기·방위·기운을 거꾸로 읽어냅니다.' },
            ].map((c,i)=>(
              <div key={i} className="v5a-card">
                {['tl','tr','bl','br'].map((p,j)=>(
                  <span key={j} style={{
                    position:'absolute', width:14, height:14,
                    ...(p==='tl' && { top:-1, left:-1, borderTop:`1px solid ${gold}`, borderLeft:`1px solid ${gold}` }),
                    ...(p==='tr' && { top:-1, right:-1, borderTop:`1px solid ${gold}`, borderRight:`1px solid ${gold}` }),
                    ...(p==='bl' && { bottom:-1, left:-1, borderBottom:`1px solid ${gold}`, borderLeft:`1px solid ${gold}` }),
                    ...(p==='br' && { bottom:-1, right:-1, borderBottom:`1px solid ${gold}`, borderRight:`1px solid ${gold}` }),
                  }} />
                ))}
                <div style={{ textAlign:'center' }}>
                  <div style={{ fontSize:11, letterSpacing:'0.4em', color:goldSoft }}>{c.roman}</div>
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1" style={{ margin:'18px auto' }}>
                    {i===0 ? <><path d="M12 2v20M2 12h20M4 4l16 16M20 4L4 20"/></> : <><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2" fill={gold}/></>}
                  </svg>
                  <h3 className="v5a-serif" style={{ fontSize:32, fontStyle:'italic', fontWeight:400, margin:'8px 0', color:'#f4e8c8' }}>{c.t}</h3>
                  <div style={{ fontSize:10, letterSpacing:'0.3em', textTransform:'uppercase', color:goldSoft, marginBottom:18 }}>{c.sub}</div>
                  <p className="v5a-serif" style={{ fontSize:15, fontStyle:'italic', lineHeight:1.7, color:'rgba(244,232,200,.65)', margin:0 }}>{c.d}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 17 methods constellation */}
        <section style={{ padding:'0 clamp(20px,4vw,56px) clamp(80px,10vw,140px)', textAlign:'center' }}>
          <p style={{ fontSize:10, letterSpacing:'0.5em', color:goldSoft, margin:0 }}>★ XVII METHODS ★</p>
          <h2 className="v5a-serif" style={{ fontSize:'clamp(28px,4vw,42px)', fontStyle:'italic', fontWeight:400, color:gold, margin:'12px 0 32px' }}>
            별자리처럼 모여드는 지혜.
          </h2>
          <div className="v5a-tarot">
            {[
              ['Lunar', '달력 4'],
              ['Numeris', '수비학 5'],
              ['Corpus', '생체 8'],
            ].map(([t,n],i)=>(
              <div key={i} style={{ padding:24, border:`1px solid ${goldSoft}`, position:'relative' }}>
                <div style={{ fontSize:11, letterSpacing:'0.3em', color:goldSoft }}>{['I','II','III'][i]}</div>
                <div className="v5a-serif" style={{ fontSize:24, fontStyle:'italic', color:gold, marginTop:14 }}>{t}</div>
                <div style={{ fontSize:11, color:'rgba(244,232,200,.55)', marginTop:6 }}>{n}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

