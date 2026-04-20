# Lecture0419 — Harness Engineering Demo

강의 자료와 라이브 시연 코드가 함께 있는 repo입니다.

## 강의 개요

**주제:** Harness Engineering 10분 강의 (삼성전자 월례회)
**도구:** VSCode + Cline 확장 (Codex 대신)
**시연:** 로또 번호 추출기에 생년월일 seed 기능 추가

## 폴더 구조

```
AGENTS.md            ← agent 목차 (여기서 시작)
scripts/lecture-script.md ← 강의 대본 (슬라이드별 내레이션)
slides/outline.md    ← 슬라이드 구조 초안
scripts/demo-run.md  ← 발표자 시연 체크리스트
docs/                ← 아키텍처·테스트·UI 검증·Cline 프롬프트
plans/               ← active (진행중) / completed (완료)
logs/                ← 테스트 screenshot, commit message draft
demo/                ← 로또 시연 코드 (index.html + src/ + tests/)
```

## 빠른 시작

```bash
npm install
npx vitest run    # 테스트 실행
open demo/index.html  # 브라우저에서 UI 확인
```

## Harness 3 Pillar (OpenAI 공식)

| Pillar | 이 repo 내 매핑 |
|---|---|
| Context engineering | `AGENTS.md` + `docs/` + `plans/active/` |
| Architectural constraints | `src/engine` (pure) ↔ `src/ui` 분리, `.husky/pre-commit` |
| Garbage collection | `plans/active → completed`, `logs/` 정리, size 제한 |
dummy
dummy
