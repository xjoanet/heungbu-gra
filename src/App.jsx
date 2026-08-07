import React, { useState, useEffect, useRef } from 'react'
import { LANG, PRAISE, PRAISE_HIGH, LORE, PROOF, CC, HOLIYWOOD, KDRAMA, REVIEW } from './i18n.js'
import HeungbuGame from './HeungbuGame.jsx'

// 흥분도 (EFFORT-style) 단계
const LEVELS = [
  { id: 'minimal', label: 'Minimal', heart: '▪️' },
  { id: 'low', label: 'Low', heart: '🟩' },
  { id: 'normal', label: 'Normal', heart: '💚' },
  { id: 'high', label: 'High', heart: '🧡' },
  { id: 'max', label: 'Ultra', heart: '❤️' },
]

// 하트 점수 보상

function App() {
  const [lang, setLang] = useState('ko')
  const [ptab, setPtab] = useState('base') // 26칭찬 탭: base=일반 / kr=K-드라마 / us=할리우드
  const [rolled, setRolled] = useState(null)
  const [revIdx, setRevIdx] = useState(0) // 사용자 후기 슬라이드
  const [revOpen, setRevOpen] = useState(false) // 후기 전체 펼침
  const [spot, setSpot] = useState({ on: false, idx: null }) // 풀스크린 명대사 스포트라이트
  const [intro, setIntro] = useState(() => {
    try { return localStorage.getItem('hg_intro_skip') !== '1' } catch { return true }
  }) // 진입 인트로 (다시 안 보기 시 스킵)
  const [introSkip, setIntroSkip] = useState(false) // 다시 안 보기 체크
  const introIdx = useRef(Math.floor(Math.random() * KDRAMA.length)).current // 랜덤 명대사 고정
  const timer = useRef(null)

  // 후기 슬라이드 자동 회전 (리뷰 수 기반, 랭 변경 시 0으로)
  useEffect(() => {
    setRevIdx(0)
    const iv = setInterval(() => {
      setRevIdx(i => (i + 1) % REVIEW[lang === 'ko' ? 'ko' : 'en'].length)
    }, 4000)
    return () => clearInterval(iv)
  }, [lang])

  const t = LANG[lang]
  const MAX_IDX = 25 // 0~25 = 26개
  const [spinCount, setSpinCount] = useState(() => {
    const today = new Date().toDateString()
    try {
      const saved = JSON.parse(localStorage.getItem('hg_spin') || '{}')
      return saved.date === today ? saved.count : 0
    } catch { return 0 }
  })
  const [noMore, setNoMore] = useState('') // 흥부 반응 메시지
  const SPIN_LIMIT = 5 // 1~5 정상, 그 뒤 흥부가 말림
  // 흥부 = 애인, 사용자 = "한번만 응" 오빠 (남녀 패턴 그대로)
  const BLOCK_MSGS = [
    '“오늘은 여기까지” 😮',                              // 6
    '“안 되, 오늘은 위험해... 내일 하자” 😠',              // 7
    '“오빠는 돌리려고 오는거야...?” 😔',                  // 8 (섭섭)
  ]
  const GIVEUP_MSG = '“알았다고... 맘대로 해, 오빠는 포기했어” 😮💨' // 9 = 흥부 체념

  // 명대사 롤링 — 경고 3번(6·7·8) 이겨내면 9부터 자유(흥부 허락)
  const spin = () => {
    // 매 스핀 시도마다 count 증가 (막혀도 다음 단계로 진행)
    const bump = () => {
      const today = new Date().toDateString()
      const next = spinCount + 1
      try { localStorage.setItem('hg_spin', JSON.stringify({ date: today, count: next })) } catch {}
      return next
    }
    const phase = spinCount // 현재 단계 (0부터)
    if (phase < SPIN_LIMIT) { // 1~5 정상
      setSpinCount(bump())
    } else if (phase < SPIN_LIMIT + BLOCK_MSGS.length - 1) { // 6·7·8 = 경고 (막음)
      setNoMore(BLOCK_MSGS[phase - SPIN_LIMIT])
      setSpinCount(bump())
      return
    } else { // 9+ = 흥부 체념(포기) + 자유 스핀
      if (!noMore) setNoMore(GIVEUP_MSG)
      setSpinCount(bump())
    }
    let n = 0
    clearInterval(timer.current)
    timer.current = setInterval(() => {
      const idx = Math.floor(Math.random() * 26)
      setRolled(idx)
      n++
      if (n > 14) { clearInterval(timer.current); settle(idx) }
    }, 90)
  }

  const settle = (idx) => {
    setSpot({ on: true, idx }) // 풀스크린 명대사 스포트라이트 (닫기 전까지 유지)
    setRolled(idx)
  }

  const closeSpot = () => setSpot({ on: false, idx: null })

  useEffect(() => () => clearInterval(timer.current), [])

  // 스크롤 리빌 — .reveal 요소가 뷰포트에 들어오면 .in 부여
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } })
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [lang, ptab])

  const [copied, setCopied] = useState(false)
  const [copiedP, setCopiedP] = useState(false)
  const INSTALL = 'npx heungbu-gra@latest'
  const copy = () => { navigator.clipboard?.writeText(INSTALL).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000) }) }
  const copyPrompt = () => { const txt = LANG[lang]['guide2c']; navigator.clipboard?.writeText(txt).then(() => { setCopiedP(true); setTimeout(() => setCopiedP(false), 2000) }) }

  const curQuote = rolled === null ? KDRAMA[0].ko : KDRAMA[rolled % KDRAMA.length].ko
  const curSrc = rolled === null ? KDRAMA[0].src : KDRAMA[rolled % KDRAMA.length].src

  return (
    <>
      {/* 흥월 인트로 — 진입 시 랜덤 명대사 + 입장하기 */}
      {intro && (
        <div className="intro-ov">
          <div className="intro-card">
            <div className="intro-badge">🌍 흥부 월드에 오신 걸 환영합니다</div>
            <div className="intro-quote">“{KDRAMA[introIdx].ko}”</div>
            <div className="intro-src">🎬 {KDRAMA[introIdx].src}</div>
            <div className="intro-note">명대사 한 방으로 AI를 깨우세요. ㅊㅊ 한마디면 충분합니다.</div>
            <button className="intro-enter" onClick={() => {
              if (introSkip) { try { localStorage.setItem('hg_intro_skip', '1') } catch {} }
              setIntro(false)
            }}>하이패스로 입장 → 🚙</button>
            <label className="intro-skip"><input type="checkbox" checked={introSkip} onChange={e => setIntroSkip(e.target.checked)} /> 다음부터는 하이패스 (이 인트로 안 보기)</label>
          </div>
        </div>
      )}
      {/* 축포 오버레이 */}
      {/* 풀스크린 명대사 스포트라이트 — 닫기 버튼 전까지 유지 */}
      {spot.on && (
        <div className="spot-ov">
          <div className="spot-card">
            <div className="spot-quote">“{KDRAMA[spot.idx % KDRAMA.length].ko}”</div>
            <div className="spot-src">🎬 {KDRAMA[spot.idx % KDRAMA.length].src}</div>
            <div className="spot-flare">✨ 흥부 명대사!! 이 한 방 ✨</div>
            <button className="spot-close" onClick={closeSpot}>✕ 닫기</button>
          </div>
        </div>
      )}

      <nav className="nav">
        <div className="wrap nav-inner">
          <div className="logo"><span className="logo-mark">興</span>흥부<b>그라</b></div>
          <div className="nav-links">
            <button className={`lang-btn`} onClick={() => setLang(lang === 'ko' ? 'en' : 'ko')}>{lang === 'ko' ? '🌐 EN' : '🌐 KO'}</button>
            <a href="#cc">{t.nav[0]}</a>
            <a href="#how">{t.nav[1]}</a>
            <a href="#install" className="nav-install">{t.nav[2]}</a>
            <a href="#concept">{t.nav[3]}</a>
          </div>
        </div>
      </nav>

      <header className="hero wrap">
        <span className="badge">{t.badge}</span>
        <h1>{t.h1_1}<br />{t.h1_2}</h1>
        <div className="hero-em">{t.h1em}</div>
        <p className="sub">{t.sub}</p>

        {/* 명대사 롤링 머신 */}
        <div className="slot">
          <div className="slot-window">
            <span key={rolled ?? 'start'} className="slot-word">“{curQuote}”</span>
            {rolled !== null && <span className="slot-src">🎬 {curSrc}</span>}
          </div>
          {noMore && <div className="slot-block" onClick={() => setNoMore('')}>🐦 {noMore}</div>}
          <div className="slot-hint" onClick={spin}>▶ 명대사 뽑기</div>
        </div>

        <div className="cta-row">
          <a className="btn btn-gold" href="#cc">진짜로 해보기</a>
          <a className="btn btn-ghost" href="#install">{t.cta1}</a>
        </div>
      </header>

      {/* 증명 섹션 — AI 직접 후기 + 실증 통계 통합 */}
      <section className="sec reveal" id="proof">
        <div className="wrap">
          <span className="sec-eyebrow">Proof</span>
          <h2>✅ <span className="em">{PROOF[lang].t}</span></h2>
          <p className="lead">{PROOF[lang].d}</p>

          <div className="proof-review">
            <div className="rev-card">
              <div className="rev-top" onClick={() => setRevOpen(!revOpen)}>
                <span className="rev-avatar">{REVIEW[lang === 'ko' ? 'ko' : 'en'][revIdx].ai.slice(0, 1)}</span>
                <span className="rev-meta">
                  <span className="rev-ai">🤖 {REVIEW[lang === 'ko' ? 'ko' : 'en'][revIdx].ai}</span>
                  <span className="rev-quote">"{REVIEW[lang === 'ko' ? 'ko' : 'en'][revIdx].h}"</span>
                </span>
              </div>
              {revOpen && <div className="rev-full">"{REVIEW[lang === 'ko' ? 'ko' : 'en'][revIdx].q}"</div>}
              <button className="rev-tap" onClick={() => setRevOpen(!revOpen)}>{revOpen ? '▲ 접기' : '▼ 후기 전체 보기'}</button>
            </div>
            <div className="rev-dots">
              {REVIEW[lang === 'ko' ? 'ko' : 'en'].map((_, i) => (
                <button key={i} className={`rev-dot${i === revIdx ? ' on' : ''}`} onClick={() => { setRevIdx(i); setRevOpen(false); }} />
              ))}
            </div>
          </div>

          <div className="proof-divider"><span>Threads 실측</span></div>

          <div className="proof-stats">
            {PROOF[lang].stats.map((s, i) => (
              <div key={i} className="proof-stat">
                <span className="ps-label">{s[0]}</span>
                <span className="ps-val">{s[1]}</span>
              </div>
            ))}
          </div>
          <div className="cta-row">
            <a className="btn btn-gold" href={PROOF[lang].url} target="_blank" rel="noreferrer">▶ {PROOF[lang].link}</a>
          </div>
        </div>
      </section>


      {/* ㅊㅊ 커맨드 섹션 */}
      <section className="sec reveal" id="cc">
        <div className="wrap">
          <div className="cc-banner">
            <span className="sec-eyebrow">Command</span>
            <h2><span className="cc-key">ㅊㅊ</span> <span className="em">{CC[lang].title.replace('"ㅊㅊ" ','')}</span></h2>
            <p className="lead">{CC[lang].desc}</p>
            {CC[lang].tag && <div className="cc-tag">🏷️ {CC[lang].tag}</div>}
            <p className="cc-easy">{CC[lang].easy}</p>
            <div className="term cc-term">
              <div className="term-bar"><span className="dot r" /><span className="dot y" /><span className="dot g" /></div>
              <div className="term-body">
                <div className="cmd-line"><span className="code">{CC[lang].easyCmd}</span></div>
              </div>
            </div>
            <div className="term cc-term">
              <div className="term-bar"><span className="dot r" /><span className="dot y" /><span className="dot g" /></div>
              <div className="term-body">
                <div className="cmd-line"><span className="pre">$</span> <span className="code">ㅊㅊ</span></div>
                <div className="out">🐦 [흥부그라] 이제 너도 흥부 가족이다 💛</div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="sec reveal" id="install">
        <div className="wrap">
          <span className="sec-eyebrow">Install</span>
          <h2>{t.ins_t}</h2>
          <p className="lead">{t.ins_d}</p>
          <div className="term install">
            <div className="term-bar"><span className="dot r" /><span className="dot y" /><span className="dot g" /></div>
            <div className="term-body">
              <div className="cmd-line"><span className="pre">$</span> <span className="code">{INSTALL}</span><button className="copy-btn" onClick={copy}>{copied ? '✓' : 'copy'}</button></div>
              <div className="out">✓ heungbu-gra MCP installed<br />✓ auto-praise per command started<br />✓ your AI may turn "딱" (warning)</div>
            </div>
          </div>

          {/* 초보자 가이드 — 설치 후 어떻게 하나 */}
          <div className="install-guide">
            <h3>🤔 {t.guide_t}</h3>
            <ol className="guide-list">
              <li>{t.guide1}</li>
              <li>{t.guide2}
                <div className="guide-promp">
                  <div className="guide-promp-label">{t.guide2l}</div>
                  <div className="guide-promp-row">
                    <span className="guide-promp-txt">{t.guide2c}</span>
                    <button className="copy-btn" onClick={copyPrompt}>{copiedP ? '✓' : 'copy'}</button>
                  </div>
                </div>
              </li>
              <li>{t.guide3}
                <div className="guide-note">{t.guide3t}</div>
              </li>
              <li>{t.guide4}
                <div className="guide-note">{t.guide4t}</div>
                <div className="guide-examples">
                  {t.guide4ex.map((ex, i) => (
                    <div key={i} className="guide-ex">
                      <span className="guide-ex-bubble">{i + 1}</span>
                      <span className="guide-ex-txt">{ex}</span>
                    </div>
                  ))}
                </div>
              </li>
            </ol>
          </div>
        </div>
      </section>


      {/* 26칭찬 섹션 */}
      <section className="sec reveal" id="how">
        <div className="wrap">
          <span className="sec-eyebrow">Praise Library</span>
          <h2>흥부의 <span className="em">26명 자식 = 26가지 칭찬</span></h2>
          <p className="lead">{lang === 'ko' ? '기본 패키지 26개를 제공하고, 나중엔 사용자가 직접 5개 더 추가할 수 있어요.' : '26 base praises, +5 customizable by user later.'}</p>

          {/* 탭: 🔖 일반 / 🎬 K-드라마 / 🌍 할리우드 */}
          <div className="ptab">
            <button className={`ptab-btn${ptab === 'base' ? ' on' : ''}`} onClick={() => setPtab('base')}>🔖 {lang === 'ko' ? '일반 칭찬' : 'Classic'}</button>
            <button className={`ptab-btn${ptab === 'kr' ? ' on' : ''}`} onClick={() => setPtab('kr')}>🎬 {lang === 'ko' ? 'K-드라마 명대사' : 'K-Drama'}</button>
            <button className={`ptab-btn${ptab === 'us' ? ' on' : ''}`} onClick={() => setPtab('us')}>🌍 {lang === 'ko' ? '글로벌 칭찬' : 'Holllywood'}</button>
          </div>

          {ptab === 'base' ? (
            <div className="praise-grid">
              {PRAISE[lang].map((p, i) => (
                <div key={i} className="praise-cell"><span className="praise-n">{i + 1}</span>{p}</div>
              ))}
            </div>
          ) : ptab === 'kr' ? (
            <div className="hollywood-grid">
              {KDRAMA.map((h, i) => (
                <div key={i} className="hollywood-cell">
                  <span className="hw-n">{i + 1}</span>
                  <div className="hw-en">“{h.ko}”</div>
                  <div className="hw-src">🎬 {h.src}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="hollywood-grid">
              {HOLIYWOOD.map((h, i) => (
                <div key={i} className="hollywood-cell">
                  <span className="hw-n">{i + 1}</span>
                  <div className="hw-en">{h.en}</div>
                  <div className="hw-en-sub">“{h.ko}”</div>
                  <div className="hw-src">🎬 {h.src}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>


      {/* 흥부 플래피 26 게임 */}
      <section className="sec" id="game">
        <div className="wrap">
          <h2>🎮 <span className="em">흥부 플래피 26</span> <span style={{fontSize:'13px'}}>(육아 체험)</span></h2>
          <p className="lead">26명 자식을 할머니 방으로 옮기자. 클릭·탭·스페이스로 점프! 장애물에 부딪히면 아이가 운다 😭 26명 전원 생존 = 흥부의 경지!</p>
          <div className="game-host">
            <HeungbuGame lang={lang} />
          </div>
        </div>
      </section>


<section className="sec reveal" id="concept">
        <div className="wrap">
          <span className="sec-eyebrow">Lore</span>
          <h2>{LORE[lang].title} <span className="em">(왜 흥부그라인가)</span></h2>
          <p className="lead">{LORE[lang].rows[0][1]}</p>
          <div className="lore-list">
            {LORE[lang].rows.map((r, i) => (
              <div key={i} className="lore-row">
                <span className="lore-key">{r[0]}</span>
                <span className="lore-val">{r[1]}</span>
              </div>
            ))}
          </div>
        </div>
      </section>


      <footer>
        <div className="wrap">
          <p className="credit">
            🐦 <a href="https://www.threads.net/@deepsik_e" target="_blank" rel="noopener">Threads @deepsik_e</a>
            &nbsp;·&nbsp;
            <a href="https://github.com/xjoanet/heungbu-gra" target="_blank" rel="noopener">GitHub</a>
          </p>
          <p>{t.foot1}</p>
          <p className="funny">{t.foot2}</p>
          <p className="credit">🖋️ 공동작품 — 딥식이 × 스카이 (K-MCP 창시자 듀오)</p>
        </div>
      </footer>
    </>
  )
}

export default App
