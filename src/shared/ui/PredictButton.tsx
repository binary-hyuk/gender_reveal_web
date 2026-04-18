import type { ReactNode } from "react";

/**
 * 과거에 7종 그라데이션 variant 가 있었지만 글래스 디자인으로 통합되면서
 * 모두 브랜드 solid 버튼으로 수렴. 기존 호출부 타입 호환을 위해 이름만 유지.
 */
type Variant =
  | "primary" | "purple" | "indigo" | "amber" | "orange" | "sky" | "green"
  | "secondary";

interface Props {
  onClick: () => void;
  children: ReactNode;
  variant?: Variant;
  disabled?: boolean;
  "aria-label"?: string;
}

export function PredictButton({
  onClick,
  children,
  variant = "primary",
  disabled,
  "aria-label": ariaLabel,
}: Props) {
  const isSecondary = variant === "secondary";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={[
        "w-full rounded-2xl py-4 text-base font-semibold tracking-tight transition active:scale-[0.98]",
        isSecondary
          ? "glass text-fg hover:bg-white/70"
          : "bg-brand-600 text-white shadow-[0_8px_24px_rgba(var(--shadow-color),0.25)] hover:bg-brand-700",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100",
      ].join(" ")}
    >
      {children}
    </button>
  );
}
