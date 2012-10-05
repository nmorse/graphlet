
// initilize the control graph (cg) to run.
$.each(cg.nodes, function(i, node) {
    var in_edges = cg.lookup_edge(node.id, "in");
    var out_edges = cg.lookup_edge(node.id, "out");
    if (node.type === "DOM" || node.type === "IO") {
        // bind a DOM element to an event that starts the control graph running.
        $(node.id).bind(node.event.type, function(e) {
            $.publish("run->"+node.id, node.id, {});
        });
    }
 
    $.each(in_edges, function(i, edge) {
        var from_node = cg.lookup_node(edge, "from");
        
        $.subscribe(edge.type+"->"+node.id, function(args) {
            return $.publish("run->"+node.id, to_node.id, args);
        });
    });
    $.subscribe("run->"+node.id, function(nodeid, args) {
        // running this node will publish get->, set->, trans-> events.
        return cg.run(nodeid, args);
    });
});
