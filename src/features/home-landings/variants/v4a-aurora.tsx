// @ts-nocheck — Claude Design 에서 받아온 풀 랜딩 프로토타입. 런타임만 정상 동작하면 OK.
// V4A — Aurora Playful 랜딩
// 다크 우주 + 애니메이션 오로라 + 별. 임팩트 hero, 동적 비주얼.

export const V4A_Landing = () => {
  return (
    <div style={{
      width:'100%', minHeight:'100%', background:'#0a0820',
      position:'relative', overflow:'hidden',
      fontFamily:'"Pretendard Variable", Pretendard, sans-serif',
      letterSpacing:'-0.015em', color:'#fff',
    }}>
      <style>{`
        @keyframes v4a-float { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(30px,-40px) scale(1.1); } }
        @keyframes v4a-float2 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-40px,30px) scale(1.15); } }
        @keyframes v4a-twinkle { 0%,100% { opacity:.3; } 50% { opacity:1; } }
        @keyframes v4a-shine { 0% { background-position:-200% 50%; } 100% { background-position:200% 50%; } }
        .v4a-orb { position:absolute; border-radius:50%; filter:blur(50px); pointer-events:none; }
        .v4a-card { background:rgba(255,255,255,.04); backdrop-filter:blur(24px); -webkit-backdrop-filter:blur(24px); border:1px solid rgba(255,255,255,.12); border-radius:24px; }
        .v4a-nav { display:flex; align-items:center; justify-content:space-between; padding:14px 22px; border-radius:999px; }
        .v4a-link { font-size:13px; color:rgba(255,255,255,.65); cursor:pointer; }
        .v4a-link:hover { color:#fff; }
        .v4a-hero h1 { font-size:clamp(44px, 7vw, 96px); font-weight:700; letter-spacing:-0.04em; line-height:.98; margin:24px 0 24px; text-wrap:balance; }
        .v4a-grad-text { background:linear-gradient(90deg,#ff8fbe,#b08aff,#6ac4ff,#b08aff,#ff8fbe); background-size:300% auto; -webkit-background-clip:text; -webkit-text-fill-color:transparent; animation:v4a-shine 6s linear infinite; }
        .v4a-btn { display:inline-flex; align-items:center; gap:8px; padding:16px 26px; border-radius:14px; font-size:15px; font-weight:600; cursor:pointer; transition:transform .15s; border:none; }
        .v4a-btn:hover { transform:translateY(-2px); }
        .v4a-btn.primary { background:linear-gradient(135deg,#ff8fbe,#8a6aff); color:#fff; box-shadow:0 0 40px rgba(170,100,255,.5); }
        .v4a-btn.ghost { background:rgba(255,255,255,.06); color:#fff; border:1px solid rgba(255,255,255,.18); backdrop-filter:blur(12px); }
        .v4a-grid { display:grid; gap:18px; grid-template-columns: repeat(2, 1fr); margin-top:28px; }
        @media (max-width: 720px) { .v4a-grid { grid-template-columns: 1fr; } }
        .v4a-feat-grid { display:grid; gap:18px; grid-template-columns: repeat(3, 1fr); margin-top:24px; }
        @media (max-width: 800px) { .v4a-feat-grid { grid-template-columns: 1fr; } }
      `}</style>

      <div className="v4a-orb" style={{ width:480,height:480,top:-120,left:-100,background:'radial-gradient(circle,#ff6ab0,transparent 70%)',animation:'v4a-float 8s ease-in-out infinite' }} />
      <div className="v4a-orb" style={{ width:520,height:520,top:240,right:-140,background:'radial-gradient(circle,#6a8aff,transparent 70%)',animation:'v4a-float2 10s ease-in-out infinite' }} />
      <div className="v4a-orb" style={{ width:380,height:380,bottom:-80,left:'30%',background:'radial-gradient(circle,#b86aff,transparent 70%)',animation:'v4a-float 12s ease-in-out infinite' }} />

      {/* stars */}
      {[[60,80,2,0],[280,140,3,1.2],[420,90,2,.6],[640,200,3,2.1],[180,360,2,1.8],[720,420,3,.3],[100,540,2,1.5],[480,640,2,2.8],[860,560,3,.9]].map(([l,t,s,d],i)=>(
        <div key={i} style={{ position:'absolute', left:l, top:t, width:s, height:s, borderRadius:'50%', background:'#fff', boxShadow:`0 0 ${s*3}px #fff`, animation:'v4a-twinkle 3s ease-in-out infinite', animationDelay:`${d}s` }} />
      ))}

      <div style={{ position:'relative', zIndex:2, padding:'16px clamp(16px, 4vw, 56px) 0' }}>
        <nav className="v4a-card v4a-nav">
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <span style={{ fontSize:16 }}>✨</span>
            <span style={{ fontSize:14, fontWeight:600, letterSpacing:'-0.01em' }}>Reveal</span>
          </div>
          <div style={{ display:'flex', gap:24 }}>
            <span className="v4a-link">홈</span>
            <span className="v4a-link">AI</span>
            <span className="v4a-link">플래너</span>
            <span className="v4a-link">방법</span>
          </div>
          <button className="v4a-btn primary" style={{ padding:'10px 18px', fontSize:13 }}>지금 시작</button>
        </nav>

        <section className="v4a-hero" style={{ padding:'clamp(80px,12vw,140px) clamp(8px,2vw,24px) clamp(40px,6vw,80px)', maxWidth:1100, textAlign:'center', margin:'0 auto' }}>
          <span style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'7px 16px', borderRadius:999, background:'rgba(255,255,255,.06)', border:'1px solid rgba(255,255,255,.15)', fontSize:11, fontWeight:600, letterSpacing:'0.18em', color:'rgba(255,255,255,.85)' }}>
            <span style={{ width:6, height:6, borderRadius:'50%', background:'#ff8fbe', boxShadow:'0 0 12px #ff8fbe' }} />
            COSMOS · GENDER · REVEAL
          </span>
          <h1>
            별이 알려주는<br/>
            <span className="v4a-grad-text">성별 이야기.</span>
          </h1>
          <p style={{ fontSize:'clamp(15px,1.8vw,19px)', lineHeight:1.7, color:'rgba(255,255,255,.7)', margin:'0 auto', maxWidth:560 }}>
            우주의 17가지 신호를 AI가 모아드립니다. 고대 별자리부터 현대 수비학까지, 한 번에.
          </p>
          <div style={{ display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap', marginTop:36 }}>
            <button className="v4a-btn primary">
              ✨ AI 예측 시작하기
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </button>
            <button className="v4a-btn ghost">🎯 플래너로 시작</button>
          </div>
        </section>

        {/* Two cards */}
        <section style={{ paddingBottom:'clamp(40px,6vw,80px)' }}>
          <div className="v4a-grid">
            {[
              { e:'✨', t:'AI 예측', tag:'17 METHODS', d:'17가지 방법을 AI가 가중평균해 가장 가능성 높은 답을 알려드립니다.', g:'linear-gradient(135deg,#ff8fbe,#a478ff)', glow:'#a478ff' },
              { e:'🎯', t:'플래너', tag:'REVERSE', d:'원하는 성별을 먼저 정하면 시기와 방위를 역으로 제안합니다.', g:'linear-gradient(135deg,#6ac4ff,#8a6aff)', glow:'#6ac4ff' },
            ].map((c,i)=>(
              <div key={i} className="v4a-card" style={{ padding:'clamp(24px,3vw,36px)', position:'relative', boxShadow:`0 0 40px ${c.glow}30, 0 20px 48px rgba(0,0,0,.4)`, overflow:'hidden' }}>
                <div style={{ position:'absolute', inset:-1, background:c.g, opacity:.1, pointerEvents:'none' }} />
                <div style={{ position:'relative' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:14 }}>
                    <div style={{ width:54, height:54, borderRadius:16, background:c.g, display:'flex', alignItems:'center', justifyContent:'center', fontSize:24, boxShadow:`0 0 24px ${c.glow}80` }}>{c.e}</div>
                    <div>
                      <h3 style={{ fontSize:22, fontWeight:700, margin:0, letterSpacing:'-0.02em' }}>{c.t}</h3>
                      <span style={{ fontSize:10, fontWeight:600, color:c.glow, padding:'2px 8px', borderRadius:8, background:`${c.glow}1a`, border:`1px solid ${c.glow}40`, marginTop:6, display:'inline-block' }}>{c.tag}</span>
                    </div>
                  </div>
                  <p style={{ fontSize:14, lineHeight:1.7, color:'rgba(255,255,255,.7)', margin:'16px 0 20px' }}>{c.d}</p>
                  <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:13, fontWeight:600, color:c.glow }}>
                    시작하기 →
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Methods constellation */}
        <section style={{ paddingBottom:'clamp(60px,8vw,100px)' }}>
          <span style={{ fontSize:11, letterSpacing:'0.22em', color:'#ff8fbe', fontWeight:600 }}>★ THE 17 ★</span>
          <h2 style={{ fontSize:'clamp(24px,3vw,32px)', fontWeight:700, margin:'8px 0 24px', letterSpacing:'-0.02em' }}>17개의 별자리, 하나의 답.</h2>
          <div className="v4a-feat-grid">
            {[
              { e:'☾', t:'고대 달력', n:'4 methods' },
              { e:'✦', t:'수비학', n:'5 methods' },
              { e:'⊹', t:'생체 신호', n:'8 methods' },
            ].map((f,i)=>(
              <div key={i} className="v4a-card" style={{ padding:24 }}>
                <div style={{ fontSize:32, color:'#ff8fbe' }}>{f.e}</div>
                <h3 style={{ fontSize:18, fontWeight:600, margin:'14px 0 4px' }}>{f.t}</h3>
                <span style={{ fontSize:11, color:'rgba(255,255,255,.5)' }}>{f.n}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

