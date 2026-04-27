import Link from "next/link";
import { ChevronLeft, ChevronRight, Monitor, Smartphone, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { LANDINGS, LANDING_MAP } from "@/features/home-landings";

interface Props {
  slug: string;
}

/**
 * 단일 랜딩을 풀스크린에 가깝게 (실제 viewport 폭 그대로) 표시.
 * 기본은 Desktop, 토글로 Mobile (390px max-width).
 */
export function LandingViewer({ slug }: Props) {
  const meta = LANDING_MAP[slug];
  const [view, setView] = useState<"desktop" | "mobile">("desktop");

  if (!meta) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0e0f12] text-white">
        존재하지 않는 landing: {slug}
      </div>
    );
  }

  const idx = LANDINGS.findIndex((l) => l.slug === slug);
  const prev = idx > 0 ? LANDINGS[idx - 1] : null;
  const next = idx < LANDINGS.length - 1 ? LANDINGS[idx + 1] : null;
  const { Component, title, variantTag, subtitle, conceptLabel } = meta;

  return (
    <div className="min-h-screen bg-[#0e0f12] text-white">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#0e0f12]/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-3 px-6 py-3">
          <Link href="/landings" className="inline-flex items-center gap-1 text-xs text-white/60 hover:text-white">
            <ArrowLeft size={14} strokeWidth={2.25} />
            Landings 목록
          </Link>
          <div className="text-center">
            <p className="text-sm font-semibold tracking-tight">
              <span className="font-mono text-white/60 mr-2">{variantTag}</span>
              {title}
            </p>
            <p className="text-[11px] text-white/50 mt-0.5">
              {conceptLabel} · {subtitle}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <div className="inline-flex items-center rounded-full border border-white/15 bg-white/5 p-0.5 mr-2">
              <button
                onClick={() => setView("desktop")}
                className={[
                  "inline-flex h-7 items-center gap-1 rounded-full px-2.5 text-xs",
                  view === "desktop" ? "bg-white text-[#0e0f12]" : "text-white/60",
                ].join(" ")}
              >
                <Monitor size={12} strokeWidth={2.25} />
              </button>
              <button
                onClick={() => setView("mobile")}
                className={[
                  "inline-flex h-7 items-center gap-1 rounded-full px-2.5 text-xs",
                  view === "mobile" ? "bg-white text-[#0e0f12]" : "text-white/60",
                ].join(" ")}
              >
                <Smartphone size={12} strokeWidth={2.25} />
              </button>
            </div>
            {prev ? (
              <Link href={`/landings/${prev.slug}`} className="inline-flex h-8 items-center gap-1 rounded-full border border-white/15 bg-white/5 pl-2 pr-3 text-xs text-white/70 hover:bg-white/10">
                <ChevronLeft size={14} strokeWidth={2.25} />
                {prev.variantTag}
              </Link>
            ) : (
              <span className="inline-flex h-8 items-center gap-1 rounded-full border border-white/5 pl-2 pr-3 text-xs text-white/25">
                <ChevronLeft size={14} strokeWidth={2.25} />
                이전
              </span>
            )}
            {next ? (
              <Link href={`/landings/${next.slug}`} className="inline-flex h-8 items-center gap-1 rounded-full border border-white/15 bg-white/5 pl-3 pr-2 text-xs text-white/70 hover:bg-white/10">
                {next.variantTag}
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

      {/* 실제 랜딩 렌더 — 모바일 모드일 때 max-width 390 */}
      <main className="bg-white text-black">
        <div
          className="mx-auto"
          style={{
            maxWidth: view === "mobile" ? 390 : "100%",
            // mobile mode 일 땐 상하 마진을 회색 배경으로 분리하기 위해 wrapper 색만 흰색
          }}
        >
          <Component />
        </div>
      </main>
    </div>
  );
}
