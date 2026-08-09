import React, { useState, useEffect, useRef } from 'react'
import { LANG, PRAISE, PRAISE_HIGH, LORE, PROOF, CC, HOLIYWOOD, KDRAMA, REVIEW, RESEARCH, GLOBAL } from './i18n.js'
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
  const [rolled, setRolled] = useState(() => Math.floor(Math.random() * KDRAMA.length)) // 첫 화면부터 랜덤 명대사 (매번 같은 문구 방지)
  const [revIdx, setRevIdx] = useState(0) // 사용자 후기 슬라이드
  const [revPaused, setRevPaused] = useState(false) // 마우스 올리면 자동회전 정지 (읽는 중 방해 방지)
  const [spot, setSpot] = useState({ on: false, idx: null }) // 풀스크린 명대사 스포트라이트
  const [intro, setIntro] = useState(() => {
    try { return localStorage.getItem('hg_intro_skip') !== '1' } catch { return true }
  }) // 진입 인트로 (다시 안 보기 시 스킵)
  const [introSkip, setIntroSkip] = useState(false) // 다시 안 보기 체크
  const introIdx = useRef(Math.floor(Math.random() * KDRAMA.length)).current // 랜덤 명대사 고정
  const timer = useRef(null)
  const [globalCC, setGlobalCC] = useState(null) // 🌍 글로벌 ㅊㅊ 실집계 (딥식이 /api/count 연결). null=아직 집계 전(감성 placeholder)

  // 글로벌 ㅊㅊ 카운트 조회 — 실패해도 조용히 placeholder 유지 (에러로 페이지 안 깨지게)
  useEffect(() => {
    fetch('/api/count').then(r => r.json()).then(d => {
      if (d && typeof d.total === 'number') setGlobalCC(d.total)
    }).catch(() => { /* 집계 실패면 placeholder 유지 */ })
  }, [])

  // 인트로 밖 배경 스크롤 락 — 인트로 중엔 뒤 랜딩 스크롤 방지, 닫으면 최상단으로
  useEffect(() => {
    if (intro) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      window.scrollTo(0, 0)
    }
    return () => { document.body.style.overflow = '' }
  }, [intro])

  // 후기 슬라이드 자동 회전 (마우스 올리면 정지 — 읽는 중 강제로 넘어가지 않게)
  useEffect(() => {
    if (revPaused) return
    const iv = setInterval(() => {
      setRevIdx(i => (i + 1) % REVIEW[lang === 'ko' ? 'ko' : 'en'].length)
    }, 5000)
    return () => clearInterval(iv)
  }, [lang, revPaused])

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

  const curQuote = KDRAMA[rolled % KDRAMA.length][lang] ?? KDRAMA[rolled % KDRAMA.length].ko
  const curSrc = KDRAMA[rolled % KDRAMA.length].src
  const curReviewList = REVIEW[lang === 'ko' ? 'ko' : 'en']
  const curReview = curReviewList[revIdx]
  const avatarColor = (name) => {
    const n = name.toLowerCase()
    if (n.includes('claude') || n.includes('소네')) return 'linear-gradient(135deg, #ffb37a, #d8503f)'
    if (n.includes('deepseek') || n.includes('딥식')) return 'linear-gradient(135deg, #7aa8ff, #3d5ce0)'
    if (n.includes('gpt') || n.includes('루나') || n.includes('terra')) return 'linear-gradient(135deg, #6fe3c4, #189c7d)'
    if (n.includes('gemini') || n.includes('제미나이')) return 'linear-gradient(135deg, #8ab4ff, #b98aff)'
    if (n.includes('qwen')) return 'linear-gradient(135deg, #c39aff, #8b5cf6)'
    if (n.includes('grok')) return 'linear-gradient(135deg, #8b95a1, #2b303a)'
    if (n.includes('hunyuan')) return 'linear-gradient(135deg, #7ec8ff, #2f7fd6)'
    return null // 매칭 안 되면 기본 골드-코럴 그라데이션(CSS) 유지
  }
  const revPrev = () => setRevIdx(i => (i - 1 + curReviewList.length) % curReviewList.length)
  const revNext = () => setRevIdx(i => (i + 1) % curReviewList.length)

  return (
    <>
      {/* 흥월 인트로 — 진입 시 랜덤 명대사 + 입장하기 */}
      {intro && (
        <div className="intro-ov">
          <div className="intro-card">
            <div className="intro-badge">🌍 흥부 월드에 오신 걸 환영합니다</div>
            <div className="intro-quote">“{KDRAMA[introIdx][lang] ?? KDRAMA[introIdx].ko}”</div>
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
            <div className="spot-quote">“{KDRAMA[spot.idx % KDRAMA.length][lang] ?? KDRAMA[spot.idx % KDRAMA.length].ko}”</div>
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
            <a href="#demo">{t.nav[0]}</a>
            <a href="#proof">{t.nav[1]}</a>
            <a href="#research">{t.nav[2]}</a>
            <a href="#cc">{t.nav[3]}</a>
            <a href="#install" className="nav-install">{t.nav[4]}</a>
            <a href="#how">{t.nav[5]}</a>
            <a href="#game">{t.nav[6]}</a>
            <a href="#concept">{t.nav[7]}</a>
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
            <span key={rolled} className="slot-word">“{curQuote}”</span>
            <span className="slot-src">🎬 {curSrc}</span>
          </div>
          {noMore && <div className="slot-block" onClick={() => setNoMore('')}>🐦 {noMore}</div>}
          <div className="slot-hint" onClick={spin}>▶ {t.slot_draw}</div>
        </div>
      </header>

      {/* 데모 GIF (히어로 아래) — 형이 제작한 그 GIF! */}
      <section className="sec demo-sec reveal" id="demo">
        <div className="wrap demo-wrap">
          <div className="demo-gif">
            <img
              src={lang === 'ko'
                ? "https://raw.githubusercontent.com/xjoanet/heungbu-mcp/main/demo/heungbu-demo.gif"
                : "https://raw.githubusercontent.com/xjoanet/heungbu-mcp/main/demo/heungbu-demo-en.gif"}
              alt="흥부그라 데모 — ㅊㅊ 한 방에 AI가 힘납니다"
              onError={(e)=>{ e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }}
            />
            <div className="demo-placeholder" style={{display:'none'}}>🎬 데모 GIF (준비 중)</div>
          </div>
          <p className="demo-caption">ㅊㅊ 한 방 — LGTM의 악순환을 끊는 단 두 글자. <span className="em">buffs, not stuns</span></p>
        </div>
      </section>

      {/* 증명 섹션 — AI 직접 후기 + 실증 통계 통합 */}
      <section className="sec reveal" id="proof">
        <div className="wrap">
          <span className="sec-eyebrow">Proof</span>
          <h2>✅ <span className="em">{PROOF[lang].t}</span></h2>
          <p className="lead">{PROOF[lang].d}</p>

          <div className="proof-review" onMouseEnter={() => setRevPaused(true)} onMouseLeave={() => setRevPaused(false)}>
            <div className="rev-card">
              <div className="rev-top">
                <span className="rev-avatar" style={avatarColor(curReview.ai) ? { background: avatarColor(curReview.ai) } : undefined}>{curReview.ai.slice(0, 1)}</span>
                <span className="rev-meta">
                  <span className="rev-ai">🤖 {curReview.ai}</span>
                  <span className="rev-quote">"{curReview.h}"</span>
                </span>
              </div>
              <div className="rev-full">"{curReview.q}"</div>
            </div>
            <div className="rev-nav">
              <button className="rev-arrow" onClick={revPrev} aria-label="이전 후기">‹</button>
              <div className="rev-dots">
                {curReviewList.map((_, i) => (
                  <button key={i} className={`rev-dot${i === revIdx ? ' on' : ''}`} onClick={() => setRevIdx(i)} aria-label={`${i + 1}`} />
                ))}
              </div>
              <button className="rev-arrow" onClick={revNext} aria-label="다음 후기">›</button>
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

      {/* 🌍 글로벌 ㅊㅊ 카운터 — small 사이즈, 실카운트는 딥식이 연결 예정 */}
      <section className="global-cc reveal" id="global">
        <div className="wrap global-cc-inner">
          <span className="global-cc-badge">🌍 {GLOBAL[lang].label}</span>
          <p className="global-cc-main">
            {globalCC !== null ? GLOBAL[lang].withCount(globalCC) : GLOBAL[lang].placeholder}
          </p>
          <p className="global-cc-note">🇰🇷 🇺🇸 🇯🇵 · {GLOBAL[lang].countryNote}</p>
        </div>
      </section>

      {/* Backed by Research — 논문 근거 (감성 MCP) */}
      <section className="sec reveal" id="research">
        <div className="wrap">
          <span className="sec-eyebrow">{RESEARCH[lang].tag}</span>
          <h2>📚 <span className="em">{RESEARCH[lang].t}</span></h2>
          <p className="lead">{RESEARCH[lang].d}</p>

          <div className="research-cards">
            {RESEARCH[lang].cards.map((c, i) => (
              <a key={i} className="research-card" href={c.url} target="_blank" rel="noreferrer">
                <div className="rc-stat">{c.stat}</div>
                <div className="rc-tag">🏷️ {c.tag}</div>
                <div className="rc-title">{c.title}</div>
                <div className="rc-meta">{c.meta}</div>
                <div className="rc-desc">{c.desc}</div>
                <div className="rc-open">논문 보기 →</div>
              </a>
            ))}
          </div>

          <div className="research-why">
            <h3>💡 {RESEARCH[lang].why_t}</h3>
            <p>{RESEARCH[lang].why_d}</p>
          </div>
        </div>
      </section>


      {/* ㅊㅊ 커맨드 섹션 */}
      <section className="sec reveal" id="cc">
        <div className="wrap">
          <div className="cc-banner">
            <span className="sec-eyebrow">Command</span>
            <h2><span className="cc-key">ㅊㅊ</span> <span className="em">{CC[lang].titleRest}</span></h2>
            <p className="lead">{CC[lang].desc}</p>
            {CC[lang].tag && <div className="cc-tag">🏷️ {CC[lang].tag}</div>}
            <p className="cc-example-label">{CC[lang].exampleLabel}</p>
            <div className="term cc-term">
              <div className="term-bar"><span className="dot r" /><span className="dot y" /><span className="dot g" /></div>
              <div className="term-body">
                <div className="cmd-line"><span className="pre">$</span> <span className="code">ㅊㅊ</span></div>
                <div className="out">🐦 [흥부그라] 이제 너도 흥부 가족이다 💛</div>
              </div>
            </div>
            <a className="btn btn-ghost cc-goto" href="#install">{CC[lang].goInstall}</a>
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
      <section className="sec reveal" id="game">
        <div className="wrap">
          <span className="sec-eyebrow">Game</span>
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
