import Link from "next/link";
import { ArrowRight, Sparkles, Target, type LucideIcon } from "lucide-react";
import { NavBar } from "@/shared/ui/NavBar";

interface Entry {
  href: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  accent: string;
  iconBg: string;
  iconColor: string;
}

const ENTRIES: Entry[] = [
  {
    href: "/ai",
    icon: Sparkles,
    title: "AI 예측",
    subtitle: "17가지 방법 종합",
    description:
      "고대 달력부터 현대 수비학까지, 서로 다른 관점을 하나의 AI가 조합해 성별을 판별합니다.",
    accent: "bg-violet-500",
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
  },
  {
    href: "/planner",
    icon: Target,
    title: "플래너",
    subtitle: "원하는 성별 역추천",
    description:
      "원하는 성별을 먼저 정하면, 유리한 시기·방위·라이프스타일을 역으로 제안합니다.",
    accent: "bg-sky-500",
    iconBg: "bg-sky-50",
    iconColor: "text-sky-600",
  },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-neutral-50">
      <NavBar />
      <main className="flex flex-1 flex-col items-center px-4 pb-16 pt-10">
        <div className="mb-8 w-full max-w-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-400">
            Gender Reveal
          </p>
          <h1 className="mt-2 text-[28px] font-bold leading-tight tracking-tight text-neutral-900">
            시작할 방식을
            <br />
            골라주세요
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-neutral-500">
            두 가지 흐름 중 하나로 시작할 수 있어요. 개별 예측법은 상단 <strong>전체</strong> 메뉴에서도 바로 열 수 있습니다.
          </p>
        </div>

        <div className="flex w-full max-w-sm flex-col gap-3">
          {ENTRIES.map(
            ({ href, icon: Icon, title, subtitle, description, accent, iconBg, iconColor }) => (
              <Link
                key={href}
                href={href}
                aria-label={`${title} 시작하기`}
                className="group relative flex items-start gap-4 overflow-hidden rounded-2xl border border-neutral-200 bg-white p-5 pl-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition active:scale-[0.99] hover:border-neutral-300 hover:shadow-md"
              >
                <span
                  aria-hidden
                  className={`absolute inset-y-0 left-0 w-1 ${accent}`}
                />
                <span
                  aria-hidden
                  className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl ${iconBg}`}
                >
                  <Icon size={22} strokeWidth={2.25} className={iconColor} />
                </span>
                <span className="flex-1 min-w-0">
                  <span className="flex items-center gap-2">
                    <span className="text-base font-semibold text-neutral-900">
                      {title}
                    </span>
                    <span className="text-[11px] font-medium text-neutral-400">
                      · {subtitle}
                    </span>
                  </span>
                  <span className="mt-1 block text-[13px] leading-relaxed text-neutral-500">
                    {description}
                  </span>
                </span>
                <ArrowRight
                  size={18}
                  strokeWidth={2}
                  aria-hidden
                  className="mt-1 flex-shrink-0 text-neutral-300 transition-transform group-hover:translate-x-0.5 group-hover:text-neutral-500"
                />
              </Link>
            )
          )}
        </div>

        <p className="mt-10 text-center text-[11px] text-neutral-400">
          처음이라면 <span className="font-medium text-neutral-500">AI 예측</span>을 추천합니다
        </p>
      </main>
    </div>
  );
}
