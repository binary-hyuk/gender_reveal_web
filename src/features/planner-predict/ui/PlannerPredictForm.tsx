import { DateTextInput } from "@/shared/ui/DateTextInput";
import type { PlannerTarget } from "../model/usePlannerPredictor";

const MBTI_TYPES = ["INTJ","INTP","ENTJ","ENTP","INFJ","INFP","ENFJ","ENFP","ISTJ","ISFJ","ESTJ","ESFJ","ISTP","ISFP","ESTP","ESFP"] as const;

interface Props {
  motherBirthDate: string;
  fatherBirthDate: string;
  momMBTI: string;
  dadMBTI: string;
  target: PlannerTarget;
  error: string | null;
  onMotherBirthDateChange: (v: string) => void;
  onFatherBirthDateChange: (v: string) => void;
  onMomMBTIChange: (v: string) => void;
  onDadMBTIChange: (v: string) => void;
  onTargetChange: (v: PlannerTarget) => void;
  onPredict: () => void;
}

export function PlannerPredictForm({
  motherBirthDate, fatherBirthDate, momMBTI, dadMBTI, target, error,
  onMotherBirthDateChange, onFatherBirthDateChange, onMomMBTIChange, onDadMBTIChange,
  onTargetChange, onPredict,
}: Props) {
  return (
    <div className="w-full max-w-sm space-y-5">
      <div className="rounded-2xl border border-purple-100 bg-gradient-to-br from-purple-50 to-pink-50 px-5 py-4 text-sm text-purple-700 space-y-1">
        <p className="font-semibold">🎯 역방향 성별 플래너</p>
        <p className="text-xs leading-relaxed text-purple-600">
          원하는 성별을 정해두면, 17가지 전통 알고리즘을 역산하여
          <strong className="font-semibold"> 유리한 시기·방위·숫자·이모티콘·라이프스타일</strong>을 추천합니다.
          <br />
          <span className="text-purple-400">
            (재미로만 봐주세요 😊)
          </span>
        </p>
      </div>

      {/* 타겟 성별 */}
      <div className="rounded-2xl border border-gray-100 bg-white px-5 py-5 shadow-sm space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
          원하는 아이 성별
        </p>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => onTargetChange("Boy")}
            className={[
              "rounded-2xl px-4 py-5 text-center transition-all",
              target === "Boy"
                ? "bg-gradient-to-br from-blue-400 to-blue-500 text-white shadow-md ring-2 ring-blue-300"
                : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50",
            ].join(" ")}
          >
            <div className="text-4xl">👦</div>
            <div className="mt-1 text-sm font-bold">아들 원해요</div>
          </button>
          <button
            onClick={() => onTargetChange("Girl")}
            className={[
              "rounded-2xl px-4 py-5 text-center transition-all",
              target === "Girl"
                ? "bg-gradient-to-br from-pink-400 to-pink-500 text-white shadow-md ring-2 ring-pink-300"
                : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50",
            ].join(" ")}
          >
            <div className="text-4xl">👧</div>
            <div className="mt-1 text-sm font-bold">딸 원해요</div>
          </button>
        </div>
      </div>

      {/* 필수 */}
      <div className="rounded-2xl border border-gray-100 bg-white px-5 py-5 shadow-sm space-y-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
          필수 정보
        </p>
        <DateTextInput
          label="엄마 생년월일"
          hint="(양력)"
          value={motherBirthDate}
          onChange={onMotherBirthDateChange}
        />
      </div>

      {/* 선택 */}
      <div className="rounded-2xl border border-gray-100 bg-white px-5 py-5 shadow-sm space-y-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
          선택 정보 <span className="font-normal normal-case text-gray-300">(없어도 됩니다)</span>
        </p>
        <DateTextInput
          label="아빠 생년월일"
          hint="(양력, 선택)"
          value={fatherBirthDate}
          onChange={onFatherBirthDateChange}
        />

        <div className="space-y-1.5">
          <label className="block text-sm font-semibold text-gray-700">엄마 MBTI <span className="font-normal text-gray-400">(선택)</span></label>
          <div className="grid grid-cols-4 gap-1.5">
            {MBTI_TYPES.map((t) => (
              <button key={t} onClick={() => onMomMBTIChange(momMBTI === t ? "" : t)}
                className={["rounded-lg py-1.5 text-xs font-bold transition-colors", momMBTI === t ? "bg-pink-500 text-white shadow" : "border border-gray-200 bg-white text-gray-500 hover:bg-gray-50"].join(" ")}>
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-sm font-semibold text-gray-700">아빠 MBTI <span className="font-normal text-gray-400">(선택)</span></label>
          <div className="grid grid-cols-4 gap-1.5">
            {MBTI_TYPES.map((t) => (
              <button key={t} onClick={() => onDadMBTIChange(dadMBTI === t ? "" : t)}
                className={["rounded-lg py-1.5 text-xs font-bold transition-colors", dadMBTI === t ? "bg-blue-500 text-white shadow" : "border border-gray-200 bg-white text-gray-500 hover:bg-gray-50"].join(" ")}>
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {error && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-500">
          {error}
        </p>
      )}

      <button
        onClick={onPredict}
        className="w-full rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 py-4 text-lg font-bold text-white shadow-lg transition-transform active:scale-95 hover:opacity-90"
      >
        🎯 {target === "Boy" ? "아들" : "딸"} 맞춤 가이드 받기
      </button>
    </div>
  );
}
