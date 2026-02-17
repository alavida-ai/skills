# Foreword


## Foreword

We find ourselves at an unusual moment in the evolution of artificial intelligence. The excitement is real, the investments are enormous, and the technical breakthroughs are astonishing. Yet inside most companies, the story is quieter and more complicated. Many AI initiatives remain stuck in what people jokingly call “proof-of-concept (or POC) purgatory.” These initiatives look impressive in a demo, maybe even inspiring, but they rarely make it into the production systems that run the business. Teams are experimenting, executives are searching for return on investment, and somewhere between those two realities the work tends to stall.

This book arrives at exactly the right time. It shines a light on the gap between early promise and operational reality. And it answers a question that almost every enterprise is wrestling with: “What does it actually take to run agents in the real world at scale?”

I first crossed paths with Eric through an article he wrote comparing several agentic frameworks. The industry had been drowning in surface-level feature lists, but his work was different. He approached the problem like a scientist. Instead of asking what features a framework offered, he asked whether it could be trusted to operate inside an enterprise. He evaluated reliability, traceability, observability, and explainability. He proposed a grading system that held each framework to the standards that real production environments demand. I contacted him as soon as I finished reading it. That conversation eventually became a collaboration on the idea of the enterprise agent ecosystem, some of which forms the backbone of this book.

My own perspective comes from a career spent trying to bridge the distance between intelligent systems and the infrastructure they depend on. I began in research during my PhD and postdoc years. After that, I founded a company, then moved to Google to work on conversational systems, and today I lead AI efforts at Confluent. Across all of these environments, I have spoken with hundreds of teams trying to get value out of AI. The same theme appears again and again: isolation is the enemy of scale. A clever model or a clever agent is not enough. The real challenge is everything around it.

There are many books that teach you how to build an individual agent. How to write a prompt. How to attach a tool. How to get the model to plan and reason. This book is about what happens next.

Once you build one agent, you will inevitably build many. And once you have many, the work stops being about the intelligence of a single component and starts being about the ecosystem that surrounds it. If the industry forecasts are even directionally correct, future enterprises will operate thousands or even millions of these agents. The question is no longer whether we can build an agent. It is how we manage a population of them.

To answer that, this book reframes whether to consider deployable agents at all.

Early prototypes were often fragile, opaque experiments. They worked until they did not. When they failed, no one could explain why. When they succeeded, no one could guarantee the result would repeat. Moving from experiments to production requires something sturdier. The authors argue that an enterprise-grade agent must be discoverable, because in a large ecosystem, the right component must be easy to find. It must be observable and traceable, because operators need to see the chain of reasoning and the steps an agent took. It must be reliable and explainable, because unpredictable behavior undermines trust and makes real deployment impossible.

This leads naturally to the microagent model described in the book. Instead of treating an agent as a monolithic script wrapped around a large language model (LLM), the authors treat it as a microservice. It has a container. It has interfaces. It has a set of operational guarantees. This shift allows agents to inherit decades of engineering wisdom: clean deployment pipelines, isolation, fault tolerance, reproducibility, and the security patterns that enterprises already expect.

But the authors don’t stop there, and this is where the book truly stands apart. Individual competence is necessary but not sufficient. Once agents must work together, the system begins to resemble a distributed organization. Communication patterns matter. Coordination matters. Discovery matters. Governance matters. Without structure, the ecosystem collapses under its own complexity.

This is where the concept of the agentic mesh becomes essential.

The book describes an ecosystem where agents can find one another, exchange context, coordinate long-running tasks, and act with accountability. And the authors explain why this mesh must be event-driven. Traditional request-response APIs assume that both sides are ready at the same moment, but agents do not behave this way. They start, pause, wait for input, delegate work to other agents, and resume hours later. Their conversations are not synchronous calls. They are living, ongoing interactions. The authors argue that event-driven communication is the only pattern capable of supporting this behavior at scale. Events allow decoupling. They allow resilience. They allow many agents to observe the same state change and react independently. In other words, events allow an ecosystem to emerge rather than a brittle network of point-to-point calls.

For someone who has spent years working in data streaming and real-time architectures, this argument resonated immediately. If agents are to become the nervous system of the enterprise, then a streaming substrate is the circulatory system that keeps them informed and connected. The book shows in clear detail how streaming patterns align with the shape of agent interactions and why they are foundational for large-scale coordination.

There is one more dimension the authors explore that is perhaps the most important of all: trust. It is easy to talk about trust in abstract, emotional terms, but in practice, trust is a set of engineering requirements. The book introduces a layered model that treats trust as something that spans the entire system. At the bottom are identity, authentication, and authorization. Above that are policy, certification, and governance. Each layer is concrete. Each layer sets boundaries. Each layer creates accountability. This structure ensures that an agent is not only secure in how it connects but is also certified to behave in alignment with organizational rules and expectations.

This book provides a blueprint for the next phase of AI. It moves the conversation from the intelligence of the model to the architecture that allows intelligence to function at scale. It acknowledges that the future will not be shaped by isolated experiments but by interconnected systems that behave predictably even as they act autonomously. And it offers the vocabulary and the structure needed for enterprises to move from prototypes to production.

In a moment when the industry is searching for clarity, Agentic Mesh offers something rare: a grounded path forward.

Sean FalconerHead of AI, Confluent
