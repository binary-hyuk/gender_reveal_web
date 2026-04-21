import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { VARIANTS, VARIANT_MAP } from "@/features/home-playground";

interface Props {
  slug: string;
}

const FRAME_W = 375;
const FRAME_H = 760;

/**
 * 특정 variant 를 풀스크린(실제 모바일 해상도 375×760) 프레임에 표시.
 * 상단에 이전/다음 네비게이션 바와 현재 variant 이름 표시.
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
          <Link href="/playground" className="text-xs text-white/60 hover:text-white">
            ← Playground 목록
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
              <span className="inline-flex h-8 items-center gap-1 rounded-full border border-white/5 bg-white/0 pl-2 pr-3 text-xs text-white/25">
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
              <span className="inline-flex h-8 items-center gap-1 rounded-full border border-white/5 bg-white/0 pl-3 pr-2 text-xs text-white/25">
                다음
                <ChevronRight size={14} strokeWidth={2.25} />
              </span>
            )}
          </div>
        </div>
      </header>

      <main className="flex min-h-[calc(100vh-64px)] items-center justify-center p-6">
        <div
          className="overflow-hidden rounded-[40px] border border-white/10 bg-white shadow-[0_20px_80px_rgba(0,0,0,0.6)]"
          style={{ width: FRAME_W, height: FRAME_H }}
        >
          <Component />
        </div>
      </main>
    </div>
  );
}
