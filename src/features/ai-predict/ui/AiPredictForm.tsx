import { DateTextInput } from "@/shared/ui/DateTextInput";
import { ConceptionDateRangeInput } from "@/shared/ui/ConceptionDateRangeInput";
import { BLOOD_TYPES } from "@/features/blood-type-predict/model/useBloodTypePredictor";
import type { BloodType } from "@/features/blood-type-predict/model/bloodTypeMatrix";

import { VIBE_INFO } from "@/features/cbr-predict/model/useCBRPredictor";
import type { FatherVibe } from "@/features/cbr-predict/model/useCBRPredictor";

const VIBES_AI: FatherVibe[] = ["PASSION", "CALM", "STABLE", "FLEXIBLE"];
const DIRECTIONS_AI = ["East", "West", "South", "North"] as const;
const DIR_LABEL_AI: Record<string, string> = { East: "동 🌅", West: "서 🌇", South: "남 ☀️", North: "북 ❄️" };
const MBTI_TYPES_AI = ["INTJ","INTP","ENTJ","ENTP","INFJ","INFP","ENFJ","ENFP","ISTJ","ISFJ","ESTJ","ESFJ","ISTP","ISFP","ESTP","ESFP"] as const;
const EMOJI_PRESETS_AI = ["🔥","💧","🌿","⚡","🌙","☀️","💎","🌊","🎯","🦋"];

interface Props {
  motherBirthDate: string;
  conceptionStart: string;
  conceptionEnd: string;
  fatherBirthDate: string;
  momBlood: BloodType;
  dadBlood: BloodType;
  momName: string;
  dadName: string;
  locationString: string;
  isNorthernHemisphere: boolean;
  lastPeriodDate: string;
  direction: string;
  houseDirection: string;
  floorNumber: string;
  momMBTI: string;
  dadMBTI: string;
  favEmoji: string;
  fatherVibe: FatherVibe;
  intuition: number;
  error: string | null;
  onMotherBirthDateChange: (v: string) => void;
  onConceptionStartChange: (v: string) => void;
  onConceptionEndChange: (v: string) => void;
  onFatherBirthDateChange: (v: string) => void;
  onMomBloodChange: (v: BloodType) => void;
  onDadBloodChange: (v: BloodType) => void;
  onMomNameChange: (v: string) => void;
  onDadNameChange: (v: string) => void;
  onLocationStringChange: (v: string) => void;
  onIsNorthernHemisphereChange: (v: boolean) => void;
  onLastPeriodDateChange: (v: string) => void;
  onDirectionChange: (v: string) => void;
  onHouseDirectionChange: (v: string) => void;
  onFloorNumberChange: (v: string) => void;
  onMomMBTIChange: (v: string) => void;
  onDadMBTIChange: (v: string) => void;
  onFavEmojiChange: (v: string) => void;
  onFatherVibeChange: (v: FatherVibe) => void;
  onIntuitionChange: (v: number) => void;
  onPredict: () => void;
}

function BloodTypeSelector({
  label,
  value,
  activeColor,
  onChange,
}: {
  label: string;
  value: BloodType;
  activeColor: string;
  onChange: (v: BloodType) => void;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-semibold text-gray-700">{label}</label>
      <div className="grid grid-cols-4 gap-2">
        {BLOOD_TYPES.map((bt) => (
          <button
            key={bt}
            onClick={() => onChange(bt)}
            className={[
              "rounded-xl py-2.5 text-sm font-bold transition-colors",
              value === bt
                ? `${activeColor} text-white shadow`
                : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50",
            ].join(" ")}
          >
            {bt}
          </button>
        ))}
      </div>
    </div>
  );
}

export function AiPredictForm({
  motherBirthDate, conceptionStart, conceptionEnd, fatherBirthDate,
  momBlood, dadBlood, momName, dadName,
  locationString, isNorthernHemisphere, lastPeriodDate, direction,
  houseDirection, floorNumber, momMBTI, dadMBTI, favEmoji, fatherVibe,
  intuition, error,
  onMotherBirthDateChange, onConceptionStartChange, onConceptionEndChange, onFatherBirthDateChange,
  onMomBloodChange, onDadBloodChange, onMomNameChange, onDadNameChange,
  onLocationStringChange, onIsNorthernHemisphereChange, onLastPeriodDateChange, onDirectionChange,
  onHouseDirectionChange, onFloorNumberChange, onMomMBTIChange, onDadMBTIChange, onFavEmojiChange, onFatherVibeChange,
  onIntuitionChange, onPredict,
}: Props) {
  return (
    <div className="w-full max-w-sm space-y-5">
      {/* 날짜 입력 섹션 */}
      <div className="rounded-2xl border border-gray-100 bg-white px-5 py-5 shadow-sm space-y-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
          날짜 정보
        </p>
        <DateTextInput
          label="엄마 생년월일"
          hint="(양력)"
          value={motherBirthDate}
          onChange={onMotherBirthDateChange}
        />
        <DateTextInput
          label="아빠 생년월일"
          hint="(양력)"
          value={fatherBirthDate}
          onChange={onFatherBirthDateChange}
        />
        <ConceptionDateRangeInput
          label="임신(수정)일"
          startValue={conceptionStart}
          endValue={conceptionEnd}
          onStartChange={onConceptionStartChange}
          onEndChange={onConceptionEndChange}
        />
      </div>

      {/* 이름 섹션 (수비학용, 선택) */}
      <div className="rounded-2xl border border-gray-100 bg-white px-5 py-5 shadow-sm space-y-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
          이름 정보{" "}
          <span className="text-xs font-normal normal-case text-gray-300">(수비학 예측용 · 선택)</span>
        </p>
        <div className="space-y-1.5">
          <label className="block text-sm font-semibold text-gray-700">엄마 이름</label>
          <input
            type="text"
            value={momName}
            onChange={(e) => onMomNameChange(e.target.value)}
            placeholder="예: 김민지"
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-800 shadow-sm outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
          />
        </div>
        <div className="space-y-1.5">
          <label className="block text-sm font-semibold text-gray-700">아빠 이름</label>
          <input
            type="text"
            value={dadName}
            onChange={(e) => onDadNameChange(e.target.value)}
            placeholder="예: 이준호"
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-800 shadow-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

      {/* 혈액형 섹션 */}
      <div className="rounded-2xl border border-gray-100 bg-white px-5 py-5 shadow-sm space-y-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
          혈액형
        </p>
        <BloodTypeSelector
          label="아빠 혈액형"
          value={dadBlood}
          activeColor="bg-blue-500"
          onChange={onDadBloodChange}
        />
        <BloodTypeSelector
          label="엄마 혈액형"
          value={momBlood}
          activeColor="bg-pink-500"
          onChange={onMomBloodChange}
        />
      </div>

      {/* 아유르베다 섹션 (선택) */}
      <div className="rounded-2xl border border-gray-100 bg-white px-5 py-5 shadow-sm space-y-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
          🪷 아유르베다 <span className="font-normal normal-case text-gray-300">(선택)</span>
        </p>
        <DateTextInput label="마지막 생리 시작일" hint="(양력)" value={lastPeriodDate} onChange={onLastPeriodDateChange} />
        <div className="space-y-1.5">
          <label className="block text-sm font-semibold text-gray-700">집 주요 방위</label>
          <div className="grid grid-cols-4 gap-2">
            {DIRECTIONS_AI.map((d) => (
              <button key={d} onClick={() => onDirectionChange(d)}
                className={["rounded-xl py-2.5 text-xs font-bold transition-colors", direction === d ? "bg-orange-500 text-white shadow" : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"].join(" ")}>
                {DIR_LABEL_AI[d]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 이집트·풍수지리 섹션 (선택) */}
      <div className="rounded-2xl border border-gray-100 bg-white px-5 py-5 shadow-sm space-y-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
          🌾 이집트·🏠 풍수지리 <span className="font-normal normal-case text-gray-300">(선택)</span>
        </p>
        <div className="space-y-1.5">
          <label className="block text-sm font-semibold text-gray-700">거주 지역 / 주소</label>
          <input type="text" value={locationString} onChange={(e) => onLocationStringChange(e.target.value)} placeholder="예: 경기도 김포시 마산동"
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-800 shadow-sm outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-gray-700">집 방향</label>
            <input type="text" value={houseDirection} onChange={(e) => onHouseDirectionChange(e.target.value)} placeholder="예: 남동향"
              className="w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-gray-800 shadow-sm outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100" />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-gray-700">층수</label>
            <input type="number" min={1} value={floorNumber} onChange={(e) => onFloorNumberChange(e.target.value)} placeholder="예: 15"
              className="w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-gray-800 shadow-sm outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100" />
          </div>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">거주 반구 <span className="font-normal text-gray-400">(히포크라테스)</span></label>
          <div className="grid grid-cols-2 gap-2">
            {[{ v: true, l: "🌏 북반구" }, { v: false, l: "🌎 남반구" }].map(({ v, l }) => (
              <button key={String(v)} onClick={() => onIsNorthernHemisphereChange(v)}
                className={["rounded-xl py-2.5 text-sm font-medium transition-colors", isNorthernHemisphere === v ? "bg-sky-500 text-white shadow" : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"].join(" ")}>
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 디지털 DNA 섹션 (선택) */}
      <div className="rounded-2xl border border-gray-100 bg-white px-5 py-5 shadow-sm space-y-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
          🧬 디지털 DNA <span className="font-normal normal-case text-gray-300">(선택)</span>
        </p>
        <div className="space-y-1.5">
          <label className="block text-sm font-semibold text-gray-700">엄마 MBTI</label>
          <div className="grid grid-cols-4 gap-1.5">
            {MBTI_TYPES_AI.map((t) => (
              <button key={t} onClick={() => onMomMBTIChange(t)}
                className={["rounded-lg py-1.5 text-xs font-bold transition-colors", momMBTI === t ? "bg-pink-500 text-white shadow" : "border border-gray-200 bg-white text-gray-500 hover:bg-gray-50"].join(" ")}>
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="block text-sm font-semibold text-gray-700">아빠 MBTI</label>
          <div className="grid grid-cols-4 gap-1.5">
            {MBTI_TYPES_AI.map((t) => (
              <button key={t} onClick={() => onDadMBTIChange(t)}
                className={["rounded-lg py-1.5 text-xs font-bold transition-colors", dadMBTI === t ? "bg-blue-500 text-white shadow" : "border border-gray-200 bg-white text-gray-500 hover:bg-gray-50"].join(" ")}>
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">최애 이모티콘</label>
          <div className="flex flex-wrap gap-2">
            {EMOJI_PRESETS_AI.map((e) => (
              <button key={e} onClick={() => onFavEmojiChange(e)}
                className={["rounded-xl px-2.5 py-1.5 text-lg transition-colors", favEmoji === e ? "bg-purple-500 shadow ring-2 ring-purple-300" : "border border-gray-200 bg-white hover:bg-gray-50"].join(" ")}>
                {e}
              </button>
            ))}
          </div>
          <input type="text" value={favEmoji} onChange={(e) => onFavEmojiChange(e.target.value)} placeholder="직접 입력"
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-gray-800 shadow-sm outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100" />
        </div>
      </div>

      {/* CBR-Engine (Ge-ai) 섹션 */}
      <div className="rounded-2xl border border-gray-100 bg-white px-5 py-5 shadow-sm space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
          ✨ Ge-ai · CBR-Engine <span className="font-normal normal-case text-gray-300">(아빠 기운 선택)</span>
        </p>
        <div className="grid grid-cols-2 gap-2">
          {VIBES_AI.map((v) => {
            const info = VIBE_INFO[v];
            return (
              <button
                key={v}
                onClick={() => onFatherVibeChange(v)}
                className={[
                  "rounded-xl px-3 py-2.5 text-sm font-medium transition-colors text-left",
                  fatherVibe === v ? "bg-indigo-600 text-white shadow" : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50",
                ].join(" ")}
              >
                {info.emoji} {info.label}
                <span className={`block text-xs ${fatherVibe === v ? "text-indigo-200" : "text-gray-400"}`}>{info.element}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 삼원공명 (Cl-ai) 섹션 */}
      <div className="rounded-2xl border border-gray-100 bg-white px-5 py-5 shadow-sm space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
          ✳️ Cl-ai · 삼원공명 <span className="font-normal normal-case text-gray-300">(직감수 선택)</span>
        </p>
        <p className="text-xs text-gray-400">마음속에 떠오르는 숫자를 골라주세요</p>
        <div className="grid grid-cols-9 gap-1.5">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
            <button
              key={n}
              onClick={() => onIntuitionChange(n)}
              className={[
                "rounded-xl py-2.5 text-sm font-bold transition-colors",
                intuition === n
                  ? "bg-indigo-500 text-white shadow"
                  : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50",
              ].join(" ")}
            >
              {n}
            </button>
          ))}
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
        🤖 AI 성별 예측 시작
      </button>
    </div>
  );
}
