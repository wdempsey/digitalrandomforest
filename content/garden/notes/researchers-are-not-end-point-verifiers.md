---
title: "Researchers Are Not End-Point Verifiers"
description: "A short note on why AI-assisted researchers need to stay inside the reasoning loop."
kind: note
status: seed
version: v1
topics: [ai-workflows, research, judgment]
tags: [ai, research, judgment, workflows]
date: 2026-06-25
updated: 2026-06-25
draft: false
sketch: ""
---

My professional goals this summer are: (1) improve my understanding of AI workflows and how they can boost productivity; (2) re-examine my mentoring, research, and teaching philosophies in the age of AI. I refer to Goal 1 as *Going AI Native* and Goal 2 as *WTF is my job now?*. As I try to point out in [[garden/essays/why-data-sciences-future-is-an-ecosystem-story|Why Data Science's Future Is an Ecosystem Story]], data science has built a strong culture of data sharing, reproducible software, and data challenges. The significance of this culture shift in the 2010s is understated even today.  When people cite the impact of AI in data science, I think it is built on a foundation of open science.  If we didn't have the open data, then AI models wouldn't be able to train on them and improve their in-context understanding of those domains.  If we didn't have reproducible, well-documented software, the AI would not have guidance on best practices and how to solve important data science problems. Oddly, this discussion brought me back to the importance of workflows in the AI era.

I know I'm a bit unusual in that I genuinely enjoy learning new workflows. For 3–4 years, I was deep into Emacs, inspired by my friend [Brandon Willard](https://brandonwillard.github.io/)'s approach to programming and workflow customization. There’s something addictive about mastering keyboard shortcuts and iterating on your setup. Eventually, during my *get shit done* postdoc era, I realized I didn’t have the bandwidth to keep tinkering at that level and moved on. Later, after getting tenure, I spent a summer learning NeoVim + Vim motions (the Primeagen), and improving my iTerm setup ([Typecraft](https://www.youtube.com/watch?v=ZDV4edcaXSY)). I definitely got lost in that rabbit hole for way too long.  I still use Vim motions in Cursor but NeoVim took a backseat as I had another *get shit done* window of time.  

Optimizing workflows is a great way to procrastinate.  Trying to *Go AI Native* (goal 1) has furthered  workflows lea the same problem.  Want to go AI Native? 

But then I saw

A colleague who sits between statistics and computer science summarized their experience of working with each set of students as follows: ``Computer science students . 

 As an academic, I typically have 4--6 PhD students who I meet with regularly

The parallels with monitoring software systems were striking.  I was watching a recent Google talk on "Ecosystems as co-evolving networks" in which Adam Bender discusses ([[https://youtu.be/2n41YjR5QfU?t=1702|why rollbacks work today]]).  For those less aware, a software rollback is loosely: (1) we release a software update, (2) bad stuff begins to happen and gets reported before the software hits production (goes live), (3) we go *oopsie* and rollback the update to ensure it doesn't get deployed, (4) we look into the issue and find patches, (5) we then release the less buggy software update.  The whole system works because software is released **slower** than it takes time to detect issues.


AI-assisted researchers should not imagine themselves as end-point verifiers.

The weak version of AI collaboration is: give the model a question, let it perform an internal research loop, and then check whether the final answer looks right. In that setup, the human shows up too late. Judgment becomes a final inspection step rather than an active part of the work.

The stronger version is closer to the relationship between a graduate student and an advisor. A good advisor is not simply waiting for the student to return with output. While the student is working, the advisor is also thinking: refining the problem, noticing whether the original question was poorly framed, anticipating failure modes, building intuition about the domain, and preparing better next questions. When the student returns, the advisor's input is valuable because their own reasoning loop has continued.

AI makes this harder because the loop is faster. An advisor may have a week, a month, or at least overnight before a student returns with revised work. With an AI system, the loop may come back in minutes. That speed can make the researcher feel like their role is merely to react: accept, reject, correct, rerun. But faster iteration does not remove the need for synthesis. It compresses the time available for it.

The same should be true for AI-assisted research. While an LLM is searching, coding, summarizing, or drafting, the researcher should be asking whether the task has been scoped correctly, what evidence would actually change their mind, which assumptions are doing the work, and what better decomposition might make the system more useful. The point is not to hover over every token. The point is to remain intellectually active enough that the next interaction improves the direction of the work.

This reframes judgment. Judgment is not only the ability to validate an answer after the fact, and synthesis is not merely responding to the model's latest output. The deeper work is to think carefully about direction: what is not working, whether the question itself is wrong, whether the system is optimizing the wrong proxy, whether the decomposition is hiding the hard part, and whether a different representation of the problem would make progress possible. The researcher is not outside the AI loop. The researcher is responsible for shaping the loop.

## Open Questions

- What kinds of research tasks can safely be delegated as endpoints?
- Which tasks require active co-thinking because the question itself is unstable?
- How do researchers protect time for synthesis when AI shortens the iteration cycle?
- What artifacts help a researcher keep thinking while the model works?
- How should we train students to design loops rather than merely verify outputs?
