import type { ReactNode } from "react";

type Variant = "primary" | "purple" | "indigo" | "amber" | "orange" | "sky" | "green";

const VARIANT_CLASS: Record<Variant, string> = {
  primary: "bg-gradient-to-r from-pink-400 to-blue-400",
  purple:  "bg-gradient-to-r from-purple-500 to-pink-500",
  indigo:  "bg-gradient-to-r from-indigo-500 to-violet-500",
  amber:   "bg-gradient-to-r from-amber-500 to-orange-500",
  orange:  "bg-gradient-to-r from-orange-400 to-amber-400",
  sky:     "bg-gradient-to-r from-sky-400 to-cyan-400",
  green:   "bg-gradient-to-r from-green-500 to-teal-400",
};

interface Props {
  onClick: () => void;
  children: ReactNode;
  variant?: Variant;
  disabled?: boolean;
  "aria-label"?: string;
}

/**
 * 성별 예측 메인 액션 버튼. 페이지마다 색상 variant 만 다르고 레이아웃은 동일하여 공용화.
 */
export function PredictButton({
  onClick,
  children,
  variant = "primary",
  disabled,
  "aria-label": ariaLabel,
}: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={[
        "w-full rounded-xl py-4 text-lg font-bold text-white shadow-md transition-transform active:scale-95 hover:opacity-90",
        "disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100",
        VARIANT_CLASS[variant],
      ].join(" ")}
    >
      {children}
    </button>
  );
}
