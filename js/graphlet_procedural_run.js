// graphlet run
// 

(function($, gq) {
    var g;
    var get_all = function(id) {
        var got_obj = {};
        var g = this.g;
        var get_edges = gq.using(g).find({"element":"edge", "type":"get", "from":id}).edges();
        $.each(get_edges, function(i, o) {
			var to_node = o[1];
            var end_node = gq.using(g).find({"element":"node", "id":to_node}).nodes()[0];
            var alias = o[3];
            var name = alias || end_node.name;
            got_obj[name] = end_node.data[name];
        });
        return got_obj;
    };
    var set_all = function(id, result) {
        var set_edges = gq.using(this.g).find({"element":"edge", "type":"get", "from":id}).edges();
        $.each(set_edges, function(i, o) {
            var end_node = graph_selector(this.g, {"element":"node", "id":id, "ordinal":true});
            var name = o.alias | end_node.name | "data";
            this.g.nodes[end_node.ordinal].data[name] = result[name]; 
        });
    }
    var run_node = function(target_node) {
		var get_data = get_all(target_node.id);
		alert(JSON.stringify(target_node));
		alert(JSON.stringify(get_data));
	};

    run = function(g) {
        var flo_edges = gq.using(g).find({"element":"edge", "type":"flo"}).edges();
        var io_events = gq.using(g).find({"element":"edge", "type":"evt"}).edges();
        this.g = g;
        $.each(flo_edges, function(i, o) {
			$("body").on("edge_" + o[5], function () {
				var to_node_id = o[1];
				var target_node = gq.using(g).find({"element":"node", "id":to_node_id}).nodes()[0];
				run_node(target_node);
			});
		});
        $.each(io_events, function(i, o) {
			var from_node_id = o[0];
			var target_node = gq.using(g).find({"element":"node", "id":from_node_id}).nodes()[0];
			var io = target_node.io;
			$(function(){$(io.selector).on(io.event, function() {
				var to_node_id = o[1];
				var target_node = gq.using(g).find({"element":"node", "id":to_node_id}).nodes()[0];
				run_node(target_node);
			});});
			
		});
    };
        
})($, gq);

