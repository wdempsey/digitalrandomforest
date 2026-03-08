# Design Notes

## Editorial browsing goals

This pass improves wandering paths without turning browsing into the primary experience. Reading comfort remains the center, with exploration presented as calm secondary guidance.

## What changed

- Added a lightweight editorial top navigation (`TopNav`) to keep section movement obvious but quiet.
- Replaced default metadata with scholarly labels (`Published`, `Updated`, `Status`, `Version`) using `ScholarlyMeta`.
- Added subtle local exploration behavior:
  - `ReadNext` component on content pages (topic-overlap based, minimal list)
  - `TopicConnections` component on topic pages (grouped by kind)
- Refined listing cards in `PageList` to show short description, kind, status, and topic chips.
- Reworked Garden + section index pages to include explicit start paths and gentle cross-links.
- Rewrote topic pages so each acts like an editorial entry point, then hands off to related writing below.

## Browsing structure decisions

- **Garden** is the orientation hub with suggested wander paths.
- **Essays / Notes / Patterns / Library** each have short editorial framing plus links onward.
- **Library** is framed as the most academic section: polished literature notes and method summaries, but still notebook-like rather than journal-formal.
- **Topics** are orthogonal overlays. Content keeps its home in Garden sections while surfacing under topic pathways via frontmatter topics and topic-driven related lists.

## Why this is maintainable

- Topic behavior is based on existing frontmatter (`topics`) and lightweight component logic.
- No faceted UI, no heavy filtering controls, no custom data pipelines.
- Most guidance remains simple Markdown links plus two small reusable components.

## Visual tone updates

- Kept warm paper palette and generous spacing.
- Further softened list views into readable cards.
- Kept graph/backlinks available but visually subordinate through placement and low-contrast styling.

## Quartz tradeoffs

- Quartz does not provide topic-overlap "read next" out of the box, so this was added as a small component rather than a plugin-level system.
- Topic landing behavior is implemented in components and content pages, avoiding a separate taxonomy engine.
