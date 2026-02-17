# 14. Agent Factory: Building Agents at Scale


## Chapter 14. Agent Factory: Building Agents at Scale

In earlier chapters, we argued that the challenge of agents is ultimately one of scale. A few agents can be managed manually, much like early servers or microservices were once deployed by hand. But as meshes mature, we will not be dealing with dozens or even hundreds of agents—we will be dealing with thousands, perhaps millions, each operating semiautonomously yet expected to conform to enterprise-grade standards of security, governance, and reliability. At that point, the bottleneck is no longer technology alone but the process of creating and maintaining these agents at a rate fast enough to meet demand. Building agents by hand, one at a time, will simply not scale.

That is why earlier chapters introduced the concept of the fleet—a structural response to this scaling problem. Fleets organize agents into coherent, manageable units that can be started, monitored, and governed as one. Fleets are to agents what departments are to employees: they make coordination possible by grouping related roles under shared supervision and purpose. But even with fleets in place, one more layer of scalability is required. Fleets let us operate large numbers of agents efficiently, but they do not tell us how to create them efficiently. For that, we need factories.

The agent factory is the logical next step in the evolution of the agentic mesh. It provides the capabilities and infrastructure to build agents fast, reliably, and consistently—applying the same industrial logic that transformed early software craftsmanship into modern DevOps and continuous delivery. Just as a software build pipeline automates compilation, testing, and deployment, the agent factory automates the creation, configuration, certification, and rollout of agents. It translates the lessons of scalability from cloud infrastructure to cognitive infrastructure.

This chapter explores how to design such a factory—what its components are, how they interact, and how they transform agent development from a manual process into an automated one. We begin with the agent development cycle, which adapts the classic systems development lifecycle (SDLC) to the specific needs of agents: defining purpose, designing interaction schemas, configuring access to tools and other agents, and validating compliance and performance. From there, we move into building agents at scale, where templates, automation, and certification pipelines replace handcrafted configuration.

We then expand to fleets, showing how factories can assemble groups of agents that operate together as modular, reusable teams. Fleet templates and standardized orchestration patterns make it possible to generate entire groups of interoperable agents with minimal human intervention. Finally, we explore operations at scale—deployment pipelines, monitoring and observer agents, fleet updates, and eventual decommissioning. The chapter closes by looking ahead to a future where agents build other agents, extending automation even further into the creative process.

Taken together, these concepts represent the industrialization of agent development. The agent factory transforms agents from bespoke creations into scalable digital products, with repeatable processes, certified templates, and lifecycle management built in. This is how the agentic mesh moves from a promising prototype to an operational ecosystem—capable not only of running at scale but of continuously growing, adapting, and producing new intelligence at enterprise speed.


## Agent Development Cycle

Developers striking out on their own is fine for early experimentation, but having a standardized process for creating agents will be a first step along the process of allowing agents to scale. For designing complex systems, the SDLCSDLC is often used as a model, encompassing the process from planning to eventual decommissioning. The SDLC serves as a good starting point for formalizing how to develop an agent factory.

The SDLC starts with the conceptualization phase, in which a need is identified and some preliminary analysis is done to confirm that the solution will be valuable enough to implement. When developing an agent, this phase will occur when someone identifies a task that could be improved through the presence of an agent, or a gap in an existing process that could be filled with a new agent. Quick inquiries should be made in this phase to see if an agent is a good fit for the solution. While agents are versatile, some tasks are suited to a more traditional program, sometimes due to needing exactly repeatable output, or because the task is simple enough that the intelligence of an agent adds little value. Filter these tasks out at an early stage, so that you can focus your agents where it matters.

The next phase in the SDLC is the requirements analysis. In this phase, a more detailed understanding of the problem is gathered, resulting in a more detailed level of requirements. For agents, this will be the point where the inputs, outputs, and handling of unexpected events and inputs are defined. This is also where the criteria for success are defined for the agent, against which its performance should be judged later. Set expectations so that you can be sure that the agent is doing what you want it to later on.

The design phase comes next. This involves figuring out the details of how the system will work and how data will flow through it. For agents, this involves figuring out what other agents and tools it will need access to. These define how it will fit into the larger mesh. Additionally this is where other agents’ abilities to access this agent should be considered. After all, agents are intended to be reusable, so ensuring that the rules for using this new agent are defined is quite important.

The construction phase follows from here in the SDLC. This is where the writing of new code happens and where the system being designed is actually assembled in a development environment. For agents, this will involve building the agent configuration and wiring it to the tools and agents it will need to do its job. If new tools are required, this phase will also include building those. It will involve making sure that the different tools and agents are working together as expected. This will likely be an iterative process with a degree of overlap with the next phase.

The acceptance phase is the next phase in the SDLC and is the phase in which testing occurs. These tests are used to ensure that the goals laid out in the requirements analysis phase and design phase are actually met by the system that was created in the construction phase. For agents, this will involve testing and acceptance criteria, with a particular focus on agent-specific modes of failure, such as prompt injection. Automated testing will serve as the first set of tests in this phase and will encode as much of the acceptance criteria as possible. Testing by a QA team will follow, to catch things that are more difficult to encode into a test case. If the test results are not satisfactory, the agent will be sent back to the construction phase, where these issues are fixed, before returning to a more successful testing phase.

The deployment phase comes after the acceptance phase in the SDLC and typically involves deploying the accepted system into a production environment. This is where clients will have access to the system. For agents, this is when an agent leaves the development and test environment and enters the mesh proper. It will then be able to be started and become available to users or other agents who want to make use of its functionality.

The maintenance phase of the SDLC encompasses the ongoing efforts that will be needed in order to keep the system functional over the long term. New features will be added, user requests addressed, bugs fixed, and new versions pushed out. Agents have all of these concerns. New versions and bug fixes will come over the lifetime of any long-lived agent, and ensuring that these new versions are made available promptly and reliably will ensure that agents continue to be used beyond their initial deployment.

The final phase in the SDLC is the decommissioning phase. In this phase, the system is taken offline and retired in a structured manner. For agents, the process is the same, with the agent being deactivated. Care should be taken during this phase to ensure that adequate warning is given to any users of this agent and that they be redirected to other replacement services, if available, to minimize service disruption caused by the decommissioning.

With this as a basic agent development process, we can use it as a starting point for scaling up to handle the number of agents required. Though the units involved will change as the level of abstraction grows, the general process is still applicable even as the scale grows larger.


## Building Agents at Scale

In order to reach the goals mentioned by the software industry, agents, as we have said, cannot be hand-built one at a time. Doing so might result in very high-quality agents, but there would simply not be enough developers to meet the demand, even if they devoted all of their time to it. And that’s without taking the testing and deployment of these agents into account. Decreasing the developer workload required in order to create agents is absolutely necessary in order to bring about the number of high-quality agents demanded. Just as the cottage industry gave way to factories and assembly lines, agent development must shift from building individual agents to allowing systems to assemble lots of agents at once.

The first thing that needs to change when attempting to scale agent production is shifting the focus from producing individual agents to producing infrastructure that can assemble large numbers of agents. Just as the cottage industry’s individualized products gave way to factory products assembled from a template, the agent factory must use agent templates rather than seeing each agent as individual and unique. These templates will consist of standard tools, approaches, and other configuration elements, designed so that they can easily replace a few pieces to generate agents very similar to the template with minimal effort.

One observation that can be made about creating agents at scale is that many of those agents will be fairly similar to each other. An agent that converts natural language questions to SQL queries for a customer database, one that does the same but for a transactions database, and one that does it for an employee database are doing a very similar job, with the main distinction being which database they are accessing. There is no need to start from scratch with each of these agents when components can be reused between them.

Similarly, if the changes allowed to a template are well defined and limited in scope, these changes can also allow for the easy creation of a large number of agents with a trust certification. By limiting the ability of changes to impact the types of actions taken, certifying the template will be possible, superseding the need to go through the certification process for every individual agent provided by this template. For example, if an agent template ensures that secure information is not available to the LLM regardless of what the data source is, changing the data sources will not affect its certifications. Though this will not be true in all cases, the ability to certify templates will speed up the trust certification of agents as they are produced.

Previous chapters covered how tools can already be reused within the agentic mesh, but there is the potential to reuse more than just the tools. When the tools are built, the agent configurations become the unit of work for developers. And whereas some configurations may be quite simple, others may be quite complicated, such as containing instructions on how to handle edge cases, tones to respond with, or other instructions. Having to rewrite the same instructions over and over again isn’t viable at scale, and leaving developers without a system to rigorously do this will just result in information being copied and pasted between files in an ad hoc manner, allowing errors to creep in.

Instead of letting ad hoc and error-prone mechanisms dictate how information is copied between different agent configurations, a system of agent templates should be created to handle this problem. Storing these templates and allowing agents to be created from them by filling in only the information that will differ will simplify and speed up the development process. Instead of handcrafting a single agent, a developer can pull from their template library and spin up a dozen similar agents in less time than it might take to set up a single agent configuration from scratch.

This library of templates will be built up as more and more agents are added from the mesh. At first, these templates will likely be created based on individual agents that were successful when setting up early meshes. The good features of these agents are copied into the template so that they can more easily be used for new purposes. But as the mesh becomes more developed and expands, the focus of development will shift to the creation of templates, and from there to even larger scales.


### Fleets

We have already walked through the way technology progressed from raw LLMs to workflows to agents. Why stop there? With the ability to easily generate new agents from templates, the question arises: why create individual agents at all? To be sure, at some point someone will have to think through what an agent does, yet as the agent ecosystem increases in size, it will be rarer and rarer for agents to work alone. Instead they will be working together with other agents. And while these could in principle come from anywhere on the mesh, for many use cases, this will be a set of agents that are working on related tasks or on different aspects of the same task. These groups of agents—fleets—will become the organizational unit that the day-to-day users of the mesh concern themselves with as it gets larger and larger.

The factory analogy continues to be relevant. A physical factory will take input from suppliers and turn it into a final end product—for example, engines, wheels, gearboxes, and so on into cars as a final product. Just like physical factories, a fleet factory will treat agents assuppliers. Once the mesh has grown to this point, agents can be treated as components that will be combined to form the final fleets rather than parts that need to be custom built for the job at hand.

For a fleet to function as the organizational unit, it must be thought of as an abstract object, without detailed knowledge of the specifics of what is going on inside the fleet. Instead of thinking about which agent they want to submit their request to, users will consider which fleet they want to interact with.

In order for a fleet to function in this way, several things must be true. The first is that all agents that make up a fleet must start and stop as a unit. If agents are intentionally being started and stopped independently from each other, the fleet abstraction breaks down, as users would have to think about whether each individual agent is running or not. This would require the sort of detailed internal knowledge of the system that a fleet is intended to abstract.

A fleet must also have well-defined user input and output channels. These will be the sole ways that users submit requests to the system and receive replies from the system. Individual agents within the fleet must not be able to take direct input or output in ways that bypass these channels. As before, for a user to have to think about outputs that do not come from the defined channel, they would need more detailed knowledge of the agents within the fleet than the abstraction permits. However, if these channels are well defined and adhered to, they relieve the user from having to worry about what happens to their request after they submit it. Instead, they can merely watch the output channels to see what has happened to the request, simplifying their ability to understand the fleet.

Fleets will also be required to have a well-defined purpose or area of interest in order to tie together the agents that make them up. The purpose of individual agents will already be well defined but likely fairly narrow in scope. However, these scopes on their own are very narrow and do not suit themselves to an overall purpose until taken together—in the context of the broader fleet’s purpose.

However, fleet purposes do not need to be nearly as limited. Consider opening a simple bank account. Though opening an account is a fine purpose for a simple agent, it is more likely that a fleet would be made to handle several related types of operations rather than just one. For example, if the ability to interact with accounts is there, is it really worth spinning up a very similar fleet to handle questions about current account balance or to close accounts? These would have many of the same tools and agents that were present in the account-opening fleet, leading to a duplication of effort. Instead, the fleet’s purpose can become broader, so that it can handle multiple types of account interactions. This will make the use of agents and tools more efficient, as well as simplify the process of a user finding the correct fleet for their request.

In order to ensure that fleets are enterprise grade, the fleet must contain the necessary provisions for ensuring proper observability and monitoring of what goes on within that fleet. That includes the ability to aggregate important metrics and indicators across the fleet, the ability to aggregate logs, the ability to track and view messages, and other similar features. While many of these are already tracked by individual agents, having these aggregated at the fleet level will ensure that fleets remain as observable as agents are.

If sufficient scale is reached, it will be possible to extend this further and create templates of fleets. From here, new fleets could be constructed in a manner analogous to how agents can be created from templates, should similar fleet-level jobs be required. For example, processing European data may use identical functionality to processing American data but may require that the data be stored and processed in Europe to comply with regulations. In these cases, the ability to turn a fleet into a template and spin up new fleets from it could aid in scaling existing business processes faster, reaching even greater heights.


### Fleet Organization

Most people will interact with these fleets through the interface, but developers will still have to figure out how to actually set up these fleets. And in order to get consistent and sensible behavior from the fleets, the agents inside them will need to be carefully managed. However, several patterns can be used to organize the agents within a fleet. Which of these is the best method of organization will depend on what you are doing with it, with some tasks better suited to one method than another.


#### Hierarchy

The first method of organization is the hierarchy. In this organization model, one manager agent sits at the top of the hierarchy, analogous to a boss managing employees or a CEO of a corporation. Similarly, there are lower-level agents that are analogous to the lower-level employees in a traditional hierarchy. The manager agent is the only agent that has visibility over the entire fleet. It controls the high-level decisions of what to do with incoming messages, as shown in Figure 14-1Figure 14-1. The manager may control this by being the first agent to receive any input from outside the fleet, or input may be received through an employee agent that performs preliminary checks before passing the message to the manager agent. So long as the larger fleet only receives the message after it is directed by the manager, the hierarchical pattern is maintained.


*[Diagram illustrating a hierarchical structure with a manager agent at the top, overseeing five employee agents below.]*


###### Figure 14-1. The structure of a hierarchical fleet

Within such a fleet, the employees have a much more limited window into what the rest of the fleet is doing. They will only be able to communicate with the manager agent or perhaps a small number of peers working on closely related tasks. If other parts of the hierarchy are needed, they can only be accessed only by passing information to the manager and allowing it to facilitate the passage of that information to the rest of the hierarchy.

If the fleet becomes large enough, it may be subdivided further, allowing for middle-management agents that stand between the top-level manager and the lower-level employee agents. This can avoid overloading the main manager agent, or it can allow middle-manager agents to specialize more in specific subtasks to a degree that the higher-level manager cannot do. This fleet arrangement can be scaled to as many levels as needed for the size of the tasks it will be handling.

This sort of organization provides clear lines of control and centralized decision making. Having a single top-level manager allows the thinking and direction of the fleet to be easily and predictably steered by changing the behavior of this manager. With everything flowing through this manager, it becomes the single point of control. The hierarchy model can be useful for fleets that need to be predictable or adhere to rigid compliance guidelines, as without significant peer-to-peer connections, there are fewer potential interactions to track. This makes it well suited to mission-critical systems or to areas where a high degree of regulation is present, as the central control makes it easier to ensure rules are rigorously followed. However, all that comes at the cost of flexibility and speed, as the hierarchical structure forces everything to flow through the manager agent instead of connecting directly.


#### Swarm

The next method of organization is the swarm model. Unlike a hierarchy, there is no defined manager agent in this fleet organization. Instead, all agents act as peers to each other, with direct lines of communication, as shown in Figure 14-2Figure 14-2. While such a swarm will still have well-defined entry points, once a message is received by an agent in the swarm, it may be processed by any number of agents within it. The particular order of operations will be decided dynamically by the agents present in the fleet, with each agent deciding for itself what other agents to contact and what actions to take.


*[Diagram showing a swarm fleet structure with four interconnected agents, illustrating a peer-to-peer communication model without a defined manager.]*


###### Figure 14-2. The structure of a swarm fleet

Further, there is no restriction on knowledge within the fleet. Agents will know what other agents are doing and read the responses they are generating. This allows for each agent to have a more holistic understanding of where the task stands, but it comes with downsides. With more to be aware of, agents run the risk of not being able to properly focus on the tasks at hand.

Overall, this type of fleet emphasizes flexibility and speed. Without a rigid structure set up in advance, the fleet has the flexibility to self-organize in whatever way is needed in order to accomplish the tasks at hand. With every agent having the ability to communicate directly with every other agent, there are no bottlenecks where messages have to be forwarded as they pass through the hierarchy. And with no fixed organizational structure, the network can find the best paths to deal with new problems rather than be forced to work through a predetermined path that may not be a good fit. However, this flexibility comes at the cost of repeatability. Each message may end up taking a different route through the fleet’s agents, which can cause different outputs even for very similar inputs. For applications that require predictability or the following of rigid rules, the swarm may be a good fit.


#### Federation

The final method of organization is the federation model. The federation model serves as a middle ground between the hierarchy and swarm models, as shown in Figure 14-3Figure 14-3. In this model there are multiple manager agents that treat each other as peers, operating with them in a way analogous to the swarm model. However, each of these agents has employee agents that are tied to it and that communicate only with their manager.


*[Diagram illustrating the federation model with multiple manager agents interconnected and each managing its own set of employee agents.]*


###### Figure 14-3. The structure of a federation fleet

By serving as a middle ground, the federation model gains some of the benefits and some of the drawbacks of each of the prior two models. The ability for the manager agents to communicate between each other without restrictions allows for a better degree of flexibility than a hierarchy model would, although it allows less flexibility than the swarm model. Similarly, the federation model will gain some of the control and predictability over the swarm model by having a fixed manager-to-employee organization while not gaining as much control as the hierarchy model.

When building a fleet, you will need to decide where on the control and agility spectrum your fleet will operate. Tasks that are mission critical or have very strict regulatory requirements will typically be better suited to the hierarchy model. Operations like crisis response or distributed intelligence gathering will likely benefit from the flexibility of the swarm model. On the other hand, many operations may need some flexibility, plus some predictability, leaving the federation model as the best option. Your circumstances will decide which models fit which circumstances within your mesh. Figure 14-4Figure 14-4 shows an overview of how these fleet structures compare with each other.


*[Diagram comparing fleet structures: hierarchy optimized for control and cost, federation balancing between, and swarm optimized for agility and speed.]*


###### Figure 14-4. Fleet structures compared


### Building Fleets

When building a fleet, your first consideration should be which fleet organization type is right for the task. This decision will impact everything else in the system, as you will need very different agents depending on the architecture you choose. If a hierarchy is selected, that necessitates a manager agent specialized for controlling the flow of messages between different parts of the system. In a swarm, though, each agent needs to be able to handle itself independently, which will require different setups than hierarchy worker agents.

Once the organization of the fleet is selected, the inputs and outputs of the fleet will need to be determined. What is the expected input that you will be receiving for this fleet? Will it be raw textual input from a user? Will it be valid JSON in a known format? Audio from an active microphone? PDF or PowerPoint files? The types of input that you are willing to accept will necessitate certain portions of your fleet’s layout, as it will have to include agents that can deal with this type of input, even if this means little more than transforming it into a different format that the rest of the agents can understand. It also will necessitate that these input-processing agents have communication channels to other parts of the fleet. Similarly, the outputs that your fleet produces will necessitate that certain agents be included and that the fleet eventually funnels messages to these agents.

Once the inputs and outputs are laid out, the agents that belong in your fleet will need to be selected. When selecting agents for a fleet, you need to take a view much more like a manager than a developer. A manager will not try to hire new people to do a task his existing employees can already handle well enough. Hiring a new person would only be done if the team is not capable of handling the task. And with agents, it is the same. If there is already an agent template that can do the job, that template should be used. Only if the existing templates are not up to the task should a new agent be constructed from scratch. Creating brand-new agents too frequently would rob you of most of the benefit of the fleet abstraction, since so much time would be consumed making new agents.


###### TIP

Start by selecting the agents that are necessitated by your organization and inputs/outputs, and then select the agents that are doing the most important bits of the work. These will form the core of agents that you can use as a foundation to build around. From there, select the agents that fill in the supporting capabilities or communication channels that are needed to get the core capability of the fleet. From there, add any supporting capabilities until you have a fully assembled fleet.


## Operating Agents at Scale

Getting agents and fleets set up at such a large scale is no small undertaking, yet the work does not stop just because the agents have been created. Just as you must pay salaries and manage employees, your agents and fleets will require ongoing effort to keep operating. Indeed, managing these fleets can be an even larger task than creating them. Between ensuring that agents are started and stopped, you need to deal with errors, ensure updates are available, track the operations of the mesh, aggregate data, and even retire agents once they are no longer useful. There’s an awful lot of work that goes into keeping one of these operations running beyond setting it up in the first place.

While managing small numbers of agents has been discussed in prior chapters, the problem grows larger as the mesh grows larger. Once the mesh is large enough that fleets become the unit of action, the problem has grown enough that the approach needs to change. Individual agents can no longer be the focus of management. Instead, the effort of managing operations should be focused at the fleet level. It is much more comprehensible to manage two dozen fleets than to manage several hundred agents individually.


### Deploying Fleets

While individual agents can be deployed fairly straightforwardly, deploying entire fleets is a bit more complicated. An agent is mostly self-contained, with a simple metric for whether it is functioning, at least to get the minimum functionality running. However, the minimum for a fleet is considerably higher than it is for an individual agent. It is not merely running a program or container but running a group of containers that all need to be set up together.

In order to ensure that the entire fleet functions as a unit, it needs to be managed and deployed as a unit. Docker images or Docker Compose will not be sufficient to manage the agents of a fleet as the scale of the mesh continues to increase. The complexity of keeping each required agent running when each of them is managed individually is simply too high. Instead, a proper container manager will be used to manage these containers. For the purpose of illustrating the example, Kubernetes will be used as the container manager for the rest of the chapter.

Using Kubernetes to manage fleets takes a lot of the complexity out of the hands of the administrators of the system and puts it into the Kubernetes system. Rather than worrying about each agent, the entire fleet can be set up as a Kubernetes pod. With this setup, Kubernetes can manage the entire fleet as a single unit, starting and stopping all components together. This also serves to abstract many of the internal details of the fleet from external observers, who merely need to worry about the fleet as a whole.

When starting fleets in this manner, the entire process must weave in zero-trust networking to make sure that security standards are maintained. Each agent will receive a short-lived certificate from a fleet-trusted certificate authority, allowing its identity to be verified by everything it interacts with. Mutual TLS communication within the fleet and from the fleet to the outside world will also be established to allow trust in the fleet’s security.


### Monitoring Fleets: Fleet Observer Agents

In order to keep running fleets healthy, you must monitor them. Monitoring of individual agents was discussed earlier in the book, but once the mesh scales, looking through the metrics and logs for individual agents will no longer be effective. There are just too many agents to keep up with. While detailed metrics on each individual agent will still be available should they be needed, aggregating these metrics at the fleet level allows for an easy-to-digest overview of how the fleet is doing.

Someone managing a fleet will not necessarily need or want a constant feed on how many internal messages a specific agent within the fleet is processing, but they would certainly want to know how many user requests the fleet is processing. They might care a lot about how many requests were rejected as user error but might not care nearly so much about which specific agent rejected them unless the rejection was invalid. Similarly, uptime of the individual agents within a fleet is not likely to be useful in situations other than debugging, but whether the fleet was running or not is a statistic that will be of great interest. While debugging concerns necessitate a more detailed view, the aggregated metrics provide a much more digestible first glance at a fleet.

These metrics will also keep health check information available at the fleet level—covering which agents are active and healthy within the fleet as well as how the health of the agents affects the health of the fleet as a whole. In some cases, fleets may continue to retain some degree of functionality when individual agents are no longer available, while in others, the loss of specific agents may render the fleet inoperable. Tracking this information at the fleet level allows for an easier overview, especially for end users who only need to know whether they can submit their request to the fleet or not.

This is especially important when we consider that as the mesh scales, a person may end up managing more than one fleet—many more, in fact. As such, the fleet manager needs the information to be presented such that they can absorb it within a reasonable amount of time instead of being flooded with each individual agent’s metrics all at once. However, with so much information coming in, how can it all be reduced to a small enough subset that someone can act on it in a timely manner? The answer is fleet observer agents.

Fleet observer agents are agents that watch the logs and metrics of a fleet. They take in the firehose of the logs and raw information and parse through it to figure out what bits of this information are important to the operation and maintenance of the fleet. They then summarize this information and make it accessible for users. This can turn a very large amount of information into a much more digestible summary that can be viewed at a glance by whoever is managing the fleet. While the raw information will still be available if needed, the summaries generated by observer agents are likely to be the primary source of information for day-to-day administration tasks.


### Updating and Retiring Fleets

Though a robust deployment pipeline for fleets will ensure that those that are released are of high quality, even the best equipment needs maintenance and eventual replacement. When problems arise or new features are added, fleets will need to be updated. Doing this seamlessly requires more concerns to be addressed.

When changes need to be made to a fleet, they will go through the same DevOps pipeline that a new fleet would, including the same testing that would be done on any new fleet, ensuring that the new fleet continues to adhere to the standards the old one does. However, once it is past the DevOps pipeline, the new fleet will enter the mesh as a new version of the fleet, with its own version number. In order to keep backward compatibility open, both the new and old versions will be available in the mesh unless explicitly taken down.

While there is no obligation to keep older versions of fleets running, there are plenty of cases where that would be a good idea. Doing so allows anyone who depends on the older versions to keep using them. This can allow for systems that depend on the exact behavior of the old fleet to keep using it, which can be critical if the newer fleet handles things significantly differently than before. You would not want to break a critical application that depends on particular behavior from a fleet by forcing an upgrade before everyone is ready. By keeping both versions running for a while, you give users time to upgrade their own applications to work with the new behaviors. The mesh can treat different versions of the same fleet differently if needed, so there is no worry about accidentally moving someone to the wrong fleet.

Even so, old versions of fleets are not going to stick around forever, and at some point they will need to be stopped. With Kubernetes managing the fleets, they can easily be stopped as a unit, with all agents stopping at once. However, in order to avoid terminating ongoing requests, stopping a fleet will suspend the ability to accept incoming requests but will allow ongoing requests to finish before shutting down the fleet completely. This will keep customers from having ongoing—and potentially paid for—requests terminated suddenly. Of course, an administrator will have the ability to shut down a fleet immediately, though given the disruption this could cause, it should be restricted to emergencies, such as if a fleet is compromised and used for malicious purposes or when jobs are clearly stuck for long enough that they clearly will never complete.


## A More Distant Future

While the talk about fleets is relevant to the immediate future, the number of agents seems unlikely to stop at the point where fleets alone are sufficient. The numbers of fleets and the challenges of operating them will continue to grow until further abstractions are needed. And although that time is likely some ways away yet, it is worth taking a moment to look ahead and discern what the future may hold.


### Agents Building Agents

As the mesh grows, templating will only take you so far. Even with the best templates, templating as we’ve discussed it so far still requires that a person create these templates, which can be an intensive effort as the number of templates grows. Beyond that, more effort will come from all the people who have to evaluate and test these agents and who have to decide whether or not to use them in their fleets. With the number of agents likely growing much faster than the number of developers capable of creating them and the number of testing staff needed to test them, something will need to be done in order to speed up the process. Going forward, the creation of agents will need to become even more automated.

The answer to a great many automation problems going forward will be to use agents to solve it, and this problem is no different. Instead of having developers craft agents or agent templates, this task can be done by other agents. Making these agent-creating agents will be no small task, as their importance to the enterprise means that they will have to be incredibly reliable and well tested, as their outputs are further removed from human oversight than most agents. But once these agents are created, the benefits they offer will be immense.

Early agent creators will take the guidelines laid out by whoever wants the agent and convert them into a specification that can be added to the agentic mesh. This will relieve a lot of the development overhead necessary to create agents, in much the same way a compiler makes programming easier. A lot of the low-level tasks that consume developer time will instead be handled by these agents, freeing up employees to focus on systems architecture, or other tasks that affect the system as a whole, rather than focusing on individual pieces of it.

As agents become even more prevalent, they may even be placed in charge of parts of a business process—or indeed all of it. These agents will have considerably more leeway than the early agent creators, being able to create new agents entirely on their own initiative. These initiative managers will take some of the system design workload, allowing even that to be handled at a larger scale than would be possible without agents.


### Larger Abstractions

The number of agents will start to increase beyond even what fleets can handle. To consider where this is going, let’s compare an agentic mesh with a human business. In a business, the individual low-level employee gets the basic tasks of the business done. In a mesh, the employee is analogous to the agent. Like the employee, it is performing the basic operations that the mesh is doing. Looking up a level, a business will organize its employees into teams once there are enough employees that managing and coordinating them becomes difficult. Fleets in the agentic mesh perform a similar role to teams in a business. They organize the agents into units that they are able to manage more easily and at a higher level of abstraction. But what is the step up from teams?

Organizations themselves are the step up from teams for a regular business, as shown in Figure 14-5Figure 14-5. They have many teams—indeed, many layers of teams within teams—within them, which allows organizations to scale to arbitrarily large problems. For the agentic mesh to have a similar ability to scale beyond fleets, it uses agent ecosystems as the equivalent of an organization. These ecosystems will consist of many fleets that are working together within well-defined boundaries. Like an organization, they will have contact points with the outside world but have the ability to direct messages to the appropriate fleets within themselves.


*[Diagram illustrating the evolution from person to agent, team to fleet, and organization to ecosystem, highlighting increasing complexity and interaction within agent systems.]*


###### Figure 14-5. Increasingly complex agent organization

As agents expand to ecosystems, the types of tasks that they can perform will grow beyond those tasks that individual agents or fleets can handle. While it is plausible for an agent to process a transaction or a fleet to onboard new clients, with ecosystems, running entire business areas now enters the realm of possibility. Perhaps even entire businesses consisting primarily of agents could be created to fill economic niches.

As these organizations grow, the recognition of agent ecosystems as legal entities will be a question that arises. With agents becoming more and more important to the economy, it seems only a matter of time before agent ecosystems are granted legal representation. This recognition does not imply that the agents are truly conscious in a human sense but will be more akin to how corporations and other organizations are granted legal personhood. Without implying that they are human, such recognition simplifies many types of economic transactions. At this point, agents will be able to sign contracts, hold assets, and be held legally accountable.

From there, things may grow further. As legal entities made of agents propagate, they will begin interacting with each other in an autonomous manner. Contracts and exchanges will be made between these organizations just as they are made between ordinary firms. They will establish long-term relationships and scale until there are entire supply chains formed out of agents, taking systems from beginning to end, as shown in Figure 14-6Figure 14-6.


*[Diagram illustrating how ecosystems grow into legal entities and supply chains, highlighting stages of legal recognition and contractual relationships.]*


###### Figure 14-6. Ecosystems will grow into legal entities and supply chains


## Summary

As the number of agents grows, the abstractions necessary to use them to their full potential grow with it. As shown in this chapter, in the near- to medium-term future, this results in moving from the agent as the primary unit of work to the fleet being the basic unit of work. With different structures of fleets built up from agent templates, this change will require adjustments to be made to the mesh to keep up with it. In the longer term, fleets will themselves fall within even larger abstractions, such as agent ecosystems, agent legal entities, and agent supply chains. These will allow the number and usefulness of agents to grow higher still.

But with change on the horizon, it will take a lot of effort to get your organization ready for the agentic mesh and even more for what comes later. Chapter 15Chapter 15 explains how to build a roadmap for getting your organization into the era of agents.
