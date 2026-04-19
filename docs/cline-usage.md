# Cline Usage — Live Demo Prompts

This file contains ready-to-paste prompts for the live demo using VSCode + Cline.

---

## Prompt 1 — Write the plan

```
Read AGENTS.md and docs/architecture.md, then create a plan file at
plans/active/add-birthday-seed.md for the following task:

Add a "birthday-seed lucky numbers" feature to the lotto generator.
When a user enters their birth date (YYYY-MM-DD), the app generates
a deterministic set of 6 lucky numbers based on that date.

Requirements:
- Add demo/src/engine/birthday.js with birthdayToSeed(yyyy, mm, dd)
  and generateFromBirthday(yyyy, mm, dd)
- Reuse seededRandom from demo/src/engine/random.js
- Add a birthday input field to demo/index.html
- Write tests in demo/tests/birthday.test.js
```

---

## Prompt 2 — Implement

```
Follow the plan in plans/active/add-birthday-seed.md and implement
the birthday-seed feature. Keep engine functions pure (no DOM in
demo/src/engine/). Update demo/src/ui/ for the input field.
```

---

## Prompt 3 — Write tests

```
Write unit tests for demo/src/engine/birthday.js in
demo/tests/birthday.test.js. Cover:
1. Same birth date → same output array
2. Different birth date → different output array
3. Output satisfies generateLotto invariants (length 6, range, no duplicates, sorted)
```

---

## Fallback (if Cline is unavailable)

Switch to the `after-complete` tag:
```bash
git checkout after-complete
```
Then narrate the code changes from the slides.
