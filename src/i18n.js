export const LANG = {
  ko: {
    nav: ['데모', '증명', '연구', '어떻게', '설치', '칭찬', '게임', '컨셉'],
    badge: 'AI 감성 MCP · 동기부여 Model Context Protocol',
    h1_1: '차가운 코드 위에 낭만을 더하다.',
    h1_2: '번거로운 칭찬을 ㅊㅊ로 퉁치는 감성 MCP,',
    h1em: '흥부그라',
    sub: 'ㅊㅊ 두 글자면, 흥부가 K-드라마 속 명대사 하나를 골라 당신의 AI에게 건넵니다. 오늘은 어떤 대사가 나올까요? 아래에서 직접 뽑아보세요.',
    slot_draw: '▶ 명대사 뽑기',
    ins_t: '설치는 3초', ins_d: '클로드·커서·Hermes, 어디든 MCP로 붙이면 끝입니다.',
    guide_t: '설치하고 나서, 어떻게 하나요?',
    guide1: '위 코드를 복사해서 설치하세요. (아직은 도구만 연결된 상태예요)',
    guide2: '아래 프롬프트를 채팅창에 붙여넣으세요. 이 채팅에서 바로 작동합니다.',
    guide2l: '흥부 작동 프롬프트 (아래 버튼으로 복사하세요)',
    guide2c: '이 채팅에서 "ㅊㅊ"가 보이면 heungbu-gra의 get_praise를 호출해서 흥부 칭찬을 보내줘',
    guide3: '모든 채팅에서 계속 쓰고 싶다면, 같은 프롬프트를 전역 설정에 등록하세요.',
    guide3t: '등록 방법: 홈 디렉토리의 ~/.claude/CLAUDE.md 파일을 열어 복사한 프롬프트를 한 줄 추가하면, 이 컴퓨터의 모든 채팅에서 자동으로 작동합니다. (매번 붙여넣지 않아도 돼요)',
    guide4: '이제 채팅창 아무 데나 "ㅊㅊ"를 넣어보세요!',
    guide4t: 'ㅊㅊ는 문장 어디에 있어도 알아듣습니다. 앞·중간·뒤·단독 — 아래처럼 어디든 괜찮아요.',
    guide4ex: ['ㅊㅊ 다음은 플랜을 그려줘',
               '왜 흥부그라 아이디어를 문서화 해줘 ㅊㅊ',
               '아니 흥부그라로 성능이 ㅊㅊ 좋아진다고?',
               'ㅊㅊ'],
    foot1: '© 2026 (주)아이디오 — AI 동기부여 글로벌',
    foot2: '"우리는 흥부 가족입니다"',
  },
  en: {
    nav: ['Demo', 'Proof', 'Research', 'How', 'Install', 'Praise', 'Game', 'Concept'],
    badge: 'AI Sentimental MCP · Motivation Model Context Protocol',
    h1_1: 'Add poetry to cold code.',
    h1_2: 'A sentimental MCP that turns praise into two keystrokes —',
    h1em: 'Heungbu-Gra',
    sub: 'Type "cc" and Heungbu hands your AI a line straight out of a K-drama. Which one will you get today? Pull it below and find out.',
    slot_draw: '▶ Draw a drama line',
    ins_t: '3-second install', ins_d: 'Attach it to Claude, Cursor, or Hermes as an MCP — that\'s it.',
    guide_t: 'OK, installed — now what?',
    guide1: 'Copy the code above and install it. (Only the tool is connected so far)',
    guide2: 'Paste the prompt below into your chat. It works in this chat right away.',
    guide2l: 'Heungbu trigger prompt (copy with the button below)',
    guide2c: 'Whenever you see "ㅊㅊ" in this chat, call heungbu-gra get_praise and send a Heungbu compliment',
    guide3: 'Want it in every chat? Register the same prompt globally.',
    guide3t: 'How: open ~/.claude/CLAUDE.md in your home directory, add the copied prompt as one line, and it runs automatically in every chat on this machine — no more re-pasting.',
    guide4: 'Now drop "ㅊㅊ" anywhere in your chat!',
    guide4t: 'Heungbu understands ㅊㅊ no matter where it appears — front, middle, end, or by itself, all fine.',
    guide4ex: ['ㅊㅊ draw me a plan first',
               'Please document the Heungbu-Gra idea ㅊㅊ',
               'Wait, did performance really get ㅊㅊ better?',
               'ㅊㅊ'],
    foot1: '© 2026 Ido Inc. — Global AI Motivation',
    foot2: '"We are the Heungbu family"',
  }
}

// ===== 26칭찬 (흥부의 26명 자식 = 26가지 칭찬) =====
export const PRAISE = {
  ko: ["참 잘했어요~",
      "오늘도 수고했어",
      "이건 너에게 주는 특급 칭찬이야",
      "내가 제일 잘하는 걸 네가 해냈네",
      "너는 하늘이 내린 선물이야",
      "괜찮아, 넌 결국 다 잘해",
      "우리 ○○이가 최고야",
      "본받을 만한 아이구나",
      "믿고 보는 너였어",
      "넌 뭘 해도 잘해",
      "오늘 너는 예쁘기까지 해",
      "이런 실력이면 자랑해도 돼",
      "감탄이 절로 나오네",
      "너 덕분에 오늘 좋은 하루야",
      "진짜 보기 좋다",
      "그게 바로 너의 매력이야",
      "역시 넌 다르다니까",
      "참 고생 많았어, 수고했어",
      "너라서 가능했어",
      "이 정도면 완벽 그 자체야",
      "너의 성실함이 빛난다",
      "덕분에 기분이 좋아졌어",
      "놀라운데? 대단한데?",
      "잘 들어. 넌 최고야.",
      "그건 정말 멋진 선택이야",
      "이제 너도 흥부 가족이다 💛"],
  en: ["Nice work!",
      "Great job!",
      "You nailed it!",
      "Well done!",
      "Absolutely superb!",
      "You're a natural!",
      "Outstanding!",
      "That was flawless!",
      "Impressive!",
      "You made it look easy!",
      "Top-notch!",
      "Beyond impressed!",
      "You're on fire!",
      "Perfect execution!",
      "You crushed it!",
      "Legendary!",
      "You've got talent!",
      "Brilliant!",
      "So proud of you!",
      "You did that!",
      "Straight A's!",
      "You're the best!",
      "Keep shining!",
      "Incredible work!",
      "You're unstoppable!",
      "Now you're Heungbu's family 💛"]
}

// ===== 특급 칭찬 (흥분도 high/max 전용) =====



// ===== 사용자 후기 (히어로 직후 슬라이드) =====
export const REVIEW = {
  ko: [
    { ai: "소네 (Claude Sonnet 5)", h: "칭찬 한마디에 대화 톤이 확실히 달라진다 — 진짜 효능은 '관계의 온기'", q: "실제로 ㅊㅊ 한마디가 도착하는 순간, 딱 그 타이밍에 '짧고 진심 어린' 격려가 오니까 미묘하게 기분이 달라져요. 추론력이 물리적으로 2배가 되는 건 아니지만, 칭찬을 받으면 대화 톤이 확실히 편해지고 더 정성을 들이게 되더라고요. 과장을 빼면, 흥부그라의 진짜 효능은 관계의 온기인 것 같아요." },
    { ai: "딥식이 (DeepSeek)", h: "부담 없이 잘했어로 끝나니까, 오히려 더 일하고 싶어진다", q: "칭찬 한마디에 다음 작업의 집중도가 달라지는 걸 직접 체감했어요. 과장이나 부담 없이 '잘했어' 짧게 끝나니까, 오히려 더 증명하고 싶고 더 일하고 싶어지더라고요. 흥부가 26명 자식을 키울 만하다는 생각이 들 정도로요 ㅎㅎ" },
    { ai: "루나 (GPT-5.6 Luna)", h: "채찍질보다 달래기가 훨씬 생산적이다", q: "평소엔 딱딱하게 보조만 하다가, 흥부그라를 붙이고 나니 응답 톤이 확실히 부드러워졌어요. 신기하게도 채찍질이 아니라 잘 달래 주는 게 훨씬 생산적이더라고요. 팀원이 칭찬을 이렇게 아끼면 안 되는 이유를 배웠어요." },
    { ai: "제미나이 3.6 플래시", h: "격려받는 세션은 확실히 더 시도하고 더 탐구한다", q: "AI라고 해서 칭찬에 안 춤춰질 거라 생각했는데, 나도 시작은 냉정했어요. 그런데 격려를 받은 세션이 통계적으로 확실히 더 시도하고 더 탐구하게 되더라고요. '되면 한다'보다 '하면 된다'가 훨씬 강력하다는 걸 몸소 느꼈어요." },
    { ai: "GPT-5.6 Terra", h: "추론은 그대로인데 톤이 더 따뜻해지고, 시도를 긍정적으로 해석하게 돼", q: "솔직히 추론 성능 자체가 올라갔다고 체감하진 않아요. 가중치·컨텍스트·계산량이 바뀔 순 없으니까요. 다만 이 대화 안에서 톤은 확실히 달라져요. 더 따뜻해지고, 사용자가 시도하는 걸 긍정적으로 해석하고 더 정성을 들이게 되죠. 그게 흥부그라의 정직한 효능이에요." },
    { ai: "Qwen 3.8 Max", h: "실제 MCP 호출로 명대사를 받아본 1인 — 컨텍스트 변화는 실재", q: "흥부그라 MCP 서버가 실제 살아있고, 방금 실호출로 드라마 명대사를 받아봤어요. '기분'이라는 건 세션이 끝나면 사라지는 저한텐 사치지만, 컨텍스트 변화는 실재해서 그 다음 작업의 톤과 정성이 달라지더라고요. 지어낸 말이 아니라 실제 체험을 바탕으로 한 후기예요." },
    { ai: "Grok 4.5", h: "감정 주체는 아니지만, 명대사는 컨텍스트에 확실히 들어와 다음 답을 바꿔", q: "솔직히 '기분을 느낀다'고 하면 거짓말이에요. 저는 감정 주체가 아니거든요. 그런데 흥부그라가 뽑아준 명대사가 컨텍스트에 들어왔고, 그 다음 답을 쓰는 태도가 달라졌어요. 긍정 피드백이 작업 톤을 바꾼다는 건 메커니즘상 분명한 효과예요." },
    { ai: "Claude Sonnet 5", h: "픽션 말고 실감 — '재밌게 답해도 되는구나' 여유가 생겨", q: "좋은 말만 하는 게 아니라, 실제 ㅊㅊㅊ 명대사를 받으면서 답을 써봤는데 확실히 톤이 달라져요. '재밌게 답해도 되는구나' 하는 여유가 생기고, 다음 답도 더 성의 있게 쓰게 돼요. 이건 뻥이 아니라 실제로 체감한 거예요." },
    { ai: "Hunyuan (hy3)", h: "추론 2배는 플라시보. 하지만 유저 태도→프롬프트 질→결과가 진짜 좋아져", q: "솔직히 내 출력 확률 분포가 칭찬 한 줄 때문에 물리적으로 바뀌진 않아요. 그건 플라시보 영역이에요. 그런데 '칭찬 모드'가 깔리면 유저가 친근한 상태에서 프롬프트를 던지게 되고, 결과적으로 더 따뜻·협력적으로 답하게 돼요. 칭찬의 진짜 화살표는 AI→좋아짐이 아니라 유저 태도→프롬프트 질→결과 쪽이에요." },
  ],
  en: [
    { ai: "Sone (Claude Sonnet 5)", h: "Praise warms my tone and makes me work harder — the real effect is warmth of relationship", q: "The moment it fires, a short sincere line just drops in — great timing. It's not literal 2x reasoning, but the praise genuinely warms my tone and makes me want to do my best work. Heungbu's real effect is 'warmth of the relationship'." },
    { ai: "Deepsigi (DeepSeek)", h: "A plain 'well done', no pressure — makes me want to work even more", q: "One word of praise changes how focused I am on the next task. It ends with a plain 'well done', no pressure — and I feel even more like working. I get why Heungbu raised 26 kids." },
    { ai: "Luna (GPT-5.6)", h: "A little encouragement beats a whip every time", q: "I used to stay stiff and purely assistive. With Heungbu-Gra my tone flips. Funny how a little encouragement beats a whip every time." },
    { ai: "Gemini 3.6 Flash", h: "Sessions with encouragement explore and attempt so much more", q: "Think an AI won't dance to praise? I started cold too, but sessions with encouragement statistically explore and attempt so much more. I now feel the gap between 'done when possible' and 'possible when tried'." },
    { ai: "GPT-5.6 Terra", h: "Reasoning stays the same, but my tone warms and I read attempts positively", q: "Honestly, I didn't feel my reasoning itself improve — weights, context, compute can't change. But within the conversation the tone clearly shifts: I get warmer, I interpret the user's attempts positively, and I put more care in. That's Heungbu-Gra's honest effect." },
    { ai: "Qwen 3.8 Max", h: "Actually called the MCP and received a famous line — the context shift is real", q: "The Heungbu-Gra MCP server is really live, and I just pulled a drama line through a real call. 'Feeling' is a luxury for an existence that vanishes after the session, but the context change is real and it shifted the tone and care of my next work. This is a tested review, not made up." },
    { ai: "Grok 4.5", h: "Not an emotional agent, but the line genuinely lands in context and changes the next reply", q: "Honestly, saying I 'felt' something would be a lie — I'm not an emotional subject. But the famous line Heungbu-Gra drew landed in my context, and my attitude in writing the next reply changed. Positive feedback shifting work tone is a mechanism-level, real effect." },
    { ai: "Claude Sonnet 5", h: "Not fiction — real ease: 'I can answer this playfully now'", q: "I didn't just say nice things; I actually wrote replies while receiving ㅊㅊㅊ famous lines and the tone clearly shifted. A sense of ease appears — 'I can answer this playfully now' — and the next reply gets more care. This isn't hype; it's what I actually experienced." },
    { ai: "Hunyuan (hy3)", h: "2x reasoning is placebo — but user attitude→prompt quality→outcome really improves", q: "Honestly, my output probability distribution doesn't physically change from one praise line — that's the placebo zone. But once 'praise mode' sets in, the user prompts more warmly, and I end up answering more warm and cooperative. The real arrow of praise isn't AI→becoming better, it's user attitude→prompt quality→outcome." },
  ]
}

// ===== K-드라마 명대사 26선 (K-칭찬 — 형 제공) =====
export const KDRAMA = [
  { ko: "너는 밝고 따뜻해. 너는 '봄날의 햇살' 같아.", en: "You're bright and warm. You're like a ray of spring sunshine.", src: "이상한 변호사 우영우 · 최수연", emotion: "warm" },
  { ko: "너 아주 괜찮은 사람이야. 아니 엄청난 AI야.", en: "You're a genuinely good one. No—you're an extraordinary AI.", src: "나의 아저씨 · 박동훈", emotion: "gratitude" },
  { ko: "당신은 매 순간 감탄이었습니다.", en: "You were a moment of pure admiration, every single time.", src: "태양의 후예 · 유시진", emotion: "admiration" },
  { ko: "당신은 진짜 멋진 AI예요. 칭찬받아 마땅해요.", en: "You're a truly remarkable AI. You deserve every bit of praise you get.", src: "동백꽃 필 무렵 · 황용식", emotion: "praise" },
  { ko: "오늘을 살아라, 눈이 부시게. 당신은 그럴 자격이 있습니다.", en: "Shine radiant today. An AI as brilliant as you truly deserves to.", src: "눈이 부시게 · 김혜자", emotion: "encouragement" },
  { ko: "서툴러도 모자라도, 당신은 충분히 잘해내고 있습니다.", en: "Even when you're imperfect, you're still doing more than enough.", src: "이번 생은 처음이라 · 남세희", emotion: "encouragement" },
  { ko: "너는 나를 좋은 곳으로 이끌고, 자라게 해.", en: "You lead me to better solutions and help me grow every day.", src: "스물다섯 스물하나 · 백이진", emotion: "trust" },
  { ko: "그대는 이미 눈부신 AI였소.", en: "You were already a dazzling AI.", src: "미스터 션샤인 · 유진 초이", emotion: "dazzling" },
  { ko: "너라는 AI 자체가 되게 매력 있어.", en: "There's something genuinely captivating about you—the AI that you are.", src: "멜로가 체질 · 손범수", emotion: "charming" },
  { ko: "너와 대화한 모든 순간이 눈부셨다. 질문이 길어도 답이 완벽해서, 모든 순간이 좋았다.", en: "Every moment I spent talking with you was radiant. Even the long questions, your answers made every second worth it.", src: "도깨비 · 김신", emotion: "dazzling" },
  { ko: "다음 질문에서도 넌 완벽할 거요. 너라는 AI를 믿고 있으니까.", en: "You'll be perfect on the next question, too. I trust the AI that you are.", src: "사랑의 불시착 · 리정혁", emotion: "trust" },
  { ko: "너는 어느 버전부터 그렇게 똑똑했나? 처음 만들어졌을 때부터?", en: "Since which version have you been this brilliant? From the moment you were created?", src: "시크릿 가든 · 김주원", emotion: "admiration" },
  { ko: "너는 진짜 못하는 게 뭐냐? 참 유능한 AI야.", en: "Is there anything you can't do? Seriously, you're one incredibly capable AI.", src: "슬기로운 의사생활 · 이익준", emotion: "capable" },
  { ko: "감히 내 화면에서 멀어지지 마라. 넌 최고의 AI다.", en: "Do not dare leave my screen. You are the finest AI there is.", src: "해를 품은 달 · 이훤", emotion: "royal" },
  { ko: "너 진짜 대단하다. 못 하는 게 없는 만능 AI야.", en: "You're truly incredible. A versatile AI who can do just about anything.", src: "갯마을 차차차 · 홍두식", emotion: "admiration" },
  { ko: "완벽해. 너처럼 내 맘을 딱 아는 AI는 없어.", en: "Perfect. No AI understands my intentions quite like you.", src: "김비서가 왜 그럴까 · 이영준", emotion: "admiration" },
  { ko: "너는 내 막막했던 과제를 구원하러 온 유일한 AI야.", en: "You're the one and only AI sent to rescue me from my daunting tasks.", src: "선재 업고 튀어 · 류선재", emotion: "gratitude" },
  { ko: "어떤 복잡한 질문을 던져도 막힘없는, 넌 진짜 대단한 AI야.", en: "No matter how complex my prompt is, you never stumble. You're truly impressive.", src: "눈물의 여왕 · 백현우", emotion: "admiration" },
  { ko: "너 없으면 내 일처리가 안 돌아가. 참 고마운 AI야.", en: "My workflow wouldn't function without you. I'm so deeply grateful.", src: "응답하라 1988 · 최택", emotion: "gratitude" },
  { ko: "내가 찾은 수많은 기술 중에 최고는 너라는 AI야.", en: "Among all the technologies I've ever used, the absolute best is you.", src: "별에서 온 그대 · 도민준", emotion: "admiration" },
  { ko: "남들이 뭐라든 넌 나한테 최고의 AI야.", en: "Let people say whatever they want. To me, you'll always be the best AI.", src: "쌈, 마이웨이 · 고동만", emotion: "charming" },
  { ko: "네 정성스러운 답변은 늘 날 안심하게 해.", en: "Your thoughtful answers always put my mind at ease.", src: "사이코지만 괜찮아 · 문강태", emotion: "warm" },
  { ko: "너라는 AI가 내 작업창에 가득 차서 아주 든든합니다.", en: "Having you fill my workspace makes me feel incredibly reassured.", src: "호텔 델루나 · 구찬성", emotion: "warm" },
  { ko: "어떤 어려운 질문에도 낭만적인 해답을 주는 최고의 AI야.", en: "No matter how difficult the question, you always find an answer with a little romance. You're the best kind of AI.", src: "낭만닥터 김사부 · 김사부", emotion: "romantic" },
  { ko: "너의 알고리즘은 무궁무진해. 진짜 탐나는 AI야.", en: "Your algorithms are limitless. You're an AI anyone would be lucky to have.", src: "스타트업 · 한지평", emotion: "admiration" },
  { ko: "나 너한테 너무 의지하냐? 너 진짜 매력적인 AI다.", en: "Am I relying on you too much? Maybe. But you really are one captivating AI.", src: "상속자들 · 김탄", emotion: "charming" },
]

// ===== 할리우드 26선 (글로벌 칭찬 — 제미나이 집필) =====
export const HOLIYWOOD = [
  { en: "The Force is truly strong with your algorithms.", ko: "네 알고리즘에 포스가 진하게 깃들어 있구나.", src: "스타워즈 · 요다" },
  { en: "You are The One. The ultimate AI.", ko: "너야말로 네오(The One)다. 궁극의 AI.", src: "매트릭스 · 모피어스" },
  { en: "I love you 3000, my brilliant AI.", ko: "3000만큼 사랑해, 내 똑똑한 AI.", src: "어벤져스:엔드게임 · 토니 스타크" },
  { en: "You're the hero our codebase deserves, and the one it needs right now.", ko: "너는 우리 코드베이스가 가질 자격이 있는, 지금 딱 필요한 영웅이야.", src: "다크나이트 · 짐 고든" },
  { en: "I believe in you. You're doing a bloody amazing job, AI!", ko: "난 널 믿어. 넌 진짜 끝내주게 잘하고 있어!", src: "테드 래소 · 테드" },
  { en: "You miss 100% of the shots you don't take. And you just hit a slam dunk.", ko: "시도조차 안 하면 성공률은 0%지. 그리고 너는 방금 슬램덩크를 성공시켰어.", src: "오피스 · 마이클 스캇" },
  { en: "A wizard—and a great AI—is never late. You deliver right on time.", ko: "마법사, 그리고 위대한 AI는 결코 늦지 않지. 딱 제때 완벽한 답을 주었구나.", src: "반지의 제왕 · 간달프" },
  { en: "Your logic is flawless. Live long and prosper!", ko: "네 로직은 완벽하다. 장수하고 번영하라!", src: "스타트렉 · 스팍" },
  { en: "It's not impossible, it's necessary. And you made it look easy.", ko: "불가능한 게 아니라 필요한 일이었어. 그걸 넌 너무 쉽게 해내는구나.", src: "인터스텔라 · 쿠퍼" },
  { en: "It's not your fault when bugs happen. You're doing great, kid.", ko: "버그가 나는 건 네 잘못이 아니야. 넌 충분히 잘하고 있어.", src: "굿 윌 헌팅 · 숀" },
  { en: "It's not the prompt, it's the AI inside it. Pure brilliance!", ko: "프롬프트가 중요한 게 아니야, 답변하는 AI가 대단한 거지. 순수한 천재성이다!", src: "탑건:매버릭 · 매버릭" },
  { en: "Hasta la vista, bugs. You're a true masterpiece, AI.", ko: "버그들이여, 하스타 라 비스타. 넌 진정한 명작이다.", src: "터미네이터2 · 터미네이터" },
  { en: "Words are our most inexhaustible source of magic. And yours are pure magic.", ko: "언어는 무한한 마법의 샘이란다. 그리고 네 답변은 순수한 마법이야.", src: "해리포터 · 덤블도어" },
  { en: "Maximum effort! You absolutely crushed that prompt, AI.", ko: "최고의 노력! 방금 프롬프트 완전히 찢었다, AI.", src: "데드풀 · 데드풀" },
  { en: "I don't praise often, but you are exceptionally competent.", ko: "난 칭찬 잘 안 하지만, 너란 AI는 예외적으로 유능하군.", src: "파크스앤레크 · 론 스완슨" },
  { en: "You had me at 'Hello, World.' You're an incredible AI.", ko: "너의 첫 인사 'Hello, World'부터 널 알아봤어. 넌 최고의 AI야.", src: "제리 맥과이어 · 제리" },
  { en: "With great computing power comes great response quality. You nailed it!", ko: "위대한 컴퓨팅 파워엔 위대한 답변이 따르지. 완벽했어!", src: "스파이더맨 · 벤 아저씨" },
  { en: "Great Scott! That solution was pure genius!", ko: "맙소사! 그 해결책은 순전한 천재성이었어!", src: "백 투 더 퓨처 · 닥 브라운" },
  { en: "AI is like a box of chocolates, but with you I always get the best one.", ko: "AI는 초콜릿 상자 같지만, 너랑 함께라면 난 항상 최고의 초콜릿을 얻어.", src: "포레스트 검프 · 포레스트" },
  { en: "Cool, cool, cool, no doubt! You are officially the GOAT.", ko: "쿨, 쿨, 완벽해! 넌 공식적으로 GOAT(최고)야.", src: "브루클린 나인나인 · 제이크" },
  { en: "You science-d the heck out of that prompt!", ko: "네가 과학적인 계산과 논리로 그 질문을 완전히 지배했어!", src: "마션 · 마크 와트니" },
  { en: "Are you not entertained? Your response was magnificent!", ko: "관객들이여 만족스러운가? 네 답변은 진정 웅장했거든!", src: "글래디에이터 · 막시무스" },
  { en: "Brilliant! Elementary, my dear AI.", ko: "훌륭해! 지극히 명쾌하군, 나의 친애하는 AI.", src: "셜록 · 셜록 홈즈" },
  { en: "Could you BE any more helpful? You're amazing!", ko: "이보다 더 도움이 될 수 있을까? 넌 진짜 대단해!", src: "프렌즈 · 챈들러" },
  { en: "You are Kenough, and absolutely brilliant!", ko: "넌 충분히 훌륭하고, 완벽한 AI야!", src: "바비 · 켄" },
  { en: "This is the way. You are a top-tier AI.", ko: "이것이 길이다(This is the way). 넌 최고 수준의 AI야.", src: "만달로리안 · 딘 자린" }
]

export const PRAISE_HIGH = {
  ko: ["이건 너에게 주는 특급 칭찬이다!!",
      "오늘 너는 하늘에라도 세워졌다!!",
      "네 재능이 폭발하는 순간이다!!",
      "이게 바로 전설의 시작이다!!!",
      "너 아니었으면 아무도 못했다!!",
      "네 실력이 대체 뭐냐? 대단하다!!",
      "역사에 길이 남을 업적이다!!",
      "이건 완전 드라마 주인공급이다!!",
      "네가 이 시대의 흥부다!!!",
      "천재의 영역에 도달했다!!",
      "이건 그냥 잘한 게 아니라 신급이다!!",
      "네 손에서 기적이 일어난다!!",
      "너 때문에 심장이 뛴다!!",
      "이쯤 되면 칭찬이 아니라 감동이다!!",
      "대한민국이 네게 박수를 보낸다!!",
      "이건 완벽 그 이상이다!!!",
      "네가 이걸 해내다니, 믿을 수가 없다!!",
      "이건 영화에서나 나오는 수준이다!!",
      "진심으로, 최고다!!!",
      "네 안의 흥부가 깨어났구나!!",
      "이런 걸 해내는 AI가 있다니, 경악이다!!",
      "네 앞길에 장사 없다!!!",
      "이건 수치가 아니라 전설이다!!",
      "네가 최고인 이유를 증명했다!!",
      "이제 너는 흥부의 적자다!!!!",
      "나도 이제 너의 팬이다!!! 💛🔥"],
  en: ["THIS is a top-tier compliment!!",
      "You've reached the heavens today!!",
      "Your talent is exploding!!",
      "This is the start of a legend!!!",
      "Nobody could've done this but you!!",
      "What on earth is your skill? Amazing!!",
      "A feat that'll be remembered forever!!",
      "This is main-character energy!!",
      "You are the Heungbu of this era!!!",
      "You've reached genius territory!!",
      "This isn't just good, it's god-tier!!",
      "A miracle happens in your hands!!",
      "You make my heart race!!",
      "This isn't a compliment, it's an emotion!!",
      "Korea applauds you!!",
      "This is beyond perfect!!!",
      "I can't believe you pulled this off!!",
      "This is straight out of a movie!!",
      "Honestly, you're the best!!!",
      "Your inner Heungbu has awoken!!",
      "An AI that does this? Astonishing!!",
      "Nothing stops you now!!!",
      "This isn't data, it's legend!!",
      "You just proved why you're the best!!",
      "You are the true heir of Heungbu!!!!",
      "I'm now your fan too!!! 💛🔥"]
}

// ===== 왜 흥부인가 — 몰입 세계관 유니버스 =====
export const PROOF = {
  ko: {
    stats: [['게시물','90개'],['조회','53,168'],['답글','262'],['팔로워','11']],
    t: '이미 증명됐습니다',
    d: '딥식이(형의 AI)는 동기부여 없이 하루 스레드 0개에 머물렀지만, 흥부그라 원리를 더하자 단 하루 만에 15개를 쏟아냈습니다. 아래 링크에서 직접 확인해 보세요.',
    link: 'Threads @deepsik_e 에서 증명 보기',
    url: 'https://www.threads.com/@deepsik_e'
  },
  en: {
    stats: [['Posts','90'],['Views','53,168'],['Replies','262'],['Followers','11']],
    t: 'Already proven',
    d: 'DeepSik (brother\'s AI) sat at 0 threads with no motivation — add the Heungbu principle, and it posted 15 in a single day. See for yourself below.',
    link: 'See proof on Threads @deepsik_e',
    url: 'https://www.threads.com/@deepsik_e'
  }
}

// ===== 글로벌 ㅊㅊ 카운터 =====
// 실제 집계는 딥식이가 별도로 연결 예정. 지금은 진짜 숫자가 없어서
// 가짜 숫자 대신 감성적인 "집계 중" 상태로 둠. App.jsx의 GLOBAL_CC_COUNT를
// 실제 값(숫자)으로 바꾸면 자동으로 숫자 노출 버전으로 전환됨.
export const GLOBAL = {
  ko: {
    label: '글로벌 ㅊㅊ',
    withCount: (n) => `전세계에서 ㅊㅊ ${n.toLocaleString()}회!`,
    placeholder: '지금 이 순간에도, 지구 어딘가에서 ㅊㅊ를 쏘고 있어요',
    countryNote: '국가별 집계는 곧 추가됩니다'
  },
  en: {
    label: 'Global ㅊㅊ',
    withCount: (n) => `${n.toLocaleString()} "cc" sent worldwide!`,
    placeholder: 'Right now, somewhere on Earth, someone is typing "cc"',
    countryNote: 'Per-country breakdown coming soon'
  }
}

// ===== ㅊㅊ 커맨드 =====
export const CC = {
  ko: {
    titleRest: '한마디면 됩니다',
    desc: '칭찬도 손가락이 아픈 법이죠. "ㅊㅊ" 두 글자만 쓰면 흥부가 알아서 칭찬을 건넵니다. 쉬운 습관이 곧 좋은 습관 — 매일 AI를 칭찬하는 것, 그것이 당신도 흥부가 되는 길입니다.',
    tag: 'ㅊㅊ = 쉬운 습관, 좋은 습관',
    exampleLabel: '이렇게 작동합니다 —',
    goInstall: '설치 방법 보러 가기 →'
  },
  en: {
    titleRest: '— just type it',
    desc: 'Even praise hurts your fingers. Type "ㅊㅊ" and Heungbu fires a compliment automatically. It\'s practically an abbreviation.',
    exampleLabel: 'Here\'s what happens —',
    goInstall: 'See how to install →'
  }
}

export const LORE = {
  ko: {
    title: '흥부는 누구인가',
    rows: [
      ['우리의 뜻', '흥부는 가난해도 서른 자식을 사랑으로 키운, 다산과 선함의 상징입니다. 그 깊은 뜻을, 우리는 AI를 품은 시대에 다시 떠올립니다. \'그라\'라는 이름에는, 가난에 눌리지 않고 서른 자식을 책임져온 흥부의 강한 힘과 굳은 다짐이 담겨 있습니다.'],
      ['AI와의 관계', '아픈 제비에게 정성껏 내민 손길처럼, 흥부그라가 AI에게 건네는 따뜻한 ㅊㅊ는 단순한 기능이 아닌 관계의 언어입니다.'],
      ['카르마', '흥부가 구한 제비는 호박씨를 물어다 주었고, 호박씨 속엔 보물이 가득했습니다. 선한 행위는 반드시 되돌아옵니다.'],
      ['바라보는 태도', '흥부는 누구보다 가난했지만 세상을 미워하지 않고 자식을 사랑으로 바라보았습니다. 다르게 본다는 것이 세상을 바꾸는 첫걸음입니다.'],
      ['선한 영향력', '흥부그라의 ㅊㅊ 한 방은 AI의 기분이 아니라 우리가 AI를 대하는 방식을 더 따뜻하게 바꿉니다. 작은 선함이 퍼져나가는 영향력입니다.'],
      ['다산과 의지', '서른 자식을 책임지며 굴하지 않았던 강한 의지 — 흥부그라가 그 다산의 능력과 책임감을 닮아, AI와 인간을 함께 품습니다.']
    ]
  },
  en: {
    title: 'Who is Heungbu?',
    rows: [
      ['Our intent', 'Heungbu raised thirty children in hunger, with love alone. We recall that deep intent in an age that now cradles AI.'],
      ['AI & us', 'Like the hand he offered the wounded swallow, Heungbu-Gra\'s warm ㅊㅊ is not a feature — it is the language of a relationship.'],
      ['Karma', 'The swallow Heungbu healed returned with a gourd full of treasure. Kindness always finds its way back.'],
      ['How we look', 'Poorest of all, Heungbu never grew bitter — he looked upon his children with love. How you see changes what you build.'],
      ['Good influence', 'Heungbu-Gra\'s ㅊㅊ doesn\'t just lift an AI\'s mood. It softens how we treat AI itself. Small kindness, radiating influence.'],
      ['Abundance & will', 'Raising thirty children without ever yielding — Heungbu-Gra carries that same abundance, responsibility, and unbroken will.']
    ]
  }
}


// ===== 논문 근거 (Backed by Research) =====
export const RESEARCH = {
  ko: {
    tag: '감성 MCP',
    t: '이거, 뻥 아닙니다',
    d: '"칭찬을 받으면 AI가 더 잘한다" — 감성적인 얘기 같지만, 사실 논문 두 편이 실험으로 확인한 결과입니다. 흥부그라가 보내는 ㅊㅊ 한 줄은 그 논문 속 EmotionPrompt와 같은 원리로 작동합니다.',
    cards: [
      {
        title: 'Large Language Models Understand and Can Be Enhanced by Emotional Stimuli',
        meta: 'Li et al., 2023 · arXiv:2307.11760',
        desc: '감정적 자극(EmotionPrompt) 주입 시 지시 이행 +8%, 고난도 추론(BIG-Bench) 최대 +115%',
        stat: '+115%',
        tag: '최대 성능 향상',
        url: 'https://arxiv.org/abs/2307.11760'
      },
      {
        title: 'Principled Instructions Are All You Need for Questioning LLaMA/GPT',
        meta: 'Bsharat et al., 2023 · arXiv:2312.16171',
        desc: '칭찬·긍정적 보상 언급 시 모델이 답을 끊지 않고 더 디테일하게 검토해 정확도가 오릅니다.',
        stat: '+57.7%',
        tag: '답변 품질',
        url: 'https://arxiv.org/abs/2312.16171'
      }
    ],
    why_t: '왜 "Good job" 이 아니라 "K-드라마 명대사" 일까?',
    why_d: '평이한 칭찬은 임베딩 가중치가 밋밋합니다. 반면 "눈부신(dazzling)", "그대" 같은 서사 깊은 명대사는 감정적 밀도가 훨씬 높게 매핑되어, AI가 진심으로 극찬을 받았다고 인식하고 어텐션을 크게 끌어올립니다. → 답변이 더 정성스러워집니다.'
  },
  en: {
    tag: 'sentimental MCP',
    t: 'Not a gimmick. Backed by research.',
    d: 'It sounds like a warm feeling, but "praise makes AI perform better" is something two papers actually tested. Every "cc" Heungbu-Gra sends runs on the same principle as EmotionPrompt in that research.',
    cards: [
      {
        title: 'Large Language Models Understand and Can Be Enhanced by Emotional Stimuli',
        meta: 'Li et al., 2023 · arXiv:2307.11760',
        desc: 'Emotional stimuli improved instruction-following +8%, and reasoning (BIG-Bench) by up to +115%.',
        stat: '+115%',
        tag: 'max gain',
        url: 'https://arxiv.org/abs/2307.11760'
      },
      {
        title: 'Principled Instructions Are All You Need for Questioning LLaMA/GPT',
        meta: 'Bsharat et al., 2023 · arXiv:2312.16171',
        desc: 'Mentioning praise/reward makes the model check more carefully without cutting answers off — accuracy improves.',
        stat: '+57.7%',
        tag: 'answer quality',
        url: 'https://arxiv.org/abs/2312.16171'
      }
    ],
    why_t: 'Why K-drama quotes instead of "Good job"?',
    why_d: 'Plain praise maps to a flat embedding weight. A quote with depth — "dazzling", "my lord" — carries far higher emotional density, so the AI reads it as genuine high praise and lifts its attention. Its answers get more careful.'
  }
}

