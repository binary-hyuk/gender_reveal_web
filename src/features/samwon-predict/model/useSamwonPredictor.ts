import { useState } from "react";
import {
  aggregateByRange,
  fallbackTieBreaker,
  validateRange,
  normalizeRange,
} from "@/shared/lib/dateRangePrediction";

// ============================================================
// 삼원공명(三元共鳴) 태아 성별 예측 알고리즘
// ============================================================

export type SamwonGender = "Boy" | "Girl";

export enum Element {
  Wood = 0,
  Fire = 1,
  Earth = 2,
  Metal = 3,
  Water = 4,
}

export enum YinYang {
  Yang = 0,
  Yin = 1,
}

const ELEMENT_NAMES: Record<Element, string> = {
  [Element.Wood]: "木 (목)",
  [Element.Fire]: "火 (화)",
  [Element.Earth]: "土 (토)",
  [Element.Metal]: "金 (금)",
  [Element.Water]: "水 (수)",
};

const STEM_NAMES = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];

export interface SamwonResult {
  gender: SamwonGender;
  mother: { stem: number; element: Element; yinyang: YinYang };
  father: { stem: number; element: Element; yinyang: YinYang };
  conception: { stem: number; element: Element; yinyang: YinYang };
  scores: {
    interaction: number;
    yinyang: number;
    lunar: number;
    intuition: number;
    total: number;
    normalized: number;
  };
  stemNames: { mother: string; father: string; conception: string };
  elementNames: { mother: string; father: string; conception: string };
  yinyangNames: { mother: string; father: string; conception: string };
}

// ============================================================
// 유틸리티 함수
// ============================================================

function julianDayNumber(year: number, month: number, day: number): number {
  let y = year;
  let m = month;
  if (m <= 2) {
    y -= 1;
    m += 12;
  }
  const A = Math.floor(y / 100);
  const B = 2 - A + Math.floor(A / 4);
  return (
    Math.floor(365.25 * (y + 4716)) +
    Math.floor(30.6001 * (m + 1)) +
    day +
    B -
    1524.5
  );
}

function parseDate(dateStr: string): { year: number; month: number; day: number } {
  const parts = dateStr.split("-").map(Number);
  return { year: parts[0], month: parts[1], day: parts[2] ?? 15 };
}

function heavenlyStem(year: number, month: number, day: number): number {
  const jdn = julianDayNumber(year, month, day);
  return ((Math.floor(jdn) - 2451551) % 10 + 10) % 10;
}

function stemToElement(stem: number): Element {
  return Math.floor(stem / 2) as Element;
}

function stemToYinYang(stem: number): YinYang {
  return (stem % 2) as YinYang;
}

function elementInteraction(a: Element, b: Element): number {
  if (a === b) return 1;
  if ((a + 1) % 5 === b) return 2;
  if ((b + 1) % 5 === a) return -1;
  if ((a + 2) % 5 === b) return -2;
  return 0;
}

function lunarPhase(year: number, month: number, day: number): number {
  const jdn = julianDayNumber(year, month, day);
  const synodicMonth = 29.53059;
  const referenceNewMoon = 2451550.1;
  const phase = ((jdn - referenceNewMoon) % synodicMonth + synodicMonth) % synodicMonth;
  return phase / synodicMonth;
}

function hadoElement(n: number): Element {
  const map: Record<number, Element> = {
    1: Element.Water,
    2: Element.Fire,
    3: Element.Wood,
    4: Element.Metal,
    5: Element.Earth,
    6: Element.Water,
    7: Element.Fire,
    8: Element.Wood,
    9: Element.Metal,
  };
  return map[n];
}

// ============================================================
// 순수 예측 함수
// ============================================================

/**
 * motherBirth, fatherBirth: "YYYY-MM-DD"
 * conceptionMonth: "YYYY-MM" (또는 "YYYY-MM-DD" 허용)
 */
export function predictBySamwon(
  motherBirth: string,
  fatherBirth: string,
  conceptionMonth: string,
  intuition: number
): SamwonResult {
  const mDate = parseDate(motherBirth);
  const fDate = parseDate(fatherBirth);
  const cDate = parseDate(conceptionMonth);

  const stemM = heavenlyStem(mDate.year, mDate.month, mDate.day);
  const stemF = heavenlyStem(fDate.year, fDate.month, fDate.day);
  const stemC = heavenlyStem(cDate.year, cDate.month, cDate.day);

  const elemM = stemToElement(stemM);
  const elemF = stemToElement(stemF);
  const elemC = stemToElement(stemC);

  const yyM = stemToYinYang(stemM);
  const yyF = stemToYinYang(stemF);
  const yyC = stemToYinYang(stemC);

  const interactionScore =
    elementInteraction(elemM, elemC) * 3 +
    elementInteraction(elemF, elemC) * 2 +
    elementInteraction(elemM, elemF) * 1;

  const yangCount = (1 - yyM) + (1 - yyF) + (1 - yyC);
  const yinCount = 3 - yangCount;
  const yinyangScore = (yangCount - yinCount) * 4;

  const phase = lunarPhase(cDate.year, cDate.month, cDate.day);
  const lunarScore = Math.round(Math.sin(phase * 2 * Math.PI) * 10);

  const intuitionElem = hadoElement(intuition);
  const intuitionYY = intuition % 2 === 0 ? YinYang.Yin : YinYang.Yang;
  const intuitionScore =
    elementInteraction(intuitionElem, elemC) * 2 +
    (intuitionYY === YinYang.Yang ? 3 : -3);

  const total = interactionScore + yinyangScore + lunarScore + intuitionScore;
  const normalized = ((total % 49) + 49) % 49;
  const gender: SamwonGender = normalized >= 25 ? "Boy" : "Girl";

  return {
    gender,
    mother: { stem: stemM, element: elemM, yinyang: yyM },
    father: { stem: stemF, element: elemF, yinyang: yyF },
    conception: { stem: stemC, element: elemC, yinyang: yyC },
    scores: {
      interaction: interactionScore,
      yinyang: yinyangScore,
      lunar: lunarScore,
      intuition: intuitionScore,
      total,
      normalized,
    },
    stemNames: {
      mother: STEM_NAMES[stemM],
      father: STEM_NAMES[stemF],
      conception: STEM_NAMES[stemC],
    },
    elementNames: {
      mother: ELEMENT_NAMES[elemM],
      father: ELEMENT_NAMES[elemF],
      conception: ELEMENT_NAMES[elemC],
    },
    yinyangNames: {
      mother: yyM === YinYang.Yang ? "陽" : "陰",
      father: yyF === YinYang.Yang ? "陽" : "陰",
      conception: yyC === YinYang.Yang ? "陽" : "陰",
    },
  };
}

// ============================================================
// Hook
// ============================================================

export interface SamwonState {
  motherBirthDate: string;
  fatherBirthDate: string;
  conceptionStart: string;
  conceptionEnd: string;
  intuition: number;
  result: SamwonResult | null;
  error: string | null;
}

export interface SamwonActions {
  setMotherBirthDate: (v: string) => void;
  setFatherBirthDate: (v: string) => void;
  setConceptionStart: (v: string) => void;
  setConceptionEnd: (v: string) => void;
  setIntuition: (v: number) => void;
  predict: () => void;
  reset: () => void;
}

export function useSamwonPredictor(): SamwonState & SamwonActions {
  const [motherBirthDate, setMotherBirthDate] = useState("");
  const [fatherBirthDate, setFatherBirthDate] = useState("");
  const [conceptionStart, setConceptionStart] = useState("");
  const [conceptionEnd, setConceptionEnd] = useState("");
  const [intuition, setIntuition] = useState(5);
  const [result, setResult] = useState<SamwonResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  function predict() {
    setError(null);

    if (!motherBirthDate || !fatherBirthDate) {
      setError("엄마·아빠 생년월일을 입력해주세요.");
      return;
    }

    if (intuition < 1 || intuition > 9) {
      setError("직감수는 1~9 사이여야 합니다.");
      return;
    }

    const [startIso, endIso] = normalizeRange(conceptionStart, conceptionEnd);
    const rangeErr = validateRange(startIso, endIso);
    if (rangeErr) {
      setError(rangeErr);
      return;
    }

    try {
      const aggregated = aggregateByRange<SamwonResult>(
        startIso,
        endIso,
        (iso) => predictBySamwon(motherBirthDate, fatherBirthDate, iso, intuition),
        fallbackTieBreaker,
      );
      const { rangeInfo: _r, ...rest } = aggregated;
      void _r;
      setResult(rest);
    } catch (e) {
      setError((e as Error).message);
    }
  }

  function reset() {
    setMotherBirthDate("");
    setFatherBirthDate("");
    setConceptionStart("");
    setConceptionEnd("");
    setIntuition(5);
    setResult(null);
    setError(null);
  }

  return {
    motherBirthDate, fatherBirthDate, conceptionStart, conceptionEnd, intuition, result, error,
    setMotherBirthDate, setFatherBirthDate, setConceptionStart, setConceptionEnd, setIntuition, predict, reset,
  };
}
