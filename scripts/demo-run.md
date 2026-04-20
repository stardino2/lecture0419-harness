# Live Demo Checklist — 발표자용

> 이 파일을 강의 직전에 한 번 훑으세요.
> 각 단계를 수행하면서 체크하세요.

---

## 사전 준비 (강의 시작 전)

- [ ] VSCode에서 `D:/workspace/lecture0419` 열기
- [ ] Cline 확장 활성화 확인
- [ ] `npx vitest run` 한 번 돌려서 11개 green 확인
- [ ] `demo/index.html` 브라우저에서 열어두기 (Before 상태)
- [ ] GitHub origin 연결 확인: `git remote -v` → `https://github.com/stardino2/lecture0419-harness.git`
- [ ] `plans/active/` 비어 있는지 확인
- [ ] 터미널 폰트 크기 키우기 (청중이 보기 쉽게)

---

## 슬라이드 1–5 진행 중 (발표자 직접 설명)

코드 건드리지 않음. 슬라이드만 진행.

---

## 라이브 시연 (슬라이드 6 구간 / 5:00–9:00)

### Step 1 — Worktree 분리
```bash
git worktree add ../lecture0419-wt/add-birthday-seed -b add-birthday-seed
```
- [ ] 실행 완료
- [ ] VSCode에서 worktree 폴더로 전환 (또는 터미널 cd)

### Step 2 — Plan 파일 생성 (Cline 사용)
Cline에 붙여넣기 (`docs/cline-usage.md` Prompt 1):
```
Read AGENTS.md and docs/architecture.md, then create a plan file at
plans/active/add-birthday-seed.md ...
```
- [ ] `plans/active/add-birthday-seed.md` 생성됨
- [ ] 청중에게 설명: "Context engineering — Cline이 AGENTS.md를 읽고 먼저 계획을 씁니다"

### Step 3 — 구현 (Cline 사용)
Cline에 붙여넣기 (`docs/cline-usage.md` Prompt 2):
```
Follow the plan in plans/active/add-birthday-seed.md and implement...
```
- [ ] `demo/src/engine/birthday.js` 수정/확인
- [ ] `demo/src/ui/input.js` + `demo/index.html` birthday field 연동 확인

### Step 4 — Test 작성·실행
Cline에 붙여넣기 (`docs/cline-usage.md` Prompt 3):
```
Write unit tests for demo/src/engine/birthday.js in demo/tests/birthday.test.js...
```
- [ ] `birthday.test.js` 업데이트됨
- [ ] `npx vitest run` 실행 → 전부 green

### Step 5 — Screenshot 저장
- [ ] 터미널 green 화면 스크린샷 → `logs/<date>-after-test.png`
- [ ] `demo/index.html?after` 브라우저에서 생년월일 입력 → UI 스크린샷 → `logs/<date>-after-ui.png`

### Step 6 — Hook 차단 시연 (빨강 → 초록)

**빨강 ①: main 차단**
```bash
git checkout main
git add -A && git commit -m "test: hook demo"
# → ❌ Direct commits to main branch are not allowed.
```
- [ ] 차단 메시지 확인
```bash
git checkout add-birthday-seed   # 복귀
```

**빨강 ②: plans 없으면 차단**
```bash
# plans/active 임시 비우기
mv plans/active/add-birthday-seed.md /tmp/
git add -A && git commit -m "test: no plan"
# → ❌ No plan file found in plans/active/
mv /tmp/add-birthday-seed.md plans/active/   # 복구
```
- [ ] 차단 메시지 확인

**빨강 ③: test 실패 차단**
```bash
# birthday.test.js에 의도적으로 failing assertion 추가
# expect(1).toBe(2) 한 줄
git add -A && git commit -m "test: failing"
# → ❌ verify-tasks 실패
# 코드 복구
```
- [ ] 차단 메시지 확인

**초록: 전부 통과**
```bash
git add -A && git commit -m "feat: add birthday seed lucky numbers"
# → ✅ pre-commit checks passed
```
- [ ] commit 성공 확인
- [ ] 청중에게 설명: "Architectural constraints — 말이 아니라 실패로 막습니다"

### Step 7 — Push & Merge
```bash
git push origin add-birthday-seed
git checkout main
git merge add-birthday-seed
git push origin main
```
- [ ] GitHub에서 main 반영 확인 (선택: 화면 공유)

### Step 8 — Plan 이동 (Garbage collection 시연)
```bash
mv plans/active/add-birthday-seed.md plans/completed/
# main 직접 commit이므로 hook bypass (housekeeping 예외)
git add -A && git commit --no-verify -m "chore: complete add-birthday-seed plan"
git push origin main
```
- [ ] `plans/completed/add-birthday-seed.md` 이동 확인
- [ ] 청중에게 설명: "Garbage collection — 완료된 context를 정리합니다"

---

## 폴백 계층

| 상황 | 대응 |
|---|---|
| Cline 안 됨 | 미리 작성한 `birthday.js` 보여주고 diff 설명 |
| 시연 3분 초과 | `git checkout after-complete && open demo/index.html?after` |
| 전체 시연 불가 | `slides/outline.md` 스크린샷 섹션 넘기며 내레이션 |

---

## 마무리 발언 (Closing)

> "Harness engineering도 하나의 흐름입니다.
> 오늘 본 3 pillar와 8단계를 무조건 따르기보다,
> 여러분의 repo, 팀, 정책에 맞추어 조정해서 쓰시는 것이 가장 좋습니다."
