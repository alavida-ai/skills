# Preface


## Preface

We began conceiving the concepts and architecture described in this book a long time ago—well before the current incarnation of large language model–based agents appeared. In fact, we have been building ecosystems like those described in this book for APIs, whose ecosystem we call a service mesh, for data and data products in a data mesh ecosystem. In this book, we are covering how to do it for agents in an agent ecosystem, which we callagentic mesh.

But first, what is an ecosystem? We use a pretty simple definition: anecosystem is a set of interconnected parts that interact and depend upon each other. In technology, ecosystems emerge when different components—such as services, data, or agents—are designed to work together. The ecosystem provides services that make it easy and safe for participants in the ecosystem to find each other and safely collaborate, interact, and even transact. In a service mesh, APIs are the ecosystem’s participants, enabling services to discover, communicate, and collaborate reliably. In a data mesh, data products play this role, serving as standardized, trustworthy units of data that can be shared and reused across teams.

In an agent ecosystem—agentic mesh—the agents themselves are the core participants, designed with governance, interoperability, and trust so they can work together as dynamic, scalable building blocks of enterprise intelligence. And an agentic mesh makes it easy for agents to find each other and safely collaborate, interact, and yes, even transact.

Of particular note, however, is that the concerns of an individual agent are quite different from the concerns of an agent ecosystem. In fact, the very definition of an ecosystem—where many participants collaborate—leads immediately to a need to address scale. How can thousands of agents—each individually an independent entity—plan work, execute work, and deliver consistent outcomes at scale?

These are agent ecosystem concerns, and that is what agentic mesh—and hence, this book—is about. Now, it is important to note that although we emphasize addressing issues of scale, every firm starts somewhere different, and your first agent ecosystem may start with a very small number of agents. But as they say, begin with the end in mind, and so we offer this book as guidance to plan ahead and design your agent ecosystem for growth and scale.


## What This Book Isn’t

There are plenty of great books out there about how to build individual agents. This is not one of them. There are also many books that explain the intricacies of prompt or context engineering to make agents work their magic. Our book is, again, not one of them.

So while we do have opinions about what an agent is, the broader thesis of our book is about agent ecosystems and how individual agents, or fleets of agents, participate in the ecosystem. When we discuss agents, it is with the express intent to discuss the key characteristics and design constraints that are required for them to work at scale and that let agents find each other and safely collaborate. Simply put, we try to describe an architecture and design for large agent ecosystems and then describe how agents become good participants in that ecosystem.


## What This Book Is About

Today, there are few agent ecosystems that have thousands of collaborating agents. Nevertheless, industry leaders foresee a future where millions, and even billions, of agents collaborate. In 2025, Andy Jassy (CEO, Amazon) statedAndy Jassy (CEO, Amazon) stated that “there will be billions of these agents, across every company and in every imaginable field.” Jensen Huang (CEO, NVIDIA) saysJensen Huang (CEO, NVIDIA) says he expects enterprises will have “a couple of hundred million digital agents, intelligent agents.” And Satya Nadella (CEO, Microsoft) thinksSatya Nadella (CEO, Microsoft) thinks that “agents will replace all software.”

Think about it: even if these industry leaders are way off—suppose agent deployments turn out to be 1/1000th of their estimates—there will soon be thousands, if not millions, of agents in a typical firm.

Still, far too often, enterprises become preoccupied with the mechanics of building individual agents, treating them as standalone tools or experiments rather than recognizing the bigger challenge at hand. Although building an agent is not trivial, it is increasingly accessible thanks to frameworks, models, and open source tooling. The real frontier lies in creating the ecosystems where those agents can coexist, coordinate, and scale.

This shift in perspective reframes the central questions for enterprises. How can we design ecosystems that reliably support thousands—or even millions—of agents, each with unique roles, lifecycles, and governance requirements? And how can we build agents that are trustworthy enough to participate in such complex environments, where security, compliance, and resilience are nonnegotiable? These questions elevate the conversation from isolated prototypes to enterprise-grade systems, moving the focus from short-term experiments to long-term, scalable operating models.

Few firms, other than perhaps the tech giants, are adept at managing thousands of anything, let alone agents. But we believe in the vision offered by Jassy, Huang, and Nadella, and so our book is a response to this perhaps inevitable future.

So this book is about agent ecosystems and the expectations thrust upon agents that participate in a large agent ecosystem.


## Who Should Read This Book

The intended audience for a book on agentic mesh is a blend of business leaders and technical practitioners who are navigating the emerging world of enterprise-grade agents. For executives—CIOs, CTOs, COOs, and strategy leaders—this book explains how agents move beyond isolated pilots and become integral to organizational operations, with clear frameworks for trust, governance, and scale. For risk, compliance, and governance professionals, the book provides reassurance that agents can be deployed in a secure, certifiable way, aligned with ethical and regulatory requirements.

At the same time, the book speaks directly to engineers, architects, and developers who will design, build, and maintain agent ecosystems. It outlines the technical foundations—messaging, data, DevSecOps, factories—that make agent ecosystems sustainable, and provides patterns that transform experimental prototypes into resilient, production-grade systems. For these readers, agentic mesh is not just an abstract vision but a practical guide: how to standardize agent frameworks, manage fleets, integrate governance, and ensure interoperability. In this way, the book bridges the strategic and the technical, offering both types of audience a shared language and roadmap to bring agents out of the lab and into enterprise reality.


## Prerequisites

Before diving into the details of agentic mesh, readers will benefit from some familiarity with several foundational concepts. A basic understanding of artificial intelligence and machine learning—particularly how large language models (LLMs) function and how they are applied in enterprise contexts—provides useful grounding. Knowledge of modern software development practices, such as microservices, APIs, and containerization, is also valuable, since these technologies form the technical scaffolding on which agents are built and deployed. Similarly, familiarity with cloud computing, DevOps, and data management will help readers appreciate how agents are integrated into enterprise environments.

Perhaps equally important are perspectives beyond pure technology. Much of today’s literature also addresses the impact agents will have on jobs within an enterprise and the impacts to society at large. While we do not pretend to have a clear crystal ball on the future impacts of agents, we do expect that they will have a profound impact on how work gets done. Readers should bring a working knowledge of organizational change, governance, and operating models, since agent ecosystems will impact how people work, how responsibilities are assigned, and how risk is managed. Background in enterprise compliance—covering areas such as security, data privacy, and ethics—will help readers understand why trust frameworks and certification processes are central to agentic mesh. Although deep expertise in each of these areas is not required, readers should be comfortable with the idea that building an agentic mesh is as much about organizational readiness and governance as it is about algorithms and infrastructure. This mix of technical and organizational awareness sets the stage for appreciating agentic mesh in its full complexity.


## What You Will Learn

Readers of this book will learn how to design and govern large-scale agent ecosystems and their agents that are enterprise-ready:

FoundationsWhat agents are, why ecosystems matter, and how to ensure security, observability, and explainabilityTechnologyHow to build the mesh’s core plumbing—data, messaging, APIs, and models—with resilience, scalability, and zero-trust securityAgent and fleet factoriesHow to standardize templates, software development kits (SDKs), and connectors, and scale fleets with orchestration patterns and DevSecOpsOrganizationsHow roles, processes, and culture evolve to integrate agents as trusted team membersGovernanceHow to certify agents and fleets, manage systemic risks, and balance central rules with delegated ownershipStrategyHow to align the mesh with enterprise goals, deliver minimum viable products (MVPs), and build credible adoption roadmaps


## Navigating This Book

This book is organized into three parts that guide the reader from foundational concepts to practical implementation:Part I, “Defining the Essentials”

Part I, “Defining the Essentials”, introduces the essentials of agents and ecosystems, grounding readers in definitions, history, and a real-world case study.Part II, “Defining the Agent Ecosystem: Agentic Mesh”

Part II, “Defining the Agent Ecosystem: Agentic Mesh”, explores the architecture, governance, and trust frameworks that make agentic mesh enterprise grade.Part III, “Building Your Agentic Mesh”

Part III, “Building Your Agentic Mesh”, turns these ideas into action with operating models, factories, and a practical roadmap for building and scaling the mesh.


### Part I: Defining the Essentials

The chapters in Part IPart I lay the foundation by introducing readers to the core ideas of agentic mesh. Part IPart I begins with the essentials—what agentic mesh is, why it matters, and how it fits into the broader story of AI and automation. From there, the book situates agents within history, distinguishing their unique role from earlier AI approaches and showing how they connect to the evolution of workflows. These early chapters also explain what makes agents different from generic AI models, grounding the discussion in simple definitions, key concepts, and practical explanations that are accessible to a wide audience.

By the end of Part IPart I, readers will not only understand what agentic mesh is but also why it represents the next stage of enterprise AI—moving from isolated experiments to interconnected systems that mirror real organizational life.


### Part II: Defining the Agent Ecosystem: Agentic Mesh

The second part moves from foundational concepts to deep architecture and governance. It begins with agent design and enterprise-grade requirements, and then builds upward into the mesh itself as an ecosystem of agents. Readers will see how architecture, registries, interaction management, and user experience form the scaffolding of agentic mesh, ensuring that agents are discoverable, observable, and able to collaborate at scale. Alongside these technical elements, these middle chapters address the user experience dimension, explaining how both people and agents interact within the mesh in transparent and predictable ways.

This part also introduces the critical governance and trust frameworks that ensure enterprise adoption. Topics like security, compliance, and systemic oversight are not treated as afterthoughts but as integral parts of ecosystem design. You will learn how to balance autonomy with control—enabling agents to act independently while embedding policies that maintain enterprise trust and regulatory readiness. By the end of Part IIPart II, you will understand the full blueprint of agentic mesh—not just the pieces that make it run but the safeguards that make it safe to adopt in complex, real-world environments.


### Part III: Building Your Agentic Mesh

The final part turns theory into action, guiding readers through how to build and scale an agentic mesh inside an enterprise. It starts with the operating model and team structures, showing how roles like agent owner, fleet manager, and governance lead emerge to support hybrid human–agent organizations. From there, readers are introduced to the agent factory, a repeatable way to design, certify, and scale agents while embedding governance by default. This ensures that agents are not just experimental prototypes but production-ready services that align with enterprise standards.

The book concludes with a practical roadmap and schedule, providing actionable steps for adoption. This roadmap helps you assess where you are today, what short-term wins are achievable for your organization, and how to progress toward a mature agentic mesh over time. By the end of Part IIIPart III, you will be equipped with the strategies, tools, and organizational practices needed to make agentic mesh real—not just as an idea but as a working system inside your enterprise. This closing section ties the book together by turning vision into execution.


## Conventions Used in This Book

The following typographical conventions are used in this book:

ItalicIndicates new terms, URLs, email addresses, filenames, and file extensions.

Constant widthUsed for program listings, as well as within paragraphs to refer to program elements such as variable or function names, databases, data types, environment variables, statements, and keywords.


###### TIP

This element signifies a tip or suggestion.


###### NOTE

This element signifies a general note.


###### WARNING

This element indicates a warning or caution.


## O’Reilly Online Learning


###### NOTE

For more than 40 years, O’Reilly MediaO’Reilly Media has provided technology and business training, knowledge, and insight to help companies succeed.

Our unique network of experts and innovators share their knowledge and expertise through books, articles, and our online learning platform. O’Reilly’s online learning platform gives you on-demand access to live training courses, in-depth learning paths, interactive coding environments, and a vast collection of text and video from O’Reilly and 200+ other publishers. For more information, visit https://oreilly.comhttps://oreilly.com.


## How to Contact Us

Please address comments and questions concerning this book to the publisher:

O’Reilly Media, Inc.141 Stony Circle, Suite 195Santa Rosa, CA 95401800-889-8969 (in the United States or Canada)707-827-7019 (international or local)707-829-0104 (fax)support@oreilly.comsupport@oreilly.comhttps://oreilly.com/about/contact.htmlhttps://oreilly.com/about/contact.htmlWe have a web page for this book, where we list errata and any additional information. You can access this page at https://oreil.ly/agentic-meshhttps://oreil.ly/agentic-mesh.

For news and information about our books and courses, visit https://oreilly.comhttps://oreilly.com.

Find us on LinkedIn: https://linkedin.com/company/oreilly-mediahttps://linkedin.com/company/oreilly-media.

Watch us on YouTube: https://youtube.com/oreillymediahttps://youtube.com/oreillymedia.


## Acknowledgments

There are a lot of contributors to this book: some were business partners, some podcast cohosts, some hosted us on podcasts, some challenged us, some cheered us on, and others were clients—but all offered sound advice and wisdom that made this a better book. We say this truly: thank you!

First, we would like to thank the technical reviewers for this book. We recognize each of them as an expert in their own field, and they are quite busy, so we fully recognize the extra effort you made to provide feedback and suggestions—and even challenge us. We know this has led to the creation of a better book. In no particular order, we give a huge thank-you to:

Kerrie HolleyJohn MillerOle Olesen-BagneuxJean-George PerrinSimon TorranceAlso, a special thank-you goes to a few folks who truly shaped our thinking with direct feedback, software development, or content creation, and probably most importantly encouraged us to continue with our vision for agentic mesh:

Graeham Broda (a member of the Broda Group Software team)

Olivia Locksley (a member of the Broda Group Software team)

Andrew Higgins (a client and friend)

John Miller (a business partner, friend, and podcast cohost)

Here are the folks who had at least one of us on their podcast, hosted a speaking engagement, or engaged in incredibly useful dialogs that refined our thinking on key topics in the book. In no particular order: Shane Gibson, Joe Reis, Rob Price, Mustafa Qizilbash, Josh Halley, Matthew Moroney, Jean Sini, Sean Falconer, Karsten Schnappauf, Eugene Kim, Daniel Wilson, Jonathan Stevens, Holly Andersen, and Evelyne Roy.

Last but not least, we would like to thank the O’Reilly team: Aaron Black, Corbin Collins, Elizabeth Faerm, Adam Lawrence, Tim Stewart, Judith McConville, Susan Brown, Susan Thompson, David Futato, and Kate Dullea.

Personal note from Eric: I would like to point out that my coauthor for this book shares my last name—yes, Davis is my son. It has been an incredible pleasure to work with Davis for so many reasons. After all, who wouldn’t want to work with their son! But Davis is an outstanding software engineer in his own right. And he is an incredible technical architect and is brilliant (far smarter than I am). He is not just an author for many of the chapters but has been instrumental in shaping every chapter in this book. It has been the opportunity of a lifetime to work together!

Personal note from Davis: Working on this book has been an incredible experience, as has working with my father on it. He has an astounding depth of experience in the technology field and is constantly up-to-date on the newest technology. Working with him has allowed me the opportunity to shape my own thoughts on the matter much more thoroughly than I would be able to do on my own. It has been an amazing opportunity to work together on this!

And it goes without saying that we would like to thank our family—Susan and Graeham—for their fantastic support.
