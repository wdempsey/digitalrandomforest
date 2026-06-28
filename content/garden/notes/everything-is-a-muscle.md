---
title: "Everything Is a Muscle"
description: "A seed note on how skills degrade — gracefully or silently — and why AI makes maintaining the right ones a deliberate practice."
kind: note
status: seed
version: v1
topics: [ai-workflows, judgment, research]
tags: [note, skills, human-capital, writing, deskilling, ai]
date: 2026-06-27
updated: 2026-06-27
draft: false
sketch: ""
---

Every skill behaves like a muscle. It is built through repetition, held through use, and quietly lost when the work that maintained it moves elsewhere. The interesting question is not whether skills decay — they do — but that they decay *differently*, and some of that decay is much harder to notice than others.

## Two axes of a skill

It helps to separate two things we usually run together.

The first is whether a skill is **explicit or implicit**. Taking a derivative is explicit: the steps are nameable, and if I am rusty I can feel myself reconstructing them. Driving a car is implicit: the competence lives in the body, not in a procedure I could recite. Both can be deeply ingrained, yet they are stored and retrieved in very different ways.

The second is how the skill **degrades over time**. Athletic skill degrades *visibly*. A former ballplayer still knows how to swing — the motor program survives — but the body can no longer execute it at the old speed, and everyone, including him, can see it. Other skills degrade *silently*. The procedure feels intact, the output still looks plausible, and nothing announces that the underlying capability has thinned out.

The dangerous quadrant is the implicit skill that degrades silently. There is no radar gun to tell you it has happened.

![A two-by-two of how skills degrade: explicit versus implicit on the horizontal axis, visible versus silent decay on the vertical. Taking a derivative is explicit and its rust is visible; a baseball swing is implicit and visibly slows; mental arithmetic is explicit but quietly outsourced; writing your own prose is implicit and atrophies unnoticed — the dangerous quadrant.](/assets/figures/everything-is-a-muscle-matrix.svg "Skills sorted by how they're stored and how their decay shows — the silent, implicit corner is the one to watch.")

## What economists call this

Economists study this under **human capital depreciation**, and the vocabulary is sharper than the gym metaphor. Technical skill obsolescence splits into two mechanisms: *wear*, where a skill erodes through overuse, and *atrophy*, where it erodes through disuse — the literal "use it or lose it." Distinct from both is *economic* obsolescence, where your skill is intact but the market price of it falls because the world changed around you. ([Walter & Lee, task-based view of depreciation](https://archive.headconf.org/head21/wp-content/uploads/pdfs/13078.pdf))

Two empirical regularities are worth carrying into the AI conversation. First, depreciation is faster for *specific* skills than for *general* ones, and faster for the high-skill human capital acquired through advanced training. ([Dinerstein, Megalokonomou & Yannelis, *Human Capital Depreciation and Returns to Experience*](https://www.nber.org/system/files/working_papers/w27925/w27925.pdf)) The skills we are proudest of are not exempt; if anything they are more perishable. Second, the economics literature leans on the **tacit vs. explicit knowledge** distinction — tacit knowledge being the "know-how" that resists being written down, explicit knowledge being what we can codify into a document, a formula, a prompt. Tacit knowledge is exactly the part that depreciates without a paper trail.

There is also a direct precedent for what over-delegation does to a skilled professional: aviation's **automation complacency**. As cockpits automated, human-factors researchers at NASA Ames warned as early as 1989 that manual flying skill was deteriorating from disuse, and the FAA has since pushed to preserve manual proficiency precisely because the erosion is invisible until the automation disengages. ([FAA on erosion of manual piloting skills](https://www.flightglobal.com/safety/faa-urges-icao-to-address-erosion-of-manual-piloting-skills/134452.article)) The pilot's stick-and-rudder skill is an implicit skill that degrades silently — the muscle nobody watches until the day it is needed.

## The new muscles, and the ones that backseat

AI rearranges which muscles get worked. Some skills that used to be optional are now load-bearing: holding the macro picture of a project, scoping ambiguous work, deciding what is worth building, and reviewing partial output well enough to integrate it. These are growing precisely because delegation makes them the binding constraint — the argument in [[garden/notes/academics-as-ai-managers|Academics as AI Managers]].

But the same shift quietly retires other muscles. For an LLM-assisted writer, the thing that atrophies is **writing itself**. The recent work on cognitive offloading is blunt about the mechanism: it is not the presence of the tool that erodes the skill, it is the act of delegating the thinking to it. When writing becomes supervising generated text rather than constructing an argument, the higher-order reasoning that writing used to force simply stops happening. ([cognitive offloading and critical thinking](https://www.psypost.org/ai-tools-may-weaken-critical-thinking-skills-by-encouraging-cognitive-offloading-study-suggests/))

This is the case I care about most, because it is the silent-degradation quadrant for academics. Even for an excellent academic writer, leaning too hard on a model costs two things at once. The obvious loss is **voice** — the idiosyncratic texture that made the prose yours. The deeper loss is the **writing process** as a tool of thought. For most researchers, working through the writing *is* the working through the argument; the sentences are where you discover that you didn't actually understand the step you thought you had. Outsource the drafting and you don't just lose the wording, you lose the place where the thinking happened — which connects to staying inside the reasoning loop rather than becoming an [[garden/notes/researchers-are-not-end-point-verifiers|end-point verifier]].

## The practice

If skills are muscles, the implication is unglamorous but clear: the ones you want to keep, you have to keep working, on purpose, even when a tool will do them for you. The pilot still flies a few manual approaches. The writer still drafts the hard paragraph by hand before asking for help on it. The point is not to refuse the tool but to keep deliberately exercising the implicit, silently-degrading skills the tool would otherwise let you stop using — because those are the ones that will be thin exactly when you can't tell they've thinned.

## Open question

Which of a researcher's skills are safe to let the model carry, and which are load-bearing for thinking itself and must be protected from disuse? A first cut: delegate the explicit, recoverable skills freely; guard the implicit ones that degrade without warning. But the boundary is not obvious, and drawing it well may itself be one of the new muscles.
