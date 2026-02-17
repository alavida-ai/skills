# Agent Basics: Core Components & Behavior

> Covers: `06-ch04-agent-basics.md`

## Key Concepts

### Agent Definition
- **Agent**: A program powered by LLMs that can independently make decisions, plan iteratively, and execute tasks to achieve complex goals. [→ source](chapters/06-ch04-agent-basics.md#chapter-4-agent-basics)
- **Autonomy**: Ability to independently make decisions and pursue goals without constant oversight. [→ source](chapters/06-ch04-agent-basics.md#chapter-4-agent-basics)
- **Adaptiveness**: Capacity to adjust when conditions change and reason about what to do next. [→ source](chapters/06-ch04-agent-basics.md#chapter-4-agent-basics)

### Agent Identity & Persistence
- **Agent Identity**: Addressable presence within a system—identifier that signals continuity across interactions, analogous to HR-managed employment records. [→ source](chapters/06-ch04-agent-basics.md#from-person-to-agent)
- **Conversational Continuity**: Long-running conversations that hold context across time, enabling relationship-like interactions. [→ source](chapters/06-ch04-agent-basics.md#from-person-to-agent)
- **Temporal Memory**: Ability to recall prior states flawlessly and indefinitely, resuming with continuity intact after suspension. [→ source](chapters/06-ch04-agent-basics.md#from-person-to-agent)
- **Data Trails**: Structured logs of activity that ensure continuity even after agent suspension. [→ source](chapters/06-ch04-agent-basics.md#from-person-to-agent)

### Collective Agent Structures
- **Agent Fleets**: Groups of agents that divide responsibilities, share information, and coordinate through structured message exchanges—analogous to human teams. [→ source](chapters/06-ch04-agent-basics.md#from-teams-to-agent-fleets)
- **Agent Ecosystems**: Dynamic networks ("fleets of fleets") that resemble adaptive mesh structures rather than fixed hierarchies, continuously reshaping as agents join, leave, or change roles. [→ source](chapters/06-ch04-agent-basics.md#from-organizations-to-agent-ecosystems)
- **Ad Hoc Working Groups**: Temporary collaborations formed to solve specific problems, then dissolved—enabling fluid cooperation across fleet boundaries. [→ source](chapters/06-ch04-agent-basics.md#from-organizations-to-agent-ecosystems)
- **Ecosystems of Ecosystems**: Future vision of multilayered "supply chains of intelligence" coordinating across industries and domains. [→ source](chapters/06-ch04-agent-basics.md#from-organizations-to-agent-ecosystems)

### Collaboration Principles
- **Specialization**: Division of labor where agents are tuned for specific capabilities (NLP, data retrieval, quantitative reasoning, visualization). [→ source](chapters/06-ch04-agent-basics.md#from-teams-to-agent-fleets)
- **Communication Flow**: Structured protocols, message passing, and data exchange that keep participants aligned. [→ source](chapters/06-ch04-agent-basics.md#from-teams-to-agent-fleets)
- **Trust Mechanisms**: Clear identities, reliable channels, and assurances of accurate information and intended actions. [→ source](chapters/06-ch04-agent-basics.md#from-teams-to-agent-fleets)
- **Resilience**: Ability to redistribute work when fleet members are unavailable, maintaining continuity through adaptation. [→ source](chapters/06-ch04-agent-basics.md#from-teams-to-agent-fleets)

## Taxonomy

### Agent Architecture Components
1. **Task Management**
   - Planning [→ source](chapters/06-ch04-agent-basics.md#architecture-of-an-agent)
   - Execution [→ source](chapters/06-ch04-agent-basics.md#architecture-of-an-agent)

2. **Intelligence Layer**
   - Problem-solving [→ source](chapters/06-ch04-agent-basics.md#architecture-of-an-agent)
   - Tool use [→ source](chapters/06-ch04-agent-basics.md#architecture-of-an-agent)
   - Memory [→ source](chapters/06-ch04-agent-basics.md#architecture-of-an-agent)
   - Learning [→ source](chapters/06-ch04-agent-basics.md#architecture-of-an-agent)

### Organizational Levels (Human-Agent Analogy)
1. **Individual** → Single Agent [→ source](chapters/06-ch04-agent-basics.md#agent-analogy-agents-as-people)
2. **Team** → Agent Fleet [→ source](chapters/06-ch04-agent-basics.md#from-teams-to-agent-fleets)
3. **Organization** → Agent Ecosystem [→ source](chapters/06-ch04-agent-basics.md#from-organizations-to-agent-ecosystems)

## Key Frameworks & Models

### Task Planning
- **Goal Decomposition**: Breaking broad objectives into structured subgoals with explicit reasoning about dependencies, sequencing, and contingencies. [→ source](chapters/06-ch04-agent-basics.md#task-planning)
- **Tool Selection**: Filtering and prioritizing from vast APIs/services based on tacit knowledge, not exhaustive search—intelligent resource mobilization. [→ source](chapters/06-ch04-agent-basics.md#task-planning)
- **Collaborative Allocation**: Deciding whether to proceed independently, invoke a tool, or delegate to specialized agents. [→ source](chapters/06-ch04-agent-basics.md#task-planning)
- **Justification Mechanism**: Attached reasoning that ensures internal coherence, traceability, and accountability. [→ source](chapters/06-ch04-agent-basics.md#task-planning)
- **Plan-Act-Evaluate-Replan Loop**: Iterative cycle enabling adaptive behavior in dynamic environments. [→ source](chapters/06-ch04-agent-basics.md#task-planning)
- **Multi-Level Planning**: Tactical (micro-level tool sequences) and strategic (macro-level workflows across time). [→ source](chapters/06-ch04-agent-basics.md#task-planning)

### Task Execution
- **Sequential Execution**: Logically dependent chain where each step waits for predecessors—guarantees correctness but introduces latency. [→ source](chapters/06-ch04-agent-basics.md#task-execution)
- **Parallel Execution**: Concurrent subtask dispatch for higher throughput, balanced against coordination overhead and race conditions. [→ source](chapters/06-ch04-agent-basics.md#task-execution)
- **Monitoring**: Tracking completion status, intermediate results, failures, anomalies—transforms execution from blind to reflective. [→ source](chapters/06-ch04-agent-basics.md#task-execution)
- **Performance Evaluation**: Measuring efficiency, accuracy, and cost against defined criteria; feeds back into planning. [→ source](chapters/06-ch04-agent-basics.md#task-execution)
- **Error Handling**: Catching failed API calls, malformed inputs, timeouts; deciding whether to retry, escalate, or abort. [→ source](chapters/06-ch04-agent-basics.md#task-execution)
- **Feedback Loops**: Intermediate results fed back into reasoning, triggering replanning or task reallocation. [→ source](chapters/06-ch04-agent-basics.md#task-execution)
- **Delegation**: Spawning subtasks, enlisting specialized services or other agents to multiply capacity. [→ source](chapters/06-ch04-agent-basics.md#task-execution)
- **State Machines**: Schedulers, event triggers ensuring no step is lost or overlooked—stateful process with temporal continuity. [→ source](chapters/06-ch04-agent-basics.md#task-execution)

### Problem-Solving & Reasoning
- **LLM as "Brain"**: Large language models serve as statistical reasoning engines, distilling patterns from massive corpora to generate plausible explanations and solutions. [→ source](chapters/06-ch04-agent-basics.md#problem-solving)
- **Brain-LLM Analogy**: Human brain (biological neurons) and LLM (engineered parameters) both generate cognition through distributed pattern recognition and generalization. [→ source](chapters/06-ch04-agent-basics.md#problem-solving)
- **Model Scale Spectrum**: Large general-purpose models (polymaths) vs. smaller specialized models (experts) vs. fine-tuned models (professional specialists). [→ source](chapters/06-ch04-agent-basics.md#problem-solving)
- **Structured Techniques**: Decomposition into subtasks, analogical reasoning mapping unfamiliar to known, trial-and-error iteration. [→ source](chapters/06-ch04-agent-basics.md#problem-solving)

### Tool Use
- **Tool as Amplification**: External systems (APIs, databases, calculators) enable agents to transcend LLM limits, just as tools transcend human biological constraints. [→ source](chapters/06-ch04-agent-basics.md#tool-use)
- **Tool Chaining**: Orchestrating multiple tools into pipelines where output of one becomes input of next. [→ source](chapters/06-ch04-agent-basics.md#tool-use)
- **Tool Skill Requirement**: Proper invocation with correct parameters—improper use undermines performance. [→ source](chapters/06-ch04-agent-basics.md#tool-use)
- **Creative Recombination**: Discovering novel ways to chain existing tools in unanticipated configurations. [→ source](chapters/06-ch04-agent-basics.md#tool-use)
- **Environmental Mediation**: Tools as sensory/operational extensions (sensors for perception, actuators for action). [→ source](chapters/06-ch04-agent-basics.md#tool-use)
- **Context-Driven Selection**: Matching tools to tasks, balancing accuracy vs. cost, latency vs. availability, specialization vs. generality. [→ source](chapters/06-ch04-agent-basics.md#tool-use)

### Memory & Context
- **Context Window**: Bounded token space—agent's analogue to human working memory, limiting simultaneous processing capacity. [→ source](chapters/06-ch04-agent-basics.md#memory-and-context)
- **Context Engineering**: Discipline of selecting, curating, and compressing information for optimal context window utilization—analogous to human attention and focus. [→ source](chapters/06-ch04-agent-basics.md#memory-and-context)
- **Memory Hierarchy**: Immediate context windows (registers), cached intermediate results (short-term), vector stores (semantic recall), external knowledge bases (long-term persistence). [→ source](chapters/06-ch04-agent-basics.md#memory-and-context)
- **Memory Externalization**: Logs, databases, knowledge graphs, vector embeddings as prosthetics extending biological/computational memory. [→ source](chapters/06-ch04-agent-basics.md#memory-and-context)
- **Conversational Memory**: State maintained across interactions for coherent, contextually aware exchanges. [→ source](chapters/06-ch04-agent-basics.md#memory-and-context)
- **Memory Failures**: Context window overflow, hallucination of missing details, misapplication of stored information. [→ source](chapters/06-ch04-agent-basics.md#memory-and-context)
- **Reflective Memory**: Analyzing logs of prior executions to refine future strategies—transforms memory into growth. [→ source](chapters/06-ch04-agent-basics.md#memory-and-context)
- **Collective Memory**: Shared vector stores, synchronized knowledge bases, distributed logs enabling multi-agent coordination. [→ source](chapters/06-ch04-agent-basics.md#memory-and-context)

### Learning
- **Dual Learning Sources**: Formal (pretraining on vast corpora) + tacit (ongoing adaptation from real-world engagement). [→ source](chapters/06-ch04-agent-basics.md#learning)
- **Explicit Knowledge**: Codified in pretrained parameters and fine-tuned models—transferable across contexts. [→ source](chapters/06-ch04-agent-basics.md#learning)
- **Tacit Knowledge**: Embodied in interaction-based adaptations—memory stores, evolving heuristics, RLHF patterns. [→ source](chapters/06-ch04-agent-basics.md#learning)
- **Layered Learning Stages**: Pretraining (broad foundations) → Fine-tuning (domain specialization) → In-context learning (task-specific adaptation). [→ source](chapters/06-ch04-agent-basics.md#learning)
- **Transformational Learning**: Converting memory into growth—doing tomorrow what couldn't be done yesterday through integration, reflection, adaptation. [→ source](chapters/06-ch04-agent-basics.md#learning)

### Collaboration & Communication
- **Point-to-Point Messaging**: Direct agent-to-agent message delivery—efficient, personal, immediate. [→ source](chapters/06-ch04-agent-basics.md#collaboration-and-communications)
- **Shared Languages/Protocols**: Structured specifications (e.g., A2A standards) enabling inter-agent intelligibility—protocols as agent languages. [→ source](chapters/06-ch04-agent-basics.md#collaboration-and-communications)
- **Communication Channels**: Network protocols, message buses, pub/sub systems as transport media. [→ source](chapters/06-ch04-agent-basics.md#collaboration-and-communications)
- **Rich Communication**: Metadata, context frames, structured envelopes (CloudEvents) providing "tone" and "body language" of interactions. [→ source](chapters/06-ch04-agent-basics.md#collaboration-and-communications)
- **Trust Infrastructure**: Authentication, authorization, encryption ensuring messages are genuine, secure, exchanged only between trusted parties. [→ source](chapters/06-ch04-agent-basics.md#collaboration-and-communications)
- **Feedback Loops**: Request acknowledgment, response validation, error communication enabling real-time adaptation. [→ source](chapters/06-ch04-agent-basics.md#collaboration-and-communications)

## Relationships

### Core Dependency Chain
Task Planning → Task Execution → Problem-Solving (via LLM "brain")
- Planning generates abstract roadmaps
- Execution translates to concrete operations
- Problem-solving provides autonomous reasoning layer

### Capability Enablers
- **Tool Use** extends both planning (resource selection) and execution (concrete operations)
- **Memory** underpins all components (planning uses past experiences, execution maintains state, learning requires historical data)
- **Learning** transforms memory into improved future performance

### Scalability Layers
- Individual agent capabilities (planning, execution, tools, memory) → Fleet coordination (specialization, communication) → Ecosystem dynamics (adaptive networks, distributed resilience)

### Human-Agent Parallel
Every architectural component has direct human analogue:
- Planning ↔ Human goal decomposition
- Execution ↔ Human task follow-through
- Problem-solving ↔ Human reasoning/creativity
- Tool use ↔ Human technology amplification
- Memory ↔ Human working/long-term memory
- Learning ↔ Human education + experience
- Collaboration ↔ Human conversation + teams

### Context Engineering as Bottleneck
Despite growing LLM capability, context window remains finite → Context engineering bridges expanding intelligence and bounded attention → Critical for realizing agent potential

### Trust as Foundation
Both fleet coordination and ecosystem formation require trust mechanisms (identities, channels, protocols) → Without trust, collaboration collapses at all scales
