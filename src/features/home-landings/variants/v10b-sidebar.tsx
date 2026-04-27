// @ts-nocheck — Claude Design 에서 받아온 풀 랜딩 프로토타입. 런타임만 정상 동작하면 OK.
// V10B — ChatGPT 변형: 사이드바 레이아웃 + 대화 미리보기
// 좌측 사이드 + 메인. 데스크톱 풀 경험, 모바일 stack

export const V10B_Landing = () => {
  const ink = '#0d0d0d';
  return (
    <div style={{
      width:'100%', minHeight:'100%',
      background:'#fff',
      position:'relative', overflow:'hidden',
      fontFamily:'"Pretendard Variable", Pretendard, sans-serif',
      letterSpacing:'-0.015em', color:ink,
    }}>
      <style>{`
        .v10b-shell { display:grid; grid-template-columns: 280px 1fr; min-height:100vh; }
        @media (max-width: 900px) { .v10b-shell { grid-template-columns: 1fr; } .v10b-sidebar { display:none; } }
        .v10b-sidebar { background:#f7f7f8; border-right:1px solid #ececec; padding:20px 12px; }
        .v10b-side-btn { display:flex; align-items:center; gap:10px; padding:12px 14px; border-radius:10px; font-size:14px; cursor:pointer; color:${ink}; }
        .v10b-side-btn.new { border:1px solid #d9d9d9; background:#fff; font-weight:500; margin-bottom:14px; }
        .v10b-side-btn:hover { background:#ececec; }
        .v10b-side-section { font-size:11px; letter-spacing:.04em; color:#8b8b8b; padding:12px 14px 6px; font-weight:500; text-transform:uppercase; }
        .v10b-thread { font-size:13px; padding:10px 14px; border-radius:8px; cursor:pointer; color:#3a3a3a; }
        .v10b-thread:hover { background:#ececec; }
        .v10b-main { padding:clamp(40px,6vw,80px) clamp(20px,4vw,56px); display:flex; flex-direction:column; align-items:center; justify-content:center; }
        .v10b-main-inner { width:100%; max-width:760px; }
        .v10b-msg { display:flex; gap:14px; padding:18px 0; }
        .v10b-avatar { width:32px; height:32px; border-radius:50%; flex-shrink:0; display:flex; align-items:center; justify-content:center; font-size:14px; font-weight:600; }
        .v10b-bubble { flex:1; }
        .v10b-prompt-grid { display:grid; gap:10px; grid-template-columns: repeat(2, 1fr); margin-top:20px; }
        @media (max-width: 600px) { .v10b-prompt-grid { grid-template-columns: 1fr; } }
        .v10b-prompt { padding:14px 16px; border:1px solid #ececec; border-radius:12px; cursor:pointer; text-align:left; background:#fff; transition:.15s; }
        .v10b-prompt:hover { background:#fafafa; }
      `}</style>

      <div className="v10b-shell">
        {/* Sidebar */}
        <aside className="v10b-sidebar">
          <button className="v10b-side-btn new" style={{ width:'100%' }}>
            <span style={{ fontSize:16 }}>＋</span> 새 예측
          </button>
          <div className="v10b-side-section">오늘</div>
          <div className="v10b-thread">2024년 8월 임신 · AI 예측</div>
          <div className="v10b-thread">딸을 원해요 · 플래너</div>
          <div className="v10b-side-section">지난 7일</div>
          <div className="v10b-thread">중국 황실력 단독</div>
          <div className="v10b-thread">수비학 결과 비교</div>
          <div className="v10b-thread">마야 달력 변환</div>
          <div className="v10b-side-section">탐색</div>
          <div className="v10b-thread">📚 17가지 방법</div>
          <div className="v10b-thread">📅 가임시기 도구</div>
          <div className="v10b-thread">⚙ 설정</div>

          <div style={{ position:'absolute', bottom:20, left:12, right:12 }}>
            <div style={{ display:'flex', alignItems:'center', gap:10, padding:10, borderRadius:10 }}>
              <div style={{ width:30, height:30, borderRadius:'50%', background:'#10a37f', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, fontWeight:600 }}>J</div>
              <div style={{ fontSize:13, fontWeight:500 }}>김지영<br/><span style={{ fontSize:11, color:'#8b8b8b', fontWeight:400 }}>Free plan</span></div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="v10b-main">
          <div className="v10b-main-inner">
            <div style={{ textAlign:'center', marginBottom:32 }}>
              <div style={{ width:50, height:50, borderRadius:'50%', background:ink, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 18px' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff"><path d="M12 2l2.4 5.6L20 10l-5.6 2.4L12 18l-2.4-5.6L4 10l5.6-2.4z"/></svg>
              </div>
              <h1 style={{ fontSize:'clamp(28px,4vw,40px)', fontWeight:600, letterSpacing:'-0.025em', margin:0 }}>
                Reveal에 오신 걸 환영해요
              </h1>
              <p style={{ fontSize:15, color:'#6b6b6b', marginTop:10 }}>
                무엇이든 물어보세요. 17가지 방법으로 답해드립니다.
              </p>
            </div>

            {/* Sample conversation preview */}
            <div style={{ border:'1px solid #ececec', borderRadius:14, padding:'8px 20px 14px', background:'#fafafa' }}>
              <div className="v10b-msg">
                <div className="v10b-avatar" style={{ background:'#10a37f', color:'#fff' }}>J</div>
                <div className="v10b-bubble">
                  <div style={{ fontSize:14, fontWeight:500, marginBottom:4 }}>나</div>
                  <div style={{ fontSize:14, color:'#3a3a3a' }}>1992년 4월생, 2025년 8월에 임신했어요. 아들일까요 딸일까요?</div>
                </div>
              </div>
              <div className="v10b-msg" style={{ borderTop:'1px solid #ececec' }}>
                <div className="v10b-avatar" style={{ background:ink, color:'#fff' }}>R</div>
                <div className="v10b-bubble">
                  <div style={{ fontSize:14, fontWeight:500, marginBottom:6 }}>Reveal</div>
                  <div style={{ fontSize:14, color:'#3a3a3a', lineHeight:1.65 }}>
                    17가지 방법 중 11개가 <strong style={{ color:'#d83a78' }}>딸</strong>을 가리키고 있어요. 가장 강한 신호는…
                  </div>
                  <div style={{ display:'flex', gap:8, marginTop:10, flexWrap:'wrap' }}>
                    {['중국 황실력 → 딸', '수비학 → 딸', '마야 달력 → 딸', '오행 사주 → 아들'].map((t,i)=>(
                      <span key={i} style={{ fontSize:11, padding:'5px 10px', borderRadius:6, background:'#fff', border:'1px solid #ececec', fontWeight:500, color: t.endsWith('딸') ? '#d83a78' : '#1a73e8' }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Composer */}
            <div style={{ marginTop:24, position:'sticky', bottom:0, background:'#fff' }}>
              <div style={{ display:'flex', alignItems:'center', gap:10, border:'1px solid #d9d9d9', borderRadius:24, padding:'12px 8px 12px 18px', boxShadow:'0 4px 12px rgba(0,0,0,.05)' }}>
                <span style={{ fontSize:18, color:'#8b8b8b' }}>＋</span>
                <span style={{ flex:1, fontSize:14, color:'#9b9b9b' }}>Reveal에 메시지를 보내세요...</span>
                <button style={{ width:32, height:32, borderRadius:'50%', border:'none', background:ink, color:'#fff', fontSize:13, cursor:'pointer' }}>↑</button>
              </div>
              <div className="v10b-prompt-grid">
                {[
                  ['✦', '17가지로 종합 예측'],
                  ['◎', '원하는 성별로 시작'],
                  ['📅', '가임시기 계산'],
                  ['📊', '결과 비교 보기'],
                ].map(([i,t],k)=>(
                  <button key={k} className="v10b-prompt">
                    <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                      <span>{i}</span>
                      <span style={{ fontSize:13, fontWeight:500 }}>{t}</span>
                    </div>
                  </button>
                ))}
              </div>
              <p style={{ fontSize:11, color:'#9b9b9b', textAlign:'center', marginTop:14 }}>
                AI는 실수할 수 있어요. 결과는 참고용입니다.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

