import Link from "next/link";
import { ArrowRight, Sparkles, Target, type LucideIcon } from "lucide-react";
import { NavBar } from "@/shared/ui/NavBar";
import { GlassCard } from "@/shared/ui/GlassCard";

interface Entry {
  href: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
}

const ENTRIES: Entry[] = [
  {
    href: "/ai",
    icon: Sparkles,
    title: "AI 예측",
    subtitle: "17가지 방법 종합",
    description:
      "고대 달력부터 현대 수비학까지, 서로 다른 관점을 AI가 조합해 성별을 판별합니다.",
  },
  {
    href: "/planner",
    icon: Target,
    title: "플래너",
    subtitle: "원하는 성별 역추천",
    description:
      "원하는 성별을 먼저 정하면 유리한 시기·방위·라이프스타일을 역으로 제안합니다.",
  },
];

export default function HomePage() {
  return (
    <div className="app-bg flex min-h-screen flex-col">
      <NavBar />
      <main className="flex flex-1 flex-col items-center px-5 pb-24 pt-16">

        {/* 헤더 */}
        <div className="mb-14 w-full max-w-sm">
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-brand-600/70">
            Gender Reveal
          </p>
          <h1 className="mt-3 text-[26px] font-semibold leading-snug tracking-tight text-fg">
            어떻게 시작할까요?
          </h1>
          <p className="mt-4 text-sm leading-loose text-fg-muted">
            두 가지 방식 중 하나를 선택하세요. 개별 예측법은 상단 <strong className="font-medium text-fg">전체</strong> 메뉴에서 바로 이용할 수 있습니다.
          </p>
        </div>

        {/* 카드 목록 */}
        <div className="flex w-full max-w-sm flex-col gap-4">
          {ENTRIES.map(({ href, icon: Icon, title, subtitle, description }) => (
            <GlassCard
              key={href}
              as={Link}
              href={href}
              aria-label={`${title} 시작하기`}
              className="group flex items-start gap-5 p-6 transition active:scale-[0.99]"
            >
              <span
                aria-hidden
                className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white/80"
              >
                <Icon size={20} strokeWidth={2} className="text-brand-600" />
              </span>

              <span className="flex-1 min-w-0 space-y-1.5">
                <span className="flex items-baseline gap-2">
                  <span className="text-[15px] font-semibold text-fg">{title}</span>
                  <span className="text-[11px] text-fg-subtle">{subtitle}</span>
                </span>
                <span className="block text-[13px] leading-relaxed text-fg-muted">
                  {description}
                </span>
              </span>

              <ArrowRight
                size={16}
                strokeWidth={2}
                aria-hidden
                className="mt-1 flex-shrink-0 text-fg-subtle/50 transition-all group-hover:translate-x-0.5 group-hover:text-brand-500"
              />
            </GlassCard>
          ))}
        </div>

        <p className="mt-12 text-center text-xs text-fg-subtle">
          처음이라면 AI 예측을 추천드립니다
        </p>

        <Link
          href="/playground"
          className="mt-4 inline-block text-center text-[11px] text-fg-subtle underline decoration-dotted hover:text-brand-600"
        >
          🎨 디자인 시안 12종 비교 (Playground)
        </Link>
      </main>
    </div>
  );
}
