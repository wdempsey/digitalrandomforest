---
title: "LLM Context Budget for Research"
description: "How to allocate context so research assistants stay useful."
kind: note
status: seed
version: v1
topics: [ai-workflows, research, tools-for-thought]
tags: [note, prompting]
date: 2026-03-07
updated: 2026-03-07
draft: false
sketch: ""
---

A useful pattern is to divide context into three layers:

1. stable project constraints
2. current question and data slice
3. expected output format

When the model fails, it is usually because one of these layers was underspecified.
