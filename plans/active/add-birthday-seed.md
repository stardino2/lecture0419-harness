# add-birthday-seed

**목표:** 생년월일을 seed로 로또 번호를 결정적으로 생성하는 기능 추가

## 작업 범위
- `demo/src/engine/birthday.js` — `birthdayToSeed`, `generateFromBirthday` 구현
- `demo/tests/birthday.test.js` — 6개 테스트 케이스 작성
- UI: `demo/index.html`에 `?after` 파라미터로 생년월일 입력 필드 표시

## 완료 조건
- `npx vitest run` 전체 green
- 동일 생년월일 → 동일 번호 (결정성 검증)
- 하루만 달라도 다른 번호 (seed 민감도 검증)
