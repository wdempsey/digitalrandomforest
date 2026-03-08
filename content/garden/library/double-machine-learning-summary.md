---
title: "Double Machine Learning: Reading Notes"
description: "A concise summary of orthogonalization and nuisance estimation in DML."
kind: library
status: growing
version: v1
featured: true
topics: [causal-inference, statistics, research]
tags: [library, dml]
date: 2026-03-07
updated: 2026-03-07
draft: false
sketch: ""
---

Reference: Chernozhukov et al. (2018), "Double/Debiased Machine Learning for Treatment and Structural Parameters."

## Core idea

Estimate nuisance components with flexible ML, then use orthogonal moments so first-stage errors have limited first-order effect on the target parameter.

## Why it matters

It offers a practical bridge between predictive models and inferential goals.

## Implementation note

Cross-fitting is not optional. Without it, overfitting leakage quickly distorts treatment-effect estimation.
