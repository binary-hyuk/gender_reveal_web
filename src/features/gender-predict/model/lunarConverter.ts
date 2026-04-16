import KoreanLunarCalendar from "korean-lunar-calendar";

export interface LunarDate {
  year: number;
  month: number;
  day: number;
}

/** 양력 Date → 음력 날짜 변환 */
export function solarToLunar(date: Date): LunarDate {
  const cal = new KoreanLunarCalendar();
  cal.setSolarDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
  const { year, month, day } = cal.getLunarCalendar();
  return { year, month, day };
}

/**
 * 중국식 연나이 계산
 *
 * 규칙: 태어날 때 1살, 음력 설(1/1)마다 +1
 * → 음력 임신연도 - 음력 출생연도 + 1
 */
export function getChineseAge(
  motherBirthDate: Date,
  conceptionDate: Date
): number {
  const lunarBirth = solarToLunar(motherBirthDate);
  const lunarConception = solarToLunar(conceptionDate);
  return lunarConception.year - lunarBirth.year + 1;
}
