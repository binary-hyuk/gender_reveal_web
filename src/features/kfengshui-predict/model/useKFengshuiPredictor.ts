import { useState } from "react";

export type KFengshuiGender = "Boy" | "Girl";

export interface KFengshuiResult {
  gender: KFengshuiGender;
  houseDirection: string;
  floorNumber: number;
  locationLen: number;
  floorScore: number;
  dirScore: number;
  locScore: number;
  totalScore: number;
}

/**
 * K-풍수지리 아파트 예측법
 * floorScore = 홀수층 → +1 / 짝수층 → -1
 * dirScore = 남/동 포함 +1, 북/서 포함 -1 (중복 가능)
 * locScore = 주소 길이 홀수 → +1 / 짝수 → -1
 * totalScore > 0 → Boy / ≤0 → Girl
 */
export function predictByKFengshui(
  houseDirection: string,
  floorNumber: number,
  locationLen: number
): KFengshuiResult {
  const floorScore = floorNumber % 2 !== 0 ? 1 : -1;
  const dirScore =
    (houseDirection.includes("남") || houseDirection.includes("동") ? 1 : 0) +
    (houseDirection.includes("북") || houseDirection.includes("서") ? -1 : 0);
  const locScore = locationLen % 2 !== 0 ? 1 : -1;
  const totalScore = floorScore + dirScore + locScore;
  return { gender: totalScore > 0 ? "Boy" : "Girl", houseDirection, floorNumber, locationLen, floorScore, dirScore, locScore, totalScore };
}

export interface KFengshuiState {
  houseDirection: string;
  floorNumber: string;
  locationString: string;
  result: KFengshuiResult | null;
  error: string | null;
}
export interface KFengshuiActions {
  setHouseDirection: (v: string) => void;
  setFloorNumber: (v: string) => void;
  setLocationString: (v: string) => void;
  predict: () => void;
  reset: () => void;
}

export function useKFengshuiPredictor(): KFengshuiState & KFengshuiActions {
  const [houseDirection, setHouseDirection] = useState("");
  const [floorNumber, setFloorNumber] = useState("");
  const [locationString, setLocationString] = useState("");
  const [result, setResult] = useState<KFengshuiResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  function predict() {
    setError(null); setResult(null);
    if (!houseDirection.trim() || !floorNumber || !locationString.trim()) {
      setError("모든 항목을 입력해주세요.");
      return;
    }
    const floor = parseInt(floorNumber, 10);
    if (isNaN(floor) || floor < 1) {
      setError("층수는 1 이상의 숫자여야 합니다.");
      return;
    }
    setResult(predictByKFengshui(houseDirection.trim(), floor, locationString.replace(/\s/g, "").length));
  }

  function reset() {
    setResult(null); setError(null);
    setHouseDirection(""); setFloorNumber(""); setLocationString("");
  }

  return { houseDirection, floorNumber, locationString, result, error, setHouseDirection, setFloorNumber, setLocationString, predict, reset };
}
