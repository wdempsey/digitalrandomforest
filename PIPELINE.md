# Pipeline

How ideas move through the garden, and the rhythm that keeps it growing. This is a
**broad research notebook** — organized by growth stage and topic rather than a single
thesis. The goal is breadth that stays connected, not a pile of files.

---

## Content types

- **Note** — one clear claim or question. The connective tissue of the garden.
- **Library** — source-guided reading or technical summary (papers, methods).
- **Pattern** — a reusable workflow or teaching move.
- **Essay** — a sustained argument that connects several notes.

## Growth stages

Every page wears an honest status (it shows as a glyph on the homepage):

- 🌱 **seed** — a single claim or rough sketch. Thin is fine; just label it seed.
- 🌿 **growing** — developed, linked to neighbors, actively tended.
- 🌳 **evergreen** — stable and well-connected; revised occasionally, not abandoned.

The trust comes from honesty: a reader forgives a thin "seed," not a thin page
pretending to be "evergreen."

## Maturation flow

```
backlog (phrase / source / question)
   → seed note (one clear claim)
      → growing note (developed + linked)
         → evergreen
essays emerge when several growing notes share an argument
```

`content/garden/notes/topic-backlog.md` is the inbox. Promote out of it when an idea
has a clear claim (→ note), is source-guided (→ library), is a reusable move
(→ pattern), or has grown into a sustained argument across notes (→ essay).

## Two rules that keep breadth coherent

1. **Topics are the primary navigation.** With no single spine, each topic page
   should read as its own entry point and mini reading path. A visitor should be able
   to start from whatever drew them in.
2. **Every new note links to at least one existing note.** This single discipline is
   what turns a wide collection into a connected garden.

## Figures

A piece earns a figure when an idea is easier to *see* than to say (a loop, a
contrast, a flow). The loop: I draft a shot list per piece → diagrams are authored as
in-repo SVG, illustrations generated in Gemini from the locked style in
`FIGURE_STYLE_KIT.md` → optimized to WebP in `content/assets/figures/` → embedded with
a caption. Not every note needs one; heroes and key essays benefit most.

---

## Frontmatter convention

Keep new pages consistent:

```yaml
---
title: "..."
description: "..."        # one line; also feeds previews + social cards
kind: note | essay | library | pattern
status: seed | growing | evergreen
topics: [ai-workflows, statistics, ...]
tags: [...]
date: YYYY-MM-DD          # planted
updated: YYYY-MM-DD
draft: false
sketch: "/assets/figures/...webp"   # optional hero; shows on homepage card
sketchAlt: "..."                    # required if sketch is set
featured: true                      # at most one essay; drives the homepage hero
---
```

---

## Publishing cadence

Not a content calendar — a recurring light **tending pass** (scheduled for Sundays and
Wednesdays). Each pass, in ~15 minutes:

1. Promote one or two backlog items into seed notes.
2. Advance one seed → growing: add links to neighbors, tighten the claim, add a figure
   if it earns one.
3. Update `content/now.md` if your focus has shifted.

The homepage "Recently tending" row then surfaces the rhythm automatically. `Now` is
the heartbeat — give it a real refresh roughly monthly. Consistency of small passes
beats occasional big pushes; the garden metaphor is the point — slow accumulation.
