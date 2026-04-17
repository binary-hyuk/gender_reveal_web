import { useState, useEffect, useRef } from "react";
import { DayPicker } from "react-day-picker";
import { ko } from "date-fns/locale";
import "react-day-picker/style.css";

interface ParsedDate {
  iso: string;    // "1990-01-01" — hooks에 전달
  display: string; // "1990년 1월 1일" — 확인용 표시
}

/**
 * YYYYMMDD (또는 구분자 포함 형식) → 파싱
 * 허용 예시: 19900101 / 1990-01-01 / 1990/01/01 / 1990.01.01
 */
function parseDateInput(raw: string): ParsedDate | null {
  const digits = raw.replace(/\D/g, "");
  if (digits.length !== 8) return null;

  const year = parseInt(digits.slice(0, 4), 10);
  const month = parseInt(digits.slice(4, 6), 10);
  const day = parseInt(digits.slice(6, 8), 10);

  if (year < 1900 || year > 2100) return null;
  if (month < 1 || month > 12) return null;
  if (day < 1 || day > 31) return null;

  // 실제 날짜 유효성 검사 (예: 2월 31일 차단)
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
  value: string; // 부모가 보관하는 ISO 문자열 ("" | "YYYY-MM-DD")
  onChange: (isoDate: string) => void;
}

export function DateTextInput({ label, hint, value, onChange }: Props) {
  // 부모 ISO → 사용자 표시용 raw 텍스트 (처음 한 번만 변환)
  const [rawText, setRawText] = useState(() =>
    value ? value.replace(/-/g, "") : ""
  );
  const [showPicker, setShowPicker] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 입력창/달력으로 내부에서 value를 변경한 경우, 다음 효과에서의
  // value→rawText 역동기화를 건너뛰기 위한 플래그.
  // 이것이 없으면 사용자가 8자리 미만을 타이핑(onChange("") 발생) 할 때마다
  // 부모 value가 ""로 변하고 effect가 rawText도 비워버려 입력이 전부 사라진다.
  const skipNextSync = useRef(false);

  // 부모가 외부에서 value를 변경한 경우에만 rawText를 동기화
  // (reset, 초기값 주입, prop 교체 등)
  useEffect(() => {
    if (skipNextSync.current) {
      skipNextSync.current = false;
      return;
    }
    setRawText(value ? value.replace(/-/g, "") : "");
  }, [value]);

  // 바깥 클릭 시 picker 닫기
  useEffect(() => {
    if (!showPicker) return;
    function onClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowPicker(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
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
      <label className="block text-sm font-semibold text-gray-700">
        {label}{" "}
        {hint && (
          <span className="text-xs font-normal text-gray-400">{hint}</span>
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
            "w-full rounded-xl border bg-white py-3 pl-4 pr-12 text-gray-800 shadow-sm outline-none transition-colors",
            isError
              ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100"
              : parsed
              ? "border-green-300 focus:border-green-400 focus:ring-2 focus:ring-green-100"
              : "border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100",
          ].join(" ")}
        />
        <button
          type="button"
          aria-label="달력에서 날짜 선택"
          onClick={() => setShowPicker((v) => !v)}
          className="absolute inset-y-0 right-0 flex items-center justify-center px-3 text-gray-500 hover:text-purple-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
            <path d="M5.75 2a.75.75 0 0 1 .75.75V4h7V2.75a.75.75 0 0 1 1.5 0V4h.25A2.75 2.75 0 0 1 18 6.75v8.5A2.75 2.75 0 0 1 15.25 18H4.75A2.75 2.75 0 0 1 2 15.25v-8.5A2.75 2.75 0 0 1 4.75 4H5V2.75A.75.75 0 0 1 5.75 2Zm-1 3.5A1.25 1.25 0 0 0 3.5 6.75V8h13V6.75a1.25 1.25 0 0 0-1.25-1.25H4.75ZM16.5 9.5h-13v5.75c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25V9.5Z" />
          </svg>
        </button>

        {showPicker && (
          <div className="absolute left-0 right-0 top-full z-20 mt-2 rounded-2xl border border-gray-200 bg-white p-3 shadow-lg">
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
        <p className="text-xs font-medium text-green-600">✓ {parsed.display}</p>
      )}
      {isError && (
        <p className="text-xs text-red-500">
          올바른 날짜를 입력해주세요 (예: 19900101)
        </p>
      )}
    </div>
  );
}
