import { useState } from "react";
import { getChineseAge, solarToLunar } from "@/shared/lib/lunarConverter";
import { getAgeAtDate } from "@/shared/lib/ageUtils";
import { predictGender } from "@/features/gender-predict/model/genderTable";
import { predictByMayan } from "@/features/mayan-predict/model/useMayanPredictor";
import { predictByAncient49 } from "@/features/ancient49-predict/model/useAncient49Predictor";
import { predictByLunarZodiac } from "@/features/lunar-zodiac-predict/model/useLunarZodiacPredictor";
import { predictByBloodRenewal } from "@/features/blood-renewal-predict/model/useBloodRenewalPredictor";
import { predictByBloodType } from "@/features/blood-type-predict/model/bloodTypeMatrix";
import type { BloodType } from "@/features/blood-type-predict/model/bloodTypeMatrix";
import { predictByNumerology } from "@/features/numerology-predict/model/useNumerologyPredictor";
import { predictByGypsy } from "@/features/gypsy-predict/model/useGypsyPredictor";
import { predictByPlanetaryWeekday } from "@/features/planetary-weekday-predict/model/usePlanetaryWeekdayPredictor";
import { predictByEgyptWheat } from "@/features/egypt-wheat-predict/model/useEgyptWheatPredictor";
import { predictByHippocratesWind } from "@/features/hippocrates-wind-predict/model/useHippocratesWindPredictor";
import { predictByAyurveda } from "@/features/ayurveda-predict/model/useAyurvedaPredictor";
import { predictByKFengshui } from "@/features/kfengshui-predict/model/useKFengshuiPredictor";
import { predictByDigitalDna } from "@/features/digital-dna-predict/model/useDigitalDnaPredictor";
import { predictByOhang } from '@/features/ohang-predict/model/useOhangPredictor';
import { predictCBR } from "@/features/cbr-predict/model/useCBRPredictor";
import { predictBySamwon } from "@/features/samwon-predict/model/useSamwonPredictor";
import {
  datesInRange,
  triangularWeights,
  fallbackTieBreaker,
  validateRange,
  normalizeRange,
} from "@/shared/lib/dateRangePrediction";
import type { FatherVibe } from "@/features/cbr-predict/model/useCBRPredictor";

export type AiGender = "Boy" | "Girl";

/**
 * 선택 카테고리. 사용자가 해당 카테고리를 선택해야 관련 입력이 노출되고
 * 해당 알고리즘이 예측에 포함된다. 선택하지 않은 카테고리의 알고리즘은 실행되지 않음.
 *
 * - bloodType: 혈액형 조합
 * - names: 엄마·아빠 이름 → 수비학 (거주지와 함께면 이집트도 활성)
 * - home: 집 방향 + 층수 + 거주 지역 → K-풍수지리 (이름과 함께면 이집트도 활성)
 * - ayurveda: 마지막 생리일 + 집 방위 → 아유르베다
 * - hippocrates: 거주 반구 → 히포크라테스 바람법
 * - dna: 엄마/아빠 MBTI + 최애 이모티콘 → 디지털 DNA
 * - cbr: 아빠 기운(fatherVibe) → CBR-Engine (Ge-ai)
 * - samwon: 직감수 → 삼원공명 (Cl-ai)
 */
export type AiCategory =
  | "bloodType"
  | "names"
  | "home"
  | "ayurveda"
  | "hippocrates"
  | "dna"
  | "cbr"
  | "samwon";

export const AI_CATEGORIES: { key: AiCategory; emoji: string; label: string; hint: string }[] = [
  { key: "bloodType",   emoji: "🩸", label: "혈액형",     hint: "엄마·아빠 혈액형" },
  { key: "names",       emoji: "✍️", label: "이름",       hint: "수비학·이집트" },
  { key: "home",        emoji: "🏠", label: "거주지",     hint: "풍수지리·이집트" },
  { key: "ayurveda",    emoji: "🪷", label: "아유르베다", hint: "생리일+방위" },
  { key: "hippocrates", emoji: "🌬️", label: "반구",       hint: "히포크라테스" },
  { key: "dna",         emoji: "🧬", label: "MBTI",       hint: "디지털 DNA" },
  { key: "cbr",         emoji: "✨", label: "Ge-ai",      hint: "아빠 기운 (CBR)" },
  { key: "samwon",      emoji: "✳️", label: "Cl-ai",      hint: "직감수 (삼원공명)" },
];

export const METHOD_SCORES: Record<string, number> = {
  chinese: 100,
  mayan: 90,
  ancient49: 80,
  bloodRenewal: 60,
  lunarZodiac: 50,
  bloodType: 40,
  numerology: 35,
  gypsy: 30,
  planetaryWeekday: 25,
  ayurveda: 22,
  egyptWheat: 20,
  hippocratesWind: 18,
  kfengshui: 15,
  digitalDna: 10,
  ohang: 45,
  cbr: 70,
  samwon: 55,
};

export interface MethodResult {
  key: string;
  name: string;
  emoji: string;
  gender: AiGender;
  score: number;
  detail: string;
  available: boolean;
}

export interface AiPredictResult {
  finalGender: AiGender;
  boyScore: number;
  girlScore: number;
  methods: MethodResult[];
}

export interface AiPredictState {
  motherBirthDate: string;
  conceptionStart: string;
  conceptionEnd: string;
  fatherBirthDate: string;
  momBlood: BloodType;
  dadBlood: BloodType;
  momName: string;
  dadName: string;
  locationString: string;
  isNorthernHemisphere: boolean;
  lastPeriodDate: string;
  direction: string;
  houseDirection: string;
  floorNumber: string;
  momMBTI: string;
  dadMBTI: string;
  favEmoji: string;
  fatherVibe: FatherVibe;
  intuition: number;
  selectedCategories: Set<AiCategory>;
  isLoading: boolean;
  result: AiPredictResult | null;
  error: string | null;
}

export interface AiPredictActions {
  setMotherBirthDate: (v: string) => void;
  setConceptionStart: (v: string) => void;
  setConceptionEnd: (v: string) => void;
  setFatherBirthDate: (v: string) => void;
  setMomBlood: (v: BloodType) => void;
  setDadBlood: (v: BloodType) => void;
  setMomName: (v: string) => void;
  setDadName: (v: string) => void;
  setLocationString: (v: string) => void;
  setIsNorthernHemisphere: (v: boolean) => void;
  setLastPeriodDate: (v: string) => void;
  setDirection: (v: string) => void;
  setHouseDirection: (v: string) => void;
  setFloorNumber: (v: string) => void;
  setMomMBTI: (v: string) => void;
  setDadMBTI: (v: string) => void;
  setFavEmoji: (v: string) => void;
  setFatherVibe: (v: FatherVibe) => void;
  setIntuition: (v: number) => void;
  toggleCategory: (cat: AiCategory) => void;
  predict: () => void;
  reset: () => void;
}

function runAllMethods(
  motherBirth: Date,
  conception: Date,
  fatherBirth: Date,
  momBlood: BloodType,
  dadBlood: BloodType,
  momName: string,
  dadName: string,
  locationString: string,
  isNorthernHemisphere: boolean,
  lastPeriodDate: string,
  direction: string,
  houseDirection: string,
  floorNumber: string,
  momMBTI: string,
  dadMBTI: string,
  favEmoji: string,
  fatherVibe: FatherVibe,
  intuition: number,
  selectedCategories: Set<AiCategory>
): AiPredictResult {
  const momAge = getAgeAtDate(motherBirth, conception);
  const dadAge = getAgeAtDate(fatherBirth, conception);
  const solarConceptionMonth = conception.getMonth() + 1;
  const chineseAge = getChineseAge(motherBirth, conception);
  const lunarConception = solarToLunar(conception);
  const lunarMonth = lunarConception.month;

  const methods: MethodResult[] = [];
  let boyScore = 0;
  let girlScore = 0;

  const addMethod = (m: MethodResult) => {
    methods.push(m);
    if (m.available) {
      if (m.gender === "Boy") boyScore += m.score;
      else girlScore += m.score;
    }
  };

  // ① 중국 황실 달력 (100점)
  const chineseRaw = predictGender(chineseAge, lunarMonth);
  if (chineseRaw !== null) {
    const g: AiGender = chineseRaw === "아들" ? "Boy" : "Girl";
    addMethod({
      key: "chinese",
      name: "중국 황실 달력",
      emoji: "🏮",
      gender: g,
      score: 100,
      detail: `음력 연나이 ${chineseAge}세 × 음력 ${lunarMonth}월`,
      available: true,
    });
  } else {
    addMethod({
      key: "chinese",
      name: "중국 황실 달력",
      emoji: "🏮",
      gender: "Girl",
      score: 100,
      detail: `음력 연나이 ${chineseAge}세: 표 범위 초과`,
      available: false,
    });
  }

  // ② 마야식 (90점)
  const mayanG = predictByMayan(momAge, solarConceptionMonth);
  addMethod({
    key: "mayan",
    name: "마야식",
    emoji: "🗿",
    gender: mayanG,
    score: 90,
    detail: `엄마 ${momAge}세(${momAge % 2 === 0 ? "짝" : "홀"}) × ${solarConceptionMonth}월(${solarConceptionMonth % 2 === 0 ? "짝" : "홀"}) → ${mayanG === "Boy" ? "홀짝 불일치" : "홀짝 일치"}`,
    available: true,
  });

  // ③ 주역 49법 (80점)
  const { gender: a49G, calcValue, isOdd } = predictByAncient49(chineseAge, lunarMonth);
  addMethod({
    key: "ancient49",
    name: "주역 49법",
    emoji: "☯️",
    gender: a49G,
    score: 80,
    detail: `49 + ${lunarMonth} - ${chineseAge} + 19 = ${calcValue} (${isOdd ? "홀수" : "짝수"})`,
    available: true,
  });

  // ④ 혈액 갱신법 (60점)
  const brResult = predictByBloodRenewal(dadAge, momAge);
  if (brResult.gender !== "Tie") {
    const g = brResult.gender as AiGender;
    addMethod({
      key: "bloodRenewal",
      name: "혈액 갱신법",
      emoji: "🩸",
      gender: g,
      score: 60,
      detail: `아빠 ${dadAge}÷4 나머지 ${brResult.dadRem} vs 엄마 ${momAge}÷3 나머지 ${brResult.momRem}`,
      available: true,
    });
  } else {
    addMethod({
      key: "bloodRenewal",
      name: "혈액 갱신법",
      emoji: "🩸",
      gender: "Girl",
      score: 60,
      detail: `나머지 동점(${brResult.dadRem}) → 판정 불가, 점수 제외`,
      available: false,
    });
  }

  // ⑤ 달 별자리 (50점)
  const zodiac = predictByLunarZodiac(conception);
  addMethod({
    key: "lunarZodiac",
    name: "달 별자리",
    emoji: "🌙",
    gender: zodiac.gender,
    score: 50,
    detail: `${zodiac.moonSignKo}(${zodiac.moonSign}) → ${zodiac.isMaleSign ? "남성" : "여성"} 별자리`,
    available: true,
  });

  // ⑥ 혈액형 조합 (40점) — 카테고리 선택시만
  if (selectedCategories.has("bloodType")) {
    const btProb = predictByBloodType(dadBlood, momBlood);
    const btG: AiGender = btProb.boy >= btProb.girl ? "Boy" : "Girl";
    addMethod({
      key: "bloodType",
      name: "혈액형 조합",
      emoji: "🅰️",
      gender: btG,
      score: 40,
      detail: `${dadBlood}+${momBlood} → 아들 ${btProb.boy}% / 딸 ${btProb.girl}%`,
      available: true,
    });
  }

  // ⑮ 오행천문융합 (Gr-ai, 45점)
  const momYYYYMMDD = motherBirth.toISOString().slice(0,10).replace(/-/g,'');
  const dadYYYYMMDD = fatherBirth.toISOString().slice(0,10).replace(/-/g,'');
  const ohangResult = predictByOhang(momYYYYMMDD, dadYYYYMMDD, solarConceptionMonth);
  addMethod({
    key: 'ohang',
    name: 'Gr-ai (오행천문융합)',
    emoji: '✖️',
    gender: ohangResult.gender,
    score: 45,
    detail: `O점수 ${ohangResult.oScore} + I점수 ${ohangResult.iScore} = ${ohangResult.total} (기준 20)`,
    available: true,
  });

  // ⑯ CBR-Engine (Ge-ai, 70점) — 카테고리 선택시만
  if (selectedCategories.has("cbr")) {
    const cbrResult = predictCBR(motherBirth, conception, fatherVibe);
    addMethod({
      key: "cbr",
      name: "Ge-ai (CBR-Engine)",
      emoji: "✨",
      gender: cbrResult.gender,
      score: 70,
      detail: `달위상 ${cbrResult.lunarCyclePct}% · 총에너지 ${cbrResult.totalEnergy} · 확률 ${cbrResult.probability}% (${cbrResult.energyStrength})`,
      available: true,
    });
  }

  // ⑰ 삼원공명 (Cl-ai, 55점) — 카테고리 선택시만
  if (selectedCategories.has("samwon")) {
    const samwonConceptionMonth = `${conception.getFullYear()}-${String(conception.getMonth() + 1).padStart(2, "0")}`;
    const samwonResult = predictBySamwon(
      motherBirth.toISOString().slice(0, 10),
      fatherBirth.toISOString().slice(0, 10),
      samwonConceptionMonth,
      intuition
    );
    addMethod({
      key: "samwon",
      name: "Cl-ai (삼원공명)",
      emoji: "✳️",
      gender: samwonResult.gender,
      score: 55,
      detail: `${samwonResult.stemNames.mother}${samwonResult.stemNames.father}${samwonResult.stemNames.conception} → 정규화 ${samwonResult.scores.normalized}/49 (직감수 ${intuition})`,
      available: true,
    });
  }

  // ⑦ 수비학 (35점) — 이름 카테고리 선택시만
  if (selectedCategories.has("names") && momName.trim() && dadName.trim()) {
    const numResult = predictByNumerology(momName.trim(), dadName.trim(), solarConceptionMonth);
    addMethod({
      key: "numerology",
      name: "수비학",
      emoji: "🔢",
      gender: numResult.gender,
      score: 35,
      detail: `${numResult.momLen}(엄마) + ${numResult.dadLen}(아빠) + ${solarConceptionMonth}(월) = ${numResult.totalSum} (${numResult.isOdd ? "홀수" : "짝수"})`,
      available: true,
    });
  }

  // ⑧ 집시 생월법 (30점)
  const gypsyResult = predictByGypsy(motherBirth.toISOString().slice(0, 10), conception.toISOString().slice(0, 10));
  addMethod({
    key: "gypsy",
    name: "집시 생월법",
    emoji: "🎴",
    gender: gypsyResult.gender,
    score: 30,
    detail: `엄마 ${gypsyResult.motherAge}세 + ${gypsyResult.conceptionMonth}월 = ${gypsyResult.totalSum} (${gypsyResult.isOdd ? "홀수" : "짝수"})`,
    available: true,
  });

  // ⑨ 행성 요일 (25점)
  const planetResult = predictByPlanetaryWeekday(conception.toISOString().slice(0, 10));
  addMethod({
    key: "planetaryWeekday",
    name: "행성 요일",
    emoji: "🌍",
    gender: planetResult.gender,
    score: 25,
    detail: `${planetResult.dayName} → ${planetResult.planetEmoji} ${planetResult.planetName} (${planetResult.gender === "Boy" ? "남성 행성" : "여성 행성"})`,
    available: true,
  });

  // ⑩ 아유르베다 주기법 (22점) — 아유르베다 카테고리 선택시만
  if (selectedCategories.has("ayurveda") && lastPeriodDate) {
    try {
      const ayurvedaResult = predictByAyurveda(lastPeriodDate, conception.toISOString().slice(0, 10), (direction as "N"|"NE"|"E"|"SE"|"S"|"SW"|"W"|"NW") || "E");
      addMethod({
        key: "ayurveda",
        name: "아유르베다",
        emoji: "🪷",
        gender: ayurvedaResult.gender,
        score: 22,
        detail: `주기 ${ayurvedaResult.baseDays.toFixed(0)}일 + 방위보정 ${ayurvedaResult.chiModifier} = ${ayurvedaResult.finalDays} (${ayurvedaResult.isEven ? "짝수" : "홀수"})`,
        available: true,
      });
    } catch {
      // skip silently on failure
    }
  }

  // ⑪ 이집트 밀보리법 (20점) — 이름 + 거주지 카테고리 둘 다 선택시만
  if (
    selectedCategories.has("names") &&
    selectedCategories.has("home") &&
    momName.trim() &&
    locationString.trim()
  ) {
    const egyptResult = predictByEgyptWheat(momName.trim(), conception.toISOString().slice(0, 10), locationString.trim());
    addMethod({
      key: "egyptWheat",
      name: "이집트 밀보리",
      emoji: "🌾",
      gender: egyptResult.gender,
      score: 20,
      detail: `envFactor=${egyptResult.envFactor}, 보리${egyptResult.barleyDays}일 vs 밀${egyptResult.wheatDays}일`,
      available: true,
    });
  }

  // ⑫ 히포크라테스 바람법 (18점) — 반구 카테고리 선택시만
  if (selectedCategories.has("hippocrates")) {
    const hippoResult = predictByHippocratesWind(solarConceptionMonth, isNorthernHemisphere);
    addMethod({
      key: "hippocratesWind",
      name: "히포크라테스",
      emoji: "🌬️",
      gender: hippoResult.gender,
      score: 18,
      detail: `${solarConceptionMonth}월 ${isNorthernHemisphere ? "북반구" : "남반구"} → ${hippoResult.isNorthWind ? "북풍(건조)" : "남풍(다습)"}`,
      available: true,
    });
  }

  // ⑬ K-풍수지리 (15점) — 거주지 카테고리 선택시만
  if (selectedCategories.has("home") && houseDirection.trim() && floorNumber) {
    const floor = parseInt(floorNumber, 10);
    if (!isNaN(floor) && floor > 0) {
      const fengshuiResult = predictByKFengshui(houseDirection.trim(), floor, locationString.replace(/\s/g, "").length || 1);
      addMethod({
        key: "kfengshui",
        name: "K-풍수지리",
        emoji: "🏠",
        gender: fengshuiResult.gender,
        score: 15,
        detail: `층(${fengshuiResult.floorScore > 0 ? "+" : ""}${fengshuiResult.floorScore}) + 방향(${fengshuiResult.dirScore > 0 ? "+" : ""}${fengshuiResult.dirScore}) + 주소(${fengshuiResult.locScore > 0 ? "+" : ""}${fengshuiResult.locScore}) = ${fengshuiResult.totalScore}`,
        available: true,
      });
    }
  }

  // ⑭ 디지털 DNA (10점) — MBTI 카테고리 선택시만
  if (
    selectedCategories.has("dna") &&
    momMBTI.trim().length === 4 &&
    dadMBTI.trim().length === 4 &&
    favEmoji.trim()
  ) {
    const dnaResult = predictByDigitalDna(momMBTI.trim(), dadMBTI.trim(), favEmoji.trim());
    addMethod({
      key: "digitalDna",
      name: "디지털 DNA",
      emoji: "🧬",
      gender: dnaResult.gender,
      score: 10,
      detail: `아들에너지 ${dnaResult.boyEnergy} vs 딸에너지 ${dnaResult.girlEnergy} (이모티콘 ${dnaResult.emojiBonus === "Boy" ? "아들" : "딸"} +2)`,
      available: true,
    });
  }

  return {
    finalGender: boyScore >= girlScore ? "Boy" : "Girl",
    boyScore,
    girlScore,
    methods,
  };
}

/**
 * 임신 추정일 기간에 대해 runAllMethods를 각 날짜별로 실행하고,
 * 삼각 가중치로 각 방법별 gender를 합산. 최종 per-method gender로
 * boy/girl score를 다시 계산한다.
 */
function runAllMethodsOverRange(
  motherBirth: Date,
  startIso: string,
  endIso: string,
  fatherBirth: Date,
  momBlood: BloodType,
  dadBlood: BloodType,
  momName: string,
  dadName: string,
  locationString: string,
  isNorthernHemisphere: boolean,
  lastPeriodDate: string,
  direction: string,
  houseDirection: string,
  floorNumber: string,
  momMBTI: string,
  dadMBTI: string,
  favEmoji: string,
  fatherVibe: FatherVibe,
  intuition: number,
  selectedCategories: Set<AiCategory>,
): AiPredictResult {
  const days = datesInRange(startIso, endIso);
  const weights = triangularWeights(days.length);
  const midIdx = Math.floor((days.length - 1) / 2);

  const perDayResults = days.map((iso) =>
    runAllMethods(
      motherBirth, new Date(iso), fatherBirth,
      momBlood, dadBlood, momName, dadName,
      locationString, isNorthernHemisphere, lastPeriodDate, direction,
      houseDirection, floorNumber, momMBTI, dadMBTI, favEmoji, fatherVibe, intuition,
      selectedCategories,
    )
  );

  const methodCount = perDayResults[0].methods.length;
  const aggregated: MethodResult[] = [];
  let boyScore = 0;
  let girlScore = 0;

  for (let m = 0; m < methodCount; m++) {
    let bw = 0;
    let gw = 0;
    for (let d = 0; d < days.length; d++) {
      const r = perDayResults[d].methods[m];
      if (!r.available) continue;
      if (r.gender === "Boy") bw += weights[d];
      else gw += weights[d];
    }
    const midMethod = perDayResults[midIdx].methods[m];
    let finalGender: AiGender;
    if (bw + gw === 0) {
      finalGender = midMethod.gender;
    } else if (bw === gw) {
      finalGender = fallbackTieBreaker(days[midIdx]);
    } else {
      finalGender = bw > gw ? "Boy" : "Girl";
    }
    const agg: MethodResult = { ...midMethod, gender: finalGender };
    aggregated.push(agg);
    if (agg.available) {
      if (agg.gender === "Boy") boyScore += agg.score;
      else girlScore += agg.score;
    }
  }

  let finalGender: AiGender;
  if (boyScore === girlScore) {
    finalGender = fallbackTieBreaker(days[midIdx]);
  } else {
    finalGender = boyScore > girlScore ? "Boy" : "Girl";
  }

  return {
    finalGender,
    boyScore,
    girlScore,
    methods: aggregated,
  };
}

export function useAiPredictor(): AiPredictState & AiPredictActions {
  const [motherBirthDate, setMotherBirthDate] = useState("");
  const [conceptionStart, setConceptionStart] = useState("");
  const [conceptionEnd, setConceptionEnd] = useState("");
  const [fatherBirthDate, setFatherBirthDate] = useState("");
  const [momBlood, setMomBlood] = useState<BloodType>("A");
  const [dadBlood, setDadBlood] = useState<BloodType>("A");
  const [momName, setMomName] = useState("");
  const [dadName, setDadName] = useState("");
  const [locationString, setLocationString] = useState("");
  const [isNorthernHemisphere, setIsNorthernHemisphere] = useState(true);
  const [lastPeriodDate, setLastPeriodDate] = useState("");
  const [direction, setDirection] = useState("E");
  const [houseDirection, setHouseDirection] = useState("");
  const [floorNumber, setFloorNumber] = useState("");
  const [momMBTI, setMomMBTI] = useState("");
  const [dadMBTI, setDadMBTI] = useState("");
  const [favEmoji, setFavEmoji] = useState("");
  const [fatherVibe, setFatherVibe] = useState<FatherVibe>("STABLE");
  const [intuition, setIntuition] = useState(5);
  const [selectedCategories, setSelectedCategories] = useState<Set<AiCategory>>(() => new Set());
  const [isLoading, setIsLoading] = useState(false);

  function toggleCategory(cat: AiCategory) {
    setSelectedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  }
  const [result, setResult] = useState<AiPredictResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  function predict() {
    setError(null);

    if (!motherBirthDate || !fatherBirthDate) {
      setError("부모 생년월일을 입력해주세요.");
      return;
    }

    const [startIso, endIso] = normalizeRange(conceptionStart, conceptionEnd);
    const rangeErr = validateRange(startIso, endIso);
    if (rangeErr) {
      setError(rangeErr);
      return;
    }

    const motherBirth = new Date(motherBirthDate);
    const fatherBirth = new Date(fatherBirthDate);
    const days = datesInRange(startIso, endIso);
    const firstDay = new Date(days[0]);

    if (motherBirth >= firstDay) {
      setError("임신일은 엄마 생년월일보다 이후여야 합니다.");
      return;
    }
    if (fatherBirth >= firstDay) {
      setError("임신일은 아빠 생년월일보다 이후여야 합니다.");
      return;
    }

    setIsLoading(true);
    setResult(null);

    // AI 분위기 연출을 위한 최소 5.5초 딜레이
    const delay = 5500 + Math.random() * 1500;
    setTimeout(() => {
      try {
        const res = runAllMethodsOverRange(
          motherBirth, startIso, endIso, fatherBirth,
          momBlood, dadBlood, momName, dadName,
          locationString, isNorthernHemisphere, lastPeriodDate, direction,
          houseDirection, floorNumber, momMBTI, dadMBTI, favEmoji, fatherVibe, intuition,
          selectedCategories,
        );
        setResult(res);
      } catch {
        setError("예측 중 오류가 발생했습니다.");
      }
      setIsLoading(false);
    }, delay);
  }

  function reset() {
    setResult(null);
    setError(null);
    setIsLoading(false);
    setMotherBirthDate("");
    setConceptionStart("");
    setConceptionEnd("");
    setFatherBirthDate("");
    setMomBlood("A");
    setDadBlood("A");
    setMomName("");
    setDadName("");
    setLocationString("");
    setIsNorthernHemisphere(true);
    setLastPeriodDate("");
    setDirection("E");
    setHouseDirection("");
    setFloorNumber("");
    setMomMBTI("");
    setDadMBTI("");
    setFavEmoji("");
    setFatherVibe("STABLE");
    setIntuition(5);
    setSelectedCategories(new Set());
  }

  return {
    motherBirthDate, conceptionStart, conceptionEnd, fatherBirthDate,
    momBlood, dadBlood, momName, dadName,
    locationString, isNorthernHemisphere, lastPeriodDate, direction,
    houseDirection, floorNumber, momMBTI, dadMBTI, favEmoji, fatherVibe, intuition,
    selectedCategories,
    isLoading, result, error,
    setMotherBirthDate, setConceptionStart, setConceptionEnd, setFatherBirthDate,
    setMomBlood, setDadBlood, setMomName, setDadName,
    setLocationString, setIsNorthernHemisphere, setLastPeriodDate, setDirection,
    setHouseDirection, setFloorNumber, setMomMBTI, setDadMBTI, setFavEmoji, setFatherVibe, setIntuition,
    toggleCategory,
    predict, reset,
  };
}
