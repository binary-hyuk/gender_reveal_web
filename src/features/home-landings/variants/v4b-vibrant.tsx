// @ts-nocheck — Claude Design 에서 받아온 풀 랜딩 프로토타입. 런타임만 정상 동작하면 OK.
// V4B — Aurora Playful (변형 B): 컬러풀 라이트 모드 우주
// 다크 대신 밝고 vibrant, 큰 spinning conic 오브 + 카드 스택형

export const V4B_Landing = () => {
  return (
    <div style={{
      width:'100%', minHeight:'100%',
      background:'linear-gradient(180deg, #fef0fa 0%, #f0e8ff 50%, #e8f4ff 100%)',
      position:'relative', overflow:'hidden',
      fontFamily:'"Pretendard Variable", Pretendard, sans-serif',
      letterSpacing:'-0.015em', color:'#1a0a3a',
    }}>
      <style>{`
        @keyframes v4b-spin { to { transform:rotate(360deg); } }
        @keyframes v4b-shine { 0%,100% { background-position:0% 50%; } 50% { background-position:100% 50%; } }
        .v4b-card { background:rgba(255,255,255,.55); backdrop-filter:blur(24px) saturate(180%); -webkit-backdrop-filter:blur(24px) saturate(180%); border:1px solid rgba(255,255,255,.7); border-radius:24px; box-shadow:0 16px 48px rgba(120,60,200,.12); }
        .v4b-nav { display:flex; align-items:center; justify-content:space-between; padding:14px 22px; border-radius:999px; }
        .v4b-link { font-size:14px; color:rgba(60,30,120,.7); cursor:pointer; }
        .v4b-link:hover { color:#5a2a9a; }
        .v4b-btn { display:inline-flex; align-items:center; gap:8px; padding:16px 26px; border-radius:14px; font-size:15px; font-weight:600; cursor:pointer; transition:transform .15s; border:none; }
        .v4b-btn:hover { transform:translateY(-2px); }
        .v4b-btn.primary { background:linear-gradient(135deg,#ff5a8a,#a06aff); color:#fff; box-shadow:0 12px 32px rgba(170,90,200,.35); }
        .v4b-btn.ghost { background:rgba(255,255,255,.7); color:#3a1a7a; border:1px solid rgba(160,100,255,.3); }
        .v4b-hero { display:grid; gap:clamp(40px,6vw,72px); grid-template-columns: 1fr 1fr; align-items:center; padding:clamp(60px,9vw,110px) 0; }
        @media (max-width: 900px) { .v4b-hero { grid-template-columns: 1fr; text-align:center; } .v4b-hero-cta { justify-content:center; } }
        .v4b-hero h1 { font-size:clamp(44px,7vw,90px); font-weight:700; letter-spacing:-0.035em; line-height:1; margin:20px 0 22px; text-wrap:balance; }
        .v4b-grad { background:linear-gradient(90deg,#ff5a8a,#a06aff,#5a8aff,#a06aff,#ff5a8a); background-size:300% auto; -webkit-background-clip:text; -webkit-text-fill-color:transparent; animation:v4b-shine 8s linear infinite; }
        .v4b-orb-stage { position:relative; aspect-ratio: 1; max-width:480px; margin:0 auto; width:100%; }
        .v4b-conic { position:absolute; inset:8%; border-radius:50%; background:conic-gradient(from 0deg, #ff5a8a, #a06aff, #5a8aff, #6ac4ff, #ff5a8a); filter:blur(8px); animation:v4b-spin 20s linear infinite; opacity:.85; }
        .v4b-conic-inner { position:absolute; inset:30%; border-radius:50%; background:linear-gradient(135deg,#fef0fa,#fff); box-shadow:inset 0 4px 24px rgba(255,255,255,.9); display:flex; align-items:center; justify-content:center; }
        .v4b-grid { display:grid; gap:18px; grid-template-columns: repeat(3, 1fr); margin-top:28px; }
        @media (max-width: 800px) { .v4b-grid { grid-template-columns: 1fr; } }
      `}</style>

      <div style={{ position:'relative', zIndex:2, padding:'14px clamp(16px,4vw,56px)' }}>
        <nav className="v4b-card v4b-nav">
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <div style={{ width:32, height:32, borderRadius:'50%', background:'conic-gradient(from 0deg,#ff5a8a,#a06aff,#5a8aff,#ff5a8a)' }} />
            <span style={{ fontSize:14, fontWeight:700 }}>Reveal</span>
          </div>
          <div style={{ display:'flex', gap:24 }}>
            <span className="v4b-link">홈</span>
            <span className="v4b-link">AI</span>
            <span className="v4b-link">플래너</span>
          </div>
          <button className="v4b-btn primary" style={{ padding:'10px 18px', fontSize:13 }}>예측 시작 →</button>
        </nav>

        <section className="v4b-hero">
          <div>
            <span style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'7px 16px', borderRadius:999, background:'rgba(255,255,255,.7)', border:'1px solid rgba(160,100,255,.3)', fontSize:12, fontWeight:600, color:'#5a2a9a' }}>
              <span style={{ width:6, height:6, borderRadius:'50%', background:'#ff5a8a' }} />
              ✦ 우주의 17가지 신호
            </span>
            <h1>
              <span className="v4b-grad">아기의 별</span>이<br/>
              속삭이는 답.
            </h1>
            <p style={{ fontSize:'clamp(15px,1.7vw,18px)', lineHeight:1.7, color:'rgba(60,30,120,.7)', margin:0, maxWidth:480 }}>
              17가지 전통·현대 예측법을 AI가 종합해 단 30초만에 전해드립니다. 별의 답을 들어보세요.
            </p>
            <div className="v4b-hero-cta" style={{ display:'flex', gap:14, flexWrap:'wrap', marginTop:32 }}>
              <button className="v4b-btn primary">
                ✨ 지금 별에게 묻기
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
              </button>
              <button className="v4b-btn ghost">🎯 원하는 성별로</button>
            </div>
          </div>

          <div className="v4b-orb-stage">
            <div className="v4b-conic" />
            <div className="v4b-conic-inner">
              <div style={{ textAlign:'center' }}>
                <div style={{ fontSize:11, letterSpacing:'0.2em', color:'#a06aff', fontWeight:700 }}>17 METHODS</div>
                <div style={{ fontSize:'clamp(40px,5vw,60px)', fontWeight:700, color:'#5a2a9a', margin:'8px 0', letterSpacing:'-0.03em' }}>♀ ♂</div>
                <div style={{ fontSize:11, color:'rgba(60,30,120,.6)' }}>AI가 종합 중…</div>
              </div>
            </div>
            {/* mini orbiting cards */}
            {[['중국 황실력', 0],['수비학', 90],['마야 달력', 180],['오행 사주', 270]].map(([t,a],i)=>{
              const r = 220, x = Math.cos(a*Math.PI/180)*0.45+0.5, y = Math.sin(a*Math.PI/180)*0.45+0.5;
              return (
                <div key={i} style={{
                  position:'absolute', left:`${x*100}%`, top:`${y*100}%`, transform:'translate(-50%,-50%)',
                  background:'rgba(255,255,255,.85)', border:'1px solid rgba(160,100,255,.25)',
                  padding:'6px 10px', borderRadius:999, fontSize:11, fontWeight:600,
                  boxShadow:'0 8px 20px rgba(120,60,200,.15)',
                }}>{t}</div>
              );
            })}
          </div>
        </section>

        {/* Three benefits */}
        <section style={{ paddingBottom:'clamp(60px,8vw,100px)' }}>
          <h2 style={{ fontSize:'clamp(24px,3vw,32px)', fontWeight:700, letterSpacing:'-0.025em', margin:0, textAlign:'center' }}>왜 다를까요?</h2>
          <div className="v4b-grid">
            {[
              { e:'🌈', t:'17개의 합산', d:'한 가지가 아닌 17가지 관점을 가중평균합니다.' },
              { e:'⚡', t:'30초 결과', d:'생년월일과 시기만 입력하면 즉시 분석.' },
              { e:'🔮', t:'역방향 모드', d:'원하는 성별로부터 조건을 거꾸로 추천합니다.' },
            ].map((f,i)=>(
              <div key={i} className="v4b-card" style={{ padding:24 }}>
                <div style={{ fontSize:36 }}>{f.e}</div>
                <h3 style={{ fontSize:18, fontWeight:700, margin:'14px 0 6px', letterSpacing:'-0.015em' }}>{f.t}</h3>
                <p style={{ fontSize:13, lineHeight:1.65, color:'rgba(60,30,120,.7)', margin:0 }}>{f.d}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

