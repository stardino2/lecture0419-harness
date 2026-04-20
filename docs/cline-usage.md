# Cline Usage — Live Demo Prompts

This file contains ready-to-paste prompts for the live demo using VSCode + Cline.

---

## Prompt 1 — Write the plan

```
Read AGENTS.md and docs/architecture.md, then create a plan file at
plans/active/<feature>.md for the following task:

[feature description]
```

---

## Prompt 2 — Implement

```
Follow the plan in plans/active/<feature>.md and implement
the feature. Keep engine functions pure (no DOM in
demo/src/engine/). Update demo/src/ui/ for any input field changes.
```

---

## Prompt 3 — Write tests

```
Write unit tests for demo/src/engine/<feature>.js in
demo/tests/<feature>.test.js. Cover determinism, correctness,
and generateLotto invariants (length 6, range, no duplicates, sorted).
```

---

## Fallback (if Cline is unavailable)

Switch to the `after-complete` tag:
```bash
git checkout after-complete
```
Then narrate the code changes from the slides.
