// @ts-nocheck — Claude Design 에서 받아온 풀 랜딩 프로토타입. 런타임만 정상 동작하면 OK.
// V1B — AS-IS 진화형 랜딩 (변형 B)
// 같은 파스텔 블루 팔레트지만 split hero (좌 텍스트 / 우 디바이스 미리보기)
// 인터랙티브 데모 카드 + 좌측 정렬, 더 프로덕트 중심.

export const V1B_Landing = () => {
  return (
    <div style={{
      width:'100%', minHeight:'100%',
      background:'linear-gradient(180deg, hsl(230 30% 95%) 0%, hsl(230 45% 90%) 100%)',
      position:'relative', overflow:'hidden',
      fontFamily:'"Pretendard Variable", Pretendard, sans-serif',
      letterSpacing:'-0.015em', color:'hsl(230 20% 13%)',
    }}>
      <style>{`
        .v1b-blob { position:absolute; border-radius:50%; filter:blur(70px); pointer-events:none; }
        .v1b-card { background:rgba(255,255,255,.6); backdrop-filter:blur(20px) saturate(160%); -webkit-backdrop-filter:blur(20px) saturate(160%); border:1px solid rgba(255,255,255,.7); border-radius:24px; box-shadow:0 12px 40px rgba(40,55,90,.12); }
        .v1b-nav { display:flex; align-items:center; justify-content:space-between; padding:14px 22px; }
        .v1b-link { font-size:14px; color:hsl(230 12% 42%); cursor:pointer; }
        .v1b-link:hover { color:hsl(230 54% 36%); }
        .v1b-hero { display:grid; gap:clamp(40px, 6vw, 72px); grid-template-columns: 1.05fr 1fr; align-items:center; padding:clamp(60px, 9vw, 110px) 0; }
        @media (max-width: 900px) { .v1b-hero { grid-template-columns: 1fr; } }
        .v1b-hero h1 { font-size:clamp(40px, 6.5vw, 76px); font-weight:600; letter-spacing:-0.035em; line-height:1; margin:24px 0 24px; text-wrap:balance; }
        .v1b-btn { display:inline-flex; align-items:center; gap:8px; padding:14px 22px; border-radius:14px; font-size:15px; font-weight:600; cursor:pointer; transition:transform .15s; border:none; }
        .v1b-btn:hover { transform:translateY(-1px); }
        .v1b-btn.primary { background:hsl(230 54% 36%); color:#fff; box-shadow:0 8px 24px hsl(230 54% 36% / .35); }
        .v1b-btn.text { background:transparent; color:hsl(230 20% 13%); }
        .v1b-phone { width: min(320px, 100%); aspect-ratio: 9/19; border-radius:40px; padding:8px; background:linear-gradient(160deg, #fff, hsl(230 30% 92%)); box-shadow:0 30px 80px rgba(40,55,90,.25), inset 0 1px 0 rgba(255,255,255,.9); margin:0 auto; }
        .v1b-screen { width:100%; height:100%; border-radius:32px; overflow:hidden; position:relative; background:linear-gradient(160deg, hsl(230 45% 86%), hsl(230 18% 96%)); padding:18px 14px; }
        .v1b-feat-grid { display:grid; gap:18px; grid-template-columns: repeat(3, 1fr); margin-top:24px; }
        @media (max-width: 800px) { .v1b-feat-grid { grid-template-columns: 1fr; } }
        .v1b-feat { padding:24px; border-radius:20px; background:rgba(255,255,255,.55); border:1px solid rgba(255,255,255,.7); }
      `}</style>

      <div className="v1b-blob" style={{ width:540, height:540, top:-200, right:-100, background:'hsl(230 70% 80%)', opacity:.4 }} />
      <div className="v1b-blob" style={{ width:420, height:420, top:300, left:-120, background:'hsl(280 55% 86%)', opacity:.35 }} />

      <div style={{ position:'relative', zIndex:2, padding:'14px clamp(16px, 4vw, 56px)' }}>
        <nav className="v1b-card v1b-nav">
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <div style={{ width:32, height:32, borderRadius:9, background:'hsl(230 54% 36%)', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:13 }}>GR</div>
            <span style={{ fontSize:14, fontWeight:600 }}>Reveal</span>
          </div>
          <div style={{ display:'flex', gap:24 }}>
            <span className="v1b-link">홈</span>
            <span className="v1b-link">AI 예측</span>
            <span className="v1b-link">플래너</span>
            <span className="v1b-link">방법 17</span>
          </div>
          <button className="v1b-btn primary" style={{ padding:'10px 18px', fontSize:13 }}>지금 예측 →</button>
        </nav>

        {/* split hero */}
        <section className="v1b-hero">
          <div>
            <span style={{
              display:'inline-flex', alignItems:'center', gap:8,
              padding:'7px 14px', borderRadius:999,
              background:'rgba(255,255,255,.7)', border:'1px solid rgba(255,255,255,.8)',
              fontSize:12, fontWeight:600, color:'hsl(230 54% 36%)',
            }}>
              <span style={{ width:6, height:6, borderRadius:'50%', background:'hsl(140 50% 50%)' }} />
              지금까지 12,400+명이 함께 했어요
            </span>
            <h1>
              아들일까,<br/>
              <span style={{ fontStyle:'italic', fontWeight:500, color:'hsl(230 54% 36%)' }}>딸일까.</span><br/>
              <span style={{ fontSize:'0.55em', color:'hsl(230 12% 42%)', fontWeight:500 }}>30초면 충분합니다.</span>
            </h1>
            <p style={{ fontSize:'clamp(15px, 1.7vw, 18px)', lineHeight:1.7, color:'hsl(230 12% 42%)', margin:0, maxWidth:480 }}>
              생년월일과 임신 시기만 알려주세요. 17가지 전통·현대 예측법을 AI가 종합해 가장 가능성 높은 답을 알려드립니다.
            </p>
            <div style={{ display:'flex', gap:14, flexWrap:'wrap', marginTop:32 }}>
              <button className="v1b-btn primary">
                무료로 시작하기
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
              </button>
              <button className="v1b-btn text">▶ 30초 데모 보기</button>
            </div>
            <div style={{ display:'flex', gap:24, marginTop:40, flexWrap:'wrap' }}>
              {[['17','방법'],['~30s','소요'],['98%','만족도']].map(([n,l],i)=>(
                <div key={i}>
                  <div style={{ fontSize:24, fontWeight:700, letterSpacing:'-0.02em', color:'hsl(230 54% 36%)' }}>{n}</div>
                  <div style={{ fontSize:12, color:'hsl(230 12% 42%)' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* phone preview */}
          <div className="v1b-phone">
            <div className="v1b-screen">
              <div style={{ height:24, display:'flex', justifyContent:'space-between', alignItems:'center', fontSize:11, fontWeight:600 }}>
                <span>9:41</span>
                <span>· · ·</span>
              </div>
              <div style={{ marginTop:24 }}>
                <div style={{ fontSize:10, letterSpacing:2, color:'hsl(230 54% 36%)', fontWeight:600 }}>RESULT · 분석 완료</div>
                <div style={{ fontSize:34, fontWeight:700, letterSpacing:'-0.02em', marginTop:8 }}>딸 ♀</div>
                <div style={{ fontSize:11, color:'hsl(230 12% 42%)', marginTop:4 }}>17가지 중 11개 일치</div>
              </div>
              <div style={{ marginTop:18, padding:14, background:'rgba(255,255,255,.7)', borderRadius:14 }}>
                <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, fontWeight:600 }}>
                  <span>확률</span>
                  <span style={{ color:'hsl(330 60% 50%)' }}>64.7%</span>
                </div>
                <div style={{ height:6, marginTop:8, borderRadius:3, background:'rgba(0,0,0,.06)', overflow:'hidden' }}>
                  <div style={{ width:'64.7%', height:'100%', background:'linear-gradient(90deg, hsl(330 60% 70%), hsl(330 60% 50%))' }} />
                </div>
              </div>
              <div style={{ marginTop:14, display:'flex', flexDirection:'column', gap:6 }}>
                {['중국 황실력','마야 달력','수비학','오행 사주'].map((m,i)=>(
                  <div key={i} style={{ display:'flex', justifyContent:'space-between', padding:'10px 12px', background:'rgba(255,255,255,.5)', borderRadius:10, fontSize:11 }}>
                    <span>{m}</span>
                    <span style={{ color: i<3 ? 'hsl(330 60% 50%)' : 'hsl(220 30% 50%)' }}>{i<3 ? '딸 ♀' : '아들 ♂'}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* features */}
        <section style={{ paddingTop:'clamp(40px, 6vw, 80px)', paddingBottom:'clamp(60px, 8vw, 100px)' }}>
          <h2 style={{ fontSize:'clamp(24px, 3.2vw, 36px)', fontWeight:600, letterSpacing:'-0.025em', margin:0, maxWidth:520 }}>
            왜 17가지를 한 번에 봐야 할까요?
          </h2>
          <p style={{ fontSize:14, color:'hsl(230 12% 42%)', maxWidth:520, marginTop:12, lineHeight:1.7 }}>
            한 가지 방법만 믿기엔 너무 다른 답을 내놓곤 합니다. AI가 합의점을 찾아드립니다.
          </p>

          <div className="v1b-feat-grid">
            {[
              { i:'⊹', t:'다관점 합산', d:'17개 방법의 결과를 가중평균해 단일 답으로 제시합니다.' },
              { i:'◐', t:'근거 추적', d:'어떤 방법이 어떤 결과를 냈는지 항목별로 모두 확인할 수 있어요.' },
              { i:'∾', t:'역추천 모드', d:'원하는 성별에서 출발해 유리한 시기·조건을 거꾸로 받아보세요.' },
            ].map((f, i) => (
              <div key={i} className="v1b-feat">
                <div style={{ width:40, height:40, borderRadius:12, background:'hsl(230 54% 36%)', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:20 }}>{f.i}</div>
                <h3 style={{ fontSize:18, fontWeight:600, margin:'16px 0 6px', letterSpacing:'-0.015em' }}>{f.t}</h3>
                <p style={{ fontSize:13, lineHeight:1.65, color:'hsl(230 12% 42%)', margin:0 }}>{f.d}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

