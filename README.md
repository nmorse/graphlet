HoneyBee
========
The HoneyBee project combines: 
 * a graph based syntax for flow-control and data access (i.e. a network of code and data elements)
 * program visualization (graphs expressed visually, enabling spatial reasoning)
 * a portable (environment agnostic) high-level approach to programming for many platforms
 * event oriented (a visual syntax for PubSub)

A Graph Based Syntax
--------------------
>The syntax for this language is based on several types of nodes and edges. Nodes represent data storage and/or coded 
processes. Edges route messages that "get", or "set" data, or publish and subscribe to messages, or transfer the flow 
of control between nodes. 

In the HoneyBee environment a graph is the source code and is interpreted using a "event-emitter pattern."  
A message queue manages the flow of an application. Clients, servers and embedded controllers can all run 
HoneyBee flow-control-graphs. 

The flow of control is entirely determined by the topology of nodes and edges.
>You will not find an "IF" or "WHILE" control structure in HoneyBee. All flow control is determined by the topology that you create.

All Access to data is clearly shown by the (data nodes) connectivity (via edges) in the HoneyBee Graph structure.
This visual approach enables sharing code, and code inspection (by graph analisys, or visually).
>If you need to understand what are all the ways that some datum or IO element is read from or written to, it is plainly represented by adjacency.

Code Visualization
------------------
Central to the HoneyBee project is the ability to easily visualize, edit, share and debug code (rendered as a graph).
A survey of available graph editor applications revealed a lack of web based tools that could be integrated into this graph based 
programming environment. Several rendering libraries have been explored, and currently effort is being invested into integrating 
Cytoscape.js into the HoneyBee environment. Modularity is also a focus of the design, so that alternate graph rendering options could be supported 
in the future.

Cytoscape.js is used to facilitate graph visualization, by providing a view into HoneyBee flow-control-graphs' the linking of data and process are presented in a high cognitive-bandwidth format. 

A Portable Approach
-------------------
When the HoneyBee environment loads a flow-control-graph, it registers "pubsub" style subscriptions for all edges in
the graph. Nodes marked for data "i/o" are registered with the local server, DOM environment, or data services across Internet. 

Diverse environments such as embedded systems, servers and clients, that have pubsub patterned utilities may run a HoneyBee flow-control-graph. 
Code portability will be supported by a process of code generation, where the graph source is transposed into pubsub calls for the local environment.

Event Oriented
--------------
While HoneyBee is being orchestrated with events, external participants 
may subscribe to these events and receive them as they are published by the interpreter.
This allows for Developer tools (eg. progress bar) to display some indication of how your honeybee process is progressing.

IO nodes are the in-application way of publishing (or subscribing to) events.

Node types
----------
 * Process
 * Data
 * IO

Edge types
----------
 * Get (*ordered)
 * Set
 * Message
 * Transition (*ordered)
 
Process Steps for a Node
------------------------
When a node is activated by a message or transition, these 4 processing steps are executed in this order.
 * Get data (via all immediate "get" edges)
 * Process the internal function or operation of the node
 * Set data or publish events (via all immediate "set" edges)
 * Transition to the next node (via one selected "Guard protected" transitions edges)

