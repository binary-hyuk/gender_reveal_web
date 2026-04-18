import { DateTextInput } from "@/shared/ui/DateTextInput";
import { GlassCard } from "@/shared/ui/GlassCard";
import { validateRange, MAX_RANGE_DAYS, normalizeRange } from "@/shared/lib/dateRangePrediction";

interface Props {
  label?: string;
  startValue: string;
  endValue: string;
  onStartChange: (isoDate: string) => void;
  onEndChange: (isoDate: string) => void;
}

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
    <GlassCard variant="soft" className="space-y-3 px-4 py-4">
      <div className="space-y-1">
        <p className="text-sm font-semibold text-fg">{label}</p>
        <p className="text-xs leading-relaxed text-fg-muted">
          추정일이 정확할수록 예측 정확도가 높아집니다. 정확한 날짜를 모르시면{" "}
          <span className="font-semibold text-brand-700">
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
        <p className="rounded-xl border border-red-200/60 bg-red-50/70 px-3 py-2 text-xs text-red-600">
          {rangeError}
        </p>
      )}
    </GlassCard>
  );
}
