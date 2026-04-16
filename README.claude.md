# Claude Code 작업 가이드

이 문서는 Claude Code가 이 프로젝트를 이어받아 작업할 때 필요한 모든 컨텍스트를 담습니다.

---

## 프로젝트 개요

네이티브 앱 웹뷰에 서빙하는 태아 성별 예측 웹앱.  
Next.js SSG(`output: "export"`) → 서버 없이 정적 파일만 빌드.  
FSD 아키텍처 + TypeScript + Tailwind CSS.

---

## 절대 규칙

1. **서버 로직 금지** — `getServerSideProps`, API Routes, Server Actions 사용 불가. SSG(`output: "export"`)만.
2. **FSD 레이어 규칙**
   - `model/` → 비즈니스 로직만 (hook + 순수함수). JSX 없음.
   - `ui/` → View만. props로만 데이터 받음. 직접 hook 호출 금지.
   - `pages/` → hook 호출 후 Form/Result에 props 연결만.
   - `ai-predict`는 예외적으로 모든 feature의 순수함수를 cross-import함 (집계 역할).
3. **날짜 입력** → `DateTextInput` 컴포넌트 사용 (YYYYMMDD 텍스트 → ISO string 변환).
4. **npm 명령은 사용자가 직접** 실행 — Claude는 파일만 작성.

---

## 핵심 공유 유틸

### `src/shared/lib/lunarConverter.ts`
```ts
solarToLunar(date: Date): { year, month, day }   // 양력→음력
getChineseAge(motherBirthDate, conceptionDate): number  // 음력 연나이
```
- 내부적으로 `korean-lunar-calendar` 패키지 사용
- API: `cal.getLunarCalendar(year, month, day)` ← 반드시 이 메서드 사용 (`getLunarYear()` 없음)

### `src/shared/lib/ageUtils.ts`
```ts
getAgeAtDate(birthDate: Date, targetDate: Date): number  // 만 나이
```

### `src/shared/lib/moonSign.ts`
```ts
getMoonSign(date: Date): ZodiacSign  // Meeus 알고리즘 기반 달 별자리
```

### `src/shared/ui/DateTextInput.tsx`
```tsx
<DateTextInput
  label="엄마 생년월일"
  hint="(양력)"            // optional
  value={isoString}        // ISO date string ("2024-01-15") or ""
  onChange={(iso) => ...}  // 유효 날짜만 콜백
/>
```
- YYYYMMDD 입력 → 내부에서 ISO string으로 변환
- 유효하면 초록 테두리 + "✓ 2024년 1월 15일", 무효면 빨간 테두리

### `src/shared/ui/GenderResultCard.tsx`
```tsx
<GenderResultCard
  gender={"Boy" | "Girl"}
  details={[{ label: string, value: string }]}
/>
```

### `src/shared/ui/PageLayout.tsx`
```tsx
<PageLayout title="페이지 제목" description="부제목">
  {children}
</PageLayout>
```
NavBar 포함, 공통 레이아웃 wrapping.

---

## 새 예측 방법 추가 절차

### 1. feature 디렉토리 생성
```bash
mkdir -p src/features/{slug}-predict/model src/features/{slug}-predict/ui
```

### 2. model 파일 작성
`src/features/{slug}-predict/model/use{Name}Predictor.ts`

```ts
// 순수 함수 (테스트·재사용 가능)
export function predictBy{Name}(inputs...): {Name}Result { ... }

// 상태 인터페이스
export interface {Name}State { ... }
export interface {Name}Actions { ... }

// Hook (State + Actions 합산 반환)
export function use{Name}Predictor(): {Name}State & {Name}Actions { ... }
```

### 3. ui 파일 작성
- `{Name}PredictForm.tsx` — props만 받아서 렌더링, 내부 상태 없음
- `{Name}PredictResult.tsx` — `GenderResultCard` 사용, details 배열 구성

### 4. barrel export
`src/features/{slug}-predict/index.ts`
```ts
export * from "./model/use{Name}Predictor";
export * from "./ui/{Name}PredictForm";
export * from "./ui/{Name}PredictResult";
```

### 5. 페이지 생성
`src/pages/{slug}.tsx`
```tsx
import { PageLayout } from "@/shared/ui/PageLayout";
import { use{Name}Predictor, {Name}PredictForm, {Name}PredictResult } from "@/features/{slug}-predict";

export default function {Name}Page() {
  const { ...state, ...actions } = use{Name}Predictor();
  return (
    <PageLayout title="..." description="...">
      {result ? <{Name}PredictResult result={result} onReset={reset} /> : <{Name}PredictForm ... />}
    </PageLayout>
  );
}
```

### 6. NavBar 추가
`src/shared/ui/NavBar.tsx` → `NAV_ITEMS` 배열에 항목 추가

### 7. AI 통합 (선택)
`src/features/ai-predict/model/useAiPredictor.ts`
- import 추가
- `METHOD_SCORES`에 가중치 추가
- `runAllMethods()` 파라미터에 새 입력 추가 (필요 시)
- 함수 본문에 `addMethod()` 블록 추가

`src/features/ai-predict/ui/AiPredictForm.tsx`
- 새 입력 필드 Props 추가
- 새 섹션 UI 추가

`src/pages/index.tsx`
- hook 구조분해에 새 state/action 추가
- AiPredictForm에 새 props 전달

---

## AI 통합 가중치 현황

| key | name | score |
|---|---|---|
| chinese | 중국 황실 달력 | 100 |
| mayan | 마야식 | 90 |
| ancient49 | 주역 49법 | 80 |
| cbr | CBR-Engine | 70 |
| bloodRenewal | 혈액 갱신법 | 60 |
| lunarZodiac | 달 별자리 | 50 |
| ohang | 오행천문융합 | 45 |
| bloodType | 혈액형 조합 | 40 |
| numerology | 수비학 | 35 |
| gypsy | 집시 생월법 | 30 |
| planetaryWeekday | 행성 요일 | 25 |
| ayurveda | 아유르베다 | 22 |
| egyptWheat | 이집트 밀보리 | 20 |
| hippocratesWind | 히포크라테스 | 18 |
| kfengshui | K-풍수지리 | 15 |
| digitalDna | 디지털 DNA | 10 |

> 가중치는 `METHOD_SCORES` 상수에서만 관리. **유저에게 노출 금지.**

---

## AI 페이지 필수/선택 입력 정리

| 입력 | state key | 필수 여부 | 사용하는 방법 |
|---|---|---|---|
| 엄마 생년월일 | `motherBirthDate` | ✅ 필수 | 중국/마야/주역/혈갱/달별자리/집시/오행/CBR |
| 아빠 생년월일 | `fatherBirthDate` | ✅ 필수 | 마야/주역/혈갱/오행 |
| 임신(수정)일 | `conceptionDate` | ✅ 필수 | 전체 |
| 엄마 혈액형 | `momBlood` | ✅ (기본 A) | 혈액형 |
| 아빠 혈액형 | `dadBlood` | ✅ (기본 A) | 혈액형 |
| 아빠 기운(Vibe) | `fatherVibe` | ✅ (기본 STABLE) | CBR-Engine |
| 엄마 이름 | `momName` | 선택 | 수비학, 이집트 |
| 아빠 이름 | `dadName` | 선택 | 수비학 |
| 거주 지역/주소 | `locationString` | 선택 | 이집트, 풍수지리 |
| 반구 선택 | `isNorthernHemisphere` | 선택 (기본 true) | 히포크라테스 |
| 마지막 생리일 | `lastPeriodDate` | 선택 | 아유르베다 |
| 방위 | `direction` | 선택 (기본 East) | 아유르베다 |
| 집 방향 | `houseDirection` | 선택 | 풍수지리 |
| 층수 | `floorNumber` | 선택 | 풍수지리 |
| 엄마 MBTI | `momMBTI` | 선택 | 디지털 DNA |
| 아빠 MBTI | `dadMBTI` | 선택 | 디지털 DNA |
| 최애 이모티콘 | `favEmoji` | 선택 | 디지털 DNA |

---

## 빌드 & 배포

```bash
# 빌드 캐시 초기화 후 빌드
rm -rf .next && npm run build

# 결과물
out/   ← 이 폴더를 웹뷰에 서빙
```

빌드 성공 시 모든 페이지가 `○ (Static)` 으로 표시되어야 함.

---

## 주요 패키지

| 패키지 | 용도 |
|---|---|
| `korean-lunar-calendar` | 양력→음력 변환 |
| `next` | 프레임워크 |
| `tailwindcss` | 스타일 |

---

## 커밋 규칙

Conventional Commits + 한글:
```
feat(cbr): CBR-Engine 성별 예측 추가
fix(lunar): 음력 변환 API 메서드 오류 수정
```
