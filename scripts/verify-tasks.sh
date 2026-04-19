#!/bin/bash
set -e

# Resolve node_modules for git worktrees
if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies (worktree first run)..."
  npm install
fi

echo "🔍 Lint (basic checks)..."
# Lightweight syntax check — no external config deps
node --input-type=module << 'EOF'
import { readdir } from "fs/promises";
import { pathToFileURL } from "url";
const files = await readdir("demo/src/engine");
for (const f of files) {
  if (!f.endsWith(".js")) continue;
  const url = pathToFileURL(`demo/src/engine/${f}`).href;
  await import(url);
}
console.log("  syntax OK:", files.filter(f => f.endsWith(".js")).join(", "));
EOF

echo "🧪 Unit Tests..."
./node_modules/.bin/vitest run

echo "🏗️  Build check..."
test -f demo/index.html || { echo "❌ demo/index.html not found"; exit 1; }

echo "📦 src size..."
MAX_KB=500
ACT=$(du -sk demo/src/ | cut -f1)
if [ "$ACT" -gt "$MAX_KB" ]; then
  echo "❌ demo/src/ is ${ACT}KB — exceeds limit of ${MAX_KB}KB"
  exit 1
fi

echo "✅ verify-tasks complete"
