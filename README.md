# 🔮 성별 예측 웹앱

네이티브 앱 웹뷰에 서빙하는 **Next.js SSG** 기반 태아 성별 예측 앱.  
17가지 전통·현대 알고리즘을 제공하며, AI 페이지에서 가중치 합산으로 종합 예측합니다.

---

## 기술 스택

| 항목 | 내용 |
|---|---|
| 프레임워크 | Next.js (Pages Router, `output: "export"`) |
| 언어 | TypeScript |
| 스타일 | Tailwind CSS |
| 아키텍처 | FSD (Feature-Sliced Design) |
| 배포 | 정적 파일 (`out/` 폴더) → 네이티브 웹뷰 |

---

## 빠른 시작

```bash
npm install
npm run dev      # 개발 서버 (http://localhost:3000)
npm run build    # 정적 빌드 → out/ 폴더 생성
```

> **빌드 캐시 오류 시**: `rm -rf .next && npm run build`

---

## 예측 방법 목록 (17가지)

| 경로 | 이름 | AI 가중치 |
|---|---|---|
| `/` | 🤖 AI 종합 예측 | — |
| `/chinese` | 🏮 중국 황실 달력 | 100 |
| `/mayan` | 🗿 마야식 | 90 |
| `/ancient49` | ☯️ 주역 49법 | 80 |
| `/cbr` | 🏛️ CBR-Engine | 70 |
| `/blood-renewal` | 🩸 혈액 갱신법 | 60 |
| `/lunar-zodiac` | 🌙 달 별자리 | 50 |
| `/ohang` | ☯️ 오행천문융합 | 45 |
| `/blood-type` | 🅰️ 혈액형 조합 | 40 |
| `/numerology` | 🔢 수비학 | 35 |
| `/gypsy` | 🎴 집시 생월법 | 30 |
| `/planetary-weekday` | 🌍 행성 요일 | 25 |
| `/ayurveda` | 🪷 아유르베다 | 22 |
| `/egypt-wheat` | 🌾 이집트 밀보리 | 20 |
| `/hippocrates-wind` | 🌬️ 히포크라테스 | 18 |
| `/kfengshui` | 🏠 K-풍수지리 | 15 |
| `/digital-dna` | 🧬 디지털 DNA | 10 |

---

## 프로젝트 구조

```
src/
├── features/              # 예측 기능별 Feature 슬라이스
│   ├── ai-predict/        # AI 종합 예측 (모든 방법 통합)
│   ├── cbr-predict/       # CBR-Engine
│   ├── chinese-predict/
│   └── ...                # 총 17개 feature
├── pages/                 # Next.js 페이지 (thin, hook만 호출)
├── shared/
│   ├── lib/               # 순수 유틸 (lunarConverter, moonSign 등)
│   └── ui/                # 공통 컴포넌트 (NavBar, DateTextInput 등)
└── styles/
```

### FSD 핵심 규칙
- **model/** — 비즈니스 로직 (hook + 순수함수), JSX 없음
- **ui/** — View만, props로만 데이터 수신
- **pages/** — hook 호출 후 Form/Result에 props 전달만

---

## Claude Code 작업 가이드

이 프로젝트에 Claude Code로 기능을 추가할 경우:  
**[README.claude.md](./README.claude.md)** 를 먼저 읽으세요.
