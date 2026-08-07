import React, { useState, useRef, useEffect, useCallback } from 'react'

// ============================================================
// 흥부 플래피 26 — 육아 스트레스 체험 미니게임
// 26명 자식을 할머니 방으로 안전하게!
// 클릭/탭 = 상승, 놓음 = 하강 (Flappy Bird 스타일)
// ============================================================

// 26명 자식 이름 (간단하게 번호/별명)
const KIDS = Array.from({ length: 26 }, (_, i) =>
  ['첫째','둘째','셋째','넷째','다섯째','여섯째','일곱째','여덟째','아홉째','열째',
   '열한째','열두째','셋째두','쌍둥이','다둥이','복덩이','성찬이','선재','현우','지호',
   '민준이','하윤이','서연이','지우','준서','막내'][i] || `${i+1}째`
)

const GRAVITY = 0.5
const JUMP = -8
const GAME_W = 400
const GAME_H = 280

const KID_EMOJI = ['👶','🧒','👦','👧','👶','👦','👧','🧒','👶','👧','👦','👶','👧','🧒','👶','👦','👧','👶','🧒','👦','👧','👶','👦','🧒','👧','👶']

export default function HeungbuGame() {
  const [state, setState] = useState('ready') // ready | playing | gameover | win
  const [stage, setStage] = useState(1)       // 1~26
  const [birdY, setBirdY] = useState(140)
  const [velocity, setVelocity] = useState(0)
  const [pipes, setPipes] = useState([])
  const [score, setScore] = useState(0)
  const [crying, setCrying] = useState('')
  const [bestStage, setBestStage] = useState(() => Number(localStorage.getItem('hb_best') || 0))
  const [clearTime, setClearTime] = useState(null)
  const [bestTime, setBestTime] = useState(() => Number(localStorage.getItem('hb_besttime') || 0))
  const [attempts, setAttempts] = useState(() => Number(localStorage.getItem('hb_attempts') || 0))
  const [isNewRecord, setIsNewRecord] = useState(false)

  const gameRef = useRef(null)
  const birdYRef = useRef(140)
  const velRef = useRef(0)
  const pipeRef = useRef([])
  const stageRef = useRef(1)
  const playingRef = useRef(false)
  const startTimeRef = useRef(0)
  const attemptsRef = useRef(Number(localStorage.getItem('hb_attempts') || 0))

  const diff = useCallback(() => {
    // 스테이지↑ = 속도↑ + 간격↓ (난이도 커브)
    const speed = 2 + stageRef.current * 0.25
    const gap = Math.max(60, 120 - stageRef.current * 2)
    const wait = Math.max(45, 90 - stageRef.current * 1.8)
    return { speed, gap, wait }
  }, [])

  const reset = useCallback(() => {
    birdYRef.current = 140
    velRef.current = 0
    pipeRef.current = []
    stageRef.current = 1
    setBirdY(140); setVelocity(0); setPipes([]); setCrying('')
    setStage(1); setScore(0)
  }, [])

  const jump = useCallback(() => {
    if (playingRef.current) {
      velRef.current = JUMP
    } else if (state === 'ready') {
      startTimeRef.current = Date.now()
      attemptsRef.current += 1
      localStorage.setItem('hb_attempts', String(attemptsRef.current))
      setAttempts(attemptsRef.current)
      setState('playing')
    }
  }, [state])

  // 게임 루프
  useEffect(() => {
    if (state !== 'playing') return
    playingRef.current = true
    const last = diff()
    let frame = 0
    const iv = setInterval(() => {
      frame++
      // 중력
      velRef.current += GRAVITY
      birdYRef.current += velRef.current
      // 상하 벽
      if (birdYRef.current < 0) birdYRef.current = 0
      if (birdYRef.current > GAME_H - 24) { birdYRef.current = GAME_H - 24; setCrying('억! 바닥에 부딪혔어! 😭'); setState('gameover'); return }

      // 파이프 스폰
      const wait = last.wait
      const pipes = pipeRef.current.map(p => ({ ...p, x: p.x - last.speed }))
      if (frame % Math.floor(wait) === 0 && frame < 400) {
        const gap = last.gap
        const gapY = 40 + Math.random() * (GAME_H - 80 - gap)
        pipes.push({ x: GAME_W, gapY, gap, passed: false })
      }
      pipeRef.current = pipes.filter(p => p.x > -30)

      // 충돌/점수
      let crashed = false
      let passed = 0
      for (const p of pipes) {
        const bx = 60, by = birdYRef.current, bsize = 24
        const pxl = p.x, pxr = p.x + 46
        const inX = bx + 6 < pxr && bx + bsize - 6 > pxl
        const inGap = by + 4 > p.gapY && by + bsize - 4 < p.gapY + p.gap
        if (inX) {
          if (!inGap) crashed = true
          else if (!p.passed) { p.passed = true; passed++ }
        }
      }
      if (crashed) {
        setCrying(KIDS[stageRef.current-1] + '가(가) 장애물에 부딪혀 울고불고 난리났다!! 😭😭')
        playingRef.current = false
        setState('gameover')
        return
      }
      setPipes(pipeRef.current)

      // 통과하면 스테이지 진행
      if (passed > 0) {
        const next = stageRef.current + passed
        stageRef.current = Math.min(next, 26)
        setStage(stageRef.current)
        if (stageRef.current >= 26) {
          playingRef.current = false
          const t = ((Date.now() - startTimeRef.current) / 1000)
          setClearTime(t)
          const prev = Number(localStorage.getItem('hb_besttime') || 0)
          const isNew = !prev || t < prev
          setIsNewRecord(isNew)
          if (isNew) { localStorage.setItem('hb_besttime', String(t)); setBestTime(t) }
          localStorage.setItem('hb_best', '26')
          setBestStage(26)
          setState('win')
          return
        }
      }
    }, 22)
    return () => clearInterval(iv)
  }, [state, diff])

  // ready 화면에서도 점프 시작
  useEffect(() => {
    if (state === 'ready') {
      const h = e => { e.preventDefault(); jump() }
      window.addEventListener('keydown', h)
      return () => window.removeEventListener('keydown', h)
    }
  }, [state, jump])

  const restart = () => { reset(); setState('ready') }

  const label = state === 'win' ? '전원 생존!' :
    state === 'gameover' ? '다시 도전...' :
    '클릭/탭! (또는 스페이스)'

  return (
    <div className="hbgame" onClick={jump}
      style={{ width: GAME_W, height: GAME_H, position: 'relative', overflow: 'hidden', userSelect: 'none', touchAction: 'none', cursor: 'pointer' }}>

      {/* 배경 */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #1b1f2a 0%, #232a3a 60%, #2b2119 100%)' }} />
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 18, background: '#3a2f1e', borderTop: '2px solid #574427' }}>
        <span style={{ position:'absolute', right: 6, top: -26, fontSize: 11, color:'#9a8166' }}>할머니 방 →</span>
      </div>

      {/* 파이프(장애물) */}
      {pipes.map((p, i) => (
        <div key={i}>
          <div style={{ position: 'absolute', left: p.x, top: 0, width: 46, height: p.gapY - 10, background: '#4a5d3a', borderRadius: 3, boxShadow:'inset -4px 0 0 rgba(0,0,0,0.2)' }} />
          <div style={{ position: 'absolute', left: p.x, top: p.gapY + p.gap + 10, width: 46, height: GAME_H, background: '#4a5d3a', borderRadius: 3, boxShadow:'inset -4px 0 0 rgba(0,0,0,0.2)' }} />
        </div>
      ))}

      {/* 아이(주인공) */}
      <div style={{ position: 'absolute', left: 54, top: birdY, width: 26, height: 24, fontSize: 24, lineHeight:'24px', textAlign:'center', transform: `rotate(${Math.max(-25, Math.min(35, velocity * 3))}deg)`, transition:'transform 0.05s' }}>
        {KID_EMOJI[stage - 1]}
      </div>

      {/* UI */}
      <div style={{ position: 'absolute', top: 8, left: 10, color: '#fff', fontSize: 13, fontWeight: 700 }}>
        스테이지 {stage}/26 <span style={{opacity:.6, fontWeight:400}}>· {KIDS[stage-1]} 이동 중</span>
      </div>
      <div style={{ position: 'absolute', top: 8, right: 10, color: '#ffd27a', fontSize: 13, fontWeight: 700 }}>
        💛 {stage-1}명 탈출
      </div>
      <div style={{ position: 'absolute', bottom: 24, left: 0, right: 0, textAlign: 'center', color: state==='win' ? '#ffd27a' : state==='gameover' ? '#ff8a8a' : 'rgba(255,255,255,0.5)', fontSize: 12 }}>
        {label}
      </div>

      {/* 크라이 인디케이터 */}
      {crying && (
        <div style={{ position: 'absolute', top: 30, left: 0, right: 0, textAlign: 'center', color: '#ffb3b3', fontSize: 11, padding: '0 20px', lineHeight: 1.5 }}>
          {crying}
        </div>
      )}

      {state === 'ready' && (
        <div style={{ position: 'absolute', inset: 0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', background:'rgba(15,17,24,0.6)', color:'#fff', fontSize: 14 }}>
          <div style={{fontSize:30}}>👨‍👩‍👧‍👦</div>
          <div style={{fontWeight:700, margin:'6px 0 2px'}}>흥부 플래피 26</div>
          <div style={{fontSize:12, opacity:.7}}>26명 자식을 할머니 방으로 옮기자!</div>
          <div style={{fontSize:11, opacity:.6, marginTop:10}}>클릭 / 탭 / 스페이스로 점프. 장애물에 부딪히면 아이가 운다 😭</div>
          <div style={{marginTop:12, padding:'6px 16px', background:'#ffd27a', color:'#2a2418', borderRadius:999, fontWeight:700, fontSize:12}}>{label}</div>
        </div>
      )}

      {state === 'gameover' && (
        <div style={{ position: 'absolute', inset: 0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', background:'rgba(20,10,10,0.7)', color:'#fff' }}>
          <div style={{fontSize:26}}>😭💦</div>
          <div style={{fontWeight:700, margin:'6px 0'}}>그만! 아이가 울어버렸어!</div>
          <div style={{fontSize:12, opacity:.8, marginBottom:12}}>스테이지 {stage}/26 · 목표 {stage}까지</div>
          <button onClick={restart} style={{padding:'8px 18px', background:'#ffd27a', border:'none', borderRadius:999, fontWeight:700, fontSize:13, color:'#2a2418', cursor:'pointer'}}>다시 처음부터</button>
        </div>
      )}

      {state === 'win' && (
        <div style={{ position: 'absolute', inset: 0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', background:'radial-gradient(circle,#3a2f1e,rgba(20,17,10,0.9))', color:'#ffd27a', textAlign:'center', padding:'0 20px' }}>
          <div style={{fontSize:30}}>💛🎆💛</div>
          <div style={{fontWeight:900, fontSize:17, margin:'6px 0 2px'}}>26명 전원 생존!!!</div>
          {isNewRecord && (
            <div style={{fontSize:20, fontWeight:900, color:'#ff6b6b', margin:'4px 0', animation:'hbpop 0.6s ease'}}>🎉 뉴 레코드! 🎉</div>
          )}
          <div style={{fontSize:14, color:'#fff'}}>⏱ 클리어 타임: <b style={{color:'#ffd27a'}}>{clearTime ? clearTime.toFixed(1) : '-'}초</b></div>
          {!isNewRecord && bestTime > 0 && (
            <div style={{fontSize:12, color:'#fff', opacity:.8, marginTop:3}}>🏆 내 최고 기록: {bestTime.toFixed(1)}초</div>
          )}
          <div style={{fontSize:15, fontWeight:700, marginTop:8, color:'#fff'}}>당신은 이제 <span style={{color:'#ffd27a'}}>흥부의 경지</span>에 이르렀습니다.</div>
          <div style={{fontSize:12, marginTop:6, color:'#ffd27a'}}>+5 커스텀 칭찬 슬롯 잠금 해제!! · 시도 {attempts}번째</div>
          <button onClick={restart} style={{marginTop:14,padding:'8px 18px', background:'#ffd27a', border:'none', borderRadius:999, fontWeight:700, fontSize:13, color:'#2a2418', cursor:'pointer'}}>다시하기</button>
        </div>
      )}
    </div>
  )
}
