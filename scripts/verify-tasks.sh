#!/bin/bash
set -e

echo "🔍 Lint..."
npx eslint demo/src/ demo/tests/

echo "🧪 Unit Tests..."
npx vitest run

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
