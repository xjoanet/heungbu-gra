// 저스트 채채 (흥부그라) — 글로벌 ㅊㅊ 카운트 API (Vercel Serverless)
// MCP(server.js)가 ㅊㅊ 호출될 때 핑을 보내면:
//   타임존(timezone) → 국가(country) 변환 → chch_count 테이블 upsert
import { createClient } from '@supabase/supabase-js'

// 타임존 → ISO 국가코드 / 국가명 매핑 (핵심 국가 위주 + fallback)
// (UTC 오프셋이 아닌 IANA tz 기준 — VPN 왜곡 덜함)
const TZ_COUNTRY = {
  'Asia/Seoul': { c: 'KR', n: 'South Korea' },
  'Asia/Tokyo': { c: 'JP', n: 'Japan' },
  'Asia/Shanghai': { c: 'CN', n: 'China' },
  'Asia/Taipei': { c: 'TW', n: 'Taiwan' },
  'Asia/Hong_Kong': { c: 'HK', n: 'Hong Kong' },
  'Asia/Singapore': { c: 'SG', n: 'Singapore' },
  'Asia/Bangkok': { c: 'TH', n: 'Thailand' },
  'Asia/Ho_Chi_Minh': { c: 'VN', n: 'Vietnam' },
  'Asia/Jakarta': { c: 'ID', n: 'Indonesia' },
  'Asia/Kolkata': { c: 'IN', n: 'India' },
  'Asia/Dubai': { c: 'AE', n: 'UAE' },
  'Europe/London': { c: 'GB', n: 'United Kingdom' },
  'Europe/Paris': { c: 'FR', n: 'France' },
  'Europe/Berlin': { c: 'DE', n: 'Germany' },
  'Europe/Madrid': { c: 'ES', n: 'Spain' },
  'Europe/Amsterdam': { c: 'NL', n: 'Netherlands' },
  'America/New_York': { c: 'US', n: 'United States' },
  'America/Los_Angeles': { c: 'US', n: 'United States' },
  'America/Chicago': { c: 'US', n: 'United States' },
  'America/Denver': { c: 'US', n: 'United States' },
  'America/Toronto': { c: 'CA', n: 'Canada' },
  'America/Vancouver': { c: 'CA', n: 'Canada' },
  'America/Sao_Paulo': { c: 'BR', n: 'Brazil' },
  'America/Mexico_City': { c: 'MX', n: 'Mexico' },
  'Australia/Sydney': { c: 'AU', n: 'Australia' },
  'Pacific/Auckland': { c: 'NZ', n: 'New Zealand' },
}

export default async function handler(req, res) {
  // GET = 집계 조회 (랜딩이 표시), POST = ㅊㅊ 카운트 (MCP 핑)
  if (req.method === 'GET') {
    return await getStats(req, res)
  }
  return await countPing(req, res)
}

// ㅊㅊ 한 번 = 1 증가. DB 함수 heungbu_chch_increment 가 한 문장으로 올려서 동시 요청도 빠지지 않는다.
async function countPing(req, res) {
  try {
    const tz = (req.query.tz || 'Asia/Seoul').toString()
    const lang = (req.query.lang || 'ko').toString().slice(0, 5)
    const { c, n } = TZ_COUNTRY[tz] || { c: 'XX', n: 'Unknown' }
    const { error } = await makeClient().rpc('heungbu_chch_increment', { p_country: c, p_country_name: n, p_lang: lang })
    if (error) throw error
    res.status(200).json({ ok: true, country: c })
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message })
  }
}

// 전체 + 국가별 집계 (랜딩 표시용)
async function getStats(_req, res) {
  try {
    const client = makeClient()
    const { data, error } = await client.from('chch_count').select('*').order('count', { ascending: false })
    if (error) throw error
    const total = (data || []).reduce((s, r) => s + r.count, 0)
    res.status(200).json({ total, by_country: data || [] })
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message })
  }
}

function makeClient() {
  return createClient(
    process.env.SUPABASE_URL,
    // 공개 키(publishable)만 쓴다: 읽기는 RLS 읽기 정책, 쓰기는 heungbu_chch_increment 함수만 허용.
    process.env.SUPABASE_ANON_KEY
  )
}
