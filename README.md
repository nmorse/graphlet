honeybee
========

In the honeybee environment a "graph" is used as source code and is interpreted using a "pubsup pattern" message queue. 

Specifically, the source code is a "directed" "multi-graph" is called a "control graph". 
The nodes of a control graph represent executable steps or datum, 
and its edges represent pathways for messages or data to be sent along.

When the honeybee environment loads a control graph, it registers "pubsub" style subscriptions for all edges in
the graph. Control graph nodes marked as "input" or "output" are also registered with the outer environment 
as event or data sources (or sinks).  