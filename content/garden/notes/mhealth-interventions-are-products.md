---
title: "mHealth Interventions Are Products"
description: "A seed note on why mobile health trials should treat engagement as part of the intervention, not merely as compliance."
kind: note
status: seed
version: v1
topics: [mhealth, clinical-trials, product-thinking, engagement]
tags: [note, mhealth, clinical-trials, engagement, products]
date: 2026-07-07
updated: 2026-07-07
draft: false
sketch: ""
---

Mobile health interventions should be understood as products, not only as scientific treatments.

This feels obvious from a product perspective and strangely uncomfortable from a clinical-trial perspective. In trials, engagement is often treated as adherence, exposure, compliance, or implementation fidelity. Those are useful concepts, but they can make engagement feel like a secondary measurement problem: did the participant receive enough of the intervention for us to estimate an effect?

For mHealth, that framing is too thin. Engagement is not merely a measurement artifact. It is often part of the mechanism.

Paul Graham's [[https://www.paulgraham.com/ds.html|Do Things that Don't Scale]] is useful here because the essay argues that early products improve through direct, high-touch engagement with users. The point is not just user acquisition. The point is learning. Founders recruit users manually, watch what they do, delight them, and use the feedback loop to make the product better. In early product work, high engagement is not suspicious. It is evidence that the loop is alive.

Clinical trials can fall into the trap of science: we want clean estimation, standardized delivery, and separation between the intervention and the human messiness around it. Those instincts protect against real threats. But if we let them dominate, we risk building interventions that are scientifically tidy and experientially dead.

The product view asks different questions:

- Why would a participant want to come back tomorrow?
- What makes the intervention feel useful at the moment of need?
- Which parts of the experience create trust, momentum, and repeated contact?
- What does high engagement teach us about fit between intervention and life?
- Which unscalable forms of support should we use early because they reveal what should later be designed into the system?

This does not mean every mHealth study should optimize engagement at all costs. Engagement can be gamed. Notifications can become coercive. More app opens are not automatically better health. But low engagement should not be treated as a boring implementation detail. It may be a substantive signal that the intervention does not yet understand its users.

The scientific version of product thinking is not "growth hacking for trials." It is a disciplined feedback loop: treat participant attention, trust, usability, burden, and repeated use as part of the intervention system. Then study how those features mediate, moderate, or undermine the clinical effect.

But product mentality is not a replacement for theory.

mHealth needs both a product-driven perspective and a theory-driven perspective. Product thinking asks whether the intervention fits into a person's life well enough to be used. Theory asks what mechanism the intervention is supposed to change: self-efficacy, craving, stress regulation, social support, habit formation, reinforcement learning, decision salience, planning, or something else.

We often conflate these two. A highly engaging app can still be theoretically empty. A theory-driven intervention can still fail because no one wants to use it. The product layer is about fit, timing, usability, trust, and repeated contact. The theory layer is about mechanism, causal structure, and why the intervention should change behavior or health.

The hard work is not choosing between product and theory. It is making them discipline each other.

## Working Claim

mHealth trials should treat interventions as products whose engagement patterns are scientifically meaningful, while also preserving a theory-driven account of what the intervention is supposed to change. High engagement is not a threat to rigor by default. It can be a sign that the intervention is becoming usable, trusted, and embedded in daily life. But engagement is only scientifically useful if we can connect it to a plausible mechanism.

## Product Thinking Versus Theory

Product thinking and theory-driven intervention design answer different questions.

Product thinking asks:

- Does this fit into daily life?
- Does the participant trust it?
- Is the timing right?
- Is the burden reasonable?
- Does the experience create enough value that people return?

Theory asks:

- What psychological, behavioral, social, or physiological mechanism are we targeting?
- What proximal outcome should move first?
- Why should this component change that outcome?
- What mediators and moderators should we expect?
- What failure would falsify our theory rather than merely show low uptake?

The trap is to let product thinking become atheoretical engagement optimization, or to let theory become an elegant diagram attached to an unusable intervention. Good mHealth trial design needs both.

## The Trap of Science

The trap is thinking that scientific seriousness requires distance from product concerns.

That can lead to several bad habits:

- treating user experience as polish rather than mechanism
- treating engagement as compliance rather than evidence
- treating personalization as a threat to standardization rather than a source of fit
- treating high-touch support as contamination rather than early-stage learning
- treating participant enthusiasm as marketing rather than information

The deeper problem is that a trial can estimate an effect for an intervention that no one would choose to use.

## What This Could Change

- Pilot studies should include product-discovery work, not only feasibility metrics.
- Engagement should be modeled as part of the causal system, not only as missingness or adherence.
- Some early unscalable work may be scientifically valuable because it reveals what the scalable intervention needs to become.
- Trial protocols should distinguish manipulative engagement from meaningful engagement.
- mHealth teams need product, design, behavioral science, and statistical thinking in the same loop.
- Intervention development should ask whether product decisions are strengthening the hypothesized mechanism or merely increasing activity.
- Theory should be updated when product discovery reveals that the original model of the user's life was wrong.

## Open Questions

- When is engagement part of the treatment mechanism, and when is it a misleading proxy?
- How should trials handle unscalable human support during early intervention development?
- What engagement metrics correspond to trust, timing, and usefulness rather than mere app activity?
- How do we preserve rigor while allowing the intervention to become more product-like?
- What would a clinical trial look like if participant experience were treated as a primary scientific object?
- How do we tell the difference between engagement that activates the mechanism and engagement that only reflects novelty, gamification, or compliance?

## Connections

This connects to [[garden/notes/identification-before-automation|Identification Before Automation]] because the estimand matters: are we estimating the effect of a static content package, a product experience, or an adaptive service embedded in daily life?

It also connects to [[garden/essays/why-data-sciences-future-is-an-ecosystem-story|Why Data Science's Future Is an Ecosystem Story]]. A mature data science ecosystem should not split product learning, causal inference, and implementation into separate worlds. For mHealth, the intervention lives at their intersection.
