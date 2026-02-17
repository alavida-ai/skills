# 3. Agents Versus AI Workflow


## Chapter 3. Agents Versus AI Workflow

AI workflows, as defineddefined by the AI vendor Anthropic, provide a structured, step-by-step process where “LLMs and tools are orchestrated through predefined code paths.” But AI workflows shouldn’t be confused with agents. Where an agent might adapt on the fly, rerouting its plan if it encounters something unexpected, an AI workflow tends to follow a fixed path, guiding data from one stage to the next. That step-by-step execution can simplify oversight and troubleshooting, making workflows a logical choice for scenarios where simplicity matters more than flexibility offered by agents.

This interplay—between the predefined nature of AI workflows and the more dynamic, self-directed capabilities of agents—reveals where the broader field may be headed. In some cases, agents can actually embed entire AI workflows under the hood, blending autonomy with structure. The real question isn’t which one will prevail but rather how each can best contribute to a smarter, more responsive AI ecosystem.


## Defining AI Workflows

AI workflows provide a structured approach for integrating language models into larger processes. Instead of letting each model call or tool invocation stand alone, workflows chain them together in a well-defined and perhaps easier-to-understand manner, reducing the disorganization often seen in homegrown AI experiments.

AI workflows let otherwise complex, dependent large language model (LLM) calls be decomposed into multiple smaller stages. A single business requirement—for example, automating a set of multilingual marketing assets—can be split into subtasks: prompt generation, language translation, sentiment checking, and final aggregation. This breakdown not only simplifies the role of each step in LLM execution but also helps isolate problems: if a step’s accuracy starts drifting, you can focus on that specific stage rather than looking at the entire workflow.

Nevertheless, the rigidity of a predefined workflow means adapting on the fly can be difficult. If an unexpected input type surfaces, or the data veers outside the anticipated scope, the workflow might not have a built-in mechanism to handle the exception. This shortcoming can be particularly problematic when the workflow’s later stages depend heavily on correct outputs from earlier steps—an error in one step can cascade all the way to the final result.

In this sense, AI workflows occupy an important middle ground between ad hoc experimentation and more advanced, autonomous agents. They rely on a clear architecture that coordinates LLMs and specialized tools across multiple stages.


## Common Types of AI Workflows

AI workflows can follow a range of patterns, each suited to different tasks and organizational needs. This section expands on several widely used patterns, including prompt chaining, routing, parallelization, reflection, and orchestration.

We use the same scenario to bring our examples to life—a simplified version of a bank account open process where a customer wishes to open one or more accounts of varying types. The end-to-end action takes several steps:1. Identity verificationChecks to make sure the customer is who they say they are2. Know your customer (KYC)

Documents and confirms a customer’s banking and risk profile3. Initial depositWhere the actual bank account is opened and money is deposited4. NotificationWhere the customer is notified that their account has been opened


### Prompt Chaining

Prompt chaining, shown in Figure 3-1Figure 3-1, decomposes a high-level goal into a series of smaller LLM tasks. One prompt might generate the initial copy, a second prompt translates the text into a desired language, and a third verifies style and tone. Each step takes the previous step’s output as its input.


*[Diagram contrasting a one-shot prompt with a chained prompt pattern, where a user request triggers a series of defined steps including identity verification, customer information gathering, deposit, and notification.]*


###### Figure 3-1. Prompt chaining

The idea is to guide the LLM’s thought process by providing a structured sequence of prompts, each prompt building on the outcome of the previous one. This approach provides guides such that the final output is both coherent and comprehensive, especially when dealing with tasks that require multiple layers of reasoning or creativity.

In our scenario, we start with a user request:

I want to open a new checking account…Which leads to a high-level prompt:

You are a customer service AI for a bank. A customer named John Doe wants to open a new checking account. Please confirm his identity (ID documents are provided and verified), perform a KYC screening (no concerns found), process an initial deposit of $500, and then deliver a short final message confirming that his account is open with a $500 balance. Provide any relevant next steps or contact information.

In a single instruction, the LLM is expected to:

Validate identity and confirm it’s verifiedConfirm that KYC is clearProcess a $500 depositCompose a final confirmation message to the customerThe LLM must handle all these steps on its own and determine what each step entails within a single prompt.

The right-hand side of Figure 3-2Figure 3-2 shows how this is broken into smaller parts, where instead of expecting the LLM to determine the lower-level details, a more detailed step-by-step set of prompts could be used, and as needed, the output from one task can be the input to the next.

Identity verification:

Output: The AI acknowledges the ID is valid and confirms identity verification.

KYC check:

Output: The LLM runs a KYC check, finds no concerns, and confirms that John Doe passes KYC.

Initial deposit:

Output: The LLM processes the deposit and confirms the balance in the new account is now $500.

Notification:

Output: The AI composes a final customer-facing message confirming all the details.

By chaining prompts, the LLM is guided through each step of the account-opening process, mirroring real-world procedures: verifying ID, running KYC checks, handling a deposit, and issuing confirmation.

At every stage, the AI’s output becomes the basis for the next prompt. This ensures more transparency and control, reduces the likelihood of skipping steps, and helps maintain clarity in each stage of the process.


### Routing

Routing workflows classify an incoming query or data point and direct it to a specialized model or process. The example in Figure 3-2Figure 3-2 shows how a routing pattern can be used to open a single banking product account (in this case, a checking account) based upon specific customer needs.


*[Diagram illustrating a routing pattern for opening different types of bank accounts based on a complex prompt, showing a decision process through a router that directs queries to checking, savings, or investment accounts.]*


###### Figure 3-2. Routing pattern

Our original user request is unchanged:

I want to open a new checking account…But in this case, our AI workflow can handle multiple account types. Building upon the prompt chaining example, our routing example would handle multiple different product types. Prompt:

If a checking account, then run “Checking Account Opening Chain.” If a savings account, then run “Savings Account Opening Chain.” If an investment account, then run “Investment Account Opening Chain.”

This approach builds on the notion that an LLM fine-tuned for one domain (like refunds) may not excel in another (like bug reports). Routing ensures each request lands in the right “lane,” boosting the overall quality of responses.

There are several advantages of adding routing:

FlexibilityAs an organization supports more products—banking products, in our case—they don’t need to create one massive prompt for every scenario. Instead, they maintain specialized chains for each product.

Fit for purposeEach workflow can be optimized for its specific use case.

Better customer experienceUsers get more relevant prompts and correct instructions, reducing confusion and the likelihood of mistakes.

Nevertheless, because routing hinges on accurate classification, it can introduce a new point of failure and complexity: if the router misjudges an input, it sends the query down an ill-suited path. Teams often mitigate this risk by training a separate lightweight classifier or including a fallback to handle ambiguous cases


### Parallelization

AI workflow parallelization, as shown in Figure 3-3Figure 3-3, is a way of organizing and executing multiple steps or tasks at the same time rather than doing them one after the other. Instead of feeding prompts through in sequence, they are split, and each chunk is processed in parallel. Once all the smaller tasks are complete, the results are gathered and combined into a final outcome.


*[Diagram illustrating the parallelization pattern for processing user requests to open multiple accounts simultaneously, depicting steps from splitting to aggregating results.]*


###### Figure 3-3. Parallelization pattern

In this case, our user request changes a bit, where the customer now wishes to open multiple accounts:

I want to open checking, savings, and investment accounts…Building upon the previous routing example, our parallelization example would be modified to handle prompts for products in parallel and aggregate results upon completion:

Prompt P1:

Run “Checking Account Opening Chain.”

Prompt P2:

Run “Savings Account Opening Chain.”

Prompt P3:

Run “Investment Account Opening Chain.”

Plus…Aggregation:

Aggregate results from previous steps and continue.

Parallelization is particularly useful when different parts of an AI workflow either do not depend on one another or can be easily separated. It helps to speed up computation, make better use of available processing power, and improve throughput.

Note that while parallelization typically reduces total processing time, it can raise coordination challenges. The design must aggregate or reconcile the outputs of multiple LLM instances in an orderly way, which may call for additional logic or ensemble methods.


### Orchestration

In the orchestration pattern, as shown in Figure 3-4Figure 3-4, one LLM (the orchestrator) dynamically breaks down a task and delegates each piece to a set of worker LLMs. Unlike parallelization—where tasks are predefined and run concurrently—this pattern lets the orchestrator adapt dynamically, deciding what subtasks are needed based on the content or complexity of the input.


*[Diagram illustrating the orchestration pattern, where an orchestrator dynamically assigns tasks for opening multiple accounts, demonstrating a sequence from planning to aggregation.]*


###### Figure 3-4. Orchestration pattern

Let’s continue with our parallelization example but show how it can be implemented using an orchestration pattern. We can use the same prompt from parallelization. The user requests the following:

I want to open checking, savings, and investment accounts…But now the orchestrator would create a task plan using a prompt that looks something like the following (from the Task Planner):

John Doe has requested…Create and execute a task plan for this request…The orchestration action would create a task plan that looks something like the following:

Common steps: identify verification and KYC checkingParallel steps for each product (see parallelization prompts)

Aggregate resultsNotify customer of account openingsBy delegating subtasks to specialized or separate LLM instances, the orchestrator can handle more complex problems that don’t lend themselves to a fixed sequence of steps. This approach balances efficiency and flexibility: the orchestrator takes on the planning role, while the subtask focuses on executing narrower tasks, each with a tailored prompt or set of instructions. It also simplifies debugging—if a single subtask fails, you can isolate and correct that portion without disturbing the entire system.

Note that each decision point adds another moving part, heightening the risk of miscommunication between the orchestrator and workers. Obviously, careful design is essential to prevent circular dependencies or infinite loops, as the orchestrator’s logic must account for unexpected worker responses and edge cases.


### Reflection

LangChain definesLangChain definesreflection as a strategy that “involves prompting an LLM to reflect on and critique its past actions, sometimes incorporating additional external information such as tool observations.”

Continuing with our scenario, as shown in Figure 3-5Figure 3-5, we use the reflection pattern to initiate a request but verify the outcome and rework the request as needed.

The reflection pattern prompts an AI system to pause, analyze, and critique its past actions before proceeding. Unlike straightforward workflows that prioritize efficiency and immediate output, reflection inserts a deliberate self-evaluation phase, allowing an LLM to reconsider its previous responses and refine them if necessary. Reflection can be internal (self-analysis) or external (incorporating additional context, tool feedback, or human input).


*[Diagram illustrating the reflection pattern, which includes reflection and verification phases, used to review and refine the process of opening checking, savings, and investment accounts.]*


###### Figure 3-5. Reflection pattern

This pattern is inspired by the psychological concept of System 1 versus System 2 thinking, introduced by Daniel Kahneman in Thinking, Fast and Slow. System 1 thinking is fast, intuitive, and automatic—akin to how standard LLMs typically generate responses. System 2 thinking, in contrast, is slow, deliberate, and analytical—mirroring the behavior introduced through reflection-based workflows.

Reflection helps AI systems escape the limitations of System 1–style rapid response and shift toward System 2–style reasoning, where they carefully reassess their own work. This reflection can improve the following:

AccuracyReflection helps reduce common LLM hallucinations or factual errors by prompting a model to double-check its reasoning.

CoherenceResponses become more structured and logical when AI takes time to critique and refine them.

Resilience to edge casesA model that can self-reflect is less likely to repeat mistakes and can correct itself when faced with ambiguous or misleading input.

This approach is particularly useful for knowledge-intensive, high-stakes applications such as legal document review, medical diagnoses, or scientific research, where correctness outweighs response speed.

The primary downside of reflection is increased computational cost and latency. Since each cycle requires additional processing steps, low-latency applications (e.g., chatbots or real-time assistance tools) may not benefit from this approach. Instead, reflection works best in situations where accuracy is paramount and response time is secondary.

Additionally, reflection depends on well-structured evaluation prompts—if the self-critique prompt is weak, the reflection process may not yield meaningful improvements. Developers must carefully design feedback loops to ensure the system identifies and corrects genuine mistakes rather than overoptimizing trivial details.


## Challenges with AI Workflows

All LLM-based solutions are based upon a probabilistic, or nondeterministic, model, which means that outputs for a given input may have errors (even if the likelihood is low) and may not be repeatable, and it is common to get nominally different outputs with the same inputs (although with careful LLM parameter modification and diligent prompting, this can be minimized).

In other words, nondeterminism is an LLM problem, but since AI workflows are bound so tightly to their LLMs, it becomes an AI workflow problem. It is this fundamental issue that creates practical black-box, scaling, and edge-case challenges.


### The “Black Box” Issue

Even when the steps in a workflow are well defined, the inner workings of LLMs can remain opaque. Developers may know which model to call at each stage, but they often lack clarity on how the LLM arrives at specific results. This lack of transparency can hinder trust, especially in high-stakes domains, such as finance or healthcare, where explainability is paramount.

This poses a material challenge: Anthropic has saidAnthropic has said that “we mostly treat AI models as a black box: something goes in and a response comes out, and it’s not clear why the model gave that particular response instead of another. This makes it hard to trust that these models are safe: if we don’t know how they work, how do we know they won’t give harmful, biased, untruthful, or otherwise dangerous responses? How can we trust that they’ll be safe and reliable?”Anthropic continuedAnthropic continued: “Opening the black box doesn’t necessarily help: the internal state of the model—what the model is ‘thinking’ before writing its response—consists of a long list of numbers (‘neuron activations’) without a clear meaning.”

Why does this matter? We expect that firms, especially those in regulated industries, will face regulatory and compliance hurdles as they struggle to justify or document model decisions if the underlying mechanism is not interpretable. Since all AI workflow implementations are based upon probabilistic LLMs, they will be faced with challenges in problem diagnosis and troubleshooting. When unexpected outputs occur, pinpointing and debugging the source of the error can be difficult if the LLM’s decision-making process is not transparent (nevertheless, we show several approaches later in the book on how to reduce these errors).


### Scaling Challenges

One of the biggest vulnerabilities in multistep AI workflows arises when errors introduced early in the chain become amplified in subsequent steps. For instance, a misclassified query in a routing workflow can send the request to the wrong execution branch, which then feeds a mismatched output to the next step, eventually causing the entire pipeline to produce useless or misleading results. This snowball effect grows more severe as the complexity of the workflow increases.

In prompt chaining, any overlooked mistake in the first prompt—for example, an incorrect interpretation of a user’s objective—renders every follow-up step based on that interpretation flawed. Similarly, in parallelization workflows, one faulty subprocess can taint or contradict the aggregated results, forcing downstream steps to reconcile conflicting or invalid data. When these workflows are scaled to handle thousands or millions of daily requests, such small, initial errors have the potential to ripple through and impact a wide swath of outputs.

Compounding this scaling issue is the black-box nature of LLMs that we touched upon earlier. Developers may not fully understand or anticipate how an LLM generates particular responses, so tracing the exact point of failure can become a challenge. Rather than encountering a single, obvious bug, teams may discover symptoms of errors scattered across different parts of the workflow. Without transparent reasoning or an effective debugging strategy, it becomes significantly harder to pinpoint which link in the chain has gone awry, much less fix it.

As organizations attempt to scale these workflows, the risk is that they hit a practical ceiling, where the operational costs of diagnosing and correcting these distributed errors become prohibitive. Consistency and reliability may erode unless workflow designers establish robust checks, fail-safes, and monitoring at each stage of processing. This can include human-in-the-loop checkpoints, automated anomaly detection tools, or gates that verify intermediate outputs before proceeding to the next step. Yet these mitigations often introduce additional complexity and overhead, chipping away at the very efficiency gains that AI workflows promise.

Ultimately, the error-amplification problem—in tandem with limited interpretability—can hinder the widespread adoption of AI workflows, especially as they inevitably get more complex. Addressing this issue requires thoughtful architecture, proactive error handling, and a strategic approach to debugging that ensures that each link in the chain is monitored and validated so that errors do not cascade into catastrophically incorrect outputs.


### Handling Edge Cases

AI workflow’s predetermined steps work best when the problem space is well defined, where each step assumes a certain kind of input and leads to a predictable output. However, this expectation may not be met in practice. Users may provide information in unexpected formats or raise queries developers never thought to anticipate, revealing the limits of a system that cannot easily deviate from its scripted pathways.

Even though LLMs excel at interpreting vague or incomplete prompts, their adaptability only goes so far when executed through a preset workflow. These models can handle natural language commands and detect nuances in user requests, but if the workflow design itself does not accommodate novel scenarios, the LLM’s responses might not reach the right destination. In other words, no matter how “intelligent” a model may appear, its output still travels along the same static path, potentially missing relevant steps or skipping crucial safeguards.

The problem is especially pronounced with edge cases—the unusual or rare situations that lie outside the anticipated use patterns. For a finance-related workflow, developers might plan for tasks like identity verification or risk assessment, but not for an unexpected currency format or an obscure legal restriction from a less-common jurisdiction. When one of these outliers surfaces, the workflow lacks a built-in branch to handle it, leading to errors or requiring last-minute human intervention.

Beyond operational inconvenience, complexity introduced to handle edge cases can also stifle growth and evolution in AI applications. As a system encounters new types of data over time, developers must manually add or adjust workflow steps to accommodate them—an endeavor that can be both tedious and error-prone. The rigidity of the workflow structure can thus create a bottleneck for innovation, forcing organizations to constantly patch or redesign their pipelines rather than let them adapt smoothly in real time.

The need for handling edge cases gracefully, consistently, and transparently underscores the delicate balance between predictability and flexibility in AI systems. Predefined workflows are excellent for controlling error rates and ensuring consistency, but they pay for that control by limiting adaptability. As organizations expand their AI capabilities, they may discover that the cost of constantly updating static paths becomes unsustainable. In such cases, introducing components that are more dynamic—or blending workflow orchestration with limited agentic features—can help a system evolve alongside changing needs and unexpected situations.


## Comparing AI Workflows and Agents

AI development today, as illustrated in Figure 3-6Figure 3-6, is centered around two approaches: AI workflows, which we have been discussing so far, and agents. AI workflows orchestrate sequences of AI operations through structured pipelines, where they can include conditional logic and dynamic elements but follow architectures designed by developers. AI agents, by contrast, use LLM-powered reasoning to interpret goals, plan approaches, and make decisions autonomously so they can handle novel situations not explicitly programmed and adapt their strategies based on context and feedback.


*[Diagram comparing AI workflows with fixed execution paths and autonomous agents that dynamically create and execute task plans.]*


###### Figure 3-6. AI workflows versus agents

By design, AI workflows excel in well-understood environments where each route and contingency is spelled out ahead of time, thereby ensuring outcomes that are more predictable (or at least well-understood execution paths). Yet these same features mean that workflows may be inflexible, and as a result, workflows can falter when facing unforeseen edge cases. If new data diverges from original assumptions, the system may lack the built-in agility to adapt, which is precisely where agent-based models exhibit potential advantage. Despite these challenges, AI workflows offer clarity and simplicity by using a step-by-step approach, and this is proving valuable in an era increasingly concerned with AI transparency.

On the agent side, true autonomy remains an ongoing challenge. But modern LLMs now offer sophisticated reasoning, allowing agents to adjust to new conditions more readily than workflows and promise a path toward much broader autonomy. It is crucial to note that this reasoning capability allows AI agents to understand context, interpret ambiguous instructions, and generate novel approaches.

Still, today, it is probably often overlooked that these agents probably operate within implicit workflow-like paths, just with more flexible “decision nodes” that allow for branching behavior. Total freedom where an agent can do anything under any circumstance is still a work in progress—although much progress is being made very quickly!

Clearly, each approach faces challenges. Workflows can break down when the environment shifts in unanticipated ways, requiring updates and new decision branches. Agents, despite their promise of adaptability, can still hallucinate or make unsupervised errors in conditions where the data exceeds their learned parameters. Consequently, both workflows and agents need robust feedback mechanisms, whether in the form of human-in-the-loop review, error monitoring, or adaptive retraining.

Another thing to consider: from a performance standpoint, organizations often measure workflows by throughput, reliability, and step-by-step metrics like completion rates or error frequency. Because of workflows’ structured design, pinpointing areas for improvement is usually straightforward. Agents, on the other hand, introduce complexity in measurement: their outcomes can vary more significantly, demanding novel metrics—such as how well they adapt to edge cases or the frequency of successful “self-corrections” when new data arrives.


## Agents Extend AI Workflows

Anthropic definesAnthropic defines agents as “systems where LLMs dynamically direct their own processes and tool usage, maintaining control over how they accomplish tasks.” Anthropic continues: “Once the task is clear, agents plan and operate independently, potentially returning to the human for further information or judgement.”

The key difference between agents and AI workflows is that agents autonomously and independently plan and execute their work, whereas AI workflows execute based upon a predefined set of instructions created by the workflow creator. That being said, with more complex patterns such as orchestration and reflection, the dividing line between agents and AI workflows becomes blurred.

AI workflows differ from agents in other ways:

Packaging and containerizationModern architecture designs let agents become containers for AI workflows. This containerization offers a more flexible and robust method of packaging, implementing, and deploying AI workflows.

Simplified interactionsThis more robust implementation method offers many options that make it easier for agents to interact.

Enterprise-grade capabilitiesAgents provide a rich container for AI workflows that make them much easier to adapt to enterprise-grade expectations.

ScalingAs enterprise-grade capabilities are adopted, it becomes easier to use common scaling techniques to allow an agent ecosystem to easily grow.

Ecosystem integrationUsing containerization and a simplified interaction model, agents can easily fit into a broader ecosystem—the agentic mesh.

Let’s start with packaging and containerization. AI workflows are typically implemented as a single Python main (a Python program with multiple imports) and run as a single process within an operating system. This can be extended in many ways, but the most common is to package the AI workflow in a container that is easy to deploy. However, this is inefficient (and probably incurs technical debt) without a common framework.

Agents are that framework. They offer a multitude of options to package AI workflows into containers or deployment units. Instead of containerizing an AI workflow on your own, an agent framework provides an out-of-the-box capability. For example, agents can be packaged as microservices, containers, or other modular deployment units.

Next, this common packaging approach also makes it easier for agents to interact. For example, APIs can be added to enable consistent and well-defined communication approaches for agent-to-agent or agent-to-ecosystem interactions using OpenAPI/Swagger specifications. Once again, this can be done manually, but why bother when an agent framework does this for you?

Agents, once again using this common packaging approach, allow us to bundle key enterprise-grade capabilities such as security, observability, and operability. This approach aligns with common enterprise software practices, making it easier for organizations to integrate agents into larger microservice architectures. In essence, each agent can become another node in the enterprise’s IT ecosystem, exchanging data through APIs and standard messaging protocols. Simply put, agents offer the simplest path to delivering enterprise-grade capabilities.

At some point, scaling becomes an issue. Using microservice-friendly packaging for an agent means that businesses can spin up multiple agents, each dedicated to a distinct task. Multiple instances of an agent can run concurrently in separate containers, scaling up or down independently based on demand.

One last point, and this is quite important. In the years ahead, we strongly believe that the proliferation of multiple specialized agents will lay the groundwork for a much larger interconnected AI ecosystem. It is the combination of the preceding items that lead to easier implementation, simplified interactions, and integration into the broader enterprise environment that allow agents to support this growing agent ecosystem we call agentic mesh.


## Summary

This chapter has shown that AI workflows and agents are related but distinct approaches to orchestrating intelligence. Workflows offer reliability and transparency by guiding tasks through predefined steps, while agents bring adaptability and autonomy, are able to adjust to new conditions, and learn from context. Neither fully replaces the other—instead, workflows provide structure where predictability is critical, and agents extend that structure with reasoning and flexibility. Together, they form the foundation of the emerging AI ecosystem.

In Chapter 4Chapter 4, we turn from comparing workflows and agents to understanding agents more deeply on their own terms. We will explore what makes an agent different from a workflow: its autonomy, ability to plan, use of tools, collaboration with other agents, and capacity to learn. By grounding agents in analogies to people—conversations, teams, organizations, and ecosystems—we will see how agents operate not as static workflows but as dynamic, adaptive participants in a broader mesh of intelligence.
