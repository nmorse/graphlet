// honeybee graph run
// 

$(function() {
    var hbg;
    init_run = function(hbg) {
        var listeners = this.graph_selector(hbg, {"element":"node", "type":"process"});
        //var get_emiters = graph("edge type=get");
        //var set_emiters = graph("edge type=set");
        //var flow_emiters = graph("edge type=flow");
        //var js_str = '';
        this.hbg = graphize(hbg);
        $.each(listener, function(i, o) {
            if (o.process) {
                $("#run_mode_graph_io").on("honeybee " + o.id, function() {
                    var this_id = "honeybee " + o.id;
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
        $("#run_mode_graph_io").trigger("honeybee start");
    };
    
    // classize by function a graph literal.
    var graphize = function(graph) {
        var g = {nodes:[], edges:[]};
        $.each(graph.nodes, function(i, o) {
            var no = $.extend(true, o);
            no.get_value = function(name, gr) {
                var key, args, values;
                if (no.node_type === 'process') {
                    args = all_gets(gr, no);
                    values = process(no, args);
                    no.data = $.extend(true, {}, no.data, values);
                }
                key = name || no.name;
                if (no.data) {
                    return no.data[key];
                }
                return no[key];
            };
            g.nodes.push(no);
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
