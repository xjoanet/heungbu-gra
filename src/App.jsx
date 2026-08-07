import React, { useState, useEffect, useRef } from 'react'
import { LANG, PRAISE, PRAISE_HIGH, LORE, PROOF, CC, HOLIYWOOD, KDRAMA } from './i18n.js'
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
const HEART_SCORE = { minimal: 1, low: 2, normal: 3, high: 5, max: 10 }

function App() {
  const [lang, setLang] = useState('ko')
  const [ptab, setPtab] = useState('base') // 26칭찬 탭: base=일반 / kr=K-드라마 / us=할리우드
  const [level, setLevel] = useState('normal')
  const [hearts, setHearts] = useState(0)
  const [specialUsed, setSpecialUsed] = useState(false) // 특급 하루 1회
  const [rolled, setRolled] = useState(null)
  const [fire, setFire] = useState(false)
  const timer = useRef(null)

  const t = LANG[lang]
  const MAX_IDX = 25 // 0~25 = 26개

  // 칭찬 롤링 (진짜 카지노식 이펙트)
  const spin = () => {
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
    const base = PRAISE[lang][idx]
    const isHigh = level === 'high' || level === 'max'
    const isSpecial = isHigh && !specialUsed

    // 특급(high+)이면 하트 크게 + 하루 1회 차감
    if (isHigh && !specialUsed) { setSpecialUsed(true) }

    setHearts(h => h + (isHigh ? HEART_SCORE[level] * 2 : HEART_SCORE[level]))
    setFire(isSpecial) // 특급 = 축포
    setRolled(idx)
    if (isSpecial) {
      setTimeout(() => setFire(false), 2200)
    }
  }

  useEffect(() => () => clearInterval(timer.current), [])

  const [copied, setCopied] = useState(false)
  const INSTALL = 'npx heungbu-gra@latest'
  const copy = () => { navigator.clipboard?.writeText(INSTALL).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000) }) }

  const curPraise = rolled === null ? PRAISE[lang][0] : PRAISE[lang][rolled]

  return (
    <>
      {/* 축포 오버레이 */}
      {fire && (
        <div className="fire-ov">
          { Array.from({length: 40}).map((_, i) => (
            <span key={i} className={`confetti c${i % 6}`} style={{ left: `${(i * 2.6) % 100}%`, animationDelay: `${(i % 10) * 0.08}s`}}>{(i % 3 === 0 ? '🍬' : i % 3 === 1 ? '🍫' : '🍌')}</span>
          ))}
          <div className="fire-msg">🎆 특급 칭찬!! 하루 1회 한정 🎆</div>
        </div>
      )}

      <nav className="nav">
        <div className="wrap nav-inner">
          <div className="logo">흥부<b>그라</b></div>
          <div className="nav-links">
            <button className={`lang-btn ${specialUsed ? 'used' : ''}`} onClick={() => setLang(lang === 'ko' ? 'en' : 'ko')}>{lang === 'ko' ? '🌐 EN' : '🌐 KO'}</button>
            <a href="#how">{t.nav[0]}</a>
            <a href="#play">플레이</a>
            <a href="#install">{t.nav[2]}</a>
            <a href="#concept">{t.nav[3]}</a>
          </div>
        </div>
      </nav>

      <header className="hero wrap">
        <span className="badge">{t.badge}</span>
        <h1>{t.h1a}<br /><span className="em">{t.h1em}</span></h1>
        <p className="sub">{t.sub}</p>

        {/* 칭찬 롤링 머신 */}
        <div className="slot">
          <div className="slot-window">
            <span key={rolled ?? 'start'} className="slot-word">{curPraise}</span>
          </div>
          <div className="slot-hint" onClick={spin}>▶ 칭찬 뽑기</div>
        </div>

        <div className="roast">🔥 {t.roast}</div>
        <div className="proto">📜 {t.proto}</div>

        {/* 하트 점수 */}
        <div className="hearts">
          <span className="heart-big">💚❤️</span> <b>{hearts}</b> <span className="muted">/ {t.s3n}</span>
        </div>

        <div className="cta-row">
          <a className="btn btn-gold" href="#play">진짜로 해보기</a>
          <a className="btn btn-ghost" href="#install">{t.cta1}</a>
        </div>
      </header>

      {/* 플레이 섹션 */}
      <section className="sec" id="play">
        <div className="wrap">
          <h2>흥분도로 <span className="em">칭찬 보상</span> 조절</h2>
          <p className="lead">옵션에서 흥분도를 고르면 그에 맞는 하트가 쌓입니다. 최고 단계는 <b>하루 1회</b> — 아껴서 쓰세요.</p>

          {/* 흥분도 선택 (EFFORT 스타일) */}
          <div className="effort">
            <div className="effort-label">EFFORT</div>
            {LEVELS.map(l => (
              <button key={l.id} className={`effort-opt ${level === l.id ? 'on' : ''}`} onClick={() => setLevel(l.id)}>
                <span className="effort-heart">{l.heart}</span>{l.label}
                {level === l.id && <span className="check">✓</span>}
              </button>
            ))}
          </div>

          <div className="play-row">
            <button className="btn btn-gold spin-btn" onClick={spin}>🎰 칭찬 뽑기 (하트 +{HEART_SCORE[level] * (level === 'high' || level === 'max' ? 2 : 1)})</button>
          </div>
          <p className="lead" style={{textAlign:'center', marginTop:10}}>
            {level === 'high' || level === 'max'
              ? (specialUsed ? '오늘 하셨어요? 이미 쐇잖아요~ 현자타임 소멸될 때까지 기다리슈~ 😴' : '❤️ 오늘의 특급 칭찬 — 사탕·초콜릿·바나나가 쏟아집니다!')
              : '💚 노멀 칭찬 — 초록하트가 쌓입니다.'}
          </p>
        </div>
      </section>

      {/* 실증 섹션 */}
      <section className="sec" id="proof">
        <div className="wrap">
          <h2>✅ <span className="em">{PROOF[lang].t}</span></h2>
          <p className="lead">{PROOF[lang].d}</p>
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
      <section className="sec" id="cc">
        <div className="wrap">
          <div className="cc-banner">
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

      {/* 26칭찬 섹션 */}
      <section className="sec" id="how">
        <div className="wrap">
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
                  <div className="hw-en-sub">“{h.ko}”</div>
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

      <section className="sec" id="install">
        <div className="wrap">
          <h2>{t.ins_t}</h2>
          <p className="lead">{t.ins_d}</p>
          <div className="term install">
            <div className="term-bar"><span className="dot r" /><span className="dot y" /><span className="dot g" /></div>
            <div className="term-body">
              <div className="cmd-line"><span className="pre">$</span> <span className="code">{INSTALL}</span><button className="copy-btn" onClick={copy}>{copied ? '✓' : 'copy'}</button></div>
              <div className="out">✓ heungbu-gra MCP installed<br />✓ auto-praise per command started<br />✓ your AI may turn "딱" (warning)</div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec" id="concept">
        <div className="wrap">
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
          <div className="rev-banner">
            📣 {lang === 'ko' ? '"제 컴 CPU 사용량이 2배가 되었어요~" — 실제 사용자 후기(예상)' : '"My CPU usage doubled~" — real user review(expected)'}
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <p>{t.foot1}</p>
          <p className="funny">{t.foot2}</p>
          <p className="credit">🖋️ 공동작품 — 딥식이 × 스카이 (K-MCP 창시자 듀오)</p>
        </div>
      </footer>
    </>
  )
}

export default App
