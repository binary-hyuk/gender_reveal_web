import { useState } from "react";

export type DigitalDnaGender = "Boy" | "Girl";
const BOY_CHARS = new Set(["E", "S", "T", "P"]);
const GIRL_CHARS = new Set(["I", "N", "F", "J"]);

export interface DigitalDnaResult {
  gender: DigitalDnaGender;
  momMBTI: string;
  dadMBTI: string;
  favEmoji: string;
  boyEnergy: number;
  girlEnergy: number;
  emojiCode: number;
  emojiBonus: "Boy" | "Girl";
}

/**
 * 제미나이 디지털 DNA 알고리즘
 * combinedMBTI = momMBTI + dadMBTI (대문자)
 * boyEnergy  = E+S+T+P 개수
 * girlEnergy = I+N+F+J 개수
 * favEmoji.charCodeAt(0) 홀수 → boyEnergy+2 / 짝수 → girlEnergy+2
 * boyEnergy >= girlEnergy → Boy / else → Girl
 */
export function predictByDigitalDna(
  momMBTI: string,
  dadMBTI: string,
  favEmoji: string
): DigitalDnaResult {
  const combined = (momMBTI + dadMBTI).toUpperCase();
  let boyEnergy = 0;
  let girlEnergy = 0;
  for (const ch of combined) {
    if (BOY_CHARS.has(ch)) boyEnergy++;
    if (GIRL_CHARS.has(ch)) girlEnergy++;
  }
  const emojiCode = favEmoji.codePointAt(0) ?? 0;
  const emojiBonus: "Boy" | "Girl" = emojiCode % 2 === 1 ? "Boy" : "Girl";
  if (emojiBonus === "Boy") boyEnergy += 2; else girlEnergy += 2;
  return { gender: boyEnergy >= girlEnergy ? "Boy" : "Girl", momMBTI, dadMBTI, favEmoji, boyEnergy, girlEnergy, emojiCode, emojiBonus };
}

export interface DigitalDnaState {
  momMBTI: string;
  dadMBTI: string;
  favEmoji: string;
  result: DigitalDnaResult | null;
  error: string | null;
}
export interface DigitalDnaActions {
  setMomMBTI: (v: string) => void;
  setDadMBTI: (v: string) => void;
  setFavEmoji: (v: string) => void;
  predict: () => void;
  reset: () => void;
}

export function useDigitalDnaPredictor(): DigitalDnaState & DigitalDnaActions {
  const [momMBTI, setMomMBTI] = useState("");
  const [dadMBTI, setDadMBTI] = useState("");
  const [favEmoji, setFavEmoji] = useState("");
  const [result, setResult] = useState<DigitalDnaResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  function predict() {
    setError(null); setResult(null);
    if (!momMBTI.trim() || !dadMBTI.trim() || !favEmoji.trim()) {
      setError("모든 항목을 입력해주세요.");
      return;
    }
    if (momMBTI.trim().length !== 4 || dadMBTI.trim().length !== 4) {
      setError("MBTI는 4글자여야 합니다. (예: ENFP)");
      return;
    }
    setResult(predictByDigitalDna(momMBTI.trim(), dadMBTI.trim(), favEmoji.trim()));
  }

  function reset() {
    setResult(null); setError(null);
    setMomMBTI(""); setDadMBTI(""); setFavEmoji("");
  }

  return { momMBTI, dadMBTI, favEmoji, result, error, setMomMBTI, setDadMBTI, setFavEmoji, predict, reset };
}
