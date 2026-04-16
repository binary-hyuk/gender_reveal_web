import { useState, useEffect } from "react";

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

  // 부모가 reset()으로 value를 비울 때 내부 상태도 초기화
  useEffect(() => {
    if (!value) setRawText("");
  }, [value]);

  const parsed = parseDateInput(rawText);
  const hasInput = rawText.length > 0;
  const isError = hasInput && !parsed;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value;
    setRawText(raw);
    const result = parseDateInput(raw);
    onChange(result ? result.iso : "");
  }

  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-semibold text-gray-700">
        {label}{" "}
        {hint && (
          <span className="text-xs font-normal text-gray-400">{hint}</span>
        )}
      </label>

      <input
        type="text"
        inputMode="numeric"
        value={rawText}
        onChange={handleChange}
        placeholder="19900101"
        maxLength={10}
        className={[
          "w-full rounded-xl border bg-white px-4 py-3 text-gray-800 shadow-sm outline-none transition-colors",
          isError
            ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100"
            : parsed
            ? "border-green-300 focus:border-green-400 focus:ring-2 focus:ring-green-100"
            : "border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100",
        ].join(" ")}
      />

      {parsed && (
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
