import Link from "next/link";
import { useRouter } from "next/router";

const NAV_ITEMS = [
  { href: "/",              emoji: "🤖", label: "AI 예측"   },
  { href: "/chinese",       emoji: "🏮", label: "중국 달력" },
  { href: "/mayan",         emoji: "🗿", label: "마야식"   },
  { href: "/ancient49",     emoji: "☯️", label: "주역 49" },
  { href: "/lunar-zodiac",  emoji: "🌙", label: "달 별자리" },
  { href: "/blood-renewal", emoji: "🩸", label: "혈액 갱신" },
  { href: "/blood-type",    emoji: "🅰️", label: "혈액형"  },
  { href: '/ohang', emoji: '☯️', label: '오행천문' },
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
