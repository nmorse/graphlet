Graphlet
========
The Graphlet project combines: 
 * a graph based syntax for __Functions__, __Data Access__ and __I/O Elements__
 * visual programming (enabling spatial reasoning via visual renderings of graph networks)
 * a portable (environment agnostic) high-level approach to programming for many platforms
 * event oriented (a visual syntax for the Publish-Subscribe programming pattern)

See a Demonstation === http://nmorse.github.io/graphlet/editor.html

A Graph Based Syntax
--------------------
>The syntax for this language is based on a few types of nodes and edges in a graph. Nodes represent data storage and/or coded 
processes. Edges either "get", or "set" data, or send messages to and from I/O nodes, or transfer the flow 
of control to other nodes. 

In the Graphlet environment a graph of nodes and edges is the source code. Execution is interpreted using a "event emitter" pattern
using a message queue to manage the flow of an application. Client browsers, servers and embedded controllers can all run 
these Graphlet flow-control-graphs. 

The flow of control is entirely determined by the topology of nodes and edges.
>You will not find an "WHILE" or "FOR" (loop) control structures in Graphlet. All flow control is determined by the topology of the graph that you create.

All Access to data is clearly defined by edges that connect to data nodes. These data conduit (edges) have a great benefit in relieving the programmer in the burden of repetitive variable naming. 
This visual approach enables sharing code, and code inspection (by graph analysis, or visually).
>If you need to understand what are all the ways that some data node or i/o element is accessed, it is plainly represented in the graph by edge (adjacency).

Code Visualization
------------------
Central to the Graphlet project is the ability to easily visualize, edit, share and debug code (rendered as a graph).
A survey of available graph editor applications revealed a lack of web based tools that could be integrated into this graph based 
programming environment. Several rendering libraries have been explored, and currently effort is being invested into integrating 
Cytoscape.js into the Graphlet environment. Modularity is also a focus of the design, so that alternate graph rendering options could be supported 
in the future.

Cytoscape.js is used to facilitate graph visualization, by providing a view into Graphlet flow-control-graphs' the linking of data and process are presented in a high cognitive-bandwidth format. 

A Portable Approach
-------------------
When the Graphlet environment loads a flow-control-graph, it registers "pubsub" style subscriptions for all edges in
the graph. Nodes marked for data "i/o" are registered with the local server, DOM environment, or data services across Internet. 

Diverse environments such as embedded systems, servers and clients, that have pubsub patterned utilities may run a Graphlet flow-control-graph. 
Code portability will be supported by a process of code generation, where the graph source is transposed into pubsub calls for the local environment.

Event Oriented
--------------
While Graphlet is being orchestrated with events, external participants 
may subscribe to these events and receive them as they are published by the interpreter.
This allows for Developer tools (eg. progress bar) to display some indication of how your Graphlet process is progressing.

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
 * Msg (Message)
 * Transition (*ordered)
 
Process Steps for a Node
------------------------
When a node is activated by a message or transition, these 4 processing steps are executed in this order.
 * Get data (via all immediate "get" edges)
 * Process the internal function or operation of the node
 * Set data or publish events (via all immediate "set" or "msg" edges)
 * Transition to the next node (via one selected "Guard protected" transitions edges)
