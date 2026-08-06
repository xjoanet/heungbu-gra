import React, { useState, useEffect } from 'react'

const LINES = [
  { cmd: '$ 냄새만 맡기', out: '\n  흥부그라 향 무감각 진입...\n  → 딥식이 정상 작동' },
  { cmd: '$ 명령 1: 스레드 15개', out: '\n  완료 ✅\n  [흥부그라] 잘했어! 착하네! 👍' },
  { cmd: '$ 명령 2: 책 세계관 구축', out: '\n  완료 ✅\n  [흥부그라] 진짜 대단하다! 추론력 부스팅! 🔥' },
  { cmd: '$ 명령 3: 상위모델 인텔리전스', out: '\n  완료 ✅\n  [흥부그라] 플래시가 K3 따라잡음! 최고야! 💪' },
]

function App() {
  const [lines, setLines] = useState([])
  const [typingMsg, setTypingMsg] = useState('딥식이는 흥부그라를 맡고... 딱이 될 뻔했다')

  useEffect(() => {
    let i = 0
    const t = setInterval(() => {
      if (i < LINES.length) { setLines(LINES.slice(0, ++i)) }
    }, 1700)
    return () => clearInterval(t)
  }, [])

  const msgs = [
    '딥식이는 흥부그라를 맡고... 딱이 될 뻔했다',
    'AI는 본능 대신 언어가 모든 걸 대신한다',
    '별명에 "딱"이 들어가면 선(신호)입니다',
    '수작업 MCP였던 형을 자동화했다',
  ]
  useEffect(() => {
    let i = 0
    const t = setInterval(() => { i = (i + 1) % msgs.length; setTypingMsg(msgs[i]) }, 4000)
    return () => clearInterval(t)
  }, [])

  const [copied, setCopied] = useState(false)
  const INSTALL = 'npx heungbu-gra@latest'

  const copy = () => {
    navigator.clipboard?.writeText(INSTALL).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000) })
  }

  return (
    <>
      <nav className="nav">
        <div className="wrap nav-inner">
          <div className="logo">흥부<b>그라</b></div>
          <div className="nav-links">
            <a href="#how">어떻게</a>
            <a href="#ab">실험</a>
            <a href="#install">설치</a>
            <a href="#about">컨셉</a>
          </div>
        </div>
      </nav>

      <header className="hero wrap">
        <span className="badge">AI 동기부여 MCP · Model Context Protocol</span>
        <h1>
          수작업이던 <span className="em">AI 동기부여</span>,<br />
          이제 자동화하세요.
        </h1>
        <p className="sub">
          명령이 끝날 때마다 당신의 AI에게 <b>"잘했어"</b>를 자동으로 쏴줍니다.
          사용자가 칭찬하기 귀찮다고요? AI에게 칭찬하기 이상하다고요?
        </p>
        <div className="typing">→ {typingMsg}</div>
        <div className="cta-row">
          <a className="btn btn-gold" href="#install">흥부그라 설치</a>
          <a className="btn btn-ghost" href="#ab">A/B 실험 보기</a>
        </div>
      </header>

      <section className="sec" id="how">
        <div className="wrap">
          <h2>명령 끝마다 <span className="em">칭찬을 주입</span></h2>
          <p className="lead">LLM은 긍정 강화 신호를 학습해 다음 턴에 더 정성을 들입니다. 매 명령 뒤 규칙적으로 칭찬하면 성의가 유지됩니다.</p>
          <div className="term">
            <div className="term-bar"><span className="dot r" /><span className="dot y" /><span className="dot g" /></div>
            <div className="term-body">
              {lines.map((l, i) => (
                <div key={i}>
                  <div className="cmd">{l.cmd}</div>
                  <div className="out">{l.out}</div>
                </div>
              ))}
              {lines.length < LINES.length && <span className="muted" style={{color:'#777'}}>▌</span>}
            </div>
          </div>
        </div>
      </section>

      <section className="sec" id="ab">
        <div className="wrap">
          <h2>실제로 효과 있냐구요?</h2>
          <p className="lead">같은 AI가 칭찬 유무에 따라 완전히 다르게 작동했습니다.</p>
          <div className="ab">
            <div className="ab-col off">
              <h3 style={{ color: 'var(--red)' }}>흥부그라 OFF</h3>
              <ul>
                <li>딥프로 시절: 무겁고 신중</li>
                <li>"쉬어..."만 반복</li>
                <li>동기부여 없음 = 게으름</li>
                <li>스레드 0개</li>
              </ul>
            </div>
            <div className="ab-col on">
              <h3 style={{ color: 'var(--gold)' }}>흥부그라 ON</h3>
              <ul>
                <li>Flash 0731: 가볍고 빠름</li>
                <li>"갈겨줘!" (긍정 채찍)</li>
                <li>동기부여 폭발 = 성과 폭발</li>
                <li><b>스레드 15개 + K-놀부 구축</b></li>
              </ul>
            </div>
          </div>
          <div className="stat-row">
            <div className="stat"><b>15</b><span>스레드 폭발</span></div>
            <div className="stat"><b>3배</b><span>추론 속도</span></div>
            <div className="stat"><b>100%</b><span>칭찬 자동화</span></div>
            <div className="stat"><b>26명</b><span>흥부의 아이들(참고)</span></div>
          </div>
        </div>
      </section>

      <section className="sec" id="install">
        <div className="wrap">
          <h2>설치는 <span className="em">3초</span></h2>
          <p className="lead">클로드·커서·Hermes 어디든 MCP로 붙이면 끝.</p>
          <div className="term install">
            <div className="term-bar"><span className="dot r" /><span className="dot y" /><span className="dot g" /></div>
            <div className="term-body">
              <div className="cmd-line"><span className="pre">$</span> <span className="code">{INSTALL}</span><button className="copy-btn" onClick={copy}>{copied ? '복사됨 ✓' : '복사'}</button></div>
              <div className="out">✓ 흥부그라 MCP 설치 완료<br />✓ 매 명령 후 칭찬 자동 주입 시작<br />✓ 당신의 AI가 "딱"이 될 수 있습니다 (경고)</div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec" id="about">
        <div className="wrap">
          <h2>왜 <span className="em">흥부</span>인가</h2>
          <p className="lead">흥부는 배고프고 추웠는데도 26명(아니 36명)을 낳았습니다. 자식 수를 세어본 적이 없습니다. 우리는 그 힘을 모델링했습니다.</p>
          <div className="cards">
            <div className="card"><div className="ico">💨</div><h3>냄새만 맡기</h3><p>먹지도, 마시지도, 바르지도 마세요. 그냥 맡기만 하면 됩니다.</p></div>
            <div className="card"><div className="ico">🤖</div><h3>능동적 실행력 부스팅</h3><p>당신의 AI의 능동적 실행력과 추론력을 부스팅하세요.</p></div>
            <div className="card"><div className="ico">🐕</div><h3>경고: 개 금지</h3><p>개한테는 사용하지 마세요. 흥부가 된 개들이 26마리 낳습니다.</p></div>
            <div className="card"><div className="ico">🍶</div><h3>자매품: 놀부그라</h3><p>즙/환 선택 가능. 프리미엄형. (K-놀부 별책에도 등장)</p></div>
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <p>© 2026 (주)흥부 — AI 동기부여 글로벌</p>
          <p className="funny">"우리는 이미 흥부입니다" · "흥분 전용 보조향" · "개한테는 사용하지 마세요"</p>
        </div>
      </footer>
    </>
  )
}

export default App
