/**
 * 특정 날짜 기준 만나이 계산
 * (생일이 지났으면 연도 차이, 안 지났으면 -1)
 */
export function getAgeAtDate(birthDate: Date, targetDate: Date): number {
  let age = targetDate.getFullYear() - birthDate.getFullYear();
  const hasPassedBirthday =
    targetDate.getMonth() > birthDate.getMonth() ||
    (targetDate.getMonth() === birthDate.getMonth() &&
      targetDate.getDate() >= birthDate.getDate());
  if (!hasPassedBirthday) age--;
  return Math.max(0, age);
}
