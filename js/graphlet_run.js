// graphlet run
// pubsub message style, setup listeners (note that listners can return values or send back messages)
//
// process nodes subscribe to in-coming (transition edge.id) messages. 
// calc nodes subscribe to in-coming (get edge.id) messages. 
// data/io nodes subscribe to in-coming (set edge.id) messages.
//
// data/io are able to publish out-going (set edge.id) messages when data is changed...
// process nodes publish an out-going (begin_process edge.id) events before starting the get-process-set-transition sequence.
// process nodes are able to publish out-going (get, set and transition edge.id) messages during processing.
//
// if a start node exists it publishes an out-going (transition edge.id) message, to start the ball rolling,
// 

(function(_) {
    run = function(g) {
        var listeners = this.graph_selector(hbg, {"element":"node", "type":"process"});
        //var get_emiters = graph("edge type=get");
        //var set_emiters = graph("edge type=set");
        //var flow_emiters = graph("edge type=flow");
        //var js_str = '';
        this.hbg = graphize(g);
        _.each(listener, function(i, node) {
            if (node.process) {
                _.sub(g.id+"node_"+node.id, function() {
                    var this_id = "honeybee " + o.id;
                    var args = get_all(hbg, o.id);
                    var result = o.process.map(args);
                    var next_node_id = '';
                    set_all(this_id, result);
                    next_node_id = flow_to(this_id, result, this.graph_selector(hbg, {"element":"edge", "type":"flo", "from":o.id});
                    if (next_node_id) {
                        emit("honeybee "+next_node_id);
                    }
                    else {
                        emit("honeybee halt");
                    }
                });
            }
        });
        $("#run_mode_graph_io").trigger("honeybee start");
    };
    
    // classize by function a graph literal.
    var graphize = function(graph) {
        var g = {nodes:[], edges:[]};
        _.each(graph.nodes, function(i, o) {
            var no = _.extend(true, o);
            no.get_value = function(name, gr) {
                var key, args, values;
                if (no.node_type === 'process') {
                    args = all_gets(gr, no);
                    values = process(no, args);
                    no.data = _.extend(true, {}, no.data, values);
                }
                key = name || no.name;
                if (no.data) {
                    return no.data[key];
                }
                return no[key];
            };
            g.nodes.push(no);
        });
        // copy edges
        return g;
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
