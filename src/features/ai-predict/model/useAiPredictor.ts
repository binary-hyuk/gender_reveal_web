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
import { predictByOhang } from '@/features/ohang-predict/model/useOhangPredictor';

export type AiGender = "Boy" | "Girl";

export const METHOD_SCORES: Record<string, number> = {
  chinese: 100,
  mayan: 90,
  ancient49: 80,
  bloodRenewal: 60,
  lunarZodiac: 50,
  bloodType: 40,
  ohang: 45,
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
  conceptionDate: string;
  fatherBirthDate: string;
  momBlood: BloodType;
  dadBlood: BloodType;
  isLoading: boolean;
  result: AiPredictResult | null;
  error: string | null;
}

export interface AiPredictActions {
  setMotherBirthDate: (v: string) => void;
  setConceptionDate: (v: string) => void;
  setFatherBirthDate: (v: string) => void;
  setMomBlood: (v: BloodType) => void;
  setDadBlood: (v: BloodType) => void;
  predict: () => void;
  reset: () => void;
}

function runAllMethods(
  motherBirth: Date,
  conception: Date,
  fatherBirth: Date,
  momBlood: BloodType,
  dadBlood: BloodType
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

  // ⑥ 혈액형 조합 (40점)
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

  // ⑮ 오행천문융합 (45점)
  const momYYYYMMDD = motherBirth.toISOString().slice(0,10).replace(/-/g,'');
  const dadYYYYMMDD = fatherBirth.toISOString().slice(0,10).replace(/-/g,'');
  const ohangResult = predictByOhang(momYYYYMMDD, dadYYYYMMDD, solarConceptionMonth);
  addMethod({
    key: 'ohang',
    name: '오행천문융합',
    emoji: '☯️',
    gender: ohangResult.gender,
    score: 45,
    detail: `O점수 ${ohangResult.oScore} + I점수 ${ohangResult.iScore} = ${ohangResult.total} (기준 20)`,
    available: true,
  });

  return {
    finalGender: boyScore >= girlScore ? "Boy" : "Girl",
    boyScore,
    girlScore,
    methods,
  };
}

export function useAiPredictor(): AiPredictState & AiPredictActions {
  const [motherBirthDate, setMotherBirthDate] = useState("");
  const [conceptionDate, setConceptionDate] = useState("");
  const [fatherBirthDate, setFatherBirthDate] = useState("");
  const [momBlood, setMomBlood] = useState<BloodType>("A");
  const [dadBlood, setDadBlood] = useState<BloodType>("A");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AiPredictResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  function predict() {
    setError(null);

    if (!motherBirthDate || !conceptionDate || !fatherBirthDate) {
      setError("모든 날짜를 입력해주세요.");
      return;
    }

    const motherBirth = new Date(motherBirthDate);
    const conception = new Date(conceptionDate);
    const fatherBirth = new Date(fatherBirthDate);

    if (motherBirth >= conception) {
      setError("임신일은 엄마 생년월일보다 이후여야 합니다.");
      return;
    }
    if (fatherBirth >= conception) {
      setError("임신일은 아빠 생년월일보다 이후여야 합니다.");
      return;
    }

    setIsLoading(true);
    setResult(null);

    // AI 분위기 연출을 위한 최소 5.5초 딜레이
    const delay = 5500 + Math.random() * 1500;
    setTimeout(() => {
      try {
        const res = runAllMethods(motherBirth, conception, fatherBirth, momBlood, dadBlood);
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
    setConceptionDate("");
    setFatherBirthDate("");
    setMomBlood("A");
    setDadBlood("A");
  }

  return {
    motherBirthDate, conceptionDate, fatherBirthDate,
    momBlood, dadBlood, isLoading, result, error,
    setMotherBirthDate, setConceptionDate, setFatherBirthDate,
    setMomBlood, setDadBlood, predict, reset,
  };
}
