/**
 * 달(Moon)의 황도 경도를 계산하여 별자리를 반환합니다.
 *
 * 알고리즘: Meeus "Astronomical Algorithms" 기반 주요 섭동항 포함 근사 계산
 * 정확도: ~1–2° (황도 한 별자리 폭 30°이므로 경계 근방 제외 충분)
 */

export const ZODIAC_SIGNS = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
] as const;

export type ZodiacSign = (typeof ZODIAC_SIGNS)[number];

export const MALE_SIGNS: readonly ZodiacSign[] = [
  "Aries",
  "Gemini",
  "Leo",
  "Libra",
  "Sagittarius",
  "Aquarius",
];

export const FEMALE_SIGNS: readonly ZodiacSign[] = [
  "Taurus",
  "Cancer",
  "Virgo",
  "Scorpio",
  "Capricorn",
  "Pisces",
];

const ZODIAC_SIGN_KO: Record<ZodiacSign, string> = {
  Aries: "양자리",
  Taurus: "황소자리",
  Gemini: "쌍둥이자리",
  Cancer: "게자리",
  Leo: "사자자리",
  Virgo: "처녀자리",
  Libra: "천칭자리",
  Scorpio: "전갈자리",
  Sagittarius: "사수자리",
  Capricorn: "염소자리",
  Aquarius: "물병자리",
  Pisces: "물고기자리",
};

export function getZodiacSignKo(sign: ZodiacSign): string {
  return ZODIAC_SIGN_KO[sign];
}

/** UTC 날짜 → 율리우스 날짜 수(Julian Day Number) */
function toJulianDay(date: Date): number {
  const Y = date.getUTCFullYear();
  const M = date.getUTCMonth() + 1;
  const D = date.getUTCDate();
  const A = Math.floor((14 - M) / 12);
  const y = Y + 4800 - A;
  const m = M + 12 * A - 3;
  return (
    D +
    Math.floor((153 * m + 2) / 5) +
    365 * y +
    Math.floor(y / 4) -
    Math.floor(y / 100) +
    Math.floor(y / 400) -
    32045
  );
}

const DEG = Math.PI / 180;

/** 날짜에 해당하는 달의 황도 경도 (0–360°) */
export function getMoonEclipticLongitude(date: Date): number {
  const JD = toJulianDay(date);
  const T = (JD - 2451545.0) / 36525;

  const L0 = (218.3165 + 481267.8813 * T) % 360; // 평균 경도
  const M = (134.9634 + 477198.8676 * T) % 360;  // 달 평균 근점각
  const D = (297.8502 + 445267.1115 * T) % 360;  // 평균 이각
  const Ms = (357.5291 + 35999.0503 * T) % 360;  // 태양 평균 근점각
  const F = (93.272 + 483202.0175 * T) % 360;    // 위도 인수

  // 주요 섭동항 (단위: 도)
  const dL =
    6.289 * Math.sin(M * DEG) -
    1.274 * Math.sin((2 * D - M) * DEG) +
    0.658 * Math.sin(2 * D * DEG) +
    0.214 * Math.sin(2 * M * DEG) -
    0.186 * Math.sin(Ms * DEG) -
    0.114 * Math.sin(2 * F * DEG);

  let lon = (L0 + dL) % 360;
  if (lon < 0) lon += 360;
  return lon;
}

/** 날짜에 해당하는 달의 황도 별자리 */
export function getMoonSign(date: Date): ZodiacSign {
  const lon = getMoonEclipticLongitude(date);
  return ZODIAC_SIGNS[Math.floor(lon / 30)];
}
