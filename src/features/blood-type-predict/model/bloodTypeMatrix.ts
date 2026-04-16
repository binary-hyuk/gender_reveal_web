/**
 * 일본식 혈액형 조합 성별 예측 매트릭스
 *
 * 출처: 인터넷 상 통계/민간 속설 기반 (재미 목적)
 * bloodTypeMatrix[dadBlood][momBlood] = { boy: number, girl: number }
 */

export type BloodType = "A" | "B" | "O" | "AB";

export interface BloodTypeProbability {
  boy: number;
  girl: number;
}

export const BLOOD_TYPES: BloodType[] = ["A", "B", "O", "AB"];

// prettier-ignore
export const BLOOD_TYPE_MATRIX: Record<BloodType, Record<BloodType, BloodTypeProbability>> = {
  A: {
    A:  { boy: 50, girl: 50 },
    B:  { boy: 55, girl: 45 },
    O:  { boy: 40, girl: 60 },
    AB: { boy: 60, girl: 40 },
  },
  B: {
    A:  { boy: 45, girl: 55 },
    B:  { boy: 50, girl: 50 },
    O:  { boy: 60, girl: 40 },
    AB: { boy: 40, girl: 60 },
  },
  O: {
    A:  { boy: 35, girl: 65 },
    B:  { boy: 65, girl: 35 },
    O:  { boy: 50, girl: 50 },
    AB: { boy: 55, girl: 45 },
  },
  AB: {
    A:  { boy: 40, girl: 60 },
    B:  { boy: 60, girl: 40 },
    O:  { boy: 45, girl: 55 },
    AB: { boy: 50, girl: 50 },
  },
};

export function predictByBloodType(
  dadBlood: BloodType,
  momBlood: BloodType
): BloodTypeProbability {
  return BLOOD_TYPE_MATRIX[dadBlood][momBlood];
}
