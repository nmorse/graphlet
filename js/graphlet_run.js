// graphlet run
// pubsub message style, setup listeners (note: get edge listners will return values and/or send back messages, unlike standard pubsub)
// 
//   Sub
// process nodes subscribe to in-coming (transition/event edge.id) messages. 
// data/io nodes subscribe to in-coming (get/set edge.id) messages.
//
//   Pub
// data/io are able to publish out-going (get/set edge.id) messages when data is requested/changed...
// process nodes first publish an out-going (begin_process edge.id) events before starting the get-process-set-transitionSelection sequence.
// process nodes are able to publish out-going (get, set edge.id) messages during processing.
// process nodes publish an out-going (end_process edge.id) events after get-process-set-transitionSelection sequence is done.
// process nodes lastly publish out-going (transition edge.id) messages
// if a start node exists it publishes an out-going (transition edge.id) message, to start the ball rolling: main()
// 

(function(_) {
    run = function(g) {
        var listening_node = this.graph_selector(hbg, {"element":"node", "type":"process"});
        //var get_emiters = graph("edge type=get");
        //var set_emiters = graph("edge type=set");
        //var flow_emiters = graph("edge type=flow");
        //var js_str = '';
        this.hbg = graphize(g);
        _.each(listening_node, function(i, node) {
            if (node.process) {
                _.subscribe(g.id+"node_"+node.id, function() {
                    var this_id = g.id+"node_"+node.id;
                    var args = get_all(hbg, o.id);
                    var result = o.process.map(args);
                    var next_node_id = '';
                    set_all(this_id, result);
                    next_edge_id = flow_to(this_id, result, this.graph_selector(hbg, {"element":"edge", "type":"flo", "from":o.id});
                    if (next_edge_id) {
                        _.publish(g.id+"trans_edge_"+next_edge_id);
                    }
                    else {
                        _.publish(g.id+"event_halt");
                    }
                });
            }
        });

        listening_node = this.graph_selector(hbg, {"element":"node", "type":["io", "data"]});
        //var get_emiters = graph("edge type=get");
        //var set_emiters = graph("edge type=set");
        //var flow_emiters = graph("edge type=flow");
        //var js_str = '';
        this.hbg = graphize(g);
        _.each(listening_node, function(i, node) {
            var id = node.id;
            var edges = this.graph_selector(g, {"element":"edge", "type":"get", "to":id});
            _.each(edges, function(j, edge) {
                _.subscribe(g.id+"get_edge_"+edge.id, function() {
                    // run get edges
                    // node.data = _.extend(node.data, gottten.data)
                    return node.data;
                });
            });
        });

        // start
    };

    var graph_selector = function(hbg, sel) {
        var res = [];
        if (sel.element === "node") {
            if (sel.id) {}
            $.each(hbg.nodes, function(i, o) {
                if (sel.id && sel.id === o.id) {
                    res.push(o);
                }
                if (sel.type && sel.type === o.node_type) {
                    res.push(o);
                }
            });
        }
        else {
            $.each(hbg.nodes, function(i, o) {
                if (o[2] === sel.type && o[0] === sel.from) {
                    res.push(o);
                }
            });
        }
        return res;
    };
    var get_all = function(hbg, id) {
        var get_arr = [];
        var get_edges = graph_selector(hbg, {"element":"edge", "type":"get", "from":id});
        $.each(get_edges, function(i, o) {
            var end_node = graph_selector(hbg, {"element":"node", "id":id});
            var name = o.alias | end_node.name;
            var gotten = {"name":name, "value":end_node.data[name]};
            get_arr.push(gotten);
        });
    };
    var set_all = function(hbg, id, result) {
        var set_edges = graph_selector(hbg, {"element":"edge", "type":"set", "from":id});
        $.each(set_edges, function(i, o) {
            var end_node = graph_selector(hbg, {"element":"node", "id":id, "ordinal":true});
            var name = o.alias | end_node.name | "data";
            hbg.nodes[end_node.ordinal].data[name] = result[name]; 
        });
    }
    
    
})();
