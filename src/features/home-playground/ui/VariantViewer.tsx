import Link from "next/link";
import { ChevronLeft, ChevronRight, Sparkles, Target, Home, LayoutGrid } from "lucide-react";
import { VARIANTS, VARIANT_MAP } from "@/features/home-playground";

interface Props {
  slug: string;
}

const FRAME_W = 375;
const FRAME_H = 760;

/**
 * 특정 variant 를 375×760 프레임에 표시하고, 프레임 내부 카드·네비게이션이
 * 프로덕션 라우트(/ai, /planner)로 이동하도록 연결된다.
 * 프레임 외부 하단에는 시안 상관없이 항상 접근 가능한 Quick Action Bar 를 둔다.
 */
export function VariantViewer({ slug }: Props) {
  const current = VARIANT_MAP[slug];
  if (!current) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f5f2] text-black">
        <p>존재하지 않는 variant: {slug}</p>
      </div>
    );
  }

  const idx = VARIANTS.findIndex((v) => v.slug === slug);
  const prev = idx > 0 ? VARIANTS[idx - 1] : null;
  const next = idx < VARIANTS.length - 1 ? VARIANTS[idx + 1] : null;
  const { Component, title, subtitle } = current;

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      <header className="sticky top-0 z-10 border-b border-white/10 bg-[#0f0f0f]/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-3 px-6 py-3">
          <Link
            href="/playground"
            className="inline-flex items-center gap-1 text-xs text-white/60 hover:text-white"
          >
            <LayoutGrid size={14} strokeWidth={2.25} />
            Playground
          </Link>
          <div className="text-center">
            <p className="text-sm font-semibold tracking-tight">{title}</p>
            <p className="text-[11px] text-white/50 mt-0.5">{subtitle}</p>
          </div>
          <div className="flex items-center gap-1">
            {prev ? (
              <Link
                href={`/playground/${prev.slug}`}
                className="inline-flex h-8 items-center gap-1 rounded-full border border-white/15 bg-white/5 pl-2 pr-3 text-xs text-white/70 hover:bg-white/10"
                aria-label={`이전: ${prev.title}`}
              >
                <ChevronLeft size={14} strokeWidth={2.25} />
                이전
              </Link>
            ) : (
              <span className="inline-flex h-8 items-center gap-1 rounded-full border border-white/5 pl-2 pr-3 text-xs text-white/25">
                <ChevronLeft size={14} strokeWidth={2.25} />
                이전
              </span>
            )}
            {next ? (
              <Link
                href={`/playground/${next.slug}`}
                className="inline-flex h-8 items-center gap-1 rounded-full border border-white/15 bg-white/5 pl-3 pr-2 text-xs text-white/70 hover:bg-white/10"
                aria-label={`다음: ${next.title}`}
              >
                다음
                <ChevronRight size={14} strokeWidth={2.25} />
              </Link>
            ) : (
              <span className="inline-flex h-8 items-center gap-1 rounded-full border border-white/5 pl-3 pr-2 text-xs text-white/25">
                다음
                <ChevronRight size={14} strokeWidth={2.25} />
              </span>
            )}
          </div>
        </div>
      </header>

      <main className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center gap-6 p-6">
        {/* 프레임: 375×760 실기기 해상도 */}
        <div
          className="overflow-hidden rounded-[40px] border border-white/10 bg-white shadow-[0_20px_80px_rgba(0,0,0,0.6)]"
          style={{ width: FRAME_W, height: FRAME_H }}
        >
          <Component />
        </div>

        {/* 액션 바: 이 시안의 AI / 플래너 기능 페이지로 이동 */}
        <div className="w-full max-w-[720px] space-y-2">
          <p className="text-center text-[11px] uppercase tracking-[0.22em] text-white/40">
            이 시안 테마로 실제 기능 써보기
          </p>
          <div className="grid grid-cols-3 gap-2">
            <ActionButton href="/" icon={Home} label="프로덕션 홈" />
            <ActionButton href={`/playground/${slug}/ai`} icon={Sparkles} label="AI 예측" primary />
            <ActionButton href={`/playground/${slug}/planner`} icon={Target} label="플래너" primary />
          </div>
          <p className="text-center text-[10px] text-white/30 leading-relaxed">
            AI/플래너 페이지는 이 시안의 배경·폰트·악센트를 그대로 유지합니다. 프레임 내부
            카드를 눌러도 동일한 테마 페이지로 이동합니다.
          </p>
        </div>
      </main>
    </div>
  );
}

function ActionButton({
  href,
  icon: Icon,
  label,
  primary,
}: {
  href: string;
  icon: typeof Sparkles;
  label: string;
  primary?: boolean;
}) {
  return (
    <Link
      href={href}
      className={[
        "inline-flex h-11 items-center justify-center gap-2 rounded-2xl text-sm font-medium transition",
        primary
          ? "bg-white text-[#0f0f0f] hover:bg-white/90"
          : "border border-white/15 bg-white/5 text-white/80 hover:bg-white/10",
      ].join(" ")}
    >
      <Icon size={15} strokeWidth={2.25} aria-hidden />
      {label}
    </Link>
  );
}
