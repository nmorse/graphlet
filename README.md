HoneyBee
========
The HoneyBee project combines: 
 * a graph based syntax for flow-control and data access (i.e. a network of code and data elements)
 * program visualization (graphs expressed visually, enabling spacial reasoning)
 * a portable (environment agnostic) approach to programming for many platforms


A Graph Based Syntax
--------------------
>The syntax for this language is based on several types of nodes and edges. Nodes represent storage or a coded process. Edges route messages that "fetch" or "store" data, or transfer control between nodes. The graph topology determins flow-contol of the program execution.

In the HoneyBee environment a "graph" is used as source code and is interpreted using a "event emitter pattern."  
A message queue manages the flow of an application. Clients, servers and embedded controllers can all run 
HoneyBee flow-control-graphs, enabling shared code, and code inspection. 

A "flow-control-graph", is a "directed, multi-graph" (for the mathematicians). 
The nodes of a flow-control-graph represent executable steps or data sources, 
while graph's edges represent three types of message routing. Get, Set (data) and Flow-event messages are called in order to "run" a HoneyBee graph.
ment of nodes and edges (topology).


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
