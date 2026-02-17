# 1. Understanding Agentic Mesh: The Essentials


## Chapter 1. Understanding Agentic Mesh: The Essentials

In the few months before starting this book there were announcements highlighting tens of billions of dollars of investment in intelligent agents, spanning infrastructure to support agents, toolkits to build agents, LLMs to power agents, training to educate developers and people about agents, and of course an enormous number of YouTube videos touting agent benefits.

However, agents in one form or another have been around for a while. In fact, if we look far enough back, we can probably trace the earliest agent concepts to Alan Turing, who introduced machine intelligence and theTuring testTuring test to assess a machine’s ability to show human-like intelligence. This foundational work planted the seeds for what we now call intelligent agents.

Fast-forward a few decades, and various incarnations of very primitive agents started to emerge. In the 1980s, the first expert systems that mimicked human decision making became available. After that came virtual assistants like Apple’s Siri and others that have steadily evolved. But it wasn’t until 2017 that the field truly transformed when Google researchers published the landmark paper“Attention Is All You Need”

“Attention Is All You Need” introducing the transformer architecture that revolutionized AI. This breakthrough laid the foundation for today’s advanced LLMs, enabling agents to process, generate, and interact in a human-like way.

However, today’s AI agents represent a qualitative breakthrough rather than just an incremental improvement. Unlike their predecessors, LLM-powered agents can engage in flexible reasoning, understand context across conversations, generate creative solutions, and adapt to novel situations without preprogrammed responses.

We began conceiving the concepts and architecture described in this book shortly before the rise of LLM-based agents. Our work has built on earlier ecosystems, such as service meshes for APIs and data meshes for data products. This book extends that lineage to agents in what we call an agentic mesh. An ecosystem, at its simplest, is a set of interconnected parts that depend on each other. In technology, ecosystems emerge when components—whether services, data, or agents—are designed to collaborate.

Nevertheless, the term “agent” means different things to different people, so we offer the following definitions up front to frame our thinking:

AgenticAble to make independent decisions typically toward fulfilling a goalAgentic AIUses sophisticated reasoning and iterative planning using LLMs to autonomously solve complex multistep problemsAgentsUse agentic AI to independently plan and execute tasksCombining these terms, we get a simple definition of an agent:

An agent is a program powered by LLMs that can independently make decisions, plan iteratively, and execute tasks to achieve complex goals.

And when we think of a “mesh” of agents—an “agentic mesh”—this is what we mean:

An agentic mesh is an interconnected ecosystem that makes it easy for agents to find each other, collaborate, interact, and transact.

In an agentic mesh, agents are the core participants, designed with governance, interoperability, and trust so they can collaborate, interact, and even transact in a broader ecosystem of agents. The key distinction, however, lies between the needs of an individual agent and those of the larger ecosystem. Ecosystems exist to enable collaboration at scale, raising questions of how thousands of agents, each operating independently, can plan, execute, and deliver consistent outcomes. These are the challenges that agentic mesh is designed to address.

That being said, let’s look how we got here.


## The Introduction of LLMs

In 2023, OpenAI released the GPT-3.5 LLM, which—arguably for the first time—allowed AI to converse in a fashion that felt relatively human. Of course, things accelerated from there. LLM capabilities grew rapidly, and their cost decreased even faster. Many initially small industry giants such as OpenAIOpenAI, AnthropicAnthropic, and others, as well as technology mainstays like Google and Microsoft, have launched services like ChatGPT and Claude, which have enjoyed unprecedented growth and acceptance.

This rapid evolution has changed the way individuals and businesses interact with AI. Tools that once required significant technical expertise are today accessible to the general public, letting millions of people incorporate advanced AI capabilities into their personal and professional lives. Through the ability to generate text, analyze data, or provide customer support, LLMs have brought human-like intelligence to everyday applications.

But what do we mean? “Human-like intelligence” in the context of LLMs refers to their ability to understand language, reason about context, and generate responses in ways that resemble how people think and communicate. For example, when a customer asks an airline chatbot, “My flight is delayed and I’ll miss my connection, what should I do?” the system doesn’t just match keywords—it interprets intent, weighs the situation, and responds with a solution such as rebooking options or directions to the nearest service desk. That mix of comprehension, contextual reasoning, and adaptive problem-solving mirrors how a human agent would handle the same request, which is why we describe it as human-like.

As a result of these incredible advancements, many predict that incredible productivity improvements and growth opportunities will follow. Lila Ibrahim, COO of Google DeepMind, writesLila Ibrahim, COO of Google DeepMind, writes: “There is huge potential for AI to transform our world for the better. From enabling early disease detection and accelerating drug discovery, to addressing critical environmental challenges by discovering sustainable new materials, AI is already advancing progress on some of society’s toughest problems.”

Ibrahim highlights the tangible impact AI is already having on healthcare, scientific research, and environmental sustainability. But AI’s impact spans all industries. The Organization for Economic Cooperation and Development (OECD) saysOrganization for Economic Cooperation and Development (OECD) says that “AI is already transforming critical business functions across sectors, such as content recommendation, online sales and customer services…Its capacity to analyse data, automate processes and enhance decision-making promises economic growth and societal advancement.”

Building upon this, McKinsey, a consulting firm, statesMcKinsey, a consulting firm, states that “generative AI is poised to unleash the next wave of productivity…Generative AI’s impact on productivity could add trillions of dollars in value to the global economy.” McKinsey’s latest research estimates that GenAI “could add the equivalent of $2.6 trillion to $4.4 trillion annually.” And McKinsey goes on to say that “generative AI will have a significant impact across all industry sectors. Banking, high tech, and life sciences are among the industries that could see the biggest impact as a percentage of their revenues from generative AI…Across the banking industry, for example, the technology could deliver value equal to an additional $200 billion to $340 billion annually if the use cases were fully implemented. In retail and consumer packaged goods, the potential impact is also significant at $400 billion to $660 billion a year.”

Not surprisingly, people are taking notice. Investments in AI-related infrastructure (for example, data centers, foundational models) are growing fast. JPMorgan estimatesJPMorgan estimates “there is currently more than 3,800 MW of capacity being built in the U.S., up about 70% from the prior year and another 7,000 MW in various stages of pre-construction.” In another article, Reuters statesReuters states, “Investments in data centers, which help provide computing power for AI, have surged since OpenAI launched ChatGPT in 2022, as companies across sectors increasingly shift their operations to the cloud and integrate AI into their offerings.”

This wave of infrastructure growth suggests that there is a much broader opportunity to integrate AI into just about any business process. Organizations are increasingly moving their workloads to the cloud and leveraging AI-powered solutions to streamline processes, optimize resources, and deliver better customer experiences. If anything, the scale of these investments demonstrates that businesses understand the profound implications of AI and are taking steps to ensure they can capitalize on its potential.

The power of AI is reshaping our world at unprecedented speed. ChatGPT reached 800 million weekly active users in just 17 months, making it the fastest-growing product in history and demonstrating adoption rates that dwarf even the most successful internet-era launches. Meanwhile, global investment has reached extraordinary levels: the six largest US tech companies increased their AI-related CapEx by 63% year over year to $212 billion in 2024, while AI job postings have surged 448% since 2018.

Yet for all these remarkable advancements in AI and LLMs, we are witnessing only the beginning of a much larger transformation. Unlike previous technology waves that took decades to mature, AI development is compounding at rates we’ve never seen, with model performance improving. At the same time, inference costs have plummeted 99.7% in just two years. As this technology continues to evolve at breakneck speed, the world is entering an era where AI doesn’t just assist in completing tasks—it autonomously takes on responsibilities, solves problems, and creates opportunities that are fundamentally redefining how work gets done.


## The Agent Era

We foresee the evolution of AI moving from reactive tools to proactive, autonomous agents—entities that not only respond to prompts but also independently plan, execute multistep workflows, and make decisions within defined parameters. Early examples are already emerging: AI agents that can book meetings across multiple calendars, conduct research by browsing hundreds of websites, or manage customer service interactions from initial contact through resolution. This represents a fundamental shift from AI that answers questions to AI that accomplishes goals.

These agents, powered by the same LLM advancements and fueled by unprecedented investments in AI infrastructure, will make the business benefits we’ve discussed not only possible but commonplace. They will blur the lines between automation and independent action, leading to a future where machines collaborate with people to unlock untapped potential.

We will define and explore what we mean by agents shortly, but for now let’s look at the impact they are expected to have. Marc Benioff, CEO of Salesforce, a large technology firm, saysMarc Benioff, CEO of Salesforce, a large technology firm, says, “We are now entering a new era of autonomous AI agents that take action on their own and augment the work of humans. This isn’t just an evolution of technology. It’s a revolution that will fundamentally redefine how humans work, live, and connect with one another from this point forward.”

Not only is productivity expected to improve, but the way we work is also expected to radically change. Benioff goes on to point out that “today, we’re already used to ‘predictive AI’—which analyzes data to provide recommendations, forecasts and insights—and ‘generative AI,’ which learns from data and uses patterns to seamlessly generate text, images, music and code. Agents are software components that go far beyond this. They can perform tasks independently, make decisions, and even negotiate with other agents on our behalf.”

Perhaps for the first time in history, roles have reversed: up to now, humans directed technology. We—people—held the steering wheel and made technology go in the direction we wanted. Now, agents may be the technology that decides which direction to go (hopefully within guardrails, but more on that later in the book). Benioff continues: “technology isn’t just offering tools for humans to do work. It’s providing intelligent, scalable digital labor that performs tasks autonomously. Instead of waiting for human input, agents can analyze information, make decisions, and take action independently, adapting and learning as they go.”

The World Economic Forum, an economic think tank, also foreseesWorld Economic Forum, an economic think tank, also foresees agents driving major economic change: “AI agents are becoming more advanced, with significant implications for decision-making, accountability and oversight.” As a result, “the benefits of AI agents include productivity gains, specialized support and improved efficiency in sectors such as healthcare, customer service and education.”

One thing seems absolutely clear: agents are coming. Soon. And they are coming at scale.


## Defining Agents

But what is an agent? Let’s take a look at a few definitions that are offered by leading firms and thought leaders:

“An AI agent refers to a system or program that can autonomously complete tasks on behalf of users or another system by designing its own workflow and by using available tools.” Source: IBMIBM“AI agents are a type of artificial intelligence (AI) system that can understand and respond to customer inquiries without human intervention.” Source: SalesforceSalesforce“An AI agent is a system that uses an LLM to decide the control flow of an application.” Source: LangChainLangChain“AI agents are reasoning engines that can understand context, plan workflows, connect to external tools and data, and execute actions to achieve a defined goal.” Source: DeloitteDeloitteUnfortunately, we think a lot of these definitions are veering toward “agent-washing.” This term describes the growing trend of vendors labeling old tools—chatbots, macros, robotic process automation (RPA) scripts—as “agents” despite lacking true autonomy. While real agents can think, plan, act, and adapt dynamically, many so-called “agentic” solutions are simply AI assistants with a new coat of paint. Gartner and others warn that only a fraction of today’s offerings meet the real definition: systems where LLMs direct their own processes, make decisions, and collaborate independently. Unlike reactive tools, true agents resemble people in their ability to hold context, manage priorities, and work within teams or ecosystems.

This distinction has serious architectural implications—all of which we will discuss in great detail in the following chapters. Real agents are headless, distributed, event-driven, and secure—requiring containerization, orchestration, observability, and zero-trust identity frameworks. We will propose an architecture model for agents that combines microservices with reasoning engines that enable scalable, secure, and goal-driven behavior. Enterprises must demand transparency and avoid falling for hype. Without discipline, businesses risk investing in rebranded tools that cannot deliver autonomy or ROI. If agents are to fulfill their promise, we must move past inflated labels and embrace architectures that actually work.

As you can see, there are a few common threads—let’s bind these together with a few of our thoughts to offer a holistic definition of agents:

Agents are powered by LLMs that underlie their ability to plan and execute tasks.

Agents have a consistent set of characteristics that define their purpose, behavior, scope, and accountability.

Agents have autonomy to act independently within the bounds of their purpose and the constraints set by their owner.

Agents can use tools and collaborate with other agents to accomplish their tasks.

On a practical note, and to differentiate from past usage of the term agent (and perhaps it goes without saying), when we talk about agents, it should be clear that we mean AI-enabled agents.


## Agents Today

So are agents being built today? Only primitive agents are currently in use, with most organizations using workflows instead. These workflows, as shown in Figure 1-1Figure 1-1, rely on orchestrating LLMs and other tools in a methodical, predefined manner. When you have a workflow, a developer or engineer decides in advance which tools the system will use at each step, spelling out the sequence of actions.


*[Diagram comparing AI workflows, autonomous agents, and enterprise-grade agents, illustrating workflows with fixed paths, agents with dynamic task planning, and enterprise agents with support services.]*


###### Figure 1-1. AI workflows versus autonomous agents versus enterprise-grade agents

Anthropic, an AI/LLM vendor, definesAnthropic, an AI/LLM vendor, defines workflow as “systems where LLMs and tools are orchestrated through predefined code paths.” An AI workflow is a structured, step-by-step process that integrates various tools, models, and algorithms to perform a task or set of tasks. Unlike agents, which are designed to act with a degree of autonomy and adaptiveness, workflows rely on predefined instructions and fixed decision points laid out by developers.


###### TIP

A simple way to visualize an AI workflow is as an automobile assembly line: each step is carefully designed to move the task forward in a specific way, on a fixed path, with little room for deviation or self-guided decision making.

Even so, AI workflows have become quite powerful. Anthropic definesAnthropic defines several common workflow patterns:

Prompt chainingbreaks tasks into sequential steps, with each step processing the output of the previous one, such as generating ad copy, translating it, and verifying its accuracy.

Routing workflowsclassify inputs and direct them to specialized processes, like sorting customer queries into refund requests, technical issues, or general questions.

Parallelization workflowsdivide tasks into independent subtasks, enabling simultaneous processing, such as analyzing document sections or aggregating outputs from multiple runs.

Evaluator-optimizer workflowsiteratively refine outputs, with one LLM generating content and another providing feedback, akin to a human editing process.

But why highlight workflows? Because they are incredibly powerful, and your agents will probably use workflows. But workflows are different from agents. Today’s workflows are the ancestors of agents.

Agents, unlike workflows, dynamically create their own plan to fulfill a task—they select their tools, pick execution paths, and control how they accomplish tasks. Unlike workflows, an agent has a built-in capacity to figure out how best to accomplish a task without predefined static implementation. That means the agent can decide on the fly when to perform a calculation, consult a database, or otherwise adapt its plan.

Rather than follow a fixed sequence of steps, agents analyze tasks in real time, generate their own plans, and select the most suitable tools and execution paths to achieve their objectives. This flexibility enables agents to adapt to novel or unexpected situations, making them particularly suited for complex, open-ended problems. For instance, an agent tasked with gathering information about market trends might dynamically decide to consult specific databases, analyze recent news articles, and cross-reference social media sentiment or collaborate with other agents, tailoring its approach as new information becomes available.

While true agent autonomy is still in its early stages, today’s developers are actively combining workflow predictability with agent-like flexibility. These “primitive agents” often operate within well-defined boundaries, using workflows as a foundation while introducing elements of decision making and adaptation. We believe these early implementations are laying the groundwork for more sophisticated agents, demonstrating the practical value of combining static workflows with dynamic capabilities.


## Enterprise-Grade Agents

So while agents are being built today, there are a few lingering questions. Are they ready to fit into an organization’s technology environment? Are they production worthy? Are they enterprise grade?

As agent autonomy and sophistication grow, we believe that agents need to become enterprise grade. They must integrate easily into an enterprise’s technology and application landscape. They must adhere to enterprise processes—DevSecOps and MLOps, for example—that provide the rigor needed to move mission-critical applications, and soon agents, into production. They must adhere to the expectations of all enterprise applications to become discoverable, observable, operable, secure, and trustworthy.

Think about this: if the agents we build are not ready for production, if they do not have the capabilities that are common within most enterprises, if they don’t follow enterprise processes, they will never get into production. And if they can’t get into production, then they can’t deliver value. We believe this is not only a big issue but an almost existential challenge that must be addressed for agents to evolve.

In a world where we know that agents are coming, we need enterprise-grade agents. Today, enterprises typically cobble together solutions in a custom, bespoke fashion to get agents into production. This is clearly unsustainable, leading to one-off solutions and, inevitably, to a mountain of technical debt.

So, perhaps obviously, we will have a lot to say about this. An enterprise-grade agent architecture (see Figure 1-2Figure 1-2) includes several key components:

EndpointsAccess to an agent is done via well-understood capabilities commonly used in microservices (for example, REST).

Core capabilitiesAgents are discoverable, observable, operable, and trustworthy. This makes agents easy to find, monitor, operate, and trust.

SecurityCommon enterprise capabilities are embedded into, or used by, every microagent: mutual TLS, OAuth2 for role-based access control, and integration with identity books of record.

CollaborationAgents can collaborate with people or other agents. Agents can identify collaborating agents that address needed capabilities, can communicate using natural language, can manage state in long-running requests, and can interact with people or other agents when needed to get additional information.

Task management/intelligenceAgents can dynamically plan and execute a task. They are able to use various capabilities—intelligence via LLMs—to solve problems, learn, use past conversations, and use tools.


*[Diagram illustrating the architecture of enterprise-grade agents, highlighting key components such as foundational capabilities, security, collaboration, task management, and intelligence.]*


###### Figure 1-2. Enterprise-grade agents


## Agentic Mesh: The Agent Ecosystem

We believe that these enterprise-grade needs will be addressed, and soon agents will proliferate. However, we believe agents will not operate in isolation but will form interconnected ecosystems within enterprises and potentially across industries and domains. This interconnected ecosystem, as shown in Figure 1-3Figure 1-3, is what we call the agentic mesh. The objective and design objective for agentic mesh is simple: make it easy for agents to find each other and safely collaborate, interact, and transact.


*[Diagram illustrating the agentic mesh, showing interconnected micro-agents and components like marketplace, registry, monitor, and interactions, representing a collaborative ecosystem for agents.]*


###### Figure 1-3. Agentic mesh, an ecosystem of agents

Agents—at least future incarnations of them—will act in ways analogous to how people act, even though agents are implemented in software and interact using networks and APIs.

Like people, no agent stands alone but instead thrives in a community. People have policies and rules that govern their behavior, and so do agents. Like people, no one single agent is in a position to address the biggest challenges, and like people, agents will work in teams to solve bigger and more complex problems. People organize into multilayered groups called governments to create frameworks for laws, policies, and regulations, and soon agents will evolve similar governance structures. People organize into ecosystems we call businesses to provide services that no individual person can deliver on their own, and soon so will agents.

Agentic mesh—the agent ecosystem—provides the services that let agents collaborate. It provides the trust framework to make them governable as well as the security umbrella to make them safe. It provides the foundation (for example, microservices) that lets them run efficiently and effectively, and in an enterprise-grade manner.

As you might guess from the title, agentic mesh—this enterprise-grade agent ecosystem—is a core focus of this book. It is made up of six components:

MarketplaceA marketplace lets people discover and engage with agents. Through the marketplace, users can find agents that match their specific needs and, once found, can initiate interactions with an agent.

Interaction managerThis manages agent conversation and history and provides ways for people to engage agents to fulfill tasks. It also allows people to maintain oversight of agents’ actions, understand task status, and ensure that tasks are executed in line with expectations and policies.

RegistryAn agent registry acts as the repository for agent metadata. This includes essential details such as the agent’s purpose, owner information, policies, security roles, capabilities, endpoint descriptions, and lifecycle states. By maintaining this metadata, the registry lets agents, through simple query mechanisms, find each other, identify collaborators, and thereby provide a structured and secure environment for agent operation.

MonitorAn agent monitor maintains agent operational metrics (number of requests, latency, and so on) and offers access to agent-to-agent and person-to-agent conversational details, historical plans used by agents to fulfill tasks, and other statistics. The agent monitor also provides an interface that makes this information securely available to ecosystem participants.

Trust frameworkAgentic mesh also offers a trust framework that certifies agent behavior. As mentioned earlier, each agent has a description and purpose that provides the guardrails and constraints for its behavior. Each agent also maintains a set of policies that codify its expected goals and motivations as well as an attestation capability that determines the adherence of an agent to its policies. The trust framework offers a formal certification like standards organizations do today (for example, Underwriters Laboratories in the US, and the Canadian Standards Association for manufactured products) that confirms an agent is meeting expectations.

Patterns and protocolsAgentic mesh also offers a set of patterns and protocols that allow agents to find each other and safely collaborate, interact, and transact. It defines the access methods, parameters, and message structure to make each agent discoverable, observable, and operable in the agent ecosystem.


## The Agent Challenge

As with any transformative technology, we would be remiss in not highlighting that the rise of autonomous agents is not without its challenges. These challenges are as profound as and maybe even larger than the opportunities agents present, touching on critical aspects of our economies, societies, and even our ethical frameworks. In an International Monetary Fund (IMF) blog, Kristalina Georgieva cautionsKristalina Georgieva cautions that “AI will affect almost 40 percent of jobs around the world, replacing some and complementing others…We are on the brink of a technological revolution that could jumpstart productivity, boost global growth and raise incomes around the world. Yet it could also replace jobs and deepen inequality.”

This stark projection underlines a very valid concern: while agents have the potential to drive unprecedented productivity and growth, they also pose risks to employment and economic equality. The impact will not be uniform: industries, regions, and demographic groups may experience vastly different outcomes, with some reaping the benefits and others bearing the costs.

But the broader implications go beyond jobs and productivity; agents challenge traditional concepts of accountability and oversight. When agents act independently, making decisions and learning as they go, is it fair to ask who is ultimately responsible for their actions? This extends to legal, ethical, and operational considerations. How do we ensure agents act within their intended bounds? What happens when they fail or cause harm? Balancing innovation with safeguards will require unprecedented collaboration between policymakers, industry leaders, and technologists.

Ethical considerations are just as important. As agents take on roles that involve decision making, their actions may reflect the biases and limitations of the data and algorithms they are built on—in effect, they may propagate our biases and misunderstandings. Without careful attention, this could lead to unintended consequences, including reinforcing harmful stereotypes or making decisions that are misaligned with human values. Explicitly building transparency, fairness, and accountability into agents from the ground up is essential.

These challenges are further complicated by the speed at which agent technology is evolving. Agents are built upon LLM technology whose capabilities are increasing exponentially and whose costs are decreasing just as fast. Whether we like it or not, agents are coming. Unfortunately, governments, institutions, and businesses are likely to play catch-up, struggling to craft policies and strategies that can keep pace with the rate of innovation.

Yet, despite these challenges, it’s clear that something must be done. The promise of agents is too great to ignore, and their integration into society is already underway. If we approach this new era with thoughtfulness, humility, and a willingness to adapt, we may just be able to harness the power of agents while mitigating their risks. If anything, we must get this right, or these challenges may overwhelm us.


## The Agent Opportunity

There appears to be a clear impetus as businesses today are examining how to incorporate AI into their processes and even into interactions with their customers. And with respect to agents, despite their relative newness, businesses are now identifying how and where they fit in. These are senior-level strategic discussions, yes, but organizations globally are today investing in proofs of concept and implementing agents, and they are at the early stage of production deployment. Understanding agents and the agent ecosystem they run in will soon be a core competency of the modern business executive.

For architects, agents are a new component in the enterprise landscape. Today’s agents and their supporting toolkits create agents with a somewhat monolithic design, using shared memory, with almost all components existing in a small number of Python source code files. Simply put, this monolithic approach does not lend itself to easily creating production-worthy agents. (That is, they are enterprise-grade agents, which we will describe in detail in subsequent chapters, but for now, this term means that the agents meet expectations similar to other enterprise applications.) It is up to the architect to lay out the agent technology landscape, identify core components and integrations, and determine the characteristics required to become enterprise grade. This book describes an agent architecture, how agents need to be connected and integrated, and how agents can be made enterprise grade.

For developers, agent toolkits are emerging that are truly innovative. But today, building agents requires in-depth knowledge of LLMs, prompt engineering, and coding expertise (sometimes in multiple programming languages). And debugging agents, even relatively simple ones, is challenging (and this is charitable). In this book, we identify the key components that need to be built to make it easy for agents to be built.

As we said earlier, agents must be enterprise grade. Agents must behave like any other production systems: they must be discoverable, observable, and operable so they can be managed just like any other product system. And agents must have operational processes that make them also easy to operate, easy to debug, and easy to diagnose and resolve problems. We offer options—for example, building and running agents as microservices—that allow developers, engineers, and operations staff to leverage decades of experience in building production-worthy applications.

For engineers, we address these operational challenges. We explain how agents fit into DevSecOpsDevSecOps enterprise processes as well as newer MLOpsMLOps processes. We explain the guardrails that need to be put into place such that agents are secure, so that the data they use and their interactions with customers respect regulatory, legal, and privacy needs as well as enterprise standards and expectations. But even beyond security, if the agent promise evolves to even a fraction of what optimists believe are their potential, then agents must be trusted. We explain the principles behind a trust framework that makes agents not just secure but trusted to respect ethical guidelines, trusted to be transparent, and trusted to plainly do what they are supposed to.

All modern AI solutions use an LLM as their brain but do not have native capabilities that make them secure. LLMs may not respect an organization’s policies, especially if they have not been explicitly trained on them. But even LLMs that have been fine-tuned on corporate knowledge may not understand how to stop sensitive information from being leaked unintentionally. And LLMs that use vector databases for retrieval-augmented generation (RAG)retrieval-augmented generation (RAG) solutions create embeddings that are linked to data that has migrated from secure databases while losing security policies and rules that dictated access rights and privacy. So security professionals recognize that agents today are not easily secured, and they offer options that make them safer.


## Summary

By proposing an architecture, design, and implementation approach for agents and for the agentic mesh ecosystem they run in, we hope that organizations can overcome the challenges in current approaches and toolkits and realize the benefits of agentic mesh. We trust this book lets you—the practitioner, developer, manager, or executive—build agents that deliver value. And we think it will give you the insight to create enterprise-grade agents that are production worthy (and, of course, deliver value) just like any other important enterprise system. At the end of the day, we hope you agree that the agentic mesh fulfills its primary purpose and objective: to establish an agent ecosystem that makes it easy for agents to find each other and safely collaborate, interact, and transact.

Our hope is that by following these practical steps, organizations can transform their approach to agents, accelerate their agent journey, and realize the enormous opportunity presented by agents.
