---
title: "Paper-to-Prototype Loop"
description: "A repeatable loop from literature notes to executable workflow tests."
kind: pattern
status: growing
version: v1
topics: [ai-workflows, software-methods, research]
tags: [pattern, workflow]
date: 2026-03-07
updated: 2026-03-07
draft: false
sketch: ""
---

## Pattern

Move from reading to implementation in four passes:

1. summarize the paper claim in plain language
2. extract assumptions and data requirements
3. build a small executable prototype
4. write a short reflection on mismatch between theory and implementation

## Tiny code scaffold

```python
from dataclasses import dataclass

@dataclass
class WorkflowPass:
    claim: str
    assumption_check: str
    prototype_result: str
    reflection: str
```

This keeps method interpretation tied to concrete artifacts.
