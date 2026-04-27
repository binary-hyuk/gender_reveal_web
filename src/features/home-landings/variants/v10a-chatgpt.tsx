// @ts-nocheck — Claude Design 에서 받아온 풀 랜딩 프로토타입. 런타임만 정상 동작하면 OK.
// V10A — ChatGPT 스타일 풀 랜딩
// 화이트 + 블랙 + 민트 그린. 중앙 hero + 스타터 프롬프트 + 하단 composer

export const V10A_Landing = () => {
  const ink = '#0d0d0d';
  const mint = '#10a37f';
  return (
    <div style={{
      width:'100%', minHeight:'100%',
      background:'#fff',
      position:'relative', overflow:'hidden',
      fontFamily:'"Pretendard Variable", Pretendard, sans-serif',
      letterSpacing:'-0.015em', color:ink,
    }}>
      <style>{`
        .v10a-nav { display:flex; align-items:center; justify-content:space-between; padding:14px clamp(20px,4vw,56px); border-bottom:1px solid #ececec; }
        .v10a-link { font-size:14px; color:#6b6b6b; cursor:pointer; }
        .v10a-link:hover { color:${ink}; }
        .v10a-btn { display:inline-flex; align-items:center; gap:8px; padding:14px 22px; border-radius:999px; font-size:14px; font-weight:500; cursor:pointer; border:none; transition:.15s; }
        .v10a-btn.primary { background:${ink}; color:#fff; }
        .v10a-btn.primary:hover { background:#333; }
        .v10a-btn.ghost { background:transparent; color:${ink}; border:1px solid #d9d9d9; }
        .v10a-btn.ghost:hover { background:#f5f5f5; }
        .v10a-prompt-grid { display:grid; gap:12px; grid-template-columns: repeat(2, 1fr); margin-top:32px; max-width:680px; margin-inline:auto; }
        @media (max-width: 600px) { .v10a-prompt-grid { grid-template-columns: 1fr; } }
        .v10a-prompt { padding:16px 18px; border:1px solid #ececec; border-radius:14px; cursor:pointer; transition:.15s; text-align:left; background:#fff; }
        .v10a-prompt:hover { background:#fafafa; border-color:#d9d9d9; }
        .v10a-card-grid { display:grid; gap:16px; grid-template-columns: repeat(3, 1fr); margin-top:24px; }
        @media (max-width: 800px) { .v10a-card-grid { grid-template-columns: 1fr; } }
      `}</style>

      <nav className="v10a-nav">
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ width:30, height:30, borderRadius:'50%', background:ink, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff"><path d="M12 2l2.4 5.6L20 10l-5.6 2.4L12 18l-2.4-5.6L4 10l5.6-2.4z"/></svg>
          </div>
          <span style={{ fontSize:15, fontWeight:600 }}>Reveal</span>
        </div>
        <div style={{ display:'flex', gap:28 }}>
          <span className="v10a-link" style={{ color:ink, fontWeight:500 }}>홈</span>
          <span className="v10a-link">예측</span>
          <span className="v10a-link">플래너</span>
          <span className="v10a-link">방법 17</span>
        </div>
        <button className="v10a-btn primary" style={{ padding:'8px 16px', fontSize:13 }}>로그인</button>
      </nav>

      <main style={{ padding:'clamp(60px,9vw,110px) clamp(20px,4vw,56px) 0', maxWidth:1100, margin:'0 auto', textAlign:'center' }}>
        <div style={{ width:60, height:60, borderRadius:'50%', background:ink, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 28px' }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff"><path d="M12 2l2.4 5.6L20 10l-5.6 2.4L12 18l-2.4-5.6L4 10l5.6-2.4z"/></svg>
        </div>

        <h1 style={{
          fontSize:'clamp(40px,6.5vw,72px)', fontWeight:600, letterSpacing:'-0.035em',
          lineHeight:1.05, margin:'0 0 20px', textWrap:'balance',
        }}>
          무엇을 알아볼까요?
        </h1>
        <p style={{ fontSize:'clamp(15px,1.8vw,18px)', lineHeight:1.65, color:'#6b6b6b', margin:'0 auto', maxWidth:580 }}>
          17가지 전통·현대 예측법을 AI가 종합해 답해드립니다. 자유롭게 물어보세요.
        </p>

        {/* Composer */}
        <div style={{ maxWidth:680, margin:'40px auto 0', position:'relative' }}>
          <div style={{
            display:'flex', alignItems:'center', gap:10,
            border:'1px solid #d9d9d9', borderRadius:28,
            padding:'14px 8px 14px 20px',
            boxShadow:'0 1px 3px rgba(0,0,0,.04)',
          }}>
            <span style={{ flex:1, fontSize:15, color:'#9b9b9b', textAlign:'left' }}>
              예) 2025년 8월에 임신했어요. 아들일까요 딸일까요?
            </span>
            <button style={{ width:36, height:36, borderRadius:'50%', border:'none', background:ink, color:'#fff', fontSize:14, cursor:'pointer' }}>↑</button>
          </div>
          <div className="v10a-prompt-grid">
            {[
              ['✦', 'AI로 17가지 종합 예측'],
              ['◎', '원하는 성별로 시작 (플래너)'],
              ['📅', '가임시기 거꾸로 계산'],
              ['📚', '17가지 방법 살펴보기'],
            ].map(([i,t],k)=>(
              <button key={k} className="v10a-prompt">
                <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                  <span style={{ fontSize:18 }}>{i}</span>
                  <span style={{ fontSize:14, fontWeight:500 }}>{t}</span>
                </div>
              </button>
            ))}
          </div>
          <div style={{ fontSize:12, color:'#9b9b9b', marginTop:14 }}>
            AI는 실수할 수 있어요. 결과는 참고용입니다.
          </div>
        </div>
      </main>

      {/* Capabilities */}
      <section style={{ padding:'clamp(80px,10vw,120px) clamp(20px,4vw,56px) clamp(40px,6vw,80px)', maxWidth:1100, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:48 }}>
          <span style={{ fontSize:13, fontWeight:600, color:mint, letterSpacing:'0.04em' }}>● Capabilities</span>
          <h2 style={{ fontSize:'clamp(28px,3.6vw,42px)', fontWeight:600, letterSpacing:'-0.025em', margin:'10px 0 0' }}>
            Reveal로 할 수 있는 것
          </h2>
        </div>
        <div className="v10a-card-grid">
          {[
            { e:'✦', t:'17가지 종합', d:'서로 다른 관점을 가중평균해 가장 가능성 높은 답을 알려드립니다.' },
            { e:'◎', t:'역방향 추천', d:'원하는 성별에서 출발해 시기와 조건을 거꾸로 받아보세요.' },
            { e:'📊', t:'근거 추적', d:'각 방법이 어떤 결과를 냈는지 항목별로 모두 확인할 수 있어요.' },
          ].map((f,i)=>(
            <div key={i} style={{ padding:24, border:'1px solid #ececec', borderRadius:14 }}>
              <div style={{ width:40, height:40, borderRadius:10, background:'#f5f5f5', display:'flex', alignItems:'center', justifyContent:'center', fontSize:20 }}>{f.e}</div>
              <h3 style={{ fontSize:18, fontWeight:600, margin:'14px 0 6px', letterSpacing:'-0.015em' }}>{f.t}</h3>
              <p style={{ fontSize:14, lineHeight:1.65, color:'#6b6b6b', margin:0 }}>{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{ padding:'0 clamp(20px,4vw,56px) clamp(60px,8vw,100px)', maxWidth:1100, margin:'0 auto' }}>
        <div style={{ background:ink, color:'#fff', borderRadius:24, padding:'clamp(40px,6vw,72px)', textAlign:'center' }}>
          <h2 style={{ fontSize:'clamp(28px,4vw,48px)', fontWeight:600, letterSpacing:'-0.025em', margin:'0 0 16px', textWrap:'balance' }}>
            지금, 가장 궁금했던 답을<br/>30초 안에.
          </h2>
          <p style={{ fontSize:15, color:'rgba(255,255,255,.7)', margin:'0 0 28px' }}>가입 없이 무료로 시작</p>
          <button className="v10a-btn" style={{ background:'#fff', color:ink, fontSize:15, padding:'16px 28px' }}>
            예측 시작하기 →
          </button>
        </div>
      </section>
    </div>
  );
};

