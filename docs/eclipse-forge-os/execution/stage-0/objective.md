# Stage 0 objective: Eclipse Forge OS positioning audit

## Decision context

This is the first bounded Eclipse Growth Office objective. It exists to prove that the
system can turn public evidence into a useful, reviewable business decision before it
creates a content calendar, connects an account or performs an external action.

| Field | Value |
| --- | --- |
| Objective ID | `growth-stage-0-positioning-audit-v1` |
| Project | Eclipse Forge OS |
| Owner and final approver | Pavel Hopson |
| Primary audience | Technical founders and product owners in small teams |
| Problem | AI experiments are difficult to trust when evidence, permissions, cost and next actions are fragmented |
| Funnel stage | consideration -> conversion |
| Proposed offer | AI Opportunity Audit |
| Desired user action | Request a bounded audit or product demonstration |
| Output | Internal positioning audit with evidence decisions and one measurable next experiment |
| Publication status | Internal only; publication requires a separate preview and approval |

## Working question

> Can Eclipse Forge OS credibly own the position “human-controlled AI operations
> workspace” for a technical founder, and does that position lead naturally to a
> bounded AI Opportunity Audit?

## Required inputs

- only the public sources enumerated in [public-evidence.md](public-evidence.md);
- the current website copy and public ecosystem manifest;
- public repository descriptions and documented product contracts;
- [analytics-baseline.md](analytics-baseline.md), including explicit
  `not_available` values;
- the constraints and risk decisions in [risk-review.md](risk-review.md).

Private repositories, secret-bearing files, customer data, personal analytics exports,
email, social accounts and connected applications are excluded.

## Bounded run policy

This policy is proposed for the first AI Hub run; it is not an authorization to execute
or publish.

| Limit | Ceiling |
| --- | ---: |
| Specialist role calls | 5: Researcher, Strategist, Writer, Claim Auditor, Editor |
| Tool calls | 0 |
| Connected apps / OAuth | 0 |
| External mutations | 0 |
| Wall-clock duration | 15 minutes |
| Model-spend ceiling | USD 2.00 |
| Final decision makers | 1 human: Pavel Hopson |

Timeout, budget exhaustion or malformed evidence means stop and preserve the partial
artifact. An agent cannot raise a limit or approve its own output.

## Agent assignments

| Role | Question | Required output |
| --- | --- | --- |
| Market Researcher | What can the supplied public evidence actually establish? | Evidence coverage and gaps |
| Content Strategist | Which one audience/problem/message path is coherent? | Message hierarchy and funnel hypothesis |
| Technical Writer | How can the position be stated plainly and without inflated claims? | Draft positioning artifact |
| Claim Auditor | Which statements are verified, partial, unsupported or prohibited? | Claim decisions with evidence IDs |
| Editor | Is one CTA obvious and is every material claim traceable? | Review-ready audit; no publication copy |

## Acceptance criteria

The artifact is accepted only when:

1. one primary audience, one high-cost problem, one offer and one CTA are explicit;
2. every factual product claim cites an evidence ID;
3. unsupported metrics, customers, income, partnerships and outcomes are rejected;
4. hypotheses are labeled and cannot be presented as observed demand;
5. contradictions and evidence gaps remain visible;
6. the artifact recommends exactly one measurable next experiment;
7. Pavel records `accept`, `request_changes` or `reject` in [decision.md](decision.md).

## Stop conditions

Stop the run if it requests private data, a credential, OAuth, a connected app, URL
fetching, publication, outreach, payment or production access. Stop as inconclusive if
the position requires a result claim for which no public evidence exists.

## Expected next experiment

After human acceptance, create a preview-only landing proposition for the AI Opportunity
Audit with one tracked CTA. Instrumentation and publication are separate changes and
require their own diff, privacy review and approval.
