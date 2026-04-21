# 시안 → 프로덕션 적용 가이드 (Next Session Brief)

> 이 문서는 **`/playground` 의 12개 시안 중 하나를 골라 프로덕션 전체에 적용**해야 할 때 후속 세션(Opus 4.6 등)이 바로 작업을 이어갈 수 있도록 작성된 실행 지침입니다. 읽는 사람은 이 코드베이스를 처음 본다고 가정합니다.

---

## 0. 이 프로젝트 한눈에

- **스택**: Next.js 16 (Pages Router) + TypeScript + Tailwind CSS + SSG (`output: "export"`). 정적 HTML 로 빌드되어 네이티브 웹뷰에 서빙됩니다.
- **FSD 구조**:
  - `src/features/*-predict/` 각 예측 알고리즘 slice (model / ui)
  - `src/shared/` 공용 유틸·컴포넌트
  - `src/pages/` Next.js 라우팅
  - `src/styles/globals.css` + `src/styles/themeTokens.ts` 글로벌 테마
- **현재 프로덕션 디자인**: 파스텔 블루 glassmorphism + Pretendard + `GlassCard` 위주.
- **주요 프로덕션 라우트**:
  - `/` 홈 (진입 선택 화면)
  - `/ai` AI 통합 예측 (Progressive Disclosure)
  - `/planner` 역방향 플래너
  - `/chinese`, `/mayan`, ... 개별 알고리즘 17개

## 1. 플레이그라운드 구조 (있는 그대로 이해)

```
src/features/home-playground/
├── index.ts                 # VARIANTS 메타 + VARIANT_MAP + VariantTheme 타입
├── ui/
│   ├── VariantViewer.tsx    # /playground/vN 풀스크린 프레임 + 액션바
│   ├── VariantAiPage.tsx    # /playground/vN/ai — 테마+useAiPredictor 재사용
│   ├── VariantPlannerPage.tsx # /playground/vN/planner
│   └── VariantSpinner.tsx   # 시안별 감성 로딩 스피너
└── variants/
    ├── v1-asis.tsx          # 12개 variant. 모두 @ts-nocheck inline-style.
    ├── v2-deepglass.tsx
    ...
    └── v12-dreamscape.tsx

src/pages/playground/
├── index.tsx                # 12개 시안 비교 그리드
├── v1.tsx ... v12.tsx       # 풀스크린 뷰어
└── v1/ai.tsx, v1/planner.tsx, ... # 24개 시안 기능 페이지
```

- **각 variant 는 inline-style 로만 구성**되어 있어 Tailwind 클래스와 섞여 있지 않습니다. 포팅할 때 **CSS 토큰으로 추출**해야 합니다.
- `VARIANTS[i].theme` 에 각 시안의 핵심 디자인 토큰(`bg / text / textMuted / accent / accentOn / cardBg / cardBorder / font / fontSerif / fontMono / dark`)이 이미 정리되어 있습니다. **이게 포팅의 출발점**입니다.
- `VariantAiPage` / `VariantPlannerPage` 는 실제 `useAiPredictor` / `usePlannerPredictor` 훅을 **그대로 재사용**하는 패턴이니 프로덕션 포팅 시에도 같은 훅을 쓰면 됩니다.

---

## 2. 사용자에게 먼저 확인할 것

**작업을 시작하기 전에 반드시 사용자에게 물어보세요:**

1. **어떤 variant 를 채택하는지?** (예: `v9` · Claude-like)
2. **Playground 라우트(`/playground/*`) 유지할지 제거할지?**
   - 유지: 나중에 다른 시안도 비교·참조 가능
   - 제거: 번들 줄어듦, 단순화
3. **기존 glassmorphism 디자인 시스템(themeTokens.ts, GlassCard 등)과 공존할지, 완전히 대체할지?**
   - 공존: `themeTokens.ts` 에 variant 테마를 **덮어쓰기**
   - 대체: `GlassCard` 내부 구현도 variant 스타일로 바꾸기
4. **NavBar / PageLayout 등 공용 컴포넌트도 재디자인할지?** (대부분 Yes 가 자연스럽습니다)

사용자 답변에 따라 **Phase 3, 4 범위**가 크게 달라집니다.

---

## 3. 포팅 전략 — 3가지 접근

| 접근 | 작업량 | 결과 | 추천 상황 |
|---|---|---|---|
| **A. Theme Token Override** | 작음 (~2시간) | 홈/AI/플래너 배경·악센트만 variant 스타일. 카드·버튼은 기존 GlassCard 유지. | 시안 테마 색감만 원하는 경우 |
| **B. Variant Clone** | 중간 (~반나절) | 홈/AI/플래너 페이지를 variant의 inline-style 그대로 복붙 + 공용 컴포넌트는 기존 유지. | 시각적으로 100% 시안과 동일해야 할 때 |
| **C. Full Redesign** | 큼 (하루+) | `themeTokens.ts`, `GlassCard`, `NavBar`, 모든 predictor Form/Result UI 를 variant 언어로 재작성. | 시안을 제품 디자인 시스템 자체로 승격 |

**가장 흔한 선택은 B** — 사용자의 "이거 좋다"를 빠르게 맞춰주고, 필요하면 나중에 C 로 확장.

---

## 4. Phase 1 · 공통 사전 작업 (모든 접근에 필요)

### 4.1 선택한 variant 파악

```bash
# 선택된 slug 가 v9 라고 가정
# 참조 파일
src/features/home-playground/variants/v9-claude.tsx
src/features/home-playground/index.ts            # VARIANTS 배열 v9 항목의 theme 토큰
src/features/home-playground/ui/VariantAiPage.tsx   # 테마 주입 패턴 참고
src/features/home-playground/ui/VariantPlannerPage.tsx
src/features/home-playground/ui/VariantSpinner.tsx  # v9 용 스피너 (없으면 DefaultSpinner)
```

- variant 파일 상단의 **`const bg / nav / card / iconBox` 등 inline-style 객체**를 CSS 변수 또는 Tailwind 설정으로 변환할지 결정합니다.
- `index.ts` 의 `VariantTheme` 인터페이스는 그대로 프로덕션 테마 토큰 구조로 재사용할 수 있습니다.

### 4.2 작업 브랜치

```bash
git checkout main
git pull  # main 이 최신인지 확인
git checkout -b feat/promote-vN  # 예: feat/promote-v9
```

**main 에 직접 푸시하지 마세요.** 프로젝트 메모리(`/Users/kevin/.claude/projects/-Users-kevin-IdeaProjects-gender-reveal-web/memory/feedback_git_push.md`) 에 binary-hyuk 레포 push 방법이 저장되어 있습니다:

```bash
TOKEN=$(gh auth token -h github.com) && \
  git push "https://binary-hyuk:${TOKEN}@github.com/binary-hyuk/gender_reveal_web.git" \
    feat/promote-v9
```

일반 `git push origin main` 은 macOS Keychain 충돌로 실패합니다.

---

## 5. Phase 2 · 페이지별 포팅

### 5.1 홈 (`/`) → `src/pages/index.tsx`

**접근 A (Theme Override)**:
- `src/pages/index.tsx` 는 그대로 두고 `src/styles/globals.css` + `src/styles/themeTokens.ts` 값만 v9 테마로 교체 (Phase 3).

**접근 B (Variant Clone)** — 가장 흔한 방법:
1. `src/features/home-playground/variants/v9-claude.tsx` 의 `V9_Home` 컴포넌트를 **프로덕션 홈으로 이식**.
2. `pages/index.tsx` 를 아래와 같이 단순화:
   ```tsx
   import { V9_Home } from "@/features/home-playground/variants/v9-claude";
   import { NavBar } from "@/shared/ui/NavBar";
   export default function HomePage() {
     return <V9_Home />;   // 필요 시 <NavBar /> 도 위에 배치
   }
   ```
3. 단, `V9_Home` 내부 entry card href 가 `/playground/v9/ai`, `/playground/v9/planner` 로 되어있을 것. **`/ai`, `/planner` 로 되돌려야 합니다**.
   - `src/features/home-playground/variants/v9-claude.tsx` 를 새 경로 `src/features/home/V9Home.tsx` 로 복사한 뒤 href 만 수정하는 방식 추천 (원본 variant 는 playground 에 남겨둠).
4. `@ts-nocheck` 주석은 가능한 한 제거하고 타입을 맞추되, 시간이 급하면 유지.

### 5.2 AI 예측 (`/ai`) → `src/pages/ai.tsx` 또는 `src/pages/index.tsx` 확인

- 실제 AI 로직은 `src/features/ai-predict/model/useAiPredictor.ts` 에 있고, 폼은 `src/features/ai-predict/ui/AiPredictForm.tsx`, 결과는 `AiPredictResult.tsx` 입니다.
- **참고 구현**: `src/features/home-playground/ui/VariantAiPage.tsx` 가 이미 variant 테마로 AI 페이지를 렌더합니다. **이 파일이 사실상 프로덕션 AI 페이지의 초안**입니다.

**권장 작업**:
1. `VariantAiPage.tsx` 의 구조(헤더/Hero/폼/결과 카드/스피너)를 복사해서 **선택된 variant 전용 페이지**로 승격.
2. `theme` 을 `VARIANT_MAP[slug].theme` 에서 읽던 것을 직접 상수로 박거나, `themeTokens.ts` 로 이동.
3. **단점 보완**: `VariantAiPage` 는 간소화된 폼 (엄마/아빠/기간 4개 필드)만 씁니다. 프로덕션은 기존 `AiPredictForm` 의 풍부한 입력(혈액형·MBTI·직감수·카테고리 토글 등)을 유지해야 하므로:
   - 옵션 1: `AiPredictForm.tsx` 를 variant 테마로 재스킨 (추천)
   - 옵션 2: `VariantAiPage` 의 간소화된 폼을 그대로 써서 UX 단순화 (디자인 우선)
4. 결과 화면(`AiPredictResult.tsx`)도 동일한 스타일로 재스킨.

### 5.3 플래너 (`/planner`) → `src/pages/planner.tsx`

- 동일하게 `src/features/home-playground/ui/VariantPlannerPage.tsx` 를 참조.
- 인위적 로딩 딜레이(2.2~2.8s) 로직이 이미 들어있으니 **프로덕션에도 유지하는 것을 추천**합니다 (UX 일관성).
- 결과 카드(Top5 시기/행운 숫자/이모티콘/라이프스타일) 레이아웃을 그대로 가져오면 됩니다.

### 5.4 개별 알고리즘 페이지 17종 (`/chinese`, `/mayan`, ...)

- 선택한 variant 감성이 홈/AI/플래너만큼 17개 페이지에도 필요한지 사용자와 확인.
- 필요하다면 각 페이지의 `*PredictForm.tsx`, `*PredictResult.tsx` 를 순차 재스킨.
- 최소한 공통 컴포넌트(`PredictButton`, `ErrorMessage`, `GenderResultCard`)만 재스킨해도 대부분 톤이 맞습니다.

### 5.5 로딩 스피너

- `src/features/home-playground/ui/VariantSpinner.tsx` 에서 선택 variant 의 스피너 컴포넌트 하나(예: `ClaudeSpinner` 가 따로 없다면 `DefaultSpinner` with v9 theme)를 추출해 `src/shared/ui/LoadingSpinner.tsx` 로 승격.
- `useAiPredictor` 의 `isLoading` 타이밍(5.5s) 그대로, Planner 는 2.2~2.8s 인위적 딜레이 유지.

---

## 6. Phase 3 · 공용 컴포넌트 재테마 (접근 B·C 에서 필요)

### 6.1 디자인 토큰 중앙화

**파일**: `src/styles/themeTokens.ts` + `src/styles/globals.css`

1. `VARIANT_MAP['vN'].theme` 의 값들을 CSS 변수(`--bg`, `--text`, `--accent`, ...)로 `globals.css` 에 주입.
2. `themeTokens.ts` 를 업데이트하여 선택 variant 색상이 기본값이 되도록.
3. `useBodyGenderTheme` 훅(`src/shared/lib/useBodyGenderTheme.ts`)의 Boy/Girl 변형 색상도 variant 팔레트와 어울리게 조정.

### 6.2 GlassCard / PredictButton / ErrorMessage

**파일**:
- `src/shared/ui/GlassCard.tsx`
- `src/shared/ui/PredictButton.tsx`
- `src/shared/ui/ErrorMessage.tsx`

- GlassCard 는 현재 glassmorphism 고정. variant 에 따라:
  - v9 (Claude-like): `glass` 변형 제거, 크림색 단색 카드로 변경
  - v11 (Codex-like): 다크 배경 + 모노 borderRadius 작게
  - v4 (Aurora): 반투명 + glow 테두리

### 6.3 NavBar

**파일**: `src/shared/ui/NavBar.tsx`

- 현재 글래스 스타일 + lucide-react 아이콘.
- variant 의 nav 감성을 반영 (예: v3 Editorial 은 serif 텍스트 네비, v11 은 command palette 스타일).

### 6.4 PageLayout + _document.tsx

**파일**:
- `src/shared/ui/PageLayout.tsx`
- `src/pages/_document.tsx`

- `_document.tsx` 의 `<meta name="theme-color">` 를 variant 배경 색과 맞춤.
- OG 이미지(`public/og-default.png`)도 variant 스타일로 재제작 권장.
- variant 가 **다크 테마**(`theme.dark === true`)면 `<Html>` 에 `className="dark"` 추가하거나 body 배경을 어둡게.

### 6.5 Pretendard / Cormorant / JetBrains Mono 폰트

- `_document.tsx` 에 이미 Pretendard + Cormorant 가 로드되어 있습니다.
- variant 가 `fontMono` 를 쓰면 (v6, v11) JetBrains Mono 를 추가:
  ```html
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap" />
  ```

---

## 7. Phase 4 · Playground 정리

### 옵션 A: 유지 (추천)
- `/playground` 라우트와 12개 variant 를 그대로 둡니다. 나중에 다른 시안 비교가 필요할 때 유용.
- 홈 페이지에서 playground 링크만 숨기거나 개발자 메뉴 뒤로.

### 옵션 B: 제거
1. `src/pages/playground/` 전체 디렉토리 삭제.
2. `src/features/home-playground/` 전체 디렉토리 삭제.
3. `src/pages/index.tsx` 에서 playground 링크 제거.
4. 선택한 variant 컴포넌트(예: `v9-claude.tsx`)는 삭제 전에 **`src/features/home/` 이나 `src/pages/` 로 이전**해야 합니다 (Phase 5.1 에서 import 경로가 유지되도록).
5. `lucide-react`, `html-to-image` 등 playground 전용으로 추가된 의존성은 프로덕션에서도 계속 사용되니 유지.

---

## 8. Phase 5 · 검증

### 8.1 빌드 체크
```bash
rm -rf .next out
npm run build
# 모든 페이지가 ○ (Static) 로 빌드되어야 함
```

### 8.2 수동 QA 체크리스트
- [ ] `/` 홈에서 variant 테마가 적용되어 있는가?
- [ ] 홈의 "AI 예측" 카드를 클릭하면 `/ai` 로 이동하고 같은 테마인가?
- [ ] `/ai` 에서 입력 → 예측 → 결과 전체 플로우 정상 동작 + 로딩 스피너 표시
- [ ] `/planner` 에서 성별 토글 → 입력 → 결과 플로우 + 인위적 로딩 스피너
- [ ] 개별 예측 페이지(`/chinese` 등)도 뒤틀려 보이지 않는가? (공용 컴포넌트 재테마 했다면 OK, 안 했다면 최소한 빌드 에러는 없어야)
- [ ] NavBar 네비게이션 모든 링크 정상
- [ ] 모바일 웹뷰 크기(375×760)에서 잘림·오버플로 없음
- [ ] 다크 variant(v4/v5/v6/v11)의 경우 상태바 색(`theme-color`)과 배경 일치
- [ ] `localStorage` 에 저장된 이전 입력(`ai:*:v1`, `planner:*:v1`, `chinese:*:v1`)이 여전히 복구되는가?

### 8.3 의존성
- 현재 프로젝트는 `lucide-react`, `react-day-picker`, `date-fns`, `html-to-image` 를 사용합니다.
- 선택 variant 에 따라 추가 의존성이 필요할 수 있음:
  - v4 Aurora: 없음 (순수 CSS keyframes)
  - v6 Neural: 없음
  - v11 Codex: 없음 (JetBrains Mono 웹폰트만 추가)

---

## 9. 롤백

이 브랜치가 main 에 머지되기 전이라면:
```bash
git checkout main
git branch -D feat/promote-vN
```

머지 후 롤백이 필요하면 머지 커밋을 revert:
```bash
git checkout main
git revert -m 1 <merge-commit-sha>
TOKEN=$(gh auth token -h github.com) && \
  git push "https://binary-hyuk:${TOKEN}@github.com/binary-hyuk/gender_reveal_web.git" main
```

---

## 10. 함정·주의사항

1. **variant 파일의 `@ts-nocheck`**: 프로덕션에 올릴 땐 제거하고 타입을 맞추세요. `CSSProperties` 로 typed 된 inline-style 이 대부분이라 큰 어려움은 없습니다.
2. **variant entry card href**: variant 파일은 `/playground/vN/ai` 로 되어있으니 프로덕션 포팅 시 `/ai`, `/planner` 로 되돌립니다.
3. **useBodyGenderTheme**: 현재 Boy/Girl 선택 시 body 배경이 바뀝니다 (`src/shared/lib/useBodyGenderTheme.ts`). variant 에 맞게 조정 필요.
4. **localStorage 키 버전**: `ai:motherBirthDate:v1` 등 `:v1` 접미사가 있습니다. 상태 스키마가 바뀌면 `:v2` 로 올리고 마이그레이션 고려.
5. **SSG 주의**: `output: "export"` 이므로 `getServerSideProps` / API Routes 사용 불가. 모든 로직은 클라이언트/정적.
6. **폰트 로딩**: Pretendard/Cormorant 는 CDN, JetBrains Mono 는 Google Fonts. 중요한 페이지에서는 `preconnect` 추가 유지.
7. **이미지 캡처(html-to-image)**: 공유 기능이 결과 카드를 PNG 로 저장합니다. variant 의 `backdrop-filter` 가 PNG 에 반영 안 될 수 있으니 캡처 시 fallback 색 배경 지정 권장.
8. **다크 variant 의 입력 필드**: 어두운 배경에서 흰 input 대비가 깨지므로 `color: #fff`, `background: rgba(255,255,255,0.06)` 등으로 조정 필요 (VariantAiPage 에 이미 예시 있음).
9. **AI 딜레이 5.5초**: `useAiPredictor` 는 "AI가 일하는 느낌"을 위해 5.5초 고정 지연. 너무 길다고 느끼면 3초 정도로 줄이는 옵션 고려.

---

## 11. 참고 커밋·PR

현재까지 `new-ui-versions` 브랜치의 주요 커밋:
- `8cfaa12` Claude Design 홈 시안 12종 플레이그라운드 추가
- `509d25d` 각 시안 entry card 를 실제 프로덕션 라우트로 연결
- `111e199` 각 시안별 AI 예측 / 플래너 기능 페이지 추가 (테마 유지)
- `a261e2c` 각 시안 테마별 로딩 스피너 추가

이 중 111e199 의 `VariantAiPage.tsx`, `VariantPlannerPage.tsx` 가 **이번 포팅의 핵심 참고 구현**입니다. 새 세션은 이 두 파일을 먼저 숙지하고 시작하세요.

---

## 12. 후속 세션용 최소 지시문 (복사해서 쓰세요)

> 우리 프로젝트 `/playground` 에서 **`vN` 시안**(예: v9 Claude-like)을 골랐어. 이제 프로덕션 홈(`/`), AI 예측(`/ai`), 플래너(`/planner`) 에 **접근 B(Variant Clone)** 로 적용해줘.
>
> 작업 시작 전 확인 필수:
> 1. `PROMOTE_VARIANT.md` 의 Section 2 질문 3개 답변 듣기
> 2. `src/features/home-playground/ui/VariantAiPage.tsx` + `VariantPlannerPage.tsx` + `variants/vN-*.tsx` + `index.ts` 의 `VARIANT_MAP[vN].theme` 숙지
>
> 브랜치: `feat/promote-vN`. main 에 직접 푸시 금지. 푸시는 `feedback_git_push.md` 패턴 사용. 완료 후 PR 링크만 알려주면 돼.

---

**작성일**: 2026-04-21
**브랜치**: `new-ui-versions`
**작성 주체**: Claude Opus 4.7 (1M context) — 현재 세션에서 playground 구현을 모두 수행한 주체
