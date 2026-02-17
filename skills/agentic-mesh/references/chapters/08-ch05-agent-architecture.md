# 5. Agent Architecture


## Chapter 5. Agent Architecture

Agents create a set of architectural challenges that traditional software design was never intended to solve. Conventional applications operate in tightly defined contexts: they take input, run through predetermined workflows, and deliver output. This model works well when problems are predictable and the rules are clear. But agents face a different reality. They must act in open-ended environments, where information may be incomplete, situations can change unexpectedly, and the next step is rarely obvious in advance.

To function effectively under these conditions, agents need capabilities that ordinary applications lack. They must be able to make autonomous decisions without constant human guidance, potentially adjust their plans dynamically as new data or constraints emerge, and collaborate with other agents in ways that are both coordinated and efficient. Just as importantly, they must sustain coherent behavior over long interactions, so that their decisions in one moment remain consistent with the goals and context established earlier. These requirements transform autonomy, adaptability, and persistence into central design considerations.

Meeting these demands requires more than incremental improvements to existing software practices. It calls for a structured approach to agent architecture—one that treats autonomy, coordination, and continuity as fundamental design principles rather than afterthoughts. This chapter introduces such an approach, offering a framework for building AI agents that can not only perform tasks in isolation but also scale across complex environments.

This chapter introduces a structured approach to agent architecture, beginning with the core principles that shape agent behavior. These principles—trustworthiness, reliability, explainability, and others—serve as practical guideposts and guardrails that help ensure that agents act in ways that reflect our values (including those of our business), meet regulatory requirements, and align with operational expectations.

From there, we examine the key components that make up an agent’s architecture. This includes the large language models (LLMs) that drive decision making, the tools that extend functional capabilities, and the memory systems that allow agents to manage long-running tasks. We also outline the messaging models and collaboration patterns that enable agents to work across distributed environments, either independently or as part of a larger system. Together, these elements form the technical foundation that allows agents to operate effectively in real-world conditions.

To put these ideas into context, we introduce four types of agents—task-oriented, goal-oriented, simulation, and observer—each suited to different problem domains. We then explore the considerations involved in developing, deploying, and operating agents at scale, including tool integration, policy enforcement, and state management. The chapter concludes by applying these concepts to our case study that brings to life the architecture and concepts in a hypothetical implementation.


## Agent Principles

Aprinciple is too often thought of as vague and abstract. However, agood principle is a foundational guideline that frames values and shapes decision making and behavior, providing guideposts and guardrails for both design and evaluation in complex systems. Principles help organizations translate abstract goals into concrete criteria for success, ensuring consistency and coherence across diverse teams and technologies.

Technologies will shift, regulations will tighten or loosen, and business priorities will inevitably adapt, but principles serve as the stable reference points that help organizations navigate uncertainty. By anchoring decisions in enduring values rather than transient trends, principles ensure that agent design and operation remain coherent over the long term. This durability allows teams to innovate with confidence, knowing that while the tools and contexts may change, the compass guiding their direction stays true.

Principles, in summary, establish a shared vocabulary that aligns stakeholders around common expectations, which reduces ambiguity and enables coordinated action.

For agents, principles are especially important because agents can act autonomously and operate with minimal human oversight and often influence critical business outcomes. Well-defined agent principles steer agents toward outcomes that reflect organizational values, regulatory requirements, and ethical norms. By embedding these principles into agent design, we—society, organizations, developers—can understand and then manage risk, build stakeholder trust, and ensure that AI-driven processes remain aligned with strategic objectives.

Much of our agent architecture is framed around four key principles, as shown in Figure 5-1Figure 5-1. They guide what an agent can or should do; they set expectations around how an agent does what it is supposed to; and they provide the rationale for explaining why an agent did what it did.


*[Diagram illustrating the four key principles of agent architecture: Trustworthy and Accountable, Reliable and Durable, Explainable and Traceable, Collaborative and Intelligent.]*


###### Figure 5-1. Agent principles

In our view, here are the important principles of agents:

Trustworthy and accountableAgents must transparently adhere to their purpose and comply with corporate, ethical, or regulatory policies. Agents must be accountable to demonstrate that they are trustworthy.

Reliable and durableAgents must provide accurate results—think “five-nines” levels of accuracy with minimal levels of hallucinations. (In an operational context, a five-nines style metric—for example, 99.999%—denotes an average accuracy or other success metric’s rate.) Agents must be able to continue conversations that last long periods (minutes, hours, days, or longer) and recover when they experience errors.

Explainable and traceableAgents must provide repeatable results. An agent’s activities must be fully transparent, and each step, each tool, or each collaborating agent must be available for review (and hence be explainable). Each prompt must be available, and the results from all tools and agent activities must be traceable.

Collaborative and intelligentAgents must be able to autonomously and intelligently collaborate with other agents (and tools) to fulfill a task.


### Trustworthy and Accountable

Agents must adhere to their defined purpose and be aligned to established corporate, ethical, and regulatory policies. This deliberate focus on a prescribed mission lays the foundation for a trustworthy system, where the consistency of actions and decisions builds confidence among users and stakeholders.

This principle serves one simple purpose: it fosters confidence among stakeholders by ensuring that every agent behaves predictably and within established boundaries. It is simply a fact that organizations, regulators, and end users are more inclined to use agents when they can be sure they do what is expected of them. And the reverse is also true: they will likely not use an agent that they do not understand or trust.

Clarity about operational boundaries is a critical element in this trust framework. By following prescribed purposes and constraints imposed by well-defined policies, agents minimize the risk of deviations that could lead to unintended consequences. This strict adherence to operational limits ensures that agents function predictably, reducing ambiguity and fostering an environment where trust can flourish because all participants understand the scope and limitations of agent actions.

With clarity comes transparency. Agents that document and publicize their decision-making processes, inputs, and outputs provide an operational environment where scrutiny is not only possible but expected. This transparency enables ongoing review and evaluation, reinforcing internal governance frameworks while also reassuring external stakeholders that agents act in expected ways.

Transparency serves as the cornerstone of a trustworthy system by enabling a public record of an agent’s activities. When agents clearly publish the processes by which decisions are made, it becomes possible to subject these processes to thorough review at every level. This openness not only reinforces robust internal governance but also provides external stakeholders with the evidence needed to verify that the system operates reliably and ethically, ultimately bolstering confidence in its outputs.

To further increase trust, a certification framework becomes crucial. We suggest an approach, illustrated in Figure 5-2Figure 5-2, that is modeled on processesprocesses like those used by formal standards organizations globally. For example, Underwriters Laboratories serves this function in the United States, and the Canadian Standards Association performs this function in Canada. Now, to be sure, adopting the end-to-end steps we define in this section may introduce complexity and, as such, may not be required for all agents, especially those in low-risk environments. Nevertheless, it is expected that as agents take over more important tasks and roles, a significant portion, if not all, of the steps we’re going to address would be adopted.


*[A diagram of a company's company's company's company's company's company's company's company's company's company's company's company' AI-generated content may be incorrect.]*


###### Figure 5-2. Agent certification process

The certification process for autonomous agents begins with an application that includes detailed technical documentation outlining the agent’s purpose, policies, architecture, algorithms, decision-making processes, and intended operational parameters. This initial submission provides evaluators (which, for example, could be an organization’s governance team or a third party) with a detailed understanding of the agent’s design and its alignment with established corporate, ethical, and regulatory policies.

Evaluators then conduct a rigorous review of the submitted documentation, focusing on design specifications, risk assessments, and compliance with published policies. During this phase, a set of testing protocols may be developed to simulate the operational environment of the agent, ensuring that its behavior is evaluated under conditions that reflect real-world usage and potential edge cases.

Accredited testing environments play an important role in this process. Similar to laboratory accreditation in product testing, these environments are verified to meet expected standards for reliability and repeatability. They facilitate objective testing of the agent’s performance, particularly in terms of transparency, error rates, and adherence to defined operational boundaries.

Following the initial evaluation, an iterative review process is initiated. Developers work closely with evaluators to address any discrepancies or issues identified during testing. This may involve refining algorithms, enhancing transparency in decision-making processes, and conducting additional tests to verify that the agent consistently meets the required standards.

The process may include a review of the agent’s deployment environment. This step verifies that the operational setup—such as data sources, integration with external systems, and monitoring mechanisms—is in full compliance with the technical documentation and an organization’s policies and standards.

Once the agent successfully passes testing and environmental inspections, it is issued a formal certification. This certification provides an attestation that the agent meets or exceeds the predefined standards for performance, transparency, reliability, and compliance with ethical and regulatory policies. The certification serves as a benchmark for stakeholders and a public indicator of the agent’s quality.

Certification is further reinforced by the publication of detailed metrics and adherence reports. These documents outline the testing results, inspection findings, and ongoing compliance status. By making these records publicly available, the process promotes transparency and allows stakeholders to verify the agent’s performance and adherence to standards over time.

The certification process is maintained through an ongoing surveillance program that includes regular audits and periodic reassessments. This continuous monitoring ensures that the agent remains compliant with the established standards, even as its operational context evolves.

We believe that trust—in agents and the ecosystems they run in—will be key to adoption. So establishing trustworthiness in agent-driven systems requires a multifaceted approach that combines clear operational purpose, transparency, and disciplined adherence to defined policies. And the integration of a robust certification framework—complete with accreditation, published standards, measurable metrics, and third-party audits—further reinforces this trust by providing tangible evidence of compliance. This comprehensive approach not only secures stakeholder confidence today but also sets the stage for continuous improvement and reliability in the long term.


### Reliable and Durable

Agents in critical business environments must deliver precise, consistent outputs that meet stringent performance standards. Such high-performance benchmarks are essential to ensure that agents remain dependable, even when confronted with complex or dynamic task requirements. This level of reliability is crucial for applications where errors can have significant operational or financial consequences.

Achieving a high level of reliability—say five nines (99.999%)—means that an agent must be capable of executing tasks correctly under a wide variety of conditions. This includes handling variations in input data, adapting to unexpected operational scenarios, and maintaining performance without significant degradation.

Durability is an equally important attribute, particularly for agents that engage in long-running interactions. Agents must sustain operational performance over extended durations—whether the task lasts minutes, hours, or days—without suffering from performance degradation or loss of context. This capability ensures that even when tasks span long periods, the agents maintain their coherence and continue to provide accurate outputs. Later in this chapter, we will discuss how conversations and tasks are managed across extended periods.

To meet these high standards, the design and testing processes for agents must be rigorous and comprehensive. This involves stress testing under simulated operational conditions, as well as continuous integration and deployment practices that enable ongoing performance assessments.

Monitoring systems also play a pivotal role in maintaining high reliability and durability. Continuous monitoring allows for real-time tracking of performance metrics and quick detection of deviations from expected behavior. By leveraging advanced analytics and automated alerts, agent ecosystem monitoring can ensure that any performance issues are promptly addressed, maintaining a high level of reliability over time.


### Explainable and Traceable

The concept of explainability in autonomous agents (Figure 5-3Figure 5-3) is rooted in the need to understand how agents reach their decisions. Given that LLMs underpin many agent functions, their inherentnondeterminismnondeterminism makes it critical to have a system that clearly outlines each operational step. Briefly, nondeterminism for our purposes refers to the variability in the output of systems like LLMs, meaning that identical inputs can yield different outputs upon each execution. This variability arises from probabilistic decision-making processes embedded within these models, where multiple plausible responses exist for a given prompt.

Since agents rely on LLMs to interpret prompts and generate responses, they inherit the nondeterministic characteristics of these models. This means that even with the same input, an agent may produce varying outputs. This variability necessitates robust mechanisms to ensure that the agent actions remain understandable.


*[Diagram showing an end-to-end task tree for agent operations with steps numbered for visibility, logging, consistency, and status capture to enhance explainability and traceability.]*


###### Figure 5-3. Explainable and traceable agents

Explainability is achieved when an agent maintains information about its entire decision-making process. This includes recording the creation of task plans, the selection of collaborating agents or tools, and the integration of prompt-derived parameters into tools or collaborating agents identified in a task’s step. Capturing data throughout each step of this task planning exercise is crucial:

Task plans show how an agent decomposed a request into smaller subtasks that are subsequently executed.

Identification of agents and tools for each step of the task plan shows how an agent picked the right tools or collaborating agents out of a universe of available agents and tools.

Insertion of parameters into each subtask shows the exact parameters that govern the handoff and subsequent execution of collaborating agents and tools.

Let’s explain this a bit.

The first step in an agent’s operation is to create a task plan based on the provided request or prompt. Following the creation of a task plan, an agent identifies which collaborating agent or tool can be used to fill each step in the task plan. This means mapping the task steps to the respective agents or tools and ensuring that the proper parameters are assigned.

Parameters derived from the initial prompt are used to tailor each task step to the current context. These parameters influence how the agent and its collaborators perform their actions, ensuring that outputs are aligned with the original intent. Documenting parameter substitution is essential for understanding any deviations or unexpected outcomes.

So an agent is considered explainable when all of this information—the task plan, selection of tools, and parameter integration—is made available for review. Such transparency is crucial for verifying that the agent’s behavior aligns with its design objectives and that any anomalies can be investigated in detail.

Traceability is the complementary attribute that ensures we can map an agent’s task plan with its actual execution even when it spans multiple collaborating agents and tools. A unique identifier is created for an originating task, the first task plan created by the agent that receives the first request, which is attached to each step and substep connecting every action, decision, and interaction the agent has. This identifier allows any audience—developers, auditors, or operational staff—to reconstruct the entire decision-making process, making it possible to pinpoint the source of any errors or deviations from expected behavior.

Traceability also extends to the interagent communication that occurs when multiple agents collaborate on a single task. By maintaining unique identifiers and detailed logs for each agent interaction, organizations can create an end-to-end map of the task execution process. This comprehensive mapping is essential for effective governance.

The combination of explainability and traceability not only aids in internal process optimization but also supports compliance with external regulatory requirements. Stakeholders can assess whether agents are operating within the defined ethical and operational frameworks by reviewing detailed logs and records. These records, which document every aspect of the agent’s actions, serve as the basis for governance frameworks. In regulated industries, such as finance and healthcare, this level of detail is imperative for ensuring that autonomous systems are both safe and accountable.

This explainability information also helps to diagnose issues or discrepancies in agent behavior. When unexpected outcomes occur, the detailed logs let developers or operational staff more easily isolate and understand the sequence of events that led to the issue, allowing for targeted interventions. In addition to aiding in problem diagnosis, the recorded information is invaluable for continuous improvement. By analyzing historical data on agent actions, developers can identify patterns, optimize decision-making processes, and further reduce the impact of nondeterminism on overall performance.

Interestingly, explainability and traceability are critical components of any certification framework for autonomous agents. Just as certification verifies that product safety is based on rigorous testing and documentation, a similar certification process for agents uses the detailed records of each operational step. This approach would ensure that agents not only meet performance standards but are also accountable for their decisions.


### Collaborative and Intelligent

Today’s AI workflows often rely on a single LLM to manage the entire processing chain from input to output. However, this approach can lead to significant errors as the complexity and size of requests increase. Due to the inherent nondeterminism of LLMs—where the same input may produce different outputs—there is a growing risk that the quality of results deteriorates when tasks require intricate or prolonged processing.

Agents take a different approach by creating a step-by-step task plan that decomposes large tasks or requests into smaller subtasks. Instead of handling every aspect of the process themselves, agents assess which parts of the task require specialized capabilities and select appropriate collaborators to assist. This distributed approach leverages the strengths of various agents, improving accuracy and efficiency in completing complex tasks.

Agents select collaborators from a registry (for now, it’s enough to know that the registry is a repository of metadata, but this is explained in detail in later chapters) that forms part of the agent ecosystem. This registry lists all available agents and tools along with their capabilities, ensuring that each subtask is assigned to the most qualified entity. Collaboration is achieved when agents can autonomously interact and coordinate with one another, governed or mapped out by this task plan. It is this collaborative mechanism that reduces the burden on any single agent and increases the system’s resilience by drawing on collective expertise.

But collaboration runs deep in the agent ecosystem. The collaborative process first starts when one agent receives a request and subsequently creates a comprehensive task plan. The agent then hands off portions of the work to collaborating agents. Upon receiving a subtask request, a collaborating agent further refines the task by creating its own detailed plan. This recursive delegation allows the system to break down even the most complex requests into a hierarchy of simpler tasks that are easier to manage and execute.

As each collaborating agent receives its assigned subtask, it may also identify additional specialized agents or tools to handle specific aspects of the request. This cascading approach to task planning ensures that every element of a large, complex task is addressed by the most appropriate agent or tool available.

But why bother with decomposing a request into smaller parts? Why not just burden an LLM with more and more functionality? Well, simply put, decomposability is a cornerstone of software engineering, enabling developers to break down complex systems into manageable, independent components. In traditional software design, this principle manifests through modular programming, where systems are built as collections of discrete, reusable modules. These modules often correspond to function calls, which encapsulate specific logic or behaviors. By decomposing a large problem into smaller, well-defined units, developers can isolate errors, facilitate maintenance, and promote scalability.

In distributed software architectures, the unit of decomposability often extends to API calls, which serve as the communication channels between independent services. An API call acts as a contract between different parts of a system, ensuring that each module interacts through clearly defined interfaces. This approach enhances system reliability and flexibility by allowing each service to be developed, tested, and deployed independently.

With agents, the principle of decomposability is applied at a higher level of abstraction where the basic unit is an agent or a tool. Just as a function call abstracts a discrete operation in conventional programming, an agent encapsulates a specific set of responsibilities within a larger agent ecosystem. Collaborating agents work together by delegating subtasks and coordinating their efforts, mirroring the modular design principles found in software engineering. This collaborative model not only simplifies the management of complex tasks but also enhances system resilience and adaptability, thereby reaffirming the timeless value of decomposability in both traditional and modern distributed systems.

One additional benefit of decomposability is that it facilitates agent specialization. As decomposability allows for smaller and more granular agents (and tools), so we are able to design tailored components that address very specific capabilities. Instead of general agents, we can get agents that are intensively specialized. This specialization can be implemented in several ways. Agents can be paired with fine-tuned LLMs that have been trained in a particular domain. Or agents and their LLM can have access (via retrieval-augmented generation, for example) to specialized documents or data—for example, corporate policies or corporate data—that makes the agent and LLM aware of specialized knowledge.


## Agent Components

Chapter 4Chapter 4 introduced agents and indicated that they had several key attributes—for convenience, we show this diagram again in Figure 5-4Figure 5-4.


*[Diagram illustrating a simple agent architecture, highlighting components of task management (including planning and execution) and intelligence features like problem solving, tools, memory, and learning.]*


###### Figure 5-4. Simple agent architecture

Let’s briefly review the nature and behavior of agents. They could plan and execute tasks. They also had an LLM-powered intelligence that let agents interact and reason in a sophisticated manner. The LLMs give the agent several “superpowers”:

Problem-solvingAgents could interact in natural language with people, could understand complex and even ambiguous requests, and could provide a path to answering questions and fulfilling requests.

ToolsAgents could interact with their environment to access the internet or corporate data or interact with products.

MemoryAgents could track the history of interactions (near-term memory) to provide greater context for interactions to fulfill requests more effectively. Agents could also access corporate or internet “memory” (long-term memory) by accessing persistent data to aid in fulfilling requests.

Learning/adaptingUsing agent interaction histories as well as reactions from consumers (or other agents), agents can learn from past interactions.

In this section, we will elaborate on each of these superpowers but this time with an additional level of detail that explains the agent architecture components and how they work.


### Agent “Brain”

LLMs enable an agent to interact with people and other agents using natural language. LLMs are designed to interpret and convert human inputs into data that can be used to plan and execute complex operations. By translating the words that humans type or speak into usable information, LLMs give agents the ability to interact with people, to reason, and to plan and execute all sorts of tasks.

Modern LLMs, however, are more than just simple translators. LLMs analyze patterns and use them to reason about the world. Because of this, an agent can appear remarkably intelligent and responsive, especially when dealing with topics that were in its training data.

A key feature—and challenge—of LLMs, as we’ve mentioned, is that they can be nondeterministic. The same question or command can sometimes produce different answers, depending on factors like randomization, phrasing of a prompt, or the specific context given with a prompt. Although nondeterminism can make the agent seem creative—capable of generating new, surprising ideas—it can also add a dose of unpredictability.

Many modern LLMs aremultimodal. This means they can handle not just text (such as documents and code) but also video, audio, and images. Multimodality opens up countless possibilities for agents. They can look at pictures to identify objects, read code to debug problems, or even combine different kinds of information into a single response.

LLMs are typicallystateless by default, which means they don’t automatically remember conversations or context unless it’s specifically stored somewhere else. In a way, talking to an LLM is like talking to someone who, while knowledgeable, forgets everything you said after each sentence unless it was written down. However, in order to hold long conversations, agents need to keep track of what happened in previous interactions. They need to save their conversation history and feed it back into the LLM whenever necessary.

LLMs have been trained from an enormous range of inputs (text, images, audio, and video), so they can discuss historical events, solve math problems, and summarize scientific papers. However, there are limitations: LLMs can only be trained on data available at their training time and thus do not have sufficient information to respond to more recent data. True, LLMs may reason and in some cases respond correctly, but in other cases their responses will be made up or just plain wrong, which is called hallucination. LLMs are typically trained on public data, and may not have access to corporate data or information behind a firewall or paywall, which means they may not be as specialized as desired but rather are smart generalists—jacks-of-all-trades, masters of none. For tasks that need deep expertise, an agent might need to use external data and various tools to augment their memory.

Context sensitivity is another important aspect. The way you phrase a question—or the details you provide—can have a big impact on how the LLM responds. If you give it a clear prompt, you’re more likely to get a clear answer. If you’re vague, the model might fill in the gaps on its own, and the results can vary. Again, agents take great care in managing tasks in a reliable, repeatable, and explainable way.


### Agent Memory

An agent’s memory draws from multiple sources: the native knowledge encoded in its LLM weights, the transient information provided in its immediate context, and external repositories accessed through retrieval techniques such as retrieval-augmented generation (RAG). Together, these form a dynamic hierarchy of recall, reasoning, and adaptation that defines how an agent perceives, interprets, and acts in the world.

At the foundation lies native memory, the knowledge implicitly captured during training. This is the agent’s baseline understanding of language, facts, and world regularities. However, this memory is static—it reflects the data and worldview available at the time of training. To remain current or domain-specific, the agent must augment this with contextual and external inputs.

The second layer, short-term or contextual memory, encompasses the active prompt and any surrounding context available during a task. It functions like working memory—volatile, limited in size, and crucial for immediate reasoning. Once the task concludes, this memory dissipates unless explicitly summarized or stored elsewhere.

Beyond these lies long-term or external memory, typically powered by RAG or similar methods. Through RAG, agents query structured stores—vector databases, document repositories, or APIs—to retrieve relevant information on demand. While simple RAG implementations use nearest-neighbor search over embeddings, more sophisticated versions integrate ranking, filtering, and feedback loops to ensure both precision and relevance. This makes it possible to access up-to-date corporate or web knowledge without retraining the model.

Yet agents benefit from going further, differentiating among several types of long-term memory. Episodic memory lets an agent recall specific interactions or experiences, providing continuity across sessions. Procedural memory encodes skills and repeatable behaviors—how to complete certain workflows or execute policies. Semantic or conceptual memory captures abstract relationships between ideas and entities, forming a cognitive map of the domain. Factual memory retains discrete truths—values, rules, and verified data. These memory types, working together, allow agents to reason with both context and history.

The structure of memory matters as much as its content. Simple vector retrieval can struggle with context fragmentation or ambiguous queries. To address this, advanced architectures rely on ontologies and taxonomies—formal definitions of entities, their categories, and their relationships. These provide the scaffolding for semantic retrieval, ensuring that “employee,” “manager,” and “contractor” are not just words but linked concepts with defined properties. Knowledge graphs extend this further, encoding entities and relationships as nodes and edges that support reasoning and inference. When integrated with LLM-based retrieval, graphs act as both a factual backbone and a semantic compass, enabling agents to reason about cause, dependency, and hierarchy.

In practice, this structured memory architecture improves retrieval accuracy, contextual alignment, and explainability. Instead of pulling loosely related documents, the agent can recall the exact concept, process, or prior experience relevant to the query. Graph-based reasoning allows the agent to bridge gaps—linking facts with the concepts or events that give them meaning. It also enables transparency: the agent can explain not only what it retrieved but why it chose that information.

Agent memory also must be managed over time. Memories are promoted, summarized, or forgotten based on their importance and frequency of use. Episodic traces can be distilled into concise narratives; factual data can be validated and refreshed; obsolete information can be pruned to prevent drift or bloat. This memory lifecycle ensures that the agent’s recall remains both efficient and relevant—a dynamic balance of retention and renewal that mirrors human cognition more closely than static knowledge bases ever could.


### Agent Context Engineering

Context engineering is the practice of selecting, structuring, and delivering the right information to an agent’s LLM at the right time. Because LLMs do not “know” your current situation beyond the text you provide and the tokens they can access, performance depends heavily on what context you place in the prompt: instructions, constraints, facts, prior steps, and goals. Good context engineering turns a general model into a task-competent assistant by shaping what it sees and how it should reason.

It matters because LLMs operate within strict context windows and attention budgets. Even as windows grow, the computational cost of attention typically increases with input length, and irrelevant text can dilute or derail reasoning. In multiagent systems, the problem compounds: many agents produce messages, tools generate outputs, and only a subset is useful for the next decision. Without disciplined context selection, agents repeat work, overlook constraints, or act inconsistently across steps.

At a high level, context engineering answers three questions: what to include, how to format it, and when to refresh or forget it. The “what” blends recency (latest state), relevance (closest to the current query), reliability (trusted sources), and role (who produced it). The “how” covers instruction scaffolding—system messages, role prompts, few-shot examples, schemas, and function or tool definitions. The “when” governs lifecycle: initial seeding for a task, incremental updates after each step, and consolidation (summaries, checkpoints) to keep the working set small but useful.

Practical techniques fall into several layers. RAG techniques can fill a context with external facts from vector stores or databases; reranking promotes the few most relevant passages; compression distills long histories into structured summaries; and slotting reserves fixed sections of the prompt for “must include” items such as safety rules, APIs, or constraints. For agents, planners attach goals and subgoals, tool brokers include function signatures, and state managers inject the latest environment variables or workflow metadata. The best systems combine these so the model always sees a compact, curated view of the world.

As we stated earlier, memory for agents is usually organized in tiers, each serving a distinct purpose. The fastest tier is the prompt itself—immediately visible to the model and forming its short-term working memory. A middle tier holds rolling summaries, recent decisions, and open tasks; this information is compact, easy to update, and quick to rehydrate into the prompt when needed. The long-term tier persists complete artifacts—documents, logs, prior conversations—and is accessed selectively through retrieval mechanisms that bring forward only what is relevant to the current query. Together, these tiers mirror the way humans and computers manage limited active memory: fast but small at the top, slower but larger below. Promotion and eviction policies govern what moves between tiers, guided by relevance, recency, and importance.

This layered memory naturally leads to caching, the operational technique that keeps the right data close to where it will be used next. In LLMs and agents, the context cache—the focus of context engineering—functions at the application level. It stores facts, summaries, and retrieved passages across steps, allowing the system to reuse prior context without refetching or regenerating it. Engineers treat these caches as part of the broader memory hierarchy: the prompt as hot cache, summaries as warm cache, and persistent stores as cold cache. Keys—such as embeddings, entity IDs, or goal identifiers—and time-to-live settings ensure that frequently needed information remains close at hand, while stale or irrelevant data is gradually purged. In essence, context caching operationalizes the same idea as memory tiering: maintaining a fluid, dynamic balance between speed, capacity, and relevance so agents can think efficiently at scale.

In context engineering, context quality hinges on its structure. Unstructured dumps waste tokens; structured prompts make expectations explicit. Typical scaffolding includes a brief objective, constraints, available tools with signatures, the current state, and a clear “next-action” request. When tools are available, function calling further constrains outputs to JSON schemas, improving determinism and downstream automation. Guardrails—policy checks, type validation, and source tagging—travel with the context so agents can justify actions and audit trails remain intact.

An interesting observation, and something we can learn from, is that the ideas behind context engineering are not new. Computing has long managed scarce working memory with hierarchy and policy. CPUs keep hot data in small, fast caches (L1/L2/L3), rely on locality to prefetch likely next bytes, and fall back to main memory when a cache miss occurs. Operating systems extend this with virtual memory: processes see a large, uniform address space while the OS maps pages to RAM or disk, tracks them in page tables, and uses a translation lookaside buffer (TLB) for speed. When RAM is running low, pages are swapped to disk; when they are needed again, a page fault brings them back.

Those same principles map cleanly to LLMs and agents. The prompt is analogous to L1 cache: small, fast, and precious. Rolling summaries resemble L2/L3: bigger but still quick to load. External stores—vector databases, document stores, data lakes—act like RAM and disk. Retrieval is a “page-in” operation; summarization and eviction are “page-out” policies. If you retrieve too much, you “thrash” the attention budget; if you retrieve too little, you starve the model of signal. Effective systems tune for locality: keep the most semantically related, recently used, and trustworthy pieces close to the model.

Temporal locality plays an obvious and critical role in context engineering. Just as computer processors cache the most recently accessed data because it’s likely to be reused soon, LLMs and agents benefit from prioritizing the most recent and time-relevant information in their working context. Recent events, state changes, and user instructions almost always have the highest predictive and reasoning value for the next step. Including timely data ensures continuity, prevents outdated assumptions, and keeps the reasoning chain aligned with the system’s real-world state. Conversely, when stale or lagging information dominates the prompt, the model wastes attention and risks acting on obsolete facts. Effective context engineering, therefore, mirrors cache optimization—keeping the “hottest” and most relevant information close to the reasoning core to sustain coherence and responsiveness over time.

While context engineering is a relatively new concern, it is based upon techniques and patterns (like the example of computer memory mentioned earlier) that have been used repeatedly in the past. Building on these concepts, we can assume that a probable future context engineering architecture consists of five primary components: a context manager, a retriever, a summarizer, a router, and a memory store. The context manager acts as the orchestrator, maintaining the working set of information that will feed into the next model invocation. The retriever interfaces with persistent stores or vector databases to locate relevant historical data or external knowledge. The summarizer compresses long histories or verbose artifacts into concise, structured representations that retain essential meaning while minimizing token cost. The router determines what level of detail each agent or task requires—full artifacts, summaries, or metadata—and passes the decision back to the context manager. Finally, the memory store persists all long-term data, providing durability and replay capability. Together, these components maintain a continuously updated equilibrium between speed, cost, and completeness.

These components interact and work together in a tight feedback loop. When a new event occurs—such as a user input, an observation, or an agent’s state update—the context manager receives the event and queries the retriever for related material. The summarizer condenses relevant background, the router decides what fidelity is required, and the memory store logs both the raw event and its processed form. Before invoking the model, the context manager assembles a prompt that blends immediate updates (temporal locality) with retrieved background (semantic relevance). After execution, results and new artifacts flow back into the memory store, updating indexes and summaries for the next iteration. This continuous cycle—retrieve, summarize, route, prompt, update—forms the core of a scalable context engineering architecture, ensuring that every model or agent step operates with the right information, at the right granularity, at exactly the right time.


### Agent Tools

As we have seen, LLMs act as an agent’s “brain.” And with task-management capabilities, an agent can work with collaborating agents—kind of like “colleagues” who can share insights or delegate tasks—when specialized knowledge is needed.

Tools, on the other hand, function as an agent’s “limbs.” Just as arms and legs let a person interact with the physical world, tools allow an agent to interact with its environment. They serve as the means by which the agent executes tasks that require external actions.

Tools come in various forms, broadly categorized as sensors or actuators.

Sensors gather data from the environment or the user—providing the information the agent can use to inform its decisions.

Actuators, conversely, perform actions; they do stuff based on the agent’s instructions, whether that’s sending a message, adjusting a setting, or triggering a process.

However, it is important to know that while agents and tools can at times appear to do the same thing, they are somewhat different. Agents operate asynchronously: they receive requests, work through them over extended durations, and eventually return results. This asynchronous model allows for long-duration tasks that may require multiple iterations or collaborations. And to handle these tasks may require state management over extended interactions. In contrast, tools typically operate synchronously; they are invoked and then execute a one-shot, immediate action.

One additional note to consider: this does not mean that, internally, the tool steps are executed synchronously—they can be asynchronous internally (for example, calling a corporate API in a publish-subscribe manner), but from the perspective of the agent calling the tools, they act as an inline function: they are called, wait for completion, get a result, and then carry on.

Modern implementations of these concepts are evident in frameworks such as Anthropic’sModel Context Protocol (MCP)

Model Context Protocol (MCP) andLangChainLangChain, which define standardized invocation patterns for tools. This standardization simplifies the integration of diverse tools, ensuring that regardless of whether they are used as sensors or actuators, they can be seamlessly incorporated into the agent’s workflow.


## Agent Task Management

Task decomposition, planning, and execution are a complex endeavor. Consider interpreting a task when requests (prompts) can take any number of forms, may be ambiguous, and can be conveyed using different media (text, audio, video, and more). Then consider that the tasks to fulfill a request may require in-depth domain knowledge. Then, once a step-by-step task plan is created, consider how an agent can determine which tools to use or which other agents it should collaborate with. And finally, once all of this is done, consider that a task may run over the course of minutes, hours, or even days, and must be restartable either when it breaks or when it requires and receives additional human input.

So how does all of this work? First, a task plan is created; then collaborators and tools are identified and plugged into the task plan; and third, parameters are plugged into each step for each collaborator/tool based upon the input (prompt) provided. Figure 5-5Figure 5-5 illustrates the approach that this section elaborates.


*[Diagram illustrating agent task management with three steps: creating a task plan, identifying collaborators/tools, and parameter substitution, based on a prompt.]*


###### Figure 5-5. Agent task management


### Creating the Task Plan

Once a request (prompt) has been provided, the agent must create a task plan, as shown in Figure 5-6Figure 5-6, that will fulfill the request.


*[Diagram illustrating an agent using a task plan to process a request to open a credit card account, detailing steps like verifying identity and performing KYC.]*


###### Figure 5-6. Create the agent task plan

A task plan is composed of two main components:

UUIDA unique ID that identifies the task within the agent ecosystemStepsA series of steps that are used to fulfill a task; a simpler task may have sequential steps, and a more complex task may lay out steps that may be constructed as directed acyclic graphs (DAGs)directed acyclic graphs (DAGs)

Each step is composed of several subcomponents, each of which is populated in the next stages:

Step IDAn identifier that uniquely identifies the step within the taskCollaborator/toolThe fully qualified name of the collaborator agent or tool that fulfills this specific stepParametersThe set of parameters that the collaborator or tool requires to fulfill the stepStatusThe status of the specific step, initially a default value (READY, for example), that reflects the execution state of the stepResults/detailsThe results of the step once it is completedThere are several techniques used to create this task plan. If the agent’s LLM is trained in a domain related to the request, then it may have the knowledge immediately available to create a solid task plan. On the other hand, if the agent’s LLM training does not make it an expert in task planning, then we need to provide explicit guidance—a strategy—that tells the agent’s LLM how to create a task plan.

A typical strategy could be phrased in a number of ways, but since we are asking an LLM to create the task plan, there are probably several things we should consider using:

Natural languageThe strategy should be defined using natural language.

JSON SchemaThe LLM should be provided guidance to create a task plan that conforms to a particular structure. Assuming the task plan is structured as a JSON objectJSON object, then we could provide a JSON SchemaJSON Schema that defines in explicit detail each field within the task plan.

JSON samplesThe LLM should be provided several examples of a good task plan (presumably each example conforms to the provided JSON Schema).


### Identifying Collaborators and Tools

Once a task plan has been created, the next step is to connect each step in the task plan to collaborators and tools that will execute the task step (Figure 5-7Figure 5-7). But how are they identified, where do they come from, and how are they plugged into the task plan?


*[Diagram illustrating how a language learning model (LLM) assigns specific agents and tools to each step of a task plan, such as identity verification and customer notification.]*


###### Figure 5-7. Identifying an agent’s collaborators and tools

An agent searches an inventory of available collaborating agents and tools and then plugs the collaborator/tool name into the task plan (for example, Step 1 will be done by Agent 1, Step 2 will be done by Tool 2). This inventory is maintained in a registry, which is explained in more detail in Chapter 8Chapter 8, but for now, think of it as a repository of information about all agents and tools in the agent ecosystem.


### Parameters Substitution

Finally, the prompt provided by the user contains specific information relevant to fulfilling a request. An agent would use its LLM, as shown in Figure 5-8Figure 5-8, to identify information in the prompt and map this to the parameters required by each agent or tool.


*[Diagram illustrating parameter substitution, where an input prompt is decomposed into parameters and integrated into a structured task plan involving various agents for identity verification, KYC processes, product selection, and customer notification.]*


###### Figure 5-8. Parameter substitution


### Executing the Task Plan

At this point, we have a practical task plan with multiple well-laid-out steps, with each step having an identified tool or collaborator, with the required parameters plugged in. But how does it get executed? Figure 5-9Figure 5-9 shows how this works, but there are two schools of thought on this: use the LLM’s capability to invoke steps in the task plan, or use a programmatic method of executing the task plan. Either way works, but each has pros and cons.


*[Diagram showing a task execution process, where a task plan inputs into an agent execution engine, which then coordinates with different tools or agents.]*


###### Figure 5-9. Task execution

The primary drawback of LLM task execution is that LLMs are nondeterministic, meaning that probabilities determine execution steps, which may vary from time-to-time (or cause errors or hallucinations). For small requests, the probability of error may be very low, and hence this can be tolerable. But for larger or more complex requests, errors may increase to the point where it exceeds the threshold or tolerance of the requestor. And in cases where error thresholds are exceeded, the black-box nature of LLMs may make LLMs difficult to debug, understand, or explain. This approach is used by AI workflow where the LLM governs all aspects of task execution.

Agents, on the other hand, have a second choice: decouple task planning from execution and use alternate, perhaps more deterministic execution engines that are more repeatable, explainable, and reliable.


## Agent Interactions and Conversations

Agents collaborate to complete tasks. These collaborations are grouped into interactions—simple request/response between agents as well as longer-running conversations composed of many interactions allowing one or more agent messaging models.


### Agent Messaging Model

In large-scale systems, communication strategies extend well beyond the traditional request-response API interactions designed for low-latency and immediate replies, encompassing a range of message models that support more complex, prolonged dialogues. These models, as shown in Figure 5-10Figure 5-10, include the following:

Message queues, which decouple sender and receiver to manage asynchronous interactionsEvent-driven or streaming messaging, where agents subscribe to continuous streams of events, enabling real-time responsiveness to dynamic dataActor-based architectures, in which independent agents process messages and maintain their own state for enhanced modularity and resilienceShared workspaces, which create collaborative environments where agents pool data and insights toward common goals


*[Diagram showing a comparison of three agent messaging models: Request-Response, Messaging, and Event Driven, illustrating how agents interact and communicate in collaborative environments.]*


###### Figure 5-10. Agent messaging models

Let’s start with a few definitions:

Request-responseThis model is a synchronous messaging pattern where one system initiates a call by sending a request and then waits for a reply, enabling immediate feedback and error handling. For example, when a user logs in to an online banking application, the app sends a login request to the server, which then validates the credentials and sends back a response confirming access or detailing an error. Similarly, in a web API scenario, a client might request product details by invoking a RESTful endpoint, and the server responds with the corresponding product information in real time.

MessagingThis model facilitates data exchange in distributed systems through various asynchronous patterns, decoupling senders and receivers to improve scalability and resilience. For instance, in asynchronous queue-based messaging systems like RabbitMQ or IBM MQ allow a producer to send messages into a queue, where they remain until a consumer retrieves and processes them, ensuring reliability even under varying loads. Another model is the publish-subscribe (pub/sub) pattern, where a publisher sends messages to a topic and multiple subscribers can independently receive and process those messages; platforms like Apache Kafka and Google Pub/Sub exemplify this approach. These models support diverse enterprise requirements, from processing orders and updating inventory in ecommerce systems to disseminating real-time notifications across microservices architectures.

Event-driven modelsThis model (sometimes considered an architectural pattern) lets components of a system communicate by emitting and reacting to events—discrete signals that something has happened—which allow for decoupled, responsive, and scalable processes. For example, in an ecommerce system, the completion of a purchase might trigger an “order placed” event that various services subscribe to, such as inventory management, payment processing, and shipping logistics, enabling them to act independently as the event occurs. Similarly, in an Internet of Things (IoT) scenario, sensors detecting a threshold breach can publish events that trigger immediate alerts, data logging, or automated safety responses.

Each of these models can be applied to agents. However, there are pros and cons to each, and ultimately some may be more appropriate than others for agent communications. First, agent communications diverge significantly from traditional request-response interactions (commonly used for APIs). While APIs follow a request-response model that is designed for immediate, low-latency interactions, agents operate through a conversation-based approach that can span longer periods and involve more complex interactions. This distinction is fundamental, as it shapes the underlying communication protocols and the overall architecture of the system.

Traditional APIs rely on standardized request-response models like REST/HTTP or gRPC. These protocols are optimized for speed and efficiency, returning a response almost immediately after a request is made. This design works well for straightforward tasks, where the interaction is a simple, synchronous exchange of information. In contrast, agents are built to handle more intricate conversations that may require additional context, multiple rounds of interaction, and sometimes even collaboration with other agents.

Because agent interactions can be drawn out over longer durations, they need a different communications model. Instead of a single request and immediate reply, agents often engage in extended dialogues. This conversation model must accommodate delays, intermittent processing, and potentially asynchronous responses, all of which are not typically found in the rigid, low-latency environments of traditional APIs.

One common method of supporting such asynchronous interactions is using amessage queuemodel. In this approach, one agent, the sender, places a message into a queue, where another agent, the receiver, processes the request. This setup decouples the agent sender and receiver, allowing the sending agent to continue its operation without being blocked during the time it takes for the message to be processed. Message queues ensure that every message is eventually handled, even if there are delays, making them ideal for managing extended conversations and complex workflows.

Another method is event-driven orstreaming messaging. In this model, agents subscribe to a stream of events, reacting to new data as it arrives. This continuous flow of information allows agents to process updates on the fly and maintain an active dialogue with their environment. The event-driven approach is particularly useful when the conversation involves dynamic, rapidly changing information that needs to be handled immediately as part of the conversation flow.

A third model used in agent communications is theactor model. Here, each agent is treated as an independent actor that can process messages, change its state, and communicate with other actors. Each actor handles its own tasks and interactions, allowing for a more modular and resilient system where failures in one actor do not necessarily impact the whole system.

Finally, shared workspaces provide a common environment where multiple agents can collaborate more broadly. In these workspaces, agents write to a region that is accessible by many agents (for example: memory, database) and hence are not just engaging in one-to-one conversations but are part of a larger ecosystem that facilitates the pooling of resources, data, and insights.

Shared workspaces are particularly useful in simulation scenarios or when agents are working toward a common goal. In such cases, the workspace acts as a digital laboratory or control room where agents can experiment with different approaches, test hypotheses, and iterate on solutions in real time. This goal-oriented collaboration helps to streamline complex processes that would be too unwieldy for a single agent or simple conversational exchanges.

These diverse models—message queues, event-driven/streaming messaging, and actor-based architectures—provide the necessary infrastructure to handle the extended, asynchronous nature of agent conversations, ensuring that the system remains robust even when interactions span longer durations and involve multiple steps or agents.


### Agent Conversation Management

While agents can communicate using a variety of messaging models, they interact in what we call “conversations” modeled upon the obvious human equivalent. Like the real-world equivalent, a conversation is composed of multiple interactions, with each interaction adding to the conversation’s information flow and history. And again, like real-world conversations, as shown in Figure 5-11Figure 5-11, conversations may span time frames of milliseconds, minutes, days, or even longer.


*[Diagram illustrating the flow and state management of agent conversations over varying time frames, highlighting how multiple agents and tools interact and manage conversational states for continuity and task execution.]*


###### Figure 5-11. Agent conversation management

One way to think of conversations is to relate them to programming. Agent conversations are structured in a way that mirrors the function call tree in programming. In agent conversations, one agent may initiate a conversation with a second agent, which in turn communicates with a third, and so on. This can happen in a serial fashion, where each response is dependent on the previous one, or in parallel, where multiple agents work on different branches of a conversation simultaneously. Such structures allow for complex problem-solving, where each agent contributes a specific piece of the overall task. The key is that a single conversation spans multiple interactions across multiple agents. In effect, the conversation is the thing that binds together end-to-end agent interactions.

Within these conversations, different types of interactions offer distinct capabilities. For instance, greetings and discussion interactions are designed to frame the conversation without directly requesting specific actions. These initial exchanges set the tone, establish context, and allow the agents to gauge the overall intent and environment of the dialogue, much as humans exchange pleasantries before diving into a substantive discussion.

Information interactions provide essential context for a task. These exchanges are not about issuing commands but rather about sharing relevant data, clarifying details, and ensuring that all agents involved have a shared understanding of the task at hand. By establishing a solid informational foundation, agents can work more effectively together, reducing the risk of miscommunication or errors as the conversation unfolds.

Task request interactions are the core functional exchanges within agent conversations. Here, an agent conveys a specific request or command (coupled with any information flows), which sets off a chain of responses aimed at fulfilling that request.

Task status interactions serve to update the conversation on the progress of a particular request. These messages keep all participants informed about the current execution, any encountered issues, and potential deviations from the original plan.


### Agent State Management

State management in computer science refers to the practice of tracking and controlling the state of a system or application. The state represents the current condition or snapshot of relevant data and variables that a program is working with at any given moment. This includes everything from user inputs and session details to the outcomes of various operations performed by the program.

In simpler terms, state management is like keeping a record of what is happening within an application. Just as a person might remember details of a conversation, a program must remember certain information to ensure continuity and consistency across various interactions or sessions. Without proper state management, an application might lose track of these details, leading to errors or unexpected behaviors.

One of the important considerations for state management is distinguishing between stateful and stateless designs. In a stateful system, the application maintains information about past interactions, which can be crucial for tasks like user authentication or maintaining a shopping cart. On the other hand, a stateless system treats each request independently without retaining any context, which can simplify design but might not be suitable for all types of applications.

In web development, for example, state management is critical for creating responsive and interactive applications. Techniques such as cookies, sessions, and local storage allow web applications to remember user actions and preferences over time. On a longer-term basis, a database may be used to store long-lasting or durable state. This ensures that even as users navigate between pages or reload a browser, their experience remains seamless and personalized.

Stateful processing, however, does introduce complexity. Concurrency, for example, introduces additional challenges for state management, especially in environments where multiple processes or threads may wish to access or modify the same state simultaneously. Techniques such as locking, transactional memory, or using immutable data structures are employed to prevent conflicts and ensure data integrity.

Why are we explaining stateless versus stateful considerations? This is primarily because agents—by their very nature—are stateful in that they must manage long-running conversations and must maintain a durable state to support restart-recovery or midconversation feedback from people (or other agents).

But what must be maintained to manage an agent’s state? Minimally, the following information about an agent’s state must be maintained:

Runtime stateTo determine if an agent is busy, waiting for input, or in an error stateConversation historyTo provide the context or short-term memory that an agent provides its LLM to respond to task requestsTask statusTo determine if an agent’s task is in progress, waiting for feedback, or in error stateTask stateMaintains all relevant information about a task (whether it is running or what its history is) to support restart-recovery and problem diagnosisThis state information can be maintained using a number of techniques. The simplest and most trivial solution, perhaps only suitable for demonstration purposes, is to maintain state in an agent’s memory. Obviously, this solution can work on a transient basis but will not support any long-term agent state. More common is to maintain agent state in a database and rely on a modern database’s sophisticated and reliable data management capabilities for long-term state management. Databases in particular are well suited for agent state management because well-designed distributed capabilities can easily support agents at scale (thousands, perhaps millions, of agents). Where sophisticated distributed state management is required (perhaps only for the most demanding of highly available data needs), approaches like distributed caching or consensus algorithms such as Paxos or Raft can help ensure that all parts of the system share a coherent view of the state.


### Agent Workspaces

Agents can collaborate using the previously mentioned messaging models, but their collaboration can also adhere to several well-established patterns, shared-memory based collaboration, which we call agent workspaces, illustrated in Figure 5-12Figure 5-12.


*[A diagram illustrating agent workspaces, showcasing a shared-memory model where multiple agents labeled A to J interact through a central workspace containing goals and tasks.]*


###### Figure 5-12. Agent workspaces

In task-oriented collaborations—in contrast to those using agent workspaces—agents operate with minimal sharing of information, relying primarily on the exchange of specific requests. Each agent focuses on its designated function, passing along clear instructions without delving into the underlying details of its internal state. This streamlined approach ensures efficiency and maintains clear boundaries, much like how different departments in a company coordinate by handing off well-defined tasks rather than engaging in broad, open-ended discussions.

However, simulations or goal-oriented collaborations require a more robust sharing of information. Here, agents work collectively to achieve a complex outcome, pooling their data, insights, and progress updates in real time. This collaborative method is akin to a multidisciplinary team brainstorming to solve a complex problem, where each member’s input is essential to charting a successful course toward the shared objective.

For agents to effectively share information, a common workspace is necessary—a centralized digital environment where data, context, and communications can be pooled and accessed by all collaborating agents. This workspace serves as the shared canvas upon which agents can not only exchange information but also align their actions and coordinate their strategies. It creates a framework within which the nuances of each agent’s contributions are visible, enabling a cohesive and integrated approach to problem-solving.

However, establishing a workspace for agent collaboration brings its own set of challenges, particularly regarding security and access rights (workspace security is addressed fully later). Just as a secure physical meeting room restricts entry to authorized personnel, a digital workspace must enforce strict controls to ensure that only verified agents have access. This involves implementing robust authentication mechanisms and defining granular access permissions, ensuring that sensitive data is protected while still enabling effective collaboration.


### Agent Identities and Roles

Agent identities and roles are required to support collaboration in a multiagent ecosystem. This foundational structure underpins the smooth functioning and secure interaction of agents, much like the importance of individual identities in any well-organized organization. At the heart of these identities is the concept of a fully qualified name, or FQN. The FQN serves as a unique identifier that distinguishes one agent from another. It is composed of two parts: a namespace and a local name, with a separator (a colon, for example) between them. For example, an agent might have an FQN such as:brodagroupsoftware:bank-agentIn this instance, brodagroupsoftware represents the namespace, while bank-agent is the local name. This naming convention provides an immediate indication of the agent’s function and the organization or group to which it belongs.

Namespaces are unique across the agent ecosystem. Namespaces could be assigned using any logical structure appropriate for an agent ecosystem. For example, in a public agent ecosystem, namespaces may reflect the organization that created or owns the agent. Inside an organization, for example, a namespace may reflect the group within the organization that created or owns the agent.

Within each namespace, the local names of agents are also maintained uniquely. This means that even if two agents serve similar functions in different organizations (that is, namespaces), their FQN will remain distinct due to the unique namespace prefix. Similarly, within a given namespace such as a group, it ensures that only one agent is designated for a specific purpose.

However, since agents need to scale (and have fault tolerance) for larger organizations, each agent, designated by its FQN, may have multiple instances. Since the same agent FQN might be deployed in multiple instances, each instance of an agent is assigned auniversally unique identifier (typically called a UUID, which is a string that uniquely identifies an object—in our case, an agent).

Each agent is also assigned a role that is intended to define its specific responsibilities within the ecosystem. These roles are recorded in an Identity Book of Record (IBOR), a centralized registry that maintains detailed information about every agent’s function and permissions. Each role is given specific access rights using an RBAC scheme. By assigning specific roles to agents, the system can enforce policies that determine which agents are allowed to communicate or collaborate with one another. RBAC is also used to govern the access and utilization of tools. Agents must have the proper role to access specific tools, which ensures that sensitive operations are only performed by those with the appropriate level of clearance.


## Agent Types

Agents can be categorized into types based upon their operating characteristics:

Task-oriented agentsGoal-oriented agentsSimulation agentsObserver agents


### Task-Oriented Agents

Task-oriented agents carry out tasks with clear objectives and directives provided by users or other agents. As shown in Figure 5-13Figure 5-13, they work by receiving a goal (defined by a prompt, potentially with parameters), formulating a structured plan to achieve it, and then executing that plan autonomously.


*[Diagram illustrating the sequential steps a task-oriented agent takes to open a credit card account, starting with a prompt and progressing through multiple steps and sub-steps.]*


###### Figure 5-13. Task-oriented agents

Task-oriented agents exchange a minimal amount of data, typically only what is required to fulfill a task and coordinate with other agents (or execute tools). Each task can involve multiple discrete subtasks that vary significantly in duration, ranging from mere seconds to several hours (or longer). To manage this variability, task-oriented agents maintain state information throughout their interactions, ensuring that progress is tracked, dependencies are managed, and any interruptions can be handled without losing the context of the overall objective.

Consider our bank account opening use case as an example of task-oriented operations. When a customer initiates an account opening request, a dedicated account open agent takes charge. This agent receives the customer’s request and then creates a detailed plan to complete the account opening process by handing off specialized subtasks to other agents in the ecosystem.

In this example, the first subtask might involve identity verification. The account open agent delegates this to an identity verification agent, which confirms the customer’s identity by accessing tools to validate provided information and documents. Following identity verification, the account open agent moves on to the know your customer (KYC) process. This task is handled by a dedicated KYC agent that assesses the customer’s background and risk profile to comply with regulatory standards. Once the KYC agent completes, the account open agent then proceeds with setting up the account, which includes coordinating with an initial deposit agent responsible for handling the customer’s initial funds.

Finally, after all the core tasks are complete, the account open agent delegates the final step to a notification agent. This agent communicates the outcome—such as the successful opening of the account and any next steps—to the customer. Throughout this process, the task-oriented architecture ensures that each specialized agent works on its designated subtask while the overall account opening workflow remains coherent, efficient, and adaptive to any unexpected delays or issues.


### Goal-Oriented Agents

Goal-oriented agents, shown in Figure 5-14Figure 5-14, are designed to work collaboratively, engaging in extended, dynamic conversations to solve complex problems that lack a predetermined sequence of tasks. Unlike task-oriented agents that mimic a request-response approach, goal-oriented agents continuously evaluate the shared objective and adjust their strategies in real time. Their flexibility makes them especially useful in environments that require ongoing negotiation and adjustment.


*[Diagram illustrating the interactions of goal-oriented agents within a shared workspace to achieve the goal of opening a credit card account, showcasing collaborative dialogue and dynamic strategy adjustment.]*


###### Figure 5-14. Goal-oriented agents

An important feature of this approach is the use of a shared workspace where agents can post, access, and update information. This workspace functions as a common scratchpad, allowing multiple agents to see the evolving conversation, track progress, and adjust their contributions based on the latest shared data. Within the shared workspace, agents exchange not only discrete data points but also complete conversational threads that encapsulate the context and rationale behind decisions.

This ongoing data exchange allows each agent to form a deeper, longer-term understanding of the collective goal, ensuring that each agent’s input is informed by the most current state of the project. The result is a series of interactions where the end-to-end conversation in the workspace serves as a complete history of the collaborative problem-solving process.

Of particular note is that the dynamic nature of goal-oriented agents allows them to continuously refine their plans. They are capable of adjusting their approach based on feedback received from other agents in the shared workspace or from external events. This iterative planning and adaptation process enables the agents to tackle complex issues that evolve over time rather than merely executing preset tasks.

Consider a financial services scenario where a group of agents is tasked with optimizing an investment portfolio for a large institutional client. In this example, one agent might be responsible for aggregating market data and news, another could analyze risk and compliance factors, while a third agent integrates client-specific preferences and performance metrics. Together, these agents work toward the shared goal of creating a balanced portfolio that maximizes returns while minimizing risk.

Each agent in the financial services example has a defined role within the collective objective. The market data agent continuously monitors economic indicators and financial news, feeding up-to-date information into the shared workspace. Simultaneously, the risk analysis agent evaluates the volatility and potential downsides of various assets, ensuring that any recommended adjustments align with regulatory standards and risk tolerance. Finally, the client advisory agent synthesizes these insights, tailoring the investment recommendations to match the client’s strategic goals.

In this collaborative ecosystem, the shared workspace is essential for real-time data integration. Agents draw on external sources—such as live market feeds and historical performance data—to inform their decision making. This external data, when merged with the internal conversation state, allows agents to dynamically adjust their recommendations in response to sudden market changes or emerging trends, ensuring that the portfolio remains optimally aligned with the client’s goals.

Continuous feedback is an important characteristic of the goal-oriented agent model. As each agent contributes its knowledge, the workspace evolves into a comprehensive narrative that reflects the collective reasoning process. Agents review this narrative to detect inconsistencies or opportunities for improvement, engaging in a form of continuous self-correction that enhances the overall decision-making process.

The collaborative model also likely requires advanced security and access control measures. In situations where data sensitivity is paramount, robust authentication protocols and RBACs may be required to secure the shared workspace.


### Simulation Agents

Simulation agents, as shown in Figure 5-15Figure 5-15, are designed to explore complex systems by creating and interacting within virtual models. These agents work together over extended periods, engaging in continuous data exchanges to simulate the intricacies of real-world environments. Their primary aim is to observe emergent behavioremergent behavior—patterns and phenomena that arise from the interactions of many simple components. This emergent behavior offers valuable insights into system dynamics that would be difficult to capture through isolated or static analyses.


*[Diagram illustrating simulation agents interacting within a shared workspace, highlighting data flow from human participants to agents and resulting interactions.]*


###### Figure 5-15. Simulation agent

Much like goal-oriented agents, simulation agents leverage a shared workspace—a collaborative environment where groups of agents post and retrieve data in real time. This shared workspace—as for goal-oriented-agents—acts as a history of all agent conversations that can be used to understand emergent behavior. By continuously updating this workspace, the agents maintain a comprehensive and evolving picture of the simulated environment, ensuring that every decision is informed by the collective state of the systemLet’s look at an example. In the context of insurance asset management loss analysis, simulation agents can be deployed to model the behavior of an insurance portfolio under various risk scenarios. For example, one set of agents might simulate historical loss data and asset performance, while another set models external factors like market fluctuations and catastrophic events. By interacting within a shared workspace, these agents continuously exchange insights on claim trends, asset devaluations, and risk exposures. The result is a dynamic simulation that helps insurers understand potential loss patterns and prepare more resilient strategies.

Interestingly, the extended interactions among simulation agents enable the detection of nonlinear and unexpected outcomes in the system. As each agent contributes its specialized analysis, the shared workspace becomes a repository of evolving insights. This collaborative simulation can reveal emergent phenomena, such as clusters of losses or unforeseen correlations between market variables and claim frequencies in our insurance asset management example, which might otherwise remain hidden.


### Observer Agents

Agents can act like smart sensors, or observers, in a complex ecosystem, continuously scanning their environment to detect critical changes, as shown in Figure 5-16Figure 5-16. For example, in financial markets, these agents are programmed to monitor vast streams of data—from market price fluctuations to breaking news—and identify events that may indicate significant shifts. Their operation is similar to that of a highly sensitive sensor that detects anomalies and logs these events for further analysis.


*[Diagram illustrating how observer agents monitor multiple resources and update other agents when significant changes occur.]*


###### Figure 5-16. Observer agents

But observer agents function not only as sensors but also as smart actuators. Upon detecting a relevant change, they process the incoming data, evaluate it against predefined thresholds or criteria, and then emit intelligent outputs, such as triggering a trade signal or alerting a human operator.

This integrated sensing and acting functionality is particularly important in fast-paced environments like financial trading. For instance, consider an observer agent deployed in the stock market that tracks both quantitative market data and qualitative news events. When a major product launch is announced by a technology company, the agent immediately registers this news alongside a spike in trading volume. It then cross-references historical data and applies its decision logic to determine whether this event typically correlates with a buy signal. This behavior mirrors how human analysts synthesize diverse inputs into actionable trading recommendations.

In many cases, these agents operate on event-driven or threshold-based triggers. They continuously consume market inputs, and when specific criteria are met—such as a rapid decline in stock price or an unexpected surge in trading volume—they log the event and alert other parts of the system to take action. This responsive mechanism ensures that the system remains agile and can respond to volatile market conditions almost instantaneously.

When multiple observer agents are deployed, they can collaborate using a shared scratchpad—a common workspace where they record and exchange observations. In the context of financial markets, this collaboration might involve sharing real-time insights about emerging trends or corroborating signals before issuing a collective recommendation. This cooperative model, which integrates both sensor and actuator roles, significantly enhances decision accuracy and system responsiveness, a concept that is increasingly important not just in today’s automated trading market but in many fast-paced environments across numerous industries.


## Agent Patterns

A pattern, sometimes referred to as an architecture pattern, represents a reusable solution to a problem that frequently arises in system design. It provides a high-level framework or template that guides the structuring and organization of systems—in our context, agents. Unlike specific implementations, patterns are abstract, offering the flexibility to be tailored according to distinct requirements, thereby fostering a more adaptable design approach.

When applied effectively, these patterns have many benefits. They promote reusability by offering a standard, repeatable solution to recurring design challenges. This consistency not only saves time and resources but also helps establish a common language among developers, making it easier to communicate ideas and strategies, especially in complex environments where precision and collaboration are key.

And by embracing a higher level of abstraction, patterns allow developers to concentrate on overall design and architecture rather than getting bogged down by intricate implementation details. This focus on broad design principles encourages the use of proven practices, which often result in more scalable and interoperable systems. Ultimately, patterns act as a blueprint for building robust and maintainable agent ecosystems, providing a strong foundation for innovation and growth in both business and tech domains.

So let’s take a look at some agent patterns.


### Agent Communication Patterns

Communication patterns, as shown in Figure 5-17Figure 5-17, define the interactions and information exchange within an agent ecosystem. Unlike functional patterns, which focus on how agents fulfill their objective, communication patterns emphasize the structure of exchanges between agents or with users.


*[Diagram illustrating six agent communication patterns: Interaction, Delegation, Conversation, Attention, Broadcast, and Listener.]*


###### Figure 5-17. Agent communication patterns

The figure includes several common agent communication patterns.


#### Interaction pattern

The interaction pattern is a straightforward communication model where a sender—whether a human or an agent—issues a request and the receiving agent immediately processes that input to deliver a response. This model is synchronous and one-to-one, making it ideal for simple exchanges that don’t require maintaining long-term state or memory between interactions. Commonly seen in chatbots and virtual assistants, this pattern meets users’ expectations for quick and predictable responses. Its simplicity not only streamlines the user experience but also makes it easy to implement and scale, with minimal overhead in managing conversation history.


#### Delegation pattern

The delegation pattern demonstrates how one agent hands off a task to another by transferring both the responsibility and the necessary data. In this setup, the original agent may occasionally check in on the progress, but it generally allows the receiving agent to manage the task independently. This hands-off approach is especially beneficial in scenarios where tasks are too complex or require specialized expertise. By leveraging delegation, systems can distribute workload more efficiently and tap into a broader pool of skills. This not only streamlines processes but also lets organizations focus on strategic oversight, making it an effective model for both business and tech executives.


#### Conversation pattern

The conversation pattern enables stateful, multistep communication where agents retain context over a series of exchanges. Unlike simple request-response interactions, this approach allows for extended dialogues that can last from seconds to even days. By preserving the conversation’s context, agents can build on previous interactions, adjust their responses based on earlier inputs, and maintain a coherent flow throughout the process.

This pattern is particularly effective for long-running collaborations. It lets agents negotiate, refine, and align their goals across multiple stages of dialogue, often involving several agents working together to tackle complex tasks, simulations, or goals. The shared context helps ensure coordinated action, reducing the chances of miscommunication or redundant efforts along the way.

Moreover, the conversation pattern is not limited to agent-to-agent interactions—it also facilitates communication with people. When agents need extra information or clarification to complete a task, they can engage in dialogue with humans, seamlessly integrating that input into the ongoing conversation. This dynamic exchange not only enriches the interaction but also creates a more responsive and adaptable environment.


#### Attention pattern

The attention pattern creates a dedicated channel for out-of-band interactions, allowing agents to signal when intervention is needed from another agent or person—without interrupting the regular communication flow. It’s designed to let agents step aside from their usual task-oriented or conversational exchanges when unusual conditions arise or when they need additional information.

By establishing this separate pathway for urgent interactions, the attention pattern offers a reliable method for flagging exceptions or requesting extra human input. This ensures that critical issues are addressed promptly, all while keeping the normal flow of communications running smoothly.


#### Broadcast pattern

The broadcast pattern lets a single agent send information to multiple recipients (other agents or people) at once. This unidirectional approach means that the sender pushes out data without expecting feedback, which simplifies the communication process and reduces overhead.


#### Listener pattern

The listener pattern is sometimes called apub/sub pattern, where agents subscribe to and publish notifications, allowing them to wake up and respond to interactions from other agents. This design decouples the sender from the receiver, enabling each agent to remain idle until a relevant event occurs. By avoiding constant polling, agents can operate more efficiently, only engaging when a specific notification triggers their involvement. This asynchronous communication framework is ideal for dynamic environments where timely responses are crucial.

Of particular interest, the listener pattern supports robust and scalable interactions by managing sporadic events in a streamlined manner. It provides a mechanism for agents to exchange information without disrupting the regular communication flow, ensuring that critical updates are handled promptly. For both business and tech executives, this pattern offers an elegant solution for creating responsive systems that can efficiently coordinate complex tasks across multiple agents.


### Agent Role Patterns

Role patterns, shown in Figure 5-18Figure 5-18, define the specific responsibilities and behaviors of agents (that is, the role they play) within an agent ecosystem.


*[Diagram illustrating different agent role patterns, including Planner, Orchestrator, Executor, Observer, Judge, and Enforcer, each showing a unique flow of actions and responsibilities.]*


###### Figure 5-18. Agent role patterns


#### Planner pattern

The planner pattern empowers agents to break down overarching goals into smaller, actionable steps. These agents craft strategies to tackle complex tasks by dividing them into manageable units, ensuring that each component of the larger objective is addressed methodically. By focusing on task decomposition, planner agents create a clear roadmap that transforms high-level goals into systematic plans.

Planner agents leverage data from their environment or from a registry of available agents and tools to not only formulate a task plan but also identify the best candidates to handle each subtask. They fill in necessary parameters drawn from the original request, ensuring precise execution. Once the plan is set, planner agents often collaborate with orchestrator agents to coordinate the implementation, fostering a seamless integration of efforts that benefits both business and tech-focused operations.


#### Orchestrator pattern

The orchestrator pattern empowers an agent to coordinate tasks among various agents, taking the strategic plans developed by planner agents and organizing their execution in a detailed manner. It manages the assignment of tasks, schedules actions, and ensures that appropriate resources are allocated for each step of the plan. While it does not execute the tasks itself—that role falls to executor agents—it plays a critical role in streamlining the process and maintaining order.

In addition to task coordination, the orchestrator agent keeps a close eye on task progress, identifying any issues that could hinder successful execution. This proactive monitoring helps maintain momentum and quickly address challenges as they arise, ensuring that complex projects proceed smoothly. For both business and tech executives, the orchestrator pattern provides a reliable framework for managing intricate workflows, fostering efficiency and precision in collaborative environments.


#### Executor pattern

The executor pattern focuses on taking the detailed plans created by planner agents and orchestrated by the orchestrator, and turning them into action. This agent is dedicated to executing individual steps within a larger task, ensuring that each part of the plan is carried out efficiently. By working directly with tools, external systems, and even other agents, the executor bridges the gap between strategic planning and tangible results.

In essence, while other agents design and coordinate the overall workflow, the executor is on the front lines, handling the nitty-gritty of task execution. This role is crucial for bringing plans to fruition, as it ensures that every step is completed as intended, enabling smooth progress and successful outcomes in complex projects.


#### Observer pattern

The observer pattern lets agents monitor specific systems, agents, or environments without actively intervening in their operations. It collects data through various sensors (via the internet or factory devices, for example) and processes this input to identify trends, patterns, or anomalies. The observer agent analyzes the gathered information and determines when to notify other agents or human operators about significant changes or potential issues. In addition, the observer agent may also make decisions based on the analyzed data and trigger alerts or further analysis.


#### Judge pattern

The judge pattern lets agents make decisions based on a set of established rules, standards, or ethical guidelines. It listens to notifications and inputs from observer agents, carefully assessing the information to spot any issues, unusual behavior, or potential policy breaches. This agent then decides whether a situation needs further resolution or intervention, ensuring that everything aligns with the predefined criteria.

In addition, the judge role adds a layer of explainability and transparency to the decision-making process. By clearly evaluating and justifying its choices, it not only helps maintain order and consistency but also builds trust among stakeholders. This clarity is essential in environments where accountability and ethical standards or regulatory compliance are important.


#### Enforcer pattern

The enforcer pattern acts on decisions made by other agents, like those in the judge role, by stepping in whenever rule violations or policy breaches are detected. It ensures compliance throughout the ecosystem by executing automated responses to fix discrepancies and, when necessary, reaching out to human operators for issues that demand extra oversight. This approach not only helps maintain order but also builds trust by making sure that established standards are consistently upheld.


### Agent Organizational Patterns

Organizational patterns, shown in Figure 5-19Figure 5-19, define how agents are structured and organized within an agent ecosystem.


*[Diagram illustrating various agent organizational patterns, including singleton, team/group, organization, swarms, ecosystem, legal entity, federation, and supply chain, showing different structures and connections among agents.]*


###### Figure 5-19. Agent organizational patterns


#### Singleton pattern

A singleton represents a person-to-agent (chatbot) or agent-to-agent relationship (a relationship, perhaps obviously, is indicative of collaboration) and is the simplest form of collaboration. Singleton agents act on their own and typically address very simple requests that do not involve long-term decision making or internal coordination with other agents. These interactions are largely independent, providing immediate responses (mostly via a request-response model) while executing commands based on user input.


#### Team pattern

The team pattern represents collaboration between multiple agents working together toward a shared goal. These teams can operate in a hierarchical way, where a leader agent assigns tasks, or in a decentralized manner, where all agents function as equal peers self-organizing to achieve their objectives.


#### Organization pattern

The organization pattern defines how teams of agents are structured within a larger ecosystem. In this pattern, a central governing agent or leader directs the behaviors of subordinate agents while making sure that individual tasks are aligned with overarching goals. The structure supports efficient coordination among agents, establishing a hierarchy that facilitates streamlined communication and consistent policy enforcement.

This pattern typically uses policies and governance mechanisms to regulate agent interactions that allow for better oversight and control, letting the agent ecosystem scale as the number of agents grows. The key challenge with this pattern, however, is to balance local autonomy and centralized governance/control. While a clear structure ensures that agents can work well within rules, at some point, centralized decision making may not outweigh the benefits (agility, for example) of local autonomy.


#### Swarm pattern

In the swarm pattern, no single agent acts as a central authority. In this pattern, agents self-organize based on local interactions, making autonomous decisions while collectively working toward shared goals. This approach eliminates a hierarchical command structure, enabling each agent to respond quickly to local conditions and contribute effectively to the overall objectives of the system.

This decentralized structure can enhance the scalability of the agent ecosystem. The pattern may also use distributed algorithms, peer-to-peer communication, and consensus-building techniques to maintain coordination among many agents. However, the increased speed and agility provided by the swarm pattern come with trade-offs in governance and centralized control. While agents benefit from rapid responsiveness and flexibility, the absence of a central authority can lead to challenges in enforcing uniform policies and ensuring consistent strategic direction across the system.


#### Ecosystem pattern

The ecosystem pattern has agents from multiple organizations or institutions working together to achieve a broader set of objectives (for example, in a firm, these may be business process goals), often without centralized control. In this pattern, agents from various organizations each retain their autonomy, making independent decisions while remaining aligned with common interests and goals.

The pattern emphasizes flexible relationships among agents and their organizations. But by fostering collaboration across organizational boundaries, the ecosystems pattern lets multiple independent agents coordinate their activities, share information, and align their actions without centralized control.


#### Legal entity pattern

The legal-entity pattern establishes a formal legal boundary around an agent organization, ensuring that the digital agents operate within a recognized legal framework. It provides a structure where the actions taken by agents are legally binding, allowing the organization to function as a separate legal entity.

Within this pattern, agents may execute the entire organizational structure, from strategic decision making to daily operations. Human involvement in organizations following the legal-entity pattern may be minimal and limited to supervisory or ethical oversight roles. The pattern is designed so that digital agents perform routine management and operational tasks autonomously while human operators provide guidance and intervention only when necessary. This separation of roles may enhance efficiency and speed while ensuring that the organization adheres to legal requirements.


#### Federation pattern

The federation pattern describes a collaborative framework where agents from independent organizations work together while retaining an appropriate level of individual autonomy. This pattern tries to balance centralized control and governance and local autonomy in a manner similar to governmental structures. At the highest level, a federal authority addresses global issues and establishes overarching rules and standards that apply to all participating agents. At a local level, agents exercise more autonomy by adapting these rules to local contexts, making decisions quickly based on immediate conditions. This tiered approach allows for uniform oversight and governance at the top while granting the agents closest to execution the flexibility to respond effectively to local challenges.

By integrating centralized governance with decentralized decision making, the federation pattern provides a balanced model that enhances overall system efficiency and coordination. The centralized framework ensures that all agents adhere to common standards and protocols, while local autonomy allows for rapid, context-specific responses. This structure supports scalability and enables complex, multistakeholder systems to operate cohesively, ensuring that both global and local requirements are met effectively.


#### Supply chain pattern

This pattern is an extension of the federation pattern, where many legal entities exist with relatively decentralized control but with formal contractual terms that govern collaboration.


## Agent Configuration

An agent configuration, as shown in Figure 5-20Figure 5-20, defines the characteristics and attributes of an agent. While an agent’s configuration can vary, at a minimum there are several core attributes that are defined:

Identity, description, and purposeTask execution strategySecurity configurationPolicies and certificationAgent and tool visibility


###### NOTE

One quick note—we have tried very hard to avoid showing code-level fragments so as to not portray a particular implementation or product configuration. However, at times we will address metadata for agents, users, interactions, and many other components. We believe the best way to visualize and, in fact, to understand this information is using a coding metaphor.

When this happens, we are representing agentic mesh metadata by showing it as YAML-like (not perfect YAML but using the expressiveness and structure of YAML). We do this because not only is YAML well understood in the technology community, but it also permits a level of descriptiveness that other formats do not provide (e.g., JSON, which is much harder to read, or textual format, which does not easily show relationships or hierarchies). To emphasize this point, we’ll use diagrams that show an “Illustrative” tag to make this as clear as possible.


*[Diagram illustrating the components of agent configuration, including name, description, purpose, task execution strategy, security configuration, policy, certification, and agent and tool visibility.]*


###### Figure 5-20. Agent configuration


### Identity, Description, and Purpose

Every agent is assigned a unique identifier known as itsfully qualified name (FQN) within the agent ecosystem. The FQN is composed of two key elements: a namespace and a local name, which together create a robust system for distinguishing agents within a complex network.

Namespaces play an important role in this identification framework by grouping related agents together. This grouping makes it easier to manage large numbers of agents, as each namespace provides a contextual boundary within which agents operate. The local name is the component of the FQN that uniquely identifies an agent within its namespace.

An agent’sdescription is a human-readable overview of an agent and can include anything that the agent’s creator deems useful. In many ways, it acts as an overall summary of the agent.

An agent’spurpose is an explicit and detailed definition of what an agent is supposed to do. Its primary purpose is to set clear expectations for an agent’s outcomes and outputs. In addition, an agent’s purpose serves as the baseline for governance, laying the foundation for how agents are managed and held accountable. With a well-defined purpose, it becomes easier to establish policies, monitor performance, and address any deviations from expected behavior.

We suggest that an agent’s approach (in fact, as much of its configuration as possible) be defined using natural language, making the process both intuitive and accessible. This approach simplifies the task for agent creators by allowing them to describe an agent’s purpose and functions in everyday language. It also enhances the system’s compatibility with LLMs, which can interpret and interact with these descriptions easily.

In our agent ecosystem, an agent’s configuration is maintained through a centralized registry and marketplace. Theregistry acts as a detailed, searchable database where information about agents—and even tools—is stored and updated. The key to finding an agent is to have useful and detailed information, which is where the purpose and description come in—they are the primary search criteria that let agents locate one another. Meanwhile, themarketplace is designed to let people discover agents (again, using purpose and description as key search fields) that meet their specific needs, serving as an accessible interface where potential users can browse and find agents they may wish to interact with.


### Task Execution Strategy

Once an agent has been identified using its purpose and descriptive information, it can be selected to fulfill a specific task (via the task-management process explained earlier). The strategy then comes into play by defining a clear strategy for task execution.

The task-fulfillment strategy is a set of detailed, step-by-step instructions that describe exactly how the agent will complete its assigned task. These instructions break down the overall goal into smaller, manageable actions, providing the guidance needed for end-to-end task fulfillment.

Like other parts of the agent configuration, the approach is also written in natural language. By using everyday language to outline strategies and steps, agent creators can easily articulate their ideas without needing specialized coding knowledge. Now, while natural language can sometimes be ambiguous, it is this very characteristic that offers unique advantages when interacting with LLMs. The inherent flexibility of natural language allows an agent’s LLM to interpret instructions in a broader context, giving it the latitude to execute tasks even without a fully detailed end-to-end process.

Ultimately, the combination of a well-defined strategy and natural language instructions empowers the agent to carry out its tasks dynamically and with a degree of autonomy. This approach not only streamlines the process of task execution but also enables the agent to adjust and refine its actions as needed, ensuring that it remains responsive to unexpected challenges and changes in the task environment.


### Security Configuration

There are several components of an agent’s security configuration, including its role and specific security characteristics.

An agent’s role defines the responsibilities and actions the agent is expected to perform, much like a human role within an organization. Just as human roles delineate duties and authority, an agent’s role provides structure and helps ensure that interactions and operations align with overall system objectives.

Obviously, security is a paramount concern in any agent ecosystem, and several options are available to protect both agents and the data they handle. An agent’s configuration lets you determine the security characteristics of your agent. For example, the mutual Transport Layer Security (mTLS) attribute determines how to secure communications by ensuring that both the client and server communicate using encryption. Additionally, incorporating OAuth2 enables controlled access, ensuring that only authorized actors—whether agents or human users—can interact with a specific agent.

Furthermore, an agent’s FQN, discussed earlier, can be used to integrate with an enterprise identity book of record, providing a way to verify credentials and confirm the agent’s designated role. This integration ensures that the agent’s identity is authenticated within the broader enterprise security framework, similar to how employee credentials are managed in a corporate directory.


### Policy and Certification

Agent configuration attributes related to policies serve as guardrails that guide an agent’s actions and decisions, aligning its behavior with the strategic objectives of the organization. Typically, the policies attached to an agent outline specific obligations that may be derived from regulatory requirements, corporate guidelines, or ethical standards. They provide a framework within which agents must operate, ensuring that all actions adhere to established rules and norms.

Certification attributes complement these policies by documenting the validation process of an agent’s compliance. They indicate which individual or authority has certified that the agent meets its designated purpose and adheres to its governing policies, along with the timestamp of that certification. This layer of verification builds trust within the ecosystem, as it offers transparency and assurance that agents are not only properly configured but also continuously aligned with both organizational and ethical standards.


### Agent and Tool Visibility

Agent and tool definitions are centrally maintained in a registry, which serves as the central database of configuration data for the agent ecosystem. This registry acts as a comprehensive directory, ensuring that all agents and tools are clearly documented, making it easier for both automated systems and human operators to discover, reference, and manage these components.

Agent visibility specifically defines which other agents a given agent is allowed to collaborate with. More specifically, when an agent is determining a task plan, one of the steps is to identify other agents that it can collaborate with to fulfill a request. By controlling agent visibility, organizations can limit interactions to those that are necessary and appropriate for the task at hand, thus enhancing security and efficiency within the ecosystem. Similarly, tool visibility outlines the specific tools an agent is permitted to interact with or consume.

Ideally an agent ecosystem implements azero-trust security posture, which means that, by default, no agents or tools are visible to any given agent unless explicitly allowed.

Zero trust is a security principle that assumes no implicit trust is granted to any entity—whether inside or outside the network—and requires continuous verification for every access attempt. This model minimizes risk by ensuring that agents start with no inherent permissions, reducing the potential for unauthorized actions and limiting any possible damage from compromised agents.

To support this zero-trust model, an agent is configured with zero agents and zero tools visible, essentially rendering it inactive until specific permissions are granted. This deliberate restriction ensures that an agent cannot cause any unintended consequences or security breaches without explicit authorization.

Visibility for agents and tools can be defined using various methods, including FQNs or regular expressions(regex). FQNs provide a precise and unambiguous way to specify which agents or tools are accessible, while regex offers a flexible approach to matching patterns in agent names (for example, it is relatively straightforward to create a regex to provide visibility to agents or tools with a specific namespace).


## Summary

This chapter presented a clear picture of how agent architectures can be designed. It underlined the importance of grounding these systems in solid principles like trustworthiness, reliability, and transparency—ensuring that every component, from task planning to execution, meets both technical and ethical benchmarks. And by breaking down complex operations into manageable, modular tasks and leveraging specialized tools, agents not only enhance system robustness but also pave the way for seamless scalability and continuous improvement.

Now that we’ve established the foundations of agent architecture, in Chapter 6Chapter 6, we turn to the enterprise context—exploring what it takes to move from well-designed agents in theory to enterprise-grade agents in practice: agents that are secure, scalable, trustworthy, and ready to integrate into the fabric of modern organizations.
