import { useCallback, useEffect, useRef, useState } from "react";

/**
 * localStorage에 자동 저장/복구되는 useState.
 *
 * - SSR 안전: 첫 렌더는 `initial`을 반환하고 hydration 직후 localStorage 값으로 덮어쓴다.
 * - 저장은 300ms debounce로 묶어 keystroke 마다 쓰지 않는다.
 * - 동일 key 에 대해 다른 탭에서 변경되면 storage 이벤트로 동기화된다.
 *
 * Set/Map 등 직렬화 불가 타입은 호출 측에서 배열 등으로 변환해 저장할 것.
 */
export function usePersistedState<T>(
  key: string,
  initial: T,
): [T, (v: T | ((prev: T) => T)) => void, () => void] {
  const [value, setValue] = useState<T>(initial);
  const hydratedRef = useRef(false);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 1) 마운트 직후 localStorage 값 로드 (SSR 호환)
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw !== null) {
        const parsed = JSON.parse(raw) as T;
        setValue(parsed);
      }
    } catch {
      // JSON 파싱 실패 시 초기값 유지
    } finally {
      hydratedRef.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 2) 값이 변경될 때마다 debounce 저장
  useEffect(() => {
    if (!hydratedRef.current) return;
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch {
        // quota exceeded 등 무시
      }
    }, 300);
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, [key, value]);

  // 3) 다른 탭에서 변경된 경우 싱크
  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key !== key) return;
      if (e.newValue === null) return;
      try {
        setValue(JSON.parse(e.newValue) as T);
      } catch {
        // 무시
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [key]);

  const clear = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
    } catch {
      // 무시
    }
    setValue(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return [value, setValue, clear];
}
