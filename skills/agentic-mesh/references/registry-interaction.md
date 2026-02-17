# Registry & Interaction Management

> Covers: `12-ch09-agentic-mesh-registry.md`, `13-ch10-interaction-management.md`

## Key Concepts

### Registry Infrastructure
- **Agentic Mesh Registry**: Central system of record organizing agents, conversations, interactions, workspaces, policies, and users into a coherent ecosystem. [→ source](chapters/12-ch09-agentic-mesh-registry.md#agentic-mesh-registry)
- **Machine-Readable Metadata**: Structured configuration data enabling automated discovery, access control, and policy enforcement across the mesh. [→ source](chapters/12-ch09-agentic-mesh-registry.md#agents)
- **Lifecycle Tracking**: Versioned agent configurations supporting rollback, audit processes, and downstream system reliability. [→ source](chapters/12-ch09-agentic-mesh-registry.md#agents)

### Agent Metadata
- **Agent Configuration**: Structured metadata including name, version, purpose, description, approach, roles, policies, certifications, collaborators, and tools. [→ source](chapters/12-ch09-agentic-mesh-registry.md#agents)
- **SemVer**: Semantic versioning convention for agent releases. [→ source](chapters/12-ch09-agentic-mesh-registry.md#agents)
- **Certifications**: Formal attestations that agents meet defined standards (security compliance, auditability, interoperability). [→ source](chapters/12-ch09-agentic-mesh-registry.md#agents)
- **Namespace Convention**: Unique human-readable identifier using namespace and unique name structure. [→ source](chapters/12-ch09-agentic-mesh-registry.md#agents)

### Conversations & Interactions
- **Conversation**: Logical thread tying together all related exchanges among participants, preserving contextual memory across multiple messages. [→ source](chapters/12-ch09-agentic-mesh-registry.md#conversations)
- **Conversation ID (UUID)**: Globally unique identifier assigned to each conversation instance. [→ source](chapters/12-ch09-agentic-mesh-registry.md#conversations)
- **Interaction**: Fundamental unit of work—a distinct, bounded task within a conversation with its own lifecycle and state. [→ source](chapters/12-ch09-agentic-mesh-registry.md#interactions)
- **Interaction ID (IID)**: Globally unique identifier combining interaction_id, originating name, and step_id. [→ source](chapters/12-ch09-agentic-mesh-registry.md#interactions)
- **Step ID**: Identifies the specific logical step or phase within a broader task sequence. [→ source](chapters/12-ch09-agentic-mesh-registry.md#interactions)

### Interaction Lifecycle States
- **Ground State**: Initial state where interaction exists but is not yet fully configured. [→ source](chapters/13-ch10-interaction-management.md#interaction-lifecycle)
- **Ready State**: Prerequisites satisfied, agent prepared to begin processing, execution plan compiled. [→ source](chapters/13-ch10-interaction-management.md#interaction-lifecycle)
- **Working State**: Active execution of plan, agent performing local actions or contacting other agents/tools. [→ source](chapters/13-ch10-interaction-management.md#interaction-lifecycle)
- **Pending State**: Processing paused, awaiting missing information from user. [→ source](chapters/13-ch10-interaction-management.md#interaction-lifecycle)
- **Error State**: Unrecoverable conditions requiring external intervention (failed API calls, corrupted files). [→ source](chapters/13-ch10-interaction-management.md#interaction-lifecycle)
- **Complete State**: Task finished successfully, removed from active interactions, archived in conversation history. [→ source](chapters/13-ch10-interaction-management.md#interaction-lifecycle)

### Workspace Components
- **Workspace**: Collaborative environment supporting goal-oriented agent interactions, containing one or more goals and associated messages. [→ source](chapters/12-ch09-agentic-mesh-registry.md#workspaces)
- **Workspace ID (UUID)**: Globally unique identifier assigned to each workspace. [→ source](chapters/12-ch09-agentic-mesh-registry.md#workspaces)
- **Goal**: User-defined objective within a workspace, organizing messages around discrete outcomes. [→ source](chapters/12-ch09-agentic-mesh-registry.md#workspaces)
- **Goal ID (GID)**: Globally unique identifier distinguishing one goal from another, supporting goal-specific tracking. [→ source](chapters/12-ch09-agentic-mesh-registry.md#workspaces)
- **Goal Lifecycle**: Three states—ready (created, awaiting first message), working (agents interacting), complete (manually closed or timeout). [→ source](chapters/13-ch10-interaction-management.md#workspace-goals)
- **Message**: Communication unit within a workspace-goal context, containing workspace_id, goal_id, message_id, timestamp, participant_id, content, and interaction_id. [→ source](chapters/12-ch09-agentic-mesh-registry.md#workspaces)

### Governance & Trust
- **Policy**: Formal statement of rules and constraints defining agent behavior, access controls, operational boundaries. [→ source](chapters/12-ch09-agentic-mesh-registry.md#policies)
- **Policy ID (UUID)**: Globally unique identifier for a specific policy, enabling unambiguous referencing and version control. [→ source](chapters/12-ch09-agentic-mesh-registry.md#policies)
- **Certification**: Attestation event linking policy compliance to an agent, tracking who issued it, state (ACTIVE/REVOKED/EXPIRED), and timestamp. [→ source](chapters/12-ch09-agentic-mesh-registry.md#policies)
- **Policy Versioning**: Lifecycle management supporting deprecation, new requirements, and recertification when policies evolve. [→ source](chapters/12-ch09-agentic-mesh-registry.md#policies)

### User Management
- **User Registration**: Identity-linked metadata synchronized with enterprise identity provider, storing user_id, name, email, state (ACTIVE/SUSPENDED/DEACTIVATED). [→ source](chapters/12-ch09-agentic-mesh-registry.md#users)
- **Identity Attribution**: All actions recorded with user identity for audit trails and accountability. [→ source](chapters/12-ch09-agentic-mesh-registry.md#users)
- **Fine-Grained Access Control**: Role-based permissions (read/write/administrative) scoped to workspaces and agents. [→ source](chapters/12-ch09-agentic-mesh-registry.md#users)

### Communication Patterns
- **Interaction Patterns**: Repeatable ways agents and people exchange messages, make progress on tasks, and coordinate outcomes. [→ source](chapters/13-ch10-interaction-management.md#chapter-10-interaction-management)
- **Task-Oriented Communication**: User sends message to specific agent via interactions server APIs, agent processes task-oriented plan to completion. [→ source](chapters/13-ch10-interaction-management.md#agentic-mesh-interaction-management)
- **Agent-to-Agent Communication**: Direct delegation where one agent contacts another, retrieving URLs from registry, sending messages directly to recipient's message queue. [→ source](chapters/13-ch10-interaction-management.md#agentic-mesh-interaction-management)
- **Workspace Communication**: Shared message queue where multiple agents subscribe to goal-oriented stream, deciding when to act based on message relevance. [→ source](chapters/13-ch10-interaction-management.md#agentic-mesh-interaction-management)

### Event-Driven Architecture
- **Event-Driven Communication**: Asynchronous messaging model decoupling senders from receivers, tolerating dynamic agent behaviors (start/stop/scale/relocate). [→ source](chapters/13-ch10-interaction-management.md#event-driven-communication)
- **HTTP vs Event-Driven**: HTTP suitable for fixed, addressable, continuously available services (registry, interactions server); events required for dynamic, intermittently available agents. [→ source](chapters/13-ch10-interaction-management.md#http-versus-event-driven)
- **Message Queue**: Durable buffer ensuring every event is stored until consumed, enabling asynchronous delivery and persistence. [→ source](chapters/13-ch10-interaction-management.md#message-queues-reliable-delivery-and-persistence)
- **Pub/Sub (Publish-Subscribe)**: One-to-many distribution pattern where producers publish to topics and all subscribers receive events simultaneously. [→ source](chapters/13-ch10-interaction-management.md#pub-sub-dynamic-and-scalable-distribution)
- **Subject Hierarchies**: Pattern-based subscriptions (e.g., `mesh.financial.transaction.*`, `mesh.infrastructure.alerts.#`) filtering event space by domain. [→ source](chapters/13-ch10-interaction-management.md#pub-sub-dynamic-and-scalable-distribution)
- **Event Replay**: Ability to reprocess historical events by moving consumer offset backward in durable log (NATS JetStream, Kafka, Pulsar). [→ source](chapters/13-ch10-interaction-management.md#event-replay)
- **Offset**: Consumer pointer representing progress through event log, enabling resume from failure point. [→ source](chapters/13-ch10-interaction-management.md#event-replay)
- **Time-Travel Debugging**: Replaying events from specific moments to reconstruct system state deterministically. [→ source](chapters/13-ch10-interaction-management.md#event-replay)

### Monitoring & Observability
- **Monitoring Queues**: Mesh monitor subscribes to message queues, recording all messages as permanent records in registry. [→ source](chapters/13-ch10-interaction-management.md#monitoring-queues)
- **Message Persistence**: Registry compensates for queue aging by preserving long-term conversation history (days to months/years). [→ source](chapters/13-ch10-interaction-management.md#monitoring-queues)
- **Real-Time Observability**: Users/admins subscribe to same message queues to watch conversations unfold live. [→ source](chapters/13-ch10-interaction-management.md#monitoring-queues)
- **Auditability**: Viewing messages as they flow through mesh for real-time verification and debugging. [→ source](chapters/13-ch10-interaction-management.md#monitoring-queues)

### Planning & Execution
- **Task Plan**: Agent-generated sequence of steps calling other agents or tools to fulfill an interaction, constructed after retrieving conversation history. [→ source](chapters/13-ch10-interaction-management.md#agents-as-plan-steps)
- **Agents as Plan Steps**: Other agents referenced in task plans as discrete steps, enabling deep nesting and complex problem decomposition. [→ source](chapters/13-ch10-interaction-management.md#agents-as-plan-steps)
- **Direct Messaging**: Agent-to-agent messages sent directly to recipient's queue (named after agent), bypassing interactions server. [→ source](chapters/13-ch10-interaction-management.md#sending-messages)
- **Context Retrieval**: Receiving agent uses conversation ID to fetch history from registry, keeping individual messages small. [→ source](chapters/13-ch10-interaction-management.md#sending-messages)

### User Alerts
- **Alert Settings**: User-configurable per-interaction state change notifications (e.g., working→pending, step completion). [→ source](chapters/13-ch10-interaction-management.md#user-alerts)
- **Alert Generation**: Registry detects state change, checks user notification settings, generates alert in database, pushes to UI if user logged in. [→ source](chapters/13-ch10-interaction-management.md#user-alerts)
- **External Integrations**: Email and other notification channels for users who log in rarely or need rapid notification. [→ source](chapters/13-ch10-interaction-management.md#user-alerts)

### Workspace Behaviors
- **Response Decision Making**: Agent determines whether to respond to workspace message using LLM reasoning, allowlist/blocklist, keyword checks, or vector similarity. [→ source](chapters/13-ch10-interaction-management.md#deciding-to-respond)
- **Cosine Similarity**: Vector embedding comparison to example messages or keywords for filtering relevant workspace messages. [→ source](chapters/13-ch10-interaction-management.md#deciding-to-respond)
- **Vector Embedding**: Semantic representation of messages enabling similarity-based response filtering. [→ source](chapters/13-ch10-interaction-management.md#deciding-to-respond)
- **Respond-to-Workspace Tool**: Tool allowing agents to write intermediate or final outputs back to shared workspace queue. [→ source](chapters/13-ch10-interaction-management.md#acting-on-workspace-messages)
- **Partial Solutions**: Agents contribute intermediate results to workspace for other agents to build upon, enabling distributed problem solving. [→ source](chapters/13-ch10-interaction-management.md#acting-on-workspace-messages)
- **Goal Isolation**: Messages grouped by GID, agents receive only history associated with specific goal, preventing cross-contamination. [→ source](chapters/13-ch10-interaction-management.md#workspace-goals)

### Super-Contexts
- **Super-Contexts**: Shared conversational fabric providing common place for agents to read, write, and reason together with shared memory and history. [→ source](chapters/13-ch10-interaction-management.md#workspaces-as-a-super-context)
- **Ambient Awareness**: Agents operate from full shared record rather than partial snapshots, resolving misunderstandings without handoffs. [→ source](chapters/13-ch10-interaction-management.md#workspaces-as-a-super-context)
- **Role-Based Subscriptions**: Observer agents, task-oriented agents, and goal-oriented agents subscribe to relevant slices of super-context. [→ source](chapters/13-ch10-interaction-management.md#workspaces-as-a-super-context)
- **Declarative Coordination**: Coordination rules live in fabric, not brittle point-to-point code, enabling schema evolution without redeployment. [→ source](chapters/13-ch10-interaction-management.md#workspaces-as-a-super-context)
- **Compounding Value**: Past conversations become training data, patterns guide optimization, new agents query shared history. [→ source](chapters/13-ch10-interaction-management.md#workspaces-as-a-super-context)

## Taxonomy

### Registry Entities (Core)
1. **Agents** — metadata, configuration, versions, capabilities
2. **Conversations** — logical threads, context preservation, message history
3. **Interactions** — work units, lifecycles, state tracking
4. **Workspaces** — collaborative contexts, goals, messages
5. **Policies** — governance rules, constraints, certifications
6. **Users** — identity, access control, attribution

### Communication Types
1. **Task-Oriented** — user → specific agent via interactions server
2. **Agent-to-Agent** — direct delegation via message queues
3. **Workspace** — shared goal-oriented message stream

### Event Infrastructure
1. **Message Queues** — reliable delivery, persistence, buffering
2. **Pub/Sub** — one-to-many distribution, topic-based routing
3. **Event Replay** — historical log reprocessing, offset management

### Agent Roles (in Super-Context)
1. **Observer Agents** — detect external signals, translate to structured events
2. **Task-Oriented Agents** — execute well-defined work, call tools, report results
3. **Goal-Oriented Agents** — orchestrate outcomes across steps, adjust plans

### State Machines
1. **Interaction Lifecycle** — ground → ready → working → pending/error → complete
2. **Goal Lifecycle** — ready → working → complete

## Key Frameworks & Models

### Registry Data Model
- **Agent Definition**: name, version, purpose, description, approach, roles, policies, certifications, collaborators, tools [→ source](chapters/12-ch09-agentic-mesh-registry.md#agents)
- **Conversation Elements**: conversation_id, timestamp, name, role, state [→ source](chapters/12-ch09-agentic-mesh-registry.md#conversations)
- **Interaction Elements**: interaction_id, start_timestamp, complete_timestamp, owner, step_id, collaborator, state, prompt, parameters, results [→ source](chapters/12-ch09-agentic-mesh-registry.md#interactions)
- **Workspace Model**: workspace_id + timestamp; goals (goal_id, name, description, state); messages (message_id, participant_id, content, interaction_id) [→ source](chapters/12-ch09-agentic-mesh-registry.md#workspaces)
- **Policy Definition**: policy_id, name, purpose, description [→ source](chapters/12-ch09-agentic-mesh-registry.md#policies)
- **Certification Record**: certification_id, username, state, timestamp [→ source](chapters/12-ch09-agentic-mesh-registry.md#policies)
- **User Record**: user_id, name, email, state [→ source](chapters/12-ch09-agentic-mesh-registry.md#users)

### Interaction Lifecycle Model
- **State Transitions**: ground → ready (initialization complete) → working (plan execution) → pending (awaiting info) → working (info received) → complete (success) [→ source](chapters/13-ch10-interaction-management.md#interaction-lifecycle)
- **Error Handling**: working → error (unrecoverable failure) → complete (manual resolution) or → working (fix applied) [→ source](chapters/13-ch10-interaction-management.md#interaction-lifecycle)
- **Timeout Rule**: pending → error (if missing info not provided within time limit) [→ source](chapters/13-ch10-interaction-management.md#interaction-lifecycle)

### Context Hierarchy
- **Conversation-Interaction Hierarchy**: conversation (shared context, multiple interactions) contains interaction (distinct task, unique IID) [→ source](chapters/13-ch10-interaction-management.md#user-to-agent-communication)
- **Context Preservation**: agents receive full conversation history when processing new messages, enabling reuse of prior information [→ source](chapters/13-ch10-interaction-management.md#conversations)
- **Scope Isolation**: IID separates task state—multiple concurrent tasks under single conversation without cross-contamination [→ source](chapters/13-ch10-interaction-management.md#user-to-agent-communication)

### Event-Driven Messaging Model
- **Asynchronous Delivery**: decoupled senders/receivers, no synchronous availability requirement [→ source](chapters/13-ch10-interaction-management.md#http-versus-event-driven)
- **Durable Logs**: events appended to immutable stream, consumers track offset [→ source](chapters/13-ch10-interaction-management.md#event-replay)
- **Parallel Consumption**: multiple agent instances consume from single queue, automatic load balancing [→ source](chapters/13-ch10-interaction-management.md#message-queues-reliable-delivery-and-persistence)
- **Selective Listening**: agents subscribe to subject hierarchies matching operational domain [→ source](chapters/13-ch10-interaction-management.md#pub-sub-dynamic-and-scalable-distribution)

### Workspace Coordination Model
- **Shared Queue Paradigm**: multiple agents subscribe to same message queue rather than dedicated per-agent queues [→ source](chapters/13-ch10-interaction-management.md#workspaces)
- **Decision Mechanism**: LLM reasoning, allowlist/blocklist, keyword matching, vector similarity for response filtering [→ source](chapters/13-ch10-interaction-management.md#deciding-to-respond)
- **Partial Contribution**: agents construct plans targeting intermediate goals, writing results back for others to extend [→ source](chapters/13-ch10-interaction-management.md#acting-on-workspace-messages)
- **Goal Scoping**: GID groups related messages, agents receive filtered history, concurrent goals isolated [→ source](chapters/13-ch10-interaction-management.md#workspace-goals)

### Super-Context Pattern
- **Shared Memory**: all events, messages, plans, results accumulate; agents enter with full history [→ source](chapters/13-ch10-interaction-management.md#workspaces-as-a-super-context)
- **Slice Subscriptions**: agents subscribe to relevant subject slices, ignore others [→ source](chapters/13-ch10-interaction-management.md#workspaces-as-a-super-context)
- **Event-Driven Fabric**: pub/sub for real-time fan-out, durable streams for replay/audit [→ source](chapters/13-ch10-interaction-management.md#workspaces-as-a-super-context)
- **Explicit Lifecycle**: ground → ready → working → pending → error → complete transitions recorded [→ source](chapters/13-ch10-interaction-management.md#workspaces-as-a-super-context)

## Relationships

### Registry ↔ Interaction Management
- **Registry as System of Record**: stores agent metadata, conversation history, interaction state, workspace definitions; interaction management executes workflows using this data [→ source](chapters/12-ch09-agentic-mesh-registry.md#agentic-mesh-registry)
- **Monitor Subscribes to Queues**: mesh monitor consumes messages from communication queues, writing permanent records to registry [→ source](chapters/13-ch10-interaction-management.md#monitoring-queues)
- **Context Retrieval**: agents fetch conversation history from registry using conversation_id when receiving messages [→ source](chapters/13-ch10-interaction-management.md#sending-messages)

### Conversations → Interactions
- **Containment**: single conversation contains multiple related interactions, each with unique IID [→ source](chapters/13-ch10-interaction-management.md#user-to-agent-communication)
- **Shared Context**: all interactions within conversation access same message history [→ source](chapters/13-ch10-interaction-management.md#conversations)
- **State Independence**: each interaction's state (working/pending/error/complete) tracked separately [→ source](chapters/13-ch10-interaction-management.md#user-to-agent-communication)

### Workspaces → Goals → Messages
- **Hierarchical Organization**: workspace contains goals, each goal contains messages [→ source](chapters/12-ch09-agentic-mesh-registry.md#workspaces)
- **GID Grouping**: messages tagged with goal_id, agents receive filtered history per goal [→ source](chapters/13-ch10-interaction-management.md#workspace-goals)
- **Goal Lifecycle**: ready → working → complete [→ source](chapters/13-ch10-interaction-management.md#workspace-goals)

### Policies → Agents
- **Attachment**: policies linked to agents at registration or certification [→ source](chapters/12-ch09-agentic-mesh-registry.md#policies)
- **Runtime Enforcement**: marketplace and execution engine evaluate policy compliance using registry metadata [→ source](chapters/12-ch09-agentic-mesh-registry.md#policies)
- **Certification Workflow**: agents claim compliance, undergo attestation, certification status tracked in registry [→ source](chapters/12-ch09-agentic-mesh-registry.md#policies)

### Users → Actions
- **Identity Attribution**: all interactions, workspace participation, metadata changes linked to user_id [→ source](chapters/12-ch09-agentic-mesh-registry.md#users)
- **Audit Trails**: registry records who did what, when, why [→ source](chapters/12-ch09-agentic-mesh-registry.md#users)
- **Access Control**: fine-grained permissions (read/write/admin) based on user roles [→ source](chapters/12-ch09-agentic-mesh-registry.md#users)

### Event Infrastructure → Communication Patterns
- **Task-Oriented**: uses interactions server APIs, publishes to agent-specific queues [→ source](chapters/13-ch10-interaction-management.md#agentic-mesh-interaction-management)
- **Agent-to-Agent**: bypasses interactions server, sends directly to named queue (agent name = queue name) [→ source](chapters/13-ch10-interaction-management.md#sending-messages)
- **Workspace**: shared queue, pub/sub fan-out to all subscribed agents [→ source](chapters/13-ch10-interaction-management.md#workspaces)

### Replay → Auditability & Recovery
- **Fault Tolerance**: crashed agent replays from last offset, resumes without manual intervention [→ source](chapters/13-ch10-interaction-management.md#event-replay)
- **Compliance Reconstruction**: auditors replay time windows to verify agent actions [→ source](chapters/13-ch10-interaction-management.md#event-replay)
- **Analytics & Learning**: ML agents consume historical streams multiple times for model testing [→ source](chapters/13-ch10-interaction-management.md#event-replay)

### Implementation Considerations (Ch09)
- **Schema Management**: versioning, validation, backward compatibility [→ source](chapters/12-ch09-agentic-mesh-registry.md#implementation-considerations)
- **Eventing & Notifications**: publish-subscribe for registry changes [→ source](chapters/12-ch09-agentic-mesh-registry.md#implementation-considerations)
- **Audit Logging**: immutable logs for compliance and debugging [→ source](chapters/12-ch09-agentic-mesh-registry.md#implementation-considerations)
- **Conflict Resolution**: optimistic/pessimistic locking, version checks, transaction retries [→ source](chapters/12-ch09-agentic-mesh-registry.md#implementation-considerations)
- **Soft Deletes**: archival vs permanent removal, retention policies [→ source](chapters/12-ch09-agentic-mesh-registry.md#implementation-considerations)
- **Change Management**: staged approvals, rollback, version promotion [→ source](chapters/12-ch09-agentic-mesh-registry.md#implementation-considerations)
- **External System Integration**: IAM, logging, data catalogs, federated registries [→ source](chapters/12-ch09-agentic-mesh-registry.md#implementation-considerations)
- **Security & Encryption**: at-rest, in-transit, token-based auth [→ source](chapters/12-ch09-agentic-mesh-registry.md#implementation-considerations)
- **Scalability**: high throughput, low latency, millions of agents/users [→ source](chapters/12-ch09-agentic-mesh-registry.md#implementation-considerations)
- **Usage Metrics**: agent popularity, version adoption, optimization signals [→ source](chapters/12-ch09-agentic-mesh-registry.md#implementation-considerations)
- **Backup & DR**: replication, regional backups, restoration [→ source](chapters/12-ch09-agentic-mesh-registry.md#implementation-considerations)
