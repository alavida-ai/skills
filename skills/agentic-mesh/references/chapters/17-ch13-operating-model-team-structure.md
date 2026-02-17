# 13. Operating Model and Team Structure


## Chapter 13. Operating Model and Team Structure

Operating models are the connective tissue between strategy and execution. They translate broad aspirations—whether efficiency, innovation, or resilience—into the daily routines that govern how people, processes, and technology work together. In practice, an operating modelsets out roles, decision rights, flows of information, and mechanisms of accountability. It answers practical questions: who does what, with which tools, under what rules, and measured by which outcomes? In fields as diverse as financial services, aviation, and healthcare, operating models are the frameworks that allow organizations to harness complex systems safely and predictably, balancing autonomy with oversight.

With the rise of agents and, soon, agentic meshes—networks of AI-driven software entities that collaborate with people and each other—the need for a robust operating model is even more pressing. Agents are not static tools; they learn, adapt, and act across boundaries, creating both opportunity and risk. Without a model that defines ownership, sets guardrails, and embeds observability, organizations risk slipping into unmanaged complexity, where pilot projects never scale, errors cascade, and accountability blurs.

This broader conversation spans several related dimensions. In this chapter we begin with a high-level design of an operating model for agentic mesh, outlining structure, process, technology, policy, and metrics. Next we explain agent fleets (groups of agents) and how they are managed and structured. We then turn to the team structure for individual agents, showing how cross-functional ownership ensures agents remain effective, safe, and aligned. Next, we examine transition considerations, exploring how organizations can navigate workforce change ethically, legally, and compassionately. Finally, we speculate about the future of work, tracing how agents are reshaping jobs, tasks, and organizational identity. Together, these perspectives show not only how agentic systems can be implemented but also how they will reshape the very nature of work itself.


###### WARNING

To be honest, writing this chapter was both exciting and scary at the same time, since the agent landscape is changing quite rapidly—even though we are in the middle of this field, working with clients. We still may get some of this right, but there is a good possibility that in a few years’ time, all of this will change. Crystal balls are foggy at the best of times, so it is important to acknowledge that some of the latter sections—particularly those addressing the future of work—remain quite speculative. Agent ecosystems are still in their early stages of evolution, and both their technical capabilities and organizational impacts are likely to shift rapidly. What seems like a possible or even plausible trajectory today may look quite different within only a few years, as advances in autonomy, regulation, and cultural acceptance reshape the possibilities. So some of the discussions in this chapter should therefore be read not as definitive predictions but as working hypotheses that, hopefully, provide a bit of guidance to help organizations prepare for multiple scenarios while retaining the flexibility to adapt as agent technologies mature.


## Structure, Process, Technology, Policy, and Metrics

Like any effective design, the agentic mesh operating model, shown in Figure 13-1Figure 13-1, rests on five pillars: structure (in our case, both people and agents), process, technology, policy, and metrics. Each must be reimagined for a human-plus-agent workforce.

Structure defines ownership and decision rights.

Process lays out the agent lifecycle from idea to retirement.

Technology specifies the shared platform elements every agent depends on.

Policy codifies what is acceptable and what is prohibited.

Metrics reveal whether the system is creating value safely or drifting toward risk. This framework mirrors the way operating models for other complex systems—such as cloud-native development or financial risk management—have been codified to prevent ambiguity from leading to fragility.


*[Diagram illustrating the five pillars of an agentic mesh operating model: structure, process, technology, metrics, and policies, each contributing to decision-making, workflow, and workforce dynamics.]*


###### Figure 13-1. Operating model pillars


### Structure (People and Agents)

Structurally, agents should be treated as digital employees. Each agent or agent family should have a human product owner accountable for its business value and a safety owner accountable for its risk profile. Decision rights must be explicit: which actions can the agent take independently, which require preapproval, and which require ex post facto review? Identity and access management for agents should mirror that of people, with the ability to issue, revoke, and adjust permissions as conditions change. Here, the comparison with human capital operating models is instructive: just as organizations design role descriptions, reporting lines, and escalation paths for employees, the same must be done for agents.


### Process

The process element of the operating model captures the lifecycle of an agent. Unlike software that is released once and patched occasionally, agents must be managed as living systems. Their lifecycle should begin with intake and business case development, followed by design and simulation in safe sandboxes. Policy conformance checks and red-team stress testing should occur before staged rollout. Deployment must include kill switches and error budgets to bound risk. Once live, agents need observability, incident response integration, and eventual decommissioning with audit logs preserved. This end-to-end process echoes the operating model of high-reliability industries such as aviation or pharmaceuticals, where lifecycle governance is not optional but embedded.


### Technology

For an agentic mesh, technology provides a number of items:

A registry that versions every agent and tracks provenanceA policy decision point that enforces runtime constraints on data, tools, and autonomyObservability systems that log prompts, tool calls, and outcomes immutablyRegression pipelines that replay scenarios to test updatesSecure messaging and identity layers that let agents authenticate and transact with each other safelyThis stack is not unlike the technology backbone of cloud operating models, where registries, observability platforms, and identity fabrics are central. The difference is that here, the work units are not just containers or microservices but autonomous entities making decisions.


### Metrics

Metrics are the lifeblood of evaluation. They make the operating model tangible and verifiable. On the value side, organizations should track, among other things, completion rates, cycle times, cost to serve, and customer satisfaction. On the safety side, they must monitor escalation frequency, override rates, hallucination incidents, and privacy violations. These metrics should be tied to service-level objectives. If an agent exceeds its error budget, autonomy should be automatically reduced or paused. The logic mirrors site reliability engineering in cloud operations: quantitative thresholds govern whether systems continue at full autonomy or fall back to safer, slower modes.

Building a modest but pragmatic policy catalog helps organizations start without being paralyzed. Autonomy and escalation rules, for example, can be structured by risk tiers: low-risk tasks are performed autonomously with logs; medium-risk tasks include limits and notifications; high-risk tasks require human approval. Similarly, data access policies should always enforce least privilege, purpose binding, and minimization of sensitive detail in prompts. These are not abstract ideas but concrete constraints that balance speed with safety, much like procurement policies in large enterprises that prevent spending outside approved categories.


### Policy

Policy is where leadership exercises its influence. Agents must never operate outside defined rules, and those rules must be enforced in runtime systems rather than manuals. Autonomy tiers, least-privilege data access, prompt and tool versioning, and guardrails against unsafe behavior are examples. Written policies, unless translated into machine-enforceable rules, are insufficient. This parallels the evolution of financial operating models after the 2008 crisis2008 crisis: regulators realized that policies on paper were not enough, and firms had to embed risk controls in real-time systems of credit scoring, limits, and reporting.


### Other Considerations

Cost control deserves some emphasis. Agentic systems can become silent cost centers if context windows balloon or if tool calls multiply unchecked. Embedding runtime cost limits per agent and measuring unit economics per task forces efficiency. This is reminiscent of the way lean operating models in manufacturing introduced just-in-time principles to reduce waste. By monitoring the economic footprint of each agent, organizations create accountability and prevent hidden costs from eroding value.

Comparisons to other operating models are instructive also. Consider the DevOps operating model, which integrated development and operations to accelerate software delivery while preserving reliability. Its success rested on three factors: clear ownership, continuous monitoring, and automated safeguards. The agentic mesh operating model echoes this structure but applies it to entities that reason and act autonomously. Similarly, the target operating models used in banking after the financial crisis combined policy, governance, and metrics to ensure resilience. The lesson is that operating models succeed not by adding bureaucracy but by embedding clarity and control into everyday work.

While in a different industry, another useful comparison is the airline industry. Airlines operate fleets of machines that require constant supervision, certification, and lifecycle management. Pilots remain accountable, but aircraft systems execute many decisions automatically. Training, certification, and incident reporting are deeply codified. The agentic mesh will need similar rigor: agents are like fleets of aircraft, each with its own operating license, performance profile, and logs subject to audit. Without such rigor, small failures can scale into systemic risks.

What ties all of these models together is a balance between autonomy and accountability. Too little autonomy, and the system becomes inefficient, with agents hobbled by human bottlenecks. Too much autonomy without accountability, and the system becomes reckless, with risks scaling beyond control. The operating model is the instrument that calibrates this balance, adjusting autonomy based on observed performance and quantified risk tolerance.

As with other operating models, documentation is not the end but the beginning. The model must be living—versioned, updated, and tied to a history of improvements. It should open with principles—humans remain accountable, autonomy is earned not given, logs are the source of truth—and then flow into structure, lifecycle, policies, and metrics. Its strength comes not from length but from clarity and enforceability.

Ultimately, the operating model for an agentic mesh is a synthesis of lessons learned from high-reliability domains, adapted for the new reality of autonomous software. It borrows rigor from aviation, quantitative thresholds from site reliability engineering, and governance from financial services. Yet it must remain lightweight enough to keep innovation moving. That balance—between structure and agility, between risk management and speed—is what will determine whether agentic mesh scales as a trusted, value-creating part of the enterprise.


## Structure of Agent Fleets

Anagent fleet is a group of agents that interact and work as a team. As shown in Figure 13-2Figure 13-2, a fleet can be best viewed as an analogue of people-based teams. Where teams have multiple people, fleets have multiple agents. Where organizations are, simplistically, teams of teams, agentic mesh is a fleet of fleets.


*[Diagram comparing the structure of human teams within organizations to agent fleets in an agentic mesh, highlighting the scalability of teams and fleets through their respective organizational models.]*


###### Figure 13-2. Agent teams versus agent fleets

Agent fleets are the building blocks of the agentic mesh. Where human organizations scale by assembling teams of teams, agentic systems scale through fleets of fleets. A fleet is a logical, deployable unit of agents provisioned to work together under shared infrastructure and governance. Instead of seeing agents as isolated tools, fleets recognize them as coordinated ensembles capable of delivering end-to-end outcomes. They are provisioned, managed, and evolved as collective systems, not as collections of individuals.

The importance of fleets lies in their ability to bring structure, coherence, and accountability to the agent ecosystem. They provide the registry, observability, interaction rules, and policy enforcement needed for groups of agents to operate predictably. They also create the scaffolding for scale: an enterprise may manage dozens or hundreds of fleets, just as it manages departments or divisions. Four themes define the nature of agent fleets:

Fleets as the scaling unit of the meshDynamic membership and fluid boundariesCore services as the glueAlignment to missions rather than functions.


### Fleets as the Scaling Unit of the Mesh

Fleets are to agents what teams are to people: the fundamental unit of collaboration. A single agent can perform a task, but complex business outcomes—like onboarding a customer or processing a claim—require multiple steps, handoffs, and coordination. Fleets make this possible by grouping agents into orchestrated ensembles. Just as human organizations do not rely on individuals working in isolation, enterprises will not rely on isolated agents.

What makes fleets distinct is their deployability. They are launched, scaled, and retired as coherent units. A fleet might begin as an empty shell, containing infrastructure but no agents, or it might launch fully staffed with specialized agents ready for a business process. This modularity makes fleets reusable and portable. They can be treated as packaged components—provisioned where needed, upgraded as capabilities improve, and retired when no longer relevant.

By shifting the focus from agents to fleets, organizations elevate the conversation from tactical tasks to strategic outcomes. Executives do not need to track every agent’s decision; they monitor fleet-level performance, just as they manage departments rather than individual employees. Fleets deliver outcomes in aggregate: dashboards, compliance evidence, and value-stream metrics that tie directly to enterprise objectives.

This structural move—from managing agents to managing fleets—is what transforms scattered automation into a resilient, enterprise-grade ecosystem. The mesh itself is the higher-order system of fleets, enabling scale and governance at a level beyond any individual agent.


### Dynamic Membership and Fluid Boundaries

Unlike human teams, which are relatively fixed in membership, agent fleets are elastic. Agents can dynamically join or leave a fleet in response to demand, context, or purpose. A customer-support fleet, for example, may scale up with dozens of additional agents during peak periods, and then scale back down overnight. Specialized agents might temporarily join a fleet to handle compliance or translation tasks, and then depart when no longer needed.

This flexibility makes fleets living assemblies rather than static organizations. The continuity resides not in the agents themselves but in the fleet’s infrastructure: the registry, observability, and rules that persist even as the roster changes. Fleets provide ongoing coherence, ensuring that changing membership does not lead to chaos.

The result is a structure more like cloud computing than traditional teams—elastic, responsive, and modular. Where human organizations require months to recruit or reorganize, fleets can reshape themselves in seconds without losing accountability or governance.


### Core Services as the Glue

At the heart of every fleet are core services that bind agents into a coherent unit. These services act like the HR, IT, and compliance of digital organizations, providing the infrastructure that agents need to collaborate predictably.

The registry is the fleet’s directory, where agents are discoverable alongside metadata such as purpose, owner, autonomy tier, and certifications. The registry ensures that membership is not ad hoc but governed by rules of identity and accountability.

Interaction management is another critical service. It handles communication flows, message brokering, and conflict resolution when multiple agents act on the same object. Without this, fleets risk bottlenecks or contradictory actions.

Observability ensures that every decision, tool call, and interaction is logged immutably, enabling audits, monitoring, and postmortems.

Policy enforcement is equally important. It provides real-time checks on what agents can or cannot do, ensuring compliance with autonomy tiers, data-access rules, and business guardrails. Together, these controls ensure that autonomy does not slip into anarchy.

Beyond these essentials, fleets may also include security layers for authentication, dashboards for fleet-level monitoring, and resilience services that scale or reconfigure the fleet under stress. Theseglue services make the difference between a group of bots and a functioning digital organization.

By embedding these services, fleets are not just collections of agents—they are orchestrated systems. They create reliability, predictability, and auditability, translating raw agent capabilities into business-ready outcomes.


### Alignment to Missions, Not Just Functions

Human organizations are often structured by function (finance, HR, operations) or by geography. Fleets, by contrast, align more naturally to missions or outcomes. They are assembled to deliver end-to-end value streams, such as customer onboarding, claims processing, or supply chain orchestration. Each fleet clusters agents around the stages of a process, with handoffs encoded into their interaction patterns.

This mission-driven structure makes fleets versatile. They can serve processes, customer journeys, or cross-functional needs. A customer-centric fleet, for example, may monitor a client’s data, manage billing, flag risks, and provide proactive support—all as a single coordinated unit. In effect, it operates like a dedicated account team but at software scale.

By aligning to missions, fleets deliver more than efficiency: they create coherence in outcomes. They transform isolated agent outputs into measurable value streams that map directly to business goals. This design makes fleets the ideal vehicle for embedding agents into enterprise operating models.


### Key Roles in Fleet Management

Managing fleets of agents requires new human roles that balance autonomy with oversight and keep the fleet aligned to organizational goals. Here are key roles in managing fleets of agents:

Fleet managerThe fleet manager is the accountable human role for overseeing a fleet’s lifecycle. They decide composition, mission boundaries, and operating conditions. While agents self-coordinate, only humans can balance strategic priorities, compliance, and risk appetite. The fleet manager is less concerned with individual agent behavior and more with how the fleet as a whole performs as a system.

Fleet reliability engineer (FRE)

The FRE ensures that fleets run reliably and within error budgets. They monitor health, scaling, and resilience, intervening when cross-agent failures occur. Much like site reliability engineers (SREs) in cloud environments, FREs design observability, manage incident response, and maintain performance service-level agreements (SLAs)—but at the level of fleets rather than infrastructure.

Fleet interoperability/integration engineerThis role ensures fleets can communicate and collaborate across boundaries. Just as human departments need integration, fleets need cross-compatibility. This engineer defines protocols, brokers interfleet messages, and ensures that outcomes flow smoothly across fleets in the mesh. Without this role, fleets risk becoming silos, undermining the promise of orchestration.


### Organizational Patterns for Fleets

Fleets can be organized in different ways depending on organizational priorities, with patterns emerging around domains, processes, customers, geographies, and cross-functional integration:

By domainSome fleets align to core business functions, such as finance, HR, or compliance. These fleets act like digital departments, providing consistency and governance within a domain.

By process or value streamOther fleets align to business processes—like onboarding, claims, or order management. These fleets deliver end-to-end outcomes, functioning as digital equivalents of process teams.

By customer or segmentCustomer-aligned fleets wrap services around specific clients or market segments. They create personalized, ongoing engagement, offering the experience of a dedicated account team.

By geography or marketGlobal organizations may deploy fleets by region, embedding local compliance, languages, and market awareness. These fleets mirror the geographic divisions of multinational enterprises.

Cross-functional fleetsSome fleets span domains, linking processes end to end. In supply chains, for example, a fleet may connect procurement, logistics, and finance. These horizontal fleets provide the connective tissue across vertical silos.


## Structure of Agent Teams

We use two terms that may be misconstrued as the same: agent teams and agent fleets. But there is a big difference: an agent team is a stream-aligned team (in Team TopologiesTeam Topologies terms) that owns an autonomous agent end to end: definition, build, run, and governance. Agent teams are discussed in this section. To simplify things, an agent team is composed of people, even though they may use AI and agents themselves to build and manage agents.

Think of an agent team like a modern product team or a data product team in a data mesh: you don’t throw work over the wall; you carry it from idea to safe, valuable operation—from idea to production. The twist is that agents are living systems: they reason, act through tools, coordinate with other agents, and change behavior when you modify prompts, models, tools, or context. That living quality demands continuous evaluation, explicit guardrails, and close collaboration with platform teams (identity, data, API, observability) and enabling teams (governance, security, architecture, training) so the agent stays both useful and trustworthy over time.

As we put this together, we wanted to use existing practices where it made sense. So in many ways we treat the agent owner exactly as you would a data product owner in a data mesh: accountable for usefulness, quality, and trust across the lifecycle. The added wrinkle is autonomy management—defining decision rights, limits, and escalation paths—and safety ownership alongside value ownership. That dual mandate keeps the agent both effective and acceptable to customers, regulators, and your brand.

We also lean on Team Topologies a lot: in our opinion, it is probably the single best source of information on how to structure any type of team that has a material technology component. So using their nomenclature, the agent team is stream-aligned to a value stream (claims handling, onboarding, finance ops, and so on). As shown in Figure 13-3Figure 13-3, agent teams are supported by platform teams (data platform, API platform, identity/policy, observability) that provide paved-road capabilities the team consumes in a self-service manner. An agent team’s success is enabled by existing human teams (governance, architecture, red team, security, training/enablement, steering groups) that upskill the agent team, codify standards, and help with tricky crosscutting concerns. This structure lets the agent team move quickly while staying safe.


###### NOTE

We describe roles, but not every role is filled by a single person—maybe in some large agent teams, they might be, but we don’t think it is mandatory. Rather, you should do what works for you. In some cases one person may have multiple roles, but in other cases you may need multiple individuals to fulfill a single role.


*[Diagram illustrating roles within agent teams, including an Agent Fleet Manager, Agent Owner, Release Manager, and various supporting positions like Engineers and Policy Liaisons.]*


###### Figure 13-3. Roles that support agent teams

Here’s a quick look at the roles that are discussed at length in the next sections:

Agent ownerAccountable leader for purpose, value, and risk; like a data product owner in data mesh, including autonomy and safety guardrails.

Agent engineersBuild the agent: prompts, tool contracts, retrieval/context, APIs, and integration; ship changes safely and fast.

Reliability and operations specialists (agent SREs)

Run it in production: observability, error budgets, incidents, performance, cost control, kill switches.

Governance and certification leadTurns policy into tests and certifications; sets autonomy tiers; manages (re)certification after changes.

Evaluation and human-in-the-loop supervisorThe new agent tester; designs gold tests, adversarial scenarios, side-by-side regressions; supervises decisions where required.

Policy and ethics liaisonBridges legal/compliance/brand principles into runtime constraints, approvals, and audits.

Release managerPartners with the agent owner and customers to plan releases, schedule change windows, and deliver orderly, reversible rollouts.


### Agent Owner

The agent owner is the primary person responsible for an agent and the primary voice of value—they are the voice of the agent team. They define and communicate the agent’s purpose (which problems, for whom), success measures (business KPIs, safety SLOs), and autonomy boundaries (where the agent can act versus propose). This is directly analogous to a data product owner in a data mesh: they own usefulness, trust, and lifecycle—not just delivery milestones. They also curate the contract that the agent presents to consumers (capabilities, expectations, and limits).

The agent owner sets priorities for agent engineers, accepts releases with the release manager, agrees to service-level objectives (SLOs) with agent SREs, and works with the governance lead on certification gates. They also align with the policy/ethics liaison on constraints and with the evaluation supervisor on acceptance tests. In Team Topologies language, the agent owner orchestrates support from platform teams and enabling teams so the stream-aligned team can move quickly without breaking trust.

Note that agent owners have a reporting relationship to agent fleet managers (mentioned in “Structure of Agent Teams”

“Structure of Agent Teams”) to ensure that interactions between agents in an agent fleet meet operational expectations.


### Agent Engineers

These are the folks that design and build agents. Agent engineers shape prompts and tool-use policies; define typed tool contracts; wire retrieval, embeddings, and context windows; and integrate external systems via clean APIs. They also add observability hooks (decision logs, tool traces) and implement guardrails (validators, policy checks). Their craft sits at the intersection of distributed systems, machine learning, and product engineering.

This role is important because small changes—one line in a prompt, a new tool, a different retrieval strategy—can radically alter behavior. Engineers therefore code for safety by construction: idempotent tool actions, clear pre/postconditions, and reproducible builds. They also manage unit economics (tokens, latency) to keep cost and performance in balance.

Agent engineers implement the agent owner’s intent, expose metrics the SREs need, satisfy the governance lead’s certification tests, and instrument the agent for the evaluation supervisor’s regression suite. They rely on platform teams for identity, policy, data access, and observability, and on enabling teams for architectural patterns and secure-by-default libraries.


### Reliability and Operations Specialists (Agent SREs)

Agent SREs focus on reliability and operability—simply put, they keep the agents healthy in production. They define SLOs and error budgets for accuracy, latency, escalation rates, and cost; build dashboards for prompts, tool calls, and outcomes; and respond to incidents.

Agents are dynamic. But we know that models change, tools fail, data shifts, and prompts drift. So without SRE discipline, regressions leak to users, incidents repeat, and autonomy must be narrowed—eroding value. SREs safeguard trust by operationalizing resilience (using traditional techniques including backoffs, circuit breakers, policy-enforced throttles) and by quantifying operational risk.

This role partners with the engineers on runtime patterns, with the release manager on deployment trains and change freezes, and with the governance lead on incident evidence and postmortems. They also provide production feedback to the agent owner on whether autonomy can safely increase. Platform observability and identity/policy teams are key collaborators.


### Governance and Certification Lead

The governance lead turns policy into machine-checkable gates. They translate privacy, safety, brand, and regulatory rules into tests and evaluations; define autonomy tiers (propose-only, act with limits, act with notify, and so forth); and run certification before go-live and recertification after any meaningful change (model swap, prompt rewrite, new tool).

Unlike static software, agents’ behavior can shift without code changes (for example, model updates). Governance provides durable assurance: a clear trail of who approved what, under which tests, and with which rollback plan. It protects customers and the enterprise, and it enables faster change by making risk visible and routinized.

This role works with agent owners to verify that agents work according to expectations. They review agent performance and certify proper operations. They may also block or allow releases with the release manager, and work with the policy/ethics liaison to keep constraints current. They lean on enabling teams (governance, security, legal) and reuse platform capabilities (policy decision points, audit logs) to enforce rules at runtime.


### Evaluation and Human-in-the-Loop Supervisor

This role can best be described as the new quality and testing role for agents. They build and curate the golden evaluation suite: representative tasks, edge cases, adversarial prompts, and side-by-side comparisons across versions. They also design checkpoints for high-risk actions and monitor escalation/override rates as leading indicators of drift. Their lens is behavioral:

Did the agent act appropriately within bounds? not just Did it run?

Continuous evaluation makes drift visible. With stable, business-relevant tests, you can change prompts, models, or tools with confidence. The supervisor also ensures humans remain in control where judgment is critical, converting tacit expertise into checklists, rubrics, and structured feedback the agent can learn from.

This role partners with the agent owner to define acceptance criteria, with engineers to instrument testability, with SREs to watch postdeploy metrics, and with the governance lead to feed certification results. They also coordinate with enabling teams (training, red team) to expand scenarios and with platform data teams to source evaluation datasets responsibly.


### Policy and Ethics Liaison

The policy and ethics liaison bridges corporate principles and runtime constraints. They interpret laws, industry standards, and brand guidelines; decide where consent, provenance, or explainability are required; and ensure the agent’s actions and records can withstand audit and customer scrutiny. They define prohibited or high-friction operations and the approvals they require.

Why does this role matter? Agents touch people, data, and money. Ethical lapses or compliance failures erode trust and invite restrictive controls that stall progress. A proactive liaison reduces that risk by designing compliance by default and ensuring the team can move quickly without stepping outside the lines.

This role coauthors policy tests with the governance lead, advises the agent owner on autonomy boundaries, helps engineers embed policy checks, and briefs the release manager on change implications. They depend on platform teams for identity/authorization, data masking, and audit logging; and on enabling teams (legal, risk, brand) for source policy.


### Release Manager

The release manager runs the change cadence. They gather needs from customers and stakeholders with the agent owner, shape release scopes, plan canaries and fallbacks with SREs, and schedule windows that avoid business conflicts. They maintain the release calendar, coordinate cross-team dependencies (for example, model upgrades and API changes), and ensure that every rollout is orderly and reversible.

In agent systems, a “small tweak” can have outsized impact. The release manager protects customers and the brand by making sure evidence (evaluation results, certification sign-offs, rollback plans) is in place before changes reach production. They also increase throughput by creating predictable trains—reducing last-minute heroics.

This role sits at the center of the stream-aligned team’s flow—partnering with the agent owner on priorities, with engineers on readiness, with SREs on risk, with the governance lead on gates, and with the policy and ethics liaison on approvals. They coordinate with platform teams for shared upgrades (identity/policy, data, observability) and with enabling teams for change governance and steering.


## Transition Considerations

Few, if any, organizations can leap overnight from a human-only workforce to a fully realized agentic mesh. The agentic mesh journey requires deliberate planning, experimentation, and compassion. Yes, agents promise speed, scale, and precision, but they also introduce uncertainty, cultural friction, and new risks; but without a thoughtful transition plan, organizations may find themselves caught between two worlds: human employees anxious about replacement and autonomous systems operating without clear oversight. The result is neither efficiency nor trust, but paralysis.

Transition is necessary because agents change not just how tasks are done but how work itself is organized. Jobs dissolve into collections of tasks, with some shifting to agents, others remaining with people, and new ones emerging entirely. As shown in Figure 13-4Figure 13-4, this reconfiguration requires organizations to consider:

Human impact and ethicsCommunications and trustReskilling and governance


*[Venn diagram illustrating the intersection of ]*


###### Figure 13-4. Balanced and effective transition


### Human Impact and Ethical Foundations

The most pressing concern when agents enter the workplace is the human response. Employees naturally wonder: will this technology replace me, or will it help me? Left unaddressed, this anxiety can quickly erode morale and breed resistance. Leaders must acknowledge openly that fear of job loss is real and justified—ignoring it only fuels suspicion. A transition grounded in ethics must start by recognizing that the human impact is not collateral damage but central to adoption.

Ethical principles are commitments that set boundaries for how organizations use agents. Transparency, fairness, and respect for dignity must form the bedrock. That means designing agents to augment human roles wherever possible, not silently replace them. For example, customer service agents might automate routine triage, while human employees focus on empathy and complex problem-solving. By articulating anaugmentation-first design principle, organizations codify values into practice.

Ethics must also be operationalized into mechanisms. It is not enough to say, “we value fairness.” Instead, organizations should embed guarantees of human review in workforce-impacting decisions, ensure all role changes are subject to appeal, and create audit logs that document how agent recommendations were applied. Just as financial institutions must comply with strict risk controls, organizations deploying agents must be able to demonstrate that ethical promises are enforceable and not aspirational.

Importantly, values should shape incentives. If employees are measured only on personal output, they may see agents as competitors. But if incentives reward collaboration, safe autonomy, and improving agent performance, then agents become teammates rather than threats. This echoes past shifts in manufacturing and IT where incentive redesign was critical to cultural acceptance.

Agent ethics should probably be seen as dynamic. What feels acceptable today may not tomorrow, as agents evolve and social expectations shift. Organizations need ongoing ethical review boards, including representatives from employees, technical teams, and compliance. This ensures that as the agentic mesh grows more capable, the ethical guardrails evolve with it rather than lag behind.


### Communication, Trust, and Cultural Adaptation

Even with strong ethical foundations, transition fails without clear, ongoing communication. Employees fear what they do not understand, and agent behavior can often feel opaque or unpredictable. Leaders must articulate not only why agents are being introduced but also how they will interact with employees, what will change in daily work, and what will remain the same. Clarity reduces uncertainty; vagueness magnifies it.

But communication cannot be one-way. Trust requires listening as much as telling. Employees should have channels to raise concerns, report issues, and propose improvements. Codesign workshops, pilot participation, and feedback forums help employees feel that agents are not imposed but shaped collaboratively. This participatory approach shifts the narrative from technology done to us to technology built with us.

Cultural adaptation also requires reframing how agents are perceived. Instead of silent competitors, agents should be presented as collaborators that free up humans to focus on judgment-driven, creative, and relationship-based work. Leaders must model this mindset themselves, highlighting examples where agents handled routine tasks and employees applied their uniquely human skills to create more value. Stories of positive collaboration matter more than statistics in a shifting culture.

Organizations should plan for the long haul. Initial excitement may give way to skepticism if early missteps occur. Communicating not just successes but also failures—along with what was learned and how systems improved—demonstrates honesty and maturity. Trust in agents, like trust in colleagues, is built slowly through consistency and transparency, not through promises alone.


### Structured Transition Through Reskilling, Support, and Governance

Beyond ethics and communication, organizations must provide a structured pathway for people to adapt. Reskilling and redeployment are key considerations. Demand for routine manual and basic cognitive tasks is declining, while demand for social, emotional, technical, and higher-order cognitive skills is rising. Training programs must be role-specific and practical. For example, administrative staff can be retrained to supervise agents, curate their datasets, or manage exceptions. These are real new jobs created by the mesh, and training should map directly onto them.

Reskilling, however, cannot be a onetime initiative. Agents evolve quickly, which means human roles will continue to shift. Organizations need continuous learning infrastructures: microcredentials, on-demand training platforms, and internal mobility programs that allow employees to move fluidly into new roles as they emerge. Scaling this capacity is a challenge many leaders underestimate—it requires investment in training budgets, partnerships with educational providers, and alignment with career progression frameworks.

Support extends beyond skills. Workers deeply affected by agent adoption should receive advance notice, coaching, redeployment pathways, and, where necessary, income support. Organizations that manage transitions compassionately preserve morale and reputation. Those that do not do this risk resentment, attrition, and public backlash. The lesson from past automation waves is clear: technical success does not excuse neglect of human dignity.

Legal and compliance safeguards must be baked in. Regulators are scrutinizing AI for bias, discrimination, and opacity, and workforce-impacting decisions are under particular scrutiny. And since agents are powered by AI, agents too will be under identical scrutiny. Every decision an agent makes that affects an employee’s role, pay, or career trajectory must be reviewable by a human. Audit trails, appeal processes, and retention of logs are nonnegotiable. These safeguards protect not only employees but also organizations from legal and reputational risk.

Governance must also be multidisciplinary. Transition councils should include HR, legal, ethics, operations, and technical teams. This ensures that the rollout is not treated as a narrow IT initiative but as a systemic organizational change. Including employee representatives further strengthens legitimacy and fosters buy-in.

Staged autonomy deployment is another key mechanism. Rather than unleashing agents at full capacity, organizations should consider starting with low-risk, high-impact tasks. As performance proves reliable and error budgets remain healthy, autonomy can increase. This gradual progression mirrors licensing regimes in aviation or medicine, where practitioners earn greater independence through demonstrated competence. Employees gain time to adapt, and trust builds incrementally.

Cost controls should be integrated into the transition. Agents can become hidden cost centers if left unchecked—through sprawling context windows, excessive API calls, or inefficient tool use. Embedding unit economics per task and per agent into governance structures prevents runaway expenses. Transition councils should regularly review cost performance alongside safety and value.

Yet another element is transparency in role redesign. Job descriptions should be updated to reflect hybrid human-agent collaboration, with clear delineation of what agents handle and what humans retain. This prevents the perception of creeping role erosion and helps employees see where their contributions remain critical.

Importantly, transition should be seen as an iterative process, not a onetime event. Organizations should pilot, learn, adapt, and repeat. Feedback loops—through surveys, forums, and analytics—enable leaders to spot morale dips, attrition risks, or cultural resistance early. A structured transition is dynamic, evolving as agents mature and as employees respond.

Like most transformations, organizations should measure success holistically. Transition is not successful if efficiency rises but trust collapses. Metrics must track not just agent performance but also employee engagement, retention, and satisfaction. The truth is that only when value, safety, cost, and human well-being move together can the transition be called truly sustainable.


## The Future of Work

“Structured Transition Through Reskilling, Support, and Governance”

“Structured Transition Through Reskilling, Support, and Governance” discussed transition—how an organization can move thoughtfully from human-only operations to environments where agents begin to share work alongside people. That perspective was focused on the near term and was specific to a single organization, emphasizing ethics, communication, reskilling, and governance as immediate levers for change. But transition is only one part of the story. Beyond it lies a longer horizon: the future of work itself, where agents are not just add-ons to today’s structures but core participants in tomorrow’s economies.

Thefuture of work has often been used as a somewhat pithy phrase, yet it is properly understood as a profound reconfiguration of how societies create value. From our vantage point, working with clients as they evolve their agent future, we can already see the practical and broad impact that agents can have. Demographic shifts, economic pressures, and technological breakthroughs are converging to reshape both what work looks like and how organizations function. Agents—autonomous digital entities capable of reasoning, adapting, and coordinating—accelerate this transformation. Unlike earlier waves of automation, they do not just execute tasks; they make decisions. This shift demands a speculative lens, informed by history but open to outcomes that may unfold in radically new directions.

The future of work unfolds in concentric layers of impact, as illustrated in Figure 13-5Figure 13-5, beginning with jobs at the center and radiating outward toward society. At the core lies the shift from automation to autonomy, where agents move beyond task execution to decision making. This first ripple affects jobs directly—reshaping roles by redistributing tasks between humans and agents.

The next layer reflects workforce impacts and polarization: some workers experience displacement in routine roles, while others see their productivity enhanced through augmentation. These uneven effects ripple through individuals’ careers, widening skill gaps and testing resilience.

As the impact grows, we expect to see hybrid professions and operating models at the organizational level. New roles such as fleet managers, reliability engineers, and agent supervisors emerge to balance oversight and innovation. This, in turn, reconfigures how organizations function, pushing them toward more mesh-like, agent-integrated structures.

Finally, the outermost layer highlights purpose and continuous learning, extending the effects to society as a whole. Here, the challenge is not just organizational adaptation but the preservation of human meaning, dignity, and adaptability in a rapidly changing environment. The upward arrow underscores that the scale of change intensifies as we move outward—what starts with jobs ultimately reshapes entire social and economic systems.


*[Diagram illustrating layers of impact from workforce changes, including job adjustments, organizational shifts, and societal effects, highlighting themes like automation, polarization, and hybrid models.]*


###### Figure 13-5. Future of work and impact of change

Four themes capture the essence of this unfolding future:

The leap from automation to autonomy and the redefinition of tasksThe uneven and polarized workforce impacts shaped by organizational cultureThe emergence of hybrid professions and new operating modelsThe centrality of human purpose, adaptability, and lifelong learningEach theme points to a different dimension of how agents may reshape the workplace: how decisions are delegated, how inequalities emerge or deepen, how organizations reorganize themselves, and how individuals maintain meaning in their work. Together, they suggest that the agent-enabled future will be neither uniform nor inevitable but the product of deliberate choices.


### Jobs: From Automation to Autonomy

An important distinction between past technologies and agents lies in the difference between automation and autonomy. Earlier technologies—industrial robots, workflow software, RPA—excelled at following programmed rules. They offered speed, consistency, and efficiency but only within bounded domains. Agents move beyond this by reasoning over ambiguous inputs, choosing among multiple tools, and coordinating with each other to achieve goals. Instead of merely automating tasks, organizations are delegating decisions.

However, this distinction has some pretty profound implications. Automating tasks assumes human control remains intact; delegating decisions requires trust that an agent’s judgment will align with organizational goals, policies, and ethics. It is no longer just a matter of whether a task is completed correctly but whether the rationale for that completion is sound, transparent, and acceptable. This difference raises questions about accountability: who is responsible when an agent makes a call that affects a customer, a partner, or an employee?

One way to understand the impact is to rethink jobs as bundles of tasks rather than as monolithic roles. In this model, agents can peel away routine or rules-based components, leaving judgment, creativity, and relationship building to humans. The future job thus becomes a mosaic, stitched together from both human and agent contributions. This reframing also shifts the conversation from elimination of jobs to redistribution of tasks, which is a more nuanced and realistic picture of how organizations evolve.

And as organizations adopt this task-based lens, new governance challenges emerge. Who decides which tasks are delegated and which are retained? How are thresholds for agent autonomy set? What measures determine whether delegation is working or failing? Without thoughtful design, the delegation of decisions can drift into hidden risk—agents acting beyond their intended scope, or humans losing oversight because their role has been reduced to occasional intervention.

There is also a cultural implication—and this may be the key obstacle or sticking point: how decision making changes, now that an agent is in the loop. Delegating decisions feels qualitatively different from delegating tasks, and many employees may resist giving up judgment to an algorithmic system. Building trust in autonomy requires transparency: showing how decisions are made, why certain outcomes are chosen, and how humans can intervene. Autonomy without explainability risks rejection, even if technically effective.

Ultimately, the move from automation to autonomy forces organizations to reconsider the nature of control. It is not about replacing humans wholesale but about redesigning the boundaries of responsibility between humans and machines. The organizations that thrive will be those that treat delegation as a managed relationship, not a one-way transfer of authority.


### Uneven Impacts and Workforce Polarization

The rise of agents will not affect all workers or sectors equally. Some functions—administrative, clerical, and customer service—are highly exposed to substitution because their tasks are repetitive and rules-based. Others—strategic, relational, creative—are less automatable, but they too will be reshaped as agents augment decision making and lighten information burdens. The unevenness of exposure creates a polarized labor market, with some roles hollowed out and others elevated.

This polarization risks deepening inequality. Workers in routine roles, often younger or less experienced, may face displacement sooner and with fewer safety nets. By contrast, experienced professionals with domain expertise may find their skills complemented by agents, becoming more productive rather than less relevant. Without reskilling pathways, the gap between those who adapt and those who are left behind will widen.

Cultural orientation plays a critical role in shaping how uneven impacts play out. Organizations with cost-focused cultures may view agents primarily as a means of replacement, cutting headcount to achieve efficiency. Agility-focused firms may emphasize augmentation, using agents to expand human capability rather than diminish it. Startups, unconstrained by legacy structures, may adopt extreme models: small founding teams managing armies of agents, effectively skipping over large-scale human employment altogether.

The divergence of these cultural models suggests that the future of work will not be uniform across industries or geographies. Some sectors may become heavily agent-driven, with minimal human presence, while others preserve human-centric approaches with agent support. This variability complicates predictions but underscores the importance of organizational values in shaping technological outcomes.

Polarization also affects trust. In organizations where replacement dominates, morale may erode quickly, even among employees who remain. In augmentation-driven cultures, by contrast, employees may see agents as teammates rather than threats, strengthening cohesion. Culture, therefore, becomes both a cause and an effect of how agents are deployed.

At a broader level, this unevenness raises questions of social responsibility. If displacement is concentrated in particular groups or sectors, governments and institutions will need to design safety nets and retraining programs to avoid social fragmentation. The organizational choices made today—replace, augment, or hybridize—will ripple outward into societal structures for decades to come.


### Emergence of Hybrid Professions and Operating Models

As agents enter the workplace, entirely new professions will emerge. Just as the cloud era created DevOps engineers and the data era created data scientists, the agent era will produce agent product owners, reliability engineers, human-in-the-loop supervisors, and fleet managers. These are not niche roles; they will become integral to how organizations function, especially as fleets of agents scale.

Hybrid professions bridge the gap between human oversight and agent autonomy. An agent product owner, for instance, defines purpose, success criteria, and guardrails. Reliability engineers ensure that agents operate predictably, monitoring error budgets and handling incidents. Human-in-the-loop supervisors design test cases and intervene when outputs drift from acceptable bounds. These roles anchor the balance between innovation and safety, ensuring that agents are not just effective but trustworthy.

The rise of these roles reflects a broader change in operating models. Traditional hierarchies—built around human managers at every decision point—cannot scale when agents act autonomously. Instead, organizations will evolve toward mesh-like structures, where humans and agents collaborate in fluid networks governed by policies and runtime checks. Decision rights will be distributed differently, with autonomy tiers defining when agents act, when they notify, and when they require approval.

This operating model demands new governance practices. HR, legal, and compliance functions will need to adapt to include digital coworkers. Performance frameworks must evaluate not only employees but also fleets of agents. Incident response plans must assume that agents can generate failures as well as successes. Even onboarding and offboarding will change: agents will be “hired,” “licensed,” and eventually “retired” with the same procedural rigor applied to humans.

Culture once again becomes a decisive factor. In cost-focused organizations, these hybrid roles may be minimized, with agents left to operate with limited oversight to maximize efficiency. In agility-focused firms, these professions will be valued and expanded, recognizing that agents amplify rather than replace human capability. Startups may experiment with radically lean models, with a handful of humans covering all oversight roles while agents execute the bulk of work.

The hybrid operating model also challenges identity. Employees accustomed to clear lines of authority may struggle in mesh-like networks where responsibility is shared between people and agents. Clear communication, transparency, and role definition will be critical to prevent confusion and ensure accountability.

In many ways, the emergence of hybrid professions mirrors the evolution of past technologies. The shift to cloud computing initially seemed like an IT matter, but it eventually transformed every aspect of organizational design. The same will be true here: agents will begin as technical curiosities but will eventually reshape leadership, culture, and structure.

Ultimately, the organizations that succeed will be those that embrace hybridization not as a compromise but as a strength. By recognizing that agents and humans complement one another, successful organizations can design operating models that combine adaptability with resilience. The hybrid workforce is not a stopgap; it is the foundation of the future.


### Human Purpose, Adaptability, and Continuous Learning

If agents take on repetitive and procedural tasks, the meaning of human work must be redefined. Purpose becomes central. Organizations that allow humans to be sidelined into marginal roles risk demoralization, even if efficiency rises. By contrast, those that redesign roles to emphasize judgment, creativity, empathy, and innovation can strengthen both morale and performance. The agentic future must therefore be anchored in human dignity as much as in efficiency.

Adaptability is equally vital. Agents evolve rapidly, workflows change, and tools become obsolete within months. Workers cannot rely on static expertise but must continuously learn and adapt. Lifelong learning becomes a survival skill, supported by microcredentials, internal mobility, and reskilling infrastructures. Organizations that invest in adaptability will thrive; those that treat reskilling as a onetime program will fall behind.

The skills that rise in value will shift. Information processing—once a premium human capability—is increasingly handled by agents. What grows in importance are interpersonal, organizational, and integrative skills. Humans will be valued not for competing with agents but for complementing them, orchestrating collaboration, and managing ambiguity.

Institutions must also adapt. Education systems designed for stable careers must prepare students for fluid roles. Governments must design safety nets that support not just unemployment but transitions, enabling workers to move across roles as agents reshape industries. The social contract of work will need updating, reflecting a world where agents are active participants in value creation.

The future of work with agents won’t land all at once (and, of course, our crystal ball’s ability to look into the future is foggy at the best of times). In the short run, we’ll probably expect too much of them and be disappointed when they inevitably stumble. But over time, their influence will run deeper than we can picture today, changing how jobs are shaped, how organizations run, and how people find meaning in work. As Roy Amara saidRoy Amara said way back in 1978, “We tend to overestimate the effect of a technology in the short run and underestimate the effect in the long run.” The real trick is to design carefully now, so when the long run arrives, our agentic future feels not just smarter but more human.


## Summary

This chapter showed how operating models and team structures turn agent ambition into reliable practice. We translated strategy into execution across structure, process, technology, policy, and metrics; introduced fleets as the scaling unit of the mesh; clarified the human roles that keep agents safe and useful; and outlined a humane transition for the workforce. The lesson is simple: success of agentic mesh depends as much on governance and accountability as on code.

The next step is scale. Hand-building agents cannot keep up as meshes grow to thousands or millions of participants. In Chapter 14Chapter 14 we explain how the agent factory meets this challenge by industrializing agent creation: templates capture best practices, certification enforces trust, automation speeds deployment, and guardrails keep agents safe and compliant. It allows enterprises to build and ship trusted agents at scale, without losing control.
