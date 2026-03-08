---
title: "Identification Before Automation"
description: "A short reminder that causal identification must come before tooling speed."
kind: note
status: growing
version: v1
topics: [causal-inference, ai-workflows, statistics]
tags: [note, causal-inference]
date: 2026-03-07
updated: 2026-03-07
draft: false
sketch: ""
---

Before asking an assistant to produce code, I ask a narrower question:

What exactly is the estimand?

For average treatment effect:

$$
ATE = E[Y^1 - Y^0]
$$

If the estimand is unclear, faster code only accelerates confusion.

Related:

- [[topics/causal-inference|Causal Inference]]
- [[garden/library/double-machine-learning-summary|Double Machine Learning: Reading Notes]]
