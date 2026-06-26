---
title: "AI as a Copilot for Statistical Thinking"
description: "Where language models help in statistics, and where they should be constrained."
kind: essay
status: growing
version: v2
topics: [ai-workflows, statistics, research]
tags: [essay, workflow, sketch]
date: 2026-03-07
updated: 2026-03-07
draft: false
sketch: "/assets/sketches/copilot-loop.svg"
sketchAlt: "Notebook-style loop from research question through assumptions and revision"
---

The promise of AI in statistics is not full automation. It is better scaffolding for careful thought.

A useful copilot helps with:

- generating alternative model specifications
- surfacing assumptions that are currently implicit
- accelerating routine transformations and checks

A risky copilot replaces identification logic with fluent text.

## A working heuristic

I now treat LLM output as a proposal generator, not an authority source.

That means every workflow pass includes an explicit checkpoint:

1. state estimand
2. state assumptions
3. state failure modes
4. only then accept generated code or prose

## Closing thought

The core shift is social, not just technical: we need norms for when to trust speed and when to defend slowness.
