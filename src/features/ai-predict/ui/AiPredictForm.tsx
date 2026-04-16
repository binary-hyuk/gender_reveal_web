import { DateTextInput } from "@/shared/ui/DateTextInput";
import { ConceptionDateRangeInput } from "@/shared/ui/ConceptionDateRangeInput";
import { BLOOD_TYPES } from "@/features/blood-type-predict/model/useBloodTypePredictor";
import type { BloodType } from "@/features/blood-type-predict/model/bloodTypeMatrix";
import { VIBE_INFO } from "@/features/cbr-predict/model/useCBRPredictor";
import type { FatherVibe } from "@/features/cbr-predict/model/useCBRPredictor";
import { AI_CATEGORIES } from "@/features/ai-predict/model/useAiPredictor";
import type { AiCategory } from "@/features/ai-predict/model/useAiPredictor";

const VIBES_AI: FatherVibe[] = ["PASSION", "CALM", "STABLE", "FLEXIBLE"];
const DIRECTIONS_AI = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"] as const;
const DIR_LABEL_AI: Record<string, string> = {
  N: "북 ❄️", NE: "북동 🌨️", E: "동 🌅", SE: "남동 ⛅",
  S: "남 ☀️", SW: "남서 🌤️", W: "서 🌇", NW: "북서 🌫️",
};
const MBTI_TYPES_AI = ["INTJ","INTP","ENTJ","ENTP","INFJ","INFP","ENFJ","ENFP","ISTJ","ISFJ","ESTJ","ESFJ","ISTP","ISFP","ESTP","ESFP"] as const;
const EMOJI_PRESETS_AI = ["🔥","💧","🌿","⚡","🌙","☀️","💎","🌊","🎯","🦋"];
const INTUITION_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

/**
 * 필수 정보만 입력해도 자동으로 실행되는 기본 알고리즘 목록.
 * 실제 실행 로직은 useAiPredictor.ts의 runAllMethods와 동기화되어야 함.
 */
const BASE_ALGORITHMS = [
  { emoji: "🏮",  label: "중국 황실달력" },
  { emoji: "🗿",  label: "마야식" },
  { emoji: "☯️", label: "주역 49법" },
  { emoji: "🩸",  label: "혈액 갱신법" },
  { emoji: "🌙",  label: "달 별자리" },
  { emoji: "✖️", label: "Gr-ai 오행천문" },
  { emoji: "🎴",  label: "집시 생월법" },
  { emoji: "🌍",  label: "행성 요일" },
];

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
  selectedCategories: Set<AiCategory>;
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
  onToggleCategory: (cat: AiCategory) => void;
  onPredict: () => void;
}

function BloodTypeSelector({
  label, value, activeColor, onChange,
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
              value === bt ? `${activeColor} text-white shadow` : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50",
            ].join(" ")}
          >
            {bt}
          </button>
        ))}
      </div>
    </div>
  );
}

function SectionCard({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white px-5 py-5 shadow-sm space-y-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
        {title}
        {hint && <span className="ml-1 font-normal normal-case text-gray-300">{hint}</span>}
      </p>
      {children}
    </div>
  );
}

export function AiPredictForm({
  motherBirthDate, conceptionStart, conceptionEnd, fatherBirthDate,
  momBlood, dadBlood, momName, dadName,
  locationString, isNorthernHemisphere, lastPeriodDate, direction,
  houseDirection, floorNumber, momMBTI, dadMBTI, favEmoji, fatherVibe,
  intuition, selectedCategories, error,
  onMotherBirthDateChange, onConceptionStartChange, onConceptionEndChange, onFatherBirthDateChange,
  onMomBloodChange, onDadBloodChange, onMomNameChange, onDadNameChange,
  onLocationStringChange, onIsNorthernHemisphereChange, onLastPeriodDateChange, onDirectionChange,
  onHouseDirectionChange, onFloorNumberChange, onMomMBTIChange, onDadMBTIChange, onFavEmojiChange, onFatherVibeChange,
  onIntuitionChange, onToggleCategory, onPredict,
}: Props) {
  const showNames = selectedCategories.has("names");
  const showHome = selectedCategories.has("home");

  return (
    <div className="w-full max-w-sm space-y-5">
      {/* 필수: 날짜 정보 */}
      <SectionCard title="필수 정보">
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

        <div className="rounded-xl border border-purple-100 bg-gradient-to-br from-purple-50 to-pink-50 px-3 py-3 space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-purple-700">
            🤖 자동으로 실행되는 예측 {BASE_ALGORITHMS.length}종
          </p>
          <div className="grid grid-cols-2 gap-x-2 gap-y-1">
            {BASE_ALGORITHMS.map((a) => (
              <div key={a.label} className="flex items-center gap-1.5 text-xs text-gray-700">
                <span className="text-sm leading-none">{a.emoji}</span>
                <span className="truncate">{a.label}</span>
              </div>
            ))}
          </div>
        </div>
      </SectionCard>

      {/* 카테고리 선택 안내 + 타일 */}
      <SectionCard title="관심있는 예측법 추가" hint="(선택 · 다중 가능)">
        <p className="text-xs leading-relaxed text-gray-500">
          기본 예측 외에 관심있는 항목을 선택하면 추가 입력이 나타나고,
          해당 알고리즘이 예측에 포함됩니다.
        </p>
        <div className="grid grid-cols-4 gap-2">
          {AI_CATEGORIES.map((cat) => {
            const active = selectedCategories.has(cat.key);
            return (
              <button
                key={cat.key}
                onClick={() => onToggleCategory(cat.key)}
                className={[
                  "rounded-xl border p-2 text-center transition-colors",
                  active
                    ? "border-purple-500 bg-purple-50 shadow ring-2 ring-purple-200"
                    : "border-gray-200 bg-white hover:bg-gray-50",
                ].join(" ")}
              >
                <div className="text-2xl">{cat.emoji}</div>
                <div className={[
                  "mt-1 text-xs font-semibold",
                  active ? "text-purple-700" : "text-gray-600",
                ].join(" ")}>
                  {cat.label}
                </div>
                <div className="text-[10px] text-gray-400 leading-tight">{cat.hint}</div>
              </button>
            );
          })}
        </div>
      </SectionCard>

      {/* 혈액형 */}
      {selectedCategories.has("bloodType") && (
        <SectionCard title="🩸 혈액형">
          <BloodTypeSelector label="아빠 혈액형" value={dadBlood} activeColor="bg-blue-500" onChange={onDadBloodChange} />
          <BloodTypeSelector label="엄마 혈액형" value={momBlood} activeColor="bg-pink-500" onChange={onMomBloodChange} />
        </SectionCard>
      )}

      {/* 이름 (수비학 / 이집트 공용) */}
      {showNames && (
        <SectionCard title="✍️ 이름" hint="(수비학 · 이집트)">
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-gray-700">엄마 이름</label>
            <input
              type="text" value={momName} onChange={(e) => onMomNameChange(e.target.value)} placeholder="예: 김민지"
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-800 shadow-sm outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-gray-700">아빠 이름</label>
            <input
              type="text" value={dadName} onChange={(e) => onDadNameChange(e.target.value)} placeholder="예: 이준호"
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-800 shadow-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </SectionCard>
      )}

      {/* 거주지 (풍수지리 / 이집트 공용) */}
      {showHome && (
        <SectionCard title="🏠 거주지" hint="(풍수지리 · 이집트)">
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-gray-700">
              거주 지역 <span className="font-normal text-gray-400">(시·구까지만)</span>
            </label>
            <input
              type="text" value={locationString} onChange={(e) => onLocationStringChange(e.target.value)} placeholder="예: 서울시 종로구"
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-800 shadow-sm outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-gray-700">집 방향</label>
              <input
                type="text" value={houseDirection} onChange={(e) => onHouseDirectionChange(e.target.value)} placeholder="예: 남동향"
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-gray-800 shadow-sm outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-gray-700">층수</label>
              <input
                type="number" min={1} value={floorNumber} onChange={(e) => onFloorNumberChange(e.target.value)} placeholder="예: 15"
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-gray-800 shadow-sm outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100"
              />
            </div>
          </div>
        </SectionCard>
      )}

      {/* 아유르베다 */}
      {selectedCategories.has("ayurveda") && (
        <SectionCard title="🪷 아유르베다" hint="(생리일 + 방위)">
          <DateTextInput label="마지막 생리 시작일" hint="(양력)" value={lastPeriodDate} onChange={onLastPeriodDateChange} />
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-gray-700">집 주요 방위 <span className="font-normal text-gray-400">(8방위)</span></label>
            <div className="grid grid-cols-4 gap-2">
              {DIRECTIONS_AI.map((d) => (
                <button key={d} onClick={() => onDirectionChange(d)}
                  className={["rounded-xl py-2.5 text-xs font-bold transition-colors", direction === d ? "bg-orange-500 text-white shadow" : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"].join(" ")}>
                  {DIR_LABEL_AI[d]}
                </button>
              ))}
            </div>
          </div>
        </SectionCard>
      )}

      {/* 히포크라테스 */}
      {selectedCategories.has("hippocrates") && (
        <SectionCard title="🌬️ 히포크라테스" hint="(거주 반구)">
          <div className="grid grid-cols-2 gap-2">
            {[{ v: true, l: "🌏 북반구" }, { v: false, l: "🌎 남반구" }].map(({ v, l }) => (
              <button key={String(v)} onClick={() => onIsNorthernHemisphereChange(v)}
                className={["rounded-xl py-2.5 text-sm font-medium transition-colors", isNorthernHemisphere === v ? "bg-sky-500 text-white shadow" : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"].join(" ")}>
                {l}
              </button>
            ))}
          </div>
        </SectionCard>
      )}

      {/* 디지털 DNA */}
      {selectedCategories.has("dna") && (
        <SectionCard title="🧬 디지털 DNA" hint="(MBTI + 이모티콘)">
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
            <div className="grid grid-cols-5 gap-2">
              {EMOJI_PRESETS_AI.map((e) => (
                <button key={e} onClick={() => onFavEmojiChange(e)}
                  className={["aspect-square rounded-xl text-3xl flex items-center justify-center transition-colors", favEmoji === e ? "bg-purple-500 shadow ring-2 ring-purple-300" : "border border-gray-200 bg-white hover:bg-gray-50"].join(" ")}>
                  {e}
                </button>
              ))}
            </div>
            <input type="text" value={favEmoji} onChange={(e) => onFavEmojiChange(e.target.value)} placeholder="직접 입력"
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-gray-800 shadow-sm outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100" />
          </div>
        </SectionCard>
      )}

      {/* Ge-ai (CBR) */}
      {selectedCategories.has("cbr") && (
        <SectionCard title="✨ Ge-ai · CBR-Engine" hint="(아빠 기운)">
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
        </SectionCard>
      )}

      {/* Cl-ai (삼원공명) */}
      {selectedCategories.has("samwon") && (
        <SectionCard title="✳️ Cl-ai · 삼원공명" hint="(직감수)">
          <p className="text-xs text-gray-400">마음속에 떠오르는 숫자를 골라주세요</p>
          <div className="grid grid-cols-9 gap-1.5">
            {INTUITION_NUMBERS.map((n) => (
              <button
                key={n}
                onClick={() => onIntuitionChange(n)}
                className={[
                  "rounded-xl py-2.5 text-sm font-bold transition-colors",
                  intuition === n ? "bg-indigo-500 text-white shadow" : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50",
                ].join(" ")}
              >
                {n}
              </button>
            ))}
          </div>
        </SectionCard>
      )}

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
