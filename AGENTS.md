# Lecture0419 — AGENTS Guide

This file is the primary entry point for Codex, Cline, Cursor, Claude Code, and any other coding agent.

## Reading Order

1. `docs/architecture.md` — engine ↔ ui boundary rules
2. `docs/testing.md` — pure function separation, vitest setup
3. `plans/active/*.md` — active work plan (read before making changes)
4. `docs/cline-usage.md` — live demo prompt templates

> 발표자용 내레이션·체크리스트는 `speaker/` 폴더 참조 (agent가 읽을 필요 없음).

## Work Principles

- **No direct commits to main branch** — always use `git worktree`
- **Write a plan first** — create `plans/active/<task>.md` before any code change
- **Engine changes require tests** — any change to `demo/src/engine/` must come with a matching test update in `demo/tests/`
- **All commits must pass** — `sh scripts/verify-tasks.sh` must succeed before committing
- **Commit messages** — include a short summary and reference the plan file path

## Context

Demo repo for a 10-minute lecture on Harness Engineering (하네스 엔지니어링).
Based on OpenAI's 3 pillars: Context engineering / Architectural constraints / Garbage collection.

The demo shows adding a "birthday-seed lucky numbers" feature to a lotto number generator.
- `Before` state: basic random lotto (1–45, 6 numbers)
- `After` state: birthday-seeded deterministic lucky numbers

---

## Autonomous Feature Workflow

When the user requests the birthday-seed lucky numbers feature (e.g. *"생일을 넣으면 로또번호를 추출해주는 기능을 넣어줘. 같은 날짜에 생성하면 같은 번호가 나와야 함"*), execute the five steps below **in order, without pausing to ask for confirmation between steps**.

Before each step, print a banner via `sh scripts/demo-trace.sh "<title>"` so the audience can follow along in the terminal.

**Fixed names** (do not invent alternatives):
- Feature branch: `add-birthday-seed`
- Worktree path: `../lecture0419-wt/add-birthday-seed`
- Absolute worktree root: `D:/workspace/lecture0419-wt/add-birthday-seed`
- Plan file: `plans/active/add-birthday-seed.md`
- Engine file: `demo/src/engine/birthday.js`
- UI file: `demo/src/ui/input.js` (+ `demo/index.html` birthday field)
- Test file: `demo/tests/birthday.test.js`

**Path rule:** after Step 1, every file edit and shell command targets the new worktree. Use absolute paths rooted at `D:/workspace/lecture0419-wt/add-birthday-seed/` for file edits, and run shell commands with `cwd` = that directory.

### Step 0 — Trace 초기화

```bash
sh scripts/demo-trace.sh reset
```

### Step 1 — Worktree 분리 (Context engineering)

```bash
sh scripts/demo-trace.sh "Step 1 — Worktree 분리"
git worktree add ../lecture0419-wt/add-birthday-seed -b add-birthday-seed
cd ../lecture0419-wt/add-birthday-seed
```

Log one line to the audience: *"main을 건드리지 않는 격리된 작업 공간을 만들었습니다."*

### Step 2 — Plan 파일 작성 (Context engineering)

```bash
sh scripts/demo-trace.sh "Step 2 — Plan 파일 작성"
```

Create `D:/workspace/lecture0419-wt/add-birthday-seed/plans/active/add-birthday-seed.md` with these sections: **Goal**, **Engine changes**, **UI changes**, **Tests**, **Harness pillar mapping**. Keep under 40 lines.

Log: *"무엇을 할지 먼저 계획으로 남깁니다 — context engineering."*

### Step 3 — Engine 구현 (Architectural constraints)

```bash
sh scripts/demo-trace.sh "Step 3 — Engine 구현"
```

Write `D:/workspace/lecture0419-wt/add-birthday-seed/demo/src/engine/birthday.js` exporting:
- `birthdayToSeed(yyyy, mm, dd)` — returns a 32-bit integer seed
- `generateFromBirthday(yyyy, mm, dd)` — reuses `seededRandom` from `random.js` and `generateLotto` from `lotto.js`; returns 6 sorted unique numbers in [1, 45]

**Constraint:** no DOM, no globals, no side effects. Pure functions only.

Log: *"engine/은 순수 함수만 — architectural constraints pillar."*

### Step 4 — UI 연동

```bash
sh scripts/demo-trace.sh "Step 4 — UI 연동"
```

Update `demo/index.html` to add birthday input fields (year/month/day) and a "행운 번호" button, guarded by the existing `?after` query parameter. Update `demo/src/ui/input.js` to read those fields, call `generateFromBirthday`, and hand the result to the renderer. **No business logic in UI — only DOM glue.**

### Step 5 — Test 작성 및 실행 (Computational check)

```bash
sh scripts/demo-trace.sh "Step 5 — Test 작성 및 실행"
```

Write `demo/tests/birthday.test.js` covering:
1. Same `(yyyy, mm, dd)` → identical array (determinism)
2. Different dates → different arrays
3. Length 6, range [1, 45], no duplicates, ascending order

Then run:

```bash
sh scripts/demo-trace.sh "Step 5b — vitest run"
npx vitest run
```

All tests must be green. If anything is red, fix it before ending the turn.

Log: *"실패 가능한 검증 루프 — computational feedback."*

### DO NOT execute Step 6 from a feature-request prompt

Step 6 (hook 차단 시연 — red × 3 → green) is triggered by a **separate** prompt:
*"이제 harness 훅이 실제로 나쁜 커밋을 막는지 3종으로 보여줘 (main 직접 커밋, plan 없는 커밋, 깨진 테스트)."*

When and only when the user sends that prompt, follow `docs/cline-usage.md` §"Hook 차단 시연".
