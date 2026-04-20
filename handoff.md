# 강의 세션 인계 문서 (v2 — 2026-04-19)

> `lecture0419/` repo의 canonical 운영 문서입니다.
> 기존 `webpage/월례회자료/lecture-handoff.md`는 아카이브 취급.

---

## 1. 배경 및 목표

**목표:** 삼성전자 부서원들에게 Harness Engineering + Cline 사용법 + 실전 적용을 10분 내로 강의

- **청중:** Codex를 살짝 써본 사람(레벨 2) + 일상적으로 쓰지만 체계적으로 본 적 없는 사람(레벨 3) 혼합
- **형식:** 슬라이드 + 라이브 시연 (청중 참여 없음, 발표자 단독 조작)
- **시연 도구:** VSCode + Cline 확장 (**Codex는 강의장 접근 불가 — 오프닝에서 공지**)
- **GitHub:** 개인 계정 public repo, 시연 중 실제 commit + push 포함
- **산출물:** ① 강의 대본 (이 문서 Section 4) ② 발표자 체크리스트 (`scripts/demo-run.md`) ③ 슬라이드 골격 (`slides/outline.md`) ④ 시연 레포 (`lecture0419/`)

**참고:**
- OpenAI 공식 문서: <https://openai.com/index/harness-engineering/>
- Martin Fowler 해설: <https://martinfowler.com/articles/exploring-gen-ai/harness-engineering.html>
- 유튜브 영상은 *톤 참고 금지*, Section 7 참고 자료로만 링크 제공

---

## 2. 확정된 결정 사항

| 항목 | 결정 내용 |
|---|---|
| 시연 앱 | **로또 번호 추출기** — Vanilla JS + HTML, no install |
| 시연 추가 기능 | **생년월일 seed 행운 번호** (같은 생일 → 같은 번호, 결정성 시연) |
| 시연 도구 | VSCode + Cline (Codex CLI 강의장 차단) |
| Repo 경로 | `D:/workspace/lecture0419/` 단일 repo |
| 강의 자료 위치 | 같은 repo 내 (`handoff.md`, `slides/`, `scripts/demo-run.md`) |
| Agent 메모리 규약 | `AGENTS.md` (Codex·Cline·Cursor 범용) |
| 강의 골격 | OpenAI 공식 3 pillar + Martin Fowler 2 axis |
| GitHub | 개인 계정 public repo, origin 연결, 실제 push |
| 용어 | **영문 원어 그대로** (의역 금지) |
| 청중 | 관람만, 발표자 단독 시연 |

---

## 3. 작업 현황

| Task | 상태 | 내용 |
|---|---|---|
| **Task A** — 시연 레포 구축 | ✅ 완료 (2026-04-19) | `lecture0419/` 전체 구조, vitest 11개 green, hook 설치 완료 |
| **Task B** — 슬라이드 HTML | ⏳ 다음 세션 | `slides/outline.md` 작성 완료. `slides/index.html` 변환은 시연 스크린샷 확보 후 |
| **Task C** — 리허설 | ⏳ 강의 주간 | `scripts/demo-run.md` 기반 타이머 2회, 폴백 3종 리허설 |

---

## 4. 강의 대본 (전문)

### Slide 1 — Opening (0:00–0:45)

**제목:** "Harness Engineering — 쫄지 마세요"

> 오늘 저는 Codex 대신 VSCode의 Cline이라는 확장을 씁니다.
> 사내 환경에서 Codex CLI 접근이 안 되는 분들이 많으실 텐데 — 도구는 달라도 오늘 배울 원리는 완전히 동일합니다.

> Prompt engineering, Context engineering, 이젠 Harness engineering.
> 오늘 10분 안에 이게 뭔지, 왜 나왔는지, 어떻게 적용하는지 정리해드립니다.
> 마지막 4분은 제가 준비한 로또 번호 추출기 repo에 새 기능을 붙이는 과정을 라이브로 보여드립니다.

오늘 다루지 않는 것 / 다루는 것:
- ❌ Cline/Codex 설치법, 요금, 기초 prompt
- ✅ 관점 1개, 3 pillar, 라이브 시연 1개

---

### Slide 2 — AI로 결국 하고 싶은 것 + 역사 맥락 (0:45–1:45)

> AI가 내 대신에 결과물을 만들어 주려면 — 우리가 AI가 움직이는 **환경**을 잘 설계해야 합니다.

**역사 맥락:**
> Harness라는 단어 자체는 새로운 개념이 아닙니다.
> 제어 시스템, DevOps, 테스트 인프라에서 "harness"는 오래전부터 쓰인 용어입니다.
> 2026년 초 OpenAI가 Codex 기반 5개월 실험을 공개 문서로 정리하면서,
> AI coding agent 맥락에서 다시 대중적 관심을 얻게 된 흐름입니다.

---

### Slide 3 — 진화 3단 (1:45–2:15)

```
Prompt engineering   →  말 잘하기 (무엇을 원하는지 설명)
Context engineering  →  히스토리·맥락 주기 (어떤 상황인지 알려주기)
Harness engineering  →  agent가 사는 환경 설계
```

> Prompt engineering은 말을 잘하는 기술입니다.
> Context engineering은 일의 히스토리와 맥락을 주는 겁니다.
> 이제 agent의 역량이 커지면서 — 환경 없이는 엉뚱한 방향으로 달릴 수 있습니다.
>
> Harness는 원래 말(馬)에 채우는 마구(馬具)입니다.
> 말의 에너지를 원하는 방향으로 채널링하는 장치.
> AI agent에게도 그런 장치가 필요합니다.

---

### Slide 4 — OpenAI 5-Month Experiment (2:15–3:00)

> OpenAI에서 최근 문서가 하나 나왔습니다.
> 5개월 동안, 소규모 팀이, 사람이 직접 쓴 코드 0줄로, 약 100만 줄 규모의 베타 제품을 만들었다는 겁니다.
>
> 어떻게?
> Agent 자체를 바꾼 게 아닙니다.
> Agent가 사는 집 — Harness — 을 바꿨습니다.
>
> OpenAI가 직접 남긴 문장:
> "Most difficult challenges center on designing environments, feedback loops, and control systems."
>
> 오늘은 그 환경을 우리 책상의 repo 한 개에 옮겨 봅니다.

---

### Slide 5 — 3 Pillar × 2 Axis (3:00–5:00)

> OpenAI는 Harness를 세 가지 pillar로 정리했습니다.

**Pillar ① Context engineering**
> Agent가 "무엇을, 어디서, 왜" 읽을지 구조화하는 것입니다.
> 이 repo에서는 `AGENTS.md` 목차, `docs/` 분리 문서, `plans/active/*.md` 작업 계획서가 여기 해당합니다.

**Pillar ② Architectural constraints**
> Agent가 벗어나면 안 되는 경계를 설정하는 것입니다.
> `demo/src/engine/`은 순수 함수만 — DOM 호출 금지.
> `.husky/pre-commit`은 룰 어기면 실제로 commit을 막습니다.
> Prompt에 "하지 마"라고 쓰는 것과 급이 다릅니다.

**Pillar ③ Garbage collection**
> 누적된 context 노이즈를 주기적으로 걸러내는 것입니다.
> `plans/active → completed` 이동, `logs/` 정리, size 제한이 여기 해당합니다.

**(추가) Martin Fowler 2 axis — 20초 체크리스트:**
> 내 repo의 harness를 점검할 때 두 축을 씁니다.
> Feedforward vs Feedback — 사전 제약(lint rule, hook)이냐, 사후 검증(test, review)이냐.
> Computational vs Inferential — 결정적 검증(test·type check)이냐, 의미적 검증(LLM review)이냐.
> 이 네 칸 중 어디가 비어 있는지 확인하세요.

---

### Slide 6 — 라이브 시연 (5:00–9:00)

**요청 (청중에게 보여주는 Cline 입력):**
> "Cline아, 로또에 생년월일 입력하면 행운 번호 뽑아줘.
> 같은 생일은 매번 같은 번호가 나와야 해."

**시연 8단계** (세부는 `scripts/demo-run.md`):

1. `git worktree add` → **Pillar ①** Context: 메인 건드리지 않고 작업 공간 분리
2. Cline → `plans/active/add-birthday-seed.md` 생성 → **Pillar ①** Agent가 계획부터 씀
3. Cline → `demo/src/engine/birthday.js` 구현 → **Pillar ②** engine(pure) 유지
4. `npx vitest run` → 11 + α tests green → Computational check
5. 스크린샷 → `logs/` → **Pillar ③** 증거 남기기
6. Hook 차단 시연 — main 직접 commit, plans 없이 commit, test 깨진 상태 commit → 전부 ❌
   그 다음 모두 복구 → `git commit` → ✅

   > "보셨죠? Architectural constraints — 말이 아니라 실패로 막는 장치입니다."

7. `git push origin add-birthday-seed` + merge to main
8. `mv plans/active/... plans/completed/` + commit → **Pillar ③** Garbage collection 시각화

---

### Slide 7 — Closing (9:00–10:00)

**오늘 한 줄:**
> "Agent를 바꾸지 말고, agent가 사는 집을 바꾸세요."

3 Pillar: **Context engineering / Architectural constraints / Garbage collection**

**다음 걸음:**
1. 이번 주 딱 하나: `AGENTS.md` 목차 한 장 → 반복 설명 반으로 줄기
2. 그 다음: `.husky/pre-commit` 훅 하나 → 말이 아닌 장치로
3. 사내 가이드 추천 순서: week3 → week5 → week8 → week7

**마무리 메시지:**
> Harness engineering도 하나의 흐름입니다.
> 공식 pillar나 특정 구조를 무조건 따라 하기보다,
> 여러분의 repo, 팀, 보안 정책, 워크플로우에 맞추어 각자 조정해서 쓰시는 것이 가장 좋습니다.
> 오늘 본 로또 데모는 그 **한 가지 예**에 불과합니다.

Q&A는 10분 **밖**으로 분리.

---

## 5. repo 명세 (`lecture0419/`)

### 기술 스택
- Vanilla JS + HTML (설치 0, 브라우저 하나면 실행)
- Test: vitest v2
- Hook: husky v9
- Agent 규약: `AGENTS.md`
- IDE: VSCode + Cline

### 디렉터리 구조

```
lecture0419/
├── AGENTS.md
├── README.md
├── handoff.md                   ← 이 파일
├── package.json
├── eslint.config.js
├── vitest.config.js
├── .gitignore
├── .husky/pre-commit            ← 4단 차단 훅
├── scripts/
│   ├── verify-tasks.sh
│   └── demo-run.md              ← 발표자 체크리스트
├── .vscode/
│   ├── settings.json
│   └── extensions.json          ← Cline 추천
├── .devcontainer/
│   └── devcontainer.json        ← Codespaces 백업
├── docs/
│   ├── architecture.md
│   ├── testing.md
│   ├── ui-verification.md
│   └── cline-usage.md           ← 시연용 Cline prompt
├── plans/
│   ├── active/
│   └── completed/
├── logs/
├── slides/
│   └── outline.md               ← Task B 골격
└── demo/
    ├── index.html               ← ?after 파라미터로 After 상태 전환
    ├── src/
    │   ├── engine/
    │   │   ├── lotto.js         ← generateLotto(rng)
    │   │   ├── random.js        ← seededRandom(seed)
    │   │   └── birthday.js      ← generateFromBirthday(y,m,d)
    │   └── ui/
    │       ├── renderer.js
    │       └── input.js
    └── tests/
        ├── lotto.test.js
        ├── random.test.js
        └── birthday.test.js     ← placeholder, After에서 채움
```

### Before / After 브랜치 전략
- `main`: 하네스 뼈대 + Before 상태 (시연 시작 상태)
- `add-birthday-seed` (worktree): 라이브 시연에서 발표자가 직접 생성
- `after-complete` tag: After 완성본에 태그 — 폴백용

### husky pre-commit 훅 4단
```
1. main branch 직접 commit 차단
2. plans/active/ 계획서 없으면 차단
3. verify-tasks.sh (lint + test + size) 실패 시 차단
```

---

## 6. 발표 운영 메모

- **Slide 3·5·7**에 3 pillar 아이콘(Context/Constraints/Collection) 항상 노출 → 마무리에서 자동 기억
- **시간 리스크**: 라이브 시연이 가장 위험. 5분 지나면 `after-complete` tag 체크아웃으로 즉시 점프
- **마무리 1분 절대 포기 금지** — "agent가 사는 집" 한 줄이 안 가면 강의 목적 무너짐
- **Cline 차단 시**: 미리 작성된 `birthday.js` diff를 화면에 띄우고 코드 설명으로 대체
- Q&A는 10분 **밖**으로 분리 안내

### 리허설 체크리스트
- [ ] 통째 타이머 리허설 2회 (10분 초과 시 Slide 3 대본 30초 단축)
- [ ] 시연 성공 케이스 (3분 내 완료)
- [ ] Cline 폴백 케이스 (미리 작성 코드 설명, 3분 내)
- [ ] `after-complete` 긴급 점프 (10초 내)
- [ ] 동료에게 "3 pillar가 뭐예요?" 질문 → 즉답 나오면 성공

### 폴백 계층
1. VSCode + Cline (메인)
2. 태블릿 → GitHub Codespaces (Wi-Fi 되면)
3. `git checkout after-complete` + 코드 내레이션
4. `slides/outline.md` 스크린샷 섹션만 보여주기 (최후)

---

## 7. 사내 가이드 연결 + 참고 자료

| 강의 구간 | 심화 학습 week |
|---|---|
| Harness 정의, 3 pillar | week3 |
| AGENTS.md·Context engineering | week5 |
| Worktree·Subagent | week8 |
| 평가·품질 관리 | week7 |

### 참고 자료
- **OpenAI 공식**: <https://openai.com/index/harness-engineering/>
- **Martin Fowler**: <https://martinfowler.com/articles/exploring-gen-ai/harness-engineering.html>
- **InfoQ 요약**: <https://www.infoq.com/news/2026/02/openai-harness-engineering-codex/>
- **유튜브** *(내용 참고, 강의 톤 직접 인용 금지)*: <https://www.youtube.com/watch?v=3yyLg1xbQSs>
- **이 repo**: <https://github.com/stardino2/lecture0419-harness>
