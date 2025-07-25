---
title: Specs as Code
summary: "Prompt engineering is dead: everything is a Spec"
date: "2025-07-10"
tags:
    - AI
    - Agentic Coding
---

I recently watched a talk from Sean Grove, a member of the technical staff at OpenAI. The title of his presentation was

                                 "The new code. Specs: write once, run everywhere"

The talk was very interesting and emphasized our need to better define the way we communicate to models our values & intents. The talk notably described quickly the model-spec of OpenAI models. What struck me most was not just the technical details, but a simple realization: as AI coding assistants evolve from helpful autocomplete tools to autonomous agents that can work independently, the way we communicate our intentions becomes critical. Several companies are releasing their own agnetic coding AI.

These agents are not just suggesting your next line of code, but can write entire features, fix bugs, and propose pull requests. Like poiting out by the [IndyDevDan](https://www.youtube.com/@indydevdan) in several of his videos, coding agents are fundamentally changing how we approach software development. To be sure that the agent provides the right code, the right architecture, you need to communicate your intents clearly. As such, the quality of your project specifications will determine whether agents' outputs will be working code or just a mess that takes longer to fix than writing it yoursel.

## From code completion to code autonomy

The release of `GitHub Copilot` was quite an event in the field as it was giving access to intelligent autocomplete that suggests your next line. But you stayed in control. `Claude Code`, OpenAI's `Codex`, `Amp`, `Friday` and others represent something fundamentally different. Indeed, in the last couple of years we progressively moved from Copilot:

- Suggests code as you type
- You accept/reject each suggestion
- You make all architectural decisions
:What

to Agentic AI coding:

- Deploys multiple agents to independently handle coding tasks in isolated environments
- AI makes decisions about architecture, testing, error handling
- You review completed work, not individual suggestions

## The specification gap

For having using mostly Claude Code since a couple of months, I quickly realize something. While their capabilities are quite impressive, they can also quickly go into the wrong direction. This cost compute time, coding time and generate frustration. Consequently your AI agents needs clear specifications and instructions to implement and deploy the expected code and architecture.

In his video, [IndyDevDan](https://www.youtube.com/@indydevdan) has three pillars for optimal use of agentic coding:

- Communicate the right **context**
- Select the right **model**
- Design the right **prompt**

As such the software engineering loop may be modified and:

- ~~write code~~ becomes **write specs**
- ~~review suggestions~~ becomes **review proposed implementation** and;
- ~~control every decision~~ becomes **define constraints and let the AI code**

## Learning from OpenAI model spec

Specs sits with the contextual communication. Looking at the OpenAI specs, it is clear that good specification should provide:

- The context problem: how AI agents understand (or misunderstand) your project without proper specifications
- Ideally some real-world examples: what happens when specifications are unclear vs. well-defined
- The cost of ambiguity: why vague requirements become exponentially more expensive with autonomous agents

OpenAI's Model Spec uses a three-layer approach that translates well to coding projects: Objectives, Rules and Defaults.

**Objectives are high-level goals:**

- "Build maintainable code"
- "Follow team conventions"
- "Prioritize security"

**Rules are hard constraints that cannot be overridden:**

- "Never commit secrets to version control"
- "All public APIs must have tests"
- "Use TypeScript for new frontend code"

**Defaults are preferred approaches that can be adjusted:**

- "Prefer functional programming patterns"
- "Use existing library X for authentication"
- "Write tests in Jest unless specified otherwise"

Depending on the angent you work with, you will have default file like `AGENTS.md` or `CLAUDE.md` where you can specify your own specs. In practice it might be interesting to have different specs files for different part of your code. Take into consideration that the architecture of your code repository may be super important. It will influence how the agents will analyse your code and understand its function. This really reminds me somehow the `ARCHITECTURE.md` [file](https://matklad.github.io/2021/02/06/ARCHITECTURE.md.html) where you can describe there how your code is strutured and intended to work. This file was somehow a different type of spec as this was intended for human engineer but the principle remains the same: being able to communicate about your code and your intent.

## Wrap-up

It's becoming clear that specs should be treated with the same rigor as code. I'll start implementing proper spec management practices with Claude Code:

- Version control: I'll track `CLAUDE.md` changes like any other code file
- Code review: Review my spec updates before committing
- Testing: Validate spec changes by running actual tasks
- Documentation: Maintain a changelog for major spec updates

I'm still figuring out organization.

IndyDevDan suggests a dedicated specs/ folder where you explicitly prompt the agent ("read specs/frontend.md before implementing"). I haven't formed strong opinions yet. I need more time building larger codebases with agents to develop a definitive view. This will likely depend on project complexity and whether I'm working solo or with a team. I suspect the optimal approach varies significantly between contexts. Worth exploring further is how spec organization scales from personal projects to team environments.
