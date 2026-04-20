# Slides Outline — Harness Engineering 10분 강의

> Task B용 골격. 다음 세션에서 `slides/index.html`로 변환.
> 각 슬라이드에 데모 스크린샷 삽입 예정.

---

## Slide 1 — Opening (0:00–0:45)

**Title:** Harness Engineering — 쫄지 마세요

> "Prompt engineering, Context engineering, 이젠 Harness engineering.
> 오늘 10분 안에 싹 다 정리합니다.
> 마지막 4분은 로또 번호 추출기에 새 기능을 붙이는 걸 라이브로 보여드립니다."

**오늘 다루지 않는 것 / 다루는 것:**
- ❌ Cline 설치법, 요금, 기초 prompt
- ✅ 관점 1개, 3 pillar, 라이브 시연 1개

---

## Slide 2 — "AI로 결국 하고 싶은 것" + 역사 맥락 (0:45–1:45)

> "AI가 내 대신 결과물을 만들어 주려면 — 우리가 AI가 움직이는 환경을 잘 설계해야 합니다."

**역사 맥락 (한 줄):**
> "Harness라는 단어는 제어 시스템, DevOps, 테스트 인프라에서 오래전부터 쓰인 용어입니다.
> OpenAI가 2026년 초 5개월 실험을 정리하면서 AI agent 맥락에서 다시 주목받고 있습니다."

---

## Slide 3 — 진화 3단 (1:45–2:15)

```
Prompt engineering   →  말 잘하기
Context engineering  →  히스토리·맥락 주기
Harness engineering  →  agent가 사는 환경 설계
```

> "Agent가 똑똑해질수록 환경이 없으면 엉뚱한 방향으로 달립니다.
> Harness는 말(馬) 마구에서 온 단어 — 에너지를 원하는 방향으로 채널링하는 장치입니다."

---

## Slide 4 — OpenAI 5-Month Experiment (2:15–3:00)

- 약 100만 줄 코드, 사람이 직접 쓴 코드 0줄
- 소규모 엔지니어 팀이 베타 제품을 5개월 만에 출시
- 비밀: **"Agent를 바꾸지 않았다. Agent가 사는 집(Harness)을 바꿨다."**

**인용 (OpenAI):**
> "Most difficult challenges center on designing environments, feedback loops,
> and control systems."

---

## Slide 5 — 3 Pillar × 2 Axis (3:00–5:00)

### OpenAI 공식 3 Pillar

| Pillar | 한 줄 설명 | 이 repo 실체 |
|---|---|---|
| Context engineering | Agent가 무엇을, 어디서, 왜 읽을지 구조화 | `AGENTS.md` + `docs/` + `plans/active/` |
| Architectural constraints | Agent가 벗어나면 안 되는 경계 | `engine`(pure) ↔ `ui` 분리, `.husky/pre-commit` |
| Garbage collection | 누적 노이즈를 주기적으로 정리 | `plans/active → completed`, `logs/` 순환, size 제한 |

### Martin Fowler 2 Axis (20초 체크리스트)

```
Feedforward ↔ Feedback
Computational ↔ Inferential
```

> "내 repo의 harness 칸이 비어 있나요? 이 4개 축을 보면서 점검해 보세요."

---

## Slide 6 — Live Demo (5:00–9:00)

**요청:**
> "[예시 feature 요청 프롬프트]"

**8단계 (scripts/demo-run.md 참고):**
1. `git worktree add` → Context engineering
2. `plans/active/<feature>.md` 생성 → Context engineering
3. `<feature>.js` 구현 → Architectural constraints
4. `vitest run` → Computational check
5. Screenshot → logs/ (Garbage collection)
6. Hook 차단 시연 (빨강 3종 → 초록) → Architectural constraints ★
7. `git push origin <feature-branch>` + merge → 완성
8. `plans/active → completed` 이동 → Garbage collection

**핵심 멘트 (Step 6 후):**
> "보셨죠? Prompt에 '하지 마' 쓰는 것과 급이 다릅니다.
> Architectural constraints — 실패로 막는 장치입니다."

---

## Slide 7 — Closing (9:00–10:00)

**오늘 한 줄:**
> "Agent를 바꾸지 말고, agent가 사는 집을 바꾸세요."
> 3 Pillar: Context engineering / Architectural constraints / Garbage collection

**다음 걸음 (이번 주 딱 하나):**
1. `AGENTS.md` 한 장 → 반복 설명 반으로 줄기
2. `.husky/pre-commit` 훅 하나 → 말이 아닌 장치로
3. 사내 가이드: week3 → week5 → week7 → week8

**마무리 메시지:**
> "Harness engineering도 하나의 흐름입니다.
> 공식 pillar를 무조건 따라 하기보다,
> 여러분의 repo·팀·정책에 맞추어 각자 조정해서 쓰시는 것이 가장 좋습니다.
> 오늘 본 로또 데모는 그 한 가지 예에 불과합니다."

**Q&A:** 10분 밖으로 분리

---

## 참고 자료 (Section 7)

- [OpenAI Harness Engineering (공식)](https://openai.com/index/harness-engineering/)
- [Martin Fowler — Harness Engineering for Coding Agent Users](https://martinfowler.com/articles/exploring-gen-ai/harness-engineering.html)
- [유튜브 — 하네스 엔지니어링 존재 이유부터 실전 예제까지](https://www.youtube.com/watch?v=3yyLg1xbQSs) *(톤 참고 아님)*
- 사내 Codex 가이드: week3(Harness 정의) → week5(CLAUDE.md·목차화) → week8(Worktree·Subagent) → week7(평가·품질)
