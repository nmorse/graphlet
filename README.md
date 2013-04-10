HoneyBee
========
The HoneyBee project combines: 
 * code visualization (i.e. it can be expressed as a visual language);
 * a network syntax for flow-control (i.e. coded elements form a network);
 * an environment agnostic approach to programming.

In the HoneyBee environment a "graph" is used as source code and is interpreted using a "event emitter pattern."  
A message queue manages the flow of an application. Clients, servers and embedded controlers can all run HoneyBee flow-control-graphs, enableing shared code, and code inspection. 

The source code a "flow-control-graph", is a "directed", "multi-graph" (for the mathematicians). 
The nodes of a flow-control-graph represent executable steps or data sources, 
while graph's edges represent three types of message routing. Get, Set (data) and Flow-event messages are called in order to "run" a HoneyBee graph.

When the HoneyBee environment loads a flow-control-graph, it registers "pubsub" style subscriptions for all edges in
the graph. Nodes marked for data "i/o" are registered with the local server, DOM environment, or data services across Internet. 

Code Visualization
-------------

Cytoscape.js is used to facilitate graph visualization, by providing a view into HoneyBee flow-control-graphs' the linking of data and process are presented in a high cognitive-bandwidth format. 
Editing sharing and debugging are also enhanced by graph visualization.
Other graph "renderers" (outside of Cytoscape.js) are possible, but plans to implement are only in a preliminary stage.
