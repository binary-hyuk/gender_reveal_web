/**
 * 중국 황실 달력 성별 예측 데이터 테이블
 *
 * 출처: 중국 황실 달력 (사용자 제공 이미지 기반 검증 완료)
 * - 세로축: 엄마의 **만나이** (18~45세) — 임신 당시 solar age
 * - 가로축: 임신(수정)한 **음력 월** (1~12월)
 * - 'B' = 아들, 'G' = 딸
 *
 * 검증 예시: 만27세 × 음력 1월 → 딸 (row 27, col 0 = "G")
 *
 * GENDER_TABLE[motherAge][lunarMonth - 1]
 */

export type GenderCode = "B" | "G";

// prettier-ignore
export const GENDER_TABLE: Record<number, GenderCode[]> = {
  // age: [1월, 2월, 3월, 4월, 5월, 6월, 7월, 8월, 9월, 10월, 11월, 12월]
  18: ["G","B","G","B","B","B","B","B","B","B","B","B"],
  19: ["B","G","B","G","G","B","B","B","B","G","G","G"],
  20: ["G","B","G","B","B","B","B","B","B","G","B","B"],
  21: ["B","G","G","G","G","G","G","G","G","G","G","G"],
  22: ["G","B","B","G","B","G","G","B","G","G","G","G"],
  23: ["B","B","G","B","B","G","B","G","B","B","B","G"],
  24: ["B","G","B","B","G","B","B","G","G","G","G","G"],
  25: ["G","B","B","G","G","B","G","B","B","B","B","B"],
  26: ["B","G","B","G","G","B","G","B","G","G","G","G"],
  27: ["G","B","G","G","G","G","B","B","B","B","G","B"],
  28: ["B","G","B","G","G","G","B","B","B","B","G","G"],
  29: ["G","B","G","G","B","B","B","B","B","G","G","G"],
  30: ["B","G","G","G","G","G","G","G","G","G","B","B"],
  31: ["B","G","B","G","G","G","G","G","G","G","G","B"],
  32: ["B","G","B","G","G","G","G","G","G","B","B","B"],
  33: ["G","B","B","B","G","G","G","B","G","B","B","B"],
  34: ["B","G","B","G","G","G","G","G","G","B","B","B"],
  35: ["B","B","G","B","G","G","G","B","G","B","B","B"],
  36: ["B","G","B","G","G","G","G","G","B","B","B","B"],
  37: ["B","B","B","B","G","B","G","B","B","B","B","B"],
  38: ["G","G","B","B","G","G","B","G","B","B","B","B"],
  39: ["B","B","G","B","B","B","B","B","G","B","B","B"],
  40: ["B","G","B","B","G","G","B","G","B","G","B","B"],
  41: ["B","G","G","G","G","G","B","B","G","B","B","G"],
  42: ["G","G","B","B","G","B","B","B","B","B","B","B"],
  43: ["B","G","G","G","G","G","B","B","B","G","G","G"],
  44: ["B","B","G","B","G","G","G","B","G","G","G","B"],
  45: ["G","B","B","G","G","B","B","G","B","G","B","B"],
};

export const AGE_MIN = 18;
export const AGE_MAX = 45;

/**
 * 엄마 만나이 + 음력 임신월로 성별 예측
 * @param motherAge 임신 당시 엄마의 만나이 (solar age)
 * @param lunarConceptionMonth 임신한 음력 월 (1~12)
 * @returns '아들' | '딸' | null (범위 초과 시 null)
 */
export function predictGender(
  motherAge: number,
  lunarConceptionMonth: number
): "아들" | "딸" | null {
  if (motherAge < AGE_MIN || motherAge > AGE_MAX) return null;
  if (lunarConceptionMonth < 1 || lunarConceptionMonth > 12) return null;

  const row = GENDER_TABLE[motherAge];
  if (!row) return null;

  return row[lunarConceptionMonth - 1] === "B" ? "아들" : "딸";
}
