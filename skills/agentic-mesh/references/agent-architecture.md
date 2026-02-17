# Agent Architecture: Design Patterns & Structure

> Covers: `08-ch05-agent-architecture.md`

## Core Architectural Challenges

**Autonomy, Adaptability, Persistence** — Agents must make autonomous decisions without constant human guidance, adjust plans dynamically as new data emerges, and sustain coherent behavior over long interactions. Traditional software workflows fail in open-ended environments where information is incomplete and situations change unexpectedly. [→ source](chapters/08-ch05-agent-architecture.md#chapter-5-agent-architecture)

## Agent Principles

### Trustworthy and Accountable
- **Trustworthiness**: Agents must transparently adhere to defined purpose and comply with corporate, ethical, or regulatory policies. [→ source](chapters/08-ch05-agent-architecture.md#trustworthy-and-accountable)
- **Certification Framework**: Modeled on standards organizations (UL, CSA), includes application, evaluation, accredited testing environments, iterative review, formal certification, published metrics, and ongoing surveillance. [→ source](chapters/08-ch05-agent-architecture.md#trustworthy-and-accountable)
- **Accountability**: Agents must demonstrate trustworthiness through transparent decision-making processes and published operational records. [→ source](chapters/08-ch05-agent-architecture.md#trustworthy-and-accountable)

### Reliable and Durable
- **Five-nines reliability**: Agents in critical business environments must deliver 99.999% accuracy with minimal hallucinations. [→ source](chapters/08-ch05-agent-architecture.md#reliable-and-durable)
- **Durability**: Sustain operational performance over extended durations (minutes, hours, days) without performance degradation or loss of context. [→ source](chapters/08-ch05-agent-architecture.md#reliable-and-durable)

### Explainable and Traceable
- **Nondeterminism**: LLMs exhibit variability in output—identical inputs can yield different outputs due to probabilistic decision-making. Necessitates robust explainability mechanisms. [→ source](chapters/08-ch05-agent-architecture.md#explainable-and-traceable)
- **Explainability**: Recording task plans, tool/agent selection, and parameter insertion for each step. Makes agent behavior reviewable and understandable. [→ source](chapters/08-ch05-agent-architecture.md#explainable-and-traceable)
- **Traceability**: Unique identifiers (UUIDs) for originating tasks attach to each step/substep, enabling reconstruction of entire decision-making process. [→ source](chapters/08-ch05-agent-architecture.md#explainable-and-traceable)
- **End-to-end mapping**: Extends to interagent communication—detailed logs create complete task execution map for governance and compliance. [→ source](chapters/08-ch05-agent-architecture.md#explainable-and-traceable)

### Collaborative and Intelligent
- **Task decomposition**: Agents create step-by-step plans that break large tasks into smaller subtasks, selecting appropriate collaborators from registry. [→ source](chapters/08-ch05-agent-architecture.md#collaborative-and-intelligent)
- **Recursive delegation**: Collaborating agents create their own detailed plans, cascading task breakdown into hierarchy of simpler tasks. [→ source](chapters/08-ch05-agent-architecture.md#collaborative-and-intelligent)
- **Decomposability principle**: From software engineering—modular programming, API calls, function calls. In agents, the basic unit is an agent or tool. [→ source](chapters/08-ch05-agent-architecture.md#collaborative-and-intelligent)
- **Specialization**: Decomposability enables granular agents paired with fine-tuned LLMs or specialized data access (RAG). [→ source](chapters/08-ch05-agent-architecture.md#collaborative-and-intelligent)

## Agent Components

### Agent "Brain" (LLM)
- **Natural language interaction**: LLMs interpret and convert human inputs into data for planning and executing operations. [→ source](chapters/08-ch05-agent-architecture.md#agent-brain)
- **Pattern analysis and reasoning**: LLMs analyze patterns to reason about the world, appearing intelligent especially on training data topics. [→ source](chapters/08-ch05-agent-architecture.md#agent-brain)
- **Multimodality**: Modern LLMs handle text, video, audio, images—enabling diverse input processing. [→ source](chapters/08-ch05-agent-architecture.md#agent-brain)
- **Statelessness by default**: LLMs don't automatically remember conversations unless context is stored/fed back. [→ source](chapters/08-ch05-agent-architecture.md#agent-brain)
- **Hallucination**: LLMs may generate incorrect responses when lacking sufficient information or dealing with data beyond training cutoff. [→ source](chapters/08-ch05-agent-architecture.md#agent-brain)
- **Context sensitivity**: Phrasing and detail in prompts significantly impact LLM responses. [→ source](chapters/08-ch05-agent-architecture.md#agent-brain)

### Agent Memory
- **Native memory**: Knowledge encoded in LLM weights during training—static, reflects training-time worldview. [→ source](chapters/08-ch05-agent-architecture.md#agent-memory)
- **Short-term/contextual memory**: Active prompt and surrounding context—volatile, limited size, crucial for immediate reasoning. [→ source](chapters/08-ch05-agent-architecture.md#agent-memory)
- **Long-term/external memory**: RAG-powered retrieval from vector databases, document repositories, APIs—on-demand access to current knowledge. [→ source](chapters/08-ch05-agent-architecture.md#agent-memory)
- **Episodic memory**: Recalls specific interactions/experiences, provides continuity across sessions. [→ source](chapters/08-ch05-agent-architecture.md#agent-memory)
- **Procedural memory**: Encodes skills and repeatable behaviors—workflows, policy execution. [→ source](chapters/08-ch05-agent-architecture.md#agent-memory)
- **Semantic/conceptual memory**: Captures abstract relationships between ideas and entities—cognitive map of domain. [→ source](chapters/08-ch05-agent-architecture.md#agent-memory)
- **Factual memory**: Retains discrete truths—values, rules, verified data. [→ source](chapters/08-ch05-agent-architecture.md#agent-memory)
- **Ontologies and taxonomies**: Formal definitions of entities, categories, relationships—scaffolding for semantic retrieval. [→ source](chapters/08-ch05-agent-architecture.md#agent-memory)
- **Knowledge graphs**: Entities and relationships as nodes/edges—support reasoning, inference, cause/dependency/hierarchy. [→ source](chapters/08-ch05-agent-architecture.md#agent-memory)
- **Memory lifecycle**: Promotion, summarization, forgetting based on importance/frequency—prevents drift/bloat. [→ source](chapters/08-ch05-agent-architecture.md#agent-memory)

### Agent Context Engineering
- **Definition**: Selecting, structuring, delivering right information to LLM at right time. [→ source](chapters/08-ch05-agent-architecture.md#agent-context-engineering)
- **Three questions**: What to include, how to format it, when to refresh/forget it. [→ source](chapters/08-ch05-agent-architecture.md#agent-context-engineering)
- **Memory tiers**: Prompt (hot cache), rolling summaries (warm cache), persistent stores (cold cache). [→ source](chapters/08-ch05-agent-architecture.md#agent-context-engineering)
- **RAG techniques**: Fill context with external facts from vector stores/databases. [→ source](chapters/08-ch05-agent-architecture.md#agent-context-engineering)
- **Reranking**: Promotes few most relevant passages. [→ source](chapters/08-ch05-agent-architecture.md#agent-context-engineering)
- **Compression**: Distills long histories into structured summaries. [→ source](chapters/08-ch05-agent-architecture.md#agent-context-engineering)
- **Slotting**: Reserves fixed prompt sections for "must include" items (safety rules, APIs, constraints). [→ source](chapters/08-ch05-agent-architecture.md#agent-context-engineering)
- **Temporal locality**: Most recent/time-relevant information has highest predictive value for next step—mirrors CPU cache optimization. [→ source](chapters/08-ch05-agent-architecture.md#agent-context-engineering)
- **Context architecture components**: Context manager (orchestrator), retriever (persistent stores/vector DBs), summarizer (compresses histories), router (determines detail level), memory store (durability/replay). [→ source](chapters/08-ch05-agent-architecture.md#agent-context-engineering)
- **Feedback loop**: Retrieve → summarize → route → prompt → update. [→ source](chapters/08-ch05-agent-architecture.md#agent-context-engineering)

### Agent Tools
- **"Limbs" metaphor**: Tools allow agents to interact with environment—execute tasks requiring external actions. [→ source](chapters/08-ch05-agent-architecture.md#agent-tools)
- **Sensors**: Gather data from environment/user to inform agent decisions. [→ source](chapters/08-ch05-agent-architecture.md#agent-tools)
- **Actuators**: Perform actions based on agent instructions—send messages, adjust settings, trigger processes. [→ source](chapters/08-ch05-agent-architecture.md#agent-tools)
- **Synchronous operation**: Tools typically operate synchronously (one-shot, immediate action) vs. agents (asynchronous, long-duration). [→ source](chapters/08-ch05-agent-architecture.md#agent-tools)
- **MCP (Model Context Protocol)**: Anthropic framework defining standardized invocation patterns for tools. [→ source](chapters/08-ch05-agent-architecture.md#agent-tools)
- **LangChain**: Framework for standardized tool integration. [→ source](chapters/08-ch05-agent-architecture.md#agent-tools)

## Agent Task Management

### Creating the Task Plan
- **Task plan components**: UUID (unique task identifier), Steps (series of actions as sequential or DAG). [→ source](chapters/08-ch05-agent-architecture.md#creating-the-task-plan)
- **Step subcomponents**: Step ID, Collaborator/tool (FQN), Parameters, Status (READY initially), Results/details. [→ source](chapters/08-ch05-agent-architecture.md#creating-the-task-plan)
- **Task planning techniques**: LLM domain training, or explicit guidance strategy using natural language, JSON Schema, JSON samples. [→ source](chapters/08-ch05-agent-architecture.md#creating-the-task-plan)

### Identifying Collaborators and Tools
- **Registry search**: Agent searches inventory of available agents/tools maintained in registry. [→ source](chapters/08-ch05-agent-architecture.md#identifying-collaborators-and-tools)
- **Task plan population**: Plug collaborator/tool names into task plan steps. [→ source](chapters/08-ch05-agent-architecture.md#identifying-collaborators-and-tools)

### Parameter Substitution
- **Prompt parsing**: LLM identifies information in user prompt and maps to parameters required by each agent/tool. [→ source](chapters/08-ch05-agent-architecture.md#parameters-substitution)

### Executing the Task Plan
- **LLM execution**: LLM invokes task plan steps—nondeterministic, may introduce errors/hallucinations. Suitable for small requests. [→ source](chapters/08-ch05-agent-architecture.md#executing-the-task-plan)
- **Programmatic execution**: Decouple task planning from execution using deterministic execution engines—more repeatable, explainable, reliable. [→ source](chapters/08-ch05-agent-architecture.md#executing-the-task-plan)

## Agent Interactions and Conversations

### Agent Messaging Models
- **Request-response**: Synchronous pattern—sender sends request, waits for reply. Immediate feedback/error handling. Low-latency. [→ source](chapters/08-ch05-agent-architecture.md#agent-messaging-model)
- **Messaging (async)**: Queue-based (RabbitMQ, IBM MQ) or pub/sub (Kafka, Google Pub/Sub)—decouples senders/receivers for scalability/resilience. [→ source](chapters/08-ch05-agent-architecture.md#agent-messaging-model)
- **Event-driven models**: Components emit/react to events—discrete signals that something happened. Enables decoupled, responsive, scalable processes. [→ source](chapters/08-ch05-agent-architecture.md#agent-messaging-model)
- **Message queue model**: Sender places message in queue, receiver processes asynchronously—decouples sender/receiver. [→ source](chapters/08-ch05-agent-architecture.md#agent-messaging-model)
- **Streaming messaging**: Agents subscribe to event streams, react to new data as it arrives. [→ source](chapters/08-ch05-agent-architecture.md#agent-messaging-model)
- **Actor model**: Each agent is independent actor—processes messages, changes state, communicates with other actors. Modular and resilient. [→ source](chapters/08-ch05-agent-architecture.md#agent-messaging-model)
- **Shared workspaces**: Common environment where multiple agents collaborate—write to accessible region (memory, database). [→ source](chapters/08-ch05-agent-architecture.md#agent-messaging-model)

### Agent Conversation Management
- **Conversation structure**: Multiple interactions over milliseconds to days—mirrors programming function call tree (serial or parallel). [→ source](chapters/08-ch05-agent-architecture.md#agent-conversation-management)
- **Greetings/discussion interactions**: Frame conversation, establish context without requesting specific actions. [→ source](chapters/08-ch05-agent-architecture.md#agent-conversation-management)
- **Information interactions**: Provide context—share data, clarify details, ensure shared understanding. [→ source](chapters/08-ch05-agent-architecture.md#agent-conversation-management)
- **Task request interactions**: Core functional exchanges—agent conveys specific request/command. [→ source](chapters/08-ch05-agent-architecture.md#agent-conversation-management)
- **Task status interactions**: Update conversation on progress, issues, deviations. [→ source](chapters/08-ch05-agent-architecture.md#agent-conversation-management)

### Agent State Management
- **State**: Current condition/snapshot of data and variables a program is working with. [→ source](chapters/08-ch05-agent-architecture.md#agent-state-management)
- **Stateful vs. stateless**: Stateful maintains past interactions; stateless treats each request independently. [→ source](chapters/08-ch05-agent-architecture.md#agent-state-management)
- **Agents are stateful**: Must manage long-running conversations and maintain durable state for restart-recovery/midconversation feedback. [→ source](chapters/08-ch05-agent-architecture.md#agent-state-management)
- **State components**: Runtime state (busy/waiting/error), conversation history (context/short-term memory), task status (in progress/waiting/error), task state (restart-recovery/diagnosis). [→ source](chapters/08-ch05-agent-architecture.md#agent-state-management)
- **State storage**: In-memory (transient), database (sophisticated/distributed), distributed caching/consensus algorithms (Paxos, Raft). [→ source](chapters/08-ch05-agent-architecture.md#agent-state-management)

### Agent Workspaces
- **Shared-memory collaboration**: Agents pool data/insights in centralized digital environment—common scratchpad. [→ source](chapters/08-ch05-agent-architecture.md#agent-workspaces)
- **Task-oriented vs. goal-oriented**: Task-oriented uses minimal sharing (request-response); goal-oriented requires robust information sharing for complex outcomes. [→ source](chapters/08-ch05-agent-architecture.md#agent-workspaces)
- **Security challenges**: Robust authentication mechanisms, granular access permissions. [→ source](chapters/08-ch05-agent-architecture.md#agent-workspaces)

### Agent Identities and Roles
- **Fully Qualified Name (FQN)**: Namespace + separator + local name (e.g., `brodagroupsoftware:bank-agent`). [→ source](chapters/08-ch05-agent-architecture.md#agent-identities-and-roles)
- **Namespace uniqueness**: Unique across ecosystem—may reflect organization or group. [→ source](chapters/08-ch05-agent-architecture.md#agent-identities-and-roles)
- **Local name uniqueness**: Unique within namespace. [→ source](chapters/08-ch05-agent-architecture.md#agent-identities-and-roles)
- **UUID (Universally Unique Identifier)**: Each agent instance gets UUID for scaling/fault tolerance. [→ source](chapters/08-ch05-agent-architecture.md#agent-identities-and-roles)
- **Roles**: Define specific responsibilities—recorded in Identity Book of Record (IBOR). [→ source](chapters/08-ch05-agent-architecture.md#agent-identities-and-roles)
- **RBAC (Role-Based Access Control)**: Each role has specific access rights—governs agent communication and tool access. [→ source](chapters/08-ch05-agent-architecture.md#agent-identities-and-roles)

## Agent Types

### Task-Oriented Agents
- **Clear objectives**: Receive goal (prompt + parameters), formulate plan, execute autonomously. [→ source](chapters/08-ch05-agent-architecture.md#task-oriented-agents)
- **Minimal data exchange**: Only data required to fulfill task and coordinate. [→ source](chapters/08-ch05-agent-architecture.md#task-oriented-agents)
- **Variable duration**: Subtasks range from seconds to hours. [→ source](chapters/08-ch05-agent-architecture.md#task-oriented-agents)
- **State management**: Track progress, dependencies, handle interruptions. [→ source](chapters/08-ch05-agent-architecture.md#task-oriented-agents)
- **Example**: Bank account opening—identity verification, KYC, initial deposit, notification. [→ source](chapters/08-ch05-agent-architecture.md#task-oriented-agents)

### Goal-Oriented Agents
- **Collaborative problem-solving**: Extended dynamic conversations to solve complex problems lacking predetermined sequence. [→ source](chapters/08-ch05-agent-architecture.md#goal-oriented-agents)
- **Continuous evaluation**: Assess shared objective, adjust strategies in real time. [→ source](chapters/08-ch05-agent-architecture.md#goal-oriented-agents)
- **Shared workspace**: Common scratchpad where agents post/access/update information—complete conversational threads. [→ source](chapters/08-ch05-agent-architecture.md#goal-oriented-agents)
- **Dynamic planning**: Iterate and refine plans based on feedback and external events. [→ source](chapters/08-ch05-agent-architecture.md#goal-oriented-agents)
- **Example**: Investment portfolio optimization—market data agent, risk analysis agent, client advisory agent. [→ source](chapters/08-ch05-agent-architecture.md#goal-oriented-agents)

### Simulation Agents
- **Virtual models**: Create and interact within simulations to explore complex systems. [→ source](chapters/08-ch05-agent-architecture.md#simulation-agents)
- **Emergent behavior**: Observe patterns arising from interactions of simple components. [→ source](chapters/08-ch05-agent-architecture.md#simulation-agents)
- **Shared workspace**: Acts as history of all agent conversations—understand emergent behavior. [→ source](chapters/08-ch05-agent-architecture.md#simulation-agents)
- **Extended interactions**: Detect nonlinear/unexpected outcomes over time. [→ source](chapters/08-ch05-agent-architecture.md#simulation-agents)
- **Example**: Insurance asset management loss analysis—model portfolio under various risk scenarios. [→ source](chapters/08-ch05-agent-architecture.md#simulation-agents)

### Observer Agents
- **Smart sensors**: Continuously scan environment to detect critical changes. [→ source](chapters/08-ch05-agent-architecture.md#observer-agents)
- **Smart actuators**: Process incoming data, evaluate against thresholds, emit intelligent outputs (trade signals, alerts). [→ source](chapters/08-ch05-agent-architecture.md#observer-agents)
- **Event-driven/threshold-based**: Consume inputs, log events when criteria met, alert system. [→ source](chapters/08-ch05-agent-architecture.md#observer-agents)
- **Collaborative observation**: Multiple observers share scratchpad—exchange observations, corroborate signals. [→ source](chapters/08-ch05-agent-architecture.md#observer-agents)
- **Example**: Financial trading—track quantitative market data + qualitative news, trigger trade signals. [→ source](chapters/08-ch05-agent-architecture.md#observer-agents)

## Agent Patterns

### Communication Patterns
- **Interaction**: One-to-one, synchronous, sender issues request, receiver responds immediately. No long-term state. [→ source](chapters/08-ch05-agent-architecture.md#interaction-pattern)
- **Delegation**: One agent hands off task to another with data transfer. Occasional progress checks. [→ source](chapters/08-ch05-agent-architecture.md#delegation-pattern)
- **Conversation**: Stateful, multistep communication retaining context over seconds to days. [→ source](chapters/08-ch05-agent-architecture.md#conversation-pattern)
- **Attention**: Out-of-band channel for exceptions or additional input without interrupting regular flow. [→ source](chapters/08-ch05-agent-architecture.md#attention-pattern)
- **Broadcast**: Unidirectional—single sender to multiple recipients without feedback. [→ source](chapters/08-ch05-agent-architecture.md#broadcast-pattern)
- **Listener (pub/sub)**: Agents subscribe/publish notifications—wake up on relevant events. Asynchronous, decoupled. [→ source](chapters/08-ch05-agent-architecture.md#listener-pattern)

### Role Patterns
- **Planner**: Breaks goals into actionable steps, creates task plans, identifies collaborators/tools from registry. [→ source](chapters/08-ch05-agent-architecture.md#planner-pattern)
- **Orchestrator**: Coordinates tasks among agents, assigns tasks, schedules actions, allocates resources, monitors progress. [→ source](chapters/08-ch05-agent-architecture.md#orchestrator-pattern)
- **Executor**: Executes individual task steps—works with tools, external systems, other agents. [→ source](chapters/08-ch05-agent-architecture.md#executor-pattern)
- **Observer**: Monitors systems/agents/environments, collects data, identifies trends/patterns/anomalies, triggers alerts. [→ source](chapters/08-ch05-agent-architecture.md#observer-pattern)
- **Judge**: Makes decisions based on rules/standards/ethics, assesses inputs from observers, spots issues/policy breaches. [→ source](chapters/08-ch05-agent-architecture.md#judge-pattern)
- **Enforcer**: Acts on judge decisions, executes automated responses to violations, reaches out to humans when needed. [→ source](chapters/08-ch05-agent-architecture.md#enforcer-pattern)

### Organizational Patterns
- **Singleton**: Person-to-agent or agent-to-agent relationship. Simplest collaboration—no long-term decision-making. [→ source](chapters/08-ch05-agent-architecture.md#singleton-pattern)
- **Team**: Multiple agents working toward shared goal. Hierarchical (leader assigns tasks) or decentralized (equal peers). [→ source](chapters/08-ch05-agent-architecture.md#team-pattern)
- **Organization**: Teams structured within larger ecosystem. Central governing agent directs subordinates—policies/governance. [→ source](chapters/08-ch05-agent-architecture.md#organization-pattern)
- **Swarm**: No central authority—agents self-organize based on local interactions. Distributed algorithms, peer-to-peer, consensus-building. [→ source](chapters/08-ch05-agent-architecture.md#swarm-pattern)
- **Ecosystem**: Agents from multiple organizations working together—no centralized control. Flexible relationships across boundaries. [→ source](chapters/08-ch05-agent-architecture.md#ecosystem-pattern)
- **Legal entity**: Formal legal boundary around agent organization—actions legally binding. Digital agents perform routine tasks, humans provide oversight. [→ source](chapters/08-ch05-agent-architecture.md#legal-entity-pattern)
- **Federation**: Agents from independent organizations collaborate with individual autonomy. Federal authority for global rules, local autonomy for quick decisions. [→ source](chapters/08-ch05-agent-architecture.md#federation-pattern)
- **Supply chain**: Extension of federation—many legal entities with decentralized control but formal contractual terms. [→ source](chapters/08-ch05-agent-architecture.md#supply-chain-pattern)

## Agent Configuration

### Identity, Description, and Purpose
- **FQN (Fully Qualified Name)**: Namespace + local name—unique identifier within ecosystem. [→ source](chapters/08-ch05-agent-architecture.md#identity-description-and-purpose)
- **Description**: Human-readable overview—overall summary of agent. [→ source](chapters/08-ch05-agent-architecture.md#identity-description-and-purpose)
- **Purpose**: Explicit definition of what agent does—sets expectations, governance baseline. [→ source](chapters/08-ch05-agent-architecture.md#identity-description-and-purpose)
- **Natural language configuration**: Intuitive for creators, LLM-compatible. [→ source](chapters/08-ch05-agent-architecture.md#identity-description-and-purpose)
- **Registry**: Centralized searchable database—stores agent/tool information. [→ source](chapters/08-ch05-agent-architecture.md#identity-description-and-purpose)
- **Marketplace**: Interface for people to discover agents. [→ source](chapters/08-ch05-agent-architecture.md#identity-description-and-purpose)

### Task Execution Strategy
- **Step-by-step instructions**: Detailed guidance for end-to-end task fulfillment. [→ source](chapters/08-ch05-agent-architecture.md#task-execution-strategy)
- **Natural language**: Everyday language for strategies—gives LLM latitude to execute dynamically. [→ source](chapters/08-ch05-agent-architecture.md#task-execution-strategy)

### Security Configuration
- **Role**: Defines responsibilities and actions—like human organizational roles. [→ source](chapters/08-ch05-agent-architecture.md#security-configuration)
- **mTLS (Mutual Transport Layer Security)**: Secures communications—client/server encryption. [→ source](chapters/08-ch05-agent-architecture.md#security-configuration)
- **OAuth2**: Controlled access—only authorized actors interact. [→ source](chapters/08-ch05-agent-architecture.md#security-configuration)
- **Identity Book of Record integration**: FQN integrates with enterprise identity for credential verification. [→ source](chapters/08-ch05-agent-architecture.md#security-configuration)

### Policy and Certification
- **Policies**: Guardrails derived from regulatory requirements, corporate guidelines, ethical standards. [→ source](chapters/08-ch05-agent-architecture.md#policy-and-certification)
- **Certification attributes**: Document validation process—who certified, when, compliance confirmation. [→ source](chapters/08-ch05-agent-architecture.md#policy-and-certification)

### Agent and Tool Visibility
- **Agent visibility**: Defines which other agents a given agent can collaborate with. [→ source](chapters/08-ch05-agent-architecture.md#agent-and-tool-visibility)
- **Tool visibility**: Defines which tools an agent can interact with/consume. [→ source](chapters/08-ch05-agent-architecture.md#agent-and-tool-visibility)
- **Zero-trust posture**: By default no agents/tools visible unless explicitly allowed. Minimizes risk. [→ source](chapters/08-ch05-agent-architecture.md#agent-and-tool-visibility)
- **Visibility definition methods**: FQNs (precise), regex (pattern matching for namespaces). [→ source](chapters/08-ch05-agent-architecture.md#agent-and-tool-visibility)

## Key Frameworks & Models

### Decomposability Principle
Software engineering cornerstone applied to agents. Traditional: modular programming (function calls, API calls). Agents: basic unit is agent or tool. Enables isolation of errors, maintenance, scalability, specialization. [→ source](chapters/08-ch05-agent-architecture.md#collaborative-and-intelligent)

### Context Engineering Architecture
Five components: context manager (orchestrator), retriever (persistent stores), summarizer (compresses histories), router (determines detail level), memory store (durability/replay). Feedback loop: retrieve → summarize → route → prompt → update. [→ source](chapters/08-ch05-agent-architecture.md#agent-context-engineering)

### Memory Hierarchy (Computer Science Analogy)
Prompt = L1 cache (small, fast). Rolling summaries = L2/L3 (bigger, quick). External stores = RAM/disk. Retrieval = page-in. Summarization/eviction = page-out. Optimize for locality: semantically related, recently used, trustworthy pieces close to model. [→ source](chapters/08-ch05-agent-architecture.md#agent-context-engineering)

### Directed Acyclic Graphs (DAGs)
Task plan steps can be laid out as DAGs for complex tasks—enables parallel execution paths. [→ source](chapters/08-ch05-agent-architecture.md#creating-the-task-plan)

## Relationships

### Principles ↔ Components
- Trustworthy/Accountable principle → enforced by certification framework, policies, transparency
- Reliable/Durable principle → enabled by monitoring systems, durability in state management
- Explainable/Traceable principle → implemented via task plan recording, UUID traceability, logs
- Collaborative/Intelligent principle → enabled by registry, task decomposition, agent memory

### Components ↔ Task Management
- Agent Brain (LLM) → creates task plans, identifies collaborators, performs parameter substitution
- Agent Memory → provides context for task planning, informs collaborator selection
- Agent Tools → identified and plugged into task plan steps as executors
- Context Engineering → ensures LLM has right information for task planning/execution

### Agent Types ↔ Patterns
- Task-oriented agents → use Delegation, Interaction, Executor patterns
- Goal-oriented agents → use Conversation, shared workspace, Planner/Orchestrator patterns
- Simulation agents → use shared workspace, Observer pattern, emergent behavior analysis
- Observer agents → use Listener (pub/sub), Observer pattern, event-driven triggers

### Messaging Models ↔ Organizational Patterns
- Request-response → Singleton pattern
- Message queue/Pub-sub → Team, Organization patterns
- Shared workspaces → Swarm, Ecosystem patterns
- Actor model → Federation, Supply chain patterns

### Configuration ↔ Security/Governance
- FQN + Role → RBAC enforcement, IBOR integration
- Purpose + Description → Registry/Marketplace discoverability
- Agent/Tool Visibility → Zero-trust security posture
- Policy + Certification → Trustworthy/Accountable principle
- Task Execution Strategy → Explainable/Traceable principle

### Memory ↔ Context Engineering
- Memory tiers (native, short-term, long-term) → Context engineering tiers (hot/warm/cold cache)
- Episodic/Procedural/Semantic/Factual memory → retrieved and structured by context manager
- Knowledge graphs → enable semantic retrieval and routing
- Memory lifecycle → informed by context caching policies (promotion/eviction)
