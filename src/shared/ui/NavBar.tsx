import Link from "next/link";
import { useRouter } from "next/router";

const NAV_ITEMS = [
  { href: "/",              emoji: "🤖", label: "AI 예측"   },
  { href: "/chinese",       emoji: "🏮", label: "중국 달력" },
  { href: "/mayan",         emoji: "🗿", label: "마야식"   },
  { href: "/ancient49",     emoji: "☯️", label: "주역 49" },
  { href: "/lunar-zodiac",  emoji: "🌙", label: "달 별자리" },
  { href: "/blood-renewal", emoji: "🩸", label: "혈액 갱신" },
  { href: "/blood-type",        emoji: "🅰️", label: "혈액형"  },
  { href: "/numerology",        emoji: "🔢", label: "수비학"   },
  { href: "/planetary-weekday", emoji: "🌍", label: "행성요일" },
  { href: "/gypsy",             emoji: "🎴", label: "집시"     },
  { href: "/egypt-wheat",       emoji: "🌾", label: "이집트"   },
  { href: "/hippocrates-wind",  emoji: "🌬️", label: "히포크라테스" },
  { href: "/ayurveda",          emoji: "🪷", label: "아유르베다" },
  { href: "/kfengshui",         emoji: "🏠", label: "풍수지리" },
  { href: "/digital-dna",       emoji: "🧬", label: "디지털DNA" },
  { href: '/ohang', emoji: '✖️', label: 'Gr-ai' },
  { href: '/cbr',   emoji: '✨', label: 'Ge-ai' },
  { href: '/samwon', emoji: '✳️', label: 'Cl-ai' },
] as const;

export function NavBar() {
  const { pathname } = useRouter();

  return (
    <nav className="sticky top-0 z-10 w-full border-b border-gray-100 bg-white/90 backdrop-blur">
      <ul className="flex overflow-x-auto">
        {NAV_ITEMS.map(({ href, emoji, label }) => {
          const isActive = pathname === href;
          return (
            <li key={href} className="flex-shrink-0">
              <Link
                href={href}
                className={[
                  "flex flex-col items-center gap-0.5 px-4 py-2.5 text-xs font-medium transition-colors",
                  isActive
                    ? href === "/"
                      ? "border-b-2 border-purple-500 text-purple-600"
                      : "border-b-2 border-pink-400 text-pink-600"
                    : "text-gray-500 hover:text-gray-700",
                ].join(" ")}
              >
                <span className="text-base">{emoji}</span>
                <span>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
