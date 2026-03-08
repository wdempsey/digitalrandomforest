---
title: "What Makes a Reproducible AI Workflow?"
description: "A practical definition of reproducibility for LLM-assisted data science."
kind: essay
status: seed
version: vFinal
topics: [software-methods, ai-workflows, data-science]
tags: [essay, reproducibility]
date: 2026-03-07
updated: 2026-03-07
draft: false
sketch: ""
---

Reproducibility in AI-assisted research is not only rerunning code. It is rerunning judgment.

## Minimal reproducibility contract

A workflow is reproducible when a peer can recover:

- the input data state
- the prompt and context state
- the model/runtime state
- the decision log connecting alternatives to final choices

Without all four, we can reproduce artifacts but not reasoning.

## Practical implication

Methods sections should start linking to workflow logs, not just final scripts.

That would make review less performative and more inspectable.
