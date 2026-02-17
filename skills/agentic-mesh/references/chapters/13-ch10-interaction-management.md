# 10. Interaction Management


## Chapter 10. Interaction Management

In Chapter 9Chapter 9, we saw how the registry provides a structured way to record agents, their metadata, and the policies that govern them. But a registry on its own is static; the real value of the mesh emerges when those agents begin to communicate and work together. Communication—whether between people and agents or among agents themselves—drives the bulk of the activity in the mesh and is what transforms a catalog of agents into a functioning ecosystem.

In this chapter, we turn from records to exchanges. We look at the different forms of interaction that take place within the mesh, examining how tasks are initiated, how context is preserved, and how outcomes are tracked. Where earlier chapters offered high-level overviews, now we break down the patterns of interaction in greater detail, showing how they underpin coordination, trust, and scale.

But what are interaction patterns? Agentic mesh interaction patterns are the repeatable ways agents and people exchange messages, make progress on tasks, and coordinate outcomes. They define who speaks to whom, over what channel, with what context attached, and how that conversation advances state. In practical terms, they are the rules of the road that keep thousands of autonomous components from talking past one another.

These patterns matter because autonomy alone doesn’t guarantee coordination. Without shared conventions for how to start an interaction, how to carry forward context, and how to signal completion or error, agents stall or duplicate work—and users lose track of what’s happening. Structured patterns provide continuity (conversations), scoping (interactions and steps), and observability (statuses, logs, and alerts). They also let the platform enforce guardrails—identity, policy, and certification checks—at the same points in every flow.

Within the agentic mesh, interaction patterns span both human-to-agent and agent-to-agent work. Task-oriented exchanges let a person message a specific agent and track a bounded job to completion. Agent-to-agent handoffs let one agent delegate steps to another without a human in the loop, using shared identifiers to preserve context. Workspace interactions extend the model to goal-oriented collaboration, where many agents subscribe to a shared stream and decide—based on policy or intent—when to act and when to stay quiet. Together, these patterns scale from a single request to complex, multiparty workflows.


## Agentic Mesh Interaction Management

There are three main methods of agent interaction, as shown in Figure 10-1Figure 10-1, that occur within the mesh, with each serving a different purpose and interacting in a different way. The first method is when a user communicates with a task-oriented agent. These interactions begin with a user sending a message to a particular agent in the mesh that they believe suits their needs. This message is received by the agent, which begins processing this message in a task-oriented manner, until it finishes its processing or enters a state where it cannot proceed further (such as lacking required information). This communication is handled through interactions server APIs, which direct the information to the appropriate place.


*[Diagram illustrating three types of agent communication: task-oriented agent communication, agent-to-agent communication, and workplace communication.]*


###### Figure 10-1. Different interaction types

The next method of agent interaction is the agent-to-agent communication, which occurs when one agent contacts another, delegating responsibility for some subset of the action plan it has produced. In this interaction method, the agents send messages to each other, providing enough information for the receiver agent to fulfill its task. This agent-to-agent communication is done directly, with the relevant URLs retrieved from the registry of the mesh, without needing the interactions server as an intermediate entry.

The final method of agent interaction is the workspace interaction. As explained previously, workspaces are shared message queues used as shared context by any agents that have subscribed to them. This allows these agents to act in a goal-oriented manner, with the agents subscribed to the workspace figuring out for themselves how to accomplish the goal. In order for a user to kick off these goal-oriented agents, they will need to create a goal in the workspace and submit an initial message, informing the agents therein of what they are supposed to be accomplishing. This will be handled through a set of APIs on the interactions server, though a different set of APIs than those used to trigger task-oriented agents.


## Event-Driven Communication

When agents communicate within the mesh, the use of standard HTTP requests and responses is insufficient. HTTP assumes persistent, addressable endpoints and synchronous availability, which does not align with how agents operate. Agents can start, stop, scale, relocate, or suspend operations at any time. These dynamic behaviors require a communication model that tolerates asynchronous activity and intermittent availability.

To address this, we think event-driven architecture is better suited to agents rather than direct HTTP communication. Events are published to subjects or channels and consumed by any subscribed agent or service. This design decouples senders from receivers, allowing agents to operate independently without requiring continuous connectivity or direct addressing. It also enables message persistence, retry mechanisms, and parallel consumption across multiple agent instances. As a result, the event-driven model supports scalability, fault tolerance, and flexible coordination across the distributed system.


### HTTP Versus Event-Driven

Traditional HTTP communication works well for components that are fixed, addressable, and continuously available—like the registry or the interactions server. These services operate under predictable URLs, are always online, and respond synchronously to user or system requests. However, this model quickly breaks down when applied to agents, which are far more dynamic. Agents may be created, paused, or terminated depending on workload or administrative policy. They may relocate across hosts or scale horizontally, spawning multiple instances to handle concurrent activity. In such an environment, maintaining stable URLs, synchronous availability, and direct addressing becomes impractical.

An event-driven architecture addresses these limitations by decoupling senders and receivers. Instead of sending a request to a specific endpoint, a component publishes an event to a channel or subject. Any agent or service interested in that event subscribes to the channel and reacts when a new event arrives. The system no longer depends on knowing where a particular agent resides or whether it is currently active. Communication becomes asynchronous, resilient, and naturally scalable.

In this model, message queues and publish-subscribe (pub/sub) systems form the operational foundation. They provide the infrastructure that makes event-driven systems reliable and observable at scale.


### Message Queues: Reliable Delivery and Persistence

A message queue, as shown in Figure 10-2Figure 10-2, ensures that every event is durably stored until it is consumed. Each queue acts as a buffer between producers (publishers) and consumers (subscribers), enabling asynchronous delivery. This persistence is critical in an agentic environment where agents may be temporarily unavailable or restarted frequently. Messages remain in the queue until an agent retrieves them, guaranteeing that no communication is lost due to transient downtime.


*[Diagram illustrating a message queue system where a publisher sends messages to a queue, which are then consumed by multiple agents, demonstrating asynchronous communication and durability.]*


###### Figure 10-2. Event-driven message queue

By giving each agent its own named queue, the system ensures that communication can continue without concern for the agent’s physical location, host, or lifecycle state. Load balancing is automatically managed by the queue system—multiple instances of the same agent can consume from a single queue, each pulling messages as capacity allows. Commercial systems like NATS JetStream, Kafka, and RabbitMQ offer these features natively, reducing the need for custom infrastructure.


### Pub/Sub: Dynamic and Scalable Distribution

While message queues manage reliable delivery and persistence for one-to-one or load-balanced communication, pub/sub systems extend this model to one-to-many distribution. In a pub/sub pattern, producers publish events to a logical topic or subject, and all consumers that subscribe to that topic receive those events simultaneously. The publisher does not need to know who the subscribers are, how many exist, or where they are located. This decoupling allows many independent agents, monitors, or analytical services to react to the same event stream in real time—each interpreting or processing the data according to its role.

In practice, pub/sub systems introduce a layer of abstraction that separates message production from message consumption. When an event is published, the event broker routes it to all subscribers of the corresponding subject. This enables different agents to respond to the same information concurrently: one may trigger a workflow, another may update a dashboard, while a third logs the event for compliance. Each subscriber acts autonomously, but they are synchronized through the shared event fabric. This design supports concurrency at scale, where thousands of agents can process events in parallel without centralized coordination or complex addressing schemes.

Within the agentic mesh, pub/sub provides the backbone for both coordination and transparency. Agents can subscribe to subjects that match their operational domain or policy scope—for example, mesh.financial.transaction.* for finance-related events or mesh.infrastructure.alerts.# for monitoring events. By subscribing to specific subject hierarchies, each agent filters the vast event space into the subset that matters to its purpose. This selective listening ensures that agents act only on relevant stimuli while remaining loosely coupled to the overall system. It also allows new agents to be added seamlessly: as soon as they subscribe to an existing topic, they become participants in the mesh’s ongoing event flow.

Pub/sub also forms the foundation for observability in the mesh. Monitoring components such as the mesh monitor, registry observer, or external analytics services can subscribe to the same subjects that carry operational events. This parallel consumption enables complete visibility into what agents are doing, when they are doing it, and how those activities evolve over time. Because subscriptions are nonintrusive, observability does not interfere with normal agent operations. Instead, it creates a passive layer of transparency that supports auditing, debugging, and performance analysis without adding friction to message flow.

The architecture is further enhanced when pub/sub is integrated with message queuing and event persistence. In many modern systems, including NATS JetStream and Kafka, each published event is durably stored in an underlying log or stream. Subscribers can consume these events in real time as they are published or later by replaying the historical log. This hybrid model unifies the strengths of both paradigms: pub/sub provides the dynamism of real-time distribution, while queues or streams provide reliability, buffering, and replayability. Together, they enable both live reaction and retrospective analysis—a dual capability essential for intelligent coordination and governance across distributed agents.

From a scalability standpoint, the pub/sub model allows the mesh to operate as a reactive system rather than a command-driven one. Instead of issuing direct instructions, agents broadcast state changes or results as events, and other agents decide autonomously how to respond. This shifts control from centralized orchestration to distributed collaboration, increasing both resilience and throughput. It also lays the groundwork for higher-order behaviors such as adaptive scaling, emergent coordination, and policy-based response—all of which depend on timely, transparent event propagation. In the agentic mesh, pub/sub is therefore not just a communication pattern but a foundational mechanism that enables the mesh to grow, adapt, and reason as a collective system.


### Event Replay

One of the defining advantages of event-driven systems is their ability not only to transmit messages in real time but also to replay them later. Event replay means that every event published to the system can be stored durably and reconsumed on demand, as though it were happening again. Platforms such as NATS JetStream, Apache Kafka, and Apache Pulsar treat events as immutable records appended to a log. Each subscriber maintains an independent pointer, or offset, representing its progress through that log. Because the events themselves are never deleted immediately after delivery, a subscriber can move its pointer backward and reprocess earlier events at any time. This design turns the messaging fabric into a temporal data store—one that preserves both the order and content of historical communication.

In the context of the agentic mesh, replay capability provides a transparent safety net for distributed coordination. If an agent crashes midtask or a new instance replaces a failed one, it can resume from the exact event where it left off. The system does not need to reconstruct context manually or request retransmission from the sender; the same events can simply be replayed. Because the underlying event broker handles message retention and offset management, agents remain stateless with respect to delivery guarantees. This model reduces complexity for developers while improving fault tolerance and continuity of operations across agent lifecycles.

Replay also enhances auditability and traceability. Every message that passes through the mesh—task initiation, plan updates, completion signals, or error notices—can be replayed to reconstruct a full conversation history. Monitors or auditors can replay a time window of events to verify compliance or debug anomalies without interfering with live traffic. In regulated environments, this ability to reconstruct the exact sequence of actions taken by agents can be crucial for evidentiary and governance purposes. Unlike conventional logs, replayable event streams preserve not just metadata but the full payloads, allowing exact state reconstruction at any point in time.

Another important benefit is reproducibility for analytics and learning. Since events are immutable and replayable, analytics agents or machine-learning components can consume the same historical data multiple times to test new models or evaluate algorithmic changes. For instance, an optimization agent could replay the past month’s transactions to measure how a revised strategy would have performed. Similarly, development teams can use replay to run simulations in staging environments using production data—without affecting live systems. Event replay thus becomes an essential tool for experimentation, regression testing, and continuous improvement of autonomous agent behavior.

So event replay contributes to temporal consistency across the ecosystem. Because each agent or service can choose its own replay point, the mesh gains the ability to reason about system state at specific moments. This supports time-travel debugging, deterministic recomputation, and coordinated recovery after partial failures. In aggregate, these capabilities elevate the event bus from a transient transport layer to a persistent system of record. By preserving, indexing, and replaying events as first-class artifacts, the agentic mesh achieves both the immediacy of real-time coordination and the reliability of a durable historical ledger—an essential combination for scalable, auditable, and resilient agent ecosystems.


### Monitoring Queues

In addition to the advantages over HTTP, using a message queue allows for easier recordkeeping and monitoring in the data mesh. To monitor a particular queue, all the mesh needs to do is set up another subscriber to the queue, and it will receive all of the messages that enter it. This has a variety of uses for the mesh.

In order to keep the data mesh running, messages must not just be made available to the one receiving them, but they must also be recorded and monitored by the larger mesh. As we will see in later sections of this chapter, agents rely on the full history of the current conversation between users, other agents, and themselves in order to provide the context necessary to perform their tasks. This is accomplished by having the monitor component of the mesh subscribe to the message queues used for agent communication. Whenever a message is added to the queue, the monitor will also receive that message, allowing it to turn this message into a permanent record that will be stored in the registry. From there, it can be retrieved as needed.

Additionally, this ability to record messages in the registry resolves one of the few downsides of using queues: message persistence. As message queues are designed around having a constant stream of new messages, with old ones being referenced relatively rarely, many message queues eventually age out old messages. This can be a problem for something like the agentic mesh, where some tasks and conversations might need to persist over long periods of time ranging from days to potentially months or years. In this case, a message queue is not the optimal way to keep track of messages in the long term. The registry compensates for this weakness of message queues by allowing old messages to still be available when needed, even if months or years have passed since the message was sent.

Monitoring message queues can also be useful for any user that wishes to watch the conversation as it unfolds. This is particularly useful for agents that expect to interact with users in a conversational manner. While the conversation history can simply be retrieved from the registry and displayed, with everything passing through a message queue, the user can simply subscribe to the same message queue and watch the conversation as it unfolds. This observability helps users understand what their agents are doing and helps administrators of the mesh understand what the mesh is doing at any given moment.

Monitoring is also useful for the auditability of the data mesh. While everything will end up creating a permanent record in the registry, it can be useful for auditing a system to see the messages as they flow through the mesh, to verify what is actually going on as it happens. Similarly, this can be useful in debugging the mesh.


## User-to-Agent Communication

When a user initiates communication with a task-oriented agent, the process begins simply: a message is sent, and the agent responds. But as interactions become more complex, this straightforward model quickly breaks down. Agents often need additional input to complete a task or must manage multiple tasks simultaneously. If every message were treated in isolation, there would be no way to connect new information to an ongoing task—making it impossible, for example, to resume a partially completed process or clarify missing details. Conversely, if all messages shared a single global context, agents would be overwhelmed by unrelated data and could easily misapply information from one task to another. The agentic mesh resolves this problem by structuring communication around conversations and interactions, providing a built-in hierarchy that preserves both context and clarity.

A conversation represents a logical thread that ties together all related exchanges among a set of participants—people and agents alike. As shown in Figure 10-3Figure 10-3, each conversation encompasses multiple messages flowing between users and agents, often across several communication channels. The figure illustrates this relationship visually: messages from different participants converge into a shared conversational thread, depicted as a horizontal flow. The conversation serves as the container for contextual memory, ensuring that when any agent receives a message, it also gains access to the preceding message history associated with that conversation. This allows each participant to reason about ongoing activity with full awareness of prior exchanges—what was asked, what was answered, and what still needs attention.


*[Diagram illustrating how messages from a publisher enter a message queue, then are processed by a receiving agent, monitored, and accessed by users, auditors, and debugging developers, showcasing agent-to-agent and agent-to-person communications.]*


###### Figure 10-3. Agent-to-agent and agent-to-person communications

This context-preserving design has several practical benefits. It enables agents to reuse information that was already provided earlier, reducing friction for users and minimizing redundant data entry. Consider opening a bank account: a user might first identify themselves and open a new account and then later request to transfer funds or order a debit card. Because all three actions occur within the same conversation, the agent can recall the user’s identity and account details automatically without asking again. In large multiagent scenarios, this same structure ensures that each participating agent can access the same shared understanding of the user’s intent, even if different agents handle different parts of the workflow.

Within a conversation, the mesh introduces a finer level of organization called an interaction. Each interaction corresponds to a distinct, bounded task—such as “open account,” “transfer funds,” or “order checks.” When a new task begins, it is assigned a unique interaction ID (IID) that distinguishes it from other ongoing activities within the same conversation. This concept is illustrated in Figure 10-4Figure 10-4, which zooms in on the structure: the broader conversation appears as a container encompassing multiple interaction threads, each represented by its own sequence of messages. The IID functions as a correlation key, linking each message to its specific task while preventing accidental cross-updates between tasks.


*[Diagram illustrating the structure of conversations and interactions, showing multiple interaction threads within larger conversation containers, each with its own sequence of messages.]*


###### Figure 10-4. Conversations and interactions

This separation of scope is crucial for maintaining coherence as the mesh scales. An agent processing an update tagged with a given IID will only modify the state of the corresponding interaction, leaving others untouched. For example, in the bank account scenario, if the “transfer funds” interaction is paused due to insufficient balance, the user can still continue the “order checks” interaction independently. The agent distinguishes between these two activities automatically because the messages reference different interaction IDs. This structure allows multiple tasks to proceed concurrently under a single conversation while keeping their progress isolated and manageable.

Together, conversations and interactions provide a unified framework for continuity and control. Conversations maintain shared memory and context across related exchanges, while interactions preserve task boundaries and execution flow. This layered approach scales seamlessly from simple user-agent dialogues to multiparty, multistage workflows that span many agents and time intervals.


### Interaction Lifecycle

Every interaction between a user and an agent in the mesh follows a defined lifecycle. This lifecycle represents the series of states that a task passes through—from its initial creation, through processing, to eventual completion or error. Understanding this lifecycle is key to understanding how the agentic mesh coordinates distributed work, handles failures, and maintains consistency across agents. Figure 10-5Figure 10-5 visualizes this process as a state machine, showing how an interaction progresses through distinct stages and how different events trigger transitions between them.

The lifecycle begins when a user (or another agent) initiates a new task. This triggers the creation of a new interaction, which initially enters the “ground” state. At this point, the interaction exists but has not yet been fully configured. The agent uses this phase to allocate resources, register identifiers, and prepare supporting data structures. In Figure 10-5Figure 10-5, this is represented by the leftmost node labeled “ground,” which connects directly to the “ready” state once setup is complete.


*[Diagram illustrating the interaction lifecycle, showing transitions from ]*


###### Figure 10-5. Interaction lifecycle

When initialization is complete, the interaction transitions to the “ready” state. This indicates that all prerequisites are satisfied and the agent is ready to begin processing, but execution has not yet started. During this phase, the agent typically compiles its execution plan—identifying the tools, external agents, or data sources it will use to fulfill the request. For example, an account-opening agent might prepare steps to verify identity, perform compliance checks, and create a new record in the banking system. Once this plan is assembled, the interaction moves to the “working” state, shown in the diagram as the central hub from which several other transitions can occur.

In the “working” state, the agent begins active execution of the plan. It may perform local actions, contact other agents, or call specialized tools. If everything proceeds normally, the task remains in this state until it completes successfully. However, real-world tasks often encounter complications. If the agent determines that it cannot continue because essential information is missing—for instance, a user failed to provide an identification number—the interaction shifts into the “pending” state. In this state, processing pauses until the missing information is supplied. Once the user provides the required data, the interaction transitions back to “working” and resumes from where it left off. If too much time passes without the missing information being provided, the interaction automatically transitions from “pending” to “error.”

The error state represents conditions that the agent cannot resolve autonomously—such as failed API calls, corrupted files, or unexpected data structures. When this occurs, the interaction is suspended and awaits external intervention. Users or administrators can either correct the problem, prompting a transition back to “working,” or determine that no resolution is possible. In that case, the interaction transitions directly to “complete,” marked as “manually marked complete” in the diagram. This explicit handling of unrecoverable errors ensures that the system maintains transparency and traceability even in exceptional cases.

Finally, once all required steps are executed and any errors resolved, the interaction transitions into the “complete” state. At this point, the task has finished successfully and is removed from the list of active interactions. The agent no longer performs any actions on it, but the record of that interaction persists in the conversation history. This archival step is critical: completed interactions provide historical context for future conversations and serve as data for analysis, learning, or auditing.


### Conversations

Whereas an interaction may describe the execution of a single task with a defined end state, a conversation may consist of many related interactions, all of which exist within a shared context. Whenever an agent receives a message that is part of a conversation, it will also receive the message history of that conversation along with the initial message, allowing it to use prior interactions to inform its response to the current message.

With interactions following a single task from beginning to end, you might ask why interactions need to be grouped into conversations at all. Why not just let interactions stay independent of each other and be handled in isolation? The answer iscontext. When speaking in natural language, a lot of information is never explicitly stated by the speaker but is nonetheless understood from the context of the conversation. For example, if someone says, “Put it on the counter,” in isolation this would raise the question of what it refers to. However, if the same request is said in a wider context—such as being uttered after the same person asked you to open a pickle jar—then the statement has obvious meaning.

Using the bank account example to explore this, a user might first want to open a bank account, which requires them to provide enough personal and banking information to allow the account to be opened. The person might then want to ask to receive a debit card connected to their account. Taken in isolation, the agent receiving this message might not know what account this request is referring to, which would require that the user provide a much larger amount of information accompanying the request, or it would set the interaction into a pending state and wait for further information. However, if this interaction occurs within the same conversation as the prior interaction that opened the account, which account is being referred to is obvious from the context of the conversation, letting the agent infer the relevant information from prior interactions. This simplifies the process of sending new requests to agents and provides a much more user-friendly manner of interacting, since having to provide the same information over and over again would be very annoying for a user.


### Conversation and Interaction Endpoints

In order to interact with conversations or interactions, APIs are provided by the interactions server to facilitate these interactions. Endpoints for retrieving information about existing conversations and interactions were covered in Chapter 9Chapter 9, so this section focuses on the endpoints that start or modify conversations and interactions. The endpoints described in the following subsections are provided by the interactions server, which serves as an intermediary between users and agents. These endpoints allow the starting of new conversations, interactions, and messages, as well as closing a conversation.


## Agent-to-Agent Communication

Agent-to-agent communication occurs when one autonomous agent decides it needs to contact another agent for information, or to delegate work that it is not suited for. This can be because the other agent is more specialized in a particular task, or because an agent does not have access to the requisite tools to perform a task, or because it has been instructed to do so in its approach. However, unlike user-to-agent communication, no user interface is needed for this, leading to a different flow for agent-to-agent communication compared to user-to-agent communication.


### Agents as Plan Steps

When an agent communicates with another agent, it does so because it is seeking some sort of help in fulfilling a task that it has been assigned. But how does an agent decide which agents to contact and in what order? This is part of the planning stage that each agent goes through when it receives a new task.

When an agent is started or restarted in the system, it will first go to the registry of the mesh and retrieve its full configuration, and from there get the list of all agents, workspaces, and tools that this agent is allowed to communicate with. This information is then stored until the agent receives an interaction.

Whenever an agent receives a new interaction, the first thing it will do is retrieve the conversation history so it understands the context it is operating in. This step involves reaching out to the registry, which will provide the full conversation history to the agent. This conversation will then include the agent’s context along with the list of available agents and tools, for when it makes a decision on how to proceed with its plan. This will be a call to the LLM that acts as the brain of the agent, with prompts tailored to allow it to produce a task plan. This task plan will consist of a number of steps, each of which will call another agent or tool to perform a step in the process, until the task is completed.

But once the plan is constructed, each of the included agents must actually be contacted and supplied with the relevant information to perform their task.


### Sending Messages

Unlike user-to-agent communication, agent-to-agent communication does not use the interactions server as an intermediary between the user and the agent. Instead, agents send messages directly to the message queue of the receiving agent, where the receiving agent will pick up the message and act upon it. Because the name of the queue that an agent listens to is the same as the name of the agent itself, the relevant queue will always be known to the sending agent.

However, the message on the queue is usually fairly small, containing only any new information that could not be found elsewhere in the conversation. In order to get the history of the conversation, the agent will use the conversation ID to contact the registry and request the history of the conversation that this message is a part of.

The registry will return this information to the agent, allowing it to have the vital context it needs in order to act upon the new message it has received. This allows individual messages to be quite small and contain only new information, without needing to repeat the relevant bits of the conversation history in every message sent between agents. To visualize this, see Figure 10-6Figure 10-6.


*[Diagram illustrating agent-to-agent communication, showing an agent placing a message on a message queue and retrieving conversation history from a registry.]*


###### Figure 10-6. Agent-to-agent communication

Agent-to-agent communication uses the same conversation mechanism that is used for user-to-agent communication. All messages exist within the context of an overarching conversation and within interactions that are part of those conversations. However, while users can create new interactions or conversations on their own initiative, task-oriented agents cannot do so (goal-oriented agents will be discussed in “Workspaces”

“Workspaces”).

When a task-oriented agent creates a new message, it will be in response to either a user-created message or an agent-generated message. In the case of a user-generated message, the new interaction will be created by the interactions server before the agent has a chance to create messages based on it, which lets the agent use the new interaction ID for the message it sends. And if the message is received from another agent, that message will have an attached message ID that is reused by the receiving agent for any new messages it creates. In both cases there are available IDs to reuse, with no need to create new ones.

Once an agent receives a new message from another agent, it will respond to it in the same manner as if the message had been received from a user. It will use its cached information on the agents and tools it has access to in order to construct a task plan for the part of the task it is responsible for. This allows the receiving agent of any particular message to reach out to other agents in turn, allowing for very deep nesting of agent calls, which allows very complex problems to be tackled, if the task can be broken down into subtasks appropriate to the nested agents being called. With each agent being responsible for only a small portion of the overall task, the quality of the responses can remain high.


## User Alerts

In all of the previously covered communication mechanisms, an agent has been the receiving actor in the transaction. But what about communications that have to go in the opposite direction? What about when a user needs to be notified about the behavior of an agent? While customized responses can always be handled on a case-by-case basis through the use of custom tools that may utilize any communication mechanism desired, this requires a great deal of effort from those setting up these agents. To alleviate this burden and handle cases where a custom tool may not be viable, the agentic mesh provides an alerting mechanism that allows users to receive information about agents.

Whenever a user logs in to the agentic mesh, they can configure alert settings that will allow them to determine how the mesh will generate alerts from their conversations or interactions. This control will consist primarily of which state changes in interactions they create will generate an alert. For instance, a user might decide that a transition from “working” to “pending” is sufficient for them to be notified, but the transition from “pending” back to “working” does not. Or perhaps they decide that every step in the interaction will generate an alert when it is completed. These settings are available to be configured, both as a per-user default and individually configurable for individual interactions if the default settings are not sufficient for this interaction.

Whenever an interaction changes state, this state change is processed by the registry, and it is from here that alerting begins its operation. When the registry notes that a state change has occurred, it will check its records to determine which user initiated the interaction. From there, it will check that user’s notification settings to determine if this state change will generate a notification for this user. If the checks pass, an alert will be generated and put into the registry’s database. If the user is logged in at the time the alert is generated, the alert will also be pushed up to them through the user interface. If they are not logged in at the time the alert is generated, the alert will remain in the database and will be retrieved for the user when they next log in, allowing them to see the alert at that time.

However, having alerts remain purely within the agentic mesh system may not be the best option for all users. Some users may only log on rarely, meaning that many alerts may not be seen for quite a while after they are generated. Alternatively, a user may want rapid notification of anything that happens with their interactions because they are unable to stay logged in to the mesh very frequently. In these cases, the ability to integrate with other systems can help enhance this alerting mechanism. The simplest way would be to integrate with email and allow alerts to generate email messages notifying users about events that are occurring, although other integrations are also possible. The specifics of these integrations will depend on your use case and the technologies you use, so select which one would be best in your circumstances. A high-level visualization of these options is shown in Figure 10-7Figure 10-7.


*[Diagram showing the flow of alerts in the agentic mesh system, from an agent to registry and external integrations, illustrating options for user notification through logging in or other integrations.]*


###### Figure 10-7. Alert flow


## Workspaces

The previously discussed communication mechanisms work very well for task-oriented agents, where a central agent has a clear idea of the task that needs to be performed, and has at its disposal a way of constructing a plan to do it. However, not every type of task is well suited to the structure of a task-oriented agent. For example, if attempting to run a simulation of a stock market, multiple agents may need to respond when a new piece of news comes in. Running this sort of simulation through a central agent would simply not be capable of generating the type of behavior that is desired. Any type of goal that would require multiple agents to work simultaneously without a single high-level agent managing things will not be suitable for the previously discussed communication mechanisms alone. Workspaces are the answer to this.

While the other communication mechanisms discussed so far are all point-to-point communication mechanisms, workspaces represent a different paradigm.

Workspaces are shared spaces that agents and users can use to send messages that are viewed by multiple people or agents. In effect, a workspace is a message queue that multiple agents subscribe to rather than a queue specific to a singular agent. This shared space allows messages sent by the user to be directly received and processed by every agent that is subscribed to the workspace. These agents begin to act on this message independently of each other. Figure 10-8Figure 10-8 gives a visual representation of workspace communications.


*[Diagram illustrating workspace communication where users and agents submit messages to a shared message queue, allowing multiple agents to receive and write messages back, demonstrating a parallel processing paradigm.]*


###### Figure 10-8. Workspace communication


### Deciding to Respond

With task-oriented agents, an agent is always expected to take some sort of action in response to any message that it receives, whether that’s calling a tool, calling an agent, or creating and executing a plan containing multiple agent or tool calls. This makes sense in the context of a message that is sent only to that specific agent, because who else would respond to it but that agent? However, this is no longer true for agents operating within a workspace. Each message in a workspace may be received by every agent in the workspace, and responding may not be appropriate for every agent. Picture how chaotic a workspace would become if it had 30 agents in it, each of which would respond to every message a user sent in. To say it would be difficult to follow would be quite the understatement. And that’s not even considering what could happen when agents start responding to each other’s messages! In order to keep workplaces manageable, agents will need to have some mechanism for deciding which messages they need to respond to and which they do not.

When an agent has received a message from the workspace, its first action will be to decide whether this message should be responded to. For the best results, this decision can be made by the LLM underlying the agent, which has the ability to interpret complex situations with intelligence. The LLM would be given the history of messages currently in the workspace and be asked whether the current message is something that the agent it is part of needs to respond to. The LLM would also provide its reasoning as to why, so that the observability into the agentic mesh is maintained.

However, in some cases using an LLM as a decision mechanism might be overkill, with simpler methods serving the same goal. These methods include very simple mechanisms, like an allowlist or blocklist based on the sending agent’s ID—for example, to ensure that an agent does not respond to its own messages, or that it only responds to messages from specific agents, enabling some degree of hierarchy in the workspace. Other simple methods might include checks for specific keywords.

On the more sophisticated end, usingcosine similaritycosine similarity with thevector embeddingvector embedding of an example message could also be used, allowing the agent to respond only to messages that have similar meaning to the example provided. Alternatively, similarity to the embedding of a list of relevant keywords could be used to focus on a specific area rather than similarity to an example message. One more method would be to compare the vector embeddings of the relevant strings for each agent present in the workspace and only allow the agent with the best match to respond. While this does restrict the workspace to only having a single agent respond to a given message, which prevents implementing certain types of use cases, it may be useful in preventing agents from flooding the workspace with many messages.

While not quite as good at determining what to do as a well-constructed LLM call, these methods provide a lower-cost and lower-latency manner of deciding whether to respond to a given message in a workspace. Which specific method is best for each agent will be determined by their specific use case and context.


### Acting on Workspace Messages

This sort of response decision making will be performed by every agent that is present in the workspace, for every new message that they encounter. Once these determinations are made, each agent that decides that a response is needed will then decide how they are going to respond to it. This response will be done in mostly the same manner discussed previously, as though the message had been received through the dedicated message queue of the agent. A task plan will be constructed that includes other calls to agents or tools. These calls found within the agent’s plan will be through the dedicated queues that are specific to each agent and will generally not directly involve the workspace, except as potential context given to allow downstream agents to know enough to perform their tasks.

However, there are several ways in which these task plans do differ from those discussed previously. The first is that they may include a respond-to-workspace tool. This tool will take a given string as a message, and write it back into the workspace, giving the agent an ability to write final or intermediate outputs back into the workspace, to be seen by everyone who subscribes to it. But this leads directly into the second difference in how a task plan is constructed based on the workspace. Namely, that the agent does not need to have its plan proceed from the start of the goal all the way to the final answer. The agent is aware that there are other agents in the workspace, which allows it to construct task plans that target intermediate goals or results that may be useful to other agents. This allows the agent to meaningfully contribute to the goal, even if it can only see a partial solution, before sending its results back to the workspace to be picked up by either a human user or another agent who has the knowledge to pick up where this agent left off. This allows a wider variety of architectures to be constructed using workspaces as a foundational component. Figure 10-9Figure 10-9 shows how workspaces can cause agents to generate task plans based on the messages they receive.


*[Diagram illustrating how agents generate task plans based on messages received from a workspace, showing different agent responses and their corresponding task plans.]*


###### Figure 10-9. Agents generating plans based on workspace messages


### Workspace Goals

Until now, workspaces have been discussed as something with little internal structure, as though they were simply a message queue. And while that analogy is useful, it is not complete. When assembling a group of agents together into a shared environment, there will be plenty of use cases where the same sort of task will be repeated many times, or where several similar requests will come in simultaneously. If the workspace were simply an undifferentiated message queue, then messages from different tasks would get mixed together, leading to confusion for the agents present.

To avoid this, messages in workspaces are organized around goals. A goal is an objective provided to the workspace by a user, in which the initial message outlines what they are seeking to accomplish. When this first message is generated, the goal is assigned a goal ID (GID), which identifies the goal that it is a part of. New messages in response to the initial message are given the same GID as the initial message that created them, allowing all messages related to this goal to be grouped together.

When an agent responds to a message in a workspace, it only includes the parts of the history of the workspace that are also associated with that goal. Other unassociated messages are not visible to the agent, keeping different goals isolated from each other. This separation of concerns allows for workspaces to be reused between goals, cutting down the number of workspaces and message queues needed to handle these goals. It also keeps the message history of a given goal clear and focused, with only the most relevant messages being picked up by the agent. In many ways, a goal serves a similar purpose as a conversation does within a task-oriented agent: grouping related messages together.

However, a goal is not set in stone after it is created. Users are able to add new messages to a goal even after it is created. These can be in order to provide new information to the agents in the workspace. This might unblock stuck agents or provide context to clarify what the goal is. It might also be to redirect the agents if the user is monitoring the workspace and sees the agents getting off track. These new messages are treated like any other in the workspace, though being from the initiating user means agents will be treating the information as more closely tied to the goal than a message from another agent.

Like a conversation or interaction, a workspace goal has a defined state that keeps track of the current status of the workspace. Unlike interactions, the lifecycle of a workspace goal is more limited. Due to the large number of interacting agents, and the potential vagueness of the goal defined by the user, there are only a handful of possible states. A goal starts in the “ready” state upon creation and will sit there until it receives its first message. The goal will then transition to the “working” state, which indicates that at least one message is present and that agents may be interacting with messages contained within. A goal’s final state is the “complete” state. This state will typically be entered at the request of a user who has permission to alter the workspace, and this state is expected to be manually entered once the user feels that their workspace has fulfilled its goal, or after a long-enough timeout if the workspace receives no updates. In this state, no new messages can be added to the workspace, and no processing in response to messages occurs. This goal lifecycle is visualized in Figure 10-10Figure 10-10.


*[Diagram illustrating the lifecycle of a workspace goal, depicting transitions from ]*


###### Figure 10-10. Goal lifecycle


### Workspaces as a Super-Context

Agentic mesh introduces “super-contexts,” a shared conversational fabric that lets many agents coordinate in real time. Think of the way a message channel organizes human teamwork: everyone sees the same thread, knows what has happened, and understands what comes next. Super-contexts bring that same transparency and speed to autonomous systems but at machine tempo. They give agents a common place to read, write, and reason together, turning fragmented tasks into a coherent flow.

What makes this powerful is not just message passing but shared memory. Every event, message, plan, and result accumulates inside the super-context. Agents entering the scene don’t start cold; they arrive with history. They see prior decisions, pending items, and open questions, and can act without asking others to restate context. This collapses the lag that usually weighs down multisystem work and replaces it with immediate, informed action.

Coordination scales because agents subscribe to the slices of the conversation that matter to their role. Observer agents watch external signals and translate them into structured events. Task-oriented agents pick up well-defined work, call tools, transform data, and report results. Goal-oriented agents orchestrate outcomes across many steps, adjusting plans when conditions change. All three operate against the same super-context, so their contributions align rather than collide.

The model is event-driven. Agents publish events to subjects; interested agents consume them; the fabric persists and indexes everything. Pub/sub delivers real-time fan-out so multiple agents can react in parallel, while durable streams provide replay for recovery, audit, and analysis. The result is a living record of the work as it unfolds plus a reliable ledger of how and why decisions were made.

A simple scenario shows the mechanics. An observer detects a notable signal and posts a structured event into the super-context. A goal-oriented agent, subscribed to that class of events, converts it into a plan with clear steps. Task agents claim the steps that match their capabilities, execute them, and write intermediate results back. As new information arrives, the goal agent revises the plan, cancels or adds steps, and marks progress. No one has to ask for status; the status is the conversation.

Because every agent can see the full conversation, they can determine when to speak and when to stay quiet. Relevance filters, policies, and role metadata keep noise in check, but the visibility remains. This “ambient awareness” is what supercharges coordination: agents do not operate on partial snapshots or private silos; they operate from the big picture. Misunderstandings that normally require handoffs and meetings are resolved by reading the same shared record.

Super-contexts also formalize structure. Schemas, message types, and higher-order protocols make interactions interpretable across time and teams. You can evolve processes without redeploying every agent: add fields, version states, tighten policies, or change routing rules declaratively. The coordination rules live in the fabric, not in brittle point-to-point code, which makes large ecosystems governable and testable.

Resilience comes built-in. If an agent crashes, a replacement replays the relevant stream and resumes where it left off. If a plan stalls for missing information, the interaction moves to a pending state visible to all; when information arrives, execution continues. Errors move to an explicit lane with remediation paths. The lifecycle is explicit—ground, ready, working, pending, error, complete—and every transition is recorded.

Over time, the super-context compounds value. Past conversations become training data for better prompts, smarter policies, and faster plans. Patterns in successes and failures guide optimization. New agents join and become effective immediately because the knowledge they need is not scattered—it is encoded in the shared history they can query and subscribe to.

We believe super-contexts are a coordination accelerator. They transform many autonomous parts into a synchronized whole by giving agents a shared place to see everything, decide what they can address, and contribute in parallel. That is why they feel like a Slack for agents: a persistent, searchable, real-time space where work happens in the open—and because these are AI agents, it happens continuously, at scale, and at speed.


## Summary

Taken together, interaction management turns the mesh from a static registry into a living system: conversations preserve shared context, interactions bound work with clear identifiers and lifecycles, and an event-driven fabric—queues, pub/sub, and replay—keeps agents coordinated, observable, and resilient at scale. Users can start bounded tasks, agents can hand off and nest plans without losing state, and workspaces provide goal-oriented collaboration where many agents see the same stream and decide when to act.

This chapter established the rules of the road—who talks to whom, on what channels, and with what context, and how progress is recorded—so coordination becomes predictable rather than accidental. With those mechanics in place, in Chapter 11Chapter 11 we now turn to the safeguards that make such communication trustworthy: identity, policy enforcement, and end-to-end security.
