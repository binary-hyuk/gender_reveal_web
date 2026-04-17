import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import {
  Home,
  Sparkles,
  Target,
  ChevronDown,
  Landmark,
  Mountain,
  Moon,
  Droplet,
  Hash,
  Globe,
  Wind,
  Leaf,
  House,
  Dna,
  Wand2,
  Flame,
  Scale,
  Wheat,
  Clover,
  type LucideIcon,
} from "lucide-react";

interface NavItem {
  href: string;
  icon: LucideIcon;
  label: string;
}

const PRIMARY: NavItem[] = [
  { href: "/",        icon: Home,     label: "홈" },
  { href: "/ai",      icon: Sparkles, label: "AI 예측" },
  { href: "/planner", icon: Target,   label: "플래너" },
];

const GROUPS: { title: string; items: NavItem[] }[] = [
  {
    title: "동양",
    items: [
      { href: "/chinese",   icon: Landmark, label: "중국 황실 달력" },
      { href: "/ancient49", icon: Scale,   label: "주역 49" },
      { href: "/kfengshui", icon: House,   label: "풍수지리" },
      { href: "/ohang",     icon: Flame,   label: "오행 (Gr-ai)" },
      { href: "/samwon",    icon: Wand2,   label: "삼원 (Cl-ai)" },
    ],
  },
  {
    title: "고대·전통",
    items: [
      { href: "/mayan",            icon: Mountain, label: "마야식" },
      { href: "/egypt-wheat",      icon: Wheat,    label: "이집트 밀·보리" },
      { href: "/hippocrates-wind", icon: Wind,     label: "히포크라테스 바람" },
      { href: "/ayurveda",         icon: Leaf,     label: "아유르베다" },
      { href: "/gypsy",            icon: Clover,   label: "집시 카드" },
    ],
  },
  {
    title: "천문·주기",
    items: [
      { href: "/lunar-zodiac",      icon: Moon,  label: "달 별자리" },
      { href: "/planetary-weekday", icon: Globe, label: "행성 요일" },
      { href: "/cbr",               icon: Moon,  label: "CBR (Ge-ai)" },
    ],
  },
  {
    title: "신체·수비",
    items: [
      { href: "/blood-renewal", icon: Droplet, label: "혈액 갱신" },
      { href: "/blood-type",    icon: Droplet, label: "혈액형" },
      { href: "/numerology",    icon: Hash,    label: "수비학" },
      { href: "/digital-dna",   icon: Dna,     label: "디지털 DNA" },
    ],
  },
];

export function NavBar() {
  const { pathname } = useRouter();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (!menuRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const allSecondary = GROUPS.flatMap((g) => g.items);
  const isSecondaryActive = allSecondary.some((i) => i.href === pathname);

  return (
    <nav
      aria-label="주요 네비게이션"
      className="sticky top-0 z-20 w-full border-b border-neutral-200 bg-white/95 backdrop-blur"
    >
      <div className="mx-auto flex h-14 w-full max-w-xl items-center justify-between px-4">
        <div className="flex items-center gap-1">
          {PRIMARY.map(({ href, icon: Icon, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={[
                  "flex h-9 items-center gap-1.5 rounded-full px-3 text-sm font-medium transition-colors",
                  active
                    ? "bg-neutral-900 text-white"
                    : "text-neutral-600 hover:bg-neutral-100",
                ].join(" ")}
              >
                <Icon size={16} strokeWidth={2.25} aria-hidden />
                <span>{label}</span>
              </Link>
            );
          })}
        </div>

        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-haspopup="menu"
            className={[
              "flex h-9 items-center gap-1 rounded-full px-3 text-sm font-medium transition-colors",
              isSecondaryActive
                ? "bg-neutral-900 text-white"
                : "text-neutral-600 hover:bg-neutral-100",
            ].join(" ")}
          >
            전체
            <ChevronDown
              size={14}
              strokeWidth={2.5}
              className={open ? "rotate-180 transition-transform" : "transition-transform"}
              aria-hidden
            />
          </button>

          {open && (
            <div
              role="menu"
              className="absolute right-0 top-11 w-72 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl"
            >
              <div className="max-h-[70vh] overflow-y-auto p-2">
                {GROUPS.map((group) => (
                  <div key={group.title} className="py-1">
                    <div className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                      {group.title}
                    </div>
                    {group.items.map(({ href, icon: Icon, label }) => {
                      const active = pathname === href;
                      return (
                        <Link
                          key={href}
                          href={href}
                          role="menuitem"
                          aria-current={active ? "page" : undefined}
                          className={[
                            "flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors",
                            active
                              ? "bg-neutral-100 font-semibold text-neutral-900"
                              : "text-neutral-700 hover:bg-neutral-50",
                          ].join(" ")}
                        >
                          <Icon
                            size={16}
                            strokeWidth={2}
                            className="text-neutral-500"
                            aria-hidden
                          />
                          <span className="truncate">{label}</span>
                        </Link>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
