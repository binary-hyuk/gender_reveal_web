import { DateTextInput } from "@/shared/ui/DateTextInput";
import { validateRange, MAX_RANGE_DAYS, normalizeRange } from "@/shared/lib/dateRangePrediction";

interface Props {
  label?: string;
  startValue: string;
  endValue: string;
  onStartChange: (isoDate: string) => void;
  onEndChange: (isoDate: string) => void;
}

/**
 * 임신 추정일을 기간(최대 7일)으로 입력받는 공용 컴포넌트.
 * - 시작일과 종료일을 같게 설정하면 단일일 모드로 동작
 * - 7일 초과 시 경고 표시
 * - 안내 캡션 포함
 */
export function ConceptionDateRangeInput({
  label = "임신 추정일",
  startValue,
  endValue,
  onStartChange,
  onEndChange,
}: Props) {
  const [, effectiveEnd] = normalizeRange(startValue, endValue);
  const rangeError =
    startValue && endValue ? validateRange(startValue, effectiveEnd) : null;

  return (
    <div className="space-y-3 rounded-2xl border border-indigo-100 bg-indigo-50/50 px-4 py-4">
      <div className="space-y-1">
        <p className="text-sm font-semibold text-gray-700">{label}</p>
        <p className="text-xs leading-relaxed text-gray-500">
          추정일이 정확할수록 예측 정확도가 높아집니다. 정확한 날짜를 모르시면{" "}
          <span className="font-semibold text-indigo-600">
            최대 {MAX_RANGE_DAYS}일 기간
          </span>
          으로 설정하셔도 괜찮습니다.
        </p>
      </div>

      <DateTextInput
        label="시작일"
        hint="(양력)"
        value={startValue}
        onChange={onStartChange}
      />
      <DateTextInput
        label="종료일"
        hint="(비워두면 시작일과 동일)"
        value={endValue}
        onChange={onEndChange}
      />

      {rangeError && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-500">
          {rangeError}
        </p>
      )}
    </div>
  );
}
