import Link from "next/link";
import { useState } from "react";
import { VARIANTS, VARIANT_GROUPS, type VariantMeta } from "@/features/home-playground";

const FRAME_W = 375;
const FRAME_H = 760;

/**
 * 12개 홈 디자인 variant 비교 플레이그라운드.
 * 각 variant 를 375×760 프레임으로 축소 표시하고, 클릭 시 풀스크린 페이지로 이동.
 * 상단의 "스케일" 슬라이더로 전체 프레임 크기를 조절 가능.
 */
export default function PlaygroundIndex() {
  const [scale, setScale] = useState(0.5);

  const groupedVariants = VARIANT_GROUPS.map((g) => ({
    ...g,
    items: VARIANTS.filter((v) => v.group === g.id),
  }));

  return (
    <div className="min-h-screen bg-[#f5f5f2] text-[#1a1a1a]">
      <header className="sticky top-0 z-10 border-b border-black/10 bg-[#f5f5f2]/90 backdrop-blur">
        <div className="mx-auto max-w-[1400px] px-6 py-4 flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-lg font-semibold tracking-tight">Home Design Playground</h1>
            <p className="text-xs text-black/50 mt-0.5">
              Claude Design 에서 가져온 12가지 홈 화면 시안 · 클릭 시 전체 화면
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <label className="flex items-center gap-2">
              <span className="text-black/50">스케일</span>
              <input
                type="range"
                min={0.25}
                max={1}
                step={0.05}
                value={scale}
                onChange={(e) => setScale(parseFloat(e.target.value))}
              />
              <span className="tabular-nums w-10 text-right">{Math.round(scale * 100)}%</span>
            </label>
            <Link
              href="/"
              className="rounded-full border border-black/15 bg-white px-3 py-1.5 hover:bg-black/5"
            >
              ← 프로덕션 홈
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] px-6 py-10 space-y-14">
        {groupedVariants.map((group) => (
          <section key={group.id}>
            <div className="mb-6">
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-black/70">
                {group.title}
              </h2>
              <p className="mt-1 text-xs text-black/50">{group.subtitle}</p>
            </div>

            <div
              className="grid gap-8"
              style={{
                gridTemplateColumns: `repeat(auto-fill, minmax(${FRAME_W * scale + 20}px, 1fr))`,
              }}
            >
              {group.items.map((v) => (
                <VariantCard key={v.slug} variant={v} scale={scale} />
              ))}
            </div>
          </section>
        ))}

        <footer className="pt-8 border-t border-black/10 text-xs text-black/40">
          출처: Claude Design (claude.ai/design) — SENTBE Home Prototype bundle ·
          각 variant 는 순수 inline-style React 컴포넌트.
        </footer>
      </main>
    </div>
  );
}

function VariantCard({ variant, scale }: { variant: VariantMeta; scale: number }) {
  const { Component, title, subtitle, slug } = variant;
  const scaledW = FRAME_W * scale;
  const scaledH = FRAME_H * scale;

  return (
    <Link
      href={`/playground/${slug}`}
      className="group block"
      aria-label={`${title} 전체 화면으로 보기`}
    >
      <div
        className="mx-auto overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-all group-hover:-translate-y-1 group-hover:shadow-[0_10px_40px_rgba(0,0,0,0.12)]"
        style={{ width: scaledW, height: scaledH }}
      >
        <div
          style={{
            width: FRAME_W,
            height: FRAME_H,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            pointerEvents: "none",
          }}
        >
          <Component />
        </div>
      </div>
      <div className="mt-3 px-1">
        <p className="text-sm font-semibold tracking-tight">{title}</p>
        <p className="mt-0.5 text-xs text-black/50 leading-snug">{subtitle}</p>
      </div>
    </Link>
  );
}
