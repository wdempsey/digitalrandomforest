---
title: "Talk-to-Essay Template"
description: "A reusable scaffold for turning a paper or conference talk into a Maggie-Appleton-style essay: slides interleaved with transcript and short screen-recording clips."
kind: essay
status: seed
version: v1
topics: [tools-for-thought, writing]
tags: [template, talks, essays, scaffold, workflow]
date: 2026-06-27
updated: 2026-06-27
draft: false
sketch: ""
---

<!--
============================================================
 HOW TO USE THIS TEMPLATE
============================================================
Duplicate this file to content/garden/essays/<your-talk-slug>.md,
set draft: false when ready, and replace the placeholders below.

The shape is the one Maggie Appleton uses on /zero-alignment:
  optional full video at the top, then SLIDE -> TRANSCRIPT -> SLIDE,
  with short screen-recording CLIPS dropped in where you demoed
  something live.

THE ONE RULE THAT MATTERS (figure pipeline):
  Every image and every clip must sit ALONE in its own paragraph,
  with a blank line above and below. Two images with no blank line
  between them merge into a gallery grid instead of separate slides.

AUTHORING SYNTAX (no custom components needed):
  Slide image (caption is the bit in quotes):
    ![alt text](/assets/figures/my-talk-01.png "Slide 1 — the hook")

  Screen-recording clip (link text becomes the caption):
    [What I demoed here](/assets/figures/my-talk-demo.mp4)

  YouTube embed (e.g. the full talk recording):
    [Full talk recording](https://youtu.be/VIDEO_ID)

ASSETS:
  - Export each slide to an image -> content/assets/figures/<slug>-NN.png
    (PNG or WebP; keep each under ~400 KB. Send PNGs to me and I'll
    convert/optimize to WebP.)
  - Record demo moments and compress to MP4:
      ffmpeg -i raw.mov -vf scale=1280:-2 -crf 28 -movflags +faststart out.mp4
    -> content/assets/figures/<slug>-demo.mp4
  - The placeholders below all point at /assets/figures/slide-placeholder.svg
    so the page renders before you've made your real slides. Swap them out.

TRANSCRIPT:
  The prose between slides is your spoken narration, lightly edited for
  reading. Aim for 1-3 short paragraphs per slide — the same beats you'd
  hit out loud. This is where the essay does its thinking; don't let it
  collapse into captions. (See the note "Everything Is a Muscle".)
============================================================
-->

Open with a paragraph of context the way Maggie does: what this talk was, where you gave it, and the one-sentence thesis. This sits above everything else and orients the reader before the slides start.

## Video recording

[Full talk recording](https://youtu.be/VIDEO_ID)

<!-- Delete this section if there's no recording. -->

## The talk

![Title slide — talk title and your name.](/assets/figures/slide-placeholder.svg "Slide 1 — title")

Your opening narration goes here. The first beat of the talk: the hook, the framing, why the audience should care. Keep it to the rhythm of speech.

![The problem you're setting up.](/assets/figures/slide-placeholder.svg "Slide 2 — the problem")

The transcript for slide two. One or two short paragraphs carrying the argument forward. Each slide earns its own block of prose; resist merging them.

[Live demo — what you showed running here](/assets/figures/slide-placeholder.svg)

<!--
  ^ This is a CLIP slot. When you have the real screen recording,
  point it at a .mp4 (e.g. /assets/figures/my-talk-demo.mp4) and the
  pipeline renders an inline <video> with controls. Until then it
  shows the placeholder image. The link text becomes the caption.
-->

After the demo, a sentence or two reflecting on what just happened on screen — the point the live moment was meant to make.

![The turn — your core claim or reframe.](/assets/figures/slide-placeholder.svg "Slide 3 — the turn")

The heart of the argument. This is usually the slide you spent the most words on out loud, so give it the most prose here too.

![Where this leaves us.](/assets/figures/slide-placeholder.svg "Slide 4 — implications")

Land the implication. What changes if the audience believes you.

## Closing

![Closing slide — the one line you want remembered.](/assets/figures/slide-placeholder.svg "Slide 5 — close")

Your closing narration. End on the same line you ended the talk on, then add any links — slides, paper, a contact form — the way Maggie links out to the Ace preview at the end of hers.
