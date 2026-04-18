import { useEffect } from "react";

/**
 * gender 에 따라 body[data-theme] 을 설정.
 * - "Girl" → data-theme="girl" (살구-분홍 테마)
 * - "Boy" | null → data-theme 제거 (기본 블루 테마)
 *
 * 컴포넌트 언마운트 시 자동으로 원래대로 복원.
 */
export function useBodyGenderTheme(gender: "Boy" | "Girl" | null | undefined) {
  useEffect(() => {
    if (gender === "Girl") {
      document.body.dataset.theme = "girl";
    } else {
      delete document.body.dataset.theme;
    }
    return () => {
      delete document.body.dataset.theme;
    };
  }, [gender]);
}
