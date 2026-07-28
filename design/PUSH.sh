#!/usr/bin/env bash
# Ship the print-tech redesign and consolidate every branch onto main.
#
#   cd /Users/wdem/Documents/github/digitalrandomforest
#   bash design/PUSH.sh
#
# Sequence:
#   1. commit the redesign on codex/fix-persistent-connections (3 commits)
#   2. push that branch and codex/fix-mac-sidenotes
#   3. merge both into main
#   4. push main
#
# Nothing here touches content/. Every step echoes before it runs, and the
# script aborts on the first failure.

set -euo pipefail
cd "$(dirname "$0")/.."

BRANCH_DESIGN="codex/fix-persistent-connections"
BRANCH_SIDENOTES="codex/fix-mac-sidenotes"

echo "==> 0. Clear the stale git lock"
if pgrep -x git >/dev/null 2>&1; then
  echo "    A git process IS running. Stop it first, then re-run." >&2
  exit 1
fi
rm -f .git/index.lock
echo "    ok"

echo "==> 1. Remove the palette switcher scaffolding"
# Letterpress is now the default in custom.scss and quartz.config.ts, so the
# three-direction switcher has served its purpose. directions.scss was never
# committed, so deleting it is enough.
rm -f quartz/styles/directions.scss
echo "    ok"

echo "==> 2. Guard: content/ must be untouched"
if [[ -n "$(git status --porcelain -- content/)" ]]; then
  echo "    content/ has changes — stopping so you can review:" >&2
  git status --porcelain -- content/ >&2
  exit 1
fi
echo "    clean"

echo "==> 3. Verify the gates"
npx tsc --noEmit -p tsconfig.json
npx prettier . --check
echo "    tsc + prettier pass"

echo "==> 4. Confirm we are on $BRANCH_DESIGN"
git switch "$BRANCH_DESIGN"

echo "==> 5a. Commit one — formatting baseline"
git add .prettierrc .prettierignore
git add CONTENT_STYLE_GUIDE.md FIGURE_STYLE_KIT.md PIPELINE.md \
        QUARTZ_DESIGN_TARGET.md SITE_IDENTITY.md TYPOGRAPHY_AND_FIGURES_PLAN.md \
        quartz.layout.ts quartz/components/ReadNext.tsx \
        quartz/components/scripts/homecover.inline.ts \
        quartz/plugins/transformers/figures.ts \
        quartz/plugins/transformers/sidenotes.ts
git commit -m "Add missing Prettier config and format to house style

The repo had no .prettierrc, so bare prettier defaulted to semicolons at 80
columns and reported every file as non-conforming — npm run check could never
pass. Restore Quartz's actual style (no semicolons, 100 columns) and format the
12 files that were genuinely non-conforming.

content/ is added to .prettierignore: prose is authored by hand, and Prettier's
list-marker and emphasis normalisation creates noisy diffs mid-draft."

echo "==> 5b. Commit two — type errors"
git add quartz/components/HomeCover.tsx quartz/components/PageList.tsx \
        quartz/components/ScholarlyMeta.tsx quartz/components/TopicConnections.tsx
git commit -m "Fix 13 TypeScript errors blocking npm run check

- HomeCover, PageList: honour the FullSlug/SimpleSlug brands instead of raw
  strings, so resolveRelative and the slug Map typecheck.
- TopicConnections: return early on a missing slug rather than defaulting to
  \"\", which widened the type to FullSlug | \"\".
- ScholarlyMeta: read frontmatter through optional chaining; the ?? {} fallback
  widened the type to {} and lost every field."

echo "==> 5c. Commit three — the redesign"
git add quartz.config.ts quartz/styles/custom.scss quartz/components/Head.tsx \
        REDESIGN_PROMPT.md design/
git commit -m "Print-tech redesign: Letterpress palette and structural pass

Palette — \"Letterpress\". Warm paper carried over from the original identity,
ink dropped to near-black, oxblood as the single spot colour. Fixes a real
defect: the previous sage accent was 3.47:1 on parchment, below WCAG AA for
link text. Oxblood is 6.9:1 light / 7.2:1 dark, body text 15.2:1 both modes.

Oxblood is STRUCTURAL only — links, section numbers, active state, figure
labels. Never semantic state: it sits ~30 ΔE from the shiki keyword red and
near the danger/warning callouts, and the separation depends on it staying
dark and low-chroma while those stay bright and saturated.

Structure (custom.scss, CSS-only — no component markup changed):
- ScholarlyMeta renders as a ruled spec sheet, not a dot-separated line
- CSS counters number essay h2s, scoped to reading pages only
- IBM Plex Mono promoted from code-only to the site's labelling voice
- Squared chips, mono captions, numbered ruled backlinks, spec-row listings
- Growth stage moves from emoji to a typographic fill ramp (open/half/filled)

The structural layer references design tokens only and contains no literal
colours, so retheming means editing the :root block and quartz.config.ts
theme.colors together, and nothing else.

Also drops generateSocialImages from quartz.config.ts — a dead key no emitter
reads, since CustomOgImages was never registered.

design/palette-preview.html is kept as a record of the three directions
considered (Ledger, Letterpress, Blueprint) and the contrast maths behind
the choice. It lives outside content/ so Quartz never builds it."

echo "==> 6. Push both feature branches"
git push -u origin "$BRANCH_DESIGN"
git push origin "$BRANCH_SIDENOTES"

echo "==> 7. Consolidate onto main"
git switch main
git pull --ff-only origin main

echo "    merging $BRANCH_SIDENOTES (fast-forward expected)"
git merge --no-edit "$BRANCH_SIDENOTES"

echo "    merging $BRANCH_DESIGN"
# Pre-flight showed the sidenote hunk still applies cleanly on top of the
# redesign, so this should auto-resolve. If it does not, git will stop here:
# resolve quartz/styles/custom.scss, then `git add` it and `git commit`.
git merge --no-edit "$BRANCH_DESIGN"

echo "==> 8. Re-verify after the merge"
npx tsc --noEmit -p tsconfig.json
npx prettier . --check
npx quartz build
echo "    build OK"

echo "==> 9. Push main"
git push origin main

echo
echo "Done."
git log --oneline --graph -8
echo
echo "Branch state:"
git branch -vv
