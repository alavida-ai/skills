# 9. Agentic Mesh Registry


## Chapter 9. Agentic Mesh Registry

From Chapter 8Chapter 8 we learned about the agentic mesh user experience (UX)—the entry point that makes thousands of headless agents usable. But a strong UX is only as good as the information behind it. This brings us to a key foundational element of both the interface and the ecosystem itself: the registry. The agentic mesh registry is the shared source of truth that makes discovery, trust, and coordination possible.

In practice, the registry acts not just as a repository for the UX but as the nervous system of the entire agentic mesh. It is where agents, users, conversations, and policies are recorded, correlated, and made available. Without such a record, the mesh would quickly become unmanageable: agents would be hard to find, their capabilities would be ambiguous, and policies could not be enforced consistently. The registry provides the grounding needed for both people and software to know what exists, what it can do, and how it should behave.

The registry also makes autonomy workable. An agent can look up another agent’s definition before collaborating, check a policy before acting, or record the outcome of an interaction for later audit. Conversations and interactions are no longer just transient messages but linked histories, giving agents and operators continuity across complex workflows. Workspaces, meanwhile, become durable collaboration contexts, defined and stored in one place.

From a governance perspective, structured metadata is essential. The registry ensures that each agent has a clear profile, that policies and certifications are tied to them, and that users are linked to their actions. Because this information is machine-readable, other components—like the marketplace or operator dashboards—can enforce the same rules without duplication or guesswork. This consistency is what makes enterprise-scale trust and oversight possible.

Finally, it is worth considering what happens without such a system. Inconsistent naming, outdated endpoints, and unverifiable policy claims would quickly create friction, not just for agents but also for the humans trying to manage them. Security risks and operational errors would increase as provenance and accountability disappeared. The registry prevents this drift by keeping information current, consistent, and accessible across the mesh.

This chapter explores the registry in detail, focusing on its core entities—agents, conversations, interactions, workspaces, policies, and users. It shows how their metadata is defined, why it matters, and how it supports both user-facing experiences and backend operations. To make the ideas concrete, we use illustrative YAML definitions and simple API-style examples while leaving room for organizations to implement them in the formats and technologies best suited to their environments.


## Agentic Mesh Registry

The agentic mesh registry, shown in Figure 9-1Figure 9-1, serves as the central system of record that organizes the ecosystem into something coherent and manageable. At its core, it records agents—their names, purposes, versions, and capabilities—so they can be discovered, compared, and used with confidence. It preserves conversations, ensuring that exchanges between agents and humans are traceable and can be resumed or audited when needed. It logs interactions, the building blocks of work in the mesh, capturing how tasks are initiated, carried out, and completed across participants. It maintains workspaces, which group goals, tasks, and messages into durable collaboration contexts that extend beyond single conversations. It enforces and tracks policies, making governance explicit by linking rules and certifications directly to agents. And it manages users, tying human identities and roles to the actions they take within the mesh. Together, these elements form the structured metadata that underpins discovery, trust, and operational control across the entire system.


*[Diagram illustrating the agentic mesh registry showing interconnected components such as user experience components, users, interactions, conversations, agents, policies, and workspaces, highlighting its role in organizing and governing agents and interactions.]*


###### Figure 9-1. Agentic mesh registry


## Agents

The registry stores structured metadata for every agent, acting as the authoritative record for its definition and configuration. These configurations allow users and other agents to understand what tasks the agent can perform, how it communicates, and under what constraints it operates.

This minimally includes the following details about the agent, as shown in Figure 9-2Figure 9-2:

NameA unique human-readable identifier for the agent, often following a naming convention to indicate its namespace and unique name within the namespace.

VersionThe specific release number or tag representing the current iteration of the agent using a naming convention such as SemVerSemVer.

PurposeA concise explanation of what the agent is intended to do. This describes the high-level outcome or value the agent delivers.

DescriptionA more detailed description of the agent’s function, context, and operational boundaries.

ApproachSpecifies the steps an agent takes to fulfill its purpose.

RolesDescribes the functional responsibilities the agent fulfills within the system.

PoliciesThe governance rules, ethical constraints, or operational limits enforced on the agent. These may include access controls, rate limits, escalation procedures, or constraints imposed by regulatory or organizational policies.

CertificationsFormal attestations that the agent meets defined standards, such as security compliance, auditability, or interoperability. Certifications may come from internal vetting or external entities (just as ISO 27001–compliant or UL-AI trust marks do for products).

CollaboratorsA list of agents that this specific agent may collaborate with.

ToolsA list of tools that this specific agent may use.

When an agent is published to the marketplace, its metadata is ingested by the registry to enable discoverability and enforce access rules.

From an operational perspective, maintaining up-to-date configurations in a centralized registry ensures consistency across environments. Any changes to an agent’s behavior—such as endpoint updates or new capability declarations—are versioned and propagated through the registry. This enables clear lifecycle tracking, supports rollback and audit processes, and provides downstream systems with a reliable source of truth. For producers, it removes ambiguity about which agent version is active and under what terms it may be used.


*[Diagram illustrating an agent’s definition including name, version, purpose, description, execution approach, roles, policies, certifications, collaborating agents, and tools, with a creator workbench on the left.]*


###### Figure 9-2. Agent definition

Importantly, agent configuration metadata is machine-readable, enabling other services such as discovery engines, dashboards, and orchestration tools to operate efficiently. This promotes automation, reduces manual intervention, and supports system-wide interoperability. Because configuration metadata is linked to access control and policy metadata, the registry also serves as a compliance enforcement mechanism, determining who can discover or interact with each agent.

Finally, the registry’s role in maintaining configuration data strengthens reliability across the ecosystem. If agents are temporarily paused, deprecated, or replaced, these transitions are logged and reflected in their metadata. This visibility ensures that outdated agents are not accidentally reused and that dependent systems are alerted to any changes in configuration or status.


## Conversations

The registry captures and stores the content of conversations involving agents. These may include agent-to-agent communication as well as interactions between agents and humans. This conversation history is essential for maintaining transparency, enabling traceability, and supporting downstream analysis. Conversations are indexed and linked to the agent, user, or task that generated them, ensuring contextual relevance.

Conversations are composed of several elements, as shown in Figure 9-3Figure 9-3. Conversation elements may include the following:conversation_idThe conversation ID is a globally unique identifier (typically a UUID) assigned to each conversation instance.timestampThe start timestamp records the exact UTC time when the conversation was initiated, serving as the anchor for sequencing messages and calculating duration.name and roleThese elements specify the fully qualified identifier and assigned role (e.g., agent, user, system) of the participant that initiated the conversation, ensuring traceability and context for the interaction.stateThe state reflects the current status of the conversation, such as ACTIVE or INACTIVE, indicating whether it is ongoing, is paused, or has been formally concluded.


*[Diagram illustrating a conversation definition, highlighting unique conversation ID, start time, name and role of originator, and conversation state as active.]*


###### Figure 9-3. Conversation definition

This record of interaction is particularly important in environments where agent behavior must be reviewed for compliance, safety, or debugging purposes. By maintaining full transcripts, the system allows internal auditors, operators, and developers to examine past interactions and verify whether agents behaved in accordance with their assigned policies. This also aids in diagnosing failures or unexpected outcomes.

From a product design perspective, conversation storage supports continuity in long-running engagements. An agent participating in a conversation may need to reference past messages to carry forward decisions, clarify intent, or resume activity after an interruption. Persisted conversation histories support this kind of long-term collaboration, whether the agent is interacting with a single user or operating in a multiagent setting.

Privacy and access control remain critical. Conversation records must be protected with fine-grained permissions, ensuring that only authorized users or agents may read or analyze past interactions. The registry supports these constraints by linking each record to identity metadata and applying policies defined in the trust workbench.


## Interactions

Interactions are the fundamental unit of work in the agentic mesh. Interactions are composed of several elements as shown in Figure 9-4Figure 9-4.


*[Diagram illustrating the components of an interaction definition within a consumer workbench, including elements such as unique interaction identifier, start and complete times, originator, step identifier, collaborator, state, prompt, parameters, and results.]*


###### Figure 9-4. Interaction definition

Interaction elements may include the following:interaction_idThis is a globally unique identifier (typically, a UUID) assigned to each interaction.start_timestampThis is the UTC time when the interaction was initiated, serving as the anchor for sequencing messages and calculating duration.complete_timestampThis captures the UTC time when the interaction formally ended.ownerThis field specifies the fully qualified name of the agent, user, or system that initiated the interaction, providing identity and accountability within the conversation context.step_idThis identifies the specific logical step or phase within the broader task sequence that the interaction represents, supporting ordered execution and dependency tracking.collaboratorThis field records the name of the agent, user, or service that received or processed the interaction, establishing the bilateral or multiparty nature of collaborative workflows.stateThis reflects the current status of the interaction offering real-time insight into progress and facilitating error handling or retries.promptThis contains the initial request or message content sent by the originator, often including a question, command, or contextual instruction for the collaborator.parametersThese are structured input values or configurations supplied with the prompt, defining how the collaborator should process the request or execute the task.resultsThese contain the structured output, message, or artifact returned at the end of the interaction, representing the outcome or response produced by the collaborator.

Conversations have one or more interactions. An end-to-end interaction may span multiple steps and multiple agents. Hence the unique identifier for an interaction is based upon the combination of its interaction_id, originating name, and step_id.

Interaction histories also serve a diagnostic function. If an agent fails to complete an interaction, the registry provides visibility into when and why the interaction stalled. Operators can use this information to intervene, while producers may use it to identify edge cases or improve agent logic. In regulated industries, interaction tracking also contributes to auditability and compliance.

Finally, the registry’s integration with policy and trust metadata ensures that interactions are executed under approved conditions. It can enforce constraints such as execution within certain time windows, use of specific agents, or prohibition of certain data flows. These policy-aware controls are embedded in interaction metadata and evaluated at execution time.


## Workspaces

Workspaces support collaborative agent interactions around defined goals. Each workspace can have one or more goals, and messages in a workspace are related to specific goals. These elements are shown in Figure 9-5Figure 9-5.


*[A diagram illustrating the structure of a workspace in a consumer workbench, detailing workspace, goal, and message definitions with corresponding identifiers and attributes.]*


###### Figure 9-5. Workspaces definition

Workspace elements include the following:workspace_idThis is a globally unique identifier (typically a UUID) assigned to each workspace.timestampThis is the UTC time when the workspace was opened, serving as the anchor for sequencing messages and calculating duration.

Goal elements include the following:workspace_idThis links the goal to its parent workspace, establishing scope and ensuring that goal tracking occurs within the appropriate collaborative context.goal_idThis is a globally unique identifier that distinguishes one goal from another within or across workspaces, supporting goal-specific tracking and message association.timestampThis is the UTC time when the goal was opened, serving as the anchor for sequencing messages and calculating duration.nameThis is a concise, human-readable label for the goal, often describing the intended outcome or area of focus for collaboration.descriptionThis provides a longer-form summary or narrative explaining the purpose, context, and expectations associated with the goal.stateThis reflects the current lifecycle status of the goal—such as ACTIVE or INACTIVE—indicating whether it is in progress, on hold, or concluded.

Message elements include the following:workspace_idThis associates the message with a specific workspace, ensuring that communications are scoped to the correct collaboration environment.goal_idThis links the message to the specific goal it relates to, helping participants and systems organize exchanges around discrete objectives.message_idThis is a globally unique identifier that enables precise tracking and referencing of each message within a workspace-goal context.timestampThis captures the UTC time when the message was sent or recorded, providing chronological ordering for conversation flow and audit purposes.participant_idThis denotes the agent, user, or system that authored the message, establishing identity, accountability, and traceability.contentThis refers to the body of the message, which may include natural language, structured prompts, responses, or task-specific data relevant to the ongoing collaboration.interaction_idThis links the message to a specific interaction, allowing the message to be contextualized within the broader task or workflow.

By capturing this metadata, the registry allows users to resume sessions, reassign tasks, and track progress toward goals. It also enforces access rules by validating participant credentials and ensuring that agents operate only within their assigned permissions. These controls are important when sensitive information is shared or when workspace participation must comply with regulatory boundaries.

The workspace configuration model supports composability. Users may create templates for common goals, assign default agents, and define reusable end conditions. These templates are stored in the registry and retrieved through the workbench or marketplace as needed. This reduces setup overhead for recurring workflows and promotes consistency in how goals are framed.

Registry-level persistence also enables analytics. Workspace configurations and outcomes can be queried to measure agent effectiveness, task resolution times, or policy adherence rates. These metrics provide feedback to developers, operators, and governance teams, helping to improve agent behavior and align it with organizational goals.


## Policies

Policies, which govern agent behavior, are a critical part of the agentic mesh’s trust and governance framework, and the registry acts as the authoritative source for storing and managing these policies. A policy, as shown in Figure 9-6Figure 9-6, is a formal statement of rules and constraints that define how agents must behave, how they can be accessed, and under what conditions they can be certified or deployed. Policies are attached to agents at the time of registration or certification.


*[Diagram illustrating policy and certification definitions within a trust workbench, highlighting elements such as policy identifiers, names, purposes, descriptions, and certification details.]*


###### Figure 9-6. Policy and certification definitions

Policy elements, as illustrated in Figure 9-6Figure 9-6, include the following:policy_idThis is a globally unique identifier that distinctly represents a specific policy within the agentic mesh, ensuring unambiguous referencing and version control.nameThis is a short, human-readable label that identifies the policy and distinguishes it from others in the registry, often reflecting its thematic scope or enforcement domain.purposeThis explains the intended role of the policy—such as access control, ethical compliance, or operational safety—providing clarity on why it exists and what it governs.descriptionThis offers a more detailed articulation of the policy’s contents, including the rules, conditions, or behaviors it enforces on agents, and any contextual assumptions.

Certification elements include the following:certification_idThis is a globally unique identifier that links a specific certification event to a policy, agent, or entity, enabling full auditability and certification history tracking.usernameThis refers to the identity—typically a system or human administrator—that issued or validated the certification, establishing accountability and traceability.stateThis captures the current status of the certification—such as ACTIVE, REVOKED, or EXPIRED—indicating whether the certification is currently valid and enforceable.timestampThis records the UTC time when the certification was granted, providing an authoritative record for compliance and lifecycle management.

Each policy may define requirements for data handling, authentication, operational boundaries, or third-party validation. For example, a policy might require that an agent interacting with financial records undergo security scanning and operate only within a private network. The registry stores these policy definitions and links them to affected agents, enabling other systems—like the marketplace or execution engine—to evaluate compliance at runtime.

Policies are also used during the agent certification process. When an agent claims compliance with a specific policy, it must undergo an attestation workflow in which the registry tracks the status of each certification claim, who issued it, what tests or evaluations were performed, and when it expires or must be renewed. These certifications become part of the agent’s metadata and are visible in the marketplace as trust signals, informing consumers about agent reliability and governance status.

Because policies evolve over time, the registry supports versioning and lifecycle management for each policy definition. This allows governance teams to deprecate outdated rules, introduce new requirements, and enforce recertification when changes occur. The registry provides the necessary infrastructure to ensure that trust is not static but continuously evaluated and enforced across the agent ecosystem. In doing so, the registry acts as the foundation for maintaining safety, accountability, and confidence in autonomous operations.


## Users

The registry maintains identity-linked metadata for all human users interacting with the agent ecosystem. Each user is associated with a unique identity, typically sourced from an enterprise identity provider, as shown in Figure 9-7Figure 9-7.


*[Diagram illustrating user definition metadata, showing associations such as unique user identifier, user name, email, and user state.]*


###### Figure 9-7. User definition

User information may minimally include the following elements:user_idThis is a globally unique identifier that represents a specific user within the agentic mesh, enabling consistent reference across workspaces, interactions, and audit logs.nameThis refers to the user’s full human-readable name, used for display purposes and to provide contextual identity in collaborative environments.emailThis is the user’s email address, serving both as a communication channel and as a potential login credential for authentication and notifications.stateThis indicates the current status of the user account—such as ACTIVE, SUSPENDED, or DEACTIVATED—affecting the user’s ability to participate in conversations or access agent services.

By storing user registration information, the registry enables consistent access management across all services in the agentic mesh. Note that only registrations are stored in the registry since each enterprise would maintain a book of record information for users in their identity management systems. Each user registration would be synchronized as needed with the enterprise identity book of record systems.

User information also plays a critical role in governance and accountability. All actions taken in the system—whether viewing an agent, launching a task, or modifying metadata—are recorded with identity attribution. This forms the basis for audit trails, which can be queried to reconstruct who did what, when, and why. These records are particularly important in regulated environments or during incident investigations, where traceability and oversight are required.

In collaborative scenarios, such as shared workspaces, user metadata is used to define participant lists, assign responsibilities, and control visibility. Users can be granted read, write, or administrative access based on their role or project affiliation. This allows fine-grained control over how agents and humans interact, ensuring that sensitive data and actions are only visible to authorized participants. The registry thus supports not just technical enforcement but also organizational alignment in multiuser contexts.


## Implementation Considerations

There are several implementation topics that should be considered but which are beyond the scope of this book. In general, these topics are related to scaling, operability, and governance—each of which is crucial in any production implementation recognizing the registry’s central role in agentic mesh:

Schema managementHow agent metadata schemas are versioned, validated, and evolved over time, ensuring backward compatibility and consistent interpretation of agent attributes as new fields or structures are introducedEventing and notificationsHow changes in the registry—such as new agent registrations, updates, or decommissions—trigger notifications through an event bus or publish-subscribe mechanism to alert dependent agents, fleets, or monitoring servicesAudit logging and access tracingHow all registry access and modification actions are captured in immutable logs, allowing queries for compliance reviews, intrusion detection, and debugging complex agent behaviorsConflict resolution and concurrency controlHow simultaneous updates from different users or services are handled through optimistic or pessimistic locking, version checks, or transaction retries to maintain data integritySoft deletes and archivalHow retired or deleted entities are handled—whether kept for compliance in an archived state (i.e., soft-deleted but recoverable) or permanently removed after retention periods—with clear access policies for historical recordsChange management and versioningHow new registry entries, such as agents or policies, are introduced via staged approvals, rollback mechanisms, and version promotion workflows to support controlled releasesIntegration with external systemsHow the registry connects to enterprise systems like identity and access management (IAM), centralized logging, external data catalogs, or federated registries to maintain interoperability across domainsSecurity and encryption modelHow registry data is secured through encryption at rest and in transit, fine-grained access controls, and token-based authentication to safeguard sensitive agent metadata and configurationScalability and performance characteristicsHow the registry is engineered to handle high throughput and low latency at enterprise scale, supporting millions of agents and users while maintaining consistent query performanceUsage metrics and analyticsHow aggregated metrics—such as agent popularity, version adoption, or unused configurations—are derived to inform optimization, capacity planning, and product improvementBackup and disaster recoveryHow registry data is regularly backed up, replicated across regions, and restored in the event of infrastructure failure or corruption to ensure continuity and resilience


## Summary

In this chapter, we explained how the registry serves as the system of record that turns a collection of agents into an operable ecosystem: we described its core entities (agents, conversations, interactions, workspaces, policies, and users); showed how machine-readable metadata underpins discovery, access control, and certification; and outlined how conversation and interaction histories provide continuity, observability, and auditability across workflows. We also connected the registry to the broader platform—powering the marketplace, informing the monitor, and enforcing governance—and closed with practical implementation considerations (schema evolution, eventing, security, scaling, and recovery) to guide enterprise deployment.

In Chapter 10Chapter 10, we turn to interaction management, where we explore how agents and humans communicate through events, messages, and shared contexts; how conversations and interactions preserve continuity and intent; and how the mesh’s event-driven fabric provides the reliability, observability, and scale needed for real-time collaboration across thousands of autonomous participants.
