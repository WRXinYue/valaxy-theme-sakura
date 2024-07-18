#!/bin/sh
git stash -k -u -q --include-untracked

git add -u

pnpm lint
if [ $? -ne 0 ]; then
  echo "Linting failed"
  git stash pop -q
  exit 1
fi

pnpm stylelint
if [ $? -ne 0 ]; then
  echo "Stylelint failed"
  git stash pop -q
  exit 1
fi

pnpm typecheck
if [ $? -ne 0 ]; then
  echo "Typecheck failed"
  git stash pop -q
  exit 1
fi

git stash pop -q

exit 0
