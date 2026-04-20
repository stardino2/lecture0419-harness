# 강의 대본 — Harness Engineering 10분 강의

> 슬라이드별 발표자 내레이션. `slides/index.html`과 나란히 사용.
> 데모 단계 체크리스트는 `speaker/checklist.md` 참조.

## 발표 운영 메모

- **Slide 3·5·7**에 3 pillar 아이콘(Context/Constraints/Collection) 항상 노출 → 마무리에서 자동 기억
- **시연 페이지**: Slide 6 진입 직전 새 창에서 `presentation/slides/demo.html` 열어 Cline IDE 옆(좌·우 반반)에 배치.
- **다크/라이트 토글**: 회의실 조명에 따라 우측 상단 🌗 버튼으로 전환. 상태는 창별 localStorage에 저장 (키: `harness-theme`).
- **시간 리스크**: 라이브 시연이 가장 위험. 5분 지나면 `after-complete` tag 체크아웃으로 즉시 점프
- **마무리 1분 절대 포기 금지** — "agent가 사는 집" 한 줄이 안 가면 강의 목적 무너짐
- **Cline 차단 시**: 미리 작성된 `birthday.js` diff를 화면에 띄우고 코드 설명으로 대체
- **유머 3개**(강아지·권투·뷔페)는 분위기 보고 뺄 수 있음 — 반응 없으면 바로 다음 포인트로 진행
- Q&A는 10분 **밖**으로 분리 안내

---

## Slide 1 — Opening (0:00–0:45)

**제목:** "Harness Engineering — 어려워 마세요"

> 안녕하세요 여러분! 소중한 시간 내어 참석해 주셔서 감사합니다.
> 하네스 엔지니어링에 대해서 소개해드리려고합니다.

> 구글에 '하네스'를 검색하면 강아지 가슴줄이 가장 먼저 나옵니다. (웃음) 얼추 비슷한 개념입니다.
> 오늘은 천방지축 뛰고 환각에 벽으로 돌진하는 AI 코딩 에이전트에게 채우는 목줄이자 안전장치 — 하네스 엔지니어링 얘기입니다.

> 오늘 저는 클로드나 Codex 대신 VSCode의 Cline이라는 확장을 씁니다.
> 사내 환경에서 클로드나 Codex CLI 접근이 안 되는 분들이 많으실 텐데 — 도구는 달라도 오늘 배울 원리는 완전히 동일합니다.

> Prompt engineering, Context engineering, 이젠 Harness engineering.
> 오늘 10분 안에 이게 뭔지, 왜 나왔는지, 어떻게 적용하는지 정리해드립니다.
> 마지막 4분은 제가 준비한 프로젝트에서 harness engineering을 적용하는 과정을 라이브로 보여드립니다.

---

## Slide 2 — AI로 결국 하고 싶은 것 + 역사 맥락 (0:45–1:45)

> AI가 내 대신에 결과물을 만들어 주려면 — 우리가 AI가 움직이는 **환경**을 잘 설계해야 합니다.

**역사 맥락:**
> Harness라는 단어 자체는 새로운 개념이 아닙니다.
> 제어 시스템, DevOps, 테스트 인프라에서 "harness"는 오래전부터 쓰인 용어입니다.
> 2026년 초 OpenAI가 Codex 기반 5개월 실험을 공개 문서로 정리하면서,
> AI coding agent 맥락에서 다시 대중적 관심을 얻게 된 흐름입니다.

---

## Slide 3 — 진화 3단 (1:45–2:15)

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

## Slide 4 — OpenAI 5-Month Experiment (2:15–3:00)

> OpenAI에서 최근 문서가 하나 나왔습니다.
> 아마 많은 분이 사내 보안망에 막혀 openai.com 원문 접속이 안 되셨을 겁니다. 제가 요약해드리면 다음과 같습니다 —
> 'AI에게 맨땅에 코드 짜라고 던지지 말고, 실수할 수밖에 없는 AI를 위해 엄격히 통제된 작업 환경, 즉 harness를 씌우자'는 겁니다.
>
> 실제로 어떤 성과가 나왔냐 하면: 5개월 동안, 소규모 팀이, 사람이 직접 쓴 코드 0줄로, 약 100만 줄 규모의 베타 제품을 만들었다는 겁니다.
>
> 어떻게?
> Agent 자체를 바꾼 게 아닙니다.
> Agent가 사는 집 — Harness — 을 바꿨습니다.
>
> OpenAI가 직접 남긴 문장:
> "Most difficult challenges center on designing environments, feedback loops, and control systems."
>
> 오늘은 그 환경을 제 repo 한 개에 옮겨 봅니다.

---

## Slide 5 — 3 Pillar × 2 Axis (3:00–5:00)

> OpenAI는 Harness를 세 가지 pillar로 정리했습니다.

**Pillar ① Context engineering**
> Agent가 "무엇을, 어디서, 왜" 읽을지 구조화하는 것입니다.
> 일반적으로 `AGENTS.md` 와, `각종 plans.md` 작업 계획서가 여기 해당합니다.

**Pillar ② Architectural constraints**
> Agent가 벗어나면 안 되는 경계를 설정하는 것입니다.
> 현재 repo 기준으로 husky 로 작성한 hook 들에 해당합니다
> `.husky/pre-commit`은 룰 어기면 실제로 commit을 막습니다.
> Prompt에 "하지 마"라고 쓰는 것과 급이 다릅니다.

**Pillar ③ Garbage collection**
> 누적된 context 노이즈를 주기적으로 걸러내는 것입니다.
> `plans/active → completed` 이동, `logs/` 정리, size 제한이 여기 해당합니다.

**(추가) Martin Fowler 2 axis — 20초 체크리스트:**
> 추가로 Martin Fowler의 2 axis 를 소개해드립니다. repo의 harness를 점검할 때 두 축을 씁니다.
> Feedforward vs Feedback — 사전 제약(lint rule, hook)이냐, 사후 검증(test, review)이냐.
> Computational vs Inferential — 결정적 검증(test·type check)이냐, 의미적 검증(LLM review)이냐.
> 이 네 칸 중 어디가 비어 있는지 확인하세요.
> AI가 환각증세나 에러를 일으켜도, 테스트 코드로 해결 가능합니다.

---

## Slide 6 — 라이브 시연 (5:00–9:00)

**요청 — Prompt A (청중 앞에서 Cline에 붙여넣는 **한 문장**):**
> ```
> 생일을 넣으면 로또번호를 추출해주는 기능을 넣어줘.
> 같은 날짜에 생성하면 같은 번호가 나와야 함.
> ```

Cline은 `AGENTS.md` §Autonomous Feature Workflow를 읽고 Step 1–5를 자동 수행.
터미널에 `sh scripts/demo-trace.sh "<step>"` 배너가 각 단계마다 찍혀 청중이 진행 상황을 볼 수 있다.
화면 위쪽 파이프라인 다이어그램을 가리키며: "색이 같은 단계는 같은 pillar입니다 — 따라가 보시죠."

**시연 8단계** (세부는 `speaker/checklist.md`):

1. `git worktree add` → **Pillar ①** Context: 메인 건드리지 않고 작업 공간 분리 *(Prompt A 자동)*
2. Cline → `plans/active/add-birthday-seed.md` 생성 → **Pillar ①** Agent가 계획부터 씀 *(자동)*
3. Cline → `demo/src/engine/birthday.js` 구현 → **Pillar ②** engine(pure) 유지 *(자동)*
4. `npx vitest run` → 11 + α tests green → Computational check *(자동)*
5. 스크린샷 → `logs/` → **Pillar ③** 증거 남기기 *(수동 — Win+Shift+S)*

> **Hook(훅)이란?** — 권투의 훅처럼, 어떤 행동 직전(예: 커밋 직전)에 낚아채서 실행되는 검문소 프로그램입니다. `.husky/pre-commit`이 바로 이 역할을 합니다.

6. Hook 차단 시연 — **Prompt B** 붙여넣기 → Cline이 빨강 3종(main 직접 / plan 없음 / 깨진 테스트) 실행 → 모두 ❌ → 복구 → `git commit` → ✅

   **Prompt B 원문** (복붙용 — `presentation/cline-usage.md` §Prompt B 동일):
   ```
   이제 harness 훅이 실제로 나쁜 커밋을 막는지 3종으로 보여줘.
   1) main 직접 커밋
   2) plan 없는 커밋
   3) 깨진 테스트 커밋
   모두 실패한 뒤, 정상 상태로 복구해서 성공 커밋까지 보여줘.
   ```

   > "보셨죠? Architectural constraints — 말이 아니라 실패로 막는 장치입니다."

7. `git push origin add-birthday-seed` + merge to main
8. `mv plans/active/... plans/completed/` + commit → **Pillar ③** Garbage collection 시각화

> 계획을 안 써도 막히고, 테스트가 통과 안 되어도 막힙니다. 이게 harness engineering의 진가입니다.

---

## Slide 7 — Closing (9:00–10:00)

**오늘 한 줄:**
> "Agent를 바꾸지 말고, agent가 사는 집을 바꾸세요."

3 Pillar: **Context engineering / Architectural constraints / Garbage collection**

**다음 걸음:**
1. 이번 주 딱 하나: `AGENTS.md` 목차 한 장 → 반복 설명 반으로 줄기
2. 그 다음: `.husky/pre-commit` 훅 하나 → 말이 아닌 장치로
3. 사내 가이드 추천 순서: week3 → week5 → week8 → week7

**마무리 메시지:**
> Harness engineering도 하나의 흐름입니다.
> 특정 구조에 종속되실 필요 없습니다. 팀 문화와 프로젝트 성격에 맞게 — 뷔페처럼 필요한 파트만 골라 도입하세요.
>
> 기술 트렌드가 자고 일어나면 바뀌는 시대, 기업 AX(AI Transformation) 도입엔 끊임없는 공부가 필요합니다.
> 저도 매일 쏟아지는 기술 보면서 머리 싸매고 공부 중입니다.
> 도입하면서 트러블이 생기면 주저 말고 연락 주세요. 같이 고민하고 뚫어봤으면 좋겠습니다.
> 끝까지 경청해 주셔서 감사합니다!

Q&A는 10분 **밖**으로 분리.
