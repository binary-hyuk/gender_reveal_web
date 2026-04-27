import Link from "next/link";
import { useState } from "react";
import { ChevronRight, Smartphone, Monitor } from "lucide-react";
import { LANDINGS, LANDING_GROUPS, type LandingMeta } from "@/features/home-landings";

type ViewMode = "desktop" | "mobile";

/**
 * 8개 풀 랜딩 페이지를 데스크톱/모바일 뷰포트로 비교하는 그리드.
 * 각 카드는 `/landings/<slug>` 풀스크린 페이지로 이동.
 */
export default function LandingsIndex() {
  const [view, setView] = useState<ViewMode>("desktop");
  const [scale, setScale] = useState(0.3);

  const grouped = LANDING_GROUPS.map((g) => ({
    ...g,
    items: LANDINGS.filter((l) => l.conceptId === g.id),
  }));

  return (
    <div className="min-h-screen bg-[#0e0f12] text-white">
      <header className="sticky top-0 z-10 border-b border-white/10 bg-[#0e0f12]/95 backdrop-blur">
        <div className="mx-auto max-w-[1600px] px-6 py-4 flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-base font-semibold tracking-tight">SENTBE Home Landings</h1>
            <p className="mt-0.5 text-xs text-white/50">
              4개 컨셉 × A/B 변형 = 8개 풀 랜딩 · 반응형
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            {/* 뷰포트 토글 */}
            <div className="inline-flex items-center rounded-full border border-white/15 bg-white/5 p-0.5">
              <button
                onClick={() => setView("desktop")}
                className={[
                  "inline-flex h-7 items-center gap-1 rounded-full px-3",
                  view === "desktop" ? "bg-white text-[#0e0f12]" : "text-white/60",
                ].join(" ")}
                aria-pressed={view === "desktop"}
              >
                <Monitor size={12} strokeWidth={2.25} />
                Desktop
              </button>
              <button
                onClick={() => setView("mobile")}
                className={[
                  "inline-flex h-7 items-center gap-1 rounded-full px-3",
                  view === "mobile" ? "bg-white text-[#0e0f12]" : "text-white/60",
                ].join(" ")}
                aria-pressed={view === "mobile"}
              >
                <Smartphone size={12} strokeWidth={2.25} />
                Mobile
              </button>
            </div>
            <label className="flex items-center gap-2 text-white/60">
              스케일
              <input
                type="range" min={0.15} max={0.6} step={0.05}
                value={scale}
                onChange={(e) => setScale(parseFloat(e.target.value))}
              />
              <span className="tabular-nums w-10 text-right text-white/80">
                {Math.round(scale * 100)}%
              </span>
            </label>
            <Link
              href="/playground"
              className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 hover:bg-white/10"
            >
              ← 12 Mobile 시안
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1600px] px-6 py-10 space-y-12">
        {grouped.map((g) => (
          <section key={g.id}>
            <div className="mb-5">
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
                {g.title}
              </h2>
              <p className="mt-1 text-xs text-white/50">{g.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {g.items.map((l) => (
                <LandingCard key={l.slug} landing={l} view={view} scale={scale} />
              ))}
            </div>
          </section>
        ))}

        <footer className="pt-8 border-t border-white/10 text-xs text-white/40">
          출처: Claude Design — SENTBE Home Landings 번들. 8개 모두 inline-style React 컴포넌트.
        </footer>
      </main>
    </div>
  );
}

function LandingCard({
  landing,
  view,
  scale,
}: {
  landing: LandingMeta;
  view: ViewMode;
  scale: number;
}) {
  const { Component, slug, title, variantTag, subtitle } = landing;
  const dims = view === "desktop" ? landing.desktop : landing.mobile;
  // 카드 크기는 viewport 별 약간 다른 max scale
  const effectiveScale = view === "mobile" ? Math.min(scale * 1.5, 0.7) : scale;

  return (
    <Link
      href={`/landings/${slug}`}
      className="group block"
      aria-label={`${variantTag} ${title} 풀스크린 보기`}
    >
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-3 transition-all group-hover:bg-white/[0.04] group-hover:border-white/20">
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-mono font-semibold tracking-wider text-white/80">
              {variantTag}
            </span>
            <span className="text-sm font-semibold tracking-tight text-white">{title}</span>
          </div>
          <ChevronRight size={14} strokeWidth={2.25} className="text-white/40 group-hover:translate-x-0.5 transition-transform" />
        </div>
        <div
          className="relative mx-auto overflow-hidden rounded-xl bg-white"
          style={{
            width: dims.w * effectiveScale,
            height: Math.min(900, dims.h * effectiveScale),
            maxWidth: "100%",
          }}
        >
          <div
            style={{
              width: dims.w,
              height: dims.h,
              transform: `scale(${effectiveScale})`,
              transformOrigin: "top left",
              pointerEvents: "none",
            }}
          >
            <Component />
          </div>
        </div>
        <p className="mt-3 px-1 text-xs text-white/50 leading-relaxed">{subtitle}</p>
      </div>
    </Link>
  );
}
