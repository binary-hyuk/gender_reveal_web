import { useState, useEffect, useRef } from "react";
import { DayPicker } from "react-day-picker";
import { ko } from "date-fns/locale";
import { Calendar, Check } from "lucide-react";
import "react-day-picker/style.css";

interface ParsedDate {
  iso: string;
  display: string;
}

function parseDateInput(raw: string): ParsedDate | null {
  const digits = raw.replace(/\D/g, "");
  if (digits.length !== 8) return null;

  const year = parseInt(digits.slice(0, 4), 10);
  const month = parseInt(digits.slice(4, 6), 10);
  const day = parseInt(digits.slice(6, 8), 10);

  if (year < 1900 || year > 2100) return null;
  if (month < 1 || month > 12) return null;
  if (day < 1 || day > 31) return null;

  const date = new Date(year, month - 1, day);
  if (
    date.getFullYear() !== year ||
    date.getMonth() + 1 !== month ||
    date.getDate() !== day
  )
    return null;

  return {
    iso: `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
    display: `${year}년 ${month}월 ${day}일`,
  };
}

function isoToDate(iso: string): Date | undefined {
  if (!iso) return undefined;
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return undefined;
  return new Date(y, m - 1, d);
}

function dateToIso(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

interface Props {
  label: string;
  hint?: string;
  value: string;
  onChange: (isoDate: string) => void;
}

export function DateTextInput({ label, hint, value, onChange }: Props) {
  const [rawText, setRawText] = useState(() =>
    value ? value.replace(/-/g, "") : ""
  );
  const [showPicker, setShowPicker] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const skipNextSync = useRef(false);

  useEffect(() => {
    if (skipNextSync.current) {
      skipNextSync.current = false;
      return;
    }
    setRawText(value ? value.replace(/-/g, "") : "");
  }, [value]);

  useEffect(() => {
    if (!showPicker) return;
    function onClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowPicker(false);
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setShowPicker(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [showPicker]);

  const parsed = parseDateInput(rawText);
  const hasInput = rawText.length > 0;
  const isError = hasInput && !parsed;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value;
    setRawText(raw);
    const result = parseDateInput(raw);
    skipNextSync.current = true;
    onChange(result ? result.iso : "");
  }

  function handlePick(date: Date | undefined) {
    if (!date) return;
    const iso = dateToIso(date);
    setRawText(iso.replace(/-/g, ""));
    skipNextSync.current = true;
    onChange(iso);
    setShowPicker(false);
  }

  return (
    <div className="space-y-1.5" ref={containerRef}>
      <label className="block text-sm font-semibold text-fg">
        {label}
        {hint && (
          <span className="ml-1 text-xs font-normal text-fg-subtle">{hint}</span>
        )}
      </label>

      <div className="relative">
        <input
          type="text"
          inputMode="numeric"
          value={rawText}
          onChange={handleChange}
          placeholder="19900101"
          maxLength={10}
          className={[
            "w-full rounded-xl bg-white/70 py-3 pl-4 pr-12 text-fg outline-none transition backdrop-blur",
            "border placeholder:text-fg-subtle/60",
            isError
              ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100"
              : parsed
              ? "border-emerald-300/70 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
              : "border-white/60 focus:border-brand-400 focus:ring-2 focus:ring-brand-200/50",
          ].join(" ")}
        />
        <button
          type="button"
          aria-label="달력에서 날짜 선택"
          onClick={() => setShowPicker((v) => !v)}
          className="absolute inset-y-0 right-0 flex items-center justify-center px-3 text-fg-subtle transition hover:text-brand-600"
        >
          <Calendar size={18} strokeWidth={2.25} aria-hidden />
        </button>

        {showPicker && (
          <div className="glass-strong absolute left-0 right-0 top-full z-20 mt-2 rounded-2xl p-3">
            <DayPicker
              animate
              mode="single"
              locale={ko}
              captionLayout="dropdown"
              startMonth={new Date(1900, 0)}
              endMonth={new Date(2100, 11)}
              selected={parsed ? isoToDate(parsed.iso) : undefined}
              defaultMonth={parsed ? isoToDate(parsed.iso) : new Date()}
              onSelect={handlePick}
            />
          </div>
        )}
      </div>

      {parsed && !showPicker && (
        <p className="flex items-center gap-1 text-xs font-medium text-emerald-600">
          <Check size={12} strokeWidth={2.75} aria-hidden />
          {parsed.display}
        </p>
      )}
      {isError && (
        <p className="text-xs text-red-500">
          올바른 날짜를 입력해주세요 (예: 19900101)
        </p>
      )}
    </div>
  );
}
