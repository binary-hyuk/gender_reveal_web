/**
 * unknown 타입의 에러 객체를 사용자 표시용 메시지로 변환.
 * `catch (e) { setError((e as Error).message) }` 패턴을 안전하게 대체한다.
 */
export function toErrorMessage(error: unknown, fallback = "알 수 없는 오류가 발생했습니다."): string {
  if (error instanceof Error) return error.message || fallback;
  if (typeof error === "string") return error || fallback;
  if (error && typeof error === "object" && "message" in error) {
    const m = (error as { message?: unknown }).message;
    if (typeof m === "string" && m) return m;
  }
  return fallback;
}
