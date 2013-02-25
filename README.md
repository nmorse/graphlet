HoneyBee
========

In the HoneyBee environment a "graph" is used as source code and is interpreted using a "event emitter pattern" 
message queue to control the flow of an application across clients and/or servers. 

The source code or "control graph", is a "directed", "multi-graph" (for the mathematicians). 
The nodes of a control graph represent executable steps or data sources/items, 
while edges represent message pathways.

When the HoneyBee environment loads a control graph, it registers "pubsub" style subscriptions for all edges in
the graph. Control graph nodes marked as "input" or "output" are also registered with the local/internet environment. 

Visualization
-------------

Cytoscape.js facilitates graph visualization, allowing us to view, edit and debug a control graph.
