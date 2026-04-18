import type { ElementType, ReactNode } from "react";

type Variant = "default" | "strong" | "soft";

type Props = {
  as?: ElementType;
  variant?: Variant;
  className?: string;
  children?: ReactNode;
} & Record<string, unknown>;

const VARIANT_CLASS: Record<Variant, string> = {
  default: "glass",
  strong: "glass-strong",
  soft: "glass-soft",
};

/**
 * 글래스모피즘 카드.
 * - variant="default"  반투명 + blur 14px
 * - variant="strong"   주 CTA/결과 카드용 (더 진하고 shadow 큼)
 * - variant="soft"     부차적 박스 (힌트/설명)
 *
 * 톤은 전역 CSS 변수(`--brand-hue` 등)로 제어되므로 이 컴포넌트엔 색이 없습니다.
 */
export function GlassCard({
  as,
  variant = "default",
  className = "",
  children,
  ...rest
}: Props) {
  const Tag = (as ?? "div") as ElementType;
  return (
    <Tag
      {...rest}
      className={[
        VARIANT_CLASS[variant],
        "rounded-2xl",
        className,
      ].join(" ")}
    >
      {children}
    </Tag>
  );
}
